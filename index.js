require('dotenv').config();
const fetch = require('node-fetch');
const Telegram = require('node-telegram-bot-api');

const { TELEGRAM_TOKEN, WEATHER_API_TOKEN, TELEGRAM_CHAT_ID } = process.env;

const bot = new Telegram(TELEGRAM_TOKEN);

const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather');

weatherURL.searchParams.set('APP_ID', WEATHER_API_TOKEN);
weatherURL.searchParams.set('zip', '28562,us');
weatherURL.searchParams.set('units', 'imperial');

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});

const getWeatherData = async () => {
  const resp = await fetch(weatherURL.toString());
  const body = await resp.json();
  return body;
};

const generateWeatherMessage =
    ({ name, weather, main }) => `The weather in ${name}: ${weather[0].description}. Current temperature is ${main.temp}, with a low temp of ${main.temp_min} and high of ${main.temp_high}.`;

const main = async () => {
  const weatherData = await getWeatherData();
  const weatherString = generateWeatherMessage(weatherData);
  bot.sendMessage(TELEGRAM_CHAT_ID, weatherString);
  console.log(weatherString);
};

main();
