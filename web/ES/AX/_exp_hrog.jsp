<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<link href="../../EF/EF.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript"">
  var CONTEXT_PATH = "../.."; 
</script>
<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="../../EF/jQuery/jquery-1.7.js"></script>

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
		var type =$(':input:radio:checked').val(); 
		if( type == "HROG_SELECT" ){
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
      if( type == "HROG_SELECT" ){
        var sels = [];
        var _selectedItems = tree.getChecked();
        
        var _selectLength = _selectedItems.length;
        if( _selectLength == 0 )
        {
        	alert( "请选择指定导出的组织机构！" );
        	return "_exp_hrog.jsp";
        }        
        
	    for( var i=0; i<_selectLength;i++ ){
	        sels.push(_selectedItems[i]);
	    }
	    var selection = sels.join(',');   
	    //alert(selection);     
	    window.parent.setProperty("HROG", selection);
      }      
      return "_exp_finish.jsp";
    }
    
    var tModel =  new eiTreeModel('ESUTTR30');
       
    
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

<body onload="onLoad()" style="overflow: hidden">
  
  <table cellspacing="0" cellpadding="0" width="100%" border="0">
    <tr>
      <td>
         <input type="radio" name="export" checked value="HROG_ALL"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出所有组织机构</span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>
 
    <tr>
      <td>
         <input type="radio" name="export" value="HROG_SELECT"/>&nbsp;&nbsp;
      </td>
      <td nowrap width="100%">
         <span>导出指定组织机构</span>
      </td>
    </tr>
    
    <tr>
      <td colspan="2">
        <hr width=100% size=2 color=#505050 style="FILTER: alpha(opacity=100,finishopacity=0,style=3)"/>   
      </td>
    </tr>
    
    <tr>
      <td></td>
      <td>
        <div title="权限查看" efRegionShowClear=false style="overflow: visible; width:40%; height:400px;">
           <EF:EFTree model="tModel" id="tree" text="组织机构" configFunc="configTree">	 	 
           </EF:EFTree>	
        </div>     
      </td>
    </tr>
  </table>
  	
 
	
</body>
</html>
