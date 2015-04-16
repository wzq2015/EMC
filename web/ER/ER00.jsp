
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
request.setCharacterEncoding("iso8859_1");	
String actionUrl = request.getContextPath() + "/DispatchAction.do";

List combo_source = new ArrayList();


combo_source.add( new EFComboBean("2", "excel模板") );
combo_source.add( new EFComboBean("1", "srt模板") );	
combo_source.add( new EFComboBean("3", "数巨报表模板") );	


request.setAttribute( "combobox_source", combo_source );

%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title></title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./ER/ER00.js"></script>
	
</head>
<body class="bodyBackground">

<form id="ER00" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>
<EF:EFInput blockId="" ename="type" row="" type="hidden" />
<EF:EFInput blockId="" ename="funcId" row="" type="hidden" />
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div id = "ef_div_inqu" style="overflow:hidden;width:100%">
		<table>
		  <tr nowrap>
		    <td nowrap>
		      报表标识
		    </td>
		    <td nowrap>
		      <EF:EFInput blockId="inqu_status" ename="reportId" row="0" />
		    </td>
		    <td nowrap>
		      报表归属
		    </td>
		    <td nowrap>
		      <EF:EFInput blockId="inqu_status" ename="reportBelongTo" row="0" />
                <img title="结点英文名列表" id="popupWindowId" 
                onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
				     onmouseover="this.style.cursor='hand'"" onClick="openReportBelongToSubGrid();" />
			</td>
		    <td nowrap>
		      报表版本号
		    </td>
		    <td nowrap>
		      <EF:EFInput blockId="inqu_status" ename="reportVersion" row="0" />
                <img title="结点英文名列表" id="popupWindowId2" 
                onload="efico.setImageSrc(this,'efform.efPopupWindow')" src="./EF/Images/eftree_blank.png"
				     onmouseover="this.style.cursor='hand'"" onClick="openReportVersionSubGrid();" />
		    </td>
		  </tr>
		  <tr nowrap>
		    <td nowrap>
		      报表有效日期
		    </td>
		    <td nowrap>
		      <EF:EFInput blockId="inqu_status" ename="reportAvalibelTime" row="0" popup="date"/>
		    </td>	

		    	    	  
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     
  
<a id='download' href='#'></a>  

<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" >
	<EF:EFColumn ename="reportId"  fix="yes" cname="报表标识" validateRegex="/^[A-Za-z0-9_]+$/" nullable="false" minLength="1" maxLength="10" validateErrorPrompt="报表标识只能由字母,数字,下划线组成!"/>
	<EF:EFColumn ename="reportName"  width="100" minLength="1" maxLength="255"/>
	<EF:EFSubGridColumn ename="reportBelongTo" cname="报表归属" blockName="result" fix="yes"
	    valueProperty="reportBelongTo" nullable ="false" serviceName="EPFunc" queryMethod="call" />
	    
	<EF:EFSubGridColumn ename="reportVersion" cname="版本" blockName="result" fix="yes"
	    valueProperty="reportVersion" nullable ="false" serviceName="EPFunc" queryMethod="call" width="40" />
	
	<EF:EFComboColumn ename="reportClassify" cname="报表分类" 
	                      valueProperty="value"  labelProperty="label"  width="150" formatString="#valueString#-#labelString#">
	    	<EF:EFOption value="1" label="固定类报表" />
	    	<EF:EFOption value="2" label="内部客户类报表" />
	    	<EF:EFOption value="3" label="主营类明细报表" />
	</EF:EFComboColumn>
	<EF:EFComboColumn ename="reportType" sourceName="combobox_source" valueProperty="value" labelProperty="label"/>
	<EF:EFColumn ename="reportStatus" cname="状态" width="40" enable="false"/>
	<EF:EFColumn ename="upload" cname="上传" width="40" enable="false"/>
	<EF:EFColumn ename="download" cname="下载" width="40" enable="false"/>	
	<EF:EFColumn ename="edit" cname="编辑" width="40" enable="false"/>	
	<EF:EFColumn ename="generate" cname="生成" width="40" enable="false"/>	
	<EF:EFColumn ename="reportBatchOrder" cname="批量生成顺序" width="100" maxLength="5" />
	<EF:EFColumn ename="formEname" cname="报表页面英文名" width="100" maxLength="8"/>
	<EF:EFColumn ename="reportStartTime" cname="报表启用日期" editType="date" dateFormat="yyyy/mm/dd" />
	<EF:EFColumn ename="reportStopTime" cname="报表停用日期" editType="date" dateFormat="yyyy/mm/dd" />
	<EF:EFColumn ename="reportLocker" cname="报表锁定者" readonly="true" width="120"/>	
</EF:EFGrid>      

<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
