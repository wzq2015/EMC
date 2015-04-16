<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/WEB-INF/framework/tlds/EF-2.0.tld" prefix="EF"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/EF/iplat-ui-2.0.js"></script>

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Welcome to iPlat4j</title>  
  <script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
</head>
<body>      
    
  <script type="text/javascript">          
   
    function treeNodeInitializer(node){	     
      node.textClicked = function(){ alert("["+ node.label() + "] " + node.data().message); };
	}
	
	function configTree(tree){
	  tree.nodeInitializer = treeNodeInitializer;
	}
    
    function openNode(){    
      var nd = tree1.expandNode('520');
      if ( nd != null ){
        nd.textDom().style.color = "red";
      } else {
        alert("Can NOT find node 520");
      }
    }   
    
    function loadNode(){ 
      var nd = tree1.getNode('520');
      nd.reload();
    }      
  </script>
  
   <h3>该示例演示了树组件</h3>
    <input type="button" value="打开节点" onclick="openNode()">
    <input type="button" value="重载节点" onclick="loadNode()">
    
    <EF:EFLoadTree id="tree1" text="组织机构" efAttr="orgtree" configFunc="configTree" location="DispatchAction.do?efFormEname=EE01"/>
  
</body>
</html>
