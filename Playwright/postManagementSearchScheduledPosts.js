//Importar Playwright
const { LoginPage } = require('./models/LoginPage');
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password

const titleTest = "postManagementSearchScheduledPosts"
const pathScreenshotsTest =`./screensTest/${titleTest}/`

const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for POST MANAGEMENT');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Search scheduled posts')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, url, user, password);
    loginPage.enter_ghost()
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.click('id=ember28');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina6.png'})
    // // Buscar todo los bosquejos de paginas
    await page.click('text=All Posts ');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina7.png'})

    await page.click('text=Scheduled Posts ');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathScreenshotsTest+ './pagina8.png'})

    //Finalizar la prueba
    console.log('Ok Scenario: Search scheduled posts')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
