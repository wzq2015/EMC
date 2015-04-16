<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<EF:EFPage>
<EF:EFHead />

	<body class="bodyBackground">

		<EF:EFForm formId="EDFA02">
			<EF:EFLayout row="2" col="1">
				<EF:EFRegion regionId="ef_region_inqu"  title="查询条件" efRegionShowClear="true">
					<EF:EFLayout col="3">
						<EF:EFInput bindId="inqu_status-0-form_ename" cname="页面代号"
							style="text-transform : uppercase;" etc="validateType='string' " />
						<EF:EFInput bindId="inqu_status-0-form_cname" cname="页面中文" />
						<EF:EFSelect bindId="inqu_status-0-form_type" cname="页面类型">
							<EF:EFOption label="全部" value="" />
							<EF:EFOptions conj="-" blockId="formTypeDesc"
								labelColumn="form_type_desc" valueColumn="form_type" />
						</EF:EFSelect>
						<EF:EFInput bindId="inqu_status-0-rec_create_time_start"
							cname="记录创建起始时刻" popup="date" etc="maxLength='18' size='18'" />
						<EF:EFInput bindId="inqu_status-0-rec_create_time_end"
							cname="记录创建截止时刻" popup="date" etc="maxLength='18' size='18'" />
					</EF:EFLayout>
				</EF:EFRegion>

				<EF:EFRegion regionId="ef_region_result">
					<EF:EFLayout row="1" col="2" cols="50%,50%">

						<EF:EFRegion regionId="ef_region_fresult" >

							<EF:EFGrid blockId="fresult" autoDraw="yes" readonly="false"
								ajax="true" style="initSelect:true">
								<EF:EFComboColumn ename="form_type" width="80"
									blockName="formTypeDesc" valueProperty="form_type"
									labelProperty="form_type_desc"
									formatString="#valueString#-#labelString#" />
								<EF:EFColumn ename="form_ename" width="60" fix="yes" />
								<EF:EFColumn ename="form_cname" width="200" />
								<EF:EFColumn ename="form_load_path" width="250" />
								<EF:EFColumn ename="module_ename_1" cname="一级模块" />
								<EF:EFColumn ename="module_ename_2" cname="二级模块" />
								<EF:EFColumn ename="rec_creator" enable="false" />
								<EF:EFColumn ename="rec_create_time" enable="false" />
								<EF:EFColumn ename="rec_revisor" enable="false" />
								<EF:EFColumn ename="rec_revise_time" enable="false" />

							</EF:EFGrid>
						</EF:EFRegion>

						<EF:EFRegion regionId="ef_region_bresult" >

						<EF:EFGrid blockId="bresult" autoDraw="yes" readonly="false"
							ajax="true" queryMethod="queryButton" >
							<EF:EFColumn ename="form_ename" width="60" fix="yes" />
							<EF:EFColumn ename="button_ename" width="60" fix="yes" />
							<EF:EFColumn ename="rec_creator" enable="false" />
							<EF:EFColumn ename="rec_create_time" enable="false" />
							<EF:EFColumn ename="rec_revisor" enable="false" />
							<EF:EFColumn ename="rec_revise_time" enable="false" />

						</EF:EFGrid>
						</EF:EFRegion>
					</EF:EFLayout>
				</EF:EFRegion>
			</EF:EFLayout>

		</EF:EFForm>

	</body>
</EF:EFPage>
