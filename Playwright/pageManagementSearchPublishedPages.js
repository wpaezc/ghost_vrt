//Importar Playwright
const { LoginPage } = require('./models/LoginPage');
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password

const titleTest = "pageManagementSearchPublishedPages"
const pathScreenshotsTest =`./screensTest/${titleTest}/`

const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for PAGE MANAGEMENT');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Search published pages')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, url, user, password);
    await loginPage.enter_ghost()
    
    await page.click('id=ember30');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina6.png'})
    // Buscar todo las paginas publicadas
    await page.click('text=All Pages ');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina7.png'})

    await page.click('text=Published Pages ');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina8.png'})

    //Finalizar la prueba
    console.log('Ok Scenario: Search published pages')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
