button_query_onclick = function (){
/*
  var showValue=ef.get("showValue").checked ;
	if(showValue){
		showValue="1";
	}else{
		showValue="0";
	}
	*/
  var bgcolor=ef.get("inqu-0-bgcolor").value;
  var plotcolor=ef.get("inqu-0-plotcolor").value;
  var data=ef.get("inqu-0-data").value;
 // var userParam="bgcolor="+bgcolor+"&plotcolor="+plotcolor+"&showValues="+showValue+"&data="+data;
  var userParam="bgcolor="+bgcolor+"&plotcolor="+plotcolor+"&data="+data;
  ef.get("iframe1").src="DispatchAction.do?efFormEname=EV0106&portalId=0000000000000167&editFlag=true&evUserParam="+genUserParam(userParam);
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