<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title></title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ER/ERTools.js"></script>
	<script type="text/javascript" src="./EJ/AC/EJAC03.js"></script>
</head>

<body class="bodyBackground">

<form id="EJAC03" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<table width=100% cellpadding=0 cellspacing=0 >
  <tr>
    <td>
      <table cellpadding=0 cellspacing=0  width=100%>
        <tr>
          <td>
            <div id = "ef_region_operate" title="<%=I18nMessages.getText("label.EJACWorkRunningInfomation","作业运行信息") %>" style="overflow:scroll"> 
              <div style="overflow:hidden;width:100%;height:300px;">
              <table>
				<tr><td nowrap width="25%"><%=I18nMessages.getText("label.EJACWorkId","作业代码") %></td><td id="jobId"></td></tr>
				<tr><td><%=I18nMessages.getText("label.EJACWorkName","作业名称") %></td><td id="jobDesc"></td></tr>
				<tr><td><%=I18nMessages.getText("label.EJACWorkParam","作业参数") %></td><td id="jobData"></td></tr>
				<tr><td><%=I18nMessages.getText("label.EJACRunningStatus","运行状态") %></td><td id="jobStatus"></td></tr>
				<tr><td><%=I18nMessages.getText("label.EJACProcessBar","进度显示") %></td><td id="processBar"></td></tr>
             </table>
              </div>
            </div> 
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
  
<EF:EFRegion/>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
