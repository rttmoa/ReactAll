const express = require("express");
var app = express();


import { Broker } from './src/broker'
console.log((new Broker()).init);









app.listen(3001, () => {
	console.dir('---------------------------------- koa is listening in 9089 -------------------------------------');
}) 
