<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;  charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ER/ERTools.js"></script>
	<script type="text/javascript" src="./EE/ER/EEER01.js"></script>
	<script type="text/javascript" src="./ER/ER.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECAM01" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
</div>

<div id = "ef_region_inqu" title="报表查询条件"> 
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
		      
		    <td align="right" nowrap width="10%">记录数：</td>
		     <td> 
		     	<EF:EFInput blockId="inqu_status" ename="num" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div> 

<div id = "ef_region_excel" title="EXCEL报表生成" style="overflow:scroll"> 
  <div id="spreadSheetDiv" style="overflow:hidden;width:100%;">
</div>

<div id="printContent" class="efwindow">
 	<table style="width:300px"><tr>
		<td>
		<div id = "ef_region_PRCT" title="打印设置" style="overflow:scroll">
		 <table>
			<tr><td>	
			<input  type="radio" id="select_book" name="print_Content" value="2" class="inputField"  />整个工作簿(E)
			</td></tr><tr><td>
			<input  type="radio" id="select_sheet" name="print_Content" value="3" class="inputField"  checked/>当前选定工作表(V)
			</td></tr>
			</table>
		</div>		
		</td> 	
 	</tr>
 	</table>
 </div>
</div>
  
  
  
<EF:EFRegion/>      
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
