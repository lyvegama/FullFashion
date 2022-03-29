const { url } = require('inspector');
const puppeteer = require('puppeteer')
const mongoose = require("mongoose");
const Producto = require("../models/productModel");
require("../database/mongo")

//Recoge los datos de cada producto 
//!CAMBIAR POR CADA SCRAPEO
const extractData = async (url, browser) => {
    try {
        productData = {}
        const page = await browser.newPage()
        await page.goto(url);
        productData.nombre = await page.$eval("._2MyPg2 > span", nombre => nombre.innerText);
        productData.target = "niña";
        productData.tipo_prenda = "zapatos";
        productData.estilo = "casual";
        productData.color = "azul";
        productData.imgUrl = await page.$eval(".KLaowZ > img", imgUrl => imgUrl.src);
        return productData
    }
    catch (error) {
        console.log(error)
    }
}

//! CAMBIAR LA URL DE LA PRENDA CON LOS FILTROS
const buscarPrendas = async (num) => {

    let url = "https://www.zalando.es/zapatillas-nino-rebajas/_azul/?gender=10&order=activation_date"
    const scrapedData = []
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    
    const productUrls = await page.$$eval('.lfPP-F', (etiquetaEnlace) => etiquetaEnlace.map(a => a.href));

        
    for (let i = 0; i < num; i++) {
        const productsInfo = await extractData(productUrls[i], browser)
        scrapedData.push(productsInfo);
    }

    return scrapedData
}


async function addPrendasDB(num) {
    let scrapedData = await buscarPrendas(num)
    for (let i = 0; i < scrapedData.length; i++) {
        let productoScraped = new Producto(scrapedData[i]);
        productoScraped.save(function (err) {
            if (err) throw err;
            console.log("Inserción correcta");
        })
    }
}

addPrendasDB(15);

const scrapping = {
    buscarPrendas: buscarPrendas,
    addPrendasDB: addPrendasDB
}

module.exports = scrapping