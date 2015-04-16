
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String url = application.getRealPath("");
	System.out.println(url);
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript">
	  var baseUrl = "<%= request.getContextPath() %>";
	</script>
	<script type="text/javascript" src="./ER/ER50.js"></script>
	<script type="text/javascript" src="./ER/ERUtils.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ER20" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>
<input type="hidden" id="xmlStr" name="xmlStr" value="" />
<input type="hidden" id="url" name="url" value="<%=url%>" />
<EF:EFInput blockId="" ename="reportFileName" row="" etc="value='EDFA00_MODEL.xml' type='hidden'"  />
<EF:EFInput blockId="" ename="reportPath" row="" etc="value='ER' type='hidden'"/>
<div id = "ef_region_inqu" title="报表模板" style="overflow:scroll"> 
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      工程
		    </td>  
		    <td nowrap >
		    <EF:EFSelect blockId="inqu_status" ename="project_prefix" row="0" >
		    <EF:EFOption label="全部" value="" />
		    <EF:EFOptions conj="-" blockId="projectBlock" labelColumn="projectCname" valueColumn="projectPrefix"/>
		    </EF:EFSelect>
		    </td>
		  </tr>		  
		</table>
	</div>
</div>     

<div id = "ef_region_result" title="EXCEL" style="overflow:scroll"> 
  <object id="mySpreadsheet" classid=CLSID:0002E559-0000-0000-C000-000000000046 style="width:100%;height:400">
  </object>
</div>     
  
<EF:EFRegion/>

<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>
<iframe id="downloadExcel" src="" width=0 height=0> </iframe>
</body>
</html>   
