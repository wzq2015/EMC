<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD42.js"></script>

</head>
<body class="bodyBackground">

<form id="EDMD42" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="width:100%" id="inline1">
		<table>
			<tr>
			<td>
			   数据模型
			</td>
			<td> 
			
				<EF:EFFlexBox blockId="inqu_status" ename="modelId" row="0" displayValue="name" hiddenValue="id" initialValue="--请选择--" initialKey="-1" dataBlockId="dataBlock" displayAll="true" onSelect="model_select()" /> 
			 	<!--
				<EF:EFSelect blockId="inqu_status" ename="modelId" row="0" etc="onchange='model_select()'" >
				    <EF:EFOptions blockId="dataBlock" labelColumn="name" valueColumn="id"/>
			    </EF:EFSelect>
			    -->	
				<EF:EFInput blockId="inqu_status" ename="projectEname" row="0" type="hidden"/>
				<EF:EFInput blockId="inqu_status" ename="tableEname" row="0" type="hidden"/>
		    </td>
		 </tr>
		</table>
	</div>
</div>

<div id = "ef_region_result" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:415px;">
	</div>
</div>

<div id="ef_region_table" title="选择表" efRegionShowClear=true style="display: none">
	<div style="width:100%;overflow;hidden" id="inline2">
	       <table id="mainFrameTable" width="100%"  height="100%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	    <td id="leftTree" vAlign="top" height=100%>
              <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:400px;'>
    		    <EF:EFTree model="tableTreeModel" id="nTree" text="表信息" configFunc="configTree">
    		    </EF:EFTree>
    		  </div>
    		                    
    		 </td>
    		 
			<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td> 		
    		<td id="rightContent" width=100%  vAlign="top" >
			  <div id = "ef_region_select" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
				<div id = "ef_grid_select" title="表数据项" style="overflow: hidden;height:320px;width:675px">
				</div>
			  </div>     
            </td>
    	  </tr>
        </table>
	</div>
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" serviceName="EDMD42" queryMethod="query">
	<EF:EFColumn ename="id" cname="id" readonly="true" width="100" visible="false"/>
	<EF:EFColumn ename="seqId" cname="序号" width="40" />
	<EF:EFColumn ename="tableName" cname="表名" width="100" />
	<EF:EFColumn ename="tableNickName" cname="别名" width="120" />
	<EF:EFColumn ename="fieldEname" cname="字段名" width="120" />
	<EF:EFColumn ename="fieldCname" cname="字段中文名" width="160" />
	<EF:EFColumn ename="isPrimaryKey" cname="是否主键" readonly="true" visible="false" width="60" />
	<EF:EFComboColumn ename="isPrimaryKey" cname="是否主键" width="60" valueProperty="value" labelProperty="label" >
	  <EF:EFOption label="是" value="1"></EF:EFOption>
	  <EF:EFOption label="否" value="0"></EF:EFOption>
	</EF:EFComboColumn>
	<EF:EFColumn ename="fieldType" cname="字段类型" width="100" />
	<EF:EFColumn ename="fieldLen" cname="字段长度" width="100" />
	<EF:EFColumn ename="dateFormat" cname="日期格式" width="120" />
	<EF:EFColumn ename="exprField" cname="公式字段" width="160" />
	<EF:EFComboColumn ename="codesetCode" cname="小代码" width="120" blockName="codesetCode" valueProperty="codesetCode" labelProperty="codesetName" formatString="#labelString#"  />	
	<EF:EFColumn ename="codesetCode" cname="小代码" visible="false" width="120" />
	<EF:EFColumn ename="recCreateTime" cname="创建时间" enable="false"/>
	<EF:EFColumn ename="recCreator" cname="创建人" enable="false" />
	<EF:EFColumn ename="recReviseTime" cname="修改时间" enable="false"/>
	<EF:EFColumn ename="recRevisor" cname="修改人" enable="false"/>
	<EF:EFColumn ename="archiveFlag"  cname="归档标记" enable="false" />
</EF:EFGrid>

<EF:EFGrid blockId="select" ajax="true" autoDraw="no" style="navigationBar:false;operationBar:false">
	<EF:EFColumn ename="tableItemSeq" cname="序号" width="30" enable="false" />
	<EF:EFColumn ename="itemEname" width="100" enable="false" />
	<EF:EFColumn ename="itemCname" width="160" enable="false" />
	<EF:EFColumn ename="tableIndexType" width="120" enable="false" />
	<EF:EFColumn ename="itemType" width="100" enable="false" />
	<EF:EFColumn ename="itemLen" width="60" enable="false" />
</EF:EFGrid>   

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
