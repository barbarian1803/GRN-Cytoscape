var network = null;
$("#test").on("change",function(){
	$("#text").text("loading...");
	// Use it!
	getFile(this.files[0]).then(
		(response)=>testOnLoad(response),
		(error)=>getFileError(error)
	);
});

function testOnLoad(response){
	network = buildNetwork(response);
	$("#text").text("");
}

$("#testclick").on("click",function(e){
	console.log(getStartNodesOfNetwork(network));
	network = filterNetwork(network);
	console.log(getStartNodesOfNetwork(network));
});
