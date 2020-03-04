const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const config = require('../../webpack.dev.js');
const compiler = webpack(config);
const port = process.env.PORT || 8080;
const getLogger = require('webpack-log');
const log = getLogger({ name: 'webpack-batman' });

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));


// Enable parsing HTTP POSTS

// Hookup bodyParser to express

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Parse using JSON. POST content must match body type.

// Enable website-website communication on top of XMLHttpRequest object: npm install cors --save

// Hookup cors

const cors = require('cors');

app.use (cors());

app.use(express.static(__dirname));

// Express port

app.listen(port);


// Hook up Aylien Sentiment API

require('dotenv').config(); // Get Aylien credentials from .env


const AYLIENTextAPI = require('aylien_textapi');

const textapi = new AYLIENTextAPI ({
    application_id: process.env.ALYIEN_ID,
    application_key: process.env.ALYIEN_KEY
});


// POST URL to Alyien and get responses


const { processData } = require('./js/processData.js');


// POST RESPONSE TO CLIENT

app.post ('/submitData', function (request, response) {

        let userPost = request.body;

        processData(

                userPost.text, 

                function (returnData) {

                        response.send(returnData);

                },

                textapi
        );

});


module.exports = {
    processData
}