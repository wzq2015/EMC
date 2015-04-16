function showDIV(obj){
	if(obj.checked){
		document.getElementById("div").style.display="block";
	}else{
		document.getElementById("div").style.display="none";
	}	
}

//根据比例改变高度
changeH = function (obj){
		if(checkW()){
			var w = document.getElementById("hdWidth").value;
			var h = document.getElementById("hdHeight").value;
			var realHeight = Math.round((obj*h)/w);
			document.getElementById("txtHeight").value = realHeight;
		}
}

//根据比例改变宽度
changeW = function (obj){
		if(checkH()){
			var w = document.getElementById("hdWidth").value;
			var h = document.getElementById("hdHeight").value;
			var realWidth = Math.round((obj*w)/h);
			document.getElementById("txtWidth").value = realWidth;
		}
}
//验证缩略图宽
checkW = function (){
 	if(document.getElementById("chk").checked == true){

		var mm=/^\+?[1-9][0-9]*$/;  //正整数
		var width = document.getElementById("txtWidth").value;			

		if(!mm.test(width)){
			alert("宽度只能为非0正整数!");
			document.getElementById("txtWidth").focus();
			return false;
		}
		return true;
	}
	return false;
}
//验证缩略图高
checkH = function(){
 	if(document.getElementById("chk").checked == true){

		var mm=/^\+?[1-9][0-9]*$/;  //正整数
		var height = document.getElementById("txtHeight").value;
		
		if(!mm.test(height)){
			alert("高度只能为非0正整数!");
			document.getElementById("txtHeight").focus();
			return false;
		}
		return true;
	}
	return false;	
}

//创建缩略图
createImg = function (){ 

	var info = new EiInfo();
	var chk = document.getElementById("chk").checked;
	info.set("isChecked",chk);
	info.set("fileId",document.getElementById("hdFileId").value);		
	info.set("fileName",document.getElementById("hdFileName2").value);	
	
	
	info.set("filePath",document.getElementById("hdFilePath").value);
	info.set("uploadRelaPath",document.getElementById("hdUploadRelaPath1").value);	
	
	info.set("width",document.getElementById("txtWidth").value);
	info.set("height",document.getElementById("txtHeight").value);
	
	EiCommunicator.send( "ECDM01", "createImg" , info, ajax_callback_close );
}
ajax_callback_close = {
     onSuccess : function(eiInfo){
     	 if(eiInfo.get("isChecked")==true){
     	 	alert(eiInfo.getMsg());
      	 }
      	 var qt = document.getElementById("hdqt").value; //1：从ECDM0105页面跳转到ECDM0102页面 0：从ECDM0101页面跳转到ECDM0102页面
		 var type = document.getElementById("hdtype").value;

		 if(qt == '1'){
		 	if(window.parent!=null&&!window.parent.closed) {
		 		//调用ECDM0105(父类)的js方法
		 		if(type == '1'){
		 			var fileId = document.getElementById("hdFileId").value;
			 	   
			 	    var tf = eiInfo.get("isChecked");
			 		
			 		var path = document.getElementById("hdFilePath1").value;

			 		if(tf==true){ //缩略图选中
			 			var index = path.lastIndexOf("/");
			 			var str1 = path.substring(0,index)+ "/littleImage";
						var str2 = path.substring(index);
						fileId = str1 + str2;
			 		}else{
						fileId = path;
			 		}
			 		
					window.parent.efform_onPopupReturn1("ECDM0102",fileId);
		 		}else if(type == '0'){
		 			
		 			var fileName = document.getElementById("hdFileName").value;
		 			var pn = null;
		 			
		 			var filePath = document.getElementById("hdFilePath1").value;
		 			pn = filePath + '@'+ fileName;
		 				
		 			
		 			window.parent.efform_onPopupReturn1("ECDM0102",pn);
		 		}else{
		 			var filePath = document.getElementById("hdFilePath2").value;
					window.parent.efform_onPopupReturn1("ECDM0102",filePath);
		 		}
	        }
		 }else{
			window.parent.efform_onPopupReturn("ECDM0102", "0");
			window.close();	
		 }
		window.close();
     },
     onFail   : function(eMsg){
     	alert("ajax_callback_close() Error!");
     }
}