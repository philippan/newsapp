function formHandler (userInput) {
        
    let expression = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
    
    let answer = expression.test(userInput.value);
    
    // console.log(answer);

    return answer;

}

export { formHandler };