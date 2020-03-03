const errorUI = (errorType, inputResults) => {

	switch (errorType) {

			case "broken":
    			
    				inputResults.innerHTML = "";
					inputResults.innerHTML = `
					<p>The URL you entered might be broken...</p>
					`;
					
					return inputResults.innerHTML;

  			case "invalid":
    			
    				inputResults.innerHTML = "";
					inputResults.innerHTML = `
					<p>Invalid URL. Try following this format: http://website.com.</p>
					`;

    				return inputResults.innerHTML;
    		

    		default:
    				inputResults.innerHTML = "";
					inputResults.innerHTML = `
					<p>You must've done something wrong...</p>
					`;

					return inputResults.innerHTML;

	}

	return false;

}

export { errorUI };