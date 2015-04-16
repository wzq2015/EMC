<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/SM/ECSM02.js"></script>
	
</head>
<body class="bodyBackground">
<form id="ECSM02" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    		 
    		<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
    		  <IMG src="./EF/Images/vgrabber.gif" >
            </td>
    		
    		<td id="rightContent" width=100%  vAlign="top" >
    		<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
    		   <EF:EFInput blockId="inqu_status" ename="siteId" row="0" type="hidden" />
    		  <EF:EFInput blockId="" ename="checkTag" row="" type="hidden" />
			  <div style="overflow:hidden;width:100%">
						<table>
						  <tr>
						    <td nowrap width="15%">
						     文章标题
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="articleTitle" row="0" />
						    </td>
                            <td nowrap width="15%">
						     文章作者
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="author" row="0" />
						    </td>
						    <td nowrap width="15%">
						     文章状态
						    </td>
						    <td nowrap width=25%">
						    <EF:EFSelect blockId="inqu_status" ename="articleState" row="0">
						    <EF:EFOption label="" value=""></EF:EFOption>
						    <EF:EFOption label="新稿" value="10"></EF:EFOption>
						    <EF:EFOption label="已否" value="20"></EF:EFOption>
						    <EF:EFOption label="审核中" value="30"></EF:EFOption>
						    <EF:EFOption label="待发布" value="40"></EF:EFOption>
						    <EF:EFOption label="已发" value="50"></EF:EFOption>
						    </EF:EFSelect>
						    </td>
						  </tr>
						  <tr>
						    <td nowrap width="15%">
						     创建起始时间
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="recCreateTimeStart" row="0" popup="date" etc="maxLength='8' size='8'"/>
						    </td>
						     <td nowrap width="15%">
						     创建截止时间
						    </td>
						    <td nowrap width=25%">
						    <EF:EFInput blockId="inqu_status" ename="recCreateTimeEnd" row="0" popup="date" etc="maxLength='8' size='8'"/>
						    </td>
						  </tr>
						</table>
					</div>
				</div>  
			  <div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
				<div id = "ef_grid_result" title="文章信息" style="overflow: hidden;">
				</div>
			  </div>  
            </td>
    	  </tr>
        </table>
 
<EF:EFRegion/>
<EF:EFGrid blockId="result" ajax="true" autoDraw="false"  enable="false" queryMethod="queryArticle">
<EF:EFColumn ename="articleTitle" cname="文章标题" width="150" nullable="false" readonly="true"/>
<EF:EFColumn ename="author" cname="文章作者" readonly="true"/>
<EF:EFComboColumn ename="articleState" cname="文章状态" valueProperty="value" labelProperty="label" enable="false" >
  	<EF:EFOption label="" value=""></EF:EFOption>
  	<EF:EFOption label="新稿" value="10"></EF:EFOption>
  	<EF:EFOption label="已否" value="20"></EF:EFOption>
	<EF:EFOption label="审核中" value="30"></EF:EFOption>
	<EF:EFOption label="待发布" value="40"></EF:EFOption>
	<EF:EFOption label="已发" value="50"></EF:EFOption>
</EF:EFComboColumn>
<EF:EFColumn ename="recCreateTime" cname="创建时间" width="130" enable="false"  editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss"/>
<EF:EFColumn ename="recCreator" cname="录入人" enable="false"/>


</EF:EFGrid>      
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>
