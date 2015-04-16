<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/WEB-INF/framework/tlds/EF-2.0.tld" prefix="EF"%>


<link href="../../EF/EF.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript"">
  var CONTEXT_PATH = "../..";
</script>
<script type="text/javascript" src="../../EF/jQuery/jquery-1.7.js"></script>
<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="../../EF/iplat-ui-control.js"></script>


<%
  String contextpath = request.getContextPath();
  String baseUrl = contextpath;
  String listUrl = baseUrl + "/DispatchAction.do";	
%>

<html>
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

  <script type="text/javascript">
  
    function onLoad(){
      var dialog = window.parent ;
      dialog.InnerDialogLoaded() ;
      dialog.disableFinish(true);     
    }
    
    function validate(){
    	var errors = [];
		var grid = efgrid.getGridObject("ef_grid_t");
		var type = $(':input:radio:checked').val();
		if( type == "ROLE_SELECT" ){
		   var checkedRows = grid.getSelectRowsData();
		   if( checkedRows.length == 0 )
		   {
			   	errors.push( "请选择指定导出的角色类型！" );
		   }
		}
      	return errors;
    }
    
    function onNext(){
      var grid = efgrid.getGridObject("ef_grid_t");
      
      var type = $(':input:radio:checked').val();
      if( type == "ROLE_SELECT" ){
        var sels = [];
        var checkedRows = grid.getSelectRowsData();
        
        if( checkedRows.length == 0 )
        {
        	alert( "请选择指定导出的角色类型！" );
        	return "_exp_rtype.jsp";
        }
        
        for(i=0;i<checkedRows.length;i++){
          var row = checkedRows[i]['label'];
          sels.push(row);
        }       
	    var selection = sels.join(','); 
	    window.parent.setProperty("RoleType", selection);
      }
      return "_exp_finish.jsp"
    }
    
    function renderTypeGrid(){    
      var labelCol = new Object();
      labelCol.name = "label"; 
      labelCol.width = 200;
  
      var nameCol = new Object();
      nameCol.name = "name"; 
      nameCol.width = 400;
      
      var customCols = {"index":{"label":0, "name":1 }};
      var colMetas = new Array();
      colMetas.push(labelCol);
      colMetas.push(nameCol);
      customCols.metas = colMetas;
      
      var __ei={"blocks":{"result":{"rows":[],"meta":{"columns":[{"descName":"角色类型标签","pos":0,"name":"label"},{"descName":"角色类型名称","pos":1,"name":"name"}]}}}};
      function _getEi(){ return Json2EiInfo.prototype.parseJsonObject(__ei); }
  
      var __grid_result = new efgrid( "result","ef_grid_t" );
      __grid_result.setEnable(true);
      __grid_result.setReadonly(false);
      __grid_result.setAjax(false);
      __grid_result.setAutoDraw('no');
      __grid_result.setServiceName("");
      __grid_result.setQueryMethod("query");
      __grid_result.setCustomColumns(customCols);
      __grid_result.setStyle({"navigationBar":"false", "operationBar":"false"});
      __grid_result.setData(_getEi());
      __grid_result.paint();
    }    

  </script>
</head>

<body onload="onLoad()" style="overflow: hidden">
<div id = "_eiMsgKey"></div>
<div id = "_eiMsg"></div>

 <table cellspacing="0" cellpadding="0" width="100%" border="0">
    <tr>
      <td>
         <input type="radio" name="export" checked value="ROLE_ALL"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出所有角色类型</span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
 
    <tr>
      <td>
         <input type="radio" name="export" value="ROLE_SELECT"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出指定角色类型</span>
      </td>
    </tr>
    
   <tr>
      <td colspan="2">
        <hr width=100% size=2 color=#505050 style="FILTER: alpha(opacity=100,finishopacity=0,style=3)"/>   
      </td>
    </tr>
    
    <tr>
      <td colspan="2" align="center">
     
        <div id = "ef_region_show" title="权限查看" efRegionShowClear=false style="overflow: hidden; width:90%; height:100%;">
		    <div id = "ef_grid_t" style="overflow: hidden; height:300px;">
    		</div>
        </div>    
       
      </td>
    </tr>
  </table>  
 
 
 
 
 

</body>
</html>

<script type="text/javascript">
   renderTypeGrid();
   efregion.show("ef_region_show");
  	var buttonbar = new efbuttonbar();
	buttonbar.buttonCount = 2;
	buttonbar.buttonData = [["F3","增加角色类型"],["F4","删除角色类型"]];
	
	buttonbar.paint("ef_region_show");
   

   
   button_f3_onclick = function(){
    efform.openNewForm("ESUT10", "chooseType=PSTP&&efFormPopup=1");
   }
   
   
   efform_onPopupReturn = function(eform, rows){
    var grid = efgrid.getGridObject( "ef_grid_t" ); 
    var tempArray = new Array();
    for( var i=0; i<rows.length; i++ ){
      var row = rows[i];  
      var uc = {};
      uc.label = row["label"];
      uc.name = row["name"];
      tempArray.push(uc);
    }
    grid.addRowData(tempArray, false );  
   }
   
   

button_f4_onclick = function(){
  var grid = efgrid.getGridObject("ef_grid_t");
  var rowLength = grid.getCheckedRows().length;  
  for(i=rowLength-1;i>=0;i--){
    grid.removeRow(grid.getCheckedRows()[i]);
  }
  grid.refresh();	
}
</script>
