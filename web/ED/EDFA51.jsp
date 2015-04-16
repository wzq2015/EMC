<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
	<script type="text/javascript" src="./ED/EDFA51.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EDFA51" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      画面英文名
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_define" ename="formEname" row="0" style="text-transform : uppercase;" etc="validateType='string' maxLength='8' size='8'"/>
				<!-- <img title="结点英文名列表" src="./EF/Images/ef_pop_up_window.gif" > -->
		    </td>
		  </tr>
		  
		</table>
	</div>
</div>  
 <EF:EFInput blockId="inqu_status" ename="formEname" row="0" type="hidden"></EF:EFInput>
 <EF:EFInput blockId="inqu_status" ename="funcId" row="0" type="hidden"></EF:EFInput>
 <EF:EFInput blockId="inqu_status" ename="userId" row="0" type="hidden"></EF:EFInput>

<div id = "ef_region_dresult" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_dresult" title="页面信息" style="overflow: hidden;height:200px;">
	</div> 
</div>     


<div id = "ef_region_r" title="信息区" >
	<table width=100% cellpadding=0 cellspacing=0 >
	  <tr>
	    <td width=50%  valign="top">
	      <div id = "ef_region_result" title="已定义列信息" style="width=100%;">
	        <div id = "ef_grid_result" title="已定义列" style="overflow:hidden;height:200px;">
	        </div> 
	      </div>     
	    </td>
	    <td width=50%  valign="top">
	      <div id = "ef_region_uresult" title="未定义列信息" style="width=100%;">
	        <div id = "ef_grid_uresult" title="未定义列" style="overflow: hidden;height:200px;">
	        </div>
	      </div>     
	    </td>
	  </tr> 
	</table>
</div>
  
<EF:EFRegion/>

<EF:EFGrid blockId="dresult" autoDraw="no" readonly="false" ajax="true" queryMethod="queryDefine">
    <EF:EFSubGridColumn ename="formEname" fix="yes" sort="false" nullable="false" blockName="forms" 
    	                  valueProperty="formEname" serviceName="EDFA53" queryMethod="getForms" />
	<EF:EFComboColumn ename="funcId" fix="yes" sort="false" nullable="false" width="180" blockName="funcs" valueProperty="funcId" labelProperty="funcId" >
		<EF:EFOption label="" value=""></EF:EFOption>
	</EF:EFComboColumn>
	<EF:EFColumn ename="funcCname" enable="false"/> 
</EF:EFGrid>      

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" ajax="true" style="operationBar:false;">
	<EF:EFColumn ename="seqNo"  />
	<EF:EFColumn ename="itemDisplayCname" />
	<EF:EFComboColumn ename="itemMustFlag" valueProperty="itemMustFlag" readonly="true">
	    	<EF:EFOption value="1" label="是" />
	    	<EF:EFOption value="0" label="否" />
	</EF:EFComboColumn>
	
</EF:EFGrid>      

<EF:EFGrid blockId="uresult" autoDraw="no" queryMethod="queryUnDefine" ajax="true" readonly="false" style="operationBar:false;">
	<EF:EFColumn ename="itemDisplayCname" readonly="true"/>
	<EF:EFComboColumn ename="itemMustFlag" valueProperty="itemMustFlag" readonly="true">
	    	<EF:EFOption value="1" label="是" />
	    	<EF:EFOption value="0" label="否" />
	</EF:EFComboColumn>
	
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
