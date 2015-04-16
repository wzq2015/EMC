efform_onload = function ()
{
  changeChartType();
}

button_query_onclick = function () {
/*	var chartType=ef.get("inqu-0-chartType").value;
	var data=ef.get("inqu-0-data").value;
	var showValue=ef.get("showValue").checked;
	var chartInfo=ef.get("chartInfo").value;
	var chartCats=ef.get("chartCats").value;
	var chartSeries=ef.get("chartSeries").value;
	var chartData=ef.get("chartData").value;
	if(showValue){
		showValue="1";
	}else{
		showValue="0";
	}
	var bgcolor=ef.get("inqu-0-bgcolor").value;
	var plotcolor=ef.get("inqu-0-plotcolor").value;
*/ 	
 	ef.get("chart").style.display="block";
 	ef.get("efFormEname").value = "EEDM7201";
 	ef.get("methodName").value = "getChartData";
 	document.forms[0].submit();
	//ef.get("chart").src="DispatchAction.do?efFormEname=EEDM7201&methodName=getChartData&chartInfo="+chartInfo+"&chartCats="+chartCats+"&chartSeries="+chartSeries+"&chartData="+chartData+"&chartType="+chartType+"&data="+data+"&showValues="+showValue+"&bgcolor="+bgcolor+"&plotcolor="+plotcolor;
}

function openSelectColor(flag) {
   var obj=window.showModalDialog("./EV/Common/Color.html","","edge:raised;scroll:1;status:0;help:0;resizable:0;dialogWidth:250px;dialogHeight:350px;");
   if(obj!=undefined){
	   if(flag==1){
			ef.get("bgcolor").value=obj.substr(1);
			ef.get("bgcolor").style.background=obj;
		}
		if(flag==2){
			ef.get("plotcolor").value=obj.substr(1);
			ef.get("plotcolor").style.background=obj;
		}
   }
}

/**
  *图形类别改变，数据类别联动
  *1、Bar3D\2D柱状堆栈图\3D柱状堆栈图\3D柱状线性混合图  不支持单系列
  *2、2D饼状图\3D饼状图 不支持多系列
*/
function changeChartType(){
	clearSelectType();
	var objOption0 = new Option("单系列数据","1"); 
	var objOption1 = new Option("多系列数据","2");
	var chartType=ef.get("chartType").value;
	if(chartType=="Bar3D"||chartType=="StackedColumn2D"||chartType=="StackedColumn3D"||chartType=="ColumnLine3D"){
		ef.get("data").options[0]=objOption1;
	}else if(chartType=="Pie2D"||chartType=="Pie3D"){
		ef.get("data").options[0]=objOption0;
	}else{
		ef.get("data").options[0]=objOption0;
		ef.get("data").options[1]=objOption1;
	}
}

clearSelectType = function()
{
  obj = document.getElementById("data"); 
  for(i=obj.options.length-1 ; i>= 0 ; i--)
     obj.options[i] = null;
}
