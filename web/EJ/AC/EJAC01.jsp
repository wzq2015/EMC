<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
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
	<script type="text/javascript" src="./EJ/AC/EJAC01.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EJAC01" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
	<div>
		  <table>
		  <tr>
          <td nowrap width="15%"><%=I18nMessages.getText("label.EJACWorkEname","作业英文名") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="workEname" row="0" etc="maxlength='50'"/>
          </td>
          <td nowrap width="15%"><%=I18nMessages.getText("label.EJACWorkCname","作业中文名") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="inqu_status" ename="workCname" row="0" etc="maxlength='50'"/>
          </td>
        </tr>
		</table> 
	</div>
</div>  


<div id = "ef_region_result" title="<%=I18nMessages.getText("label.EJACWorkInfomation","作业信息") %>" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;height:200px;">
	</div> 
</div>     

<div id = "ef_region_inqu1" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
	<div>
		  <table>
		  <tr>
		  <td nowrap width="15%"><%=I18nMessages.getText("label.EJACWorkEname","作业英文名") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="param_inqu_status" ename="workEname" row="0" etc="maxlength='50'"/>
          </td>
          <td nowrap width="15%"><%=I18nMessages.getText("label.EJACParamEname","参数英文名") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="param_inqu_status" ename="paramEname" row="0" etc="maxlength='50'"/>
          </td>
          <td nowrap width="15%"><%=I18nMessages.getText("label.EJACParamCname","参数中文名") %></td>
          <td nowrap width="20%">
            <EF:EFInput blockId="param_inqu_status" ename="paramCname" row="0" etc="maxlength='50'"/>
          </td>
        </tr>
		</table> 
	</div>
</div>  

<div id = "ef_region_param" title="<%=I18nMessages.getText("label.EJACParamInfomation","作业参数信息") %>" style="overflow:scroll"> 
	<div id = "ef_grid_param" title="<%=I18nMessages.getText("label.EFPageInfo","页面信息") %>" style="overflow: hidden;height:300px;">
	</div> 
</div>     
	
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" ajax="false" >	
<EF:EFColumn ename="workEname" cname='<%=I18nMessages.getText("label.EJACWorkEname","作业英文名") %>'  fix="yes" sort="true" maxLength="50" nullable="false" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJACWorkEname","作业英文名") %>' readonly="true"/>
<EF:EFColumn ename="workCname" cname='<%=I18nMessages.getText("label.EJACWorkCname","作业中文名") %>' maxLength="50" nullable="false"/>
<EF:EFColumn ename="serviceEname" cname='<%=I18nMessages.getText("label.EJACServiceEname","业务逻辑服务英文名") %>' nullable="false" maxLength="40" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJACServiceEname","业务逻辑服务英文名") %>'/>
<EF:EFColumn ename="methodEname" cname='<%=I18nMessages.getText("label.EJACMethodEname","业务逻辑方法英文名") %>' nullable="false" maxLength="18" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJACMethodEname","业务逻辑方法英文名") %>'/>
<EF:EFColumn ename="asyOperate" enable="false"  cname='<%=I18nMessages.getText("label.EJACAsyOperate","自助运行") %>'/>
</EF:EFGrid>
  
<EF:EFGrid blockId="param" autoDraw="yes" readonly="false" paintId="ef_grid_param" ajax="true" serviceName="EJAC01" queryMethod="queryParam">
<EF:EFComboColumn ename="workEname" cname='<%=I18nMessages.getText("label.EJACWorkEname","作业英文名") %>' fix="yes" blockName="work" 
                      valueProperty="workEname" labelProperty="workCname" width="100" formatString="#valueString#-#labelString#" nullable="false">
</EF:EFComboColumn>
<EF:EFColumn ename="paramEname" cname='<%=I18nMessages.getText("label.EJACParamEname","参数英文名") %>' fix="yes" sort="true"  maxLength="50" nullable="false" validateType="string" validateErrorPrompt='<%=I18nMessages.getText("label.EJACParamEname","参数英文名") %>' />    
<EF:EFColumn ename="paramCname" cname='<%=I18nMessages.getText("label.EJACParamCname","参数中文名") %>' maxLength="50" nullable="false" /> 
<EF:EFComboColumn ename="paramType" cname='<%=I18nMessages.getText("label.EJACParamType","参数类型") %>' width="100">
      <EF:EFOption value="C" label='<%=I18nMessages.getText("label.char","字符型") %>' />
      <EF:EFOption value="N" label='<%=I18nMessages.getText("label.number","数值型") %>' />
      <EF:EFOption value="D" label='<%=I18nMessages.getText("label.date","日期型") %>' />
</EF:EFComboColumn>
<EF:EFColumn ename="regex" cname='<%=I18nMessages.getText("label.EJACRegexValidation","正则表达式校验") %>' maxLength="100"  /> 	
</EF:EFGrid>  

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
