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
	<script type="text/javascript" src="./ED/FA/EDFA62.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDFA62" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_result" title="自定义界面风格" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%" align="right">
		      风格：
		    </td>
		    <td nowrap width="20%">
				<EF:EFSelect blockId="" row="" ename="styleEname" etc="style='width:120px'">
					<EF:EFCodeOption condition="" codeName="iplat.interfaceStyle" conj="-"/>
				</EF:EFSelect>
		    </td>
		      <td nowrap width="15%" align="right">
		      字体：
		    </td>
		    <td nowrap width="20%" style='display:none;'>
				<EF:EFSelect blockId="" row="" ename="styleFont" etc="style='width:120px' ">
					<EF:EFCodeOption condition="" codeName="iplat.interfaceFont" conj="-"/>
				</EF:EFSelect>
		    </td>	
		    <td width="40%">
		    <EF:EFButton cname="保存风格" ename="f2"/>
		    </td>    
		  </tr>
		  
		</table>
	</div>
</div>  

<div id="ef_tab_y" >
	<div id="userUIForm" title="样式显示" eftabSrc="about:blank" eftabHeight="600px" efRemember="yes"></div>
</div>

<EF:EFTab tabId="y" />

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
