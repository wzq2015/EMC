
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title></title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./ER/ERTools.js"></script>
	<script type="text/javascript" src="./ER/ER21.js"></script>
</head>

<body class="bodyBackground">

<form id="ER21" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>

<EF:EFInput blockId="" ename="funcIdNow" row="" type="hidden" />

<EF:EFInput blockId="" ename="reportId" row="" type="hidden" />
<EF:EFInput blockId="" ename="reportBelongTo" row="" type="hidden"/>
<EF:EFInput blockId="" ename="reportVersion" row="" type="hidden"/>

<EF:EFInput blockId="" ename="efReturnId" row="" type="hidden" />

<EF:EFInput blockId="" ename="currentEditId" row="" type="hidden" />
<table width=100% cellpadding=0 cellspacing=0 >
  <tr>
    <td>
      <div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	    <div style="overflow:hidden;width:100%">
		  <table>
		    <tr>
		      <td nowrap width="15%">
		        函数名称:<EF:EFInput blockId="inqu_status" ename="funcId" row="0" />
		      </td>
		    </tr>
		  </table>
	    </div>
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <table cellpadding=0 cellspacing=0  width=100%>
        <tr>
          <td width=50% valign="top">
            <div id = "ef_region_result" title="函数信息" style="overflow:scroll"> 
	          <div id = "ef_grid_result" title="函数信息" style="overflow: hidden;">
	          </div> 
            </div> 
          </td>
          <td width=50% valign="top">
            <div id = "ef_region_para" title="参数信息" style="overflow:scroll" efRegionShowClear=true> 
              <div id = "ef_para_list" style="overflow:hidden;width:100%;height:300px;">
              </div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td>
      <div id = "ef_region_udf" title="自定义公式" style="overflow:scroll" efRegionShowClear=true> 
        <div style="overflow:hidden;width:100%">
          <table>
            <tr>
              <td width=100% valign="top">
                 自定义公式：<br>
                 <EF:EFInput blockId="" ename="userDefineFunction" row="" type="textarea" etc="cols='80' rows='5' warp='soft'"/>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </td>
  </tr>
</table>
  
<EF:EFRegion/>

<EF:EFGrid blockId="result" autoDraw="no" readonly="false" ajax="true">	
  <EF:EFColumn ename="funcId" width="150" fix="yes" />
  <EF:EFColumn ename="funcDesc" width="200"  />
</EF:EFGrid>   

<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
