import express from "express";
import bodyParser from "body-parser";
import viewsEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB"
require('dotenv').config();


let app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


viewsEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("listening on port " + port);
});