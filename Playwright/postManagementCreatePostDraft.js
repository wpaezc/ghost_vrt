//Importar Playwright
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
    console.log('Scenario: Create post draft')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina.png'})

    await page.click('css=button')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina2.png'})
    console.log('Project loaded')
    // ingresar informacion para ingresar
    await page.fill('id=ember8', user);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina3.png'})

    await page.fill('id=ember10', password);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina4.png'})
    // ingresar a posts
    await page.click('id=ember12');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina5.png'})

    await page.click('id=ember28');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina6.png'})
    // Crear nueva post
    await page.click('text=New post');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina7.png'})
    // editar titulo del post
    await page.fill('textarea', 'blabla');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina8.png'})
    // // salir del post
    await page.click('button');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina9.png'})

    await page.click('section .ember-view');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina10.png'})

    //Finalizar la prueba
    console.log('Ok Scenario: Create post draft')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
