const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// ML model endpoint for scoring applications
router.post('/score', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { applicationData } = req.body;

    // This would integrate with an actual ML service
    // For now, we'll use a simplified scoring algorithm
    const score = await calculateMLScore(applicationData);

    res.json({
      score,
      riskLevel: score > 80 ? 'low' : score > 60 ? 'medium' : 'high',
      recommendations: generateRecommendations(score, applicationData)
    });
  } catch (error) {
    console.error('ML scoring error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simplified ML scoring function
async function calculateMLScore(applicationData) {
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

  // Business plan length scoring
  if (applicationData.businessPlan) {
    const planLength = applicationData.businessPlan.length;
    if (planLength > 1000) score += 15;
    else if (planLength > 500) score += 10;
    else if (planLength > 100) score += 5;
  }

  return Math.min(Math.max(score, 0), 100);
}

// Generate recommendations based on score
function generateRecommendations(score, applicationData) {
  const recommendations = [];

  if (score < 60) {
    recommendations.push('Consider requesting additional collateral');
    recommendations.push('Review business plan for completeness');
    recommendations.push('Consider smaller loan amount');
  } else if (score < 80) {
    recommendations.push('Standard review process recommended');
    recommendations.push('Monitor repayment schedule closely');
  } else {
    recommendations.push('Fast-track approval recommended');
    recommendations.push('Consider additional loan products');
  }

  return recommendations;
}

module.exports = router; 