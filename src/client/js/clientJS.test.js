import 'whatwg-fetch';
import "regenerator-runtime/runtime";

// import './index.js';

// Import functions that run the app

import { passURL } from './passURL';
import { formHandler } from './formHandler';
import { postData } from './getPost';
import { updateUI } from './updateUI';
import { errorUI } from './errorUI';
import { processData } from '../../server/js/processData';


// JS DOM needed for methods that get DOM objects

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Mock variables for testing

let invalidInput = "gibberish";
let validInput = {value: 'http://espn.com'};
let badInput = {value: 'http://p.com'};
let goodURL = "http://espn.com";
let badURL = "http://p.com";
let testUserInput = "http://fake.com";

const testInputResults = new JSDOM(`<div id="inputResults"></div>`);

const testJSON = { 

		"polarity":"Fake response", 
		"subjectivity":"Fake response", 
		"text":"You just get served a fake response.",
		"polarity_confidence": 0.12312312,
		"subjectivity_confidence": 0.45645645

};

const missingJSON = { 

		"polarity":"Fake response", 
		"text":"You just get served a fake response.",
		"polarity_confidence": 0.12312312,
		"subjectivity_confidence": 0.45645645

};

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



// passURL gets the user input URL after click and connects the other functions

describe ('passURL() tests',() => {

		// Mock fetch response for tests

		test("passURL() should return 'invalid' for invalid URLS so that errorUI() can display the right message.", async () => {

				let testResponse = await passURL(invalidInput, testInputResults);

				expect(testResponse).toBe("invalid");
				
				
		});

		test(`passURL() should return 'broken' for URLs that don't work so that errorUI() can display the right message.`, async () => {
								
				global.fetch = mockFetch(badURL); 

				let testResponse = await passURL(badInput, testInputResults);

				expect(testResponse).toBe("broken");
				
				
		});

		test(`passURL() should return "valid" for valid URLs and pass Alyien data to updateUI().`, async () => {
								
				global.fetch = mockFetch(goodURL); 

				let testResponse = await passURL(validInput, testInputResults);

				expect(testResponse).toBe("valid");
				
				
		});

});



// Was it a URL?


describe ('formHandler() tests',() => {

		test("If it's NOT a url, formHandler() should return false.", () => {
		  		expect(formHandler(invalidInput)).toBe(false);
		});

		test("If it's a url, formHandler() should return true", () => {	
		  		expect(formHandler(validInput)).toBe(true);
		});

});


// Was it a bad URL?


describe ('postData() tests',() => {

		// Mock fetch response for tests


		test('If the URL works, postData() should return JSON', async () => {
				
				
				global.fetch = mockFetch(goodURL); // or window.fetch

				let testResponse = await postData('/submitData', {text: goodURL});
				let testResult = false;

				console.log(testResponse);
				
				if (testResponse == testJSON) {
						
						testResult = true;
						console.log("We've finally achieved equality!");
				}

				expect(testResult).toEqual(true);

				// Make sure fetch has been called exactly once
				expect(fetch).toHaveBeenCalledTimes(1);
				
		});

		test('If the URL is broken, postData() should return false', async () => {
				
				
				global.fetch = mockFetch(badURL); // or window.fetch

				let testResponse = await postData('/submitData', {text: badURL});
				let testResult = false;

				console.log(testResponse);
				
				if (testResponse == testJSON) {
						
						testResult = true;
						console.log("We've finally achieved equality!");
				}

				expect(testResult).toEqual(false);

				// Make sure fetch has been called exactly once
				expect(fetch).toHaveBeenCalledTimes(1);
				
		});



		/* Test function

		async function fetchPerson(url, data) {

				let response = await fetch(url, data);
				
				if (!response.ok) throw new Error(response.statusText);
				
				let returnData = await response.json();
				
				// Some operations on data if needed...

				return returnData;

		}

		*/

});

// Did we display the categories we wanted?

describe ('updateUI() tests',() => {

		test('updateUI() should have all the categories we want to display.', async () => {
			
			let testResult = false;

			let uiJSON = await updateUI(testJSON, testInputResults, testUserInput);
			console.log(uiJSON);

			if ('polarity' in uiJSON && 'subjectivity' in uiJSON && 'text' in uiJSON && 'polarity_confidence' in uiJSON && 'subjectivity_confidence' in uiJSON)

				{
					testResult = true;
					console.log("It's all true. It's all true.");
				}

			expect(testResult).toEqual(true);

		});


		test('updateUI() should NOT be missing any categories we want to display.', async () => {
			
			let testResult = false;

			let uiJSON = await updateUI(missingJSON, testInputResults, testUserInput);
			console.log(uiJSON);

			if ('polarity' in uiJSON && 'subjectivity' in uiJSON && 'text' in uiJSON && 'polarity_confidence' in uiJSON && 'subjectivity_confidence' in uiJSON)

				{
					testResult = true;
					console.log("It's all true. It's all true.");
				}

			expect(testResult).toEqual(false);

		});


});

// Do we update the UI with the right error messages?

describe ('errorUI() tests',() => {

		test("If there is an error with the user's input, errorUI() should display a messages relating to the error.", async () => {
					
					let testBroken = errorUI("broken", testInputResults);
					let testInvalid = errorUI("invalid", testInputResults);
					let testOther = errorUI("other", testInputResults);

					console.log(testBroken);

					expect(testBroken).toBe(`
					<p>The URL you entered might be broken...</p>
					`);
					expect(testInvalid).toBe(`
					<p>Invalid URL. Try following this format: http://website.com.</p>
					`);
					expect(testOther).toBe(`
					<p>You must've done something wrong...</p>
					`);
							
		});

});


describe("processData() gets Alyien data", () => {

		
		test('processData() should sendback valid JSON when receiving a request with a good URL. ', done => {

				processData(

						goodURL, 
						
						function(returnData) {
							
									console.log(returnData);
									
									expect(returnData).toEqual(testJSON);
							

		        		},
		        		textapi

		        );

				done();
		});

		

		test('processData() should sendback error JSON when receiving a request with a broken URL. ', done => {

				let errorResponse = { "error": "Error getting Alyien data."};

				processData(

						badURL, 
						
						function(returnData) {
																
									console.log(returnData);

									expect(returnData).toEqual(errorResponse);
									
							
		        		},
		        		textapi

		        );


				done();

		});

});