const { query, getRow, getRows } = require('../../config/db');
const { uploadToDrive } = require('../../config/drive');

class ApplicationController {
  // Create new application
  static async createApplication(req, res) {
    try {
      const {
        loanType,
        amount,
        purpose,
        valueChain,
        businessPlan,
        latitude,
        longitude,
        region,
        consent
      } = req.body;

      if (!consent) {
        return res.status(400).json({ error: 'Consent is required to submit application' });
      }

      // Log consent
      await query(
        'INSERT INTO consent_logs (user_id, consent_type, granted, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
        [req.user.id, 'application_submission', true, req.ip, req.get('User-Agent')]
      );

      // Calculate ML score (simplified - in production, call actual ML service)
      const mlScore = await ApplicationController.calculateMLScore({
        loanType,
        amount,
        valueChain,
        businessPlan
      });

      // Determine risk level
      const riskLevel = mlScore > 80 ? 'low' : mlScore > 60 ? 'medium' : 'high';

      // Create application
      const result = await query(
        `INSERT INTO applications (
          user_id, loan_type, amount, purpose, value_chain, business_plan,
          latitude, longitude, region, ml_score, risk_level, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [
          req.user.id, loanType, amount, purpose, valueChain, businessPlan,
          latitude, longitude, region, mlScore, riskLevel, 'submitted'
        ]
      );

      const application = result.rows[0];

      // Create notification
      await query(
        'INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)',
        [
          req.user.id,
          'Application Submitted',
          `Your ${loanType} application for ${amount} has been submitted successfully.`,
          'application_submitted'
        ]
      );

      res.status(201).json({
        message: 'Application submitted successfully',
        application: {
          id: application.id,
          loanType: application.loan_type,
          amount: application.amount,
          status: application.status,
          mlScore: application.ml_score,
          riskLevel: application.risk_level,
          createdAt: application.created_at
        }
      });
    } catch (error) {
      console.error('Create application error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get all applications (admin)
  static async getAllApplications(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        loanType,
        valueChain,
        country,
        region,
        search
      } = req.query;

      const offset = (page - 1) * limit;
      let whereConditions = [];
      let values = [];
      let paramCount = 1;

      if (status) {
        whereConditions.push(`a.status = $${paramCount++}`);
        values.push(status);
      }

      if (loanType) {
        whereConditions.push(`a.loan_type = $${paramCount++}`);
        values.push(loanType);
      }

      if (valueChain) {
        whereConditions.push(`a.value_chain = $${paramCount++}`);
        values.push(valueChain);
      }

      if (country) {
        whereConditions.push(`u.country = $${paramCount++}`);
        values.push(country);
      }

      if (region) {
        whereConditions.push(`a.region = $${paramCount++}`);
        values.push(region);
      }

      if (search) {
        whereConditions.push(`(u.first_name ILIKE $${paramCount} OR u.last_name ILIKE $${paramCount} OR u.email ILIKE $${paramCount})`);
        values.push(`%${search}%`);
        paramCount++;
      }

      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

      // Get applications with user details
      const applications = await getRows(
        `SELECT 
          a.*,
          u.first_name,
          u.last_name,
          u.email,
          u.business_type,
          u.country,
          u.phone
        FROM applications a
        JOIN users u ON a.user_id = u.id
        ${whereClause}
        ORDER BY a.created_at DESC
        LIMIT $${paramCount++} OFFSET $${paramCount++}`,
        [...values, limit, offset]
      );

      // Get total count
      const countResult = await getRow(
        `SELECT COUNT(*) as total
        FROM applications a
        JOIN users u ON a.user_id = u.id
        ${whereClause}`,
        values
      );

      const total = parseInt(countResult.total);
      const totalPages = Math.ceil(total / limit);

      res.json({
        applications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages
        }
      });
    } catch (error) {
      console.error('Get all applications error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get application by ID
  static async getApplicationById(req, res) {
    try {
      const { id } = req.params;

      const application = await getRow(
        `SELECT 
          a.*,
          u.first_name,
          u.last_name,
          u.email,
          u.business_type,
          u.country,
          u.region,
          u.phone,
          u.address
        FROM applications a
        JOIN users u ON a.user_id = u.id
        WHERE a.id = $1`,
        [id]
      );

      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }

      // Get documents
      const documents = await getRows(
        'SELECT * FROM documents WHERE application_id = $1 ORDER BY uploaded_at DESC',
        [id]
      );

      // Get repayments
      const repayments = await getRows(
        'SELECT * FROM repayments WHERE application_id = $1 ORDER BY due_date',
        [id]
      );

      res.json({
        application,
        documents,
        repayments
      });
    } catch (error) {
      console.error('Get application by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get user's applications
  static async getUserApplications(req, res) {
    try {
      const applications = await getRows(
        'SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC',
        [req.user.id]
      );

      res.json({ applications });
    } catch (error) {
      console.error('Get user applications error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update application status (admin)
  static async updateApplicationStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, adminComments } = req.body;

      const validStatuses = ['submitted', 'under_review', 'approved', 'rejected', 'disbursed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const result = await query(
        'UPDATE applications SET status = $1, admin_comments = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
        [status, adminComments, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Application not found' });
      }

      const application = result.rows[0];

      // Create notification for user
      await query(
        'INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)',
        [
          application.user_id,
          `Application ${status.replace('_', ' ').toUpperCase()}`,
          `Your application has been ${status.replace('_', ' ')}. ${adminComments || ''}`,
          'application_status_update'
        ]
      );

      res.json({
        message: 'Application status updated successfully',
        application
      });
    } catch (error) {
      console.error('Update application status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Approve application (admin)
  static async approveApplication(req, res) {
    try {
      const { id } = req.params;
      const { approvedAmount, adminComments } = req.body;

      const result = await query(
        'UPDATE applications SET status = $1, admin_comments = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
        ['approved', adminComments, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Application not found' });
      }

      const application = result.rows[0];

      // Create notification
      await query(
        'INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)',
        [
          application.user_id,
          'Application Approved',
          `Your application has been approved for ${approvedAmount || application.amount}. ${adminComments || ''}`,
          'application_approved'
        ]
      );

      res.json({
        message: 'Application approved successfully',
        application
      });
    } catch (error) {
      console.error('Approve application error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Disburse loan (admin)
  static async disburseLoan(req, res) {
    try {
      const { id } = req.params;
      const { disbursedAmount, adminComments } = req.body;

      const result = await query(
        'UPDATE applications SET status = $1, admin_comments = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
        ['disbursed', adminComments, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Application not found' });
      }

      const application = result.rows[0];

      // Create fund utilization record
      await query(
        'INSERT INTO fund_utilization (application_id, user_id, disbursed_amount) VALUES ($1, $2, $3)',
        [id, application.user_id, disbursedAmount || application.amount]
      );

      // Create notification
      await query(
        'INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)',
        [
          application.user_id,
          'Loan Disbursed',
          `Your loan of ${disbursedAmount || application.amount} has been disbursed. ${adminComments || ''}`,
          'loan_disbursed'
        ]
      );

      res.json({
        message: 'Loan disbursed successfully',
        application
      });
    } catch (error) {
      console.error('Disburse loan error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update application (entrepreneur)
  static async updateApplication(req, res) {
    try {
      const { id } = req.params;
      const { businessPlan, purpose } = req.body;

      // Check if user owns this application
      const application = await getRow(
        'SELECT * FROM applications WHERE id = $1 AND user_id = $2',
        [id, req.user.id]
      );

      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }

      if (application.status !== 'submitted') {
        return res.status(400).json({ error: 'Cannot update application that is not in submitted status' });
      }

      const result = await query(
        'UPDATE applications SET business_plan = $1, purpose = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
        [businessPlan, purpose, id]
      );

      res.json({
        message: 'Application updated successfully',
        application: result.rows[0]
      });
    } catch (error) {
      console.error('Update application error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete application (entrepreneur)
  static async deleteApplication(req, res) {
    try {
      const { id } = req.params;

      // Check if user owns this application
      const application = await getRow(
        'SELECT * FROM applications WHERE id = $1 AND user_id = $2',
        [id, req.user.id]
      );

      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }

      if (application.status !== 'submitted') {
        return res.status(400).json({ error: 'Cannot delete application that is not in submitted status' });
      }

      await query('DELETE FROM applications WHERE id = $1', [id]);

      res.json({ message: 'Application deleted successfully' });
    } catch (error) {
      console.error('Delete application error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get application statistics
  static async getApplicationStats(req, res) {
    try {
      const stats = await getRow(`
        SELECT 
          COUNT(*) as total_applications,
          COUNT(CASE WHEN status = 'submitted' THEN 1 END) as submitted,
          COUNT(CASE WHEN status = 'under_review' THEN 1 END) as under_review,
          COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
          COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
          COUNT(CASE WHEN status = 'disbursed' THEN 1 END) as disbursed,
          SUM(CASE WHEN status = 'disbursed' THEN amount ELSE 0 END) as total_disbursed,
          AVG(amount) as average_amount
        FROM applications
      `);

      // Get applications by country
      const byCountry = await getRows(`
        SELECT 
          u.country,
          COUNT(*) as count,
          SUM(a.amount) as total_amount
        FROM applications a
        JOIN users u ON a.user_id = u.id
        GROUP BY u.country
        ORDER BY count DESC
      `);

      // Get applications by value chain
      const byValueChain = await getRows(`
        SELECT 
          value_chain,
          COUNT(*) as count,
          SUM(amount) as total_amount
        FROM applications
        WHERE value_chain IS NOT NULL
        GROUP BY value_chain
        ORDER BY count DESC
      `);

      res.json({
        stats,
        byCountry,
        byValueChain
      });
    } catch (error) {
      console.error('Get application stats error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Calculate ML score (simplified)
  static async calculateMLScore(applicationData) {
    // This is a simplified scoring algorithm
    // In production, this would call an actual ML service
    let score = 50; // Base score

    // Loan type scoring
    const loanTypeScores = {
      'working_capital': 10,
      'asset_finance': 15,
      'term_loan': 20,
      'agricultural_loan': 25
    };
    score += loanTypeScores[applicationData.loanType] || 0;

    // Amount scoring (lower amounts get higher scores)
    if (applicationData.amount < 10000) score += 20;
    else if (applicationData.amount < 50000) score += 15;
    else if (applicationData.amount < 100000) score += 10;
    else score += 5;

    // Value chain scoring
    const valueChainScores = {
      'agriculture': 15,
      'manufacturing': 10,
      'services': 8,
      'retail': 5
    };
    score += valueChainScores[applicationData.valueChain] || 0;

    // Business plan length scoring (longer plans get higher scores)
    if (applicationData.businessPlan) {
      const planLength = applicationData.businessPlan.length;
      if (planLength > 1000) score += 15;
      else if (planLength > 500) score += 10;
      else if (planLength > 100) score += 5;
    }

    // Ensure score is between 0 and 100
    return Math.min(Math.max(score, 0), 100);
  }
}

module.exports = ApplicationController; 