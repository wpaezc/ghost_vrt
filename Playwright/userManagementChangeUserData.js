//Importar Playwright
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password
const version= `${config.version}_`
const nameScreenPath=config.nameScreenPath

const titleTest = "userManagementChangeUserData"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

const url = `${ghostUrl}/ghost/#/signin`;

console.log('Run tests for USER MANAGEMENT');
//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Change user data')

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
    await page.screenshot({path: pathScreenshotsTest+ `./${version}pagina3.png`})
    await page.click('id=ember12')
    await new Promise(r => setTimeout(r, 7000));



    // En la pagina principal, hacer click en la opcion Staff del sidebar
    await page.screenshot({path: pathScreenshotsTest+ `./${version}loggedin.png`})
    await page.click('id=ember32')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: pathScreenshotsTest+ `./${version}staff3.png`})
    // En la pagina de Staff, hacer click en perfil del owner para editarlo
    await page.click('"Owner"')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: pathScreenshotsTest+ `./${version}owner3.png`})
    await page.fill('id=user-slug', 'mmasferrer'),
    await page.fill('id=user-twitter', 'https://twitter.com/msmasferrer')
    await page.screenshot({path: pathScreenshotsTest+ `./${version}updatedData3.png`})
  

    //Finalizar la prueba
    console.log('OK Scenario: Change user data')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
