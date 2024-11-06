// server/routes/ruleRoutes.js

const express = require('express');
const router = express.Router();
const { create_rule, combine_rules, evaluate_rule } = require('../controllers/ruleController');

// Endpoint to create a rule
router.post('/create-rule', (req, res) => {
  const { ruleString } = req.body;

  // Generate the AST
  const ast = create_rule(ruleString);

  return res.status(200).json({ ruleString, ast });
});

let combinedAstData = null;

// Endpoint to combine rules
router.post('/combine-rules', (req, res) => {
  const { ruleStrings } = req.body;

  const combinedAst = combine_rules(ruleStrings);
  combinedAstData = combinedAst;
  return res.status(200).json({ combinedAst });
});

// Endpoint to evaluate a rule
router.post('/evaluate-rule', (req, res) => {
  const { data } = req.body;

  if (!combinedAstData) {
    return res.status(400).json({ error: 'Combined AST not found. Please combine rules first.' });
  }

  const result = evaluate_rule(combinedAstData, data);
  return res.status(200).json({ result });
});

module.exports = router;
