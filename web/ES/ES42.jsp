<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES42.js"></script>
 </head>
 
 <body class="bodyBackground">
  <form method="POST" action="<%=listUrl%>">    
    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
    <EF:EFInput blockId="inqu_status" ename="page" row="0" type="hidden" />
 	<div id = "ef_region_result" title="页面按钮" efRegionShowClear=false>
      <div id = "ef_grid_r" title="页面按钮" style="overflow: hidden;height:300px;">
      </div>
    </div>

    <EF:EFRegion/>
    <EF:EFGrid blockId="result" autoDraw="yes" readonly="false"  ajax="true" paintId="ef_grid_r">
      <EF:EFComboColumn ename="label" cname="标识" blockName="button" 
		valueProperty="button_ename"   fix="yes" width="200">
	</EF:EFComboColumn>
      <EF:EFColumn ename="name"  width="150"/>
       <EF:EFColumn ename="desc"  width="200"/>
    </EF:EFGrid>
    
    <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>
</body>
</html>
