var network = null;
var network_file_raw = null;
var position_file_raw = null;

$("#testclick").on("click",function(e){
	var network_file = "http://localhost/WebNetwork/data/combine_network_filtered.csv";
	$.get(network_file,function(data){
		network_file_raw = data;
		network = buildNetwork(data);

		var pos_xy = "http://localhost/WebNetwork/data/node_pos.csv";
		$.get(pos_xy,function(data){
			position_file_raw = data;
			parsePosFile(data);
		});
	});
});


function parsePosFile(data){
	lines = data.trim().split("\n");
	lines.splice(0,1);
	lines.forEach(function(line){
		cols = line.trim().split("\t");
		node = cols[0];
		network.get(node).posX = cols[1];
		network.get(node).posY = cols[2];
	});

	return network;
}
