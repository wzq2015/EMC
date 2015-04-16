<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String nodeId = request.getParameter("nodeId");
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/AM/ECAM06.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECAM06" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
     <EF:EFInput blockId="inqu_status" ename="articleState" row="0" type="hidden" />
     <EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden" />
     <EF:EFInput blockId="inqu_status" ename="nodeType" row="0" type="hidden" />
     <input type="hidden" id="nodeId" value="<%=nodeId %>"/>
	 <div style="overflow:hidden;width:100%">
						<table>
						  <tr>
						    <td nowrap width="15%">
						     文章标题
						    </td>
						    <td nowrap width=35%">
						    <EF:EFInput blockId="inqu_status" ename="articleTitle" row="0" />
						    </td>
                            <td nowrap width="15%">
						     文章作者
						    </td>
						    <td nowrap width=35%">
						    <EF:EFInput blockId="inqu_status" ename="author" row="0" />
						    </td>
						  </tr>
						  <tr>
						    <td nowrap width="15%">
						     创建起始时间
						    </td>
						    <td nowrap width=35%">
						    <EF:EFInput blockId="inqu_status" ename="recCreateTimeStart" row="0" popup="date" etc="maxLength='8' size='8'"/>
						    </td>
						     <td nowrap width="15%">
						     创建截止时间
						    </td>
						    <td nowrap width=35%">
						    <EF:EFInput blockId="inqu_status" ename="recCreateTimeEnd" row="0" popup="date" etc="maxLength='8' size='8'"/>
						    </td>
						  </tr>
						</table>
		</div>
</div>

 
<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
 <div id="checkContent" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_check" title="审核" style="overflow:scroll">
		 <table>
			<tr>
			 <td>	
			 <input  type="radio" id="check_pass" name="isPassAudit" value="0" class="inputField"  />通过
			 </td>
			 <td>
			 <input  type="radio" id="check_unpass" name="isPassAudit" value="1" class="inputField"  checked/>不通过
			 </td>
			</tr>
			</table>
		</div>		
		
		</td> 	
 	</tr>
 	</table>	
 </div>
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" ajax="true" style="navigationBar:false;operationBar:false">
<EF:EFColumn ename="columnId" cname="栏目id"   visible="false"/>
<EF:EFColumn ename="articleId" cname="文章ID"   visible="false" />
<EF:EFColumn ename="articleTitle" cname="文章标题" nullable="false" readonly="true"/>
<EF:EFColumn ename="author" cname="文章作者" readonly="true"/>
<EF:EFComboColumn ename="articleState" cname="文章状态" valueProperty="value" labelProperty="label" enable="false" >
  <EF:EFOption label="" value=""></EF:EFOption>
  <EF:EFOption label="已创建" value="0"></EF:EFOption>
  <EF:EFOption label="已发布" value="1"></EF:EFOption>
  <EF:EFOption label="可用" value="2"></EF:EFOption>
</EF:EFComboColumn>
<EF:EFColumn ename="recCreateTime" cname="创建时间" enable="false"  editType="date" dateFormatString="yyyy-MM-dd hh:mm:ss"/>
<EF:EFColumn ename="recCreator" cname="录入人" enable="false"/>
<EF:EFColumn ename="articleId" cname="文章ID"   visible="false" />
<EF:EFColumn ename="preview" cname="预览" align="right" enable="false"/>
</EF:EFGrid>      
     
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
