const puppeteer = require("puppeteer");
const extractWeatherData = require("./extractDatainTable.js");

module.exports = async function () {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });

    const page = await browser.newPage();
    const url =
      "https://www.smhi.se/vadret/vadret-i-sverige/ortsprognoser/q/Malm%C3%B6/2692969#tab=0,chart=1";
    await page.goto(url);
    await page.waitForSelector(
      "#wpt_tendayforecast_vtableWeather > div > table > thead"
    );

    const forecastElementHandle = await page.$(
      "#wpt_tendayforecast_vtableWeather > div > table > tbody"
    );
    const forecast = await extractWeatherData(forecastElementHandle);
    const observationsElementHandle = await page.$(
      "#wpt_tendayforecast_vtableObservation > div > table > tbody"
    );
    const observations = await extractWeatherData(observationsElementHandle);

    return JSON.stringify({
      provider: "smhi",
      date: new Date().toUTCString(),
      forecast,
      observations,
    });
  } catch (err) {
    console.log("*** ERROR ***");
    console.log(err);
  }
};
