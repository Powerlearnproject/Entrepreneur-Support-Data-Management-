const db = require('../../config/db');

class Application {
  static async create(applicationData) {
    const {
      userId,
      loanType,
      loanAmount,
      purpose,
      businessPlan,
      financialProjections,
      collateral,
      guarantor,
      status = 'submitted',
      reviewerId = null,
      reviewNotes = null,
      approvedAmount = null,
      approvedDate = null,
      disbursedDate = null,
      repaymentPlan = null
    } = applicationData;

    const query = `
      INSERT INTO applications (
        user_id, loan_type, loan_amount, purpose, business_plan,
        financial_projections, collateral, guarantor, status,
        reviewer_id, review_notes, approved_amount, approved_date,
        disbursed_date, repayment_plan, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW())
      RETURNING *
    `;

    const values = [
      userId, loanType, loanAmount, purpose, businessPlan,
      financialProjections, collateral, guarantor, status,
      reviewerId, reviewNotes, approvedAmount, approvedDate,
      disbursedDate, repaymentPlan
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT a.*, u.first_name, u.last_name, u.email, u.phone, u.country,
             u.value_chain, u.business_name, u.latitude, u.longitude, u.address
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE a.id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = `
      SELECT a.*, u.first_name, u.last_name, u.email, u.phone, u.country,
             u.value_chain, u.business_name
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE a.user_id = $1
      ORDER BY a.created_at DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  static async getAll(filters = {}) {
    let query = `
      SELECT a.*, u.first_name, u.last_name, u.email, u.phone, u.country,
             u.value_chain, u.business_name, u.latitude, u.longitude
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE 1=1
    `;
    
    const values = [];
    let paramCount = 1;

    if (filters.status) {
      query += ` AND a.status = $${paramCount}`;
      values.push(filters.status);
      paramCount++;
    }

    if (filters.country) {
      query += ` AND u.country = $${paramCount}`;
      values.push(filters.country);
      paramCount++;
    }

    if (filters.valueChain) {
      query += ` AND u.value_chain = $${paramCount}`;
      values.push(filters.valueChain);
      paramCount++;
    }

    if (filters.loanType) {
      query += ` AND a.loan_type = $${paramCount}`;
      values.push(filters.loanType);
      paramCount++;
    }

    if (filters.search) {
      query += ` AND (u.first_name ILIKE $${paramCount} OR u.last_name ILIKE $${paramCount} OR u.business_name ILIKE $${paramCount})`;
      values.push(`%${filters.search}%`);
      paramCount++;
    }

    query += ` ORDER BY a.created_at DESC`;

    if (filters.limit) {
      query += ` LIMIT $${paramCount}`;
      values.push(filters.limit);
    }

    const result = await db.query(query, values);
    return result.rows;
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const query = `UPDATE applications SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`;
    
    const result = await db.query(query, [id, ...values]);
    return result.rows[0];
  }

  static async updateStatus(id, status, reviewerId = null, notes = null) {
    const query = `
      UPDATE applications 
      SET status = $2, reviewer_id = $3, review_notes = $4, updated_at = NOW()
      WHERE id = $1 
      RETURNING *
    `;
    const result = await db.query(query, [id, status, reviewerId, notes]);
    return result.rows[0];
  }

  static async approve(id, approvedAmount, reviewerId, repaymentPlan) {
    const query = `
      UPDATE applications 
      SET status = 'approved', approved_amount = $2, approved_date = NOW(),
          reviewer_id = $3, repayment_plan = $4, updated_at = NOW()
      WHERE id = $1 
      RETURNING *
    `;
    const result = await db.query(query, [id, approvedAmount, reviewerId, repaymentPlan]);
    return result.rows[0];
  }

  static async disburse(id, disbursedAmount) {
    const query = `
      UPDATE applications 
      SET status = 'disbursed', disbursed_date = NOW(), updated_at = NOW()
      WHERE id = $1 
      RETURNING *
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total_applications,
        COUNT(CASE WHEN status = 'submitted' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN status = 'disbursed' THEN 1 END) as disbursed,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
        SUM(CASE WHEN status = 'approved' THEN approved_amount ELSE 0 END) as total_approved_amount,
        SUM(CASE WHEN status = 'disbursed' THEN approved_amount ELSE 0 END) as total_disbursed_amount
      FROM applications
    `;
    const result = await db.query(query);
    return result.rows[0];
  }

  static async getStatsByCountry() {
    const query = `
      SELECT 
        u.country,
        COUNT(*) as total_applications,
        COUNT(CASE WHEN a.status = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN a.status = 'disbursed' THEN 1 END) as disbursed,
        SUM(CASE WHEN a.status = 'approved' THEN a.approved_amount ELSE 0 END) as total_amount
      FROM applications a
      JOIN users u ON a.user_id = u.id
      GROUP BY u.country
      ORDER BY total_applications DESC
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async getStatsByValueChain() {
    const query = `
      SELECT 
        u.value_chain,
        COUNT(*) as total_applications,
        COUNT(CASE WHEN a.status = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN a.status = 'disbursed' THEN 1 END) as disbursed,
        SUM(CASE WHEN a.status = 'approved' THEN a.approved_amount ELSE 0 END) as total_amount
      FROM applications a
      JOIN users u ON a.user_id = u.id
      GROUP BY u.value_chain
      ORDER BY total_applications DESC
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async delete(id) {
    const query = 'DELETE FROM applications WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Application; 