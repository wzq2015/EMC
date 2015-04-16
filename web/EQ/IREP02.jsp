<%@ page contentType="text/html;charset=UTF-8"%>

<%
	String contextPath = request.getContextPath();
%>

<HTML>
<HEAD>
	<title>错误信息</title>
	<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
	<script type="text/javascript" src="<%=contextPath %>/EF/EF.js"></script>
	<script type="text/javascript">
		efform_onload = function ()
		{
			//debugger;
			efregion.show("ef_region_iplat");
			var ef_region_buttonbar = new efbuttonbar();
			ef_region_buttonbar.paint("ef_region_iplat");
		  
		}	
	</script>  
</HEAD>
<body>
<form action="">
<jsp:include flush="false" page="../EF/Form/EFFormStyle.jsp"></jsp:include>
<div id="ef_region_iplat" title="异常描述">
	<div>
		<table>
		  <tr>
		    <td nowrap width="20%">
		      异常代码
		    </td>
		    <td nowrap width="80%">ep.0013</td>
		  </tr>		  
		  <tr>
		    <td nowrap width="20%">
		      异常信息
		    </td>
		    <td nowrap width="80%">尚未建立规则库！</td>
		  </tr>		  
		  <tr>
		    <td nowrap width="20%">
		      异常堆栈
		    </td>
		    <td nowrap width="80%"></td>
		  </tr>		  
		</table>
	</div>	
</div>
  <jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
  </form>
</body>
</html>