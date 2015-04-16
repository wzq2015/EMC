
efform_onload = function ()
{
	//获取消息
	//mess = ef.getMsg();
	//if(mess!=null){
		//alert(mess);
	//}
	var efgrid;
}	


function checkForm(obj){
	var theTypeName = '';
	var theForm = null;
	var typeId = "";

	if('01' == obj.value){
		theTypeName = "留言";
		theForm = document.form1;	
		typeId = "01";	
	}else if('02' == obj.value){
		theTypeName = "咨询";
		theForm = document.form2;
		typeId = "02";
	}else if('03' == obj.value){
		theTypeName = "建议";
		theForm = document.form3;
		typeId = "03";
	}else{
		theTypeName = "投诉";
		theForm = document.form4;
		typeId = "04";
	}
	if(checkFields(theForm,theTypeName,typeId)){
		var inInfo = new EiInfo();
		inInfo.set("userName",theForm.userName.value);
		inInfo.set("phoneNo",theForm.phoneNo.value);
		inInfo.set("workUnit",theForm.workUnit.value);
		inInfo.set("jobTitle",theForm.jobTitle.value);
		inInfo.set("email",theForm.email.value);
		inInfo.set("message",theForm.message.value);
		inInfo.set("code",theForm.checkCode.value);
		inInfo.set("typeId",typeId);
		EiCommunicator.send( "ECMM01", "saveMessage" , inInfo , ajax_show_refresh);
	}else{
		return false;
	}
  
}

ajax_show_refresh = {
	onSuccess : function(eiInfo){
		alert(eiInfo.getMsg());
		var flag = eiInfo.get("flag");
		if(flag=="T"){  
			clear();
		}
	},
	onFail: function(eMsg){
		alert("failure");
	}
}
//清空留言信息
function clear(){	
	form1.userName.value="";
	form1.phoneNo.value="";
	form1.workUnit.value="";
	form1.jobTitle.value="";
	form1.email.value="";
	form1.message.value="";
	form1.checkCode.value="";
	
	form2.userName.value="";
	form2.phoneNo.value="";
	form2.workUnit.value="";
	form2.jobTitle.value="";
	form2.email.value="";
	form2.message.value="";
	form2.checkCode.value="";
	
	form3.userName.value="";
	form3.phoneNo.value="";
	form3.workUnit.value="";
	form3.jobTitle.value="";
	form3.email.value="";
	form3.message.value="";
	form3.checkCode.value="";
	
	form4.userName.value="";
	form4.phoneNo.value="";
	form4.workUnit.value="";
	form4.jobTitle.value="";
	form4.email.value="";
	form4.message.value="";
	form4.checkCode.value="";
}        

function checkFields(objForm,objType,obj){
	if(objForm.userName.value == ''){
		alert("请输入您的姓名！");
		objForm.userName.focus();
		return false;
	}
	//如果需要验证
	if(objForm.phoneNo.value == '' && objForm.email.value == ''){
		alert("电话或邮件至少要填写一项！");
		return false;
	}
	if(objForm.phoneNo.value != ''){
		var phoneNoCheck = new RegExp("^[0-9]*$");
		if (!phoneNoCheck.test(objForm.phoneNo.value)){
				alert("电话格式不正确!");
				objForm.phoneNo.focus();
				return false;
		}
	}
	
	if(objForm.email.value != ''){
		var CheckMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		if (!CheckMail.test(objForm.email.value)){
			alert("邮箱格式不正确!");
			objForm.email.focus();
			return false;
		}
	}	
	if(objForm.message.value == ''){
		var theMessage = "请输入您的" + objType + "内容！";
		alert(theMessage);
		objForm.message.focus();
		return false;
	}else{
		if(!checkCount(objForm.message, 500)){
			return false;
		}
	}
	if(objForm.checkCode.value == ''){
		alert("请输入验证码！");
		objForm.checkCode.focus();
		return false;
	}
	return true;
}

function checkCount(message, total){
	if (message.value.length > total) {
		message.value = message.value.substring(0,total);
		var alertMessage = "输入文字数不能超过" + total + "个字符！";
		alert(alertMessage);
		return false;
	}else{
		return true;
	}
}

$(document).ready(function(){
	$('#suggest_1').click(function(){
		$('#connect #suggest #zhixunjianyi .toggle1').hide();
		$('#one').show();
	});

	$('#suggest_2').click(function(){
		$('#connect #suggest #zhixunjianyi .toggle1').hide();
		$('#two').show();
	});

	$('#suggest_3').click(function(){
		$('#connect #suggest #zhixunjianyi .toggle1').hide();
		$('#three').show();
	});

	$('#suggest_4').click(function(){
		$('#connect #suggest #zhixunjianyi .toggle1').hide();
		$('#four').show();
	});


/****************************product_pic**********************/
	$('#suggest #connect_tab #suggest_1').click(function(){
		clear();
		$(this).css('backgroundImage','url(./EF/Images/suggest_tab_se.jpg)');
		$('#suggest #connect_tab #suggest_2').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
		$('#suggest #connect_tab #suggest_3').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
		$('#suggest #connect_tab #suggest_4').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
	});

	$('#suggest #connect_tab #suggest_2').click(function(){
		clear();
		$(this).css('backgroundImage','url(./EF/Images/suggest_tab_se.jpg)');
		$('#suggest #connect_tab #suggest_1').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
		$('#suggest #connect_tab #suggest_3').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
		$('#suggest #connect_tab #suggest_4').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
	});


	$('#suggest #connect_tab #suggest_3').click(function(){
		clear();
		$(this).css('backgroundImage','url(./EF/Images/suggest_tab_se.jpg)');
		$('#suggest #connect_tab #suggest_2').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
		$('#suggest #connect_tab #suggest_1').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
		$('#suggest #connect_tab #suggest_4').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
	});


	$('#suggest #connect_tab #suggest_4').click(function(){
		clear();
		$(this).css('backgroundImage','url(./EF/Images/suggest_tab_se.jpg)');
		$('#suggest #connect_tab #suggest_2').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
		$('#suggest #connect_tab #suggest_1').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
		$('#suggest #connect_tab #suggest_3').css('backgroundImage','url(./EF/Images/suggest_tab_bg.jpg)');
	});
})



