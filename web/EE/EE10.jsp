<!DOCTYPE html>

<%@ page pageEncoding="UTF-8" language="java" contentType="text/html;charset=UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="com.baosight.iplat4j.ef.ui.column.*" %>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:set var="inqu" value="${ei.blocks.inqu_data}" />

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<%
	List combo_source = new ArrayList();

	combo_source.add( new EFComboBean("SonyEricsson", "索尼爱立信") );
	combo_source.add( new EFComboBean("NOKIA", "诺基亚") );
	combo_source.add( new EFComboBean("Samsung", "三星") );
	combo_source.add( new EFComboBean("Philips", "飞利浦") );

	request.setAttribute( "combobox_source", combo_source );
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/EE10.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>

</head>

<body class="bodyBackground">
<form method="POST" action="<%=listUrl%>">

  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
  <div id = "ef_region_inqu" title="查询条件" efRegionShowClear="true">
    <div>
      <table style="width:100%">
        <tr>
          <td align="right" nowrap style="width:5%">产品代号：</td>
          <td style="width:8%">
            <input type="textarea" name="inqu_data-0-product_id" value="${inqu.rows[0].product_id}" class = "inputField" />
          </td>
          <td align="right" nowrap style="width:5%">公司名称：</td>
          <td nowrap style="width:20%">
            <input type="text" name="inqu_data-0-company_name" value="${inqu.rows[0].company_name}" class = "inputField" />
          </td>
        </tr>
        <tr>
          <td align="right" >产地：</td>
          <td>
            <input type="text" name="inqu_data-0-made_country" value="${inqu.rows[0].made_country}" class = "inputField" />
          </td>
          <td align="right" nowrap>价格大于：&nbsp;
            <input type="text" name="inqu_data-0-price_low" value="${inqu.rows[0].price_low}" class = "inputField" />
            &nbsp;小于：&nbsp;<input type="text" name="inqu_data-0-price_high" value="${inqu.rows[0].price_high}" class = "inputField" />
          </td>


        </tr>
      
<!--
		<div id="nMenu" nowrap class='buttonRegular' onClick="button_nMenu_onclick();" height=40 >
			<span style='CURSOR: hand;'  >&nbsp;右键菜单&nbsp;</span>
		</div>		-->
		 
      </table>
    </div>
  </div>



  <div id = "ef_region_result" title="记录集" style="overflow:scroll">
    <div id = "ef_grid_s" title="页面信息" style="overflow: hidden;height:300px;"></div>
  </div>

  <EF:EFRegion/>

  <EF:EFGrid blockId="result" frontSort="true" autoDraw="yes" readonly="false" ajax="false" paintId="ef_grid_s" style="personalBar:true;modelXlsBar:true;">
    <EF:EFComboColumn ename="company_name" cname="公司名称" sourceName="combobox_source" sort="true"
                      valueProperty="value"  labelProperty="label"  width="150" formatString="#valueString#-#labelString#">
    	<EF:EFOption value="Motorola" label="摩托罗拉" />
    </EF:EFComboColumn>

    <EF:EFSubGridColumn ename="made_country" cname="产地" blockName="country" sort="true"
    	                  valueProperty="country_ename" nullable ="false" serviceName="EE10" queryMethod="getCountry" />

    <EF:EFColumn ename="price" cname="价格" sort="true" formatString="#,###,##0.000" validateType="positive_number" nullable="true"/>

    <EF:EFColumn ename="sale_date" canPersonal="false" cname="上市日期" editType="date" dateFormat="yyyy-mm-dd" />

    <EF:EFColumn ename="company_page" cname="公司首页" displayType="hyperlink" validateType="http_url" minLength="10" maxLength="255" nullable="true"/>

    <EF:EFColumn ename="search" cname="Google" displayType="textbutton" readonly="true" align="center" />

    <EF:EFColumn ename="validate_0" cname="手机校验" validateType="mobile_phone" nullable="true"/>
    <EF:EFColumn ename="validate_1" cname="Email校验" validateType="email" defaultValue="abc@baosight.com" />
    <EF:EFColumn ename="validate_2" cname="文本" width="200" nullable="true" editType="textarea" />
    <EF:EFColumn ename="validate_3" cname="电话(含区号)" validateType="phone_with_area_code" nullable="true" />
    <EF:EFColumn ename="validate_4" cname="非负整数" validateType="nonnegative_integer" nullable="true" />
    <EF:EFColumn ename="validate_5" cname="树选择" editType="newwindow" nullable="true" />
    <EF:EFColumn ename="validate_6" cname="图标显示" displayType="image" nullable="true" />
    <EF:EFColumn ename="validate_7" cname="IP地址" validateType="ip_address" nullable="true" />
    <EF:EFColumn ename="validate_8" cname="中文字符串" validateType="chinese_string" nullable="true" visible="false" />
    <EF:EFColumn ename="validate_9" cname="用户自定义" validateRegex="/^[A-Z]{2}[A-Z]*([0-9]{2}|[0-9]{4})$/" nullable="true" minLength="4" maxLength="8" validateErrorPrompt="不符合平台模块名规范" />

    <EF:EFColumn ename="other" cname="其他" />

  </EF:EFGrid>

<!-- 代码展示  -->
<div id = "ef_region_codeDemo" title="示例代码">
<div id="ef_tab_x"  lastRange="99%" eftabType="efRoundDivTab">
	<div id="jsp" title="JSP 源代码" >
	<textarea  name="code" class="html">
  &lt;div id = "ef_region_inqu" title="查询条件" efRegionShowClear="true"&gt;
    &lt;div&gt;
      &lt;table&gt;
        &lt;tr&gt;
          &lt;td nowrap width="25%"&gt;产品代号：&lt;/td&gt;
          &lt;td nowrap width="25%"&gt;
            &lt;input type="textarea" name="inqu_data-0-product_id" value="${inqu.rows[0].product_id}" class = "inputField" /&gt;
          &lt;/td&gt;
          &lt;td nowrap width="25%"&gt;公司名称：&lt;/td&gt;
          &lt;td nowrap width="25%"&gt;
            &lt;input type="text" name="inqu_data-0-company_name" value="${inqu.rows[0].company_name}" class = "inputField" /&gt;
          &lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
          &lt;td nowrap width="25%"&gt;产地：&lt;/td&gt;
          &lt;td nowrap width="25%"&gt;
            &lt;input type="text" name="inqu_data-0-made_country" value="${inqu.rows[0].made_country}" class = "inputField" /&gt;
          &lt;/td&gt;
          &lt;td nowrap width="50%" colspan="2"&gt;价格大于&nbsp;
            &lt;input type="text" name="inqu_data-0-price_low" value="${inqu.rows[0].price_low}" class = "inputField" /&gt;
            &nbsp;小于&nbsp;&lt;input type="text" name="inqu_data-0-price_high" value="${inqu.rows[0].price_high}" class = "inputField" /&gt;
          &lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
		   &lt;td&gt;
		  &lt;/td&gt;
        &lt;/tr&gt;
      &lt;/table&gt;
    &lt;/div&gt;
  &lt;/div&gt;



  &lt;div id = "ef_region_result" title="记录集" style="overflow:scroll"&gt;
    &lt;div id = "ef_grid_s" title="页面信息" style="overflow: hidden;height:300px;"&gt;&lt;/div&gt;
  &lt;/div&gt;

  &lt;EF:EFRegion/&gt;

  &lt;EF:EFGrid blockId="result" frontSort="true" autoDraw="yes" readonly="false" ajax="false" paintId="ef_grid_s" style="personalBar:true;modelXlsBar:true;"&gt;
    &lt;EF:EFComboColumn ename="company_name" cname="公司名称" sourceName="combobox_source" sort="true"
                      valueProperty="value"  labelProperty="label"  width="150" formatString="#valueString#-#labelString#"&gt;
    	&lt;EF:EFOption value="Motorola" label="摩托罗拉" /&gt;
    &lt;/EF:EFComboColumn&gt;

    &lt;EF:EFSubGridColumn ename="made_country" cname="产地" blockName="country" sort="true"
    	                  valueProperty="country_ename" nullable ="false" serviceName="EE10" queryMethod="getCountry" /&gt;

    &lt;EF:EFColumn ename="price" cname="价格" sort="true" formatString="#,###,##0.000" validateType="positive_number" nullable="true"/&gt;

    &lt;EF:EFColumn ename="sale_date" canPersonal="false" cname="上市日期" editType="date" dateFormat="yyyy-mm-dd" /&gt;

    &lt;EF:EFColumn ename="company_page" cname="公司首页" displayType="hyperlink" validateType="http_url" minLength="10" maxLength="255" nullable="true"/&gt;

    &lt;EF:EFColumn ename="search" cname="Google" displayType="textbutton" readonly="true" align="center" /&gt;

    &lt;EF:EFColumn ename="validate_0" cname="手机校验" validateType="mobile_phone" nullable="true"/&gt;
    &lt;EF:EFColumn ename="validate_1" cname="Email校验" validateType="email" defaultValue="abc@baosight.com" /&gt;
    &lt;EF:EFColumn ename="validate_2" cname="文本" width="200" nullable="true" editType="textarea" /&gt;
    &lt;EF:EFColumn ename="validate_3" cname="电话(含区号)" validateType="phone_with_area_code" nullable="true" /&gt;
    &lt;EF:EFColumn ename="validate_4" cname="非负整数" validateType="nonnegative_integer" nullable="true" /&gt;
    &lt;EF:EFColumn ename="validate_5" cname="树选择" editType="newwindow" nullable="true" /&gt;
    &lt;EF:EFColumn ename="validate_6" cname="图标显示" displayType="image" nullable="true" /&gt;
    &lt;EF:EFColumn ename="validate_7" cname="IP地址" validateType="ip_address" nullable="true" /&gt;
    &lt;EF:EFColumn ename="validate_8" cname="中文字符串" validateType="chinese_string" nullable="true" visible="false" /&gt;
    &lt;EF:EFColumn ename="validate_9" cname="用户自定义" validateRegex="/^[A-Z]{2}[A-Z]*([0-9]{2}|[0-9]{4})$/" nullable="true" minLength="4" maxLength="8" validateErrorPrompt="不符合平台模块名规范" /&gt;

    &lt;EF:EFColumn ename="other" cname="其他" /&gt;

  &lt;/EF:EFGrid&gt;
	</textarea>
</div>
<div id="javascript" title="Javasript 源代码" >
	<textarea name="code" class="javascript">
efform_onload = function(){
	var grid = efgrid.getGridObject("ef_grid_s");
	grid.addMenuItem("", {label:"test", parent:"", text:"测试", leaf:"1" ,imgSrc:EF_IMAGES_PATH+"efgrid_front_desc.gif"} );
	grid.addMenuItem("", {label:"test1", parent:"", text:"测试1", leaf:"0" } );
	grid.addMenuItem("test1", {label:"test2", parent:"test1", text:"测试2", leaf:"1" ,imgSrc:EF_IMAGES_PATH+"efgrid_front_desc.gif"} );
	efregion.show("ef_region_codeDemo");
	efregion.toggleShow("ef_region_codeDemo");
}


button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_s", "ee","EE10","query");
}

button_save_onclick = function ()
{
	efgrid.submitForm( "ef_grid_s", "ee","EE10","update",true );
}

button_remove_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_s", "ee","EE10","delete", true );
}

button_create_onclick = function ()
{
	efgrid.submitForm( "ef_grid_s", "ee","EE10","insert",true );
}

function efgrid_onRowDblClicked(gridId,row_index){

	if(gridId == "ef_grid_s")
		alert("double"+gridId + ":::"+row_index);
	else if(gridId == "_ef_grid_subgrid"){

			var sub_grid = efform.getGrid( "_ef_grid_subgrid" );
			var index = sub_grid.getCurrentRowIndex();
			if( index < 0 ) {
				alert( "未选择记录" );
				return;
			}

			var div_node = efform.getSubGridDiv();
			var column = div_node.efDisplayingCol;
			var cell_value = sub_grid.getBlockData().getCell( index, column.getValueProperty() );
			efwindow.setValue( cell_value );
	}
}

var test = function (){
	alert('hello');

}



button_nMenu_onclick = function(){
	  $('#nMenu').append( nMenu.render()) ;
}

function efgrid_onExport_modleXls (gridId){
	alert(gridId);
}

gridmenu_test_onclick = function(gridId,label,row_index,col_index,data_type){
	alert("gridId:"+gridId+"#"+"label:"+label+"#"+"row_index:"+row_index+"#"+"col_index:"+col_index+"#"+"data_type:"+data_type);
}
gridmenu_test1_onclick = function(gridId,label,row_index,col_index,data_type){
	alert("gridId:"+gridId+"#"+"label:"+label+"#"+"row_index:"+row_index+"#"+"col_index:"+col_index+"#"+"data_type:"+data_type);
}
gridmenu_test2_onclick = function(gridId,label,row_index,col_index,data_type){
	alert("gridId:"+gridId+"#"+"label:"+label+"#"+"row_index:"+row_index+"#"+"col_index:"+col_index+"#"+"data_type:"+data_type);
}

	</textarea>
 </div>
 </div>
<EF:EFTab tabId="x" action="fundiv"/>

<script type="text/javascript">
	dp.SyntaxHighlighter.HighlightAll('code');
</script>
</div>
  <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>

</form>

</body>
</html>
