Cypress.Commands.add('login', (username, password) => {
  username ||= Cypress.config().adminEmail
  password ||= Cypress.config().adminPassword

  cy.visit('/ghost/#/signin')
  cy.get('input[name="identification"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button.login').click()
})

Cypress.Commands.add('go_to_create_post_page', () => {
  cy.get('a[href="#/posts/"]').click({force: true})
  cy.contains('New post').click({force: true})
})

Cypress.Commands.add('fill_editor', (editor_data) => {
  cy.get('textarea.gh-editor-title').type(editor_data.title)
  //To trigger save data
  //cy.contains('0 words').click()
})

Cypress.Commands.add('finish_editing', (resource) => {
  cy.wait(1000)
  cy.visit(`/ghost/#/${resource}`)
})