var portalId;


efform_onload = function() {
	
    var info = _getEi();
	portalId=info.get("portalId");
	selection(info);
	selectionTab(info);
}

selection = function(info) {

	var toselect = ef.get("inputSelPor");
	var selectedBlock = info.getBlock("result");

	var selected = ef.get("outputSelPor");

	for(i=0;i<selectedBlock.rows.length;i++){
		var selectRow = selectedBlock.getCell(i,"selected");
		if(selectRow!=null&&selectRow=="true")
		{
		    var option = new Option(selectedBlock.getCell(i,"portletName"),	selectedBlock.getCell(i,"portletId"));
		    option.onclick = function() {  };
		    option.sort=i;
			selected.options.add(option);
		}
		else 
		{
			var option = new Option(selectedBlock.getCell(i,"portletName"), selectedBlock.getCell(i,"portletId"));
		    option.onclick = function() {  };
		    option.sort=i;
			toselect.options.add(option);
		}
	}
	
}

selectionTab = function(info) {

	var toselect = ef.get("inputSelTab");
	var selectedBlock = info.getBlock("result_t");

	var selected = ef.get("outputSelTab");

	for(i=0;i<selectedBlock.rows.length;i++){
		var selectRow = selectedBlock.getCell(i,"selected");
		if(selectRow!=null&&selectRow=="true")
		{
		    var option = new Option(selectedBlock.getCell(i,"tabName"),selectedBlock.getCell(i,"tabId"));
		    option.portletId= selectedBlock.getCell(i,"portletId");
			selected.options.add(option);
		}
		else 
		{
		    var option = new Option(selectedBlock.getCell(i,"tabName"),selectedBlock.getCell(i,"tabId"));
		    option.portletId= selectedBlock.getCell(i,"portletId");
			toselect.options.add(option);
		}
	
	}

}

//portlet->
function rightMovePortlet(){   

    var source = document.getElementById("inputSelPor");   
    var obj = document.getElementById("outputSelPor");   
       
    var values = pubMove(source,obj);
    check(values);
}   


//portlet<-
function leftMovePortlet(){ 

   	var obj = document.getElementById("inputSelPor");   
    var source = document.getElementById("outputSelPor");   
       
    var values = pubMove(source,obj);
    sortOption("inputSelPor");
    
    uncheck(values);
}  

//tab->
function rightMoveTab(){   

    var source = document.getElementById("inputSelTab");   
    var obj = document.getElementById("outputSelTab");   
       
    pubMove(source,obj);
     
}  
//tab<-
function leftMoveTab(){ 

   	var obj = document.getElementById("inputSelTab");   
    var source = document.getElementById("outputSelTab");   
       
    pubMove(source,obj);
     
}  

function pubMove(source,obj){
var brand_options = source.options;   
    var s = obj.options.length;  
    var values = ""; 
    for(var i=0;i<brand_options.length;i++){   
        var is_selected = brand_options[i].selected;   
        if(is_selected){   
             var option  = new Option(brand_options[i].text  ,brand_options[i].value); 
             option.portletId = brand_options[i].portletId; 
             option.sort = brand_options[i].sort; 
             if(!contains(obj,option)){
                obj.options[s++] = option; 
                values += option.value + ",";   
            }
             brand_options.remove(i--);
        }
    }
    
    if(values.length > 0)
       values = values.substring(0,values.length-1);
    
    return values;
   
}


//判断重复添加
function  contains(obj_sel,option){
    
    var options = obj_sel.options;   
    for(var i=0;i<options.length;i++){   
        if(options[i].value == option.value){   
            return true;   
        }   
    }   
       
    return false;   
}  

function save(){ 
	savePortlet();
	saveTab();
	//刷新
	//parent.window.location.reload();
}

function savePortlet(){ 

	var selectPorValue = ef.get("outputSelPor");
	
	if(selectPorValue.options.length >30){
	//	如果选择行数超过30则提示无法保存
		alert("Portlet不能选择超过30个!");
	}
	else {
		if (selectPorValue.options.length == 0) {
			alert("未选择任何Portlet，将恢复默认设置!");
		}
		if(typeof( portalId )=="null"){
			alert("没有门户标识不允许操作！");
			return;
		}

		var portletId_checked = "";
		for( var i=0; i< selectPorValue.options.length;i++ ){

       		var portletId = selectPorValue[i].value;
       		portletId_checked = portletId_checked + portletId + ',';  	  	
		}
		var inInfo = new EiInfo();
		inInfo.set("portletId_checked", portletId_checked);
		inInfo.set("portalId", portalId);
		EiCommunicator.send("EV12", "save", inInfo,null);
	}
	
}

function saveTab(){ 

var selectTabValue = ef.get("outputSelTab");
	if(portalId=="null"){
			alert("没有门户标识不允许操作！");
			return;
		}
	
	var tabId_checked = "";
	for( var i=0; i< selectTabValue.options.length;i++ ){
		
      		var tabId = selectTabValue[i].value;
      		tabId_checked = tabId_checked + tabId + ',';  	  	
	}
	var inInfo = new EiInfo();
	inInfo.set("tabId_checked", tabId_checked);
	inInfo.set("portalId", portalId);
	EiCommunicator.send("EV13", "save", inInfo,save_callback);

}

var save_callback = {
	onSuccess : function(eiInfo) {
		alert("修改成功!");
		closeAndRefresh();
	},
	onFail : function(eMsg) {
		alert("failure");
		closeAndRefresh();
	}
}
function closeAndRefresh(){
		//刷新
		var portal;
		try{
			portal = window.parent.document.getElementsByName("portal")[0];
		}catch(e){
		}
		if(portal!=null){
			var portalId = parent.document.getElementById("portalId").value;
			var pageNum = parent.document.getElementById("pageNum").value;
			var themaPath=parent.document.getElementById("themaPath").value;
			portal.src="DispatchAction.do?efFormEname=EV0105&portalId="+portalId+"&pageNum="+pageNum+"&themaPath="+themaPath;
		}
		parent.hideMask();
		
		//关闭
		var objDiv = parent.document.getElementById("portletDiv");
		if(objDiv!=null){
			$(objDiv).remove();
		}
}

function check(values){
	var selectedBox = ef.get("outputSelPor");
  	
		var inInfo = new EiInfo();
		inInfo.set("checked", values);
		inInfo.set("portalId", portalId);
	EiCommunicator.send("EV12", "initLoad_tab", inInfo,null);
	
	if (ajaxEi != null) {
		selectionTab(ajaxEi);
	    }
}

function uncheck(values){

	if(values == null || values == "")
	return;
	
	var array = values.split(",");
	var selectedBox = document.getElementById("inputSelTab");
	var options = selectedBox.options;
		for( var i=0; i< options.length;i++ ){

       		var portletId = options[i].portletId;
       		if(arrayContain(array, portletId))
       		options.remove(i--);
		}
	
	selectedBox = document.getElementById("outputSelTab");
		options = selectedBox.options;
		for( var i=0; i< options.length;i++ ){

       		var portletId = options[i].portletId;
       		if(arrayContain(array, portletId))
       		options.remove(i--);
		}
	
	
}

function arrayContain(array, str) {

	for(var i =0; i< array.length; i++)
	{
		if(array[i] == str)
		return true;
	}
	return false;
}

//高亮显示所属tab
function highlightTab(obj)   
{
	var brand_options = obj.options;   
    var values = ""; 
    for(var i=0;i<brand_options.length;i++){   
        var is_selected = brand_options[i].selected;   
        if(is_selected){   
                values += brand_options[i].value + ",";   
            }
        }
    if(values.length > 0)
       values = values.substring(0,values.length-1);
    

	var array = values.split(",");
	var selectedBox = document.getElementById("inputSelTab");
	var options = selectedBox.options;
		for( var i=0; i< options.length;i++ ){

       		var portletId = options[i].portletId;
       		if(arrayContain(array, portletId))
       			options[i].selected = true;
       		else 
       			options[i].selected = false;
		}
	
	selectedBox = document.getElementById("outputSelTab");
	var options = selectedBox.options;
		for( var i=0; i< options.length;i++ ){

       		var portletId = options[i].portletId;
       		if(arrayContain(array, portletId))
       			options[i].selected = true;
       		else 
       			options[i].selected = false;
		}
}


function tempOP() {
var _value;
var _text;
var _sort;
}

function sortRule(a,b) {
 var x = a._sort;
 var y = b._sort;
 if(x>y)return 1;
 else return -1;
}

function sortOption(id){

 var obj = document.getElementById(id);
 var tmp = new Array();
 for(var i=0;i<obj.options.length;i++){
  var ops = new tempOP();
  ops._value = obj.options[i].value;
  ops._text = obj.options[i].text;
  ops._sort = obj.options[i].sort;
  tmp.push(ops);
 }
 tmp.sort(sortRule);
 for(var j=0;j<tmp.length;j++){
  obj.options[j].value = tmp[j]._value;
  obj.options[j].text = tmp[j]._text;
  obj.options[j].sort = tmp[j]._sort;
 }
}

