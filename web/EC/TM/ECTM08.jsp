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
	<script type="text/javascript" src="./EC/TM/ECTM08.js"></script>
</head>
<body class="bodyBackground">

<form id="ECTM08" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<!-- 
     <div id="subpage" class="efwindow" style="width:510px;height:100px">
   
	   <div id = "ef_region_element_result" title="可替换元素维护" efRegionShowClear=false>
	   <div style="overflow:hidden;width:100%">
		<table>
		 <tr>
		 <td>
		    可替换元素
		 </td>
		 <td>
		   <EF:EFSelect blockId="element_result" ename="code" row="0" etc="onchange='element_detail()'">
				<EF:EFOption label="可替换元素" value=""/>
				<EF:EFOptions blockId="element_result" labelColumn="elementName" valueColumn="elementCode"></EF:EFOptions>
		   </EF:EFSelect>
		 </td>
		 </tr>
		  <tr>
		    <td nowrap width="15%">
		      替换元素名称
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="element_result" ename="elementName" row="0" />
		    </td>
		    <td nowrap width="15%">
		      替换元素代码
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="element_result" ename="elementCode" row="0" />
		    </td>
		  </tr>
		</table>
		</div>                       
	</div>
	 
   </div>
   -->
<div id = "ef_region_all" title="样式维护" efRegionShowClear=false>
	<div id="ef_region_main">
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	    <td id="leftTree" vAlign="top" height="100%" width="24%" style="">
			  <div style="border:#ffffff 1px solid;">
				<div id="leftTreeDiv" style='overflow:auto; height:576; border:#bbbbbb 1px solid; background-color:#FFFFFF'>
				    <!-- 树枝必须长在树根上 -->
				    <EF:EFTreeModel id="tModel">
					  <EF:EFTemplate id="NewsSite">
						<EF:EFLeaf label="2" text="栏目链接样式"></EF:EFLeaf>
						<EF:EFLeaf label="3" text="标题链接样式"></EF:EFLeaf>
						<EF:EFLeaf label="4" text="当前位置样式"></EF:EFLeaf>
						<EF:EFLeaf label="5" text="文章正文样式"></EF:EFLeaf>
						<EF:EFLeaf label="7" text="相关文章样式"></EF:EFLeaf>
						<EF:EFLeaf label="6" text="公告样式"></EF:EFLeaf>
						<EF:EFLeaf label="9" text="搜索记录样式"></EF:EFLeaf>
						<EF:EFLeaf label="91" text="搜索翻页样式"></EF:EFLeaf>
						<EF:EFLeaf label="92" text="搜索结果布局样式"></EF:EFLeaf>
					  </EF:EFTemplate>
				    </EF:EFTreeModel>
				    <!-- 所以树根在树枝下 -->
					<EF:EFTree model="tModel" id="tree" text="样式管理树" configFunc="configTree">	 	 
					</EF:EFTree>
			 	</div>
			  </div>
			</td>
    		<td id="rightContent" width=100%  vAlign="top" >
    		<table width="100%"  height="100%" cellpadding=1 cellspacing=0>
    		  <tr><td width="100%"  height="100%" vAlign="top">
			  <div id = "ef_region_result" title="记录集" style="overflow:scroll" efRegionShowClear=false> 
				<div id = "ef_grid_result" title="样式管理" style="overflow: hidden;height:531px;" >
				</div>
			  </div></td></tr>
			  <tr><td>
			  	<div id="code_div" style="display:none" height="288px">
			  	<fieldset>
  					<legend> 
  						<label for="contactus">效果源码</label>--
  						<EF:EFSelect blockId="inqu_status" ename="code" row="0" etc="onchange='sound_code_select()'">
						    <EF:EFOption label="可替换元素" value=""/>
						 </EF:EFSelect>			
						<!--  <img id="editElement" title="编辑可替换元素" onmouseover="this.style.cursor='pointer';" src="./EF/Images/efgrid_add_row.gif" onclick="showElementPage()" > -->
  					</legend>
   					<EF:EFInput type="textarea" blockId="inqu_status" row="0" ename="sound_code" style="width:100%;height:282px; " etc="onKeydown='record_cursor_touch_off(this)' onKeyup='record_cursor_touch_off(this)' onmousedown='record_cursor_touch_off(this)' onmouseup='record_cursor_touch_off(this)' onfocus='record_cursor_touch_off(this)'"/>
					<EF:EFInput blockId="inqu_status" ename="sId" row="0" type="hidden"></EF:EFInput>  
					<EF:EFInput type="hidden" blockId="inqu_status" row="0" ename="templateUnitType"/>
				</fieldset>
				<div align="right">
					<EF:EFButton ename="sound_code_save" cname="保存" />
				</div>
			  	</div>
			  </td>
			  </tr>
			  </table> 
            </td>
    	  </tr>
        </table>
	</div>
</div>  
<EF:EFRegion/>
	<EF:EFGrid blockId="result" ajax="true" autoDraw="false"  style="navigationBar:false;" >
	<EF:EFColumn ename="styleName" cname="样式名称" visible="true" nullable="false" minLength="1"  maxLength="50"/>
	<EF:EFColumn ename="edit" cname="编辑样式源码" align="right" enable="false"/>
</EF:EFGrid>      
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>   
