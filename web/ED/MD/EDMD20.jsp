<!DOCTYPE html> 
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>  

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD20.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDMD20" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<EF:EFInput blockId="currentDataModel" ename="dataModelEname" row="0" type="hidden"/>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		  	<td width="10%" align="right">
		      数据模型英文名
		    </td>
		    <td width="15%">
		      <EF:EFInput blockId="inqu_status" ename="dataModelEname" row="0" />
		    </td>
		    <td width="10%" align="right">
		      数据模型中文名
		    </td>
		    <td width="15%">
		      <EF:EFInput blockId="inqu_status" ename="dataModelCname" row="0" />
		    </td>
		  	<td width="10%" align="right">
		      项目英文名
		    </td>  
		    <td nowrap width="15%">
		     <EF:EFSelect blockId="inqu_status" ename="projectEname" row="0" etc=' styleClass="inputField" '>
		      <EF:EFOption label="全部" value="" />
		      <EF:EFOptions conj="-" blockId="project" labelColumn="projectCname" valueColumn="projectEname"/>
		    </EF:EFSelect> 
		    </td>
		    
		    <td width="10%" align="right">
		      关联数据表
		    </td>
		    <td width="15%">
		      <EF:EFInput blockId="inqu_status" ename="tableEname" row="0"/>
		    </td>
		  </tr>	  
		</table> 
	</div>
</div>  


<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="数据模型信息" style="overflow: hidden;height:150px;">
	</div> 
</div>     

<div id="ef_tab_y"  lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">
<div id="item" title="数据模型字段" >
		     <table width="100%" border=0>
		      <tr>
               <td width="50%">		       
		        <div id = "ef_region_relatedItem" title="已配置数据模型字段" efRegionShowClear=false>
                 <div id = "ef_grid_relatedItem" title="已配置数据模型字段" style="overflow: hidden;height:260px;">
                 </div>
                </div>
		       </td>		      		         
		       <td>
		        <div id = "ef_region_noRelatedItem" title="未配置数据模型字段" efRegionShowClear=false>
		         <div id = "ef_grid_noRelatedItem" title="未配置数据模型字段" style="overflow: hidden;height:260px;">
                 </div>
                </div>
		       </td>
		      </tr>
		     </table>
</div>

<div id="item2" title="数据模型查询条件">
<div id = "ef_region_queryCondition" title="数据模型查询条件" efRegionShowClear=true> 
	<div id = "ef_grid_queryCondition" title="数据模型查询条件" style="overflow: hidden;height:260px;">  
    </div>
</div>
</div>

<div id="item3" title="数据模型排序条件">
<div id = "ef_region_sortCondition" title="数据模型排序条件" efRegionShowClear=true> 
	<div id = "ef_grid_sortCondition" title="数据模型排序条件" style="overflow: hidden;height:260px;">  
	</div>		
</div>
</div>
</div>

<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" ajax="true" queryMethod="query">
<EF:EFColumn ename="dataModelEname"  cname="数据模型英文名" sort="true" fix="yes" width="100" nullable="false" maxLength="8" />
<EF:EFComboColumn ename="projectEname" cname="项目英文名称" blockName="project" valueProperty="projectEname" labelProperty="projectEname" formatString="#valueString#"  />
<EF:EFComboColumn ename="tableEname" cname="关联数据表名" width="200" blockName="table" valueProperty="tableEname" labelProperty="tableCname" formatString="#valueString#-#labelString#"  />
</EF:EFGrid>

<EF:EFGrid blockId="relatedItem" autoDraw="yes" readonly="false" style="operationBar:false" ajax="true" serviceName="EDMD21" queryMethod="queryItem">
<EF:EFColumn ename="dataModelEname"  cname="数据模型英文名" sort="true" fix="yes" width="100" nullable="false" maxLength="8" />
<EF:EFColumn ename="sortType"  cname="排序类型" visible="false" />
<EF:EFColumn ename="sortSeqNo"  cname="排序标识" visible="false" />
<EF:EFColumn ename="recCreator" cname="记录创建责任者"  visible="false" />
<EF:EFColumn ename="recCreateTime" cname="记录创建时间" visible="false" />
<EF:EFColumn ename="recRevisor" cname="记录修改责任者" visible="false" />
<EF:EFColumn ename="recReviseTime" cname="记录修改时刻" visible="false" />
<EF:EFColumn ename="archiveFlag" cname="归档标记" visible="false" />
</EF:EFGrid>
<EF:EFGrid blockId="noRelatedItem" autoDraw="yes" readonly="false" style="operationBar:false" ajax="true" serviceName="EDMD21" queryMethod="queryIrrelatedItems">
<EF:EFColumn ename="dataModelEname"  cname="数据模型英文名" sort="true" fix="yes" width="100" nullable="false" maxLength="8" />
<EF:EFColumn ename="sortType"  cname="排序类型" visible="false" />
<EF:EFColumn ename="sortSeqNo"  cname="排序标识" visible="false" />
<EF:EFColumn ename="tableIndexType" cname="数据库表索引类型" visible="false"/>
<EF:EFColumn ename="isSortField" cname="是否是排序字段" visible="false"/>
<EF:EFColumn ename="recCreator" cname="记录创建责任者"  visible="false" />
<EF:EFColumn ename="recCreateTime" cname="记录创建时间" visible="false" />
<EF:EFColumn ename="recRevisor" cname="记录修改责任者" visible="false" />
<EF:EFColumn ename="recReviseTime" cname="记录修改时刻" visible="false" />
<EF:EFColumn ename="archiveFlag" cname="归档标记" visible="false" />
</EF:EFGrid>        
<EF:EFGrid blockId="queryCondition" autoDraw="yes" readonly="false" ajax="true" serviceName="EDMD22" queryMethod="queryConditionItems">
<EF:EFColumn ename="dataModelEname" cname="数据模型英文名" nullable="false" maxLength="8" visible="false" />
<EF:EFColumn ename="queryConditionEname" cname="查询条件英文名" fix="yes"/>
<EF:EFColumn ename="itemSeq" cname="数据项编号" fix="yes"/>
<EF:EFColumn ename="recCreator" cname="记录创建责任者"  visible="false" />
<EF:EFColumn ename="recCreateTime" cname="记录创建时间" visible="false" />
<EF:EFColumn ename="recRevisor" cname="记录修改责任者" visible="false" />
<EF:EFColumn ename="recReviseTime" cname="记录修改时刻" visible="false" />
<EF:EFColumn ename="archiveFlag" cname="归档标记" visible="false" />
</EF:EFGrid>     
<EF:EFGrid blockId="sortCondition" autoDraw="yes" readonly="false" ajax="true" serviceName="EDMD21" queryMethod="querySortItems">
<EF:EFColumn ename="dataModelEname"  cname="数据模型英文名" sort="true" fix="yes" width="100" nullable="false" maxLength="8" />
<EF:EFColumn ename="sortType" cname="排序类型" readonly="false"/>
<EF:EFColumn ename="sortSeqNo" cname="排序标识" readonly="false"/>
<EF:EFColumn ename="recCreator" cname="记录创建责任者"  visible="false" />
<EF:EFColumn ename="recCreateTime" cname="记录创建时间" visible="false" />
<EF:EFColumn ename="recRevisor" cname="记录修改责任者" visible="false" />
<EF:EFColumn ename="recReviseTime" cname="记录修改时刻" visible="false" />
<EF:EFColumn ename="archiveFlag" cname="归档标记" visible="false" />
</EF:EFGrid>          

<EF:EFTab tabId="y" /> 

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
