var queues;

module.exports.addToQueue = function(collection, doc){
	if(!queues){
        queues = {};
    }
    if(!queues[collection]){
		queues[collection] = {};
	}
	for(var ip in queues[collection]){
        console.log('added ' + JSON.stringify(doc) + ' to queue for ' + collection);
        if(queues[collection].hasOwnProperty(ip)){
            queues[collection][ip].push(doc);
        }
	}
}

module.exports.getClinetQueue = function(collection, ip){
    if(queues && queues[collection]){
		return queues[collection][ip];
	}
}

module.exports.clearClientQueue = function(collection, ip){
    exports.addClientQueue(collection, ip);
}

module.exports.addClientQueue = function(collection, ip){
	if(!queues){
		queues = {collection:{ip:[]}};
	}
    else if(!queues[collection]){
        queues[collection] = {ip:[]};
    }
	else{
		queues[collection][ip] = [];
	}
}