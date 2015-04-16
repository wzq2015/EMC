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
	<script type="text/javascript" src="./EJ/PD/EJPD01.js"></script>	
	</head>  
  <body class="bodyBackground">
  <form  id="EJPD01"  method="post" action="<%=actionUrl%>">
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

<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EJPDInfo","作业信息") %>" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;height:400px;">
	</div> 
</div> 

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="false" readonly="false" ajax="true" >	
<EF:EFColumn ename="jobEname" cname='<%=I18nMessages.getText("label.EJPDJobCode","作业英文名") %>'  fix="yes" sort="true" maxLength="50" nullable="false" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJACWorkEname","作业英文名") %>' readonly="true"/>
<EF:EFColumn ename="jobCname" cname='<%=I18nMessages.getText("label.EJPDJobDesc","作业中文名") %>' maxLength="50" nullable="false" width="200"/>
<EF:EFColumn ename="jobParams" cname='<%=I18nMessages.getText("label.EJPDJobParams","业务逻辑参数") %>' nullable="false" maxLength="2000" width="350" />
<EF:EFColumn ename="maxConcurrentNumber" cname='<%=I18nMessages.getText("label.EJPDmaxconcurrentnumber","作业最大并发数") %>' nullable="false" maxLength="18" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJPDmaxconcurrentnumber","作业最大并发数") %>'/>
<EF:EFColumn ename="maxRequestNumber" cname='<%=I18nMessages.getText("label.EJPDmaxrequestnumber","作业最大接收数") %>' nullable="false" maxLength="18" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJPDmaxrequestnumber","作业最大接收数") %>'/>
<EF:EFColumn ename="maxExcuteTime" cname='<%=I18nMessages.getText("label.EJPDmaxexcutetime","作业最长执行时间") %>' nullable="false" maxLength="18" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJPDmaxconcurrentnumber","作业最长执行时间") %>'/>
<EF:EFColumn ename="persistent" cname='<%=I18nMessages.getText("label.EJPDPersistent ","是否持久化") %>' nullable="true" maxLength="18" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJPDPersistent","是否持久化") %>' visible="false" />
<EF:EFColumn ename="asyOperate" enable="false"  cname='<%=I18nMessages.getText("label.EJACAsyOperate","自助运行") %>' displayType="textbutton" width="85"/>
<EF:EFColumn ename="viewJobQueue" enable="false"  cname='<%=I18nMessages.getText("label.EJPDJobQueue","查看排队情况") %>' displayType="textbutton" width="110"/>
<EF:EFColumn ename="viewJobHistory" enable="false"  cname='<%=I18nMessages.getText("label.EJPDJobHistory","查看运行历史") %>' displayType="textbutton" width="110"/>
</EF:EFGrid>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
  </form>   
  
  </body>
</html>
