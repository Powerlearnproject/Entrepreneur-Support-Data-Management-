const db = require('../../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { 
      email, 
      password, 
      role, 
      firstName, 
      lastName, 
      phone, 
      country,
      valueChain,
      businessName,
      businessType,
      latitude,
      longitude,
      address
    } = userData;

    const hashedPassword = password ? await bcrypt.hash(password, 12) : null;
    
    const query = `
      INSERT INTO users (
        email, password, role, first_name, last_name, phone, country,
        value_chain, business_name, business_type, latitude, longitude, address,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
      RETURNING *
    `;

    const values = [
      email, hashedPassword, role, firstName, lastName, phone, country,
      valueChain, businessName, businessType, latitude, longitude, address
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const query = `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`;
    
    const result = await db.query(query, [id, ...values]);
    return result.rows[0];
  }

  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const query = 'UPDATE users SET password = $2, updated_at = NOW() WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id, hashedPassword]);
    return result.rows[0];
  }

  static async findByRole(role) {
    const query = 'SELECT * FROM users WHERE role = $1 ORDER BY created_at DESC';
    const result = await db.query(query, [role]);
    return result.rows;
  }

  static async getAll() {
    const query = 'SELECT * FROM users ORDER BY created_at DESC';
    const result = await db.query(query);
    return result.rows;
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async createOTP(email, otp) {
    const query = `
      INSERT INTO otp_codes (email, otp, expires_at) 
      VALUES ($1, $2, NOW() + INTERVAL '10 minutes')
      ON CONFLICT (email) 
      DO UPDATE SET otp = $2, expires_at = NOW() + INTERVAL '10 minutes'
    `;
    await db.query(query, [email, otp]);
  }

  static async verifyOTP(email, otp) {
    const query = 'SELECT * FROM otp_codes WHERE email = $1 AND otp = $2 AND expires_at > NOW()';
    const result = await db.query(query, [email, otp]);
    return result.rows[0];
  }

  static async deleteOTP(email) {
    const query = 'DELETE FROM otp_codes WHERE email = $1';
    await db.query(query, [email]);
  }
}

module.exports = User; 