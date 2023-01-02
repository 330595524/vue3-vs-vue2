let fcList = [
	{
			"fid": "JkFtNgcl0J44Fo9oBIEIFpdkpgMt48ZN",
			"pfid": "",
			"fname": "测试",
			"Count": 1
	},
	{
			"fid": "FV1xJoMlYQkYk9cplINskMJQ5oRMF90l",
			"pfid": "JkFtNgcl0J44Fo9oBIEIFpdkpgMt48ZN",
			"fname": "子文件夹",
			"Count": 0
	},
	{
			"fid": "0NdlRNtJ0Q4RhcYx5lchk8cUQt8poJZo",
			"pfid": "FV1xJoMlYQkYk9cplINskMJQ5oRMF90l",
			"fname": "孙文件夹",
			"Count": 0
	},
	{
			"fid": "wBpxsENFsElFxJ5hgko8kR0kUxMo88s8",
			"pfid": "FV1xJoMlYQkYk9cplINskMJQ5oRMF90l",
			"fname": "孙文件夹2",
			"Count": 2
	},
	{
			"fid": "5U0sg0EhMog9Rds54QIYcIZN0pEQd8Mt",
			"pfid": "FV1xJoMlYQkYk9cplINskMJQ5oRMF90l",
			"fname": "孙3",
			"Count": 0
	},
	{
			"fid": "dsdgANpVQdkhtogxIUxowk8Nd1wFEZ8s",
			"pfid": "JkFtNgcl0J44Fo9oBIEIFpdkpgMt48ZN",
			"fname": "子2",
			"Count": 0
	},
	{
			"fid": "8ZgdxYc98cRsE1lltx9xd98B9Rh4Nol9",
			"pfid": "dsdgANpVQdkhtogxIUxowk8Nd1wFEZ8s",
			"fname": "孙2-1",
			"Count": 1
	},
	{
			"fid": "41UR4xV1UZxRhtJpMdxBYUVhBoQYBlwJ",
			"pfid": "0NdlRNtJ0Q4RhcYx5lchk8cUQt8poJZo",
			"fname": "重孙1",
			"Count": 1
	}
]
let temFList = [
	{
			"pfid": "",
			"fid": "JkFtNgcl0J44Fo9oBIEIFpdkpgMt48ZN",
			"fname": "测试",
			"Count": 1,
			"children": []
	}
]

function makeTree(flist = [] , tree = []) {
	tree.forEach((v,i) => {
		const childs = findChild(v, flist)
		if(childs.length > 0){
			tree[i].children = childs

			makeTree(fcList, childs)	
		}

		for (const x of v.children || []) {
			tree[i].Count += x.Count
		}

	});
}

function findChild(v, vs) {
	let ret = []
	vs.forEach(v2 => {
		if(v.fid == v2.pfid){
			ret.push(v2)
		}
	});
	return ret
}




makeTree(fcList, temFList)
console.log(JSON.stringify(temFList));