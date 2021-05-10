//Importar Playwright
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password

const titleTest = "userManagementInvalidPassword"
const pathScreenshotsTest =`./screensTest/${titleTest}/`

const url = `${ghostUrl}/ghost/#/signin`;

console.log('Run tests for USER MANAGEMENT');
//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario:  Change password with invalid values')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await new Promise(r => setTimeout(r, 7000));
    // Ingresar con las credenciales del usuario
    await page.fill('id=ember8', user)
    await page.fill('id=ember10', password)
    await page.screenshot({path: pathScreenshotsTest+ './pagina4.png'})
    await page.click('id=ember12')
    await new Promise(r => setTimeout(r, 7000));



    // En la pagina principal, hacer click en la opcion Staff del sidebar
    await page.screenshot({path: pathScreenshotsTest+ './loggedin4.png'})
    await page.click('id=ember32')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: pathScreenshotsTest+ './staff4.png'})
    // En la pagina de Staff, hacer click en perfil del owner para editarlo
    await page.click('"Owner"')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: pathScreenshotsTest+ './owner4.png'})
    await page.fill('id=user-password-old', 'manuel0123')
    await page.fill('id=user-password-new', 'manuel01234')
    await page.fill('id=user-new-password-verification', 'manuel01235')
    await page.click('"Change Password"')
    await page.screenshot({path: pathScreenshotsTest+ './unmatchedPassword4.png'})

    //Finalizar la prueba
    console.log('Ok Scenario:  Change password with invalid values')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
