<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EFNew" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<EFNew:EFPage >
<EFNew:EFHead/>
<body>
<EFNew:EFForm formId="EEDM01">
		<EFNew:EFRegion regionId="ef_region_inqu" title="查询条件" >
		  <EFNew:EFRegion regionId="content" style="overflow:hidden;width:100%" > <!-- 如果没有这一行，则区域中的样式出不来 -->
			<EFNew:EFLayout style="width:95%">
				<EFNew:EFInput bindId="inqu_status-0-companyCode" cname="公司代号" />
			</EFNew:EFLayout>
			</EFNew:EFRegion>
		</EFNew:EFRegion>	
			
			<EFNew:EFGrid blockId="result" autoDraw="yes" title="页面信息" style="overflow: hidden;height:275px;"/>
</EFNew:EFForm>

</body>
</EFNew:EFPage>
