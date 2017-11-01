import json

with open('combine_network_filtered.cyjs') as data_file:
    data = json.load(data_file)

#process node
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

edges = data["edges"]
output["edges"]=[]
print edges[0]["data"].keys()
print edges[0]["data"]["shared_name"].split()[0]

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
