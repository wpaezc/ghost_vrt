//Importar Playwright
const { LoginPage } = require('./models/LoginPage');
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password

const url = `${ghostUrl}/ghost/#/signin`;
console.log('Run tests for POST MANAGEMENT');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Publish post')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page, url, user, password);
    loginPage.enter_ghost()
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.click('id=ember28');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina6.png'})
    // Crear nuevo post
    await page.click('text= New post');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina7.png'})
    // editar titulo del post
    await page.fill('textarea', 'blabla');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina8.png'})

    await page.click("button");
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina9.png'})
    // Publicar el post
    await page.click("section .gh-publishmenu-trigger");
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina10.png'})

    await page.click("footer .gh-publishmenu-button");
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina11.png'})

    // // salir de la post
    await page.click('button');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina12.png'})

    await page.click('section .ember-view');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina13.png'})

    //Finalizar la prueba
    console.log('Ok Scenario: Publish post')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
