<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="java.util.*"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="./ED/MD/EDMD02.js"></script>
	<script type="text/javascript">

	var tableTreeModel =  new eiTreeModel('ETDL00Tree');
	var eiInfo = new EiInfo();
	EiCommunicator.send( "ETDL00Tree", "setNodeId" , eiInfo, "" );
	function configTree(tree){
	  tree.nodeInitializer = treeNodeInitializer;
	  tree.expand();
	}

	function treeNodeInitializer(node){
		node.textClicked = function(){
			treeNodeClicked(node);
		};
		if(node){
			//alert(request.indexClassCode);
			if(request.indexClassCode){
				node._opened=true;
			}

		}
		//alert(node._leaf);
		node.addMenuItem("",{label:"addchild", parent:"", text:"新增子分类", leaf:"1" ,func:function(id,label){childnode_insert(id,label);}});
		node.addMenuItem("",{label:"addetdl01", parent:"", text:"新增指标类", leaf:"1" ,func:function(id,label){indexClass_insert(id,label);}});
		node.addMenuItem("",{label:"deleteetdl01", parent:"", text:"删除子分类或指标类", leaf:"1" ,func:function(id,label){indexClass_delete(id,label);}});
		if(node._leaf){
			node.addMenuItem("",{label:"cut", parent:"", text:"剪切", leaf:"1" ,node: node,func:function(id,label,node){file_cut(id,label,this.node);}});
		}else{
			node.addMenuItem("",{label:"paste", parent:"", text:"粘贴", leaf:"1" ,func:function(id,label){file_paste(id,label);}});
		}
		}


	var subTableTreeModel =  new eiTreeModel('ETDL00Tree');
	EiCommunicator.send( "ETDL00Tree", "setNodeId" , eiInfo, "" );
	function subConfigTree(tree){
	  tree.nodeInitializer = subTreeNodeInitializer;
	  tree.expand();
	}
	function subTreeNodeInitializer(node){
		node.textClicked = function(){
			subTreeNodeClicked(node);
		};
		if(node){

		}
	}
  </script>
</head>
<body class="bodyBackground">

	<form id="EDMD02" method="POST" action="<%=actionUrl%>">
		<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

		<div id="ef_region_inqu" title="查询条件" efRegionShowClear=true>
			<div style="overflow: hidden; width: 100%">
				<table>
					<tr>
						<td width="10%" align="right">
						控件类别
						</td>
						<td width="15%">
						<EF:EFSelect blockId="inqu_status" ename="compType"  row="0">
						   <EF:EFOption label="" value="" />
					   	   <EF:EFOption value="0" label="布局" />
		                   <EF:EFOption value="1" label="导航" />
		                   <EF:EFOption value="2" label="图标" />
		                   <EF:EFOption value="3" label="组件" />
						</EF:EFSelect>
						<td width="10%" align="right">
						控件名称
						</td>
						<td width="15%">
						  <EF:EFInput blockId="inqu_status" ename="cnName" row="0" />
						</td>
					</tr>
				</table>
			</div>
		</div>

<div id="ef_region_info" title="主界面">
		<table width="100%" height="400px">
			<tr>
				<td width="250px" valign="top">
					<div id="ef_region_tree" title="表列表">
						<EF:EFTree model="tableTreeModel" id="nTree" text="指标类维护"
							configFunc="configTree"></EF:EFTree>
					</div>
				</td>
				<td width="85%">
				<div id="ef_region_result" title="记录集" style="overflow: scroll">
					<div id="ef_grid_result" title="页面信息" style="overflow: hidden; height: 300px;"></div>
				</div>
				</td>
			</tr>
         </table>
</div>


<EF:EFRegion />

		<EF:EFGrid blockId="result" autoDraw="no" ajax="false">
		    <EF:EFColumn ename="id" cname="号码"  width="50"  fix="yes" />
		    <EF:EFColumn ename="cnName" cname="控件名称"  width="150" />
		    <EF:EFComboColumn ename="compType" cname="控件类型" sort="true" align="center" width="100">
		      <EF:EFOption value="0" label="控件集合" />
		      <EF:EFOption value="1" label="控件" />
		    </EF:EFComboColumn>
		    <EF:EFColumn ename="description" cname="控件备注"  width="150" />
		    <EF:EFColumn ename="custom" cname="控件属性配置" displayType="textbutton"  align="center" readonly="true" width="150" />
		</EF:EFGrid>
		<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
	</form>
</body>
</html>
