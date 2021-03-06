# WebAR
A repo for playing around with web based AR using AR.js and AFrame

## Dependencies
- **AR.js** - powers the frontend AR. Great open source library found [HERE](https://github.com/AR-js-org/AR.js)
- **AFrame** - enables image tracking. More info found [HERE](https://aframe.io/)
- **NodeJS/NPM** - used as the project's runtime environment. Note that `/node_modules` is in this repo's .gitignore
- **ExpressJS** - install with npm via your terminal `npm install express --save`

## Https note
The expressJS server uses https, so please create your own ssl key.pem and cert.pem files and place them inside `[this_repo_directory]/ssl`. You can refer to [THIS](https://medium.com/@nitinpatel_20236/how-to-create-an-https-server-on-localhost-using-express-366435d61f28) website on how to make SSL credentials for an ExpressJS server.
