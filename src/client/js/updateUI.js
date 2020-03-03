const updateUI = (postResponse, inputResults, userInput) => {

		let polarity = postResponse.polarity;
		let subjectivity = postResponse.subjectivity;
		let text = postResponse.text;
		let pConfidence = postResponse.polarity_confidence.toFixed(2);
		let sConfidence = postResponse.subjectivity_confidence.toFixed(2);

		inputResults.innerHTML = `
				
				<h3>"${text}"</h3>
				<div class="thoughts">
						<h4>This is what I think about this text from ${userInput.value}:</h4>
						<h3>I'm ${pConfidence} sure that the tone is ${polarity}</h3>
						<h3>And I'm ${sConfidence} sure that the is ${subjectivity}</h3>
				</div>
		`;

		return postResponse;
}

export { updateUI };