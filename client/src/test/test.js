const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

async function test() {
    
    var nombre ="Perry"
    var apellidos = "Mason"
    var mail = "correo@correo.com"
    var dni = "11857708N"
    var poblacion = "Madrid"
    var direccion = "Calle falsa 123"
    var cp = "28005"
    var pass = "123456y+"

    let driver = await new Builder().forBrowser("chrome").build();
   
    await driver.get("http://localhost:3000");

    await driver.findElement(By.xpath('//*[@id="root"]/div[2]/div[1]/div/div[1]/div[2]/ul/a/button')).click()
    await driver.findElement(By.xpath('//*[@id="root"]/div[1]/nav/a/img')).click();
    await driver.findElement(By.xpath('//*[@id="responsive-navbar-nav"]/div/a[1]')).click();
    await driver.findElement(By.xpath('//*[@id="root"]/div[2]/div[1]/div/form/div/input[1]')).sendKeys(nombre, Key.RETURN);
    await driver.findElement(By.xpath('//*[@id="root"]/div[2]/div[1]/div/form/div/input[2]')).sendKeys(apellidos, Key.RETURN);
    await driver.findElement(By.xpath('//*[@id="root"]/div[2]/div[1]/div/form/div/input[3]')).sendKeys(mail, Key.RETURN);
    await driver.findElement(By.xpath('//*[@id="root"]/div[2]/div[1]/div/form/div/input[4]')).sendKeys(dni, Key.RETURN);
    await driver.findElement(By.xpath('//*[@id="root"]/div[2]/div[1]/div/form/div/input[5]')).sendKeys(poblacion, Key.RETURN);
    await driver.findElement(By.xpath('//*[@id="root"]/div[2]/div[1]/div/form/div/input[6]')).sendKeys(direccion, Key.RETURN);
    await driver.findElement(By.xpath('//*[@id="root"]/div[2]/div[1]/div/form/div/input[7]')).sendKeys(cp, Key.RETURN);
    await driver.findElement(By.xpath('//*[@id="root"]/div[2]/div[1]/div/form/div/input[8]')).sendKeys(pass, Key.RETURN);
    await driver.findElement(By.xpath('//*[@id="root"]/div[2]/div[1]/div/form/div/input[9]')).sendKeys(pass, Key.RETURN);
    await driver.findElement(By.xpath('//*[@id="responsive-navbar-nav"]/div/a[2]')).click();





    //Cerramos el navegador
    //await driver.quit();
}

test();