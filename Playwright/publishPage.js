//Importar Playwright
const playwright = require('playwright');

const url = 'http://localhost:2368/ghost/#/site';

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')

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

    // Ingresar informacion del usuario

    await page.fill('id=ember8', 'ivan1016017@gmail.com');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina3.png'})

    await page.fill('id=ember10', 'ivandario1234');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina4.png'})

    await page.click('id=ember12');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina5.png'})

    await page.click('id=ember30');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina6.png'})

    await page.click('id=ember142');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina7.png'})

    await page.click("button");
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina9.png'})

    await page.click("section .gh-publishmenu-trigger");
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina10.png'})

    await page.click("footer .gh-publishmenu-button");
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina11.png'})

    await page.click('id=ember328');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina12.png'})



    //Finalizar la prueba
    await browser.close();
  }
  return;
})();//Llamado propio de la función