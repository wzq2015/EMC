<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
//	String condFlag = I18nMessages.getText("E_Col.condFlag","条件标记")+"<input  type='checkbox' id='testcheck'  onclick=setAllCondFlag(this)>";
//	String orderFlag = I18nMessages.getText("E_Col.orderFlag","排序标记")+"<input  type='checkbox' id='testcheck'  onclick=setAllOrderFlag(this)>";
//	String groupFlag = I18nMessages.getText("E_Col.groupFlag","分组标记")+"<input  type='checkbox' id='testcheck'  onclick=setAllGroupFlag(this)>";
//	String specialFlag = I18nMessages.getText("E_Col.specialFlag","特殊标记")+"<input  type='checkbox' id='testcheck'  onclick=setAllSpecialFlag(this)>";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./ED/MD/EDMD43.js"></script>

</head>
<body class="bodyBackground">

<form id="EDMD43" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="width:100%" id="inline1">
		<table>
			<tr>
			<td>
			   条件模型
			</td>
			<td>
			
				<EF:EFFlexBox blockId="inqu_status" ename="modelId" row="0" displayValue="name" hiddenValue="id" initialValue="--请选择--" initialKey="-1" dataBlockId="dataBlock" displayAll="true" onSelect="model_select()"/> 
		    
		    <!-- 
				<EF:EFSelect blockId="inqu_status" ename="modelId" row="0" etc="onchange='model_select()'">
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

<div id="ef_region_table" title="选择表" efRegionShowClear=true style="display: none;">
	<div style="width:100%;" id="inline2">
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
				<div id = "ef_grid_select" title="表数据项" style="overflow: hidden;height:310px;width:575px">
				</div>
			  </div>     
            </td>
    	  </tr>
        </table>
	</div>
</div>

<div id="ef_region_sql" title="预览SQL" efRegionShowClear=true style="display: none">
	<textarea id="sql" style="width:100%;height:500px;" ></textarea>    
</div>

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" serviceName="EDMD43" queryMethod="query">
	<EF:EFColumn ename="id" cname="id" readonly="true" width="100" visible="false"/>
	<EF:EFColumn ename="seqId" cname="序号" width="40" />
	<EF:EFColumn ename="tableName" cname="表名" width="100" />
	<EF:EFColumn ename="tableNickName" cname="别名" width="120" />
	<EF:EFColumn ename="fieldEname" cname="字段名" width="120" />
	<EF:EFColumn ename="fieldCname" cname="字段中文名" width="160" />
	<EF:EFColumn ename="fieldType" cname="字段类型" width="60" />
	<EF:EFColumn ename="fieldLen" cname="字段长度" width="60" />
	<EF:EFColumn ename="dateFormat" cname="日期格式" width="120" />
	<EF:EFComboColumn ename="codesetCode" cname="小代码" width="120" blockName="codesetCode" valueProperty="codesetCode" labelProperty="codesetName" formatString="#labelString#"  />	
	<EF:EFColumn ename="codesetCode" cname="小代码" visible="false" width="120" />
	<EF:EFColumn ename="condFlag" cname="条件标记" width="60" />
	<EF:EFColumn ename="condSeq" cname="条件顺序" width="60" />
	<EF:EFComboColumn ename="operateLogic" cname="逻辑符" width="60" valueProperty="value" labelProperty="label" >
	  <EF:EFOption label=" " value=" "></EF:EFOption>
	  <EF:EFOption label="OR" value="OR"></EF:EFOption>
	  <EF:EFOption label="AND" value="AND"></EF:EFOption>
	  <EF:EFOption label="OR" value="OR"></EF:EFOption>
	</EF:EFComboColumn>
	<EF:EFComboColumn ename="operatePtfront" cname="(" width="50" valueProperty="value" labelProperty="label" >
	  <EF:EFOption label=" " value=" "></EF:EFOption>
	  <EF:EFOption label="(" value="("></EF:EFOption>
	  <EF:EFOption label="((" value="(("></EF:EFOption>
	  <EF:EFOption label="(((" value="((("></EF:EFOption>
	</EF:EFComboColumn>
	<EF:EFComboColumn ename="operateSymbol" cname="运算符" width="60" valueProperty="value" labelProperty="label" >
	  <EF:EFOption label=" " value=" "></EF:EFOption>
	  <EF:EFOption label="=" value="eq"></EF:EFOption>
	  <EF:EFOption label="&gt;" value="gt"></EF:EFOption>
	  <EF:EFOption label="&lt;" value="lt"></EF:EFOption>
	  <EF:EFOption label="<>" value="ne"></EF:EFOption>
	  <EF:EFOption label="LIKE" value="like"></EF:EFOption>
	</EF:EFComboColumn>
	<EF:EFComboColumn ename="operatePtback" cname=")" width="50" valueProperty="value" labelProperty="label" >
	  <EF:EFOption label=" " value=" "></EF:EFOption>
	  <EF:EFOption label=")" value=")"></EF:EFOption>
	  <EF:EFOption label="))" value="))"></EF:EFOption>
	  <EF:EFOption label=")))" value=")))"></EF:EFOption>
	</EF:EFComboColumn>
	<EF:EFColumn ename="orderFlag" cname="排序标记" width="60" />
	<EF:EFComboColumn ename="orderType" cname="升降序" width="60" valueProperty="value" labelProperty="label" >
	  <EF:EFOption label=" " value=" "></EF:EFOption>
	  <EF:EFOption label="ASC" value="ASC"></EF:EFOption>
	  <EF:EFOption label="DESC" value="DESC"></EF:EFOption>
	</EF:EFComboColumn>
	<EF:EFColumn ename="groupFlag" cname="分组标记" width="60" />
	<EF:EFColumn ename="groupSeq" cname="分组顺序" width="60" />
	<EF:EFColumn ename="specialFlag" cname="特殊标记" width="60" />
	<EF:EFColumn ename="specialCond" cname="特殊条件" width="260" />
	<EF:EFColumn ename="recCreateTime" cname="创建时间" enable="false"/>
	<EF:EFColumn ename="recCreator" cname="创建人" enable="false" />
	<EF:EFColumn ename="recReviseTime" cname="修改时间" enable="false"/>
	<EF:EFColumn ename="recRevisor" cname="修改人" enable="false"/>
	<EF:EFColumn ename="archiveFlag"  cname="归档标记" enable="false" />
</EF:EFGrid>

<EF:EFGrid blockId="select" ajax="true" autoDraw="no" style="navigationBar:false;operationBar:false">
	<EF:EFColumn ename="tableItemSeq" cname="序号" width="30" enable="false" />
	<EF:EFColumn ename="itemEname" width="120" enable="false" />
	<EF:EFColumn ename="itemCname" width="160" enable="false" />
	<EF:EFColumn ename="itemType" width="100" enable="false" />
	<EF:EFColumn ename="itemLen" width="100" enable="false" />
</EF:EFGrid>   

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
