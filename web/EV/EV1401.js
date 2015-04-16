
//初始化页面
var treeEname;
var userId;
var menuUrlValueType;
var ssoSystemId_value;
var portalId ;
efform_onload = function (){
	ssoSystemId_value = document.getElementById("result-0-ssoSystemId").value;
	menuUrlValueType = document.getElementById("result-0-menuType").value;
	var info=_getEi();
	block_system = info.getBlock("result_system");
	userId=info.get("userId");
	portalId = info.get("portalId");
	treeEname=document.getElementById("result-0-treeEname").value;
	if(treeEname!=null && treeEname!=""){
		efbutton.setButtonStatus("insert", false);
		document.getElementById("result-0-treeEname").readOnly=true;
		document.getElementById("result-0-nodeEname").readOnly=true;
	}else{
		efbutton.setButtonStatus("update", false);
	}
	if(info.get("userId") == "anonymous"){
		var parent = document.getElementById('result-0-menuType');
		parent.removeChild(parent.options[0]);
	}
		selectCity();
	
}

/**
页面逻辑验证
*/
function validatePageLogic(){
  //如果用户在“菜单来源”中选择“来自平台” 或“来自内容管理”,则“单点登录标识”只能为“不可用”；
  if(ef.get("result-0-menuType").value!="1"&&ef.get("result-0-ssoSystemId").value.trim().length>0){
     alert("如果您在\"菜单类型\"中选择\"来自平台\" 或\"来自内容管理\",则\"单点登录系统标识\"只能选择\"不可用\"");
     return false;
  }
}

//点击新增按钮
button_insert_onclick = function(){ 
   if(validatePageLogic()==false){
      return;
    }
   if(treeEname==null || treeEname==""){
		if(efvalidateDiv("ef_region_result")&& !checkchinese(document.getElementById("result-0-treeEname").value,"result-0-treeEname") && !checkchinese(document.getElementById("result-0-nodeEname").value,"result-0-nodeEname")){
			var info = new EiInfo();
			info.set("portalId",portalId);
		    info.setByNode("ef_region_result"); 
		   	EiCommunicator.send( "EV1401", "insert" , info, menu_callback );
    	}
	}else{
		alert("请选择修改按钮!");
	}
} 
//点击修改按钮
button_update_onclick = function(){
    if(validatePageLogic()==false){
      return;
    }
	if(efvalidateDiv("ef_region_result")){
		var info = new EiInfo();
		info.set("portalId",portalId);
		info.setByNode("ef_region_result"); 
		EiCommunicator.send( "EV1401", "update" , info, menu_callback );
    }
}
//回调函数
var menu_callback = {
	onSuccess : function(eiInfo) {
		//efform_onload();
		alert(eiInfo.get("clew"));
		if(eiInfo.get("clew") == "操作成功!"){
			myrefresh();
		}
	},
	onFail : function(eMsg) {
		alert(eiInfo.get("clew"));	
	}
}	
function selectCity(){
	var province=document.getElementById("result-0-menuType");
	var options=province.options;
	var value="";
	for(var i=0;i<options.length;i++){
		if(options[i].selected){
		value=options[i].value;
		if(value=="0"){
			document.getElementById("result-0-menuUrl").readOnly=true;
			var htm="<img title='menu' src='"+efico.get("efform.efImgList")+"' onClick='openSelectMenu();'/>";
			var node=document.getElementById("img");
   			node.innerHTML=htm;
   			enptyMenuUrl(0);
   			crSsoSystemId(0);
   			menuUrlValueType = 0;
 
		}else if(value==1){
			document.getElementById("result-0-menuUrl").readOnly=false;
			var htm="";
			var node=document.getElementById("img");
   			node.innerHTML=htm;
   			enptyMenuUrl(1);
   			crSsoSystemId(1);
   			menuUrlValueType = 1;
		}else if(value==2){
			document.getElementById("result-0-menuUrl").readOnly=true;
			var htm="<img title='menu' src='"+efico.get("efform.efImgList")+"' onClick='openWindow();'/>";
			var node=document.getElementById("img");
   			node.innerHTML=htm;
   			enptyMenuUrl(2);
   			crSsoSystemId(2);
   			menuUrlValueType = 2;
		}
		}
	}
}

//在弹出grid中选择一个记录时触发的函数
function efgrid_onRowClicked( grid_id, row_index ){
	if("test_divwindowsubNode" == grid_id){
		grid = efgrid.getGridObject("test_divwindowsubNode");
		if(grid.getCellValue(row_index,2,TYPE_DATA)==null || grid.getCellValue(row_index,2,TYPE_DATA)==""){
			ef.get("result-0-menuUrl").value=" ";
		}else
			ef.get("result-0-menuUrl").value = grid.getCellValue(row_index,1,TYPE_FIX);
		efwindow.hide();
	}
}

//点击菜单地址后图标时触发函数
 function openSelectMenu(){
	var info = new EiInfo(); 
	  //创建div层窗口 宽度：350px  高度：240px
      var divWindow = efcascadeselect.createDivWindow( "test_divwindow", "efwindow","选择菜单url信息",350,240,"","关闭");      
      efwindow.show(ef.get("result-0-menuUrl"),"test_divwindow_ajax_loading","fixed");	
      EiCommunicator.send( "EV1401", "queryMenu", info, country_callback ,false,true );  
}

var divwindow;
//回调函数
country_callback = {
      onSuccess : function(eiInfo){ 
	  divwindow = document.getElementById("test_divwindow");
	  efwindow.hide();
   	  var style_config = new Object();
	  style_config["operationBar"] = "true";
	  var grid = new efgrid("result",divwindow.id+"subNode");
	  var custom_cols = {"index":{},"metas":[]};
	  grid.setEnable( false );
	  grid.setReadonly( true );
	  grid.setAjax( true );
	  grid.setAutoDraw( true );
	  grid.setServiceName( "EV1401" );
	  grid.setQueryMethod( "queryMenu" );
	  grid.setCustomColumns( custom_cols );
	  grid.setData( eiInfo );
	  
	  grid.setStyle( style_config );
	  for(i=grid.dataColumns.length;i>=1;i--){
	  	column = grid.getColumn( i-1, TYPE_DATA );
	  	column.set( "width", 300/grid.dataColumns.length);
	  } 
	  grid.paint();	
	  
	  efwindow.show(document.getElementById("result-0-menuUrl"),divwindow.id,"fixed");
                  },
      onFail    : function(eMsg){
                     alert("failure");
                  }
 }
//点击新弹出grid关闭时回调函数    
 efcascadeselect.ensure_onclick = function(){
 	grid = efgrid.getGridObject(divwindow.id+"subNode");
	efwindow.hide();
}
//刷新父页面，关闭当前页面
function myrefresh(){
	//window.parent.location.reload();
	window.returnValue='true';
	window.close(); 
}

//弹出窗口
openWindow = function(){
	if(userId == "anonymous"){
		var obj = window.showModalDialog("DispatchAction.do?efFormEname=EVCM0204","","edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:200px;dialogHeight:250px;");
		if(obj != undefined)
			document.getElementById("result-0-menuUrl").value=obj;
	}else{
		var obj = window.showModalDialog("DispatchAction.do?efFormEname=EVCM0203","","edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:200px;dialogHeight:250px;");
		if(obj != undefined)
			document.getElementById("result-0-menuUrl").value=obj;
	}
}

//如果是从用户自定义选择平台的或内容管理类的话menuUrl清空
enptyMenuUrl = function(size){
	if(menuUrlValueType != size){
		document.getElementById("result-0-menuUrl").value = " ";
	}
}
//选择单点登录select时候调用函数
selectSsoSystemId = function(){
	ssoSystemId_value = document.getElementById("result-0-ssoSystemId").value;
}
//判断单点登录的select
crSsoSystemId = function(size){
	document.getElementById("result-0-ssoSystemId").options.length = 0; 
	if(size == 1){
		document.getElementById("result-0-ssoSystemId").options.add(new Option("不使用"," "));
		for(var i=0;i<block_system.getRows().length;i++){
			document.getElementById("result-0-ssoSystemId").options.add(new Option(block_system.getCell(i, "systemName"),block_system.getCell(i, "systemId")));
		}
		document.getElementById("result-0-ssoSystemId").value = ssoSystemId_value;
	}else{
		document.getElementById("result-0-ssoSystemId").options.add(new Option("不使用"," "));
	}
	
}


//判断输入字符不能汉字以及一些特殊符号
function checkchinese(str,idName){ 
	var badChar ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
	badChar += "abcdefghijklmnopqrstuvwxyz"; 
	badChar += "0123456789"; 
	badChar += " "+"　";//半角与全角空格 
	badChar += "_";  
	for(var i=0;i<str.length;i++){ 
		var c = str.charAt(i);//字符串str中的字符
		if(badChar.indexOf(c) <= -1){ 
			document.getElementById(idName).select();
			alert("对不起,资源标签允许输入的字符包括：数字、英文字母(大小写均可)、和下划线(_)，并且中间可以包含空格。");
			return true; 
		} 
	}  
} 