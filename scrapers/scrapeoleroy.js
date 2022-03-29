const { url } = require('inspector');
const puppeteer = require('puppeteer')
const mongoose = require("mongoose");
const Leroy = require("../models/leroyModel");
require("../database/mongo")

//Recoge los datos de cada producto 
//!CAMBIAR POR CADA SCRAPEO
const extractData = async (url, browser) => {
    try {
        leroyData = {}
        const page = await browser.newPage()
        await page.goto(url);

        leroyData.nombre = await page.$$eval(".contLeft > h3", nombre => nombre.map(a => a.innerText));
        leroyData.latitud = await page.$$eval(".itemMasonry", latitud => latitud.map(a => a.getAttribute("data-lat")));
        leroyData.longitud = await page.$$eval(".itemMasonry", longitud => longitud.map(a => a.getAttribute("data-lon")));
        
        return leroyData
    }
    catch (error) {
        console.log(error)
    }
}

//! CAMBIAR LA URL DE LA PRENDA CON LOS FILTROS
const buscarLeroy = async () => {
  
    let url = "https://www.leroymerlin.es/listado-de-tiendas"

  
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    
    const productsInfo = await extractData(url, browser)

        for (let i = 0; i < productsInfo.nombre.length; i++) {
        let leroy = {}
        leroy.nombre = productsInfo.nombre[i]
        leroy.direccion = ""
        leroy.latitud = productsInfo.latitud[i]
        leroy.longitud = productsInfo.longitud[i]

        let leroyInfo = new Leroy(leroy);
        leroyInfo.save(function (err) {
            if (err) throw err;
            console.log("Inserción correcta");
        })

        
    }

}
// buscarLeroy()
