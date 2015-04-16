<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./EC/PM/ECPM01.js"></script>
</head>
 
<body class="bodyBackground">
<form id="ECPM01" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

  <div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
   <div>	
		<table>		  
		  <tr>
		    <td  nowrap width="5%">登录用户名:</td>
		    <td  width="15%">
			  <EF:EFInput blockId="inqu_status" ename="fuserid" row="0" />					
		    </td>
		    <td  nowrap width="5%">用户中文名:</td>
		    <td  width="15%">
			  <EF:EFInput blockId="inqu_status" ename="fname" row="0" />					
		    </td>	
		   
		    <td  nowrap width="5%">安全级别:</td>
		     <td nowrap width="15%">
						    <EF:EFSelect blockId="inqu_status" ename="securityLevel" row="0">
						    <EF:EFOption label="全部" value=""></EF:EFOption>
						    <EF:EFOption label="无密级" value="1"></EF:EFOption>
						    <EF:EFOption label="秘密级" value="2"></EF:EFOption>
						    <EF:EFOption label="机密级" value="3"></EF:EFOption>
						    <EF:EFOption label="绝密级" value="4"></EF:EFOption>
						    </EF:EFSelect>
			</td>
		  </tr>
		</table>
	</div>
   </div>  

   <div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	 <div id = "ef_grid_result" title="用户信息" style="overflow: hidden;height:400px;">
     </div> 
   </div>   
   
    <div id="forUpdate" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_update" title="修改安全级别" style="overflow:scroll">
		 <table>
		 	
			<tr>
			<td>安全级别：</td>
			<td>	
			<EF:EFSelect blockId="result" ename="newLevel" row="0" >
				<EF:EFOption label="无密级" value="1"/>
				<EF:EFOption label="秘密级" value="2"/>
				<EF:EFOption label="机密级" value="3"/>
				<EF:EFOption label="绝密级" value="4"/>
			</EF:EFSelect>
			</td>
			</tr>
			</table>
		</div>		
		
		</td> 	
 	</tr>
 	</table>	
 </div>  
  
  <EF:EFRegion/>
		
  <EF:EFGrid blockId="result"  style="operationBar:false">
    <EF:EFColumn ename="fuserid" width="80" sort="false" fix="yes" />
    <EF:EFColumn ename="fname" fix="yes" sort="false" />
    
	<EF:EFComboColumn ename="securityLevel" valueProperty="value" labelProperty="label" enable="false" fix="yes" sort="false" >
	  <EF:EFOption label="无密级" value="1"></EF:EFOption>
	  <EF:EFOption label="秘密级" value="2"></EF:EFOption>
	  <EF:EFOption label="机密级" value="3"></EF:EFOption>
	  <EF:EFOption label="绝密级" value="4"></EF:EFOption>
	</EF:EFComboColumn>
 </EF:EFGrid> 
 <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
 </form>
 </body>
</html>
