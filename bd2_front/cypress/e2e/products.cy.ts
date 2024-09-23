describe('Deve cadastrar um produto', () => {
  it('Tem logar e cadastrar um produto', () => {
    cy.visit('http://localhost:3001/')
    cy.get('#email').type('jose.sicupiraneto@gmail.com')
    cy.get('#password').type('123')
    cy.get('#button-login').click()

    cy.get('#add-item').click()
    cy.get('#name').type('batata doce')
    cy.get('#email').type('jose.sicupiraneto@gmail.com')
    cy.get('#email').type('jose.sicupiraneto@gmail.com')
    cy.get('#email').type('jose.sicupiraneto@gmail.com')
  })
})