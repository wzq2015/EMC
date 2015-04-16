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
	<script type="text/javascript" src="./ER/CG/ERCG01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ECSM01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
 <EF:EFInput blockId="inqu_status" ename="siteType" row="0" type="hidden" />
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      站点名称
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="siteName" row="0" />
		   
		    </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
 
 <div id = "ef_region_link" title="站点属性说明" style="overflow:scroll">
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <font color=red > 同步参数格式为：ip=AA&port=BB&admin_namespace=CC&admin_userName=DD&admin_pwd=EE&url_prefix=FF&searchPath=GG；
              如果输入的同步参数不符合格式要求，在进行站点同步时会出错。</font>
		  </tr>
		</table>
	</div>
</div>
 
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" style="navigationBar:false">
<EF:EFColumn ename="siteType"   visible="false"/>
<EF:EFColumn ename="siteId"  visible="false"/>
<EF:EFColumn ename="siteName" cname="站点名称" maxLength="50"  minLength="1" nullable="false"  validateType="chinese_string" validateErrorPrompt="站点名称" />
<EF:EFColumn ename="siteAlias" maxLength="50"  minLength="1" nullable="false"  validateType="string" validateErrorPrompt="站点别名"/>
<EF:EFColumn ename="siteSeq"  />	
<EF:EFComboColumn ename="isAnony"  >
	<EF:EFOption value="0" label="否" />
	<EF:EFOption value="1" label="是" />
</EF:EFComboColumn>
<EF:EFComboColumn ename="siteState"  >
	<EF:EFOption value="0" label="正常" />
	<EF:EFOption value="1" label="关闭" />
</EF:EFComboColumn>
<EF:EFColumn ename="synParameter"  editType="textarea"/>	
</EF:EFGrid>      

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
