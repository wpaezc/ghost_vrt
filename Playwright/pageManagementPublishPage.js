//Importar Playwright
const { LoginPage } = require('./models/LoginPage');
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password

const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for PAGE MANAGEMENT');

const titleTest = "pageManagementPublishPage"
const pathScreenshotsTest =`./screensTest/${titleTest}/`


//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Publish page')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new LoginPage(page, url, user, password);
    loginPage.enter_ghost()
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA

    await page.click('id=ember30');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina6.png'})
    // Crear nueva pagina
    await page.click('id=ember142');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina7.png'})
    // editar titulo de la pagina
    await page.fill('textarea', 'blabla');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina8.png'})

    await page.click("button");
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina9.png'})
    // Publicar la pagina
    await page.click("section .gh-publishmenu-trigger");
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina10.png'})

    await page.click("footer .gh-publishmenu-button");
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina11.png'})

    await page.click('id=ember328');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina12.png'})

    console.log('Ok Scenario: Publish page')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
