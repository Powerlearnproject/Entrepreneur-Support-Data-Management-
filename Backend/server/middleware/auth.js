const jwt = require('jsonwebtoken');
const { getRow } = require('../../config/db');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await getRow('SELECT id, email, first_name, last_name, role, business_type, country, region FROM users WHERE id = $1 AND is_active = true', [decoded.userId]);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Role-based access control
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

// Helper functions for common role checks
const requireAdmin = requireRole(['admin']);
const requireEntrepreneur = requireRole(['entrepreneur']);
const requireAdminOrEntrepreneur = requireRole(['admin', 'entrepreneur']);

// Check if user owns the resource (for entrepreneurs)
const requireOwnership = (resourceTable, resourceIdField = 'user_id') => {
  return async (req, res, next) => {
    if (req.user.role === 'admin') {
      return next(); // Admins can access all resources
    }

    const resourceId = req.params.id || req.body.id;
    if (!resourceId) {
      return res.status(400).json({ error: 'Resource ID required' });
    }

    try {
      const resource = await getRow(
        `SELECT ${resourceIdField} FROM ${resourceTable} WHERE id = $1`,
        [resourceId]
      );

      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }

      if (resource[resourceIdField] !== req.user.id) {
        return res.status(403).json({ error: 'Access denied to this resource' });
      }

      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};

// Rate limiting for OTP requests
const otpRateLimit = (req, res, next) => {
  // This would be implemented with a proper rate limiting library
  // For now, we'll use a simple approach
  const email = req.body.email;
  const now = Date.now();
  
  // Store OTP requests in memory (in production, use Redis)
  if (!req.app.locals.otpRequests) {
    req.app.locals.otpRequests = new Map();
  }

  const userRequests = req.app.locals.otpRequests.get(email) || [];
  const recentRequests = userRequests.filter(time => now - time < 60000); // Last minute

  if (recentRequests.length >= 3) {
    return res.status(429).json({ error: 'Too many OTP requests. Please wait before trying again.' });
  }

  recentRequests.push(now);
  req.app.locals.otpRequests.set(email, recentRequests);

  next();
};

module.exports = {
  authenticateToken,
  requireRole,
  requireAdmin,
  requireEntrepreneur,
  requireAdminOrEntrepreneur,
  requireOwnership,
  otpRateLimit
}; 