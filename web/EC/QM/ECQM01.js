/**
 * 页面加载后的回调
 */
efform_onload = function()
{
	var isView=document.getElementById("isView").value;
	//alert(isView);
	if(isView=='true') setFalseButton();
}
function setFalseButton(){
  //efbutton.setButtonStatus("submit", false);
  //efbutton.setButtonStatus("viewresult", false);
	document.getElementById("submit").disabled = true;
	document.getElementById("viewresult").disabled = true;
}
//提交
button_submit_onclick = function(){ 
	//alert(validData_CheckBoxLimit());
	var qState = document.getElementById("q1-0-questionnaireState").value;//问卷状态
	if(!qState || qState=="0"){
		alert("问卷状态不可用!");
		return false;
	}
	if(validNullData()&&validData_CheckBoxLimit()){
		var info = new EiInfo();
		info.setByNode("ef_region_result");
		EiCommunicator.send( "ECQM01", "submit", info, button_submit_callback  );
	}
}
var button_submit_callback = {
		  onSuccess : 
		    function(eiInfo){  
			  if(eiInfo.getStatus() == "0"){
	    		  alert(eiInfo.getMsg());
	    		  window.close();
	    	  }else{
	    		  alert(eiInfo.getMsg());
	    	  }
		    },
		  onFail    : 
		    function(eMsg) {
		      alert("failure");
		    }
}
button_viewresult_onclick = function(){
	
	var id = document.getElementById("q1-0-questionnaireId").value;
	var param = "&inqu_status-0-questionnaireId="+id;
	//data:1单数据类型2多数据类型 showValues:1显示数字0不显示 
	param+="&chartType=Bar2D&data=1&showValues=1&bgcolor=&plotcolor=";
	window.open( "DispatchAction.do?efFormEname=ECQM03"+param,"问卷调查结果","top=0,left=0,menubar=no,width="+640+",height="+480+",scrollbars=yes,resizable=yes");
}

setRadioValue = function(rowid){
	document.getElementById("result-"+rowid+"-selectionId").value = getRadioValue("r3-"+rowid);
	//alert(document.getElementById("result-"+rowid+"-selectionId").value);
}
setCheckboxValue = function(rowid){
	document.getElementById("result-"+rowid+"-selectionId").value = getCheckboxValue("r3-"+rowid);
	//alert(document.getElementById("result-"+rowid+"-selectionId").value);
}
function getRadioValue(objName) 
{ 
	var obj=document.getElementsByName(objName) 
	for(i=0;i<obj.length;i++) {
		if(obj[i].checked) 
			return obj[i].value; 
	} 
} 
function getCheckboxValue(objName)
{
	var tmpVal = "";
	var obj=document.getElementsByName(objName) 
	for(i=0;i<obj.length;i++) {
		if(obj[i].checked) 
			tmpVal += ","+obj[i].value;
	} 
	return tmpVal.substr(1);
}


//校验checkbox限制
function validData_CheckBoxLimit(){
	var i = 0;
	while(true){
		var resultObj = document.getElementById("result-"+i+"-selectionId");
		if(!resultObj){
			break;
		}
		var limitType = document.getElementById("result-"+i+"-selectionLimitType").value;
		var limitValue = document.getElementById("result-"+i+"-selectionLimitValue").value;
		if(limitType==""){
			i++;
			continue;
		}
		var resultVals = resultObj.value.split(",");
		var resultSize =  resultObj.value==""?0:resultVals.length;
		if(limitType == "="){
			if(limitValue != resultSize){
				alert("问题"+(i+1)+"需要您选择"+limitValue+"个答案!");
				return false;
			}
		}
		if(limitType==">"){
			if(resultSize <=limitValue  ){
				alert("问题"+(i+1)+"需要您选择"+limitValue+"个以上的 答案!");
				return false;
			}
		}
		if(limitType==">="){
			if(resultSize <limitValue  ){
				alert("问题"+(i+1)+"需要您最少选择"+limitValue+"个答案!");
				return false;
			}
		}
		if(limitType=="<"){
			if(resultSize >=limitValue  ){
				alert("问题"+i+"需要您选择"+limitValue+"个以下的答案!");
				return false;
			}
		}
		if(limitType=="<="){
			if(resultSize >limitValue  ){
				alert("问题"+(i+1)+"需要您最多选择"+limitValue+"个答案!");
				return false;
			}
		}
		i++;
	}
	return true;
}

function validNullData(){
	var i = 0;
	while(true){
		var resultObj = document.getElementById("result-"+i+"-selectionId");
		if(!resultObj){
			break;
		}
		if(resultObj.value=="" || !resultObj.value){
			alert("请选择问题"+(i+1)+"的答案!");
			return false;
		}
		i++;
	}
	return true;
}



 