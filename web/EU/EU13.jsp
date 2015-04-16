<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
	<script type="text/javascript" src="./EU/EU13.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EU13" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>


<div id = "ef_region_inqu" title="数据库比较" efRegionShowClear=true>
	<div id = "ef_div_inqu" style="overflow:hidden;width:100%">
		<table width="80%" border="1">
		  <tr>
		      <td><div align="right">leftJdbcDriver</div></td>
		    <td>oracle.jdbc.driver.OracleDriver</td>
		      <td><div align="right">rightJdbcDriver</div></td>
		    <td>oracle.jdbc.driver.OracleDriver</td>
		  </tr>
		  <tr>
		      <td><div align="right">leftJdbcUrl</div></td>
		    <td><input type="text" name="leftJdbcUrl" size="43"  ></td>
		      <td><div align="right">rightJdbcUrl</div></td>
		    <td><input type="text" name="rightJdbcUrl" size="43"  ></td>
		  </tr>
		  <tr>
		      <td><div align="right">leftUsername</div></td>
		    <td><input type="text" name="leftUsername" ></td>
		      <td><div align="right">rightUsername</div></td>
		    <td><input type="text" name="rightUsername" ></td>
		  </tr>
		  <tr>
		      <td><div align="right">leftPassword</div></td>
		    <td><input type="text" name="leftPassword" ></td>
		      <td><div align="right">rightPassword</div></td>
		    <td><input type="text" name="rightPassword" ></td>
		  </tr>
		  <tr>
		    <td>&nbsp;<input type="button" name="leftConnect" value="测试" onClick="connectDB('left','true');"></td>
		    <td>&nbsp;</td>
		    <td>&nbsp;<input type="button" name="rightConnect" value="测试" onClick="connectDB('right','true');"></td>
		    <td>&nbsp;</td>
		  </tr>
		  <!--  
		  <tr>
		      <td><div align="right"></div></td>
		    <td>&nbsp;</td>
		      <td><div align="right"></div></td>
		    <td>&nbsp;</td>
		  </tr>

	
		  <tr>
		    <td>&nbsp;</td>
		    <td>&nbsp;</td>
		    <td>&nbsp;</td>
		    <td>&nbsp;</td>
		  </tr>
		  	  -->
		</table>
	</div>
</div>  

<EF:EFRegion/>

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
