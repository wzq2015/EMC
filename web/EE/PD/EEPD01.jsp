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
	<script type="text/javascript" src="./EE/PD/EEPD01.js"></script>	
	</head>  
  <body class="bodyBackground">
  <form  id="EEPD01"  method="post" action="<%=actionUrl%>">
  <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
	<div>
		  <table>
		  <tr>         
          <td nowrap width="15%"><%=I18nMessages.getText("label.EJPDJobCode","作业英文名") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="jobEname" row="0" etc="maxlength='50'"/>
          </td>
           <td nowrap width="15%"><%=I18nMessages.getText("label.EJPDJobDesc","作业中文名") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="jobCname" row="0" etc="maxlength='50'"/>
          </td>
        </tr>
		</table> 
	</div>
</div>

<div id = "ef_region_params" title="<%=I18nMessages.getText("label.EEPDParams","动态参数") %>" > 
	<div>
		<table>
		<tr>         
          <td nowrap width="20%"><%=I18nMessages.getText("label.EEPDDynamicParams","动态参数") %></td>
          <td nowrap width="80%">
            	<EF:EFInput blockId="dynamic_param" ename="dynamicParams" row="0" etc="maxlength='500' style='width:400'"/>
          </td>
        </tr>
        </table>
    </div>
</div> 

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EJPDInfo","作业信息") %>" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;height:200px;">
	</div> 
</div> 

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" ajax="false" >	
<EF:EFColumn ename="jobEname" cname='<%=I18nMessages.getText("label.EJPDJobCode","作业英文名") %>'  fix="yes" sort="true" maxLength="50" nullable="false" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJACWorkEname","作业英文名") %>' readonly="true"/>
<EF:EFColumn ename="jobCname" cname='<%=I18nMessages.getText("label.EJPDJobDesc","作业中文名") %>' maxLength="50" nullable="false" width="200"/>
<EF:EFColumn ename="jobParams" cname='<%=I18nMessages.getText("label.EJPDJobParams","业务逻辑参数") %>' nullable="false" maxLength="2000" width="350" />
<EF:EFColumn ename="maxConcurrentNumber" cname='<%=I18nMessages.getText("label.EJPDmaxconcurrentnumber","作业最大并发数") %>' nullable="false" maxLength="18" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJPDmaxconcurrentnumber","作业最大并发数") %>'/>
<EF:EFColumn ename="maxRequestNumber" cname='<%=I18nMessages.getText("label.EJPDmaxrequestnumber","作业最大接收数") %>' nullable="false" maxLength="18" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJPDmaxrequestnumber","作业最大接收数") %>'/>
<EF:EFColumn ename="maxExcuteTime" cname='<%=I18nMessages.getText("label.EJPDmaxexcutetime","作业最长执行时间") %>' nullable="false" maxLength="18" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJPDmaxconcurrentnumber","作业最长执行时间") %>'/>
<EF:EFColumn ename="persistent" visible="false" cname='<%=I18nMessages.getText("label.EJPDPersistent ","是否持久化") %>' nullable="true" maxLength="18" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJPDPersistent","是否持久化") %>' />
<EF:EFColumn ename="dynamicOperate" enable="false"  cname='<%=I18nMessages.getText("label.EEPDDynamicOperate","带动态参数运行") %>'/>
<EF:EFColumn ename="asyOperate" enable="false"  cname='<%=I18nMessages.getText("label.EJACAsyOperate","自助运行") %>'/>
<EF:EFColumn ename="viewJobQueue" enable="false"  cname='<%=I18nMessages.getText("label.EJPDJobQueue","查看排队情况") %>'/>
<EF:EFColumn ename="viewJobHistory" enable="false"  cname='<%=I18nMessages.getText("label.EJPDJobHistory","查看运行历史") %>'/>
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>   
  
  </body>
</html>
