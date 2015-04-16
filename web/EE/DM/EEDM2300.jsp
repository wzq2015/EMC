<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EFNew" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<EFNew:EFPage >
<EFNew:EFHead/>
<body>
<EFNew:EFForm formId="EEDM23">
		<EFNew:EFRegion regionId="ef_region_inqu" title="查询条件" >
		  <EFNew:EFRegion regionId="content" style="overflow:hidden;width:100%" > <!-- 如果没有这一行，则区域中的样式出不来 -->
			<EFNew:EFLayout style="width:95%">
				<EFNew:EFInput bindId="inqu_status-0-double1" cname="数据一" />
			</EFNew:EFLayout>
			</EFNew:EFRegion>
		</EFNew:EFRegion>	
			
			<EFNew:EFGrid blockId="result" autoDraw="yes" title="记录集" style="overflow: hidden;height:275px;"/>
		<EFNew:EFRegion regionId="ef_region_link" title="页面展示按钮" >
		</EFNew:EFRegion>
		<EFNew:EFRegion regionId="ef_region_linkdesc" title="页面帮助及链接" >
		</EFNew:EFRegion>
</EFNew:EFForm>

</body>
</EFNew:EFPage>
