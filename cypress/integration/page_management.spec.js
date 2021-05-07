context('Page management', () => {
    beforeEach(() => {
      cy.login()
    })
  
    context('creates new page ', () => {
      it('shows on index page with draft status', () => {
        let title = `Title of post -${Math.random().toString()}`
        cy.go_to_create_post_page()
  
        cy.fill_editor({title})
        cy.finish_editing("posts")
  
        let last_created_post = cy.get('.gh-posts-list-item').first()
        last_created_post.get('h3.gh-content-entry-title').contains(title)
        last_created_post.get('span.gh-badge').contains('Draft')
      })
    })
  })