var jsonData = "";

$('#loadJSON').on('click', function(e){

	if(jsonData!=""){
		buildCytoscape(jsonData);
	}else{
		$("#text").text("loading...");
		$("#logfc").val("");
		$("#path").val("");
		$.getJSON("data/longest_diff_exp.json",function(data){
			jsonData = data
			buildCytoscape(jsonData);
			enlargeNetwork(0.5);
			$("#text").text("");
		});
	}
});

function enlargeNetwork(factor){
	//get corner of teh network
	min_x = 999999999
	max_x = -999999999
	min_y = 999999999
	max_y = -999999999

	CytoscapeObj.nodes().forEach(function(s){
		if(s.position()["x"]>max_x){
			max_x = s.position()["x"]
		}
		if(s.position()["x"]<min_x){
			min_x = s.position()["x"]
		}
		if(s.position()["y"]>max_y){
			max_y = s.position()["y"]
		}
		if(s.position()["y"]<min_y){
			min_y = s.position()["y"]
		}
	});

	length = max_x-min_x;
	height = max_y-min_y;

	center_x = min_x+length/2;
	center_y = min_y+height/2;

	new_min_x = center_x-length;
	new_max_x = center_x+length;

	new_min_y = center_x-height;
	new_max_y = center_x+height;

	CytoscapeObj.nodes().forEach(function(s){
		s.position()["x"] = s.position()["x"]+((1+factor)*(s.position()["x"]-center_x));
		s.position()["y"] = s.position()["y"]+((1+factor)*(s.position()["y"]-center_y));
	});
}
