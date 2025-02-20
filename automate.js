const { Builder, By, Key, until } = require("selenium-webdriver");
let driver;
let startBrowser = async () => {
  if (!driver) {
    driver = await new Builder().forBrowser("firefox").build();
  }
};
async function searchGoogle(product) {
  try {
    await startBrowser();
    await driver.sleep(2000);
    await driver.get(`https://www.coachoutlet.com/search?q=${product}`);
    await driver.sleep(2000);
    // let inputSearch = await driver.findElement(
    //   By.css(`input[id="SearchInput"]`)
    // );
    // inputSearch.sendKeys(product, Key.RETURN);
    let salesPrice = await driver.wait(
      until.elementLocated(By.className("salesPrice")),
      10000
    );
    let drOnSearch = await driver.wait(
      until.elementLocated(By.css(`span[data-qa="cm_txt_pdt_price_dpercent"]`)),
      10000
    );
    salesPrice = await salesPrice.getText();
    salesPrice = parseFloat(salesPrice.replace("$", ""));
    drOnSearch = await drOnSearch.getText();
    drOnSearch = parseFloat(drOnSearch.substring(1, 4));

    await driver
      .wait(
        until.elementLocated(By.css(`img[class="chakra-image css-klg1v"]`)),
        4000
      )
      .click();

    await driver.sleep(2000);
    let pdpPrice = await driver.wait(
      until.elementLocated(By.css(`p[data-qa="cm_txt_pdt_price"]`)),
      4000
    );
    let drOnPDP = await driver.wait(
      until.elementLocated(By.css(`p[data-qa="cm_txt_pdt_price_dpercent"]`)),
      10000
    );
    pdpPrice = await pdpPrice.getText();
    pdpPrice = parseFloat(pdpPrice.replace("$", ""));
    drOnPDP = await drOnPDP.getText();
    drOnPDP = parseFloat(drOnPDP.substring(1, 4));

    return { salesPrice, pdpPrice, drOnSearch, drOnPDP };
  } catch (e) {
    console.log("Error searching the product", e);
  }
}

module.exports = { searchGoogle };
