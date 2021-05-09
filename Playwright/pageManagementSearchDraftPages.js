//Importar Playwright
const playwright = require('playwright');
const config = require('../playwright_properties.json');

const ghostUrl = config.ghostUrl
const user = config.user
const password = config.password

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
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina.png'})

    await page.click('css=button')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina2.png'})
    console.log('Project loaded')
    // ingresar informacion para ingresar
    await page.fill('id=ember8', user)
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina3.png'})

    await page.fill('id=ember10', password)
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina4.png'})
    // ingresar a pages
    await page.click('id=ember12');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina5.png'})

    await page.click('id=ember30');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina6.png'})
    // Buscar todo los bosquejos de paginas
    await page.click('text=All Pages ');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina7.png'})

    await page.click('text=Draft Pages ');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina8.png'})

    //Finalizar la prueba
    console.log('Ok Scenario: Search draf pages')
    await browser.close();
  }
  return;
})();//Llamado propio de la función
