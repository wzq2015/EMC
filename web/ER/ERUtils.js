
var EiInfoExcelConstants = {
	H_DISTANCE : 25,
	V_DISTANCE : 50,
	T_COUNT	:1000
};

function ReadNode(hdistance,vdistance,value){
	this.Hdistance = hdistance;
	this.Vdistance = vdistance;
	this.Value = value;
	this.Next = null;
}

ReadNode.prototype.next = function(){
	return this.Next;
}

function Sheet(id){
	this._Vlist = new Array();
	this.id = id;
}

Sheet.prototype.add = function(readnode){
	this._Vlist.push(readnode);
}

Sheet.prototype.get = function(i){
	return this._Vlist[i];

}

Sheet.prototype.length = function(){
	return this._Vlist.length;
}

Ei2Excel = function(spreadSheet){
	this.spreadSheet = spreadSheet;
	this.sheetList = new Array();
	this.init();
}

Ei2Excel.prototype.parse = function(info){
	for(var i=0;i<this.sheetList.length;i++){
		var sheet = this.sheetList[i];
		for(var j=0;j<sheet.length();j++){
			var headNode = sheet.get(j);
			var readNode = headNode.Next;
			while(null !=readNode){
					this._update(readNode,info,sheet); // 根据eiinfo中的值更新excel中的值
					this._refresh(readNode,sheet,j+1,info); // 刷新readNode节点以后的节点坐标位置
					readNode = readNode.Next;
			}
		
		}
	
	}
}

Ei2Excel.prototype.init = function(){

	for(var i=1;i<= this.spreadSheet.Worksheets.Count;i++){
		var workSheet = this.spreadSheet.Worksheets.Item(i);
		var sheet = new Sheet(workSheet.Name);
		this.sheetList.push(sheet);
		for(var j=1;j<=EiInfoExcelConstants.V_DISTANCE;j++){
			var headNode = new ReadNode(-1,j,"headNode");
			var parentNode = headNode;
			for(var k=1;k<=EiInfoExcelConstants.H_DISTANCE;k++){
				var cell = workSheet.Cells(j,k);
				if((undefined != cell) && ("noExchange" !=this._check(cell.Value))){
					readNode = new ReadNode(k,j,cell.Value);
					parentNode.Next = readNode;
					parentNode = readNode;
				}
			}
			if(headNode.Next)
				sheet.add(headNode);
		}
	}	
	
}

Ei2Excel.prototype._refresh = function(readNode,sheet,j,info){
	if("multeBlock" == this._check(readNode.Value)){
		var value = readNode.Value;
		value = value.substring(2,value.length-1);
		var block = info.getBlock(value);
		var metaCount = block.getBlockMeta().colCount;	
		var rowCount = block.getRows().length >	EiInfoExcelConstants.T_COUNT 
			? EiInfoExcelConstants.T_COUNT:block.getRows().length;
		readNode = readNode.Next;
		while(readNode){
			readNode.Hdistance += metaCount;
			readNode = readNode.Next;
		}
		for(k=j;k<sheet.length();k++){
			readNode = sheet.get(k);
			readNode = readNode.Next;
			while(readNode){ 
				readNode.Vdistance += rowCount;
				readNode = readNode.Next;
			}
		}
	}
}

Ei2Excel.prototype._check = function(value){
	if(!value || value.length<=2)
		return "noExchange";
	if(typeof value != "string")
		return "noExchange";	
	if((value.charAt(0)=='[') && (value.charAt(value.length-1)==']')){
		var realValue = value.substring(1,value.length-1);
		if(realValue.charAt(0) == '&')
			return "multeBlock";
		else
			return "singleValue";	
	}else
		return "noExchange";
	
	
}

Ei2Excel.prototype._update = function(readNode,info,sheet){
	if("multeBlock" == this._check(readNode.Value)){	// update excel when it is a eiblock 
		var value = readNode.Value;
		value = value.substring(2,value.length-1);
		var block = info.getBlock(value);
		var meta = block.getBlockMeta();
		//设置excel 列头信息
		i = 0;
		for(var eicolumn in meta.metas){	//往excel中填充block的列头信息
			if(0 == i){
				cell = this.spreadSheet.Worksheets(sheet.id)
					.Cells(parseInt(readNode.Vdistance),parseInt(readNode.Hdistance));
				cell.Value = meta.metas[eicolumn].descName;	
			}		
			else{	//新增一列
		//		this.spreadSheet.Worksheets(sheet.id).Columns(parseInt(readNode.Hdistance)+i).Insert();		
				cell = this.spreadSheet.Worksheets(sheet.id)
					.Cells(parseInt(readNode.Vdistance),parseInt(readNode.Hdistance)+i);	
				cell.Value = meta.metas[eicolumn].descName;	
			}	
			i++;	
	    }
	    // 往excel中填充block的行数据信息
	    
	    var size = block.getRows().length;
	    if(size > EiInfoExcelConstants.T_COUNT){
	    	alert("数据的行数应该少于"+EiInfoExcelConstants.T_COUNT+"条");
	    	size = EiInfoExcelConstants.T_COUNT;
	    }	
	    for(j = 0;j<size;j++){
	    	// 新增一行
	    	this.spreadSheet.Worksheets(sheet.id).Rows(parseInt(readNode.Vdistance)+j+1).Insert();
	    	map = block.getMappedRows()[j];
	    	k = 0;
	    	for(var value in map){
	    		cell = this.spreadSheet.Worksheets(sheet.id)
					.Cells(parseInt(readNode.Vdistance)+j+1,parseInt(readNode.Hdistance)+k);
				cell.Value = map[value];
				k++;	
	    	}
	    }
	    
	
	}else if("singleValue" == this._check(readNode.Value)){	// update excel when it is singleValue
		var value = readNode.Value;
		this.spreadSheet.Worksheets(sheet.id).Cells(readNode.Vdistance,readNode.Hdistance).Value 
			= info.get(value.substring(1,value.length-1));
	}
}


EiInfo.prototype.get = function(str){
	
	if(!str)
		return null;
		
	var strArray = str.split("-");
	if(3 == strArray.length){
		block = this.getBlock(strArray[0]);
		if(null != block)
			return block.getCell(parseInt(strArray[1]),strArray[2]);
		else
			return null;	
	}else if(2 == strArray.length){
		block = this.getBlock(strArray[0]);
		if(null != block)
			return block.get(strArray[1]);
		else
			return null;	
	
	}
    return this.extAttr[strArray[0]];
}
