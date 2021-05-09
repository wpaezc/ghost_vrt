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

    await page.click('text=All Pages ');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina7.png'})

    await page.click('text=Scheduled Pages ');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: './pagina8.png'})

    // await page.fill('id=ember332', 'blabla');
    // await new Promise(r => setTimeout(r, 1000));
    // await page.screenshot({path: './pagina8.png'})

    // await page.click('#text :text("Publish")');
    // await new Promise(r => setTimeout(r, 1000));
    // await page.screenshot({path: './pagina9.png'})

    // await page.click('id=ember870');
    // await new Promise(r => setTimeout(r, 1000));
    // await page.screenshot({path: './pagina10.png'})
    // await page.click('id=ember1339');
    // await new Promise(r => setTimeout(r, 1000));
    // await page.screenshot({path: './pagina11.png'})


    //Interactuar con la aplicación web
    //...
    // await page.click('css=a.btn.btn-link')
    // console.log(`Clicked "cancel". URL is now ${page.url()}`)

    // await page.click('css=a.btn.btn-link')
    // console.log(`Clicked "register". URL is now ${page.url()}`)

    // await page.click('css=button.btn.btn-primary')
    // let feedback = await page.$$('css=div.invalid-feedback');

    // let elems=0
    // for(let i of feedback){elems++}
    // await page.screenshot({path:'./form-feedback.png'})
    // console.log(`Clicked "Register" with an empty form. Feedback is shown in ${elems} elements`)

    // await page.type('#ember8.email', 'ivan1016017@gmail.com');
    // // await page.type('input[formcontrolname="lastName"]', 'Pruebas');
    // // await page.type('input[formcontrolname="username"]', 'pruebas');
    // await page.type('#ember10.password"]', 'ivandario1234');
    // await page.click('button.login')

    // await new Promise(r => setTimeout(r, 7000));
    // await page.screenshot({path:'./success-feedback.png'})

    // feedback = await page.$("css=div.alert.alert-success")
    // console.log(`Success dialog after creating user with message: ${await feedback.innerText()}`)

    // await page.type('input[formcontrolname="username"]', 'pruebas');
    // await page.type('input[formcontrolname="password"]', 'MISO4208');
    // await page.click('css=button.btn.btn-primary')
    // await new Promise(r => setTimeout(r, 7000));

    // feedback = await page.$('text="Hi Monitor!"');
    // await page.screenshot({path:'./after-login.png'})
    // console.log(`Logged in. Your user was ${feedback?'successfully':'not'} created`)

    //Finalizar la prueba
    await browser.close();
  }
  return;
})();//Llamado propio de la función