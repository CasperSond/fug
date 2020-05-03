const puppeteer = require("puppeteer");

(async function () {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      // slowMo: 200,
    });

    const page = await browser.newPage();
    const url = "https://skat.dk";
    await page.goto(url);

    await page.evaluate(() => {
      const element = document.querySelector("#loginBorger > div > p > a");

      if (element) {
        element.click();
      }
    });

    await page.waitForSelector("#nemid_iframe");
    await page.waitFor(4000);
    // const elementHandle = await page.$("iframe[id='nemid_iframe']");
    // const frame = await elementHandle.contentFrame();
    // const frameEl = await frame.$$eval(

    // console.log(frameEl);
    // const inframe = await frame.content();
    // console.log(inframe.slice(0, 30));

    // const input = await frame.$$("input");
    // console.log(input);

    await page.mouse.move(40, 135 + 10 + 80);
    await page.waitFor(1000);
    await page.keyboard.type("");
    await page.keyboard.press("Tab");
    //await page.mouse.click(45, 135 + 10 + 80 + 40);
    await page.keyboard.type("");
    await page.keyboard.press(String.fromCharCode(13));
    await page.waitFor(1000);
    await page.keyboard.type("1231");
  } catch (err) {
    console.log("*** ERROR ***");
    console.log(err);
  }
})();
