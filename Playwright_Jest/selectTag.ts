import {Page, BrowserContext} from 'playwright';

export class SelectTag {
    constructor (

        public page:Page,
        ){}

        txtNameTag: string = "input[name='name']";
        txtSlugTag: string = "input[name='slug']";
        IDnameTag : string = "#tag-name";
        btnSavedTag: string = "text='Save'";
        btnDeleteTag: string = "text ='Delete tag'"; 

    async clickTag(nameTag:string){
        this.page.click(`text='${nameTag}'`)
    }

    async deleteNameTag(){
        

        for (let countClick = 0; countClick < 3; countClick++) {
            this.page.click(this.IDnameTag)
        }

        await this.page.keyboard.press('Backspace')
    }

    async fillNameTag(nameTag:string){
        await this.page.fill(this.txtNameTag,nameTag);
    }

    async deleteSlugTag(){
        

        for (let countClick = 0; countClick < 3; countClick++) {
            this.page.click(this.txtSlugTag)
        }

        await this.page.keyboard.press('Backspace')
    }

    async fillSlugTag(nameSlugTag:string){
        await this.page.fill(this.txtSlugTag,nameSlugTag);
    }


    async clickSaveTag (){
        await this.page.click(this.btnSavedTag);
    }  

    async clickDeleteTag (){
        await this.page.click(this.btnDeleteTag);
        await this.page.keyboard.press('Enter')
    }   




        
}
