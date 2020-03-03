import "regenerator-runtime/runtime";
import { passURL } from './js/passURL';
import { formHandler } from './js/formHandler';
import { postData} from './js/getPost';
import { updateUI} from './js/updateUI';
import { errorUI } from './js/errorUI';

import  './styles/index.scss';

import nlpbot from './assets/robot.png';

if ('serviceWorker' in navigator) {
		
		window.addEventListener('load', () => {
		
				navigator.serviceWorker.register('/service-worker.js').then(registration => {
		
						console.log('SW registered: ', registration);
			
				}).catch(registrationError => {
		
						console.log('SW registration failed: ', registrationError);
		
				});

		});
}

const userInput = document.getElementById("userInput");
const buttGetResults = document.getElementById("buttGetResults");
const inputResults = document.getElementById('inputResults'); 
const logo = document.getElementById('logo');

// Page load

logo.src = nlpbot;
logo.alt = "NLPbot logo";

// Actions

buttGetResults.addEventListener('click', function(event) {
		
		inputResults.innerHTML = "";
		passURL(userInput, inputResults);

});

userInput.addEventListener('keypress', function (event){
		
		if (event.key === 'Enter') {
				
				inputResults.innerHTML = "";
				passURL(userInput, inputResults);
    	
    	}

});

export { passURL, formHandler, postData, updateUI };