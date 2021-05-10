//Importar Playwright
import {Page, BrowserContext} from 'playwright';

export class LoginPage {

    constructor (
        // public context:BrowserContext,
        public page:Page,
        ){}

        txtUserName : string = "input[name='identification']";
        txtPassword : string = "input[name='password']";
        btnLogin : string = "text=Sign in";

    //Login
    async login(username:string, password: string){
        await this.page.fill(this.txtUserName,username);
        await this.page.fill(this.txtPassword,password);
        await this.page.click(this.btnLogin);
    }
}
