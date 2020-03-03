
const processData = (userText, callback, textapi) => {

        // I will name the function callback.

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

}


exports.processData = processData;