const { LoginPage } = require('./models/LoginPage');
const { Navigate } = require('./models/Navigate');
const { Editor } = require('./models/Editor');
//Importar Playwright
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password
const version= `${config.version}_`
const nameScreenPath=config.nameScreenPath

const titleTest = "userManagementInvalidPassword"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

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
    const loginPage = new LoginPage(page, url, user, password);
    const navigator = new Navigate(page);
    const editor = new Editor(page);
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await loginPage.enter_ghost();
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_1successfulLogin.png`});
    
    //Desplegar los detalles del Staff
    await navigator.clickOnSidebar('staff');
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_2display_staff.png`});

    // En la pagina de Staff, hacer click en "Invite people"
    // En la pagina de Staff, hacer click en perfil del owner para editarlo
    await page.click('"Owner"');
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_3originalOwnerDetail.png`});
    
    await page.fill('id=user-password-old', password)
    await page.fill('id=user-password-new', 'admin12346')
    await page.fill('id=user-new-password-verification', 'admin123456')
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_4passwordEntered.png`})
    await page.click('"Change Password"')
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_5passwordsDontMatch.png`})

    //Finalizar la prueba
    console.log('Ok Scenario:  Change password with invalid values')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
