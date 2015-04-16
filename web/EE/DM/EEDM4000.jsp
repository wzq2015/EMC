<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EFNew" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<EFNew:EFPage >
<EFNew:EFHead/>
<body>
<EFNew:EFForm formId="EEDM40">
		<EFNew:EFRegion regionId="ef_region_inqu" title="查询条件" >
		  <EFNew:EFRegion regionId="content" style="overflow:hidden;width:100%" > <!-- 如果没有这一行，则区域中的样式出不来 -->
			<EFNew:EFLayout col="2" style="width:95%">
				<EFNew:EFFlexBox row="0" ename="productCode" blockId="inqu_status" cname="产品代码" dataBlockId="dataBlock" displayValue="name" hiddenValue="id" displayAll="true" detailInfo="info" onSelect="select()"/>
				<EFNew:EFFlexBox row="0" ename="product2" blockId="inqu_status" cname="产品代码2"  serviceName="EEDM40" methodName="getData" dataBlockId="dataBlock" displayAll="true" initialValue="123" detailInfo="info"/>
			
				<EFNew:EFInput blockId="inqu_status" cname="检核标记" ename="validateId" row="0" />
				<EFNew:EFInput blockId="inqu_status" cname="父检核标记" ename="parentValidateId" row="0" />
				
				<EFNew:EFInput blockId="inqu_status" cname="消息号码" ename="messageId" row="0" />
				<EFNew:EFInput blockId="inqu_status" cname="业务逻辑服务英文名" ename="serviceEname" row="0" />
				
				<EFNew:EFInput blockId="inqu_status" cname="业务逻辑方法英文名" ename="methodEname" row="0" />
				<EFNew:EFInput bindId="inqu_status" cname="记录创建者" ename="recCreator" row="0"/>	
			</EFNew:EFLayout>
			</EFNew:EFRegion>
		</EFNew:EFRegion>	
			
		<EFNew:EFRegion regionId="ef_region_result" title="记录集">
		<EFNew:EFGrid blockId="result" autoDraw="yes" title="记录集" style="overflow: hidden;height:400px;"/>
		</EFNew:EFRegion>	
</EFNew:EFForm>

</body>
</EFNew:EFPage>
