<!DOCTYPE html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script type="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script type="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
	<script type="text/javascript">
	efform_onload = function(){
		//efregion.show("ef_region_codeDemo");
		//efregion.toggleShow("ef_region_codeDemo");
	};
	</script>
</head>
<body>

<form id="EEDM53" method="post" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<EF:EFTreeGrid blockId="$" treeColumn="0">
<EF:EFTreeColumn ename="text" cname="菜单" width="200" />
<EF:EFTreeColumn ename="label" cname="标签"/>
<EF:EFTreeColumn ename="leaf" cname="是否为叶子节点"/>
<EF:EFTreeColumn ename="parent" cname="父节点"/>
</EF:EFTreeGrid>

</form>
</body>
</html>




