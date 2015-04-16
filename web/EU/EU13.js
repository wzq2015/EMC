var isConnectOK = true;

button_compare_onclick = function () 
{
	//alert('compare！');
	//document.getElementById('serviceName').value = 'EU13';
	//document.getElementById('methodName').value = 'compareDB';
	//document.getElementById('efFormEname').value = 'EU13';
	//efform.submit(document.forms[0]);

	//efbutton.setButtonStatus("compare", true);
	
	var leftJdbcUrl = document.getElementById('leftJdbcUrl').value;
	var leftUsername = document.getElementById('leftUsername').value;
	var leftPassword = document.getElementById('leftPassword').value;
	var rightJdbcUrl = document.getElementById('rightJdbcUrl').value;
	var rightUsername = document.getElementById('rightUsername').value;
	var rightPassword = document.getElementById('rightPassword').value;
	connectDB('left',false);
	if(!isConnectOK){
		//连接失败直接返回
		return;
	}
	
	connectDB('right',false);
	if(!isConnectOK){
		//连接失败直接返回
		return;
	}
	
	//alert('start CompareDB');
	//if(false){

	var param = "&leftJdbcUrl="+leftJdbcUrl+"&leftUsername="+leftUsername+"&leftPassword="+leftPassword;
	param += "&rightJdbcUrl="+rightJdbcUrl+"&rightUsername="+rightUsername+"&rightPassword="+rightPassword;
	
	var url = "DispatchAction.do?efFormEname=EU13&serviceName=EU13&methodName=compareDB"+param;
	var winl = (screen.width - 700) / 2;
	var wint = (screen.height - 620) / 2;
	winprops = 'height=620,width=700,top='+wint+',left='+winl+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no'
	return window.open(url, '', winprops);
	//}
}
 
function connectDB(selectedSide,isAlertInfo){

	var selectedSideCN;
	if(selectedSide == 'left'){
		selectedSideCN = '左边';
	}else if(selectedSide == 'right'){
		selectedSideCN = '右边';
	}
	
	var ajax_callback = 
	{
		onSuccess : 
		 	function (eiInfo)
			{ 
				var isConnect = eiInfo.get('isConnect');
				
				
				if(isConnect){
					isConnectOK	= true;
					if(isAlertInfo){
						alert('连接'+selectedSideCN+'数据库成功！');
					}
				}else{
					isConnectOK	= false;
					alert('连接'+selectedSideCN+'数据库失败！');
				}

   			},
 			onFail: 
   			function(eMsg) 
			{
   				alert("服务调用失败: "+eMsg );
			}
	}; 	

	var jdbcUrl;var username;var password;

	if(selectedSide == 'left'){
		jdbcUrl = document.getElementById('leftJdbcUrl').value;
		username = document.getElementById('leftUsername').value;
		password = document.getElementById('leftPassword').value;
	}
	if(selectedSide == 'right'){
		jdbcUrl = document.getElementById('rightJdbcUrl').value;
		username = document.getElementById('rightUsername').value;
		password = document.getElementById('rightPassword').value;
	}

	var ei_info = new EiInfo();	
	ei_info.setByNameValue( "jdbcDriver", 'oracle.jdbc.driver.OracleDriver' );
	ei_info.setByNameValue( "jdbcUrl", jdbcUrl );
	ei_info.setByNameValue( "username",username );
	ei_info.setByNameValue( "password",password );
	
	EiCommunicator.send( "EU13", "testDBStatus" , ei_info, ajax_callback );

}