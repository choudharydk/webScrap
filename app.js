/**
 * @author Jdhruv choudhary
 * createdo on november 11th 2018
 */
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


let baseUrl = "https://www.imdb.com/";


let uri = "title/tt2709692/";
let url = baseUrl + uri;

request(url, (error, response, html) => {

    //check for no errors and status success i.e website has loaded successfully and return some response

    if (!error && response.statusCode == 200) {

        //load html using cheerio module and store it in variable $ 

        const $ = cheerio.load(html);

        //Finally define the variable you want to scrap. 
        var name, releaseYear, imdbRating;

        //to store movie details together
        var movie = {};

        let title = $('.title_wrapper');

        name = title.children('h1').text().trim();

        releaseYear = title.children('h1').children().children().text();


        let rating = $('.ratingValue');

        imdbRating = rating.children().children().text();

        movie.name = name;
        movie.releaseYear = releaseYear;
        movie.imdbRating = imdbRating;

    }
    console.log("File ", JSON.stringify(movie));
    fs.writeFile("result.json", JSON.stringify(movie, null, 4), function (err) {

        console.log('File successfully written');

    })
})