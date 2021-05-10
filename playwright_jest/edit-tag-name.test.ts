import { chromium } from "playwright";

import {LoginPage} from './loginPage'
import { NewTag } from "./newTag";
import { SelectTag } from './selectTag';


const titleTest = "edit-tag-name.test"
const pathScreenshotsTest =`./screensTest/${titleTest}/`

const url = 'http://localhost:2368/ghost/#/signin';
const userEmail= 'admin@admin.com';
const userPassword='abcde12345';


describe('Launch Tag tests', () => {

    test('Edit Title Tag', async () => {

        //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
        const browser = await chromium.launch({
        })

        const context = await browser.newContext();
        const page = await context.newPage();
        
        const loginPage = new LoginPage(page);
        const newTag = new NewTag(page);
        const selectedTag = new SelectTag(page);

        let nameTag = "Original Title Tag"
        let newNameTag="Modify Title Tag"
        let descriptionTag = `This is  the Description of ${nameTag}`
        
        //Abrir la URL a probar en la página singin y dirigirse a Tag
        await page.goto(url);
        await loginPage.login(userEmail,userPassword);
        await page.screenshot({path: pathScreenshotsTest+'./1_login.png'});
        await new Promise(r => setTimeout(r, 2000));
        await page.click("text=Tags");
        
        //Interactuar con la aplicación web: Crear nuevo Tag
        await newTag.clickNewTag();
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: pathScreenshotsTest+'./2_goToCreateTag.png'});
        await newTag.fillNameTag(nameTag);
        await newTag.fillNameDescription(descriptionTag);
        await newTag.clickSaveTag();
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: pathScreenshotsTest+`./3_See_${nameTag}.png`})
       
        
        //Edit Name Tag
        await selectedTag.clickTag(nameTag);

        await selectedTag.deleteNameTag();
        await new Promise(r => setTimeout(r, 3000));
        await selectedTag.fillNameTag(newNameTag);
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: pathScreenshotsTest+`./4_New_title_${newNameTag}.png`})
        await selectedTag.clickSaveTag();
        await new Promise(r => setTimeout(r, 3000));
    

        //Verification 
        await page.click("text=Tags");
        let feedback = await page.$(`text=${newNameTag}`);
        
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: pathScreenshotsTest+'./5_seeNewTag.png'});

        //Finalizar la prueba
        await browser.close();
    }, 90000)

})