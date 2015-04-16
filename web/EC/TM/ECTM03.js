
efform_onload = function ()
{
}	

function treeNodeInitializer(node){
 node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
  var classId = node.label();
  ef.get("inqu_status-0-templateTypeId").value=classId;
  if(classId!="site"){
  efgrid.submitInqu( "ef_grid_result", "ec","ECTM03","query");
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
button_select_onclick = function () 
{	
	if(checkNullRow()){
	/*
		//模板实例标识
		var templateInsId = document.getElementById("ins_info-0-templateInsId").value;
		//模板实例名称
		var templateInsName = ef.get("ins_info-0-templateInsName").value;
		//节点标识
		var	objId = ef.get("ins_info-0-objId").value;
		//节点类型（0-站点;1-栏目;）
		var objType = ef.get("ins_info-0-objType").value;
		*/
		//模板类型（0-站点首页;1-栏目首页;2-栏目列表;3-文章页;）
		var templateTypeId= ef.get("ins_info-0-templateTypeId2").value;
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
		*/
		var info = new EiInfo();
		info.setByNode("ef_region_inqu"); 
		//info.set("templateInsId",templateInsId);
		//info.set("templateInsName",templateInsName);
		//info.set("objId",objId);
		//info.set("objType",objType);
		//info.set("templateTypeId",templateTypeId);
		EiCommunicator.send( "ECTM05", "selectIns" , info, null );
		
		//刷新父页面
		if(ajaxEi!=null){
			var feedback=ajaxEi.get("add_instemplate_feedback");
      		alert(feedback);
      		opener.document.getElementById("result"+((parseInt(templateTypeId)+1)+"")+"-0-templateInsId").value=opener.check(ajaxEi.get("templateInsId"),templateTypeId);
      		opener.document.getElementById("result"+((parseInt(templateTypeId)+1)+"")+"-0-templateInsName").value=opener.check(ajaxEi.get("templateInsName"),templateTypeId);
      		
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
      alert("只能选择一个模板进行选择!");
      return false;
     }else{
      var rows = grid.getCheckedRows();
   	  document.getElementById("ins_info-0-templateInsId").value=grid.getCellValue( rows[0], 0, TYPE_DATA, true );
   	  document.getElementById("ins_info-0-templateInsName").value=grid.getCellValue( rows[0], 0, TYPE_DATA );
      return true;
	 }
}