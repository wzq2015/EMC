<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<EF:EFPage>
	<EF:EFHead>
		<EF:EFScript src="./ED/MD/EDMD30.nestable.js" />
		<EF:EFScript src="./EF/Common/iplat.ui.xmlUtil.js" />

		<link type="text/css" href="./ED/MD/EDMD30.css" rel="stylesheet" />
		<style type="text/css">
.cf:after {
	visibility: hidden;
	display: block;
	font-size: 0;
	content: " ";
	clear: both;
	height: 0;
}

* html .cf {
	zoom: 1;
}

*:first-child+html .cf {
	zoom: 1;
}

html {
	margin: 0;
	padding: 0;
}

body {
	font-size: 100%;
	margin: 0;
	padding: 1.75em;
	font-family: 'Helvetica Neue', Arial, sans-serif;
}

h1 {
	font-size: 1.75em;
	margin: 0 0 0.6em 0;
}

a {
	color: #2996cc;
}

a:hover {
	text-decoration: none;
}

p {
	line-height: 1.5em;
}

.small {
	color: #666;
	font-size: 0.875em;
}

.large {
	font-size: 1.25em;
}
</style>
	</EF:EFHead>

	<body class="bodyBackground">
	<div id="ctrlWnd" title="选择控件" style="min-width:400px;max-widht:400px;min-height:300px;max-height:300px;display:none">
			</div>

		<EF:EFForm formId="EDFA02">
			<menu id="nestable-menu">
				<button type="button" data-action="expand-all">Expand All</button>
				<button type="button" data-action="collapse-all">Collapse
					All</button>
			</menu>
			<table id="efFormDesign" cellspacing="0" cellpadding="0" border="0"
				width="100%">
				<col align="left" width="50%" />
				<col align="left" width="50%" />
				<tbody>
					<tr>
						<td>
						<div style='height:600px;width:600px'>
							<div class="dd" id="efFormArch" style="width: 100%"></div>
							</div>
						</td>
						
						<td style="vertical-align: top">
						    <div id="propertyGrid"  style="display:none">
								<table id="tt" class="easyui-propertygrid" style="width:200px;">
								</table>
							</div>
						</td>
						<td style="vertical-align: top">
						<div>
						<textarea id='jspcode' style="height:600px;width:550px;font-size: 14px;font-family: 微软雅黑,宋体,Arial;color: olive;">
						</textarea>
						</div>
						</td>
					</tr>
				</tbody>
			</table>
			<p>
				<strong>Serialised Output (per list)</strong>
			</p>
			<textarea  id="nestable-output"></textarea>
			<textarea id="nestable2-output"></textarea>
			<p>&nbsp;</p>

			<br />
			<sdf></sdf>
			<div id='efFormLoad' icv='a'>
			<!--  
				<div tag="EF:EFPage" formid="EDFA02" id='d' >
				<div tag="EF:EFForm" formid="EDFA00" ename="page" cname="示例" eBlcokName="result" >
				</div>
				

				</div>
				-->
				
				<div tag="EF1:EFForm" formid="EDFA02">

					<div tag="EF1:EFLayout" row="2" col="1">
						<div tag="EF1:EFRegion" regionId="ef_region_inqu" title="查询条件"
							efRegionShowClear="true">
							<div tag="EF1:EFLayout" col="3">
								<div tag="EF1:EFInput" bindId="inqu_status-0-form_ename" cname="页面代号"
									style="text-transform : uppercase;"
									etc="validateType='string' "></div>
								<div tag="EF1:EFInput" bindId="inqu_status-0-form_cname" cname="页面中文"></div>
								<div tag="EF1:EFSelect" bindId="inqu_status-0-form_type" cname="页面类型">
									<div tag="EF1:EFOption" label="全部" value=""></div>
								     <div tag="EF1:EFOptions" conj="-" blockId="formTypeDesc"
												labelColumn="form_type_desc" valueColumn="form_type"></div>
								</div>
								<div tag="EF1:EFInput" bindId="inqu_status-0-rec_create_time_start"
									cname="记录创建起始时刻" popup="date" etc="maxLength='18' size='18'"></div>
								<div tag="EF1:EFInput" bindId="inqu_status-0-rec_create_time_end"
									cname="记录创建截止时刻" popup="date" etc="maxLength='18' size='18'"></div>
							</div>
						</div>

						<div tag="EF1:EFRegion" regionId="ef_region_result">
							<div tag="EF1:EFLayout" row="1" col="2" cols="50%,50%">

								<div tag="EF1:EFRegion" regionId="ef_region_fresult">

									<div tag="EF1:EFGrid" blockId="fresult" autoDraw="yes" readonly="false"
										ajax="true" style="initSelect:true">
										<div tag="EF1:EFComboColumn" ename="form_type" width="80"
											blockName="formTypeDesc" valueProperty="form_type"
											labelProperty="form_type_desc"
											formatString="#valueString#-#labelString#"></div>
										<div tag="EF1:EFColumn" ename="form_ename" width="60" fix="yes"></div>
										<div tag="EF1:EFColumn" ename="form_cname" width="200"></div>
										<div tag="EF1:EFColumn" ename="form_load_path" width="250"></div>
										<div tag="EF1:EFColumn" ename="module_ename_1" cname="一级模块"></div>
										<div tag="EF1:EFColumn" ename="module_ename_2" cname="二级模块"></div>
										<div tag="EF1:EFColumn" ename="rec_creator" enable="false"></div>
										<div tag="EF1:EFColumn" ename="rec_create_time" enable="false"></div>
										<div tag="EF1:EFColumn" ename="rec_revisor" enable="false"></div>
										<div tag="EF1:EFColumn" ename="rec_revise_time" enable="false"></div>

							  </div>
						  </div>

						   <div tag="EF1:EFRegion" regionId="ef_region_bresult">

											<div tag="EF1:EFGrid" blockId="bresult" autoDraw="yes" readonly="false"
												ajax="true" queryMethod="queryButton">
												<div tag="EF1:EFColumn" ename="form_ename" width="60" fix="yes"></div>

											</div>
										</div>
							</div>
						</div>
					</div>
					</div>
				</div>

		</EF:EFForm>
	</body>
</EF:EFPage>
