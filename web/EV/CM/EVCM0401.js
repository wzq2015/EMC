
efform_onload = function (){
	/*
	if(!document.getElementById("inqu_status-0-portletBorderFlag").checked){
		document.getElementsByName("inqu_status-0-portletBorderFlag")[1].checked=true;
	}
	if(!document.getElementById("inqu_status-0-portletImageFlag").checked){
		document.getElementsByName("inqu_status-0-portletImageFlag")[1].checked=true;
	}
	document.getElementById("inqu_status-0-portletDistance").value=15;
	*/
	var split = efsplitter("leftForm", "leftFormDiv", "middleSplitter");
    //split.catchEvent(window.mainFrame);
}
//点击新增按钮触发函数
button_save_onclick = function () 
{  
		if(efvalidateDiv("ef_region_inqu") && !checkchinese(document.getElementById("inqu_status-0-templateId").value)){
		//检查
	    titleFontSize = document.getElementById("inqu_status-0-fontSize").value;
		if(titleFontSize!=null&&titleFontSize > 20){
		  alert("\"字体大小\"过大,请设置1-20之间正整数!");
		  return false;
		}
		portletDistance = document.getElementById("inqu_status-0-portletDistance").value;
		if(portletDistance!=null&&portletDistance > 50){
		  alert("\"Portlet间距\"过大,请设置1-50之间正整数!");
		  return false;
		}
		var info = new EiInfo();
		   info.setByNode("ef_region_inqu"); 
		   EiCommunicator.send( "EVCM0401", "save" , info, template_callback);
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
	top1=100;//(screen.availHeight-200)/2 ;
	window.open("./EV/uploadjsp/filechoose.jsp?id="+id,"","left="+left1+",top="+top1+",height=300, width=300, toolbar=no, menubar=no, scrollbars=no,location=no, status=no,,resizable=yes,depend=yes");   
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
//关闭当前页 刷新父页
function myrefresh(){
	//window.opener.location.reload(); 
	window.close(); 
}

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
			document.getElementById("inqu_status-0-templateId").select();
			alert("对不起,资源标签允许输入的字符包括：数字、英文字母(大小写均可)、和下划线(_)，并且中间可以包含空格。");
			return true; 
		} 
	}  
} 