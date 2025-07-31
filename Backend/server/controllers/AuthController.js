const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { query, getRow } = require('../../config/db');

class AuthController {
  // Generate JWT token
  static generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  // Admin login
  static async adminLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Find admin user
      const user = await getRow(
        'SELECT * FROM users WHERE email = $1 AND role = $2 AND is_active = true',
        [email, 'admin']
      );

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = AuthController.generateToken(user.id);

      // Log consent
      await query(
        'INSERT INTO consent_logs (user_id, consent_type, granted, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
        [user.id, 'login', true, req.ip, req.get('User-Agent')]
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          country: user.country,
          region: user.region
        }
      });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Entrepreneur login (send OTP)
  static async entrepreneurLogin(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      // Check if user exists
      const user = await getRow(
        'SELECT * FROM users WHERE email = $1 AND role = $2 AND is_active = true',
        [email, 'entrepreneur']
      );

      if (!user) {
        return res.status(404).json({ error: 'Entrepreneur not found' });
      }

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Save OTP to database
      await query(
        'INSERT INTO otp_codes (email, code, expires_at) VALUES ($1, $2, $3)',
        [email, otp, expiresAt]
      );

      // Send OTP email
      await AuthController.sendOTPEmail(email, otp);

      res.json({ 
        message: 'OTP sent to your email',
        email: email
      });
    } catch (error) {
      console.error('Entrepreneur login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Verify OTP
  static async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
      }

      // Find valid OTP
      const otpRecord = await getRow(
        'SELECT * FROM otp_codes WHERE email = $1 AND code = $2 AND expires_at > NOW() AND used = false ORDER BY created_at DESC LIMIT 1',
        [email, otp]
      );

      if (!otpRecord) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
      }

      // Mark OTP as used
      await query(
        'UPDATE otp_codes SET used = true WHERE id = $1',
        [otpRecord.id]
      );

      // Get user
      const user = await getRow(
        'SELECT * FROM users WHERE email = $1 AND role = $2 AND is_active = true',
        [email, 'entrepreneur']
      );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate token
      const token = AuthController.generateToken(user.id);

      // Log consent
      await query(
        'INSERT INTO consent_logs (user_id, consent_type, granted, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
        [user.id, 'login', true, req.ip, req.get('User-Agent')]
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          businessType: user.business_type,
          country: user.country,
          region: user.region
        }
      });
    } catch (error) {
      console.error('OTP verification error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Forgot password
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      // Check if user exists
      const user = await getRow(
        'SELECT * FROM users WHERE email = $1 AND is_active = true',
        [email]
      );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate reset OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Save OTP to database
      await query(
        'INSERT INTO otp_codes (email, code, expires_at) VALUES ($1, $2, $3)',
        [email, otp, expiresAt]
      );

      // Send reset email
      await AuthController.sendPasswordResetEmail(email, otp);

      res.json({ message: 'Password reset OTP sent to your email' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Reset password
  static async resetPassword(req, res) {
    try {
      const { email, otp, newPassword } = req.body;

      if (!email || !otp || !newPassword) {
        return res.status(400).json({ error: 'Email, OTP, and new password are required' });
      }

      // Verify OTP
      const otpRecord = await getRow(
        'SELECT * FROM otp_codes WHERE email = $1 AND code = $2 AND expires_at > NOW() AND used = false ORDER BY created_at DESC LIMIT 1',
        [email, otp]
      );

      if (!otpRecord) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      await query(
        'UPDATE users SET password_hash = $1 WHERE email = $2',
        [hashedPassword, email]
      );

      // Mark OTP as used
      await query(
        'UPDATE otp_codes SET used = true WHERE id = $1',
        [otpRecord.id]
      );

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get user profile
  static async getProfile(req, res) {
    try {
      const user = await getRow(
        'SELECT id, email, first_name, last_name, role, business_type, phone, country, region, address, created_at FROM users WHERE id = $1',
        [req.user.id]
      );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update user profile
  static async updateProfile(req, res) {
    try {
      const { firstName, lastName, phone, country, region, address, businessType } = req.body;

      const updateFields = [];
      const values = [];
      let paramCount = 1;

      if (firstName) {
        updateFields.push(`first_name = $${paramCount++}`);
        values.push(firstName);
      }
      if (lastName) {
        updateFields.push(`last_name = $${paramCount++}`);
        values.push(lastName);
      }
      if (phone) {
        updateFields.push(`phone = $${paramCount++}`);
        values.push(phone);
      }
      if (country) {
        updateFields.push(`country = $${paramCount++}`);
        values.push(country);
      }
      if (region) {
        updateFields.push(`region = $${paramCount++}`);
        values.push(region);
      }
      if (address) {
        updateFields.push(`address = $${paramCount++}`);
        values.push(address);
      }
      if (businessType && req.user.role === 'entrepreneur') {
        updateFields.push(`business_type = $${paramCount++}`);
        values.push(businessType);
      }

      if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      values.push(req.user.id);
      const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = $${paramCount}`;
      
      await AuthController.query(query, values);

      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Change password
  static async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current and new passwords are required' });
      }

      // Get current password hash
      const user = await getRow(
        'SELECT password_hash FROM users WHERE id = $1',
        [req.user.id]
      );

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      await query(
        'UPDATE users SET password_hash = $1 WHERE id = $2',
        [hashedPassword, req.user.id]
      );

      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Send OTP email
  static async sendOTPEmail(email, otp) {
    try {
      const transporter = nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'HEVA CreativeHub - Login OTP',
        html: `
          <h2>HEVA CreativeHub Login</h2>
          <p>Your OTP code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        `
      });
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }
  }

  // Send password reset email
  static async sendPasswordResetEmail(email, otp) {
    try {
      const transporter = nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'HEVA CreativeHub - Password Reset',
        html: `
          <h2>HEVA CreativeHub Password Reset</h2>
          <p>Your password reset OTP is: <strong>${otp}</strong></p>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this reset, please ignore this email.</p>
        `
      });
    } catch (error) {
      console.error('Password reset email error:', error);
      throw error;
    }
  }
}

module.exports = AuthController; 