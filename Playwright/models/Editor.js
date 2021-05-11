class Editor {
  constructor(page) {
    this.page = page
  }

  async fillTitle(text) {
    await this.page.fill('textarea', text);
  }

  async openPublishPopup(text) {
    await this.page.click("section .gh-publishmenu-trigger");
  }

  async triggerSave() {
    await this.page.click(`css=div.koenig-editor__editor`);
  }

  async publish() {
    await this.page.click("footer .gh-publishmenu-button");
  }
}

module.exports = { Editor }