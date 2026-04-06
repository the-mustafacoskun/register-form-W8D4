const errorMessages = {
    email: "Please enter a valid email address.",
    password: "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
    terms: "You must accept the terms and conditions to proceed."
};
describe('Login Page Tests', () => {
  describe('enable to login button and directed to success page ', () => {
    it('enable to login button with validated input', () => {
      //Arrange
      cy.visit('http://localhost:5173/')
      //Act
      cy.get('[data-cy="email-input"]').type('General_Leuschke@hotmail.com');
      cy.get('[data-cy="password-input"]').type('2odFMqYXH2fQasK');
      cy.get('[data-cy="terms-input"]').check();
      //Assert
      cy.get('[data-cy="submit-button"]').should('be.enabled');
    });
  });
  it('enable to login button with validated input', () => {
    //Arrange
    cy.visit('http://localhost:5173/')
    //Act
    cy.get('[data-cy="email-input"]').type('General_Leuschke@hotmail.com');
    cy.get('[data-cy="password-input"]').type('2odFMqYXH2fQasK');
    cy.get('[data-cy="terms-input"]').check();
    cy.get('[data-cy="submit-button"]').click()

    //Assert
    cy.url().should('include', '/Success');
  });
  //-------------------------------------------------------------------------------------------------------
  describe('disabled submit button', () => {
    it('error message with unvalidated mail', () => {
      //Arrange
      cy.visit('http://localhost:5173/')
      //Act
      cy.get('[data-cy="email-input"]').type('General_Leuschke@hotmail');
      cy.get('[data-cy="terms-input"]').check();
      //Assert
      cy.get('[data-cy^="error-"]:visible').should('have.length', 1).and('be.visible');
      cy.get('[data-cy="error-msg"]').should('contain',errorMessages.email);
      cy.get('[data-cy="submit-button"]').should('be.disabled');

    });
    it('error message with unvalidated mail and unvalidated password', () => {
      //Arrange
      cy.visit('http://localhost:5173/')
      //Act
      cy.get('[data-cy="email-input"]').type('General_Leuschke@hotmail');
      cy.get('[data-cy="password-input"]').type('123');
      cy.get('[data-cy="terms-input"]').check();
      //Assert
      cy.get('[data-cy^="error-"]:visible').should('have.length', 2).and('be.visible');
      cy.get('[data-cy="error-msg"]').should('contain',errorMessages.email).and('be.visible');
      cy.get('[data-cy="error-msg"]').should('contain',errorMessages.password).and('be.visible');
    });
    it('terms checkbox did not checked ', () => {
      //Arrange
      cy.visit('http://localhost:5173/')
      //Act
      cy.get('[data-cy="email-input"]').type('General_Leuschke@hotmail.com');
      cy.get('[data-cy="password-input"]').type('123');
      //Assert
      cy.get('[data-cy="submit-button"]').should('be.disabled');


    });
  });

});