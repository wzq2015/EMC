efform_onload = function ()
{
  //如果不是弹出窗口，禁用返回按钮
  var efFormPopup = ef.get("efFormPopup").value;
  if (efFormPopup != "1") {
    efbutton.setButtonStatus("RETURN", false);
  } else {
    try {
      eval(ef.get("userDefineFunction").value);
    } catch (ex) {
    }
  }
  button_query_onclick();
}

//从弹出窗口返回
efform_onPopupReturn = function(winId, returnStr)
{
  var returnStrs = returnStr.split(",");
  for (var i = 0; i < returnStrs.length; i ++) {
    var returnValues = returnStrs[i].split("=");
    if (returnValues.length == 2) {
      if (typeof(ef.get(returnValues[0])) == "object") {
        ef.get(returnValues[0]).value = returnValues[1];
      }
    }
  }
  efform.setStatus(1, "获取从页面[" + winId + "]的返回信息成功！"); 
  
}

//从ER20传入的自定义公式信息需要进行参数解析
//模拟udf函数用来进行自定义公式的参数解析
udf = function (funcId, paraStr) {
  ef.get("inqu_status-0-funcId").value = funcId;
  ef.get("funcIdNow").value = funcId;
  //button_query_onclick();

  //从数据库加载参数列表
  var inInfo = new EiInfo();
  inInfo.set("funcId", funcId);
  
  EiCommunicator.send("ER21","getPara", inInfo);
  if (ajaxEi == null) return;
  
  var paraValues = paraStr.split(",");
  var paraBlock = ajaxEi.getBlock("para");
  for ( i = 0; i < paraBlock.rows.length; i++ ){
    if (paraValues[i] != null) paraBlock.setCell(i, "paraDefaultValue", paraValues[i]);
  }

  erTools.autodrawPara(ajaxEi, "para", "ef_para_list");
  efregion.setTitle("ef_region_para", "函数[" + funcId + "]参数信息");

}


//日历框选择 
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}

button_query_onclick = function () 
{
  if (efvalidateDiv("ef_region_inqu")) {
    efgrid.submitInqu( "ef_grid_result", "er","ER21","query");
  }	
}

//组织自定义函数
button_insertudf_onclick = function () 
{
  	var funcIdNow = efutils.trimString(ef.get("funcIdNow").value);
  	if (funcIdNow == "") {
      efform.setStatus(-1, "请选择自定义函数！");
      return;
  	}

    if (!efvalidateDiv("ef_para_list")) {
      return;
    }
    
    var paraStr = erTools.getParaStr("ef_para_list");
    var udfStr = "udf(\"" + funcIdNow + "\", \"" + paraStr + "\")";
  	
    ef.get("userDefineFunction").value += udfStr;
    efform.setStatus(1, "自定义函数插入完成！");
}

//返回
button_return_onclick = function () 
{
  if (!window.opener.closed) {
	 window.opener.efform_onPopupReturn("ER20", ef.get("userDefineFunction").value, ef.get("efReturnId").value);	
  }
  window.close();
}

//根据点击的自定义函数ID载入参数列表
efgrid_onFixCellClick = function( grid_id, row_index, col_index, cell_value ) 
{
  if (grid_id != "ef_grid_result") return;	
  if (col_index == 1) {
    ef.get("funcIdNow").value = cell_value;
    
    //从数据库加载参数列表
    var inInfo = new EiInfo();
    inInfo.set("funcId", cell_value);
  
    EiCommunicator.send("ER21","getPara", inInfo);
    if (ajaxEi == null) return;

	erTools.autodrawPara(ajaxEi, "para", "ef_para_list");
    efregion.setTitle("ef_region_para", "函数[" + cell_value + "]参数信息");

  }
}
