var jsonData;

$('#file').on('change', function(e){
	// Use it!
	getFile(this.files[0]).then(
		(response)=>getFileResolve(response),
		(error)=>getFileError(error)
	);
});

$('#loadNetwork').on('click', function(e){
	buildCytoscape(jsonData);
});

function getFileResolve(response){
	jsonData = parseJSON(response);
}

function getFileError(error){
	console.log("Error! "+response);
}
