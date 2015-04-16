
function treeNodeInitializer(node){
 node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
  var classId = node.label();
  ef.get("inqu_status-0-templateTypeId").value=classId;
  if(classId!="site"){
  efgrid.submitInqu( "ef_grid_result", "ec","ECTM01","query");
  }
  else
  setFalseButton();
}
	
function configTree(tree){
  tree.nodeInitializer = treeNodeInitializer;          
  tree.emptyNodeAsLeaf = true;
  tree.expand();
}

/*
  点击新建按钮后调用后台的service
*/
button_add_onclick = function () 
{	
	if(checkNullRow()){
		/*
		//模板定义标识
		var templateDefId = document.getElementById("template_info-0-templateDefId").value;
		*/
		//模板实例名
		//var templateDefName = ef.get("template_info-0-templateDefNameEdited").value;
		//判断模板实例名有没有被用户定义过，没有则用模板名，有则用用户定义的模板实例名
		if(ef.get("result-0-templateDefNameEdited").value != '')
			ef.get("template_info-0-templateInsName").value = ef.get("result-0-templateDefNameEdited").value;
		else
			ef.get("template_info-0-templateInsName").value = ef.get("template_info-0-templateDefName").value;
		/*//节点标识
		var	objId = ef.get("template_info-0-objId").value;
		//节点类型（0-站点;1-栏目;）
		var objType = ef.get("template_info-0-objType").value;
		*/
		//模板类型（0-站点首页;1-栏目首页;2-栏目列表;3-文章页;）
		var templateTypeId= ef.get("template_info-0-templateTypeId2").value;
		
		var info = new EiInfo();
		info.setByNode("ef_region_inqu");
		//info.set("templateDefName",templateDefName);
		//info.set("templateDefId",templateDefId);
		//info.set("templateDefName",templateDefName);
		//info.set("objId",objId);
		//info.set("objType",objType);
		//info.set("templateTypeId",templateTypeId);
		
		/*
		var returntype = "";
		if(templateTypeId=="0"){
			returntype = "1";
		}else if(templateTypeId=="1"){
			returntype = "2";
		}else if(templateTypeId=="2"){
			returntype = "3";
		}else if(templateTypeId=="3"){
			returntype = "4";
		}
		
		alert(((parseInt(templateTypeId)+1)+""));
		*/
		EiCommunicator.send( "ECTM05", "addIns" , info, null );
		//刷新父页面
		if(ajaxEi!=null){
			var feedback=ajaxEi.get("add_instemplate_feedback");
      		alert(feedback);
      		var objType=ajaxEi.get("template_info-0-objType");
      		if("a"==objType){
      			opener.document.getElementById("result-0-templateId").value=ajaxEi.get("templateInsId");
      			opener.document.getElementById("result-0-templateNmae").value=ajaxEi.get("templateInsName");
      		}else{
      			opener.document.getElementById("result"+((parseInt(templateTypeId)+1)+"")+"-0-templateInsId").value=opener.check(ajaxEi.get("templateInsId"),templateTypeId);
      			opener.document.getElementById("result"+((parseInt(templateTypeId)+1)+"")+"-0-templateInsName").value=opener.check(ajaxEi.get("templateInsName"),templateTypeId);
      		}
      		window.close();
      	}
		
	}
	//alert(opener.document.title);
}

//判断有没有选择记录
function checkNullRow(){
   var grid=efgrid.getGridObject("ef_grid_result");
   
   var templateId = "";
   var rowCount=grid.getCheckedRowCount();
     if(rowCount==0){
      alert("请选择一条记录进行操作!");
      return false;
     }
     else if(rowCount>1){
      alert("只能选择一个模板进行新增!");
      return false;
     }else{
      var rows = grid.getCheckedRows();
   	  document.getElementById("template_info-0-templateDefId").value=grid.getCellValue( rows[0], 0, TYPE_DATA, true );
   	  document.getElementById("template_info-0-templateDefName").value=grid.getCellValue( rows[0], 0, TYPE_DATA );
      return true;
	 }
}