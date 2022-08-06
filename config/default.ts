import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: `${process.env.PORT}`,
  baseURL: 'https://disease.sh/v3/covid-19/countries/',
  goFileToken: `${process.env.TOKEN}`,
  folder_USABR: `${process.env.FOLDER_ID_USABR}`,
  folder_RUCH: `${process.env.FOLDER_ID_RUCH}`,
  firstcountryArray: ['brazil', 'usa'],
  secondcountryArray: ['russia', 'china'],
  csvFolder: process.cwd().concat('\\csv'),
};
