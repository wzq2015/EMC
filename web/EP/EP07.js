
efform_onload = function ()
{
  efregion.show("ef_region_result");
}

button_f2_onclick = function () 
{
    //debugger;
    var node = ef.getNodeById("efFormTime");
    var dd = new Date();
    node.value =  dd.getYear() + "-" + (dd.getMonth() + 1) + "-" + (dd.getDay() + 1) + "-" + dd.getHours() + "-" + dd.getMinutes() + "-" + dd.getSeconds() + "-" + dd.getMilliseconds();
	
    if (efvalidateForm(ef.get("EP07"))) {
      efgrid.submitInqu( "ef_grid_result", "ep","EP07","query");
    }
	
}

