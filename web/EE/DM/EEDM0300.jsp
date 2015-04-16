<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.soa.SoaConfig" %>
<%@page import="com.baosight.iplat4j.core.soa.SoaConstants" %>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext" %>
<%@page import="java.util.*" %>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
    String contextpath = request.getContextPath();
    String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<EF:EFPage>
<EF:EFHead>
 <EF:EFScript src="./EF/Form/EFFormPage.js"></EF:EFScript>
</EF:EFHead>
<body class="bodyBackground">
<EF:EFForm formId="EEDM0300">
  	<EF:EFRegion regionId="ef_region_inqu" title="查询条件"   >
  	  <EF:EFRegion regionId="inqu"  style="overflow:hidden;width:100%" >
		 <EF:EFLayout  col="1"  >
		  	<EF:EFInput bindId="inqu_status-0-productName" cname="产品名称" />
		 </EF:EFLayout>
	  </EF:EFRegion>
	</EF:EFRegion>	

	<EF:EFRegion regionId="ef_region_result" title="记录集"    >
	<EF:EFRegion regionId="result" style="overflow:hidden;width:100%"  >
		 <EF:EFLayout  col="2" style="width:70%"  >
			<EF:EFInput  bindId="result-0-productCode" cname="产品代号" />
			<EF:EFInput  bindId="result-0-productPrice" cname="产品价格" />
			
			<EF:EFInput  bindId="result-0-productName" cname="产品名称" type="textarea" trim="false" etc=" minLength=0  maxLength=32 validateType='chinese_string' onblur='efvalidateObj(this)'"/>
		    <EF:EFSelect bindId="result-0-companyCode" cname="所属公司"   >
			    <EF:EFOption label="选择公司代号" value="" />
			    <EF:EFOptions conj="-" blockId="company" labelColumn="companyName" valueColumn="companyCode"/>
		    </EF:EFSelect>

			<EF:EFInput  bindId="result-0-isproduced" cname="是否生产" type="checkbox"  />
		 </EF:EFLayout>
     </EF:EFRegion>
	           <EF:EFPageBar blockId="result" formId="EEDM0300" wrapDiv="pageBar"
	            methodName="query" ajax="true" serviceName="EEDM0300" etc="align='right'" >
	            </EF:EFPageBar>
	</EF:EFRegion>
</EF:EFForm>
</body>
</EF:EFPage>
