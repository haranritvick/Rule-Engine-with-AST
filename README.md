# Rule Engine with AST

A 3-tier rule engine application(Simple UI, API and Backend, Data) to determine
user eligibility based on attributes like age, department, income, spend etc.The system can use Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic
creation,combination, and modification of these rules.

# Architecture
This application is built with a 3-tier architecture, consisting of:

- Frontend (Client) - Simple UI with rule creation and evaluation.
- API Layer - API endpoints for creating, combining, and evaluating rules.
- Backend (Database) - Stores rules and metadata in a database.

# Data Structure
**Node Structure**
To represent the AST, we use a Node data structure that supports creating, combining, and modifying rules.
Each node has the following fields:

- type: String (e.g., "operator" for AND/OR, "operand" for conditions)
- left: Node (left child)
- right: Node (right child, if applicable)
- value: Optional operand value for conditions (e.g., numeric values for comparisons)

# Database Schema
Using MongoDB as the database for rule storage.

Example schema for storing rules:
`
{
  "_id": "uniqueRuleId",
  "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
  "ast": {
    "type": "operator",
    "operator": "AND",
    "left": { ... },
    "right": { ... }
  }
}
`
# API Design
1. `POST /api/rules/create`

- Description: Creates a rule from a string and generates the AST.
- Input: JSON object with ruleString
- Output: Node object representing the AST
  
2. `POST /api/rules/combine`

- Description: Combines multiple rules into a single AST.
- Input: Array of ruleStrings
- Output: Root node of the combined AST
  
3. `POST /api/rules/evaluate`

- Description: Evaluates a rule AST against a set of user attributes.
- Input: Rule ID and JSON data with user attributes
- Output: true or false (eligibility result)

# Setup Instructions
1. Clone the Repository
   `git clone https://github.com/haranritvick/Rule-Engine-with-AST.git
    cd Rule-Engine-with-AST
`
2. Setup Client
   `cd client
    npm install axios dotenv
    npm start
`
3. Setup Server
   `cd ../server
    npm install express axios dotenv cors mongoose body-parser nodemon
    npx nodemon server.js
`
# Environment Setup
Create a .env file in the server directory with the following contents:
`MONGO_URI=your_mongodb_connection_string
 PORT=5000
`

# Test Cases
**Example:**
Rule Addition & Combination:
- Rule 1: ` ((age < 30 AND experience >= 2) OR (age >= 30 AND experience >= 5)) AND performance = 'High'`
- Rule 2" `(salary >= 60000 AND location = 'NYC') OR (salary >= 45000 AND location = 'Remote')`

### Rule Evaluation:
`{ 
  "age": 28, 
  "experience": 3, 
  "performance": "High", 
  "salary": 48000, 
  "location": "Remote" 
}
`
### Expected Output: `true`

# Edge Cases

**1. Invalid Rule Expression:** If a rule string contains invalid syntax or unsupported operators, the system should return an error message.

![image](https://github.com/user-attachments/assets/e36996c6-b457-46ff-b24c-2193cc33d1bf)

**2. Rule Updation or deletion using edit/delete option:** If an attribute is missing from the input data, the evaluation should handle it gracefully, either by defaulting to `false` or by flagging it as an error.

![image](https://github.com/user-attachments/assets/6cf31094-1133-42ad-9e81-5eeda6cfb519)

# Screenshots

1. Rule Creation, Combination, Evaluation Output:
   
![image](https://github.com/user-attachments/assets/b9a1198f-bcf9-49cc-9aea-e356f8c28693)

![image](https://github.com/user-attachments/assets/ce9a7764-1345-44c0-b8a3-609d21d75049)


   ![image](https://github.com/user-attachments/assets/8ccc2d30-43a7-4253-b6ba-25aa2de27e0a)

# Error Handling
- **Invalid Rule Strings:** Provides error messages for rules with missing operators, operands, or invalid syntax.
- **Undefined Attributes:** Ensures attributes in the evaluation data are valid, based on a catalog of accepted fields.
