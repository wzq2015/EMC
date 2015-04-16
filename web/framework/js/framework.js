function doShow(divname)
{
	var o_div = document.getElementById(divname);
	if(o_div == null){
		o_div = top.document.getElementById(divname);
	}
	if(o_div){
		if(o_div.style.display!="none"){
			o_div.style.display="none";
		}else{
			o_div.style.display="block";
		}
	}
}
 
function doSubmit(url){
	if(url){
		document.forms[0].action = url;
	}
	document.forms[0].submit();
}
function doPage(str, no){
	var o = document.getElementById(str);
	o.value = no;
	doSubmit();
}

function doAdd(url){
	doOpenAction(url);
}
function doView(url){
	doOpenAction(url);
}
function doEdit(url){
	doOpenAction(url);
}

function doDelete(url){
	if(confirm("确认删除数据吗?")){
		doOpenAction(url);
	}
}

function doSave(url){
	if(confirm("确认保存数据吗?")){
		doOpenAction(url);
	}
}


function doSort(orderstr,str){
	var o = document.getElementById(orderstr);
	if(o.value.indexOf("DESC") < 0){
		o.value = str + " DESC";
	}else{
		o.value = str;
	}
	doSubmit();
}
function doOpenAction(url) {
	if (url) {
		var o_div = document.getElementById("RgnDetail");
		if(o_div.style.display=="none"){
			doShow("RgnList");
		}
		o_div.style.display="block";
		var ifr = document.getElementById("iframe-detail");
		var win = ifr.contentWindow || ifr.window;
		if (win)
			win.location = url;
		else 
			window.open(url, "iframe-detail");
  }
}


function doCheck(checkid)
{
  var a = document.getElementsByName(checkid);
  var n = a.length;
  for (var i=0; i<n; i++)
  a[i].checked = window.event.srcElement.checked;
}

function batch( URL, checkid, str){
	var checkstr = getBatchstr(checkid);
	if(checkstr){
		if(confirm("")){
			doPostAction(URL + checkstr);
		}
	}else{
		alert("");
	}
}


function getCheckStr(str)
{
  var result = '';
  var a = document.getElementsByName(str);
  var n = a.length;
  var keyName = '';
  var keyValue = '';
  for (var i=0; i<n; i++){
	if(a[i].checked){
		var strAry = new Array();
		strAry = a[i].value.split('&');
		keyName = strAry[0];
		keyValue = keyValue + strAry[1].substring(strAry[1].indexOf('=')+1,strAry[1].length) + ","; 
	}
  }
  if(keyValue!=''){
	result = keyName + "&keyValue=" + keyValue.substring(0,keyValue.length-1);
  }
  return result;
}

function getNestCheckStr(str)
{
  var result = '';
  var a = document.getElementsByName(str);
  var n = a.length;
  var keyName = '';
  var keyValue = '';
  for (var i=0; i<n; i++){
	if(a[i].checked){
		var strAry = new Array();
		strAry = a[i].value.split('&');
		keyName = strAry[0];
		keyValue = keyValue + strAry[1].substring(strAry[1].indexOf('=')+1,strAry[1].length) + ","; 
	}
  }
  result = keyValue.substring(0,keyValue.length-1);
  return result;
}