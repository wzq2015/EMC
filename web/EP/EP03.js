efform_onload = function ()
{
	efregion.show("ef_region_app");
	efregion.show("ef_region_db");
	//efregion.show("ef_region_epassdb");
	efregion.show("ef_region_session");
	efregion.show("ef_region_window");
	
	//var ef_region_buttonbar = new efbuttonbar();
	//ef_region_buttonbar.paint("ef_region_iplat");
  
    getInfo();
	getWindowInfo();
}	

button_refresh_onclick = function() {

	getVMInfo();
	getWindowInfo();
}


function getInfo () 
{
	var ajax_callback = 
	{
		onSuccess : 
    		function(eiInfo)
			{
				var node = ef.get("dbName");
				var value = eiInfo.get("dbName");
				node.innerText = value;
				
				node = ef.get("dbUrl");
				value = eiInfo.get("dbUrl");
				node.innerText = value;

				node = ef.get("dbUserName");
				value = eiInfo.get("dbUserName");
				node.innerText = value;

				/*
				//epass db
				node = ef.get("epassDbName");
				var value = eiInfo.get("epassDbName");
				node.innerText = value;
				
				node = ef.get("epassDbUrl");
				value = eiInfo.get("epassDbUrl");
				node.innerText = value;

				node = ef.get("epassDbUserName");
				value = eiInfo.get("epassDbUserName");
				node.innerText = value;
				//epass db  
				*/
				
				node = ef.get("freeMemory");
				value = eiInfo.get("freeMemory");
				node.innerText = value;

				node = ef.get("totalMemory");
				value = eiInfo.get("totalMemory");
				node.innerText = value;

				node = ef.get("serverVersion");
				value = eiInfo.get("serverVersion");
				node.innerText = value;
				
				getLicenseInfo(eiInfo.getBlock("license"));
    		},
  		onFail: 
    		function(eMsg) 
			{
     			alert(eMsg);
    			
			}
	}; 	
	var eiInfo = new EiInfo();	

	EiCommunicator.send( "EP03", "getInfo" , eiInfo, ajax_callback, false );
}

function getVMInfo () 
{
	var ajax_callback = 
	{
		onSuccess : 
    		function(eiInfo)
			{
				var node = ef.get("freeMemory");
				var value = eiInfo.get("freeMemory");
				node.innerText = value;

				node = ef.get("totalMemory");
				value = eiInfo.get("totalMemory");
				node.innerText = value;
    		},
  		onFail: 
    		function(eMsg) 
			{
     			alert(eMsg);
    			
			}
	}; 	
	var eiInfo = new EiInfo();	

	EiCommunicator.send( "EP03", "getVMInfo" , eiInfo, ajax_callback, false );
}


button_getbean_onclick = function() {

	getBeanInfo();
}

function getBeanInfo () 
{
	var beanName = ef.get("EP03beanName").value;
	if(beanName == null || beanName == "") {
		alert("请输入bean名称");
		return;
	}
	
	if(beanName == "session") {
		ef.toggleDivDisplay('ef_region_session');
		return;
	}
	
	if(beanName == "window") {
		ef.toggleDivDisplay('ef_region_window');
		//getWindowInfo();
		return;
	}

	var ajax_callback = 
	{
		onSuccess : 
    		function(eiInfo)
			{
				var node = ef.get("classInfo");
				var value = eiInfo.get("EP03classInfo");
				node.innerText = value;

				var node = ef.get("defineFlag");
				var value = eiInfo.get("EP03defineFlag");
				node.innerText = value;

				node = ef.get("beanInfo");
				value = eiInfo.get("EP03beanInfo");
				node.innerText = value;
    		},
  		onFail: 
    		function(eMsg) 
			{
     			alert(eMsg);
    			
			}
	}; 	
	var eiInfo = new EiInfo();	
	eiInfo.set("EP03beanName",beanName);

	EiCommunicator.send( "EP03", "getBean" , eiInfo, ajax_callback, false );
}

button_getclass_onclick = function() {

	getClassInfo();
}

function getClassInfo () 
{
	var className = ef.get("EP03className").value;
	if(className == null || className == "") {
		alert("请输入class名称");
		return;
	}
	
	var ajax_callback = 
	{
		onSuccess : 
    		function(eiInfo)
			{
				var node = ef.get("codeSource");
				var value = eiInfo.get("EP03codeSource");
				node.innerText = value;
    		},
  		onFail: 
    		function(eMsg) 
			{
     			alert(eMsg);
    			
			}
	}; 	
	var eiInfo = new EiInfo();	
	eiInfo.set("EP03className",className);

	EiCommunicator.send( "EP03", "getCodeSource" , eiInfo, ajax_callback, false );
}

function getWindowInfo()
{
	var s ="网页可见区域宽："+ document.body.clientWidth;
		s += "<br>网页可见区域高：" + document.body.clientHeight;
		s += "<br>网页可见区域宽：" + document.body.offsetWidth +" (包括边线的宽)";
		s += "<br>网页可见区域高：" + document.body.offsetHeight +" (包括边线的宽)";
		s += "<br>网页正文全文宽：" + document.body.scrollWidth;
		s += "<br>网页正文全文高：" + document.body.scrollHeight;
		s += "<br>网页被卷去的高：" + document.body.scrollTop;
		s += "<br>网页被卷去的左：" + document.body.scrollLeft;
		s += "<br>网页正文部分上：" + window.screenTop;
		s += "<br>网页正文部分左：" + window.screenLeft;
		s += "<br>屏幕分辨率的宽：" + window.screen.width;
		s += "<br>屏幕分辨率的高：" + window.screen.height;
		s += "<br>屏幕可用工作区宽度：" + window.screen.availWidth;
		s += "<br>屏幕可用工作区高度：" + window.screen.availHeight;
		ef.get('windowInfo').innerHTML = s;
}

function getLicenseInfo(eiBlock)
{
	var s = "是否合法: " + eiBlock.get("valid");
	s += "<br>" + eiBlock.get("allInfo");
	/*
	for(var row in eiBlock.rows)
	{
		s += "<br>" + row[0] + "\t" + row[1] + "\t" + row[2] + ": " + row[3];
	}
	*/
	ef.get('licenseInfo').innerHTML = s;
}

