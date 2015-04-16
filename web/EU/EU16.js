button_query_onclick = function () 
{
	sendCommand();   
}

ajax_callback = {
		onSuccess : function(eiInfo) {	
			efform.fillDiv("ef_region_inqu",eiInfo);
			ef.get("result-0-output").scrollTop = ef.get("result-0-output").scrollHeight;					
		},
		onFail : function(eMsg) {
			alert("failure");
		}
	}

function sendCommand()
{
        	if (efvalidateForm(ef.get("EU16"))) 
    		{
      			var info = new EiInfo();		
				info.setByNode("ef_region_inqu");	
				info.setByNode("ef_region_connect");
				EiCommunicator.send( "EU16", "query" , info, ajax_callback );
   			 }     
}


function onPressEnter()
{  	
        var key = event.keyCode;             
        if (key == 13)
        {
        	sendCommand();        	        	
     	}
     	
     	ef.get("result-0-output").scrollTop = ef.get("result-0-output").scrollHeight;
}

function SelectCallBack(rows)
{
	if(rows.length >0)
	{
		ef.get("connect-0-hostname").value = rows[0].hostname;
		ef.get("connect-0-username").value = rows[0].username;
		ef.get("connect-0-password").value = rows[0].password;
	}
}

function SelectCommandCallBack(rows)
{
	if(rows.length >0)
	{		
		ef.get("inqu_status-0-command").value = rows[0].commanddesc;
	}
}


function openSubGrid()
{
  
  //var inInfo = new EiInfo();
  //打开主机列表 
  var childW = efform.openNewForm('EU18');
  childW.focus();
  
}

function openCommandList()
{
  //打开命令列表  
  var childW = efform.openNewForm('EU19');
  childW.focus();
}

