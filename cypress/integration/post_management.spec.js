context('Post management', () => {
  beforeEach(() => {
    cy.login()
  })

  context('creates draft post ', () => {
    it('shows project on principal page', () => {
      let editor_data = {
        title: `Title of post -${Math.random().toString()}`,
      }
      cy.go_to_create_post_page()
      cy.fill_editor(editor_data)

      //cy.finish_editing("posts")
      //cy.contains(editor_data.title)
    })
  })
})