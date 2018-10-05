var publisher = {

    subscribers: {
        any: []
    },
    on: function (type, fn, context) {
        type = type || 'any';
        fn = (typeof fn === 'function') ? fn : context[fn];

    	var subscribers = this.subscribers;
        if(!subscribers[type])
        	subscribers[type] = [];

        subscribers.push({fn: fn, context: context || this });
    },
    remove: function (type, fn, context) {
        this.visitSubscribes('unsubscribe', type, fn, context);
    },
    fire: function (type, publication) {
        this.visitSubscribes ('publish', type, publication);
    },
    visitSubscribes: function (action, type, arg, context) {
        var type = type || any,
            subscribers = this.subscribers[type]
            max = subscribers ? subscribers.length : 0;
        
        for(i = 0; i < max; i++){

        	if (action === 'publish') {
                subscribers[i].fn.call(subscribers[i].context, arg);
        	} else {
                if(subscribers[i] === arg && subscribers[i].context === context){
                	subscribers.slice(i, 1);
                }
        	}

        }

    }

};

function makePublisher(obj) {
    
    for(i in publisher) {
    	if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
    		obj[i] = publisher[i];
    	}
    }
    
    obj.subscribers = {
        any: []
    };
}

function Player (name, key) {
	this.name = name;
	this.key = key;
    this.points = 0;
    this.fire('newPlayer', this);
}

Player.prototype.play = function() {
    this.points += 1;
    this.fire('play', this);
}

var game = {

    keys: {},

    addPlayer: function(player) {

       var key = player.key.toString().charCodeAt(0);
       this.keys[key] = player;

    },

    handleKeypress: function (e) {
        e = e || window.event;
        if(game.keys[e.which])
        	game.keys[e.which].play();
    },

    handlePlay: function (player) {
        
        var i,
            players = this.keys
            score = {};
        
        for (i in players) {
            if (players.hasOwnProperty(i)){
            	score[players[i].name] = players[i].points;
            }
        }

        this.fire('scorechange', score);
    }
};


makePublisher(Player.prototype);
makePublisher(game);

Player.prototype.on('newPlayer', 'addPlayer', game);
Player.prototype.on('play', 'handlePlay', game);
game.on('scorechange', scoreboard.update, scoreboard);
window.onkeypress = game.handleKeypress;


var playername, key;
while (1) {
	playername = prompt('Add player (name)');
	if(!playername){
		break;
	}
	while (1) {
		key = prompt('key for ' + playername + '?' );
		if(!key){
			break;
		}
	}

	new Player(playername, key);
}
