
efform_onload = function () {
}

button_f7_onclick = function() {
  var loginName = ef.get("inqu_status-0-userId").value;
  efform.openNewForm('ES97', "inqu_status-0-loginName=" + loginName );

}

button_f6_onclick = function() {
  var loginName = ef.get("inqu_status-0-userId").value;
  efform.openNewForm('ES56', "inqu_status-0-name=" + loginName + "&inqu_status-0-type=0&inqu_status-0-source=0" );
}

button_f3_onclick = function() {
	if(efvalidateDiv("ef_region_result")){
	  	ef.get("methodName").value="update";
		document.forms[0].submit();		
	}
}