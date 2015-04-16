<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<EF:EFPage>
<EF:EFHead/>
<body class="bodyBackground">
<EF:EFForm formId = "EEDM08">
		<EF:EFRegion regionId="ef_region_inqu" title="查询条件" rowPos="1"  efRegionShowClear="true">
		<EF:EFRegion regionId="inqu"  style="overflow:hidden;width:100%" >
		  <EF:EFLayout col="2" cols="50%,50%">
			 <EF:EFInput bindId="inqu_status-0-companyName" cname="公司代号" />
		  </EF:EFLayout>
		  </EF:EFRegion>
		</EF:EFRegion>
	
			<EF:EFGrid blockId="result" autoDraw="no" readonly="true" style="navigationBar:true;operationBar:false" >
				<EF:EFColumn ename="companyCode" readonly="true" cname="公司代号" sort="true"/>
				<EF:EFColumn ename="companyName" cname="公司名称"/>
			</EF:EFGrid>
		 
		<EF:EFRegion regionId="ef_region_detail" title="明细区" rowPos="3"  style="overflow:scroll" efRegionShowClear="true">
		  <EF:EFRegion regionId="inqu"  style="overflow:hidden;width:100%" >
		 	<EF:EFLayout row="3" col="2" style="overflow:hidden;width:100%">
		 		<EF:EFInput bindId="company_detail-0-companyCode" cname="公司代号" rowPos="1" colPos="1"/>
		 		<EF:EFInput  blockId="company_detail" ename="preCode" row="0" type="hidden"  version="1.0" />
		 		<EF:EFInput bindId="company_detail-0-companyName" cname="公司名称" rowPos="1" colPos="2"/>
		 		<EF:EFInput bindId="company_detail-0-companyTel" cname="公司电话" rowPos="2" colPos="1"/>
		 		<EF:EFInput bindId="company_detail-0-companyAddr" cname="公司地址" rowPos="2" colPos="2"/>
		 		<EF:EFSelect bindId="company_detail-0-countryCode" rowPos="3" colPos="1" cname="国家">
		 			<EF:EFOptions blockId="country" conj="-" labelColumn="countryName" valueColumn="countryCode"/>
		 		</EF:EFSelect> 
		 		<EF:EFInput bindId="company_detail-0-companyDate" cname="成立日期" rowPos="3" colPos="2"/>
		 	</EF:EFLayout>
		 	</EF:EFRegion>
		 </EF:EFRegion> 
</EF:EFForm>
</body>
</EF:EFPage>
