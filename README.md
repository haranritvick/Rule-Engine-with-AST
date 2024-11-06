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
 - `((age < 30 AND experience >= 2) OR (age >= 30 AND experience >= 5)) AND performance = 'High'`
 - `(salary >= 60000 AND location = 'NYC') OR (salary >= 45000 AND location = 'Remote')`
 - After adding the rule press on **Combine Rules** button.
- **Add values for evaluation:**

   `{
    "age": 28,
    "experience": 3,
    "performance": "High",
    "salary": 48000,
    "location": "Remote"
    }`
 - **Expected Output:** True

## Screenshots of Testcases
![image](https://github.com/user-attachments/assets/b9a1198f-bcf9-49cc-9aea-e356f8c28693)
![image](https://github.com/user-attachments/assets/ce9a7764-1345-44c0-b8a3-609d21d75049)
![image](https://github.com/user-attachments/assets/8ccc2d30-43a7-4253-b6ba-25aa2de27e0a)

## Edge case Screenshots
 ### If the rule expression is invalid.

![image](https://github.com/user-attachments/assets/e36996c6-b457-46ff-b24c-2193cc33d1bf)

### We can edit/delete the rule once added

![image](https://github.com/user-attachments/assets/6cf31094-1133-42ad-9e81-5eeda6cfb519)
