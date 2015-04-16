<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<% String str=(String)request.getAttribute("msg");%>

<HTML>
<HEAD>
	
</HEAD>
<body>
<div id="ef_region_iplat" title="异常描述">
	<div>
		<table>		  
		  <tr>
		    <td nowrap width="20%">
		      异常信息:
		    </td>
		    <td nowrap width="80%" ><%=str%></td>
		  </tr>		  	  
		</table>
	</div>	
</div>
</body>
</html>
