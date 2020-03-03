
import { updateUI } from './updateUI';

// Main functions

const postData = async (url = '', serverData = {}) => {	

		// Define what we intend to post

		let requestConfig = { 
		
				method: 'POST',
				credentials: 'same-origin', //  Send user credentials to other wbsite if the URL is on the same origin as the calling script
				headers: {
						'Content-Type': 'application/json'
				},

				// Stringify JSON body data
				
				body: JSON.stringify(serverData)
		}


		try {

				const response = await fetch (url, requestConfig);		
				
				const postResponse = await response.json();

				console.log(postResponse.error);

				if (postResponse.error == "Error getting Alyien data.") {
					
					throw "Error getting Alyien data.";
				} 

				else {

					return postResponse;
				}

						
		}

		catch(error) {

				console.log(error);
				return false;
			
		}

}

export { postData, updateUI };
