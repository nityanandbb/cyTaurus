# awsCypress Cypress Testing Project
# 1) Introduction :-
This project is a Cypress testing suite for automated end-to-end testing, utilizing the Page Object Model (POM) for better maintainability and readability. It includes reusable utility functions and generates reports for analysis.

# 2) Prerequisites
Node.js and npm installed
Cypress installed (npm install cypress) 
Git installed
# 3) Project Structure

Project Root
├── cypress/
│   ├── e2e/
│   │   ├── reporter.js
│   │   └── (test scripts)
│   ├── plugins/
│   │   └── (plugin scripts)
│   ├── support/
│   │   ├── commands.js
│   │   ├── index.js
│   │   └── utils/
│   │       └── (utility scripts)
│   └── page_objects/
│       └── (page object scripts)
│
├── package-lock.json
├── package.json
└── (other project files)

# 4) Setting Up the Project
Clone the repository:

git clone https://github.com/nityanandbb/awsCypress

# 5) cd your-repo
# 6) Install dependencies:

npm install

# 7) Page Object Model

Define your page objects in the cypress/page_objects/ directory.
Each page object represents a page or a component and contains locators and methods to interact with the page.

# Example Page Object

// cypress/page_objects/LoginPage.js
class LoginPage {
  visit() {
    cy.visit('/login');
  }

  enterUsername(username) {
    cy.get('#username').type(username);
  }

  enterPassword(password) {
    cy.get('#password').type(password);
  }

  submit() {
    cy.get('#login-button').click();
  }
}

export default LoginPage;


# 8) Writing Test Scripts
Write your test scripts in the cypress/e2e/ directory.
Import and use the page objects to perform actions in your tests.

Example Test Script

// cypress/e2e/loginTest.js
import LoginPage from '../page_objects/LoginPage';

describe('Login Test', () => {
  const loginPage = new LoginPage();

  it('should log in with valid credentials', () => {
    loginPage.visit();
    loginPage.enterUsername('user');
    loginPage.enterPassword('password');
    loginPage.submit();
    cy.url().should('include', '/dashboard');
  });
});

# 9) Reusable Utility Functions
Define reusable utility functions in the cypress/support/utils/ directory.
Import and use these functions in your test scripts or page objects.


Example Utility Function

// cypress/support/utils/util.js
export function VerifyLovin(username, Password) {
   // login code below
  return login_status;
}

# 10) Running Cypress in UI Mode

Start Cypress in UI mode:

npx cypress open

Use the Cypress Test Runner to select and run tests.

Running Cypress Tests

Run tests from the command line:

# Example :- 

npx cypress run
# 11 ) Report Analysis.

After running tests, Cypress generates a report.
View the report in the terminal or the cypress/reports directory (if configured).
Debugging
# 12) Use Cypress's built-in debugging tools:
cy.debug() to pause the test and inspect the state.
Use the browser's DevTools during test execution in UI mode.
Enable detailed logs in Cypress configuration if necessary.
