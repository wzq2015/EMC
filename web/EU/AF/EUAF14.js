efform_onload = function ()
{
  var rightHeight = window.parent.rightFrame.document.body.clientHeight;
  ef.get('content').style.height = rightHeight + 'px' ;
  efregion.show("ef_region_inqu");
  efform.hideFormHead();
  loadInfo();
}

/**
 * 加载信息 for search
 * */
function loadInfo(){
	var eiinfo = new EiInfo();
	if(ef.get("nodeVal") == undefined || ef.get("method").value.trim() == "delete"){
		return ;
	}
	var nodeVal = ef.get("nodeVal").value.trim();
	if(nodeVal == "null") return ;
	eiinfo.set("nodeId",nodeVal);
	EiCommunicator.send("EUAF13","query",eiinfo,loadInfo_callback);
}
var loadInfo_callback =  {
	onSuccess :
	 	function (eiInfo)
		{
			var node_block = eiInfo.getBlock("node_block");
			ef.get("content").innerHTML = node_block.getCell(0, "infoContent");
		},
	onFail:
		function(eMsg)
		{
			alert("服务调用失败: "+eMsg );
		}
}
