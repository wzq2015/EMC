<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/DB/EDDBT2.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDDBMM" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="表引用" efRegionShowClear=false>
	<div id="ef_region_main">
        <table id="mainFrameTable" width="100%" style="height:600px" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
           <td id="leftTree" vAlign="top" >
              <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;height:100%;'>
    		    <EF:EFTree model="leftTreeModel" id="tree1" text="源表信息" configFunc="configLeftTree">
    		    </EF:EFTree>
    		  </div>
    		                    
    		 </td>
    		 
    		  <td id="action" Align="center" width="10%" style="background-color: #ffffff">
                  <EF:EFButton type="button" ename="addReference" cname="追加引用"/>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                  <EF:EFButton type="button" ename="deleteReference" cname="删除引用"/>  
             </td>
              
          
    		 
    		 
    		  <td id="rightTree" vAlign="top"  width=45% height="100%" style="background-color: #f0f3f4; padding-top:10px;">
    		                    
    		  <div id="rightTreeDiv" style='overflow:auto;height:100%;'>
    		    <EF:EFTree model="rightTreeModel" id="tree2" text="目标表信息" configFunc="configRightTree">
    		    </EF:EFTree>
    		  </div>
    		                    
    		 </td>
    		 
            </tr>
               
        </table>
	</div>
</div>  
     

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
