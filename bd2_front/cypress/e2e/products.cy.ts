import 'cypress-file-upload';
describe('Deve cadastrar um produto', () => {
  it('Tem logar e cadastrar um produto', () => {
    cy.visit('http://localhost:3001/')
    cy.get('#email').type('jose.sicupiraneto@gmail.com')
    cy.get('#password').type('123')
    cy.get('#button-login').click()

    cy.get('#add-item').click()
    cy.get('#name').type('batata doce')
    cy.get('#description').type('batata doce')
    cy.get('#manufacturingDate').type('2022-10-10')
    cy.get('#expirationDate').type('2022-10-10')
    cy.get('#type').type('batata')
    cy.get('#amount').type('10')
    cy.get('#price').type('10')
    cy.get('#image').attachFile('image.png')
    cy.get('#submitProduct').click()
  })
})