class LoginPage {
  constructor(page, url, user, password) {
    this.page = page;
    this.url = url;
    this.user = user;
    this.password = password;
  }
  async enter_ghost() {
    await this.page.goto(this.url);
    await this.page.fill('id=ember8', this.user)
    await this.page.fill('id=ember10', this.password);
    await this.page.click('id=ember12');
    await new Promise(r => setTimeout(r, 1000));
  }
}
module.exports = { LoginPage };