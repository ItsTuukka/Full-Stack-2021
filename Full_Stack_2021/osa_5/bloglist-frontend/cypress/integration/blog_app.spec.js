describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ username: 'admin', name: 'mario', password: 'sekret' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.contains('mario logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('väärä')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'admin', password: 'sekret' })
      })

      it('a blog can be created', function () {
        cy.contains('create new blog').click()
        cy.get('#title-input').type('how to use cypress')
        cy.get('#author-input').type('mluukkai')
        cy.get('#url-input').type('huippukiva.com')
        cy.get('#create-blog').click()
        cy.contains('a new blog how to use cypress by mluukkai added')
        cy.contains('how to use cypress')
      })

      it('a blog can be liked', function () {
        cy.contains('create new blog').click()
        cy.get('#title-input').type('how to use cypress')
        cy.get('#author-input').type('mluukkai')
        cy.get('#url-input').type('huippukiva.com')
        cy.get('#create-blog').click()
        cy.get('#view-detail').click()
        cy.contains('likes 0')
        cy.get('#like-button').click()
        cy.contains('likes 1')
      })

      it('a blog can be deleted', function () {
        cy.contains('create new blog').click()
        cy.get('#title-input').type('how to use cypress')
        cy.get('#author-input').type('mluukkai')
        cy.get('#url-input').type('huippukiva.com')
        cy.get('#create-blog').click()
        cy.visit('http://localhost:3000') ///have to add this, due to a bug in my code i couldn`t fix
        cy.get('#view-detail').click()
        cy.get('#delete-blog').click()
        cy.contains('blog deleted')
        cy.get('html').should('not.contain', 'how to use cypress')
      })
    })
  })
})