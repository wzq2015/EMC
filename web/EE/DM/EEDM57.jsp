<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>

	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM57.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
    
  
</head>
<body class="bodyBackground">

<form id="EEDM01" method="POST" action="<%=actionUrl%>"  >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<script>
 $(document).ready(function(){

	 $( "#showInLine").datepicker();
	 localizeCalendar();
	 $( "#showInLine").datepicker("option",   $.datepicker.regional[""] );

	 /**   */
	 //设置时间格式
	 $('#inqu_status-0-companyDateTime').datetimepicker({
			//timeFormat: 'hh:mm z'
			//showTimezone: true,
			//ampm:true

			//timezoneList: [ 
			  // 			{ value: '-0500', label: '伦敦'}, 
			   	//		{ value: '-0600', label: '上海' }, 
			   		//	{ value: '-0700', label: '火星' }, 
			   			//{ value: '-0800', label: '月球' } 
			   		//]

			//hourGrid: 24
			//minuteGrid: 10
			//altField: "#inqu_status-0-alt"
				
				
			   	   		

		});

	 //$("#inqu_status-0-companyDateTime").datepicker("option","dateFormat","yy/mm/dd");
	 

	 

	 //selectNeighborDate();
 });

	$(function() {
		$( "#datepicker" ).datepicker();
		$( "#anim" ).change(function() {
			$( "#datepicker" ).datepicker( "option", "showAnim", $( this ).val() );
		});
	});

</script>

    <script type="text/javascript">
    $(function() {
        $("#btn").click(function() {
            //var a = $('a')[0];
            var a = $("<a href='http://www.baidu.com' target='_blank'>Apple</a>").get(0);
            
            var e = document.createEvent('MouseEvents');
            e.initEvent( 'click', true, true );
            a.dispatchEvent(e);
        });
    });
    
    </script>


<div id = "ef_region_inqu" title="EFInput控件展示" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
		    <td align="right" nowrap style="width:10%">
		        文本输入控件：
		    </td>
		    <td nowrap style="width:10%">
		    <EF:EFInput type="text" blockId="inqu_status"  ename="companyCode"  row="0" />
		    </td>
		    
		    <td align="right" nowrap style="width:10%">
		    EFTreeInput输入控件：
		    </td>
		    <td  nowrap style="width:10%">
		     <EF:EFTreeInput blockId="inqu_status" ename="companyCustomizeField" row="0"  modelName="EDPI12"
          		configFunc="myConfigTree" label="tree"  text="组织机构"  isRefresh="true"/>
		    </td>
		    
		    <td align="right" nowrap style="width:10%">
		    textarea输入控件：
		    </td>
		    <td  nowrap style="width:10%">
		    <EF:EFInput type="textarea" blockId="inqu_status1"  ename="companyCode"  row="0" />
		    </td>
		   </tr>
		   
		   <tr>
		    <td align="right" nowrap>
		    CheckBox输入控件：
		    </td>
		    <td >
		           苹果<EF:EFInput type="checkbox" blockId="inqu_status5"  ename="companyCode"  row="1" />
		          诺基亚<EF:EFInput type="checkbox" blockId="inqu_status5"  ename="companyCode"  row="1" />
		          三星<EF:EFInput type="checkbox" blockId="inqu_status5"  ename="companyCode"  row="1" />
		    </td>
		    
		    <td align="right" nowrap>
		    Radio输入控件：
		    </td>
		    <td >
		         苹果<EF:EFInput type="radio" blockId="inqu_status2"  ename="companyCode"  row="1" />
		          诺基亚<EF:EFInput type="radio" blockId="inqu_status2"  ename="companyCode"  row="1" />
		          三星<EF:EFInput type="radio" blockId="inqu_status2"  ename="companyCode"  row="1" />
		    </td>
		    
		    <td align="right" nowrap>
		    hidden输入控件：
		    </td>
		    <td >
		    <EF:EFInput type="hidden" blockId="inqu_status"  ename="companyCode"  row="0" />
		    </td>
		    </tr>  
		</table>
	</div>
</div>

<div id = "ef_region_inqu1"  title="日期控件展示" style="overflow:scroll">
<div style="overflow:hidden;width:100%">
		<table style="width:100%">
		  <tr>
		   <td align="left" nowrap style="width:5%">
		          日期控件：
		    </td>
		    <td nowrap style="width:10%;align:left" >
		    	<EF:EFInput blockId="inqu_status" ename="companyDate" row="0" popup="date" etc="maxLength='18' size='18'" />
		    </td>
		    <td align="left" nowrap style="width:10%">
		                  设置日期格式：
		    </td>
   		    <td nowrap style="width:10%;">
   		        
				<select id="format" onchange="setDateFormat()">
					<option value="mm/dd/yy"> mm/dd/yy</option>
					<option value="yy-mm-dd">yy-mm-dd</option>
					<option value="d M, y">d M, y</option>
					<option value="d MM, y">d MM, y</option>
					<option value="DD, d MM, yy">DD, d MM, yy</option>
					<option value="'day' d 'of' MM 'in the year' yy">With text - 'day' d 'of' MM 'in the year' yy</option>
				</select>
			 </td>
			 
			 
			 <td nowrap style="width:10%;"></td>
			 <td nowrap style="width:10%;"></td>
			 <td nowrap style="width:10%;"></td>
			 <td nowrap style="width:10%;"></td>
			 <td nowrap style="width:10%;"></td>
			 <td nowrap style="width:15%;"></td>

		    </tr>
		    
		    <tr>
		    <td  nowrap style="width:10%">
		       起止日期：
		    </td>
		     <td nowrap style="width:10%" >	  
		    	  <EF:EFDateStartEnd blockId="inqu_status1" startName="companyStartDate" endName="companyEndDate" row="1" etc="maxLength='10' size='10'" />
		    
		  </td>


		  </tr>
		  
   		 <tr >
            		  
 		   <td  nowrap style="width:10%">
		           双日期控件：
		    </td>
		     <td nowrap style="width:10%" >	  
		    	  <EF:EFDateSpan blockId="inqu_status12" startName="companyStartDate" endName="companyEndDate"  row="1" etc="maxLength='10' size='10'" />
		     </td>
		 </tr>
		 
            <tr>
   		    <td align="left" nowrap style="width:5%">
		          日期时间控件：
		    </td>
		    <td nowrap style="width:10%;align:left" >
		    	<EF:EFInput blockId="inqu_status" ename="companyDateTime" row="0" popup="datetime" etc="maxLength='18' size='18'" />
		    </td>
		    </tr>
		    
 	</table>
	</div>
</div>

<div id = "ef_region_inqu2"  title="EFSelect控件展示" style="overflow:scroll">
<div style="overflow:hidden;width:100%">
	  <table>
	    <tr>
		 <td nowrap width="100">EFOption展示</td>
          <td nowrap width="200">
            <EF:EFSelect blockId="inqu_status" ename="isproduced" row="0" etc="style='width:80'">
              <EF:EFOption label="" value="" />
              <EF:EFOption label="否" value="0" />
              <EF:EFOption label="是" value="1" />
            </EF:EFSelect>
           </td>
           <td nowrap width="150" align="right">
		   EFOptions展示
		    </td>
		    <td nowrap width="200" align="left">
		    <EF:EFSelect blockId="result" ename="made_country" row="0" etc=" class='pulldown' style='width:300px' " >
				<EF:EFOption value="" label="请选择"/>
				<EF:EFOptions blockId="result" valueColumn="dbid" 
					labelColumn="dbid2" conj="--"/>
			</EF:EFSelect>
		    </td>
		 </tr>
		 <tr>
		   <td nowrap width="150" align="left">
		   EFCodeOption展示
		    </td>
		   <td nowrap width="200" align="left">
		   <EF:EFSelect blockId="" row="" ename="testTableSelect" etc=" onChange=javascript:alert('etc') ">
	        <EF:EFCodeOption codeName="iplat.interfaceStyle" />
	        <EF:EFCodeOption codeName="iplat.shifou" conj="#"/>
            </EF:EFSelect>
		   </td>
		 </tr>
		    
 	</table>
	</div>
</div>
<div id = "ef_region_inqu3"  title="EFButton控件展示" style="overflow:scroll">
<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		   <td nowrap width="20%">
		    EFButton展示
		    </td>
		    <td nowrap >
		    	<EF:EFButton ename="button_ef" cname="按钮" />
		    </td>
		    </tr>
		    
 	</table>
	</div>
</div>

 <EF:EFRegion showTitle="yes"/>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>