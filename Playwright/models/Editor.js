class Editor {
  constructor(page) {
    this.page = page
  }

  async fillTitle(text) {
    await this.page.fill('textarea', text);
  }
}

module.exports = { Editor }