class Navigate {
  constructor(page) {
    this.page = page
  }
  async bySelector(selector) {
    await this.page.click(selector);
    await new Promise(r => setTimeout(r, 1000));
  }

  async clickOnSidebar(type) {
    await this.page.click(`css=a[href=\"#/${type}/\"]`);
  }

  async clickOnNewEditor(type) {
    await this.page.click(`css=a[href=\"#/editor/${type}/\"]`);
  }
  async saveAndFinishEditing(type) {
    await this.page.click(`css=a[href=\"#/${type}/\"].blue`);
  }
}
module.exports = { Navigate };