const https = require('https');

const API = process.env.API;

function fetchWeather(city) {
  return new Promise((resolve, reject) => {
    if (!API) {
      reject(new Error('API key not configured. Check your .env file.'));
      return;
    }

    const encodedCity = encodeURIComponent(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API}&units=metric`;

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`City not found or API error: ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (e) {
          reject(new Error('Failed to parse weather data'));
        }
      });
    }).on('error', (err) => {
      reject(new Error(`Network error: ${err.message}`));
    });
  });
}

module.exports = { fetchWeather };