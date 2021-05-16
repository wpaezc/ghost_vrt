//Importar Playwright
const { LoginPage } = require('./models/LoginPage');
const { Navigate } = require('./models/Navigate');

const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password
const version= `${config.version}_`
const nameScreenPath=config.nameScreenPath

const titleTest = "pageManagementSearchDraftPages"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for PAGE MANAGEMENT');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Search draf pages')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, url, user, password);
    const navigator = new Navigate(page);
    await loginPage.enter_ghost()
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await navigator.clickOnSidebar('pages')
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_1visit_pages.png`})

    // Buscar todo los bosquejos de paginas
    await page.click('text=All Pages ');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_2click_all_pages.png`})

    await page.click('text=Draft Pages ');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_3see_draft_pages.png`})

    //Finalizar la prueba
    console.log('Ok Scenario: Search draf pages')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
