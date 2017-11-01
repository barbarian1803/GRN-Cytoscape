var logfc;

$('#logfc').on('change', function(e){
	$("#text").text("loading...");
	// Use it!
	getFile(this.files[0]).then(
		(response)=>readLogFCFile(response),
		(error)=>getFileError(error)
	);
});

$('#path').on('change', function(e){
	$("#text").text("loading...");
	// Use it!
	getFile(this.files[0]).then(
		(response)=>readPathFile(response),
		(error)=>getFileError(error)
	);
});

$('#loadNetwork').on('click', function(e){
	buildCytoscape(jsonData);
});

$('#togglePath').on('click', function(e){
	CytoscapeObj.nodes().forEach(function(s){
		if(s.data()["id"].indexOf("ENSG")!=-1 && Math.abs(s.data()["logFC"])<=0.65){
			s.addClass("hidden");
			return;
		}
	});
});

$('#colorNode').on('click', function(e){
	CytoscapeObj.nodes().forEach(function(s){
		if(s.data()["logFC"]==undefined){
			return;
		}
		if(s.data()["logFC"]>0.65){
			s.addClass("upreg")
		}
		if(s.data()["logFC"]<-0.65){
			s.addClass("downreg")
		}
	});
});

function readLogFCFile(response){
	logfc = parseCSV(response);
	logfc.forEach(function(s){
		id=s.gene;
		node = CytoscapeObj.$("#"+id);

		if(node.data()==undefined){
			return;
		}
		node.data()["logFC"] = s.logfc
	});

	CytoscapeObj.nodes().forEach(function(s){
		if(s.data()["id"].indexOf("ENSG")!=-1 && s.data()["logFC"]==undefined){
			if(!s.hasClass("hidden")){
				s.toggleClass("hidden");
			}
			return;
		}
	});

	$("#text").text("");
}

function readPathFile(response){
	logfc = parseCSV2(response);
	logfc.forEach(function(s){
		id=s.s+"-"+s.t;
		CytoscapeObj.$("#"+id).addClass("edgeBold");
		CytoscapeObj.$("#"+id).style("z-index","99999");
		CytoscapeObj.$("#"+s.s).style("z-index","99999");
		CytoscapeObj.$("#"+s.s).addClass("nodeBold");
		CytoscapeObj.$("#"+s.t).style("z-index","99999");
		CytoscapeObj.$("#"+s.t).addClass("nodeBold");
	});

	$("#text").text("");
}
