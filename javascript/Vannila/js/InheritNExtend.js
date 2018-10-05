/*
    object inherit
*/

var parent = {
	name : 'father'
};

function inherit (obj) {
	var F = function () {};
	F.prototype = obj;
	return new F();
}

var child = inherit(parent);
var child = Object.create(parent);


/*
    deep extend
*/

function deepExtends(parent, child) {
    var i,
        toStr = Object.prototype.toString,
        astr = '[Object Array]';
    for(i in parent){
        if(parent.hasOwnProperty(i)){
            if(typeof parent[i] === 'object'){
                child[i] = (parent[i].toString === astr) ? [] : {};
                deepExtends( parent[i], child[i]);
            }else{
            	child[i] = parent[i];
            }
        }
    }
}

/*

*/

function mix () {
    var arg, i, child = {};
    for(arg = 0; arg < arguments.length; i++ ){
    	for(prop in arguments[arg]){
            if(arguments[arg].hasOwnProperty(prop)){
            	child[prop] = arguments[arg][prop];
            }
    	}
    }	
}