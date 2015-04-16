<!DOCTYPE html>

<%--
树控件Demo文件列表：
1. web -> EE -> DM -> EEDM19.jsp										前台页面
2. web -> EE -> DM -> EEDM19.js											前台javascript
3. src -> com.baosight.iplat4j.ee.dm.service.ServiceEEDM19.java			后台服务，实现增删改查的业务逻辑
4. src -> com.baosight.iplat4j.ee.dm.service.ServiceEEDM1901.java		定义如何获取树中的内容
5. src -> com.baosight.iplat4j.ee.dm.domain.EEDM19.java					定义javabean
6. scr -> com.baosight.iplat4j.ee.dm.sql.EEDM19.xml						定义sql语句映射
7. 数据库中iplat.TEE05表													包括公司、产品、规格、合同号、金额字段
 --%>

<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>
<html>
 <head>
 	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM19.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
 </head>


 <body class="bodyBackground">

  <form id="EEDM19" method="POST" action="<%=listUrl%>">
     <jsp:include flush="true" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

     <button type="button"  id=show_subpage onclick="showSubpage()">显示子页面</button>
     <!-- 子页面的div，这里宽度和高度为硬编码，在大的字体下显示效果可能不佳  -->
     <div id="subpage" class="efwindow" style="width:525px;height:250px">
	     <div id = "ef_region_sp_inqu" title="查询条件" efRegionShowClear=true style="width:510px">
			<div style="overflow:hidden;width:100%">
					<table style="width:100%">
					  <tr>
					    <td align="right" nowrap style="width:10%">产品：</td>
					    <td nowrap style="width:10%">
					    <EF:EFInput blockId="sp_inqu_status" ename="product" row="0" />
					    </td>
					    <td align="right" nowrap style="width:10%">规格：</td>
					    <td nowrap style="width:10%">
					    <EF:EFInput blockId="sp_inqu_status" ename="spec" row="0" />
					    </td>
					  </tr>
					  <tr>
					  	<td align="right" nowrap style="width:10%">金额不小于：</td>
					    <td nowrap style="width:10%">
					    <EF:EFInput blockId="sp_inqu_status" ename="amount" row="0" />
					    </td>
					  </tr>
					</table>
			</div>
		</div>
	    <div id = "ef_region_sp_manage" title="公司产品管理" style="width:510px" efRegionShowClear=false>
	    	  <div id = "ef_grid_sp_result" title="产品信息" style="overflow: hidden;width:510px"></div>
	    </div>
	    <EF:EFGrid blockId="sp_result" autoDraw="yes" queryMethod="querySubpage" enable="false" ajax="true" style="toolBar:false"></EF:EFGrid>
	</div>


 	<div id="ef_region_result" title="公司产品信息维护" efRegionShowClear=false >
      <div id="ef_region_main">
         <input type="radio" id='radio1' name='radio1' value="0"  checked=true  onclick="initTree();">单选树</>
          <input type="radio" id='radio2' name='radio1' value="1" onclick="initTree();" >多选树</>
        <table id="mainFrameTable" width="100%"  height="82%" cellpadding=1 cellspacing=0 >
    	  <tr height=100%>
    	   <td id="leftTree" vAlign="top" >
	 		 <div id="outer" style="width:200px;"  >
	    		 <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:100%;'>
	    		    <EF:EFTree model="eedm19TreeModel" id="nTree" text="公司产品树" configFunc="configTree" menuDepth="1" >
	    		    </EF:EFTree>
	    		  </div>
     		  </div>
    		 </td>
            
    		<td id="rightContent" width=100%  vAlign="top" >
      		  <div id="divStatus" style="color: blue"></div>
    		  <div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
      		   <EF:EFInput blockId="inqu_status" ename="company" row="0" type="hidden" />

			  <div style="overflow:hidden;width:100%">
						<table style="width:100%">
						  <tr>
						    <td align="right" nowrap style="width:5%">产品：</td>
						    <td nowrap style="width:5%">
						    <EF:EFInput blockId="inqu_status" ename="product" row="0" />
						    </td>
						    <td align="right" nowrap style="width:5%">规格：</td>
						    <td nowrap style="width:5%">
						    <EF:EFInput blockId="inqu_status" ename="spec" row="0" />
						    </td>
						    <td align="right" nowrap style="width:5%">金额不小于：</td>
						    <td nowrap style="width:20%">
						    <EF:EFInput blockId="inqu_status" ename="amount" row="0" />
						    </td>
						  </tr>
						</table>
					</div>
				</div>
    		  <div id = "ef_region_manage" title="公司产品管理" efRegionShowClear=false>
    	        <div id = "ef_grid_result" title="产品信息" style="overflow: hidden;height:400px;">
                </div>
              </div>
            </td>
            
            
    	  </tr>
        </table>
      </div>
      </div>
		<div id="selectColumn" class="efwindow">
			<div id="ef_region_sel_col" title="选择栏目" style="overflow:scroll; height: 400px;">
				<table width="300">
					<tr>
						<td>
							<div id="leftTreeDiv" style='overflow:auto; width:200; height:100%;'>
								<EF:EFTree model="eedm19TreeModel" id="nTree1" text="公司产品树" configFunc="configTree" >
								</EF:EFTree>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>

    <EF:EFGrid blockId="result" autoDraw="yes" enable="true"  ajax="true" sumType="none" style="toolBar:false;modelXlsBar:true;initSelect:true">
		<EF:EFColumn ename="company" cname="公司" visible = "false" nullable="false"  />
		<EF:EFColumn ename="product" cname="产品" nullable="false" />
		<EF:EFColumn ename="contractID" fix="yes" cname="合同号" nullable="false" readonly="true" sumType="none"/>
		<EF:EFColumn ename="amount" cname="金额" width="230"/>
    </EF:EFGrid>

    <EF:EFRegion/>
 
    <jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
  </form>
  
  <div id="rightMenu" class="rMenu ui-corner-all ef-widget-shadow">
	<ul >
		<li id="m_add" onclick="addTreeNode();"><div>增加节点</div></li>
		<li id="m_del" onclick="removeTreeNode();"><div>删除节点</div></li>
		<li id="m_check" onclick="checkTreeNode(true);"><div>Check节点</div></li>
	
	</ul>
</div>

	<script type="text/javascript" >
        $(document).ready(function()
        {
        	$("#outer").css("height", $("#outer").parent().css("height"));
        	$("#leftTreeDiv").css("height", $("#outer").parent().css("height"));
            $("#outer").resizable({handles:"e,w"}); 
        });
	</script>
</body>
</html>