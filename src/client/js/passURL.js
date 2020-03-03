import { formHandler } from './formHandler';
import { postData} from './getPost';
import { updateUI} from './updateUI';
import { errorUI } from './errorUI';

const passURL = async (userInput, inputResults) => {

		let validURL = formHandler(userInput);

		if (validURL == true) {
				
				let gotPostResponse = await postData('/submitData', {text: userInput.value});
				
				console.log(gotPostResponse);
				
				if (gotPostResponse == false) {

					errorUI("broken", inputResults);
					return "broken";

				}

				else {
					
					updateUI(gotPostResponse, inputResults, userInput);
					return "valid";
				}
				
		} 

		else {

				errorUI("invalid", inputResults);
				return "invalid";
		}

}

export { passURL };