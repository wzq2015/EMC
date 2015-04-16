<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
	
<EF:EFPage>
<EF:EFHead>
	<EF:EFScript src="./EF/jQuery/jquery.js"/>
</EF:EFHead>
	
<body class="bodyBackground">
	<EF:EFForm formId = "EEDM19">
		<EF:EFButton ename="show_subpage" cname="显示子页面" />
		<EF:EFRegion regionId="subpage" etc="class=\"efwindow\"" style="width:510px;height:250px">
			<EF:EFRegion regionId="ef_region_sp_inqu" title="查询条件" >
				<EF:EFLayout col="2">
					<EF:EFInput bindId="sp_inqu_status-0-product" cname="产品"/>
					<EF:EFInput bindId="sp_inqu_status-0-spec" cname="规格"/>
					<EF:EFInput bindId="sp_inqu_status-0-amount" cname="金额不小于"/>
				</EF:EFLayout>
			</EF:EFRegion>
			
			<EF:EFRegion regionId="ef_region_sp_manage" title="公司产品管理" efRegionShowClear="false">
				<EF:EFGrid blockId="sp_result" autoDraw="yes" queryMethod="querySubpage" enable="false" ajax="true" style="toolBar:false">
				</EF:EFGrid>
			</EF:EFRegion>
		</EF:EFRegion>
		 
		<EF:EFRegion regionId="ef_region_result" title="公司产品信息维护"   efRegionShowClear="false">
		   <EF:EFRegion regionId ="ef_region_main">
			<input type="radio" id='radio1' name='radio1' value="0"  checked=true  onclick="initTree();">单选树</>
          	<input type="radio" id='radio2' name='radio1' value="1"  onclick="initTree();" >多选树</>
			<EF:EFLayout  col="2"  splitter="1,1" cols="180px,100%">
				<EF:EFTree id="nTree" model="eedm19TreeModel" text="公司产品树"  configFunc="configTree" style="overflow:auto; width:180px; height:100%;"/>
				
				<EF:EFPanel>
					<EF:EFRegion regionId="ef_region_inqu" title="查询条件" efRegionShowClear="true"> 
						<EF:EFInput blockId="inqu_status" ename="company" row="0" type="hidden" />
						<EF:EFLayout col="2">
							<EF:EFInput bindId="inqu_status-0-product" cname="产品"/>
							<EF:EFInput bindId="inqu_status-0-spec" cname="规格"/>
							<EF:EFInput bindId="inqu_status-0-amount" cname="金额不小于"/>
						</EF:EFLayout>
					</EF:EFRegion>
						
					<EF:EFRegion regionId="ef_region_manage" > 
						<EF:EFGrid blockId="result" autoDraw="yes" enable="true"  ajax="true" sumType="none" style="toolBar:false;modelXlsBar:true;initSelect:true">
							<EF:EFColumn ename="company" cname="公司" visible = "false" nullable="false"/>
							<EF:EFColumn ename="product" cname="产品" nullable="false" />
							<EF:EFColumn ename="contractID" fix="yes" cname="合同号" nullable="false" readonly="true" sumType="none"/>
					 		<EF:EFColumn ename="amount" cname="金额" width="230"/>
    					</EF:EFGrid>
					</EF:EFRegion>
				</EF:EFPanel>
			</EF:EFLayout>	
		   </EF:EFRegion>
		</EF:EFRegion>
		
		<EF:EFRegion regionId="selectColumn" etc="class=\"efwindow\"">
			<EF:EFRegion regionId="ef_region_sel_col" title="选择栏目" >
				<EF:EFTree model="eedm19TreeModel" id="nTree1" text="公司产品树" configFunc="configTree"/>
			</EF:EFRegion>
		</EF:EFRegion>
	</EF:EFForm>
</body>
</EF:EFPage>
