const CloudMapping = require("./cloudmapping.js");

module.exports = async (elementHandle) => {
  const data = await elementHandle.evaluate((node) => {
    console.log(node);

    const days = Array.from(node.querySelectorAll("tr.tabledetailed")).map(
      (el) => {
        const date = el.id.slice(0, 8);

        const data = Array.from(el.querySelectorAll(".daytable > tbody > tr"));

        const observations = data.map((el) => {
          const time = +el.querySelector("time").innerText.slice(-2);
          const degrees = +el.querySelector(".degreescontainer .value")
            .innerHTML;
          const precipitation = +el.querySelector(".precipcontainer .value")
            .innerHTML;
          const weatherType = el
            .querySelector(".symbolimagewrapper img")
            .getAttribute("alt");

          return {
            time,
            degrees,
            precipitation,
            weatherType,
          };
        });

        return { date, observations };
      }
    );

    return days;
  });

  console.log(data);

  const forecastWeather = data.map(({ observations, date }) => {
    const weatherData = observations.map(
      ({ time, degrees, precipitation, weatherType }) => {
        const cloudiness_ = CloudMapping.find(
          (type) => type.name === weatherType
        );

        const cloudiness = cloudiness_ ? cloudiness_.cloud : null;

        return {
          time,
          degrees,
          precipitation,
          cloudiness,
        };
      }
    );

    return {
      date,
      weatherData,
    };
  });
  return forecastWeather;
};
