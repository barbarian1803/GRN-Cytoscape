function createNode(network,edge){
	var source = edge[0];
	var target = edge[1];


	if(!network.has(source)){
		network.set(source,new GeneNode(source));
	}

	if(!network.has(target)){
		network.set(target,new GeneNode(target));
	}

	network.get(source).addOutWardNode(target);
	network.get(target).addInWardNode(source);

	return network;
}

function buildNetwork(csv_data){
	var network = new Map();

	var lines = csv_data.split('\n');
	lines.splice(0,1);
	var delimiter = new RegExp('\t|;|,', 'g')
	var i=0;
	for(var line = 0; line < lines.length; line++){
		var arr = lines[line].trim().split(delimiter);
		if(arr[0]=="" ||  arr[1]==""){
			continue;
		}
		network = createNode(network,arr);
	}
	return network;
}

function getEndNodesOfNetwork(network){
	var retval = new Set();

	network.forEach(function(node, name) {
		if(node.isEndNode()){
			retval.add(name);
		}
	});

	return retval;
}

function getStartNodesOfNetwork(network){
	var retval = new Set();

	network.forEach(function(node, name) {
		if(node.isStartNode()){
			retval.add(name);
		}
	});

	return retval;
}

function removeNode(network,node){

	network.get(node).getInWardNode().forEach(function (n){
		console.log(n);
		network.get(n).removeOutWardNode(node);
	});

	network.get(node).getOutWardNode().forEach(function (n){
		console.log(n);
		network.get(n).removeInWardNode(node);
	});

	network.delete(node);
	return network
}

function getEdgeType(network,source){
	if(network.get(nodeSrc).nodeType=="protein"){
		return "regulate";
	}else{
		return "protein";
	}
}


function removeSamePath(network){

	network.forEach(function(node,name){
		if(node.nodeType=="protein"){
			return;
		}
		connectedNodes = new Set();
		outWardEdge = node.getOutWardNode();
		outWardEdge.forEach(function(edge){
			if(network.get(edge).getInWardNode().size>1){
				return;
			}
			edge_outward = network.get(edge).getOutWardNode();
			intersect = connectedNodes.intersection(edge_outward);
			intersect.forEach(function(i){
				network.get(edge).removeOutWardNode(i);
				network.get(i).removeInWardNode(edge);
			});
			connectedNodes = connectedNodes.union(edge_outward);
		})
	});
	return network;
}

function filterNetwork(network){
	start = getStartNodesOfNetwork(network);
	start.forEach(function(n){
		if(network.get(n).nodeType=="protein"){
			network = removeNode(network,n);
		}
	});
	end = getEndNodesOfNetwork(network);
	end.forEach(function(n){
		if(network.get(n).nodeType=="protein"){
			network = removeNode(network,n);
		}
	});
	return network;
}

// @staticmethod
// def filterNetwork(network):
// 	start = NetworkUtil.getStartNodesOfNetwork(network)
// 	for n in start:
// 		if network[n].nodeType=="protein":
// 			NetworkUtil.removeNode(network,n)
// 	end = NetworkUtil.getEndNodesOfNetwork(network)
// 	for n in end:
// 		if network[n].nodeType=="protein":
// 			NetworkUtil.removeNode(network,n)
//
// 	return network
