
//初始化页面
var portletId;
var block_system;
var type_size;
var ssoSystemId_value;
var id;
var tabSourceType;
var updateSize = 0;
var tabType;
efform_onload = function (){
	ssoSystemId_value = document.getElementById("result-0-ssoSystemId").value;
	tabType = document.getElementById("result-0-tabType").value;
	var info=_getEi();
	block_system = info.getBlock("result_system");
	portletId=document.getElementById("result-0-portletId").value;
	if(portletId!=null && portletId!=""){
		efbutton.setButtonStatus("insert", false);
		document.getElementById("result-0-tabId").readOnly=true;
		document.getElementById("result-0-portletId").readOnly=true;
		var node=document.getElementById("portletImg");
   		node.innerHTML=" ";
	}else{
		efbutton.setButtonStatus("update", false);
	}
	type_size = info.get("portletResourceType");
	tabSourceType = document.getElementById("result-0-tabSource").value;
	if(updateSize == 0){
		type_portletId();
	}
	
}
//点击新增按钮
button_insert_onclick = function(){ 
	updateSize = 1;
	if(efvalidateDiv("ef_region_result")){
		var info = new EiInfo();
		   info.setByNode("ef_region_result"); 
		   if(!checkchinese(document.getElementById("result-0-tabId").value,"result-0-tabId") && !checkchinese(document.getElementById("result-0-portletId").value,"result-0-portletId")){
		   	EiCommunicator.send( "EVCM0301", "insert" , info, menu_callback );
		   }
    }
} 
//点击修改按钮
button_update_onclick = function(){
	updateSize = 1;
	if(efvalidateDiv("ef_region_result")){
		var info = new EiInfo();
		info.setByNode("ef_region_result"); 
		EiCommunicator.send( "EVCM0301", "update" , info, menu_callback );
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
	var province=document.getElementById("result-0-tabSource");
	var options=province.options;
	var value="";
	for(var i=0;i<options.length;i++){
		if(options[i].selected){
		value=options[i].value;
		if(value=="1"){
			document.getElementById("result-0-tabUrl").readOnly=false;
			var htm="";
			var node=document.getElementById("img");
   			node.innerHTML=htm;
   			crPortletContentType(1);
 			crSsoSystemId(1);
		}else if(value=="0"){
			document.getElementById("result-0-tabUrl").readOnly=true;
   			var htm="<img id='img_plat' title='来自平台' src='"+efico.get("efform.efImgList")+"' onClick=\"openSelectPortlet('tabUrl');\"/>";
			var node=document.getElementById("img");
   			node.innerHTML=htm;
   			crPortletContentType(0);
 			crSsoSystemId(0);
		}else if(value==2){
			document.getElementById("result-0-tabUrl").readOnly=true;
			var htm="<img id='img_content' title='来自内容管理' src='"+efico.get("efform.efImgList")+"' onClick='openWindow();'/>";
			var node=document.getElementById("img");
   			node.innerHTML=htm;
   			crPortletContentType(2);
 			crSsoSystemId(2);
		}
		}
	}
	enptyTabUrl();
}

//在弹出grid中选择一个记录时触发的函数
function efgrid_onRowClicked( grid_id, row_index ){
	if("portletId" == id){
		grid = efgrid.getGridObject("test_divwindowsubNode");
			ef.get("result-0-portletId").value = grid.getCellValue(row_index,1,TYPE_FIX);
			type_size = grid.getCellValue(row_index,3,TYPE_DATA);
			type_portletId();
		efwindow.hide();
	}else{
		grid = efgrid.getGridObject("test_divwindowsubNode");
			ef.get("result-0-tabUrl").value = grid.getCellValue(row_index,1,TYPE_FIX);
		efwindow.hide();
	}
}
//点击菜单地址后图标时出发函数
 function openSelectPortlet(textId){
 	id = textId;
	var info = new EiInfo(); 
	var directoryName;
	var methodName;
	var idName;
	if(id == "portletId"){
	    directoryName = "Portlet标识";
		methodName = "quertyPortlet";
		idName = "result-0-portletId";
	}else if(id == "tabUrl"){
	    directoryName = "内容管理";
		methodName = "queryPortletTab";
		idName = "result-0-tabUrl";
	}
      var divWindow = efcascadeselect.createDivWindow( "test_divwindow", "efwindow",directoryName,350,270,"","关闭");  
      efwindow.show(ef.get(idName),"test_divwindow_ajax_loading");	
      EiCommunicator.send( "EVCM0301",methodName, info, country_callback ,false,true );  
}
var divwindow;
//回调函数
country_callback = {
      onSuccess : function(eiInfo){ 
	  var idName;
	  var methodName;
	  if(id == "portletId"){
		  idName = "result-0-portletId";
		  methodName = "quertyPortlet";
	  }else if(id == "tabUrl"){
		  idName = "result-0-tabUrl";
		  methodName = "queryPortletTab";
	  }
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
	  grid.setServiceName( "EVCM0301" );
	  grid.setQueryMethod( methodName );
	  grid.setCustomColumns( custom_cols );
	  grid.setData( eiInfo );
	  
	  grid.setStyle( style_config );
	  for(i=grid.dataColumns.length;i>=1;i--){
	  	column = grid.getColumn( i-1, TYPE_DATA );
	  	column.set( "width", 300/grid.dataColumns.length);
	  } 
	  grid.paint();	
	  efwindow.show(document.getElementById(idName),divwindow.id,"fixed");
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
		if (!window.opener.closed) {
	    	window.opener.efform_onPopupReturn("EVCM03", "0");	
        }
		window.close();
}

//删除节点
crPortletContentType =function(size){
	document.getElementById("result-0-tabType").options.length = 0;  
	//document.getElementById("result-0-portletResourceType").options.length = 0;
 	if(size == 1){
 		document.getElementById("result-0-tabType").options.add(new Option("IFrame","1"));
 		document.getElementById("result-0-tabType").options.add(new Option("RSS","2"));
 		document.getElementById("result-0-tabType").options.add(new Option("内容接口","4"));
 		document.getElementById("result-0-tabType").value = tabType;
 	}else if(size == 0){
 		document.getElementById("result-0-tabType").options.add(new Option("IFrame","1"));
 	}else{
 		document.getElementById("result-0-tabType").options.add(new Option("内容接口","4"));
 	}
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

openWindow = function(){
	if(type_size == 2){
		var obj = window.showModalDialog("DispatchAction.do?efFormEname=EVCM0204","","edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:200px;dialogHeight:250px;");
		if(obj != undefined /*&& obj.split("@")[0]== "column"*/){
			document.getElementById("result-0-tabUrl").value=obj;
		}
	}else{
		var obj = window.showModalDialog("DispatchAction.do?efFormEname=EVCM0203","","edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:200px;dialogHeight:250px;");
		if(obj != undefined)
			document.getElementById("result-0-tabUrl").value=obj;
	}
}

//判断Portlet标识是否为匿名类型
type_portletId = function(){
	if(type_size == 2){
		if(document.getElementById("result-0-tabSource").options.length == 3){
			document.getElementById("result-0-tabSource").remove(2);
		}
		selectCity();
	}else{
		if(document.getElementById("result-0-tabSource").options.length == 2){
			//document.getElementById("result-0-tabSource").remove(0);
			document.getElementById("result-0-tabSource").options.add(new Option("来自平台","0"));
		}
		selectCity();
	}
}

selectSsoSystemId = function(){
	ssoSystemId_value = document.getElementById("result-0-ssoSystemId").value;
}

//判断Portlet Tab来源是否转变若转变tabUrl清空
enptyTabUrl = function(){
	if(document.getElementById("result-0-tabSource").value != tabSourceType){
		document.getElementById("result-0-tabUrl").value = "";
		tabSourceType = document.getElementById("result-0-tabSource").value;
	}
}

//选择Tab内容类型select时触发函数
changeTabTabSelect = function(){
	tabType = document.getElementById("result-0-tabType").value;
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