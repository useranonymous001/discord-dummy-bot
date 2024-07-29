/**
 * npm i puppeteer
 * npm i puppeteer-extra-plugin-stealth
 */

const puppeteer = require("puppeteer");
// import stealthPlugin from "puppeteer-extra-plugin-stealth";
// puppeteer.use(stealthPlugin());

async function searchQueryFromYoutube(query) {
  try {
    const url = "https://www.youtube.com/";
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    const button = await page.waitForSelector("#search-icon-legacy");
    await page.type("#search-input #search", query, { delay: 100 });
    await button.click();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  searchQueryFromYoutube,
};
