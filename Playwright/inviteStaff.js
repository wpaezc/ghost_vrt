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
    // Ingresar con las credenciales del usuario IMPORTANTE CAMBIAR  CREDENCIALES SEGUN USUARIO LOCAL
    await page.fill('id=ember8', 'ma.sanchezm12@uniandes.edu.co')
    await page.fill('id=ember10', 'manuel0123')
    await page.screenshot({path: './pagina1.png'})
    await page.click('id=ember12')
    await new Promise(r => setTimeout(r, 7000));
    // En la pagina principal, hacer click en la opcion Staff del sidebar
    await page.screenshot({path: './loggedin1.png'})
    await page.click('id=ember32')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: './staff1.png'})
    // En la pagina de Staff, hacer click en enviar invitacion  y llenar sus credenciales
    await page.click('.view-actions')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: './invite1.png'})
    await page.fill('id=new-user-email', 'mmasferrer@gmail.com')
    await page.selectOption('id=new-user-role', "608cecca2e33ef75a3b9cee1")
    await page.screenshot({path: './filled_invite1.png'})
    await page.click('"Send invitation now"')
    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({path: './sent_invite1.png'})

    //Finalizar la prueba
    await page.click('text=Tags')
    await page.click('text=Staff')
    await page.click('"Revoke"')
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({path: './revoked_invite1.png'})
    await browser.close();
  }
  return;
})();//Llamado propio de la función