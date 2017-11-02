import json
import sys

with open(sys.argv[1]) as data_file:
    data = json.load(data_file)

#process node
output = {}
output["nodes"]=[]
nodes = data["nodes"]

repeat = 8

##names = file("data/gene_names.txt","w")
for i in xrange(0,len(nodes)):
    ##if "ENSG" in nodes[i]["data"]["name"]:
        ##names.write(nodes[i]["data"]["name"]+"\n")
    for n in xrange(0,repeat):
        idx = (n)+repeat*i
        output["nodes"].append({})
        output["nodes"][idx]["data"]={}
        output["nodes"][idx]["data"]["id"]=str(n)+"_"+nodes[i]["data"]["name"]
        output["nodes"][idx]["data"]["name"]=nodes[i]["data"]["name"]
        output["nodes"][idx]["position"]={}
        output["nodes"][idx]["position"]["x"]=(n-1)*25+nodes[i]["position"]["x"]
        output["nodes"][idx]["position"]["y"]=nodes[i]["position"]["y"]

edges = data["edges"]
output["edges"]=[]


for i in xrange(0,len(edges)):
    for n in xrange(0,repeat):
        idx = (n)+repeat*i
        infos = edges[i]["data"]["shared_name"].split()
        output["edges"].append({})
        output["edges"][idx]["data"]={}
        output["edges"][idx]["data"]["name"]=infos[0]+"-"+infos[2]
        output["edges"][idx]["data"]["id"]=str(n)+"_"+infos[0]+"-"+infos[2]
        output["edges"][idx]["data"]["source"]=str(n)+"_"+infos[0]
        output["edges"][idx]["data"]["target"]=str(n)+"_"+infos[2]
        output["edges"][idx]["data"]["interaction"]=infos[1]

fout = file(sys.argv[2],"w")
fout.write(json.dumps(output))
