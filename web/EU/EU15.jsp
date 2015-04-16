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
	<script type="text/javascript" src="./EU/EU15.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EU15" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="数据库比较" efRegionShowClear=false>
	<div id = "ef_div_inqu" style="overflow:hidden;width:100%">
        <table id="mainFrameTable" width="100%"  height="250" border="1" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	    <td id="leftTree" vAlign="top"  width=45% height="100%" style="background-color: #f0f3f4; padding-top:10px;">
    		                    
    		  <div id="leftTreeDiv" style='overflow:auto;height:100%;'>
    		    <EF:EFTree model="leftTreeModel" id="tree1" text="元数据" configFunc="configLeftTree">
    		    </EF:EFTree>
    		  </div>
    		                    
    		 </td>
    		 
    	     <td id="action"  style="background-color: #ffffff">
               <table width="80%"  border="1">
		         <tr> 
		           <td><div align="right">rightJdbcDriver</div></td>
		           <td>oracle.jdbc.driver.OracleDriver</td>
		         </tr>
		         <tr> 
		           <td><div align="right">rightJdbcUrl</div></td>
		           <td><input type="text" id="rightJdbcUrl" size="43"  ></td>
		         </tr>
		         <tr>
		           <td><div align="right">rightUsername</div></td>
		           <td><input type="text" id="rightUsername" size="43"></td>
		         </tr>
		         <tr>
		           <td><div align="right">rightPassword</div></td>
		           <td><input type="text" id="rightPassword" size="43"></td>
		         </tr>
		         <tr>
		           <td>&nbsp;<input type="button" name="rightConnect" value="测试连接" onClick="connectDB('true');"></td>
		           <td>&nbsp;</td>
		         </tr>
		       </table>  
             </td>       
       
        </tr>
         
        </table>
	</div>
</div>  
     

<EF:EFRegion/>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
