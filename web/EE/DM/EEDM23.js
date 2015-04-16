show_link_button = function ()
{
	efregion.show("ef_region_link");
	efregion.show("ef_region_linkdesc");
	var ef_region_link_buttonbar = new efbuttonbar();
	ef_region_link_buttonbar.buttonCount = 7;
	ef_region_link_buttonbar.buttonData = [["B1","演示方法1"],["B2","演示方法2"],["B3","演示方法3"],["B4","演示方法4"],["B5","演示方法5"],["B6","演示方法6"],["B7","演示方法7"]];
	ef_region_link_buttonbar.paint("ef_region_link");
}

button_b1_onclick = function ()
{
	window.location.href="DispatchAction.do?efFormEname=EEDM23&methodName=query&showtype=1";
}

button_b2_onclick = function ()
{
	window.location.href="DispatchAction.do?efFormEname=EEDM23&methodName=query&showtype=2";
}

button_b3_onclick = function ()
{
	window.location.href="DispatchAction.do?efFormEname=EEDM23&methodName=query&showtype=3";
}

button_b4_onclick = function ()
{
	window.location.href="DispatchAction.do?efFormEname=EEDM23&methodName=query&showtype=4";
}

button_b5_onclick = function ()
{
	window.location.href="DispatchAction.do?efFormEname=EEDM23&methodName=query&showtype=5";
}

button_b6_onclick = function ()
{
	window.location.href="DispatchAction.do?efFormEname=EEDM23&methodName=query&showtype=6&result-limit=1000";
}

button_b7_onclick = function ()
{
	window.location.href="DispatchAction.do?efFormEname=EEDM23&methodName=queryGroup&showtype=genSubgGid";
}

button_query_onclick = function ()
{
	document.getElementById("methodName").value = 'query';
	document.forms[0].submit();
}

efform_onload = function ()
{
	efregion.show("ef_region_result");
	show_link_button();
	//efregion.show("ef_region_codeDemo");
	//efregion.toggleShow("ef_region_codeDemo");
}
