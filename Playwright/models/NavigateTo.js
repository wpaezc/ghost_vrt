class NavigateTo {
  constructor(page) {
    this.page = page
  }
  async bySelector(selector) {
    await this.page.click(selector);
    await new Promise(r => setTimeout(r, 1000));
  }
}
module.exports = { NavigateTo };