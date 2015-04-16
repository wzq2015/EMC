<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
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
	<script type="text/javascript" src="./EJ/PD/EJPD02.js"></script>	
	</head>  
  <body class="bodyBackground">
  <form  id="EJPD02"  method="post" action="<%=actionUrl%>">
  <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
	<div>
		  <table>
		  <tr> 
		  <td nowrap width="15%"><%=I18nMessages.getText("label.EJPDJobNo","作业序号") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="jobNo" row="0" etc="maxlength='50'"/>
          </td>        
          <td nowrap width="15%"><%=I18nMessages.getText("label.EJPDJobCode","作业英文名") %></td>
          <td nowrap width="20%">
            <EF:EFSelect blockId="inqu_status" ename="jobEname" row="0" >
		      <EF:EFOptions blockId="job"  labelColumn="jobEname" valueColumn="jobEname"></EF:EFOptions>
		    </EF:EFSelect>
          </td>
          <!-- 
           <td nowrap width="15%"><%=I18nMessages.getText("label.EJPDJobDesc","作业中文名") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="jobCname" row="0" etc="maxlength='50'"/>
          </td>
           -->
        </tr>
		</table> 
	</div>
</div>

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EJPDInfo","作业信息") %>" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;height:500px;">
	</div>
	<div id="moveStep" align="right"> 
	移动至第<EF:EFInput blockId="" row="" ename="step" etc="size=8 validateType='positive_integer' nullable=false"/>条记录之前
	</div> 
	<EF:EFInput blockId="" row="" ename="queueName"  type="hidden"/>
</div> 

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" ajax="true" style="navigationBar:false;operationBar:false" >
<EF:EFColumn ename="seq" cname='<%=I18nMessages.getText("label.EJPDJobSeq","序号") %>' fix="yes" maxLength="50" width="50" readonly="true"/>	
<EF:EFColumn ename="jobNo" cname='<%=I18nMessages.getText("label.EJPDJobCode","作业序号") %>'  fix="yes" sort="true" maxLength="50" width="300" nullable="false"  readonly="true"/>	
<EF:EFColumn ename="jobEname" cname='<%=I18nMessages.getText("label.EJPDJobCode","作业英文名") %>'  fix="yes" sort="true" maxLength="50" nullable="false"  readonly="true"/>
<EF:EFColumn ename="jobCname" cname='<%=I18nMessages.getText("label.EJPDJobDesc","作业中文名") %>' maxLength="50" nullable="true" readonly="true"/>
<EF:EFColumn ename="jobParams" cname='<%=I18nMessages.getText("label.EJPDJobParams","业务逻辑参数") %>' nullable="false" maxLength="2000" width="300" readonly="true"/>
<EF:EFColumn ename="jobOperator" cname='<%=I18nMessages.getText("label.EJPDJobOperator","创建用户") %>' nullable="true" maxLength="40" readonly="true"/>
<EF:EFColumn ename="jobCreateTime" cname='<%=I18nMessages.getText("label.EJPDJobCreateTime","创建时间") %>' nullable="true" maxLength="40" width="120" readonly="true"/>
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>   
  
  </body>
</html>
