
//初始化页面
var portletId;
var block_system;
var ssoSystemId_value;
var portletSourceType;
var updateSize = 0;
var portletContentType;
var portletResourceType;


efform_onload = function (){
	ssoSystemId_value = document.getElementById("result-0-ssoSystemId").value;
	portletContentType = document.getElementById("result-0-portletContentType").value;
	portletResourceType = document.getElementById("result-0-portletResourceType").value;
	var info=_getEi();
	block_system = info.getBlock("result_system");
	portletId=document.getElementById("result-0-portletId").value;
	if(portletId!=null && portletId!=""){
		efbutton.setButtonStatus("insert", false);
		document.getElementById("result-0-portletId").readOnly=true;
	}else{
		efbutton.setButtonStatus("update", false);
	}
	portletSourceType = document.getElementById("result-0-portletSource").value;
	if(updateSize == 0){
		selectCity();
	}
	//初始个性参数
	if(!document.getElementById("result-0-charParameter").checked){
		document.getElementsByName("result-0-charParameter")[1].checked=true;
	}
	
}
//点击新增按钮
button_insert_onclick = function(){ 
	updateSize = 1;
	if(efvalidateDiv("ef_region_result")){
		var info = new EiInfo();
		   info.setByNode("ef_region_result"); 
		   if(!checkchinese(document.getElementById("result-0-portletId").value)){
		   EiCommunicator.send( "EVCM0201", "insert" , info, menu_callback );
		   }
    }
} 
//点击修改按钮
button_update_onclick = function(){
	updateSize = 1;
	if(efvalidateDiv("ef_region_result")){
		var info = new EiInfo();
		info.setByNode("ef_region_result"); 
		EiCommunicator.send( "EVCM0201", "update" , info, menu_callback );
    }
}
//回调函数
var menu_callback = {
	onSuccess : function(eiInfo) {
		//efform_onload();
		alert(eiInfo.get("clew"));
		if (!window.opener.closed) {
	    	window.opener.efform_onPopupReturn("EVCM02", "0");	
        }
		window.close();
	},
	onFail : function(eMsg) {
		alert(eiInfo.get("clew"));	
	}
}	
function selectCity(){
	var province=document.getElementById("result-0-portletSource"); 
	var options=province.options;
	var value="";
	for(var i=0;i<options.length;i++){
		if(options[i].selected){
		value=options[i].value;
		if(value=="0"){
			document.getElementById("result-0-portletUrl").readOnly=true;
			var htm="<img id='img_plat' title='来自平台' src='"+efico.get("efform.efImgList")+"' onClick='openSelectPortlet();'/>";
			var node=document.getElementById("img");
   			node.innerHTML=htm;
   			
   			crPortletContentType(0);
   			crSsoSystemId(0);
		}else if(value=="1"){
			document.getElementById("result-0-portletUrl").readOnly=false;					
			var htm="";
			var node=document.getElementById("img");
   			node.innerHTML=htm;
   			crPortletContentType(1);
   			crSsoSystemId(1);
		}else if(value==2){
			document.getElementById("result-0-portletUrl").readOnly=true;
			var htm="<img id='img_content' title='来自内容管理' src='"+efico.get("efform.efImgList")+"' onClick='openWindow();'/>";
			var node=document.getElementById("img");
   			node.innerHTML=htm;
   			
   			crPortletContentType(2);
   			crSsoSystemId(2);
		}
		}
	}
	enptyPortletUrl();
}

//在弹出grid中选择一个记录时触发的函数
function efgrid_onRowClicked( grid_id, row_index ){
	if("test_divwindowsubNode" == grid_id){
		grid = efgrid.getGridObject("test_divwindowsubNode");
		if(grid.getCellValue(row_index,2,TYPE_DATA)==null || grid.getCellValue(row_index,2,TYPE_DATA)==""){
			ef.get("result-0-portletUrl").value=" ";
		}else
			ef.get("result-0-portletUrl").value = grid.getCellValue(row_index,1,TYPE_FIX);
		efwindow.hide();
	}
}

//点击菜单地址后图标时出发函数
 function openSelectPortlet(){
	var info = new EiInfo(); 
      var divWindow = efcascadeselect.createDivWindow( "test_divwindow", "efwindow","选择Portleturl信息",800,270,"","关闭");      
      efwindow.show(ef.get("result-0-portletUrl"),"test_divwindow_ajax_loading");	
      EiCommunicator.send( "EVCM0201", "queryPortlet", info, country_callback ,false,true );  
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
	  grid.setServiceName( "EVCM0201" );
	  grid.setQueryMethod( "queryPortlet" );
	  grid.setCustomColumns( custom_cols );
	  grid.setData( eiInfo );
	  
	  grid.setStyle( style_config );
	  for(i=grid.dataColumns.length;i>=1;i--){
	  	column = grid.getColumn( i-1, TYPE_DATA );
	  	column.set( "width", 800/grid.dataColumns.length);
	  } 
	  grid.paint();	
	  
	  efwindow.show(document.getElementById("result-0-portletUrl"),divwindow.id,"fixed");
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
	window.close(); 
}

//删除节点
crPortletContentType =function(size){
	document.getElementById("result-0-portletContentType").options.length = 0;  
	document.getElementById("result-0-portletResourceType").options.length = 0;
 	if(size == 1){
 		document.getElementById("result-0-portletContentType").options.add(new Option("IFrame","1"));
 		document.getElementById("result-0-portletContentType").options.add(new Option("RSS","2"));
 		document.getElementById("result-0-portletContentType").options.add(new Option("DIV","3"));
 		//document.getElementById("result-0-portletContentType").options.add(new Option("内容接口","4"));
 		
 		document.getElementById("result-0-portletResourceType").options.add(new Option("匿名类","2"));
		document.getElementById("result-0-portletResourceType").options.add(new Option("公用类","0"));
		document.getElementById("result-0-portletResourceType").options.add(new Option("授权类","1"));
		document.getElementById("result-0-portletContentType").value = portletContentType;
		document.getElementById("result-0-portletResourceType").value = portletResourceType;
 	}else if(size == 0){
 		document.getElementById("result-0-portletContentType").options.add(new Option("IFrame","1"));
 		
 		document.getElementById("result-0-portletResourceType").options.add(new Option("公用类","0"));
		document.getElementById("result-0-portletResourceType").options.add(new Option("授权类","1"));
		if(portletResourceType != 2)
			document.getElementById("result-0-portletResourceType").value = portletResourceType;
 	}else{
 		document.getElementById("result-0-portletContentType").options.add(new Option("内容接口","4"));
 		
 		document.getElementById("result-0-portletResourceType").options.add(new Option("匿名类","2"));
		document.getElementById("result-0-portletResourceType").options.add(new Option("公用类","0"));
		document.getElementById("result-0-portletResourceType").options.add(new Option("授权类","1"));
		document.getElementById("result-0-portletResourceType").value = portletResourceType;
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
//弹出窗口
openWindow = function(){
	if(document.getElementById("result-0-portletResourceType").value.trim() == 2){
		var obj = window.showModalDialog("DispatchAction.do?efFormEname=EVCM0204","","edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:200px;dialogHeight:250px;");
	}else
		var obj = window.showModalDialog("DispatchAction.do?efFormEname=EVCM0203","","edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:200px;dialogHeight:250px;");
	if(obj != undefined && document.getElementById("result-0-portletResourceType").value == 2){
	//	if(obj.split("@")[0]== "column"){
			document.getElementById("result-0-portletUrl").value=obj;
	//	}
	}else if(obj != undefined){
		document.getElementById("result-0-portletUrl").value=obj;
	}
}

//选择单点登录标识select时候触发函数
selectSsoSystemId = function(){
	ssoSystemId_value = document.getElementById("result-0-ssoSystemId").value;
}

//判断Portlet来源是否转变若转变PortletUrl清空
enptyPortletUrl = function(){
	if(document.getElementById("result-0-portletSource").value != portletSourceType){
		document.getElementById("result-0-portletUrl").value = "";
		portletSourceType = document.getElementById("result-0-portletUrl").value;
	}
}

//选择portlet内容类型 和 Portlet资源类型select时触发函数
selectPortletType = function(){
	portletContentType = document.getElementById("result-0-portletContentType").value;
	portletResourceType = document.getElementById("result-0-portletResourceType").value;
}

//判断输入字符中有无汉字
/*
function checkchinese(str)
{
	var reg=/[\u4E00-\u9FA5]/g 
	if (reg.test(str)){
		alert("含有汉字");
		document.getElementById("result-0-portletId").focus();
		return false;
	} 
	else{
		alert("不含有汉字");
		return true;
	} 
}
*/
//判断输入字符不能汉字以及一些特殊符号
function checkchinese(str){ 
	var badChar ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
	badChar += "abcdefghijklmnopqrstuvwxyz"; 
	badChar += "0123456789"; 
	badChar += " "+"　";//半角与全角空格 
	badChar += "_"; 
	for(var i=0;i<str.length;i++){ 
		var c = str.charAt(i);//字符串str中的字符
		if(badChar.indexOf(c) <= -1){ 
			document.getElementById("result-0-portletId").select();
			alert("对不起,资源标签允许输入的字符包括：数字、英文字母(大小写均可)、和下划线(_)，并且中间可以包含空格。");
			return true; 
		} 
	}  
} 