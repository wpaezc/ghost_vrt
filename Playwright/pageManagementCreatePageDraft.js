const { LoginPage } = require('./models/LoginPage');
//Importar Playwright
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password

const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for PAGE MANAGEMENT');

const titleTest = "pageManagementCreatePageDraft"
const pathScreenshotsTest =`./screensTest/${titleTest}/`


//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Create page draft')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, url, user, password);
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    loginPage.enter_ghost()

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
    // salir de la pagina
    await page.click('id=ember328');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina9.png'})

    await page.click('id=ember328');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina10.png'})

    //Finalizar la prueba
    console.log('Ok Scenario: Create page draft')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
