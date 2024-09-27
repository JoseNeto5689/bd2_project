describe('Tentando cadastrar um usuário', () => {
  it('Tem que direcionar para a página de login novamente', () => {
    cy.visit('http://localhost:3001/signup')

    cy.get('#name').type('Jose');
    cy.get('#email').type('jose.sicupiraneto@gmail.com');
    cy.get('#password').type('123');
    cy.get('#confirm-password').type('123');
    cy.get('#button-singUp').click()

    cy.url().should('eq', 'http://localhost:3001/')
  })
})

describe('Tentando fazer login com sucesso', () => {
  it('Tem que ser direcionado para a página de produtos', () => {
    cy.visit('http://localhost:3001/')
    cy.wait(5000);
    cy.get('#email').type('jose.sicupiraneto@gmail.com')
    cy.get('#password').type('123')
    cy.get('#button-login').click()
    cy.wait(5000);
    cy.url().should('eq', 'http://localhost:3001/products');
  })
})

describe('Tentando fazer login com o email errado', () => {
  it('Deve mostrar um erro ao tentar logar', () => {
    cy.visit('http://localhost:3001/')
    cy.wait(5000);
    cy.get('#email').type('jossicupiranetogmail.com')
    cy.get('#password').type('123')
    
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Inclua um "@" no endereço de e-mail. "josesicupiranetogmail.com" está com um "@" faltando');
    });

    cy.get('#button-login').click()
    cy.wait(5000);
  })
})

describe('Tentando fazer login passando um e-mail não cadastrado', () => {
  it('Tem que direcionar para a página de login novamente', () => {
    cy.visit('http://localhost:3001/')
    cy.wait(5000);
    cy.get('#email').type('jose123.sicupiraneto@gmail.com');
    cy.get('#password').type('123');

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('E-mail ou senha inválidos');
    });

    cy.get('#button-login').click()
    cy.wait(5000);
    cy.url().should('eq', 'http://localhost:3001/');
  })
})

describe('Tentando fazer login passando um password não cadastrado', () => {
  it('Tem que direcionar para a página de login novamente', () => {
    cy.visit('http://localhost:3001/')
    cy.get('#email').type('jose.sicupiraneto@gmail.com');
    cy.get('#password').type('1234');

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('E-mail ou senha inválidos');
    });

    cy.get('#button-login').click()
    cy.wait(500);
    cy.url().should('eq', 'http://localhost:3001/');
  })
})

describe('Tentando cadastrar um usuário e fazer login com ele', () => {
  it('Tem que direcionar para a página de login novamente', () => {
    cy.visit('http://localhost:3001/signup')

    cy.get('#name').type('UsuarioTeste');
    cy.get('#email').type('usuarioTes@gmail.com');
    cy.get('#password').type('123456789');
    cy.get('#confirm-password').type('123456789');
    cy.get('#button-singUp').click()

    cy.wait(5000);
    cy.get('#email').type('usuarioTes@gmail.com')
    cy.get('#password').type('123456789')
    cy.get('#button-login').click()
    cy.wait(5000);
    cy.url().should('eq', 'http://localhost:3001/products');
  })
})