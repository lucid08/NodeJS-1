require('dotenv').config();
const { fetchWeather } = require('./utils/weather');

async function main() {
  const city = process.argv[2];
  if (!city) {
    console.log('Usage: node weather.js [city]');
    process.exit(1);
  }

  try {
    const data = await fetchWeather(city);
    if (!data.main || !data.weather || !data.weather.length || !data.wind) {
      throw new Error('Invalid data received from API');
    }

    const temp = data.main.temp;
    const condition = data.weather[0].main;
    const windSpeed = data.wind.speed;

    console.log(`Weather in ${city}:`);
    console.log(`- Temperature: ${temp}°C`);
    console.log(`- Condition: ${condition}`);
    console.log(`- Wind Speed: ${windSpeed} m/s`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();