//Importar Playwright
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password

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
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await new Promise(r => setTimeout(r, 7000));
    // Ingresar con las credenciales del usuario
    await page.fill('id=ember8', user)
    await page.fill('id=ember10', password)
    await page.screenshot({path: './pagina2.png'})
    await page.click('id=ember12')
    await new Promise(r => setTimeout(r, 7000));
    // En la pagina principal, hacer click en la opcion Staff del sidebar
    await page.screenshot({path: './loggedin2.png'})
    await page.click('id=ember32')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: './staff2.png'})
    // En la pagina de Staff, hacer click en enviar invitacion  y llenar sus credenciales
    await page.click('.view-actions')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: './invite2.png'})
    await page.fill('id=new-user-email', 'manuelmasferrer@gmail.ccc')
    await page.selectOption('id=new-user-role', "608cecca2e33ef75a3b9cee1")
    await page.screenshot({path: './filled_invite2.png'})
    await page.click('"Send invitation now"')
    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({path: './sent_invite2.png'})

    //Finalizar la prueba
    console.log('OK Scenario: Invalid Invitation')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
