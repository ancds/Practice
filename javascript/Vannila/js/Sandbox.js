/*
    take a param as space loading modules the sandbox offer in a closure
    take some params to assign which modules to load
    take a param as callback while loading finished
*/

Sandbox.modules = {};

Sandbox.modules.dom = function(box){
	box.getElement = function () { 
        //do something
	};
	box.getStyle = function () {};
	box.foo = 'bar';
};

Sandbox.modules.event = function (box){
	box.attachEvent = function () {};
	box.dettachEvent = function () {};
};

Sandbox.modules.ajax = function (box) {
    box.makeRequest = function () {};
    box.getResponse = function () {};
};

Sandbox.prototype = {
    name : 'My App',
    version : '1.0',
    getName: function(){
    	return this.name;
    }
};

function Sandbox(){

    var args = Arrays.prototype.slice.call(arguments),
        callback = args.pop(),
        modules = (args[0] && type of args[0] === 'string') ? args : args[0];


    this.prop1 = 'prop1';
    this.prop2 = 'prop2';

    if( ! (this instance of Sandbox) ){
    	return new Sandbox( modules, callback );
    }

    if( !modules || modules === '*' ){
    	modules = [];
    	for( i in Sandbox.modules ){
    		if(Sandbox.modules.hasOwnProperty(i)){
    			modules.push(i);
    		}
    	}
    }

    for (i = 0; i < modules.length; i++ ){
    	Sandbox.modules[modules[i]](this);
    }

    callback(this);

}

var MYAPP = {};

MYAPP = new Sandbox('dom', 'ajax');
