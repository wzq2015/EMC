<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/WEB-INF/framework/tlds/EF-2.0.tld" prefix="EF"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/EF/iplat-ui-2.0.js"></script>

<html>
<head>
  <title>Welcome to iPlat4j</title>  
  <script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
</head>
<body>      
    
  <script type="text/javascript">
    var model =  new eiTreeModel('EE03');
  
    function checkCheckStatus() {
	   var _selectedItems = tree2.getChecked();
	   for( var i=0; i<_selectedItems.length;i++ ){
	        alert( _selectedItems[i] );
	   } 
	 }
	    
	function checkRadioStatus() {
	      var option = tree2.getOption();
		  alert( option );
	} 
    
    function treeNodeInitializer(node){
      node.textDom().style.color = "red";	
      if ( node.depth() < 2 ){  
        node.type( new checkItemType(false) );
      } else {
        node.type( new radioItemType(false) );
      }  
      node.icon("EF/Images/eftree_cu.gif");
      node.openIcon("EF/Images/eftree_cu.gif");
      node.textClicked = function(){ alert(node.label()+ ":" + node.text() ); };
	}
	    
    function configTree(tree){
      tree.nodeInitializer = treeNodeInitializer; 
	}
  </script>
  
   <h3>该示例演示了树组件</h3>
  
  <input type="button" value="获取CheckBox状态" onclick="checkCheckStatus()"/>
  <input type="button" value="获取RadioBox状态" onclick="checkRadioStatus()"/>
  
  
  <EF:EFTree model="model" id="tree2" text="组织机构" configFunc="configTree"/>
  
</body>
</html>
