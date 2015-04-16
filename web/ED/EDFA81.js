button_f3_onclick = function ()
{
	var owner = document.getElementById("inqu_status-0-owner");
	var tableName = document.getElementById("inqu_status-0-tableName");

	if(efutils.trimString(owner.value) == ""){
		alert('数据表所属用户必须输入!');
		owner.focus();
		return;
	}

	if(efutils.trimString(tableName.value) == ""){
		alert('表名称必须输入!');
		tableName.focus();
		return;
	}

    document.getElementById("serviceName").value="EDFA81";
	document.getElementById("methodName").value="insert";
	document.forms[0].submit();
}