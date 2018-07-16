var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
app.get('/', function(req, res){

    //All the web scraping magic will happen here
    url = 'https://www.thegioididong.com/laptop'
    request(url, function(err, response, html){
        if(err){
            console.log("error: " + err);
        }
        else {
            var $ = cheerio.load(html);
            var name, price, rating;
            json = {name : "", price : "", rating :""};
            var count = 0;
            var arrjson = [];
            $('.price').each(function(i, element){
                var data = $(this).prev().text();
                name = data;
                price = $(this).text();
                json.name = name;
                json.price = price;
                arrjson[count] = JSON.stringify(json);
                console.log('json : ' + arrjson[count]);
                console.log('count : ' + count);
                count ++;
                
                
            })
            // $('.ratingresult').each(function(i, element){
            //     var data = $(this).children().first().next().next().next().next().next();
            //     rating = data.text();
            //     json.rating = rating;
            //     arrjson[count] = json;
            //     count ++;
                
            // })
          
            
            console.log('json: ' + JSON.stringify(json));
            res.send(arrjson);
        }
    })
  
  })
  
  app.listen(process.env.PORT, function(){
	console.log("Started on PORT ");
  })
  
  exports = module.exports = app;