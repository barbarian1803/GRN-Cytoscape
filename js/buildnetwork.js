var CytoscapeObj;

function buildCytoscape(json){
	CytoscapeObj = cytoscape({
		container: $('#viewport'),
		layout: {name:'preset',fit:false,zoom:0.3},
		pan: {x:950,y:355},
		elements: json,
		hideEdgesOnViewport: true,
		wheelSensitivity: 0.15,
		style: cytoscape.stylesheet()
		.selector('node')
		.css({
			'content': 'data(name)',
			'text-valign': 'center',
			'font-size' : 7,
			'min-zoomed-font-size': 5,
			'color': '#000',
			'border-color': '#0000FF',
			'border-width': 1,
			'border-opacity': 0.5,
			'background-color':'#FFF',
			'height': '60',
			'width': '60',
		})
		.selector('edge')
		.css({
			'curve-style': 'bezier',
			'target-arrow-shape': 'triangle',
			'target-arrow-color': '#ccc',
			'line-color': '#ccc',
			'width': 0.8,
			'arrow-scale':1
		})
		.selector('node:selected')
		.css({
			'border-width':3,
			'border-color': 'black',
		})
		.selector('edge:selected')
		.css({
			'width':2,
			'arrow-scale': 2,
			'target-arrow-color': 'black',
			'source-arrow-color': 'black',
			'line-color': 'black',
		})
		.selector('.faded')
		.css({
			'opacity': 0.25,
			'text-opacity': 0
		})
		.selector('.upreg')
		.css({
			'background-color':'red',
			'z-index':999
		})
		.selector('.downreg')
		.css({
			'background-color':'#DBDB16',
			'z-index':999
		})
		.selector('.upreg1')	// 0.65 < lfc < 1
		.css({
			'background-color':'#ff5900',
			'z-index':999
		})
		.selector('.upreg2')	// lfc > 1
		.css({
			'background-color':'#ff0000',
			'z-index':999
		})
		.selector('.downreg1') 	// -1 < lfc < -0.65
		.css({
			'background-color':'#81ff35',
			'z-index':999
		})
		.selector('.downreg2')	// lfc < -1
		.css({
			'background-color':'#13a32d',
			'z-index':999
		})
		.selector('.hidden')
		.css({
			'display':'none'
		})
		.selector('.edgeBold')
		.css({
			'width':2,
			'arrow-scale': 2,
			'target-arrow-color': 'black',
			'source-arrow-color': 'black',
			'line-color': 'black',
		})
		.selector('.nodeBold')
		.css({
			'border-width':3,
			'border-color': 'black'
		})
	});
}
