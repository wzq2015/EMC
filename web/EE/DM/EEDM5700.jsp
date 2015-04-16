<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EFNew" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<EFNew:EFPage >
<EFNew:EFHead>

<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM57.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	

</EFNew:EFHead>

<body>

<EFNew:EFForm formId="EEDM57">
<script>
 $(document).ready(function(){

	 showMultipleMonths();
	 limitDateChoice();
	 associateDate();
	 $( "#showInLine").datepicker();
	 selectNeighborDate();
 });

	$(function() {
		$( "#datepicker" ).datepicker();
		$( "#anim" ).change(function() {
			$( "#datepicker" ).datepicker( "option", "showAnim", $( this ).val() );
		});
	});
</script>
		<EFNew:EFRegion regionId="ef_region_inqu" title="EFInput控件展示" >
		  <EFNew:EFRegion regionId="content" style="overflow:hidden;width:100%" > <!-- 如果没有这一行，则区域中的样式出不来 -->
			<EFNew:EFLayout col="3" style="width:95%">
				<EFNew:EFInput blockId="inqu_status" cname="文本输入控件" ename="companyCode" type="text" row="0" />
				<EFNew:EFInput blockId="inqu_status" cname="EFTreeInput输入控件"  configFunc="myConfigTree" modelName="EDPI12" label="tree" text="组织机构" isRefresh="true" popup="tree" ename="companyCustomizeField" row="0" />
				<EFNew:EFInput blockId="inqu_status1" cname="textarea输入控件" ename="companyCode" type="textarea" row="0" />
				
				<EFNew:EFLayout col="4" cols="40%,20%,20%,20%">
				<EFNew:EFRegion>CheckBox输入控件:</EFNew:EFRegion>
				<EFNew:EFInput blockId="inqu_status2" type="checkbox" cname="苹果" ename="companyCode" row="1" ratio="2:3"/>
				<EFNew:EFInput blockId="inqu_status2" type="checkbox" cname="诺基亚" ename="companyCode" row="1" ratio="3:2" />
				<EFNew:EFInput blockId="inqu_status2" type="checkbox" cname="三星" ename="companyCode" row="1" ratio="2:3" />
				</EFNew:EFLayout>
				
				<EFNew:EFLayout col="4" cols="40%,20%,20%,20%">
				<EFNew:EFRegion>Radio输入控件</EFNew:EFRegion>
				<EFNew:EFInput blockId="inqu_status2" type="radio" cname="苹果" ename="companyCode" row="1" ratio="2:3"/>
				<EFNew:EFInput blockId="inqu_status2" type="radio" cname="诺基亚" ename="companyCode" row="1" ratio="3:2" />
				<EFNew:EFInput blockId="inqu_status2" type="radio" cname="三星" ename="companyCode" row="1" ratio="2:3" />
				</EFNew:EFLayout>
				
				<EFNew:EFLayout col="2" >
				<EFNew:EFRegion>hidden输入控件</EFNew:EFRegion>
				<EFNew:EFInput blockId="inqu_status"  ename="companyCode" type="hidden" row="0" version="1.0" />
				</EFNew:EFLayout>
		   
				</EFNew:EFLayout>
			</EFNew:EFRegion>
		</EFNew:EFRegion>	
		
		<EFNew:EFRegion regionId="ef_region_inqu1" title="日期控件展示" >
			<EFNew:EFRegion regionId="content" style="overflow:hidden;width:100%" > <!-- 如果没有这一行，则区域中的样式出不来 -->
				<EFNew:EFLayout col="1" style="width:95%">
					<EFNew:EFLayout col="2" style="width:95%">
					<EFNew:EFInput blockId="inqu_status" cname="日期控件" ename="companyDate" popup="date" etc="maxLength='18' size='18'" row="0" ratio="3:2"/>
					<EFNew:EFSelect cname="设置日期格式：" blockId="format" >
						<EFNew:EFOption label="mm/dd/yy" value="mm/dd/yy" />
						<EFNew:EFOption label="yy-mm-dd" value="yy-mm-dd" />
						<EFNew:EFOption label="d M, y" value="d M, y" />
						<EFNew:EFOption label="d MM, y" value="d MM, y" />
						<EFNew:EFOption label="DD, d MM, y" value="DD, d MM, y" />
						<EFNew:EFOption label="With text - 'day' d 'of' MM 'in the year' yy" value="'day' d 'of' MM 'in the year' yy" />
					</EFNew:EFSelect>
					</EFNew:EFLayout>
				
				<EFNew:EFDateStartEnd cname="起止日期" ratio="1:3.1" blockId="inqu_status1" endName="companyEndDate" row="1" startName="companyStartDate" etc="maxLength='10' size='10'"/>
				
				<EFNew:EFDateSpan cname="合成日期" ratio="1:3.1" blockId="inqu_status2" startName="companyStartDate" endName="companyEndDate" row="2" etc="maxLength='10' size='10'" />
			    
				<EFNew:EFInput cname="日期控件:显示多个月" ratio="1:3.1" blockId="inqu_status" ename="multiDate" row="0" popup="date" etc="maxLength='18' size='18'" /> 
				
			    <EFNew:EFInput cname="日期控件:限制选定日期范围" ratio="1:3.1" blockId="inqu_status" ename="limitDate" row="0" popup="date" etc="maxLength='18' size='18'" /> 
			    
			    <EFNew:EFInput cname="日期控件:能选中相邻月份" ratio="1:3.1" blockId="inqu_status" ename="selectNeighborDate" row="0" popup="date" etc="maxLength='18' size='18'" /> 
			    
			    <EFNew:EFLayout col="2">
			    <EFNew:EFInput cname="日期控件:关联显示" ratio="1:1.6" blockId="inqu_status" ename="associateDate" row="0" popup="date" etc="maxLength='18' size='18'" /> 
			    <EFNew:EFInput cname="" blockId="alternate" type="text" />
			    </EFNew:EFLayout>
		  
				<EFNew:EFLayout col="2">
					<EFNew:EFInput cname="日期控件:动画效果" blockId="inqu_status" ename="animateDate" row="0" popup="date" etc="maxLength='18' size='18'" /> 
					<EFNew:EFSelect cname="" blockId="anim"  bindId="anim">
						<EFNew:EFOption label="Show (default)" value="show" />
						<EFNew:EFOption label="Slide down" value="slideDown" />
						<EFNew:EFOption label="Fade in" value="fadeIn" />
						<EFNew:EFOption label="Blind (UI Effect)" value="blind" />
						<EFNew:EFOption label="Bounce (UI Effect)" value="bounce" />
						<EFNew:EFOption label="Clip (UI Effect)" value="clip" />
						<EFNew:EFOption label="Drop (UI Effect)" value="drop" />
						<EFNew:EFOption label="Fold (UI Effect)" value="fold" />
						<EFNew:EFOption label="Slide (UI Effect)" value="slide" />
						<EFNew:EFOption label="None"   value="" />
					</EFNew:EFSelect>
				</EFNew:EFLayout>
				
			<EFNew:EFRegion regionId="showInLine"></EFNew:EFRegion>
				
				</EFNew:EFLayout>
			</EFNew:EFRegion>
		</EFNew:EFRegion>	
		
		
		<EFNew:EFRegion regionId="ef_region_inqu2" title="EFSelect控件展示" >
			<EFNew:EFRegion regionId="content" style="overflow:hidden;width:100%" > <!-- 如果没有这一行，则区域中的样式出不来 -->
				<EFNew:EFLayout col="2" style="width:95%">
					<EFNew:EFSelect cname="EFOption展示" blockId="inqu_status" ename="isproduced" row="0" etc="style='width:80'">
						<EFNew:EFOption label="" value="" />
						<EFNew:EFOption label="否" value="0" />
						<EFNew:EFOption label="是" value="1" />
					</EFNew:EFSelect>
				
					<EFNew:EFSelect cname="EFOptions展示" blockId="result" ename="made_country" row="0" etc=" class='pulldown' style='width:300px' ">
						<EFNew:EFOption label="请选择" value="" />
						<EFNew:EFOptions blockId="result" labelColumn="dbid2" valueColumn="dbid" conj="--"/>
					</EFNew:EFSelect>

					<EFNew:EFSelect cname="EFCodeOption展示" blockId="" row="" ename="testTableSelect" etc=" onChange=javascript:alert('etc') ">
						<EFNew:EFCodeOption codeName="iplat.interfaceStyle" />
						<EFNew:EFCodeOption codeName="iplat.shifou" conj="#" />
					</EFNew:EFSelect>		
			
				</EFNew:EFLayout>
			</EFNew:EFRegion>
		</EFNew:EFRegion>	
		
		<EFNew:EFRegion regionId="ef_region_inqu3" title="EFButton控件展示" >
			<EFNew:EFRegion regionId="content" style="overflow:hidden;width:100%" > <!-- 如果没有这一行，则区域中的样式出不来 -->
				<EFNew:EFLayout col="2" style="width:95%">
					<EFNew:EFRegion>EFButton展示
						<EFNew:EFButton cname="按钮" ename="button_ef"/>
					</EFNew:EFRegion>
				</EFNew:EFLayout>
			</EFNew:EFRegion>
		</EFNew:EFRegion>	
		
</EFNew:EFForm>

</body>
</EFNew:EFPage>
