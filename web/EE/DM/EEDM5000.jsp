<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EFNew" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<EFNew:EFPage >
<EFNew:EFHead/>
<body>
<EFNew:EFForm formId="EEDM50">
		<EFNew:EFRegion regionId="ef_region_inqu" title="查询条件" >
		  <EFNew:EFRegion regionId="content" style="overflow:hidden;width:100%" > <!-- 如果没有这一行，则区域中的样式出不来 -->
			<EFNew:EFLayout col="2" style="width:95%">
				<EFNew:EFTreeGrid blockId=""></EFNew:EFTreeGrid>
				</EFNew:EFLayout>
			</EFNew:EFRegion>
		</EFNew:EFRegion>	
			
		<EFNew:EFRegion regionId="ef_region_result" title="记录集">
		<EFNew:EFGrid blockId="result" autoDraw="yes" title="记录集" style="overflow: hidden;height:400px;"/>
		</EFNew:EFRegion>	
</EFNew:EFForm>

</body>
</EFNew:EFPage>
