## Integration

This project aims to integrate the [Disease.sh](https://disease.sh/) and [GoFile](https://gofile.io/api) APIs. 


### How does it work
When server starts, every day at 7pm, daily data about COVID-19 will be fetched and sent to GoFile as a csv document. The header of the file contains: country, todayCases, todayDeaths, date, active and critical. After it's sent, a file log is saved to the database. 

As it is right now, it's generating two csv files. In the first one has data about Brazil and USA, while the second one has data about China and Russia. It can be adapted to change the number of files and its respective countries. 


### How to run

Install the dependencies of the project: 
```
npm install
```


Start the database container: 

*start docker on your machine and*
```
docker-compose up --build 
```


Build the project: 
```
nest build
```


Run the migrations: 
```
npm run typeorm migration:run
```


Run the project: 
```
npm run start:dev
```


##### This project uses
- nestJs
- nestJs cron jobs
- typeORM
- postgreSQL
- docker-compose