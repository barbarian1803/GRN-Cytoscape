import json

with open('data/combine_network_filtered.cyjs') as data_file:
    data = json.load(data_file)

#process node
fout = file("node_pos.csv","w")
fout.write("Node\tPosX\tPosY\n")
output = {}
output["nodes"]=[]
nodes = data["nodes"]
for i in xrange(0,len(nodes)):
    output["nodes"].append({})
    output["nodes"][i]["data"]={}
    output["nodes"][i]["data"]["id"]=nodes[i]["data"]["name"]
    output["nodes"][i]["data"]["name"]=nodes[i]["data"]["name"]
    output["nodes"][i]["position"]={}
    output["nodes"][i]["position"]["x"]=nodes[i]["position"]["x"]
    output["nodes"][i]["position"]["y"]=nodes[i]["position"]["y"]
    fout.write(nodes[i]["data"]["name"]+"\t"+str(nodes[i]["position"]["x"])+"\t"+str(nodes[i]["position"]["y"])+"\n")

edges = data["edges"]
output["edges"]=[]

for i in xrange(0,len(edges)):
    infos = edges[i]["data"]["shared_name"].split()
    output["edges"].append({})
    output["edges"][i]["data"]={}
    output["edges"][i]["data"]["name"]=infos[0]+"-"+infos[2]
    output["edges"][i]["data"]["id"]=infos[0]+"-"+infos[2]
    output["edges"][i]["data"]["source"]=infos[0]
    output["edges"][i]["data"]["target"]=infos[2]
    output["edges"][i]["data"]["interaction"]=infos[1]

fout = file("network.json","w")
fout.write(json.dumps(output))
