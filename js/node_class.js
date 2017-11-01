function GeneNode(geneID){
	this.geneID = geneID;
	this.outWardEdge = new Set();
	this.inWardEdge = new Set();

	this.logFC = [];
	this.score = [];

	this.posX = 0;
	this.posY = 0;

	if(geneID.indexOf("ENSG")!=-1){
		this.nodeType = "gene";
	}else{
		this.nodeType = "protein";
	}

	this.addInWardNode = function(node){
		this.inWardEdge.add(node);
	}

	this.addOutWardNode = function(node){
		this.outWardEdge.add(node);
	}

	this.isEndNode = function(){
		return (this.outWardEdge.size==0);
	}

	this.isStartNode = function(){
		return (this.inWardEdge.size==0);
	}

    this.getInWardNode = function(){
		return this.inWardEdge;
	}

	this.getOutWardNode = function(){
		return this.outWardEdge;
	}

	this.removeInWardNode = function(node){
		this.inWardEdge.delete(node);
	}

	this.removeOutWardNode = function(node){
		this.outWardEdge.delete(node);
	}

	return this;
}
