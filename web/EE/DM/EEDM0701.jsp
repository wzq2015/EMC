<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<EF:EFPage>
<EF:EFHead/>
<body class="bodyBackground">
<EF:EFForm formId="EEDM07">
		<EF:EFRegion regionId="ef_region_inqu" title="查询条件">
			<EF:EFRegion regionId="inqu"  style="overflow:hidden;width:100%" >
			<EF:EFLayout >
				<EF:EFSelect bindId="inqu_status-0-continentCode" cname="州类型" ratio="1:18">
					<EF:EFOption label="全部" value="" />
					<EF:EFOptions blockId="continent" labelColumn="continentName" valueColumn="continentCode" />
				</EF:EFSelect>
			</EF:EFLayout>
			</EF:EFRegion>
		</EF:EFRegion>

			<EF:EFGrid blockId="result" autoDraw="yes" readonly="false" title="国家信息" ajax="true" style="overflow: hidden;height:200px;">
			</EF:EFGrid>

			<EF:EFGrid blockId="company" autoDraw="yes" readonly="false" ajax="true" title="公司信息" queryMethod="queryCompany" style="overflow: hidden;height:300px;">
			</EF:EFGrid>
			<EF:EFInput blockId="company_inqu_status" ename="countryCode" row="0" type="hidden" version="1.0" />
</EF:EFForm>
</body>
</EF:EFPage>
