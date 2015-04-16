var unitTypeSize;
var UnitInsId;
var info;

efform_onload = function ()
{
	info=_getEi();
	unitTypeSize=info.getBlock('result0').getCell('0','templateUnitType');
	UnitInsId=info.getBlock('result0').getCell('0','templateUnitInsId');
	onselect_change(unitTypeSize);
}
//选择设置单元类型
function onselect_change(type)
{	
	var nodeId = document.getElementById("nodeId").value;
	var nodeType = document.getElementById("nodeType").value;
	//alert("nodeId:"+nodeId +",nodeType:"+nodeType);
	//获取对应类型的样式列表
	unitTypeSize = type;
	info.set("templateUnitType",type);
	if(type!="1" && type !="7"&& type !="10")
		EiCommunicator.send( "ECTM10", "getUnitTypeCode" , info, ajax_get_mode);
	var iframe=document.getElementById('mainFrame');
	if(type!="10")
	{	
		iframe.src="DispatchAction.do?efFormEname=ECTM100"+type+"&templateUnitInsId="+UnitInsId
		+"&area="+ef.get("area").value+"&isSearchResult="+ef.get("isSearchResult").value
		+"&nodeId="+nodeId+"&nodeType="+nodeType;	
	}
	else
	{
		iframe.src="DispatchAction.do?efFormEname=ECTM10"+type+"&templateUnitInsId="+UnitInsId+"&nodeId="+nodeId+"&nodeType="+nodeType;
	}
    
}

//选择某个类型模板后返回的样式
var ajax_get_mode = {
	
  onSuccess : 
    function(eiInfo){  
      var eiBlock = eiInfo.getBlock("result"+unitTypeSize+"1");
      info.addBlock(eiBlock);
    },
  onFail    : 
    function(eMsg) {
    }
}