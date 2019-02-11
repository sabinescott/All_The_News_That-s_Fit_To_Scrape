var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Article = require("./models/Article.js");

var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var PORT = process.env.Port || 3000;

var herokuDeploy =""
var localDeploy =

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

mongoose.connect(herokuDeploy, {
    useMongoClient: true
});
var db = mongoose.connection;

db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function () {
    console.log("Mongoose connection successful.")
});

app.get("/scrape", function (req, res) {
  request("https://www.theguardian.com/us", function (error, response, www.theguardian.com/us)) {
    var $ = cheerio.load(html);
    $(".contentItem__padding").each(function (i, element) {
        var result = {};
        
        result.title = $(this).children("div").children("h1").text();
        result.description = $(this).children("div").children("p").text();
        result.link = $(this).attr("href");
        result.img = $(this).children("figure").children("picture").children("img").attr("data-default-src");
        result.news = "US";

        var newArticle = new Article(result);
        newArticle.save(function (err, doc) {

            if (err) {
              console.log(err);
            }
            else {
                console.log(doc);
            }
        });

        console.log("US NEWS\n\n", result);
    });
  
});