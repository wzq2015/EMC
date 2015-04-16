<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.core.ei.EiInfo,
								java.util.List,
								com.baosight.iplat4j.ec.util.TemplateConstant"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>搜索模块</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/TM/ECTM13.js"></script>
	<style>
	A.linkstyle:link {
		FONT-SIZE: 12px; COLOR: #444444; FONT-FAMILY: "Verdana"; TEXT-DECORATION: none;
	}
	A.linkstyle:visited {
		FONT-SIZE: 12px; COLOR: #444444; FONT-FAMILY: "Verdana"; TEXT-DECORATION: none;
	}
	A.linkstyle:hover {
		FONT-SIZE: 12px; COLOR:#777777; FONT-FAMILY: "Verdana"; TEXT-DECORATION: underline;
	}
	</style>
</head>
<body class="">

<form id="ECTM13" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_all" title="" efRegionShowClear=false>
	<div id="ef_region_main">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>    		
    		<td id="rightContent" width=100%  vAlign="top" >
    		  <div style='width:100%;border:#ffffff 1px solid;' id = "ef_region_inqu" title="搜索条件" efRegionShowClear=false>
				<div style='width:100%;height:100;border:#bbbbbb 1px solid;display:;'>
				<table width=100%>
				  <tr>
				    <td align=right nowrap width="15%">
				     文章标题
				    </td>
				    <td nowrap width=35%">
				    <EF:EFInput blockId="inqu_status" ename="articleTitle" etc="size=25 maxlength=20" row="0" />
				    </td>
	                <td align=right nowrap width="15%">
				     文章作者
				    </td>
				    <td nowrap width=35%">
				    <EF:EFInput blockId="inqu_status" ename="author" etc="size=25 maxlength=20" row="0" />
				    </td>
				  </tr>
				  <tr>
				    <td align=right nowrap width="15%">
				     文章摘要
				    </td>
				    <td nowrap width=35%">
				    <EF:EFInput blockId="inqu_status" ename="articleAbstract" etc="size=25 maxlength=20" row="0" />
				    </td>
	                <td align=right nowrap width="15%">
				     文章来源
				    </td>
				    <td nowrap width=35%">
				    <EF:EFInput blockId="inqu_status" ename="source" etc="size=25 maxlength=20" row="0" />
				    </td>
				  </tr>
				  <tr>
	                <td align=right nowrap width="15%">
				     文章关键字
				    </td>
				    <td nowrap width=35%">
				    <EF:EFInput blockId="inqu_status" ename="keyWords" etc="size=25 maxlength=20" row="0" />
				    </td>
				    <td align=right nowrap width="15%">
				     搜索范围
				    </td>
				    <td nowrap width=35%">
				    <EF:EFSelect blockId="inqu_status" ename="siteId" row="0">
				    <EF:EFOption label="全部站点" value="99999999"></EF:EFOption>
				    <EF:EFOptions blockId="site"  labelColumn="siteName" valueColumn="siteId"></EF:EFOptions>
				    </EF:EFSelect>
				    </td>
				  </tr>
				  <tr>
				    <td align=right nowrap width="15%">
				     起始时间
				    </td>
				    <td nowrap width=35%">
				    <EF:EFInput blockId="inqu_status" ename="displayTimeStart" row="0" popup="date" etc="maxLength='8' size='25'"/>
				    </td>
				    <td align=right nowrap width="15%">
				     截止时间
				    </td>
				    <td nowrap width=35%">
				    <EF:EFInput blockId="inqu_status" ename="displayTimeEnd" row="0" popup="date" etc="maxLength='8' size='25'"/>
				    </td>
				  </tr>
				</table>
				<table bgcolor='#eeeeee' style='border-top:#bbbbbb 1px solid;' width='100%'>
				  <tr>
				  	<td align=center colspan=4>
				  	<input type='button' style='padding-top:2px;width:100px;font-size:10px;height:22px;' value='搜  索' onClick='search()'>
				  	</td>
				  </tr>
				</table>
				</div>
			  </div>
			  <div style='width:100%;border:#ffffff 1px solid;display:;'>
			  	<div id='searchresult' name='搜索结果区域' style='width:100%;height:520;border:#bbbbbb 1px solid;display:;'>
			  	
			  	</div>
              </div>
            </td>
    	  </tr>
        </table>
	</div>
</div>  

<EF:EFRegion/>
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
<script type="text/javascript">
	parent.document.getElementById("SearchUnitFrame").style.height = '725px';
</script>
</body>
</html>   
