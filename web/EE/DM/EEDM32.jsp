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
	<script type="text/javascript" src="./EE/DM/EEDM32.js"></script>	
	
</head>
<body class="bodyBackground">
<form id="EEDM31" method="POST" action="<%=actionUrl%>" >
	<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<EF:EFInput blockId="" ename="startTime" row="" type="hidden" />
<EF:EFInput blockId="" ename="rows" row="" type="hidden" />


<div id="divStatus" style="color: blue"></div>
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      应用系统
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="application" row="0" />
		    </td>
		    <td nowrap width="15%">
		      创建者
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="creator" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" frontSort="true" sumType="none" showModel="quickShow"  ajax="false" enable="true"  style="modelXlsBar:true;">	

	<EF:EFColumn ename="name" cname="名称" sort="true" align="left" width="150"   />
	<EF:EFColumn ename="displayName" cname="显示名称" sort="true" align="right" width="150"   />
	
	<EF:EFComboColumn ename="moduleType" cname="类型" blockName="Type" 
		valueProperty="moduleType"  labelProperty="moduleTypeDisplayName" formatString="#labelString#" />
	<EF:EFColumn ename="parent" cname="父模块" sort="true" width="150"   />
	
	<EF:EFComboColumn ename="application" cname="应用系统1" blockName="Application" 
                      valueProperty="application"  labelProperty="applicationName" >
	</EF:EFComboColumn>
	
    <EF:EFColumn ename="version" cname="版本" sort="true"  />
    
    <EF:EFColumn ename="archieveFlag"  cname="归档标记<input  type='checkbox' >" width="100" enable="false"/>
	<EF:EFColumn ename="loadOnDemand"  cname="按需加载<input  type='checkbox' >" width="100" enable="false"/>
	
	<EF:EFColumn ename="createTime" cname="创建时间" sort="true" editType="date" dateFormat="yyyy-mm-dd"  />
	<EF:EFColumn ename="modifyTime" cname="修改时间" sort="true" editType="date" dateFormat="yyyy-mm-dd"  />
	
    <EF:EFColumn ename="tableSpaceName" cname="表空间名称" sort="true"   />
	<EF:EFColumn ename="tableSpaceSize" cname="表空间大小" sort="true"   />
	<EF:EFColumn ename="price" cname="模块售价" sort="true" />
	<EF:EFColumn ename="creator" cname="创建者" sort="true"   />
	<EF:EFColumn ename="moduleDesc" cname="描述" sort="true"   />
	
    <EF:EFColumn ename="typeFullName" cname="类型全名" sort="true"   />
	<EF:EFColumn ename="moduleLink" cname="链接" sort="true" />
	<EF:EFColumn ename="col18" cname="col18" sort="true" />
	<EF:EFColumn ename="col19" cname="col19" sort="true"  />
	<EF:EFColumn ename="col20" cname="col20" sort="true"  />	


	<EF:EFColumn ename="col21" cname="col21" sort="true" />
	<EF:EFColumn ename="col22" cname="col22" sort="true" />
	<EF:EFColumn ename="col23" cname="col23" sort="true" />
	<EF:EFColumn ename="col24" cname="col24" sort="true" />
	<EF:EFColumn ename="col25" cname="col25" sort="true" />
	<EF:EFColumn ename="col26" cname="col26" sort="true" />
	<EF:EFColumn ename="col27" cname="col27" sort="true" />
	<EF:EFColumn ename="col28" cname="col28" sort="true" />
	<EF:EFColumn ename="col29" cname="col29" sort="true" />
	<EF:EFColumn ename="col30" cname="col30" sort="true" />
	<EF:EFColumn ename="col31" cname="col31" sort="true" />
	<EF:EFColumn ename="col32" cname="col32" sort="true" />
	<EF:EFColumn ename="col33" cname="col33" sort="true" />
	<EF:EFColumn ename="col34" cname="col34" sort="true" />
	<EF:EFColumn ename="col35" cname="col35" sort="true" />
	<EF:EFColumn ename="col36" cname="col36" sort="true" />
	<EF:EFColumn ename="col37" cname="col37" sort="true" />
	<EF:EFColumn ename="col38" cname="col38" sort="true" />
	<EF:EFColumn ename="col39" cname="col39" sort="true" />
	<EF:EFColumn ename="col40" cname="col40" sort="true" />
	<EF:EFColumn ename="col41" cname="col41" sort="true" />
	<EF:EFColumn ename="col42" cname="col42" sort="true" />
	<EF:EFColumn ename="col43" cname="col43" sort="true" />
	<EF:EFColumn ename="col44" cname="col44" sort="true" />
	<EF:EFColumn ename="col45" cname="col45" sort="true" />
	<EF:EFColumn ename="col46" cname="col46" sort="true" />
	<EF:EFColumn ename="col47" cname="col47" sort="true" />
	<EF:EFColumn ename="col48" cname="col48" sort="true" />
	<EF:EFColumn ename="col49" cname="col49" sort="true" />
	<EF:EFColumn ename="col50" cname="col50" sort="true" />

</EF:EFGrid>      


     
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
