<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@ page import="com.baosight.iplat4j.dao.*" %>
<%@ page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@ page import="com.baosight.eqrr.common.rr.domain.TRuleApp" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<% 
    //Dao dao = (Dao) SpringApplicationContext.getBean("dao");
    //TRuleApp ruleApp=null;
    //List list = dao.query("tRuleApp.query",null);
    //List combo_source = new ArrayList();
    //for(int i=0;i<list.size();i++){
    	//ruleApp = (TRuleApp)list.get(i);
    	//combo_source.add( new EFComboBean(ruleApp.getAppId(),ruleApp.getLabel()+"-"+ ruleApp.getName()) );
    //}	
	//request.setAttribute( "combobox_source", combo_source );
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EQ/RDcommon.js"></script>
<script type="text/javascript" src="./EQ/RB/EQRB01.js"></script>

</head>
<body class="bodyBackground">
<form id="EQRB01" method="POST" action="<%=actionUrl%>">
<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>


<div id="ef_region_inqu" title="查询条件" efRegionShowClear="true">
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
			<td nowrap="nowrap" width="15%" align="right">规则集描述符</td>
			<td nowrap="nowrap" width="25%">
				<EF:EFInput blockId="inqu_status" ename="rulesetDescriptor" row="0" />
			</td>
		  </tr>
		  <tr>
			<td nowrap="nowrap" width="15%" align="right">开始时间</td>
			<td nowrap="nowrap" width="25%">
				<EF:EFInput blockId="inqu_status" ename="startTime" row="0" />
			</td>
			<td nowrap="nowrap" width="15%" align="right">结束时间</td>
			<td nowrap="nowrap">
				<EF:EFInput blockId="inqu_status" ename="endTime" row="0" />
			</td>
		  </tr>
		</table>
	</div>
</div>
  
<div id="ef_region_result" title="规则调用报表" style="overflow:scroll">
	<div id="ef_grid_result" title="规则调用报表列表" style="overflow: hidden;height:275px;">
	</div>
</div>


<EF:EFGrid blockId="result" autoDraw="no" readonly="true" enable="false">
	<EF:EFColumn ename="rulesetDescriptor" cname="规则集描述符" nullable="false"  minLength="1"/>
	<EF:EFColumn ename="startTime" cname="开始时间" enable="false" formatString="yyyy"/>
	<EF:EFColumn ename="endTime" cname="结束时间" enable="false" formatString="yyyy"/>
</EF:EFGrid>
<EF:EFRegion />
</form>

<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</body>
</html>