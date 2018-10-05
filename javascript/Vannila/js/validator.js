/*
    a validator is an object with method validate(data), and extendable validator types
    a validator type is an object handles specific validation
    validate data according to configured validtor types 
*/

var validator = {
    
    types: {},
    messages: [],
    config: {},

    validate: function(data) {
        
        this.messages = [];

        var i,
            config = this.config,
            type, checker, result_ok, msg;

        for(i in data){
        	if(data.hasOwnProperty(i)) {
                type = this.config[i];
                checker = this.types[type];

                if(!checker){
                	throw {
                		name: 'ValidationError',
                		message: 'No handler to validate type ' + type

                	};
                }

        	}

        	result_ok = checker.validate(data[i]);
        	if(!result_ok){
                msg = 'Invalid value for *' + i + '*, ' + checker.instru;
        		this.messages.push(msg);
        	}
        }

        return this.hasErrors();   

    },


    hasErrors: function () {
    	return this.messages.length !== 0;
    }

};