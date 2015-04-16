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
	<script type="text/javascript" src="./EJ/PD/EJPD03.js"></script>	
	</head>  
  <body class="bodyBackground">
  <form  id="EJPD03"  method="post" action="<%=actionUrl%>">
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
            <EF:EFSelect blockId="inqu_status" ename="jobEname" row="0" etc="style='width=145'">
              <EF:EFOption label="请选择" value=""></EF:EFOption>
		      <EF:EFOptions blockId="job"  labelColumn="jobEname" valueColumn="jobEname"></EF:EFOptions>
		    </EF:EFSelect>
          </td>
          <td nowrap width="15%"><%=I18nMessages.getText("label.EJPDJobState","作业状态") %></td>
          <td nowrap width="20%">
            <EF:EFSelect blockId="inqu_status" ename="jobState" row="0" >
            	<EF:EFOption label="----------全部---------" value="" />
			    <EF:EFOption label="End 正常结束" value="End" />
			    <EF:EFOption label="Running 正在执行" value="Running" />
			    <EF:EFOption label="Failed 执行失败" value="Failed" />
			    <EF:EFOption label="Timeout 执行超时" value="Timeout" />
		    </EF:EFSelect>
          </td>
          <!-- 
           <td nowrap width="15%"><%=I18nMessages.getText("label.EJPDJobDesc","作业中文名") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="jobCname" row="0" etc="maxlength='50'"/>
          </td>
           -->
        </tr>
        <tr> 
		  <td nowrap width="15%"><%=I18nMessages.getText("label.StartTimeFrom","任务起始时间始") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" popup="date"  ename="startTimeFrom" row="0" etc="maxlength='50'"/>
          </td>
          <td nowrap width="15%"><%=I18nMessages.getText("label.StartTimeTo","任务起始时间末") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" popup="date"  ename="startTimeTo" row="0" etc="maxlength='50'"/>
          </td>
        </tr>
          <tr> 
		  <td nowrap width="15%"><%=I18nMessages.getText("label.EndTimeFrom","任务结束时间始") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" popup="date"  ename="endTimeFrom" row="0" etc="maxlength='50'"/>
          </td>
          <td nowrap width="15%"><%=I18nMessages.getText("label.EndTimeTo","任务结束时间末") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" popup="date"  ename="endTimeTo" row="0" etc="maxlength='50'"/>
          </td>
        </tr>        
		</table> 
	</div>
</div>

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EJPDInfo","作业信息") %>" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;height:300px;">
	</div>
	<EF:EFInput blockId="" row="" ename="queueName"  type="hidden"/>
</div> 

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" readonly="false" ajax="true" >
<EF:EFColumn ename="jobNo" cname='<%=I18nMessages.getText("label.EJPDJobCode","作业序号") %>'  fix="yes" sort="true" maxLength="50" width="300" nullable="false"  readonly="true"/>	
<EF:EFColumn ename="jobEname" cname='<%=I18nMessages.getText("label.EJPDJobCode","作业英文名") %>'  fix="yes" sort="true" maxLength="50" nullable="false"  readonly="true"/>
<EF:EFColumn ename="jobCname" cname='<%=I18nMessages.getText("label.EJPDJobDesc","作业中文名") %>' maxLength="50" nullable="true" readonly="true"/>
<EF:EFColumn ename="jobOperator" cname='<%=I18nMessages.getText("label.EJPDJobOperator","创建用户") %>' nullable="true" maxLength="40" readonly="true"/>
<EF:EFColumn ename="jobStarttime" cname='<%=I18nMessages.getText("label.EJPDJobStarttime","创建时间") %>' nullable="true" maxLength="40" width="120" readonly="true"/>
<EF:EFColumn ename="jobEndtime" cname='<%=I18nMessages.getText("label.EJPDJobEndtime","结束时间") %>' nullable="true" maxLength="40" width="120" readonly="true"/>
<EF:EFColumn ename="jobTotalTime" cname='<%=I18nMessages.getText("label.EJPDJobTotalTime","执行时间(s)") %>' nullable="true" maxLength="40" width="120" readonly="true"/>
<EF:EFColumn ename="jobState" cname='<%=I18nMessages.getText("label.EJPDJobState","执行状态") %>' nullable="true" maxLength="40" width="120" readonly="true"/>
<EF:EFColumn ename="jobMsg" cname='<%=I18nMessages.getText("label.jobMsg","返回消息") %>' nullable="true" maxLength="40" width="120" editType="textarea" readonly="true"/>
<EF:EFColumn ename="jobData" cname='<%=I18nMessages.getText("label.jobData","作业数据") %>' visible="false" />
<EF:EFColumn ename="reStrart" enable="false"  cname='<%=I18nMessages.getText("label.ReStart","操作") %>'/>
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>   
  
  </body>
</html>
