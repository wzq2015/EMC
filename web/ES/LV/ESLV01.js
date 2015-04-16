button_dosubmit_onclick = function() 
{
	var ajax_callback = 
	{
		onSuccess:
			function(eiInfo){},
  		onFail: 
    		function(eMsg) {
      			alert("failure："+eMsg);
   	 		}	
	}
	
	var ret = efvalidateDiv("ef_region_edit");
	if( !ret )
	  return;
	  
	var level =document.getElementById("level").value;

	//alert('level:'+level);
	var ei_info = new EiInfo();	
	
	if(level==''){
		level = 0;  //当输入为空时，默认设置为0值
	}
	ei_info.setByNameValue( "levelvalue", level );
	//请求保存操作，保存配置信息
 	EiCommunicator.send("ESLV01","save", ei_info, ajax_callback );
}
