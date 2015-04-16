efform_onload = function ()
{
  changeChartType();
}

clearSelectType = function()
{
  obj = document.getElementById("inqu-0-data"); 
  for(i=obj.options.length-1 ; i>= 0 ; i--)
     obj.options[i] = null;
}

/**
  * 图形类别改变，数据类别联动
  * 饼图不支持多数据
*/
function changeChartType(){
	clearSelectType();
	var objOption0 = new Option("单系列数据","1"); 
	var objOption1 = new Option("多系列数据","2");
	var chartType=ef.get("inqu-0-chartType").value;
	if(chartType=="PieChart"){
		ef.get("inqu-0-data").options[0]=objOption0;
	}else{
		ef.get("inqu-0-data").options[0]=objOption0;
		ef.get("inqu-0-data").options[1]=objOption1;
	}
}

button_query_onclick = function () {
	var chartType=ef.get("inqu-0-chartType").value;
	var data=ef.get("inqu-0-data").value;
	var bgcolor=ef.get("inqu-0-bgcolor").value;
	var plotcolor=ef.get("inqu-0-plotcolor").value;
	var showValue=ef.get("showValue").checked;
	if(showValue){
		showValue="1";
	}else{
		showValue="0";
	}
 	
 	ef.get("chart").style.display="block";
	ef.get("chart").src="DispatchAction.do?efFormEname=EEDM7101&chartType="+chartType+"&showValues="+showValue+"&data="+data+"&bgcolor="+bgcolor+"&plotcolor="+plotcolor;
}

function openSelectColor(flag) {
   var obj=window.showModalDialog("./EV/Common/Color.html","","edge:raised;scroll:1;status:0;help:0;resizable:0;dialogWidth:250px;dialogHeight:350px;");
   if(obj!=undefined){
	   if(flag==1){
			ef.get("inqu-0-bgcolor").value=obj.substr(1);
			ef.get("inqu-0-bgcolor").style.background=obj;
		}
		if(flag==2){
			ef.get("inqu-0-plotcolor").value=obj.substr(1);
			ef.get("inqu-0-plotcolor").style.background=obj;
		}
   }
}
