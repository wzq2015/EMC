<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.core.ei.EiInfo,
								java.util.List,
								com.baosight.iplat4j.ec.util.TemplateConstant"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String searchEntryHtml=request.getParameter("searchEntryHtml");
	String keyWord=request.getParameter("keyWord").trim();
	keyWord = new String(keyWord.getBytes("ISO8859_1"),"UTF-8");
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>搜索单元接口</title>
	<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/TM/ECTM15.js"></script>
	
</head>
<body style='margin:0px;' class=""   onkeydown="keypress(this);">

<form id="ECTM15" method="POST" action="<%=actionUrl%>" onsubmit=" return false;">

<div id = "ef_region_all" title="" efRegionShowClear=false>
	<div id="ef_region_main">
        <table id="mainFrameTable" width="200"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>    		
    		<td id="rightContent" width=100%  vAlign="top" >				
				<EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden"/>
				<EF:EFInput blockId="inqu_status" ename="siteId" row="0" type="hidden"/>
				<input id="keyWord" name="keyWord" value="<%=keyWord %>" type="hidden"/>
				<EF:EFInput blockId="" ename="searchEntryHtml" row="" type="hidden"/>
				 <div id="searchEntry"></div>			  
            </td>
    	  </tr>
        </table>
	</div>
</div>  
<EF:EFRegion/>
</form>
</body>
</html>   
