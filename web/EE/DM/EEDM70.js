efform_onload = function ()
{
  changeChartType();
}

button_query_onclick = function () {
	var chartType=ef.get("inqu-0-chartType").value;
	var data=ef.get("inqu-0-data").value;
	var showValue=ef.get("showValue").checked;
	if(showValue){
		showValue="1";
	}else{
		showValue="0";
	}
	var bgcolor=ef.get("inqu-0-bgcolor").value;
	var plotcolor=ef.get("inqu-0-plotcolor").value;
 	
 	ef.get("chart").style.display="block";
	ef.get("chart").src="DispatchAction.do?efFormEname=EEDM7001&chartType="+chartType+"&data="+data+"&showValues="+showValue+"&bgcolor="+bgcolor+"&plotcolor="+plotcolor;
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

/**
  *图形类别改变，数据类别联动
  *1、Bar3D\2D柱状堆栈图\3D柱状堆栈图\3D柱状线性混合图  不支持单系列
  *2、2D饼状图\3D饼状图 不支持多系列
*/
function changeChartType(){
	clearSelectType();
	var objOption0 = new Option("单系列数据","1"); 
	var objOption1 = new Option("多系列数据","2");
	var chartType=ef.get("inqu-0-chartType").value;
	if(chartType=="Bar3D"||chartType=="StackedColumn2D"||chartType=="StackedColumn3D"||chartType=="ColumnLine3D"){
		ef.get("inqu-0-data").options[0]=objOption1;
	}else if(chartType=="Pie2D"||chartType=="Pie3D"){
		ef.get("inqu-0-data").options[0]=objOption0;
	}else{
		ef.get("inqu-0-data").options[0]=objOption0;
		ef.get("inqu-0-data").options[1]=objOption1;
	}
}

clearSelectType = function()
{
  obj = document.getElementById("inqu-0-data"); 
  for(i=obj.options.length-1 ; i>= 0 ; i--)
     obj.options[i] = null;
}
