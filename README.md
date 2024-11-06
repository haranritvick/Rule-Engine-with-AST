# Rule Engine with AST

A 3-tier rule engine application(Simple UI, API and Backend, Data) to determine
user eligibility based on attributes like age, department, income, spend etc.The system can use Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic
creation,combination, and modification of these rules.


# Instructions to run code

 - Clone the repository `git clone https://github.com/haranritvick/Rule-Engine-with-AST.git`
 
 - `cd client`
 - `npm i axios dotenv`
 - Now Run the client application: `npm start`
 - `cd ..`
 - `cd server`
 - `npm i express axios dotenv cors mongoose body-parser nodemon`
 - Now let's run server: `npx nodemon server.js`

## Testcases

 - Enter the below rules in the rule box input
 - `(age > 18 AND department = 'Sales')`
 - `(salary > 30000 OR experience > 3)`
 - **Expected Combined AST:**
 

    {
  "combinedAst": {
    "type": "operator",
    "operator": "AND",
    "left": {
      "type": "logical",
      "operator": "AND",
      "left": {
        "type": "comparison",
        "operator": ">",
        "left": "age",
        "right": 18
      },
      "right": {
        "type": "comparison",
        "operator": "=",
        "left": "department",
        "right": "Sales"
      }
    },
    "right": {
      "type": "operator",
      "operator": "OR",
      "left": {
        "type": "comparison",
        "operator": ">",
        "left": "salary",
        "right": 30000
      },
      "right": {
        "type": "comparison",
        "operator": ">",
        "left": "experience",
        "right": 3
      }
    }
  }
}
**Add values for evaluation:**

 - `{"age": 22, "department": "Sales", "salary": 25000, "experience": 4}`
 **Expected Output:** True

## Screenshots of Testcases
