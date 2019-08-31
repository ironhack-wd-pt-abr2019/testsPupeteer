const puppeteer = require("puppeteer");

const pruebaIntegral = (async()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await (page.goto('http://localhost:3000'));
    await (console.log(page.content));
    const tabla = await page.$$("#dataTable tr");
    
    const textoSinFiltros = await page.$$eval("#dataTable tr td", 
        tds => tds.map(td => td.innerHTML)
    )
    console.log("textos sin filtros", textoSinFiltros)
    
    await page.screenshot({path: 'screenshot.png'});
    await page.type('#txtUsername', "germfy");
    await page.type("#txtPassword", "password");
    await page.screenshot({path: 'screenshot1.png'});
    await page.click('#chkOnStock');
    await page.type("#busqueda", "ball");
    await page.screenshot({path: 'screenshot2.png'});
    const textoConFiltros = await page.$$eval("#dataTable tr td", 
        tds => tds.map(td => td.innerHTML)
    )
    console.log("textos con filtros", textoConFiltros)
    if(textoConFiltros.length !== textoSinFiltros.length){
        console.log("Prueba OK")
    }else{
        console.log("Filtro no se aplicó")
    }
    
    await browser.close();
})

pruebaIntegral();