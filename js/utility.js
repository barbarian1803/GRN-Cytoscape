Set.prototype.union = function(setB) {
    var union = new Set(this);
    for (var elem of setB) {
        union.add(elem);
    }
    return union;
}

Set.prototype.intersection = function(setB) {
    var intersection = new Set();
    for (var elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
}

Set.prototype.difference = function(setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
}


function getFile(file) {
	// Return a new promise.
	return new Promise(function(resolve, reject) {
		var reader = new FileReader();
		reader.onload = function(e){
			resolve(reader.result);
		}
		reader.readAsText(file);
	});
}

function getFileError(error){
	console.log("Error! "+response);
}

function parseCSV(text){
	var retval = [];
	var lines = text.split('\n');
	lines.splice(0,1);
	var delimiter = new RegExp('\t|;|,', 'g')
	var i=0;
	for(var line = 0; line < lines.length; line++){
		var arr = lines[line].trim().split(delimiter);
		if(arr[0]=="" ||  arr[1]==""){
			continue;
		}
		var obj = {"gene":arr[0],"logfc":arr[1]}
		retval.push(obj)
	}
	return retval;
}

function parseCSV2(text){
	var retval = [];
	var lines = text.split('\n');
	lines.splice(0,1);
	var delimiter = new RegExp('\t|;|,', 'g')
	var i=0;
	for(var line = 0; line < lines.length; line++){
		var arr = lines[line].trim().split(delimiter);
		if(arr[0]=="" ||  arr[1]==""){
			continue;
		}
		var obj = {"s":arr[0],"t":arr[1]}
		retval.push(obj)
	}
	return retval;
}

function parseJSON(text){
	var retval = [];

	var lines = text.split('\n');
	lines.splice(0,1);
	var i = 0;
	for(var line = 0; line < lines.length; line++){
		var arr = lines[line].trim().split('\t');
		if(arr[0]=="" ||  arr[1]==""){
			continue;
		}
		var obj = {group: 'edges', data:{
			id: i,
			source: arr[0],
			target: arr[1]
		}};
		retval.push(obj);
		var obj = {
			group: 'nodes',
			data:{
				id: arr[0],
				name: arr[0]
			}
		};
		retval.push(obj);
		var obj = {group: 'nodes', data:{
			id: arr[1],
			name: arr[1]
		}};
		retval.push(obj);
		i=i+1;
	}
	return retval;
}

function parseCSV_multicol(text){
	var retval = [];
	var lines = text.split('\n');
	lines.splice(0,1);
	var delimiter = new RegExp('\t|;|,', 'g')
	var i=0;
	for(var line = 0; line < lines.length; line++){
		var arr = lines[line].trim().split(delimiter);
		if(arr[0]=="" ||  arr[1]==""){
			continue;
		}
		var obj = {"gene":arr[0],"logfc":arr.slice(1,arr.size)}
		retval.push(obj)
	}
	return retval;
}
