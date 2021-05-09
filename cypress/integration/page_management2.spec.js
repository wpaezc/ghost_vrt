context('Post management', () => {
    beforeEach(() => {
      cy.login()
    })
  
    context('creates draft post ', () => {
      it('shows on index page with draft status', () => {
        let title = `Title of page -${Math.random().toString()}`
        cy.get('a[href*="#/pages/"]').click()
        cy.get('a[href*="editor/page/"]').first().click()
        cy.get('textarea').first().type(title)
        // cy.contains('0 words').click()
        // // cy.get('a[href*="#/pages/"].blue').click()
        // cy.get("a[href='#/pages/']").first().click();
        
        
        
        

  
        // let last_created_post = cy.get('.gh-posts-list-item').first()
        // last_created_post.get('h3.gh-content-entry-title').contains(title)
        // last_created_post.get('span.gh-badge').contains('Draft')
      })
    })
  })
