const puppeteer = require("puppeteer");

module.exports = async (city) => {
  const mapUrl = [
    {
      city: "malmo",
      url:
        "https://www.smhi.se/vadret/vadret-i-sverige/ortsprognoser/q/Malm%C3%B6/2692969#tab=0,chart=1",
    },
    {
      city: "helsinki",
      url:
        "https://www.smhi.se/vadret/vadret-i-sverige/ortsprognoser/q/Helsingfors/658225#tab=0,chart=1",
    },
  ];

  const identifyUrl = mapUrl.find((el) => {
    return (el.city = city);
  });

  if (identifyUrl) {
    return identifyUrl.url;
  }

  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const page = await browser.newPage();
  } catch (err) {}

  return null;
};
