# GGV Transponder Map
#### VanillaJs Frontend for map navigation and NodeJs+MongoDB backend to show markers and area covered on map, MArch 29 2022
#### [Walkthorugh](https://www.loom.com/share/53e91879adbf473caa4f947a815c5bae)
#### [Client link](https://emile-ggv-client.herokuapp.com/)
#### [Backend link](https://emile-ggv-api.herokuapp.com/)
#### 
#### By **Kamana Izere Emile**


## Description
The app implements the google maps api on front end to use the map ui while getting markers and all related data from the backend app, an app using nodeJs Express to have a public api with Mongo-DB for persistence. 

## Setup/Installation Requirements to run locally
* [Node](https://nodejs.org/en/download/)
* [Npm](https://docs.npmjs.com/cli/v6/commands/npm-install)
* clone https://github.com/emilekamana/GGV-maps eg:
```bash
git clone https://github.com/emilekamana/GGV-maps
```

### Backend
After installing node and npm
* Navigate to the backend folder from the terminal 
eg: 
```bash
cd backend
```
* run 
```bash 
npm install
```
* Replace credentials for personal created [MongoDB](cloud.mongodb.com) connection or create .env file and add in 
```
PASSWORD=[Your_Password]
USERNAME=[Username]
DB=[Database_name]
CLUSTER=[Cluster_name]
```
* When it's done installing, run
```bash 
npm start
```
It should be running on http://localhost:3000/

### Frontend
* Navigate to the frontend folder
* Open [index.html](frontend/index.html) in a browser

## Technologies Used
* Visual Studio code
* Javascript
* NodeJs
* Express
* Google Maps
* MongoDB
## Support and contact details
If you have any inquiries, you can reach out to me on [e.kamana@alustudent.com](e.kamana@alustudent.com)
### License
Licensed by MIT
Copyright (c) 2022 **Kamana Izere Emile**