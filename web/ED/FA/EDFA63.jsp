<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<style>
.cssArea {
	width: 100%;
	height: 200px;
}

.cssFrame {
	width: 98%;
	height: 2000px;
}
</style>

<EF:EFPage>
	<EF:EFHead />

	<body class="bodyBackground">

		<EF:EFForm formId="EDFA63">
			<EF:EFLayout row="2" col="1">
				<EF:EFRegion regionId="ef_region_toolbar">
					<EF:EFInput ename="css_file" cname="样式文件名" style="width:400px;"></EF:EFInput>
				</EF:EFRegion>
				<EF:EFRegion regionId="ef_region_css">
					<textarea id="cssModal" class="cssArea">sdfsdf</textarea>
				</EF:EFRegion>

			</EF:EFLayout>

		<iframe id="cssFrame" name="cssFrame"
			class="cssFrame ef-region-border" src="./EU/jQueryUI/index.html"
			frameBorder="0" scrolling="auto"> </iframe>
		</EF:EFForm>

	</body>
</EF:EFPage>
