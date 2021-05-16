//Importar Playwright
const { LoginPage } = require('./models/LoginPage');
const { Navigate } = require('./models/Navigate');
const { Editor } = require('./models/Editor');
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password
const version= `${config.version}_`
const nameScreenPath=config.nameScreenPath

const titleTest = "postManagementCreatePostDraft"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for POST MANAGEMENT');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Create post draft')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, url, user, password);
    const navigator = new Navigate(page);
    const editor = new Editor(page);
    await loginPage.enter_ghost()
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_1good_login.png`})
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await navigator.clickOnSidebar('posts')
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_2visit_posts.png`})
    // Crear nueva post
    await navigator.clickOnNewEditor('post')
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_3new_post.png`})
    // editar titulo del post
    await editor.fillTitle("Using page objets")
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_4editing.png`})
    // // salir del editor
    await navigator.saveAndFinishEditing('posts')
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_5returning_and_saving.png`})

    await page.click('section .ember-view');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_6end_state.png`})

    //Finalizar la prueba
    console.log('Ok Scenario: Create post draft')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
