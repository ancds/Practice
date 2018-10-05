/*
    decorator : dynamically add features to methods
    make implements and add those required to an object
    when a decoratable method called, go through the decorator chain
*/


var DecorateHelper = function () {
    
    var excuteDecoratable = function (type, initValue) {
        
        var decoratorChain = this.decorators[type],
            i;

        for(i = 0; i < decoratorChain.length; i++){
            initValue = decoratorChain[i].excute(initValue);
        }

    };

    var decorate = function (type, decorator) {
        
        if(!this.decorators[type]){
        	this.decorators[type] = {};
        }

        var decorators = this.decorators[type];
        decorators.push(decorator);

    };

    var makeDecoratable = function (obj, types) {
        
        if (!obj.decorators){
        	obj.decorators = {};
        }
        
        for(i = 0; i < types.length; i++ ){
        	obj.decorators[types[i]] = {};
        }

        obj.excuteDecoratable = excuteDecoratable;

    };

};


function Sale(price) {
	this.price = ( price > 0 ) || 100;
}

DecorateHelper.makeDecoratable(Sale.prototype, ['price']);

Sale.decorators.price.fedtax = {
    excute: function (price) {
    	return price + price * 5/100; 
    }
};

Sale.decorators.price.quebec = {
    excute: function (price) {
    	return price + price * 5/100; 
    }
};

Sale.decorators.price.money = {
    excute: function (price) {
    	return price + price * 5/100; 
    }
};

Sale.prototype.getPrice = function () {
    
    var price = this.price;
    price = this.excuteDecoratable('price', price);
    reutnr price;
};

