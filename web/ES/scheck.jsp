<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ page import="com.baosight.epass2.base.*" %>
<%@ page import="com.baosight.epass2.util.*" %>
<%@ page import="com.baosight.epass2.authorization.*" %>
<%@ page import="java.util.*" %>
<%
	boolean error = false;
	String message = "";
	try
	{
		EpassLongTreeUtils org_tree = new EpassLongTreeUtils();
		org_tree.setTableName( EpassTables.ORG_STRUCTURE_TREE_TABLE_NAME );
		org_tree.setIDFieldName( EpassTables.ORG_ID_FIELD_NAME );
		org_tree.setLeftFieldName( EpassTables.ORG_LEFT_FIELD_NAME );
		org_tree.setRightFieldName( EpassTables.ORG_RIGHT_FIELD_NAME );
		org_tree.setRootNodeID( EpassObjects.ROOT_ORG_ID );
		org_tree.loadRefreshedTree();
	}
	catch ( Error e )
	{
		message = e.getMessage();
		error = true;
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<title>组织机构树结构检查</title>
</head>
<body>
<br>
<br>
<h3 align=center>组织机构树结构： <%
	if ( error )
	{
%> <font color=red>损坏，请恢复最近的数据备份！</font> <%
 	}
 	else
 	{
 %> <font color=green>正常！</font> <%
 }
 %>
</h3>
<h4 align=center><font color=red><%=message%></font></h4>
<br>
<h4 align=center><%=Calendar.getInstance().getTime().toLocaleString()%></h4>
</body>
</html>
