efform_onload = function (){
	if(!document.getElementById("result-0-portletBorderFlag").checked){
		document.getElementsByName("result-0-portletBorderFlag")[1].checked=true;
	}
	if(!document.getElementById("result-0-portletImageFlag").checked){
		document.getElementsByName("result-0-portletImageFlag")[1].checked=true;
	}
}
//点击修改按钮时触发函数
button_update_onclick = function () 
{
   if(efvalidateDiv("ef_region_inqu")){
   		//alert(document.getElementById("result-0-bgcolor").value);
   		if(document.getElementById("result-0-bgcolor").value == ""){
   			document.getElementById("result-0-bgcolor").value = " ";
   		}
   		if(document.getElementById("result-0-fontColor").value == ""){	
   			document.getElementById("result-0-fontColor").value = " ";
   		}
   		if(document.getElementById("result-0-fontSize").value == ""){
   			document.getElementById("result-0-fontSize").value = " ";
   		}
   		if(document.getElementById("result-0-portletColor").value == ""){
   			document.getElementById("result-0-portletColor").value = " ";
   		}
   		if(document.getElementById("result-0-templateStyleurl").value == ""){
   			document.getElementById("result-0-templateStyleurl").value = " ";
   		}
   		
   		titleFontSize = document.getElementById("result-0-fontSize").value;
		if(titleFontSize!=null&&titleFontSize > 20){
		  alert("\"字体大小\"过大,请设置1-20之间正整数!");
		  return false;
		}
		portletDistance = document.getElementById("result-0-portletDistance").value;
		if(portletDistance!=null&&portletDistance > 50){
		  alert("\"Portlet间距\"过大,请设置1-50之间正整数!");
		  return false;
		}
		var info = new EiInfo();
		info.setByNode("ef_region_inqu"); 
		EiCommunicator.send( "EVCM0402", "update" , info, template_callback);
	}	
}

var color_size;
/*
弹出颜色编辑器窗口
*/
function openSelectColor(id) {
   var obj=window.showModalDialog("./EV/Common/Color.html","","edge:raised;scroll:1;status:0;help:0;resizable:0;dialogWidth:250px;dialogHeight:250px;");
   		if(obj!=undefined){
			document.getElementById(id).value=obj;
   			color_size=obj;
   			document.getElementById(id).style.background=obj;
   		}
}

openUpload = function(id){
    left1=(screen.availWidth-400)/2 ;
	top1=100;
	window.open("./EV/uploadjsp/filechoose.jsp?id="+id,"","left="+left1+",top="+top1+",height=300, width=300, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");      
}

uploadSuc = function (value,id){
	document.getElementById(id).value=value;
}

//回调函数
var template_callback = {
	onSuccess : function(eiInfo) {
		alert(eiInfo.get("clew"));
		if(eiInfo.status!=-1){
		if (!window.opener.closed) {
	    	window.opener.efform_onPopupReturn("EVCM04", "0");	
        }
          window.close();
		}
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}
