const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b101adb93fb0eb62febbc7f7e97f84db&query=${latitude},${longitude}&units=f`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect with the weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          response.body.current.temperature +
          " degrees out. It feels like " +
          response.body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
