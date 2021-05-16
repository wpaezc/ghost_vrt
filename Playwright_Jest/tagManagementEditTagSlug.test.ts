import { chromium } from "playwright";

import {LoginPage} from './loginPage'
import { NewTag } from "./newTag";
import { SelectTag } from './selectTag';

const config = require('../playwright_properties.json');
const version= `${config.version}_`
const nameScreenPath=config.nameScreenPath



const titleTest = "tagManagementEditTagSlug"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

const ghostUrl = config.ghostUrl
const userEmail = config.user
const userPassword = config.password
const url = `${ghostUrl}/ghost/#/signin`;

describe('Launch Tag tests', () => {

    test('Edit Title Tag', async () => {

        //Contenido de la prueba
        
        //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
        const browser = await chromium.launch({
        })

        const context = await browser.newContext();
        const page = await context.newPage();
        
        const loginPage = new LoginPage(page);
        const newTag = new NewTag(page);
        const selectedTag = new SelectTag(page);

        let nameTag = "Original_Slug_Title_Tag"
        let descriptionTag = `This is  the Description of ${nameTag}`
        let nameSlugTag= 'Diferent Slug Name'
        
        //Abrir la URL a probar en la página singin y dirigirse a Tag
        await page.goto(url);
        await loginPage.login(userEmail,userPassword);
        await page.screenshot({path: pathScreenshotsTest+`./${version}1_login.png`});
        await new Promise(r => setTimeout(r, 2000));
        await page.click("text=Tags");
        
        //Interactuar con la aplicación web: Crear nuevo Tag
        await newTag.clickNewTag();
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: pathScreenshotsTest+`./${version}2_goToCreateTag.png`});
        await newTag.fillNameTag(nameTag);
        await newTag.fillNameDescription(descriptionTag);
        await newTag.clickSaveTag();
        await new Promise(r => setTimeout(r, 4000));
        await page.screenshot({path: pathScreenshotsTest+`./${version}3_See_Slug_${nameTag}.png`})
       
        
        //Edit Slug Tag
        await selectedTag.clickTag(nameTag);

        await selectedTag.deleteSlugTag();
        await new Promise(r => setTimeout(r, 3000));
        await selectedTag.fillSlugTag(nameSlugTag);
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: pathScreenshotsTest+`./${version}4_New_slug_${nameTag}.png`})
        await selectedTag.clickSaveTag();
        await new Promise(r => setTimeout(r, 3000));
    

        //Verification 
        await page.click("text=Tags");
        let feedback = await page.$(`text=${nameSlugTag}`);
        
        await new Promise(r => setTimeout(r, 3000));
        await page.screenshot({path: pathScreenshotsTest+`./${version}5_seeNewTag.png`});

        //Finalizar la prueba
        await browser.close();
    }, 90000)

})