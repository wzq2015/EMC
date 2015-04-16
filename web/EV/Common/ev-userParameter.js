var currentRow=$("<img id='currentRow' src=\"./EF/Images/efgrid_page_next.gif\"border='0' alt='当前行' valign='middle'/>");
var currentRowNum=0;
var editBtn={
    'background-color': '#ffe695',
	'font-size': '12px',
	'font-weight': 'Bold',
	'border-bottom': '1px solid #d0bb03',
	'border-right': '1px solid #d0bb03',
	'border-left': '1px solid #ffffff',
	'border-top': '1px solid #ffffff',
	'color': '#505050',
	'font-family': 'verdana, arial, helvetica, sans-serif',
	'text-align': 'center',
	'padding-bottom': '1px',
	'cursor':'hand'
}
function opendyp(info){
  $("#dynamicParamDiv").remove();
  var paramDiv=$("<div id='dynamicParamDiv' ></div>");
  var inner=$("<FIELDSET name='fileddset_group_query'"+
	"style='padding: 6px;  width: 100px; '><legend>"+
"&nbsp;<font style='color: #000000; font-family: 宋体,Tahoma, Arial;font-size:10pt;font-weight : bold 'size='2' id=query_title>个性参数</font>"+ 
"<a href='#' onClick=\"addDyParam()\">"+
"<img id='efQueryDynamic' src=\"./EF/Images/eview_maximize_hover.gif\"border='0' alt='添加动态参数'></a>"+
"&nbsp;&nbsp;<a href='#' onClick=\"delDyParam()\">"+
"<img id='efQueryDynamic' src=\"./EF/Images/eview_minimize_hover.gif\"border='0' alt='删除动态参数' valign='middle'></a>"+
"</legend><table id='dyParam_table'><tr><td></td><td nowrap width='15%'>参数名:</td><td nowrap width='25%'>参数值</td></tr></table>");
    var portletId=info.get("portletId");
    var portalId=info.get("portalId");
    var dynamicValue=info.get("dynamicValue");
    var offset=$("#"+portletId).offset();
    var top=offset.top+20;
    var left=offset.left+20;
    paramDiv.css("z_index","1000");
    paramDiv.css("position","absolute");
    paramDiv.css("top",top);
    paramDiv.css("left",left);
    paramDiv.css("background-color","#AAFFFF");
    paramDiv.height(100);
    paramDiv.width(100);
    inner.appendTo(paramDiv);
    paramDiv.appendTo(window.document.body);
    initDyParam(dynamicValue);
    
   var btnArea=$("<div></div>");
   btnArea.appendTo(paramDiv);
   //btnArea.css("float","left");
   
   var btn=$("<div></div");
   btn.text("完成");
   btn.css(editBtn);
   btn.width("50");
   btn.height("15");
   btn.appendTo(btnArea);
   btn.css("float","right");
   var paramUrl="";
   btn.click(function(){
      $("#dyParam_table tr").each(function(){
         //alert($(this).find("input").eq(0).val());
           var name=$(this).find("input[type='text']").eq(0).val();
           if(name!=undefined&&name.trim()!=''){
           var value=$(this).find("input[type='text']").eq(1).val();
           trParam=name+"="+value;
           paramUrl=paramUrl+trParam+"&";
           }
      });
     paramUrl=paramUrl.substr(0,paramUrl.length-1);
     
     var inInfo=new EiInfo();
     inInfo.set("portletId",portletId);
     inInfo.set("portalId",portalId);
	 inInfo.set("dynamicValue", paramUrl);
	 
	
	 EiCommunicator.send("EVPM03", "savedynamicValue", inInfo, null);

	if (ajaxEi != null) {
		alert("操作成功");
		paramDiv.hide();

	}
   });
   var cancel=btn.clone();
   cancel.text("取消");
   cancel.appendTo(btnArea);
   cancel.click(function(){
       paramDiv.hide();
   });
    
}
function initDyParam(dynamicValue){
    var params=dynamicValue.split("&");
    for(var i=0;i<params.length;i++){
       var param=params[i].split("=");
       addDyParam(param[0],param[1]);
    }
}
function addDyParam(name,value){
    if(name==undefined)
      name='';
    if(value==undefined)
      value='';
    var newRow=$("<tr><td></td><td nowrap width='15%'><input type='text' width='30px' value='"+name+"' />=</td><td nowrap width='15%'><input type='text' width='30px' value='"+value+"' /></td></tr>");
    newRow.appendTo("#dyParam_table");
    newRow.find("input").each(function(){$(this).focus(function(){
    currentRow.remove();
    currentRow.appendTo(newRow.children("td:eq(0)"));
    })
    });
    newRow.find("input").eq(0).focus();
    
}
function delDyParam(){
   var currentTR=currentRow.parents("tr");
   var nextTR=currentTR.next("tr");
   var prevTR=currentTR.prev("tr");
   if(currentTR.find("input").length>1){
      currentTR.remove();
      }
   if(nextTR.length>0){
       currentRow.remove();
       currentRow.appendTo(nextTR.children("td:eq(0)"));
   }else if(prevTR.length>0){
     currentRow.remove();
     currentRow.appendTo(prevTR.children("td:eq(0)"));
   }
}