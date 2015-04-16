<!DOCTYPE html>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%  String actionUrl = request.getContextPath() + "/DispatchAction.do"; %>

<EF:EFPage>
<EF:EFHead >
<EF:EFScript src="./EE/DM/EEDM97.js"/>
<script type="text/javascript" src="./EE/DM/EEDM57.js"></script>
</EF:EFHead>

<body class="bodyBackground">

<EF:EFForm formId="EEDM9700">
<EF:EFRegion regionId="ef_Popup" etc="class=\"efwindow\"" style="overflow:hidden;display:none">
               <EF:EFLayout col="2">
                  <EF:EFPanel>详情</EF:EFPanel>
                  <EF:EFPanel><IMG src='EF\Images\efcalendar_close.gif' onclick='efwindow.hide();'/></EF:EFPanel>
                  <EF:EFLayout colSpan="2" col="2">
					<EF:EFInput bindId="inqu_block-0-product" cname="公司代号"/>
					<EF:EFPanel>
					<input class="buttonRegular" type="button" value="查询" onclick='button_subgrid_query_onclick();' />
					</EF:EFPanel>
				  </EF:EFLayout>
                 <EF:EFGrid  colSpan="2" blockId="company" title="页面信息" autoDraw="true" ajax="true" queryMethod="queryCompany" etc="style='overflow: hidden;height:300px;width:650px'"  />
                  <EF:EFPanel colSpan="2">	
		           <input  class='buttonRegular'  type=button value='保存' onclick='eedm02_popup_save_onclick();' />
		          </EF:EFPanel>
               </EF:EFLayout>	
          
</EF:EFRegion>


	<EF:EFRegion regionId="ef_region_inqu" title="查询条件" >
		 <EF:EFLayout  col="3"  >
			<EF:EFInput bindId="inqu_status-0-productCode" cname="产品代号" />
			<EF:EFInput bindId="inqu_status-0-productName" cname="产品名称" />
			<EF:EFInput popup="popup" bindId="inq-0-iplatDynamicSelect" cname="动态选择类型" ename="iplatDynamicSelect" readonly="false" shouldShowDeleteButton="true"
            			fieldId = "iplatDynamicSelect" valueProperty="FORM_ENAME" labelProperty="FORM_CNAME"
            			popupType = "DynamicGrid" visibleColumnNames = "FORM_ENAME,FORM_CNAME,FORM_TYPE"
            			visibleColumnDisplayNames = "页面英文名,页面中文名,页面类型"
            			backFillFieldIds="inqu_status-0-productCode,inqu_status-0-productName"
            			backFillColumnIds="FORM_ENAME,FORM_CNAME"
            			etc=" style='width:200px'"/>
		    <EF:EFSelect bindId="inqu_status-0-isproduced" cname="是否生产"   >
              <EF:EFOption label="" value="" />
              <EF:EFOption label="否" value="0" />
              <EF:EFOption label="是" value="1" />
		    </EF:EFSelect>
			<EF:EFInput popup="popup" bindId="inqu_status-0-companyCode" cname="公司代号(名称)" readonly="false" shouldShowDeleteButton="true" contentDivId="ef_Popup" labelProperty="companyName"/>
		    <EF:EFInput popup="popup" bindId="in-0-iplatSelectWithParam" cname="动态选择类型带查询" readonly = "true" shouldShowDeleteButton = "true"
            			fieldId = "iplatSelectWithParam" valueProperty="FORM_ENAME" labelProperty="FORM_CNAME" 
            			popupType = "DynamicGrid" visibleColumnNames = "FORM_ENAME,FORM_CNAME,FORM_TYPE"  etc=" title='动态选择类型带查询'"/>
		 <EF:EFDateSpan cname="合成日期" ratio="1:3.1" blockId="inqu_status2" startName="companyStartDate" endName="companyEndDate"  etc="maxLength='10' size='10'" row="2" />
		 </EF:EFLayout>
	</EF:EFRegion>
	
		<EF:EFGrid  blockId="result" autoDraw="no" readonly="false" title="页面信息" style="overflow: hidden;height:300px;">
			  	<EF:EFColumn ename="productCode" cname="产品代号"  width="120" />
                <EF:EFColumn ename="productName" cname="产品名称"  width="120" />
   		    	<EF:EFPopupColumn ename="companyCode" cname="公司代号(名称)(popup*)" labelProperty="companyName" contentDivId = "ef_Popup" sort="true" width="150" />
			    <EF:EFColumn ename="productPrice" cname="产品价格" sort="false" align="right" width="120" formatString="#,###,##0.00" />
			    <EF:EFComboColumn ename="isproduced" cname="是否生产" sort="true" align="center" width="80">
			      <EF:EFOption value="0" label="否" />
			      <EF:EFOption value="1" label="是" />
			    </EF:EFComboColumn>
			  	<EF:EFSubGridColumn ename="companyCode1" cname="公司代号(名称)(subgrid*)" valueProperty="companyCode"  labelProperty="companyName"
			                        sort="true" width="150" blockName="company" serviceName="EEDM97" queryMethod="getCompany" />
			    <EF:EFPopupColumn ename="companyCode1" cname="动态选择类型(popup*)"
			         fieldId = "iplatDynamicSelect" valueProperty="FORM_ENAME" labelProperty="FORM_CNAME"
			         popupType = "DynamicGrid" visibleColumnNames = "FORM_ENAME,FORM_CNAME,FORM_TYPE"
			         visibleColumnDisplayNames = "页面英文名,页面中文名,页面类型"
			         sort="true" width="150" backFillFieldIds="productCode,productName" backFillColumnIds="FORM_ENAME,FORM_CNAME"/>
						    
		</EF:EFGrid>

</EF:EFForm>
</body>
</EF:EFPage>
