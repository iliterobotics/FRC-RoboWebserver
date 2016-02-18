var queues;

module.exports.addToQueue = function(collection, id, doc){
	if(id) collection += id;
    if(!queues){
		queues = {};
	}
	if(!queues[collection]){
		queues[collection] = {};
	}
	for(var ip in queues[collection]){
		if(queues[collection].hasOwnProperty(ip)){
			queues[collection][ip].push(doc);
		}
	}
}

module.exports.getClinetQueue = function(collection, id, ip){
	if(id) collection += id;
    if(queues && queues[collection]){
		return queues[collection][ip];
	}
}

module.exports.clearClientQueue = function(collection, id, ip){
	if(id) collection += id;
    exports.addClientQueue(collection, ip);
}

module.exports.addClientQueue = function(collection, id, ip){
	if(id) collection += id;
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