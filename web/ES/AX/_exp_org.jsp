<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<link href="../../EF/EF.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript"">
  var CONTEXT_PATH = "../..";
  
</script>
<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="../../EF/jQuery/jquery-1.7.js"></script>

<%
	String contextpath = request.getContextPath();
	String listUrl = contextpath + "/DispatchAction.do";
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
		var type = $(':input:radio:checked').val();
		if( type == "ORG_SELECT" ){
		   var _selectedItems = tree.getChecked();
		   var _selectLength = _selectedItems.length;
		   if( _selectLength == 0 )
		   {
		   	errors.push( "请选择指定导出的组织机构！" );
		   }
		}
      return errors;
    }
    
    function onNext(){
      var type = $(':input:radio:checked').val();
      if( type == "ORG_SELECT" ){
        var sels = [];
        var _selectedItems = tree.getChecked();
        var _selectLength = _selectedItems.length;
	    for( var i=0; i<_selectLength; i++ ){
	        sels.push(_selectedItems[i]);
	    }
	    var selection = sels.join(',');        
	    window.parent.setProperty("Organization", selection);
      }      
      return "_exp_rtype.jsp";
    }
    
    var tModel =  new eiTreeModel('ESUTTR10');
       
    
    function treeNodeInitializer(node){
      if( node.top() ){
        return;
      }
      	 
      node.type( new checkItemType(false) );     
      node.textClicked = function(){ alert(node.label()+ ":" + node.text() ); };
	}
	
	function configTree(tree){
	  tree.nodeInitializer = treeNodeInitializer;
	}

  </script>
</head>

<body onload="onLoad()" style="overflow: visible">
  
  <table cellspacing="0" cellpadding="0" width="100%" height="100%" border="0">
    <tr>
      <td>
         <input type="radio" name="export" checked value="ORG_ALL"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出所有授权机构</span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
 
    <tr>
      <td>
         <input type="radio" name="export" value="ORG_SELECT"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出指定授权机构</span>
      </td>
    </tr>
    
    <tr>
      <td colspan="2">
        <hr width=100% size=2 color=#505050 style="FILTER: alpha(opacity=100,finishopacity=0,style=3)"/>   
      </td>
    </tr>
    
    <tr>
      <td>
        <div title="权限查看" efRegionShowClear=false style="overflow: visible; width:40%; height:390px;">
           <EF:EFTree model="tModel" id="tree" text="授权机构" configFunc="configTree">	 	 
           </EF:EFTree>	
        </div>     
      </td>
    </tr>
  </table>
  	
 
	
</body>
</html>
