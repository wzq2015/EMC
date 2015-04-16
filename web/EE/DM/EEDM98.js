
efform_onload = function(){
	//efregion.show("ef_region_codeDemo");
	//efregion.toggleShow("ef_region_codeDemo");
}

/** 点击查询按钮后调用后台的service */
button_query_onclick = function () {
	efgrid.submitInqu( "ef_grid_result", "ee", "EEDM98", "query");
}


function treeNodeInitializer(node){
	node.textClicked = function()
					{
						document.getElementById("inqu_status-0-companyCustomizeField").value=node.label() ;
						efwindow.hide();
					};
	node._jTreeNodeDIV.title = node.label()+" "+node.text();//鼠标悬浮到节点上的提示信息。
	
	//值第二层的树节点背景色为粉红色。
	if(node.depth()==2)
		node._jNodeTextDiv.style.background="pink";
}

function myConfigTree(tree){
  tree.nodeInitializer = treeNodeInitializer;
  tree.initialExpandDepth = 3;//树默认展开到第三层。  将深度设置的深一点，就可以全部展开。
  tree.param = "username=aaa password=bbb";
  //tree.clickableNodeNames=false;
}

openpic_onclick = function(){
	EFColorbox({href:"./EE/DM/ohoopee1.jpg",title:"照片"});
};

close_onclick = function(){
	window.close();
};