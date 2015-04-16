<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%@page import="java.util.*,
                java.net.*,
                java.text.*,
                java.util.zip.*,
                java.io.*"
%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	
	String filePath = request.getParameter("file");
	
%>
<%!

private static final boolean READ_ONLY = false;
//Allow browsing and file manipulation only in certain directories
private static final boolean RESTRICT_BROWSING = false;
//private static final String RESTRICT_PATH = "C:\\CODE;E:\\"; //Win32: Case important!!
private static final String RESTRICT_PATH = "/etc;/var";

/**
 * Method to build an absolute path
 * @param dir the root dir
 * @param name the name of the new directory
 * @return if name is an absolute directory, returns name, else returns dir+name
 */
static String getDir(String dir, String name) {
	if (!dir.endsWith(File.separator)) dir = dir + File.separator;
	File mv = new File(name);
	String new_dir = null;
	if (!mv.isAbsolute()) {
		new_dir = dir + name;
	}
	else new_dir = name;
	return new_dir;
}

/**
 * Converts some important chars (int) to the corresponding html string
 */
static String conv2Html(int i) {
	if (i == '&') return "&amp;";
	else if (i == '<') return "&lt;";
	else if (i == '>') return "&gt;";
	else if (i == '"') return "&quot;";
	else return "" + (char) i;
}

/**
 *	If RESTRICT_BROWSING = true this method checks, whether the path is allowed or not
 */
static boolean isAllowed(File path, boolean write) throws IOException{
	//if (READ_ONLY && write) return false;
	if (RESTRICT_BROWSING) {
        StringTokenizer stk = new StringTokenizer(RESTRICT_PATH, ";");
        while (stk.hasMoreTokens()){
		    if (path!=null && path.getCanonicalPath().startsWith(stk.nextToken()))
                return false;
        }
        return true;
	}
	else return true;
}

%>


<EF:EFPage>
	<EF:EFHead>
		<EF:EFScript src="./ED/MD/EDMD30.nestable.js"/>
		<EF:EFScript src="./EF/Common/iplat.ui.xmlUtil.js" />
		<EF:EFScript src="./ED/MD/jquery-ui-autocomplete.js" />
		<EF:EFScript src="./ED/MD/jquery.multi-open-accordion-1.5.3.js" />
		<EF:EFScript src="./EF/Tree/iplat.ui.kTree.js" />
		<EF:EFScript src="./EF/Grid/iplat.ui.kGrid.js" />
		<EF:EFScript src="./EF/jQuery/jquery.ui.tooltip.js" />
		<EF:EFScript src="./ED/MD/jquery.layout-latest.js" />
        <link type="text/css" rel="stylesheet" href="./ED/MD/layout-default-latest.css" />
		<link type="text/css" href="./ED/MD/EDMD30.css" rel="stylesheet" />
		<link type="text/css" href="./EF/Themes/base/jquery.ui.accordion.css" rel="stylesheet" />
		<link type="text/css" href="./EF/Themes/base/jquery.ui.tooltip.css" rel="stylesheet" />
		<style type="text/css">

	
		.cf:after {
			visibility: hidden;
			display: block;
			font-size: 0;
			content: " ";
			clear: both;
			height: 0;
		}
		
		* html .cf {
			zoom: 1;
		}
		
		*:first-child+html .cf {
			zoom: 1;
		}
		
		html {
			margin: 0;
			padding: 0;
		}
		
		body {
			font-size: 100%;
			margin: 0;
			padding: 1em;
			font-family: 'Helvetica Neue', Arial, sans-serif;
			background-color: #FAFAFA;
		}
		
		h1 {
			font-size: 1.75em;
			margin: 0 0 0.6em 0;
		}
		
		a {
			color: #2996cc;
		}
		
		a:hover {
			text-decoration: none;
		}
		
		p {
			line-height: 1.5em;
		}
		
		.small {
			color: #666;
			font-size: 0.875em;
		}
		
		.large {
			font-size: 1.25em;
		}
		
	   *{
			font-size:12px;
		}
		h2 {
		    font-size:18px;
		    color:#333;
		    font-weight:bold;
		    margin:0;
		    margin-bottom:15px;
		}
		.demo-info{
			background:#FFFEE6;
			color:#8F5700;
			padding:12px;
		}
		.demo-tip{
			width:24px;
			height:16px;
			float:left;
		}
		form {
		background-color: #FAFAFA;
		}

	</style>
	
	<style>
    .ui-autocomplete {
        max-height: 200px;
        overflow-y: auto;
        /* prevent horizontal scrollbar */
        overflow-x: hidden;
    }
    /* IE 6 doesn't support max-height
     * we use height instead, but this forces the menu to always be this tall
     */
    * html .ui-autocomplete {
        height: 200px;
    }
    </style>
	</EF:EFHead>
	<body class="bodyBackground" style='background-color:#FAFAFA'>

		<form name="myForm" action="./Preview" method="post" target="newWin">
     	</form>
			<div id="ctrlWnd" title="选择控件" style="width:350px;min-height:250px;display:none">
		   <div style='margin:3px'>
        <label for="tags">请选择控件: </label>
        <input id="tags" />
         </div>

			</div>
	
			<EF:EFForm formId="EDMD30" action="<%=actionUrl%>">
					<style type="text/css">
							form,.ef-form-head {
		background-color: #FAFAFA;
		}
			</style>
			
		<!-- Popup列(EFPopupColumn)的弹出内容部分，可任意自定制 （外层DIV  id=ef_Popup class=efwindow 为固定写法。）-->
		<DIV  id="ef_Popup" class="efwindow" title='元数据' style="overflow:hidden;display:none">
			<table>
				<tr>
					<td colspan=2>
		    			<div id = "ef_grid_leaves" title="元数据" style="overflow: hidden;height:200px;width:650px"></div>
						    <EF:EFGrid blockId="leaves" autoDraw="false"  enable="true" ajax="true" style="operationBar:false;navigationBar:false;toolBar:false;">
							<EF:EFComboColumn ename="columnType" cname="类型" nullable="true">
								<EF:EFOption label="EFColumn" value="EFColumn" />
								<EF:EFOption label="EFColumnGroup" value="EFColumnGroup" />
								<EF:EFOption label="EFComboColumn" value="EFComboColumn" />
								<EF:EFOption label="EFMultiSelectColumn" value="EFMultiSelectColumn" />
								<EF:EFOption label="EFSubGridColumn" value="EFSubGridColumn" />
								<EF:EFOption label="EFPopupColumn" value="EFPopupColumn" />
								<EF:EFOption label="EFHtmlColumn" value="EFHtmlColumn" />
								<EF:EFOption label="EFTreeColumn" value="EFTreeColumn" />
							</EF:EFComboColumn>
					    	<EF:EFColumn ename="fieldEname" cname="字段英文名" />
					    	<EF:EFColumn ename="fieldCname" cname="字段中文名" />
					        </EF:EFGrid>
		  			</td>
				</tr>
				<tr>
					<td align='right' colspan=2 >
						<input  class='buttonRegular'  type=button value='确定' onclick='addMetaData();' />
					</td>
				</tr>
			</table>
		</DIV>
		
	    <div id="ef_region_table" title="选择表" efRegionShowClear=true style="display: none;">
			<div style="width:100%;" id="inline2">
			       <table id="mainFrameTable" width="100%"  height="100%" cellpadding=1 cellspacing=0 >
		    	  <tr height=100%>
		           <td id="leftTree" vAlign="top" height=100%>
		             <div id="leftTreeDiv" class="ef-tree-div" style='overflow:auto;width:200px;height:400px;'>
		    		    <EF:EFTree model="tableTreeModel" id="nTree" text="表信息" configFunc="configTree">
		    		    </EF:EFTree>
		    		  </div>
		    		                    
		    		 </td>
		    		 
					<td id="middleSplitter" class="ef-splitter-vertical-td" >&nbsp;</td> 		
		    		<td id="rightContent" width=100%  vAlign="top" >
		    		<table>
		    		<tr>
			    		<td>
	    				<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
						<table>
					        <tr>
					          <td align="right" nowrap style="width:5%">字段中文名：</td>
					          <td nowrap style="width:8%">
					            <EF:EFInput blockId="inqu_status" ename="itemCname" row="0" />
					          </td>
					
					          <td align="right" nowrap style="width:5%">字段英文名：</td>
					          <td nowrap style="width:20%">
					            <EF:EFInput blockId="inqu_status" ename="itemEname" row="0" />
					          </td>
					        </tr>
							<tr>
							<td>
							    <EF:EFInput blockId="inqu_status" ename="projectEname" row="0" type="hidden"/>
								<EF:EFInput blockId="inqu_status" ename="tableEname" row="0" type="hidden"/>
						    </td>
						 </tr>
						</table>
					</div>
			    </div>
			    		</td>
		    		</tr>
		    		<tr>
			    		<td>
			    	    <div id = "ef_region_select" title="记录集" style="overflow:auto" efRegionShowClear=false> 
						<div id = "ef_grid_select" title="表数据项" style="overflow: hidden;height:250px;width:575px">
						    <EF:EFGrid blockId="select" ajax="true" autoDraw="no" style="navigationBar:false;operationBar:false">
							<EF:EFColumn ename="tableItemSeq" cname="序号" width="30" enable="false" />
							<EF:EFColumn ename="itemEname" width="120" enable="false" />
							<EF:EFColumn ename="itemCname" width="160" enable="false" />
							<EF:EFColumn ename="itemType" width="100" enable="false" />
							<EF:EFColumn ename="itemLen" width="100" enable="false" />
						    </EF:EFGrid>   
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
	   

		<div id="savejspdiv" style="display:none;position:absolute;z-index:999;background:#EED;padding:5px;">
			保存路径：<input type="text" id="new_slectdir" name="new_slectdir" readonly>
			<button type="button" name="SelectDir" value="SelectDir" onclick="selectDir()">选择</button>
			<br>
			文件名称：<input type="text" id="new_name" name="new_name"><br>
			<button type="button" name="Submit" value="SaveJsp" onclick="savejsp_onclick()">确定</button>
			<button type="button" name="canceldiv" value="cancelJsp" onclick="canceljsp_onclick()">取消</button>
		</div>
	<div id='designerMainDiv'>
	
		<div id='designerFuncBar' style='display:inline-block' class="ui-layout-north">
			<menu id="nestable-menu"  style='display:inline-block'>
				<button id='buttonNewJSP' type="button" data-action="creat-newjsp">新建页面</button>
				<button id='buttonLoadJSP' type="button" data-action="input-jsp">选择页面</button>
				<button id='buttonSaveJSP' type="button" data-action="save-jsp">保存页面</button>
				<button id='buttonPreview' type="button" data-action="outline-jsp">页面预览</button>
				<button id='buttonBuildTree' type ="button" value="生成树" onclick="buildTree()">生成树</button>
				<button id='buttonExpandAll'  type="button" data-action="expand-all">全部展开</button>
				<button id='buttonCollapseAll' type="button" data-action="collapse-all">全部折叠</button>
			</menu>
			<div id='nowFile' style='height:36px;display:inline-block;vertical-align: top;'>
				<span id='nowFilePath' style='margin:0 auto;line-height: 36px;'>当前页面：</span>
			</div>
		</div>
		
		<!-- 控件列表 -->
		<div id='pluginlistdiv' class="ui-layout-west">
			<div id="efcontrollist">
			<label for="EFtags">快速搜索: </label><input id="EFtags" />
			</div>
			<div id='pluginDiv'>
			
			</div>
		</div>
		
		<!-- 页面结构树 -->	
		<div id='efform_treeDiv' class="ui-layout-center">
				<div class="dd" id="efFormArch" style="width: 100%"></div>
		</div>
		
		<!-- 属性列表 -->	
		<div id="propertyDiv"  style='' class="ui-layout-east">
			<div id="propertyGrid" >
			</div>
			<!--<div id="helpinfo" style="outline:1px solid silver;background:#EED;position:relative;bottom:30px;width:100%;height:30px">帮助提示</div>  -->
		</div>
		
		<!-- 代码展示区 -->	
        <div id='JSPCodeDiv' class="ui-layout-south">
		<textarea id='textcontent' style="border:0px; height:90%;width:100%;font-size: 14px;font-family: 微软雅黑,宋体,Arial;color: olive;" name="text" wrap="off" cols="85" rows="30">
<%

String path = null;
if (application.getRealPath(request.getRequestURI()) != null) {
	File f = new File(application.getRealPath(request.getRequestURI())).getParentFile();
	//This is a hack needed for tomcat
	while (f != null && !f.exists())
		f = f.getParentFile();
	if (f != null)
		path = f.getAbsolutePath();
}

	String fname = request.getParameter("file");
	if(fname!=null){
		//int posi = fname.lastIndexOf("\\");
		//fname = path + "\\ED\\" + fname.substring(posi + 1);
		File ef = new File(fname);
		if(ef != null && ef.exists()){
			InputStreamReader inReader = new InputStreamReader( new FileInputStream( ef ), "utf-8" );
			BufferedReader reader = new BufferedReader(inReader);
			String disable = "";
			StringBuffer buffer = new StringBuffer();
			if (!ef.canWrite()) disable = " readonly";
			//buffer.append(""
			//        + "<textarea id='textcontent' name=\"text\" wrap=\"off\" cols=\"" + 85
			//        + "\" rows=\"" + 30 + "\"" + disable + ">");
			String c;
			// Write out the file and check if it is a win or unix file
			int i;
			boolean dos = false;
			boolean cr = false;
			while ((i = reader.read()) >= 0) {
				buffer.append(conv2Html(i));
				if (i == '\r') cr = true;
				else if (cr && (i == '\n')) dos = true;
				else cr = false;
			}
			out.print( buffer.toString() );
			reader.close();
		}
	}
%></textarea>
    		<input type="hidden" id="dir" name="dir" value="<%=request.getAttribute("dir")%>">
    		<input type="hidden" id="file" name="file" value="<%= request.getParameter("file")%>">
    		<input type="hidden" id="projRoot" name="file" value="<%= request.getSession().getServletContext().getRealPath("/")%>">
			</div>
			<div id='efFormLoad'>

			</div>
			</div>
		</EF:EFForm>
	</body>
	
</EF:EFPage>
<script>
$(document).ready(function () {
	$(".ef-form-head").css("display",'none');
	$("#buttonBuildTree").button({
		icons : {
		primary : "ui-icon-play"
	},
	text : false}
	);

	$("#buttonExpandAll").button({
		icons : {
		primary : "ui-icon-circle-plus"
	},
	text : false}
	);
	$("#buttonCollapseAll").button({
		icons : {
		primary : "ui-icon-circle-minus"
	},
	text : false}
	);

	$("#buttonNewJSP").button({
		icons : {
		primary : "ui-icon-document"
	},
	text : false}
	);
	$("#buttonLoadJSP").button({
		icons : {
		primary : "ui-icon-folder-open"
	},
	text : false}
	);
	$("#buttonSaveJSP").button({
		icons : {
		primary : "ui-icon-disk"
	},
	text : false}
	);
	$("#buttonPreview").button({
		icons : {
		primary : "ui-icon-image"
	},
	text : false}
	);

	$("#nestable-menu").buttonset();
});

</script>
