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
	<script type="text/javascript" src="./ES/ES103.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ES102" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_result" title="自定义界面风格" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>

		    <td nowrap width="15%">
		      风格
		    </td>
		    <td nowrap width="20%">
				<EF:EFSelect blockId="" row="" ename="styleEname" etc="style='width:120px'">
					<EF:EFCodeOption condition="" codeName="iplat.interfaceStyle" conj="-"/>
				</EF:EFSelect>
		    </td>
		    <td nowrap width="15%">
		      字体
		    </td>
		    <td nowrap width="20%">
				<EF:EFSelect blockId="" row="" ename="styleFont" etc="style='width:120px' ">
					<EF:EFCodeOption condition="" codeName="iplat.interfaceFont" conj="-"/>
				</EF:EFSelect>
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
