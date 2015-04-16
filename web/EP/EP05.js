efform_onload = function ()	{
    var info = _getEi();
	document.getElementById("lam").value = info.get("lam");
}

button_query_onclick = function() {
	var inInfo = new EiInfo();
	// 设置查询条件
	inInfo.setByNode("ef_region_inqu");
	var serviceName = "EP05";
	var queryMethod = "query";


	EiCommunicator.send(serviceName, queryMethod, inInfo);
	if (ajaxEi == null)
		return;

	document.getElementById("pab").value = ajaxEi.get("pab");
};