# NLP News App

This application was created for Udacity's Front End Development Nanodegree project. It takes a website URL provided by a user and uses Alyien's Sentiment Analysis API to return returns the tone and subjectivity of text on the website.

## Webpack

One major project goal was to utilize webpack to bundle the code and assets. This done by installing webpack through the node package manager and the requiring it in the config document.

```
npm install webpack

const webpack = require('webpack');

```

Installing loaders--code that transforms and manages code--is fairly straightforward. One key learning is ensuring that the url-loader and file-loader don't point to the same file type. I had to separate PNGs to ensure they would appear.

```
test: /\.(jpg|gif)$/i,

use: [
    {
        loader: 'url-loader',
        options: {
                limit: 8192,
        }
    }
]

```

```
test: /\.(png|jpe?g|gif)$/i,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                      name: '[name].[ext]',
                      outputPath: 'assets/',
                      // publicPath: '/'
                }
```

## Alyien API

Another goals was to ensure that the app could get sentiment analysis data from Alyien's API via its node SDK.

`npm install aylien_textapi`

API credentials were placed into a hidden .env file to ensure security.

```
const textapi = new AYLIENTextAPI ({
    application_id: process.env.ALYIEN_ID,
    application_key: process.env.ALYIEN_KEY
});
```

Because the Alyien data lies in a key, `sentiment`, with a function value a callback function is needed to retrieve the data and send it back to the user from the POST request.

```
 textapi.sentiment (
                {
                  'url' : userText
                }, 
                function(error, response) {
                    if (error !== null) {
                        let errorResponse = { "error": "Error getting Alyien data."}
                        callback(errorResponse);
                    }
                    else {
                        callback(response);
                    }
                }
        );
```


## Service Workers

Per Udacity requirements, the app needed to run offline via Service Workers. The Workbox plugin from webpack.

```
npm install workbox-webpack-plugin --save-dev

new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
        })
```

The plugin required this snippet in the main app js to register the Service Worker with the browser for offline use:

```
if ('serviceWorker' in navigator) {		
		window.addEventListener('load', () => {	
				navigator.serviceWorker.register('/service-worker.js').then(registration => {	
						console.log('SW registered: ', registration);		
				}).catch(registrationError => {	
						console.log('SW registration failed: ', registrationError);	
				});
		});
}
```


## JEST testing

The last leg of the project required that the app's JS was tested. This involved designing tests to ensure that inputs from certain use cases, e.g., broken urls, produced the expected outputs, e.g. "Error. Your URL might be broken."

The difficult part was designing the tests for local use. To do this, the app relied on a mock server and API.


```
const textapi = {
		'sentiment': function (url, answer) {
				if (url.url == goodURL) {
						answer(null, testJSON);
				}
				else {
						answer("Houston we have a problem.", undefined);						
				}			
		}
};
```

```
// Mock fetch to simulate server

const mockFetch = (url) => {
		if (url == goodURL) {
				return jest.fn().mockImplementation(() =>			    
			    	Promise.resolve({
			      		ok: true,
			      		json: () => testJSON
			    	})
			  	);
		}
		else {
				return jest.fn().mockImplementation(() =>  
			    	Promise.resolve({
			      		ok: false,
			      		json: () => false
			    	})
			  	);
		}
}
```