<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<EF:EFPage >
<EF:EFHead/>
<body>
<EF:EFForm formId="EEEM05">
		<EF:EFTab tabId="ef_tab_y" lastRange="98.5%" eftabWidth="100%" version="2.0" >
			<EF:EFTabItem id="country" title="国家信息" eftabHeight="100px">
					<EF:EFRegion regionId="ef_region_inqu" title="查询条件">
					<EF:EFRegion regionId="inqu"  style="overflow:hidden;width:100%" >
						<EF:EFLayout col="3">
							<EF:EFInput bindId="inqu_status-0-countryCode" cname="国家代号"  />
							<EF:EFInput bindId="inqu_status-0-countryName" cname="国家名称" />
						</EF:EFLayout>
						</EF:EFRegion>
					</EF:EFRegion>
						<EF:EFGrid blockId="result" autoDraw="no" readonly="false" paintId="ef_grid_result" title="页面信息" ajax="true" style="overflow: hidden;height:275px;">
							<EF:EFColumn ename="countryCode" cname="国家代号" sort="true" fix="true" readonly="true" />
							<EF:EFColumn ename="countryName" cname="国家名称" />
							<EF:EFComboColumn ename="continentCode" cname="洲代号" blockName="continents" valueProperty="continentCode"
								labelProperty="continentName" width="200" formatString="#valueString#-#labelString#">
							</EF:EFComboColumn>
							<EF:EFColumn ename="view" cname="查看所有公司" />
						</EF:EFGrid>
			</EF:EFTabItem>
			<EF:EFTabItem id="company" title="公司信息" eftabHeight="200px" eftabSrc="">
				<EF:EFLayout >
					<EF:EFRegion regionId="ef_region_inqu_2" title="查询条件">
					<EF:EFRegion regionId="inqu"  style="overflow:hidden;width:100%" >
						<EF:EFLayout col="3">
							<EF:EFInput bindId="inqu_status-0-companyCode"
								cname="公司代号"/>
							<EF:EFInput bindId="inqu_status-0-companyName"
								cname="公司名称" />
							<EF:EFInput bindId="inqu_status-0-companyCountryCode"
								cname="国家代号" />
						</EF:EFLayout>
						</EF:EFRegion>
					</EF:EFRegion>

						<EF:EFGrid blockId="result" autoDraw="no" readonly="false" paintId="ef_grid_result_2"
							title="页面信息" ajax="true" serviceName="EEDM05" queryMethod="queryCompany" style="overflow: hidden;height:275px;">
							<EF:EFColumn ename="companyCode" cname="公司代号" sort="true" fix="true" readonly="true" />
							<EF:EFColumn ename="companyName" cname="公司名称" />
							<EF:EFColumn ename="companyTel" cname="公司电话" />
							<EF:EFColumn ename="companyAddr" cname="公司地址" />
							<EF:EFColumn ename="countryCode" cname="国家代号" />
							<EF:EFColumn ename="companyDate" cname="成立日期" editType="date" dateFormat="yyyy-mm-dd" />
							<EF:EFColumn ename="companyRegisterDate" cname="上市时间" editType="datetime"  width="150"/>
						</EF:EFGrid>
				</EF:EFLayout>
			</EF:EFTabItem>
		</EF:EFTab>
</EF:EFForm>
</body>
</EF:EFPage>
