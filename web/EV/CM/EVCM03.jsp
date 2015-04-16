
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/CM/EVCM03.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EVCM0301" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
             <td nowrap width="15%" align="right">Portlet标识</td>
             <td nowrap width="20%">
                 <EF:EFInput blockId="inqu_status" ename="portletId" row="0" etc="maxLength='50'"/>
	             <img title="Portlet标识" id="tree_list_node" 
	             onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
	              onmouseover="this.style.cursor='hand'" onClick="openSelectPortlet()">
             </td>
             <td nowrap width="15%" align="right">TAB名称</td>
             <td nowrap width="20%">
                 <EF:EFInput blockId="inqu_status" ename="tabName" row="0" etc="maxLength='50'"/>
             </td>
		  	<td nowrap width="15%" align="right">TAB类型</td>
            <td nowrap width="20%">
	            <EF:EFSelect blockId="inqu_status" ename="tabType" row="0" etc="">
	              <EF:EFOption label="全部" value="" />
	              <EF:EFOption value="1" label="IFrame" />
	              <EF:EFOption value="2" label="RSS" />
	              <EF:EFOption value="4" label="内容接口" />
	            </EF:EFSelect>
            </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;"></div> 
</div>    
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" paintId="ef_grid_result" style="operationBar:false">
	<EF:EFColumn ename="tabId" cname="TAB标识" fix="yes" maxLength="50" nullable="false" readonly="true"/>
    <EF:EFSubGridColumn ename="portletId" cname="Portlet标识"  sort="fasle" nullable="false" blockName="result_portlets" valueProperty="portletId" serviceName="EVCM03" queryMethod="getPortlet" fix="yes" readonly="true"/>
    <EF:EFColumn ename="tabName" cname="TAB名称" maxLength="50" nullable="false" readonly="true"/>
	<EF:EFComboColumn ename="tabType" cname="TAB类型" sort="fasle" align="center" width="100" readonly="true">
      <EF:EFOption value="1" label="IFrame" />
      <EF:EFOption value="2" label="RSS" />
      <EF:EFOption value="4" label="内容接口" />
    </EF:EFComboColumn>
	<EF:EFColumn ename="tabUrl" cname="TAB地址" editType="textarea" readonly="true"/>
	<EF:EFComboColumn ename="tabSource" sort="true" align="center" width="100" readonly="true">
     <EF:EFOption value="0" label="来自平台" />
	 <EF:EFOption value="1" label="用户自定义" />
	 <EF:EFOption value="2" label="来自内容管理" />
  </EF:EFComboColumn>
  	<EF:EFColumn ename="ssoSystemId"  cname="单点登录系统标识" readonly="true"/>
	<EF:EFColumn ename="recCreator" enable="false" />
	<EF:EFColumn ename="recCreateTime"  enable="false" />
	<EF:EFColumn ename="recRevisor"  enable="false" />
	<EF:EFColumn ename="recReviseTime" enable="false" />
	<EF:EFColumn ename="archiveFlag"  enable="false" />
</EF:EFGrid>


    

<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>
</body>
</html>   
