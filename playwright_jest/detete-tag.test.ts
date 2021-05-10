import { chromium } from "playwright";

import {LoginPage} from './loginPage'
import { NewTag } from "./newTag";
import { SelectTag } from './selectTag';


const titleTest = "detete-tag.test"
const pathScreenshotsTest =`./screensTest/${titleTest}/`

const url = 'http://localhost:2368/ghost/#/signin';
const userEmail= 'ca.manzo973@uniandes.edu.co';
const userPassword='921124mota';


describe('Launch Tag tests', () => {

    test('Edit Title Tag', async () => {

        //Contenido de la prueba
        console.log(`START  ${titleTest} >>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
        
        //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
        const browser = await chromium.launch({
            headless: false
        })

        const context = await browser.newContext();
        const page = await context.newPage();
        
        const loginPage = new LoginPage(page);
        const newTag = new NewTag(page);
        const selectedTag = new SelectTag(page);

        let nameTag = "To Delete Title Tag"
        let descriptionTag = `This is  the Description of ${nameTag}`
        
        //Abrir la URL a probar en la página singin y dirigirse a Tag
        await page.goto(url);
        await loginPage.login(userEmail,userPassword);
        console.log(`* Success Login`)
        await page.screenshot({path: pathScreenshotsTest+'./1_login.png'});
        await new Promise(r => setTimeout(r, 2000));
        await page.click("text=Tags");
        console.log(`* Go to Tag`)
        
        //Interactuar con la aplicación web: Crear nuevo Tag
        await newTag.clickNewTag();
        console.log(`* Click Create New Tag`)
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: pathScreenshotsTest+'./2_goToCreateTag.png'});
        await newTag.fillNameTag(nameTag);
        console.log(`   * Fill name `)
        await newTag.fillNameDescription(descriptionTag);
        console.log(`   * Fill Description `)
        await newTag.clickSaveTag();
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: pathScreenshotsTest+`./3_See_${nameTag}.png`})
        await page.click("text=Tags");
        console.log(`* Go to Tag`)
        await new Promise(r => setTimeout(r, 3000));
        
       
        
        //Delete Name Tag
        console.log(`Steps: -----------------------------`)
        console.log(`* Select and open ${nameTag}`)
        await selectedTag.clickTag(nameTag);

       
        await selectedTag.clickDeleteTag();
        await new Promise(r => setTimeout(r, 3000));
        console.log(`* Tag deteted`)
        

        //Verification 
        await page.click("text=Tags");
        let feedback = await page.$(`text=${nameTag}`);
        
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: pathScreenshotsTest+'./4_seeNotTag.png'});

        console.log(`Verification:  -------------------------
            * Tag. Your tag was ${feedback?'not':'successfully'} Deleted`)

        //Finalizar la prueba
        await browser.close();
        console.log(`END ${titleTest} <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
    })

})