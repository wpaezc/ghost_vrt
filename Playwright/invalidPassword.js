//Importar Playwright
const playwright = require('playwright');

const url = 'http://localhost:2368/ghost/';

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
    await new Promise(r => setTimeout(r, 7000));
    // Ingresar con las credenciales del usuario
    await page.fill('id=ember8', 'ma.sanchezm12@uniandes.edu.co')
    await page.fill('id=ember10', 'manuel0123')
    await page.screenshot({path: './pagina4.png'})
    await page.click('id=ember12')
    await new Promise(r => setTimeout(r, 7000));



    // En la pagina principal, hacer click en la opcion Staff del sidebar
    await page.screenshot({path: './loggedin4.png'})
    await page.click('id=ember32')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: './staff4.png'})
    // En la pagina de Staff, hacer click en perfil del owner para editarlo
    await page.click('"Owner"')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: './owner4.png'})
    await page.fill('id=user-password-old', 'manuel0123')
    await page.fill('id=user-password-new', 'manuel01234')
    await page.fill('id=user-new-password-verification', 'manuel01235')
    await page.click('"Change Password"')
    await page.screenshot({path: './unmatchedPassword4.png'})

    //Finalizar la prueba
    await browser.close();
  }
  return;
})();//Llamado propio de la función