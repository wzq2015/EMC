
//原平台用户设置日期格式的方法
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true); 
  node.callback = function(value){
	 alert("测试点击回调"+value);
  }

};




/*
 * 新的设置日期格式的方法
 */
setDateFormat = function(id)
{
	$("#inqu_status-0-companyDate").datepicker( "option", "dateFormat", $("#format").val() );
}

efcalendarSpan_click = function (control_source, idStart,idEnd) {
	  var nodeStart = ef.getNodeById(idStart);
	  var nodeEnd = ef.getNodeById(idEnd);
	  efcalendarSpan(control_source, nodeStart,nodeEnd,'yyyy/mm/dd', true);
	};
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
button_button_ef_onclick = function()
{
		alert("我是EFButton！");
};





