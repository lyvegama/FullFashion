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
        productData.nombre = await page.$eval("h1", title => title.innerText);
        productData.target = "hombre";
        productData.tipo_prenda = "abajo";
        productData.estilo = "classic";
        productData.color = "verde";
        productData.imgUrl = await page.$eval(".swiper-slide-active > img", imgUrl => imgUrl.src);
        return productData
    }
    catch (error) {
        console.log(error)
    }
}

//! CAMBIAR LA URL DE LA PRENDA CON LOS FILTROS
const buscarPrendas = async (num) => {
  
    let url = "https://es.shein.com/pdsearch/elegante%20hombre/?attr_values=Green&ici=s1%60EditSearch%60elegante%20hombre%60_fb%60d0%60PageSearchResult&scici=Search~~EditSearch~~1~~elegante_20hombre~~~~0&child_cat_id=3179&exc_attr_id=27&attr_ids=27_81-27_334-27_2436-27_2566"
    const scrapedData = []
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    
    const productUrls = await page.$$eval('.S-product-item__name > a ', (etiquetaEnlace) => etiquetaEnlace.map(a => a.href));

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