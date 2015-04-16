button_f2_onclick = function () 
{
	ef.get("methodName").value = "query";
	document.forms["ED12"].submit();
}

button_f3_onclick = function () 
{
	ef.get("methodName").value = "insert";
	document.forms["ED12"].submit();
}

button_f4_onclick = function () 
{
	ef.get("methodName").value = "update";
	document.forms["ED12"].submit();
}

button_f5_onclick = function () 
{
	ef.get("methodName").value = "delete";
	document.forms["ED12"].submit();
}
