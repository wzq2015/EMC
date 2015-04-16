
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
	<script type="text/javascript" src="./EV/CM/EVCM02.js"></script>
	
	

	
</head>
<body class="bodyBackground">

<form id="EVCM02" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>

<div id="ef_tab_y"  lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">
<div id="portlet" title="portlet" > 
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      名称
		    </td>
		    <td nowrap width="20%">
		       <EF:EFInput blockId="inqu_status" ename="portletName" row="0"  etc="nullable='true' minLength='0' maxLength='50' "/>
		    </td>
		    <td nowrap width="15%">
		      内容类型
		    </td>
            <td nowrap width="20%">
            <EF:EFSelect blockId="inqu_status" ename="portletContentType" row="0" >
               <EF:EFOption label="全部" value="" />
               <EF:EFOption label="IFrame" value="1" />
               <EF:EFOption label="RSS" value="2" />
               <EF:EFOption value="3" label="DIV" />
               <EF:EFOption label="内容接口" value="4" />
             </EF:EFSelect>
            </td>
		  </tr>
		  <tr>
		    <td nowrap width="15%">
		      资源类型
		    </td>
            <td nowrap width="20%">
               <EF:EFSelect blockId="inqu_status" ename="portletResourceType" row="0" etc="style='width:80'">
               <EF:EFOption label="全部" value="" />
               <EF:EFOption label="公用类" value="0" />
               <EF:EFOption label="授权类" value="1" />
               <EF:EFOption label="匿名类" value="2" />
             </EF:EFSelect>
            </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="portlet" style="overflow:scroll"> 
<div id = "ef_grid_result" title="portlet" style="overflow: hidden;height:300px;"></div> 
</div>    

<div id = "ef_region_inter" title="静态参数" style="overflow:scroll"> 
<div id = "ef_grid_inter" title="静态参数" style="overflow: hidden;height:150px;"></div> 
<EF:EFInput blockId="inter_inqu_status" ename="portletId" row="0" type="hidden"/>
<EF:EFInput blockId="inter_inqu_status" ename="portletType" row="0" type="hidden"/>
</div>   

</div>



<div id="tab" title="tab" >
<div id = "ef_region_inqu_2" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		     <td nowrap width="10%" align="right">PORTLET标识</td>
             <td nowrap width="20%">
                 <EF:EFInput blockId="inqu_status" ename="portletId_show" row="0" etc="maxLength='50'"/>
             </td>
             <td nowrap width="10%" align="right">TAB名称</td>
             <td nowrap width="20%">
                 <EF:EFInput blockId="inqu_status" ename="tabName" row="0" etc="maxLength='50'"/>
             </td>
		  	<td nowrap width="10%" align="right">TAB类型</td>
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

<div id = "ef_region_result_2" title="记录集" style="overflow:scroll">
	<div id = "ef_grid_result_2" title="页面信息" style="overflow: hidden;height:300px;">
	</div>
</div>

<div id = "ef_region_inter_2" title="静态参数" style="overflow:scroll"> 
<div id = "ef_grid_inter_2" title="静态参数" style="overflow: hidden;height:150px;"></div> 

</div>   



</div>


</div>

  
<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" ajax='true' >
  <EF:EFColumn ename="portletId" cname="Portlet标识" readonly="true" fix="yes" maxLength="50" nullable="false"/>
  <EF:EFColumn ename="portletName" cname="Portlet名称" maxLength="50" nullable="false" readonly="true"/>
  <EF:EFComboColumn ename="portletSource" sort="true" align="center" width="100" readonly="true">
     <EF:EFOption value="0" label="来自平台" />
	 <EF:EFOption value="1" label="用户自定义" />
	 <EF:EFOption value="2" label="来自内容管理" />
  </EF:EFComboColumn>
  <EF:EFComboColumn ename="portletContentType" cname="内容类型" sort="true" align="center" width="80" readonly="true">
     <EF:EFOption value="1" label="IFrame" />
     <EF:EFOption value="2" label="RSS" />
     <EF:EFOption value="3" label="DIV" />
     <EF:EFOption value="4" label="内容接口" />
  </EF:EFComboColumn>
  <EF:EFComboColumn ename="portletResourceType" cname="资源类型" sort="true" align="center" width="80" readonly="true">
     <EF:EFOption value="0" label="公用类" />
     <EF:EFOption value="1" label="授权类" />
     <EF:EFOption value="2" label="匿名类" />
  </EF:EFComboColumn>
  <EF:EFColumn ename="portletUrl" cname="Portlet地址" editType="textarea"  readonly="true" />
  <EF:EFComboColumn ename="charParameter" align="center" width="80" readonly="true">
     <EF:EFOption value="0" label="否" />
     <EF:EFOption value="1" label="是" />
  </EF:EFComboColumn>
  <EF:EFColumn ename="editProtlet"  cname="修改" width="50"/>
  <EF:EFColumn ename="ssoSystemId"  cname="单点登录系统标识" readonly="true"/>
  <EF:EFColumn ename="referTab"  cname="相关TAB" readonly="true" displayType="hyperlink"  defaultValue="相关链接" />
  <EF:EFColumn ename="recCreateTime" cname="记录创建时刻" enable="false"/>
  <EF:EFColumn ename="recCreator" cname="记录创建责任者" enable="false" />
  <EF:EFColumn ename="recReviseTime" cname="记录修改时刻" enable="false"/>
  <EF:EFColumn ename="recRevisor" cname="记录修改责任者" enable="false"/>
 
  <EF:EFColumn ename="archiveFlag"  cname="归档标记" enable="false" />
</EF:EFGrid>     


<EF:EFGrid blockId="inter" autoDraw="no" readonly="false"  ajax='true' serviceName="EVCM09" queryMethod="query">
  <EF:EFColumn ename="portletType" cname="Portlet类型"  visible="false"/>
  <EF:EFColumn ename="portletId" cname="portletId"  visible="false"/>
  <EF:EFColumn ename="paraName" cname="参数名称"  readonly="true" nullable="false" minLength="1" maxLength="50" validateType='string' />
  <EF:EFColumn ename="paraValue" cname="参数值" nullable="false" minLength="1" maxLength="50" validateType='string'/>
  <EF:EFColumn ename="paraDetail" cname="描述" maxLength="100" width="200"/>
</EF:EFGrid> 


<EF:EFGrid blockId="result_2" autoDraw="no" readonly="false"   ajax='true' serviceName="EVCM03" queryMethod="query">
	<EF:EFColumn ename="tabId" cname="TAB标识" fix="yes" maxLength="50" nullable="false" readonly="true"/>
    <EF:EFSubGridColumn ename="portletId" cname="Portlet标识"  sort="fasle" nullable="false" blockName="result_portlets" valueProperty="portletId" serviceName="EVCM02" queryMethod="getPortlet" fix="yes" readonly="true"/>
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
  	 <EF:EFColumn ename="editTab"  cname="修改" width="50"/>
  	<EF:EFColumn ename="ssoSystemId"  cname="单点登录系统标识" readonly="true"/>
	<EF:EFColumn ename="recCreator" enable="false" />
	<EF:EFColumn ename="recCreateTime"  enable="false" />
	<EF:EFColumn ename="recRevisor"  enable="false" />
	<EF:EFColumn ename="recReviseTime" enable="false" />
	<EF:EFColumn ename="archiveFlag"  enable="false" />
</EF:EFGrid>

<EF:EFGrid blockId="inter_2" autoDraw="no" readonly="false"  ajax='true' serviceName="EVCM09" queryMethod="query">
  <EF:EFColumn ename="portletType" cname="Portlet类型"  visible="false"/>
  <EF:EFColumn ename="portletId" cname="portletId"  visible="false"/>
  <EF:EFColumn ename="paraName" cname="参数名称"  readonly="true" nullable="false" minLength="1" maxLength="50" validateType='string' />
  <EF:EFColumn ename="paraValue" cname="参数值" nullable="false" minLength="1" maxLength="50" validateType='string'/>
  <EF:EFColumn ename="paraDetail" cname="描述" maxLength="100" width="200"/>
</EF:EFGrid> 

<EF:EFTab tabId="y" />

<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>
</body>
</html>  
