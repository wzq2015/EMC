<!DOCTYPE html>
<%@ page  pageEncoding="UTF-8" language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String actionUrl = request.getContextPath()+"/DispatchAction.do";
	String localUrl0 = "http://"+request.getServerName();
	if(request.getServerPort() > 0 )
		localUrl0+=":"+ request.getServerPort();
	localUrl0+= request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript">
var nodeUrl = '<%=localUrl0%>';
</script>
<script type="text/javascript" src="./EP/EP14.js"></script>
</head>

<body class = "bodyBackground">
<form id = "EP14" method = "POST" action = "<%=actionUrl%>" >
<jsp:include flush = "false" page = "../EF/Form/iplat.ef.head.jsp"></jsp:include>


<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions", "查询条件")%>" efRegionShowClear = true>
	<div id = "ef_div_inqu" style = "overflow:hidden;width:100%">
	<table width="80%">
		<tr>
			<td nowrap width = "5%">
			节点地址
			</td>
			<td nowrap width="40%">
		    <EF:EFInput blockId="inqu_status" ename="nodeURL" row="0" etc="nullable='false'" style="width:250px" value="<%=request.getContextPath()%>" />
			<img title="Hazelcast节点" id="popupWindowId" 
				onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
				onmouseover="this.style.cursor='hand'"" onClick="openSubGrid();" />
		    </td>
		    <td nowrap width = "5%">
		        连接超时
		    </td>
		    <td nowrap width = "25%">
		    <EF:EFInput blockId="inqu_status" ename="connectionTimeout_in" row="0" etc="nullable='true'" style="width:50px" />ms
		    </td>
		   	<td nowrap width = "5%">
		        读取超时
		    </td>
		    <td nowrap width = "25%">
		    <EF:EFInput blockId="inqu_status" ename="soTimeout_in" row="0" etc="nullable='true'" style="width:50px" />ms
		    </td>
		    </tr>
	</table>
  </div>
</div>

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFRecordSet","记录集") %>" style="overflow:scroll"  efRegionShowClear = true> 
	<div id = "ef_grid_result" title="缓存信息" style="overflow: hidden;height:275px;">
	</div> 
</div>

<div id = "ef_region_detail" title="缓存明细" style="overflow:scroll" >
	<div style="overflow:hidden;width:100%">
		<table width ="80%">
		  <tr>
			    <td nowrap width="15%" align="right">
			       缓存名称
			    </td>
			    <td nowrap width="50%" >
			    <EF:EFInput blockId="detail" ename="cacheName" row="0" type="text" style='width:100%' />
			    </td>
			  
			    <td colspan="6" width="35%">
			    </td>
		   </tr>
		   <tr>
		       <td nowrap width="15%" align="right">
			      缓存类型
			    </td>
			    <td nowrap width="50%">
			    <EF:EFInput blockId="detail" ename="cacheType" row="0" type="text" style='width:100%'  />
			    </td>
			     <td colspan="6" width="35%">
			    </td>
		   </tr>
		   <tr>
			   <td nowrap width="15%" align="right">
			      缓存地址
			    </td>
			    <td nowrap width="50%" >
			    <EF:EFInput blockId="detail" ename="cacheLoc" row="0" type="text" style='width:100%'  />
			    </td>
			   	<td colspan="6" width="35%">
			    </td>
	      </tr>
	      </table>
	      <hr>
	      <table width ="80%">
	      <tr>
	      	  <td nowrap width="15%" align="right">缓存对象大小 </td>
			   <td nowrap width="15%">
			    <EF:EFInput blockId="detail" ename="cacheOSize" row="0" type="text" style='width:100%' />B
			    </td>
			   <td nowrap width="15%" align="right">缓存内容个数</td>
			    <td nowrap width="15%">
			    <EF:EFInput blockId="detail" ename="cacheNumSize" row="0" type="text" style='width:100%' />
			    </td>
			    <td nowrap width="15%" align="right">
			      缓存内容大小
			    </td>
			    <td nowrap width="15%">
			    <EF:EFInput blockId="detail" ename="cacheSize" row="0" type="text" style='width:100%' />B
			    </td>
			    <td  width="8%">
			    </td>
	      </tr>
		  <tr>
			    <td nowrap width="15%" valign="top" align="right">
			      缓存额外信息
			    </td>
			    <td nowrap width="85%" colspan = "8">
			    <EF:EFInput blockId="detail" ename="cacheExtr" row="0" type="textarea" style='width:100%;height:100px' />
			    </td>
		   </tr>
		</table>
	</div>
</div>

<EF:EFRegion/>
<EF:EFInput blockId="inqu_status" ename="soTimeout" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status" ename="connectionTimeout" row="0" type="hidden"/>
<EF:EFInput blockId="inqu_status" ename="nodeType" row="0" type="hidden"/>
<EF:EFGrid blockId = "result" autoDraw = "no"  ajax = "true" readonly="true"  paintId="ef_grid_result">
<EF:EFColumn ename="cacheName" cname="缓存名字" sort="true" readonly="true" width="200" />
<EF:EFColumn ename="cacheType" cname="缓存类型"  readonly="true" width="200" />
<EF:EFColumn ename="cacheClear" cname="清空缓存"  displayType="textbutton" readonly="true" width="80" align="center" />
<EF:EFColumn ename="cacheLoc" cname = "缓存地址" visible="false" />
</EF:EFGrid>
<jsp:include flush = "false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
