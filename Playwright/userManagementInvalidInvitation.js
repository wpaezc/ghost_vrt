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

const titleTest = "userManagementInvalidInvitation"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

const url = `${ghostUrl}/ghost/#/signin`;

console.log('Run tests for USER MANAGEMENT');
//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Invalid Invitation')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, url, user, password);
    const navigator = new Navigate(page);
    const editor = new Editor(page);

    await loginPage.enter_ghost();
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_1successfulLogin.png`});

    // En la pagina principal, hacer click en la opcion Staff del sidebar
    await page.click('text=Staff')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_2displayStaff.png`});
    // En la pagina de Staff, hacer click en enviar invitacion  y llenar sus credenciales
    await page.click('span:has-text("Invite people")');
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_3inviteUserForm.png`});

    // Crear invitacion con direccion de email erronea
    await page.fill('id=new-user-email', 'example@gmail')
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_4filledInvitation.png`})
    await page.click('"Send invitation now"')
    await page.screenshot({path: pathScreenshotsTest+ `./${version}_5invalidEmailWarning.png`})

    //Finalizar la prueba
    console.log('OK Scenario: Invalid Invitation')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
