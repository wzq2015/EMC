button_f1_onclick = function ()
{
	var node = ef.get("inqu_status-0-form_type");

    if (efvalidateForm(ef.get("EE502"))) {
       alert("提交成功");
    }
}
button_f2_onclick = function () {

	alert("提交成功");
}
button_f3_onclick = function ()
{
	if(efvalidateDiv("validateDiv")){
		alert("提交成功");
	}
}


button_f11_onclick = function ()
{
	var node = ef.get("inqu_status-0-form_type");

    if (efvalidateFormInGroup(ef.get("EE502"),"group1")) {
       alert("提交成功");
    }
}

button_f33_onclick = function ()
{
	if(efvalidateDivInGroup("validateDiv","group1")){
		alert("提交成功");
	}
}

efform_onload = function(){
	efregion.show("ef_region_codeDemo");
	efregion.toggleShow("ef_region_codeDemo");
}
