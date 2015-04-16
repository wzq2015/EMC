
<!DOCTYPE html>
<%@page contentType="text/html; charset=UTF-8" %>
<html>
<head>
<title>表单设计器</title>
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery-1.7.2.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery-ui-1.8.21.custom.js"></script>
<script type="text/javascript" src="./FormBuilder/lib/js/jquery.json-2.2.min.js"></script>
<script type="text/javascript" src="./FormBuilder/lib/js/jquery.qtip.min.js"></script>
<script type="text/javascript" src="./EU/ueditor/editor_config_for_formbuilder.js"></script>
<script type="text/javascript" src="./EU/ueditor/editor_all.js"></script>

<script type="text/javascript" src="./FormBuilder/js/jquery.colorpicker.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.fontpicker.js"></script>
<script type="text/javascript" src="./FormBuilder/js/formbuilder.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.core.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.widget.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.efrichtext.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.efinputtext.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.efplaintext.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.efinputdate.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.efinputtextarea.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.efinputcheckbox.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.efinputradio.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.efinputpulldown.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.efdatadict.js"></script>
<script type="text/javascript" src="./FormBuilder/js/jquery.formbuilder.efdatagrid.js"></script>
<script type="text/javascript" src="./FormBuilder/js/Math.uuid.js"></script>
<script type="text/javascript" src="./FormBuilder/js/redips-table.js"></script>

<link rel="stylesheet" href="./EU/ueditor/themes/default/ueditor.css"> 
<link type="text/css" href="./FormBuilder/css/ui-lightness/jquery-ui-1.8.21.custom.css" media="screen" rel="stylesheet" />
<link type="text/css" href="./FormBuilder/lib/css/uni-form.css" media="screen" rel="stylesheet" />
<link type="text/css" href="./FormBuilder/lib/css/default.uni-form.css" media="screen" rel="stylesheet" />
<link type="text/css" href="./FormBuilder/lib/css/jquery.qtip.css" media="screen" rel="stylesheet" />
<link type="text/css" href="./FormBuilder/css/jquery.formbuilder.core.css" media="screen" rel="stylesheet" />
<link type="text/css" href="./FormBuilder/css/jquery.colorpicker.css" media="screen" rel="stylesheet" />
<link type="text/css" href="./FormBuilder/css/jquery.fontpicker.css" media="screen" rel="stylesheet" />
<link type="text/css" href="./FormBuilder/css/formbuilder.css" media="screen" rel="stylesheet" />

<%
	String formId = request.getParameter("formId");
	String formName = request.getParameter("formName");
	String gridId = request.getParameter("gridId");
	String formType = request.getParameter("formType");
%>

<script type="text/javascript">

	$(function() {
		if('<%=formType%>' =="dataGrid"){
			$('#container').attr('formType','dataGrid');
			$('div.buttons #preview').hide();
			$('div.buttons #merge').hide();
			$('div.buttons #splitH').hide();
			$('div.buttons #splitV').hide();
		}			
		$('#container').formbuilder();//给id为container的html DOM节点绑定FormBuilder控件,并初始化
		
		$('div.buttons .save').button();
		$('div.buttons #radio').buttonset();
		
		initBuilder();
		initTable();
		$('#create').click(function() {
			if('<%=formType%>' !="dataGrid")
				save('<%=formId%>', '<%=formName%>');
			else
				saveSubGrid('<%=gridId%>');
		});
		$('#preview').click(function() {
			preview();
		});

		$('#json').click(function() {
			view();
		});

		if('<%=formType%>' =="dataGrid")
			loadSubGrid('<%=gridId%>');
		else load('<%=formName%>');
			
		$(".controlContainer").resizable({
			aspectRatio:false,
			minHeight:10,
			minWidth:10
		});
//		$(".rowControl").resizable({
//			aspectRatio:false,
//			minHeight:10,
//			minWidth:10
//		});
//		$(".colControl").resizable({
//			aspectRatio:false,
//			minHeight:10,
//			minWidth:10
//		});		
	});
	
    
</script>
<style type="text/css">
 
</style>
</head>

<body id="body">

	<div id="container">
<!-- 		<div id="header"><h3>表单设计器</h3></div> -->
		<div id="builderPalette">
			<div class="floatingPanelIdentifier"></div>
			<div class="floatingPanel">
				<div id="paletteTabs">
					<ul>
						<li><a href="#addField">字段控件</a></li>
						<li><a href="#fieldSettings">字段属性</a></li>
						<li><a href="#formSettings">表单属性</a></li>
					</ul>
					<div id="addField">
						<strong>基础控件</strong>
						<div id="standardFields"></div>
						<br /> <strong>扩展控件</strong>
						<div id="fancyFields"></div>
					</div>
					<div id="fieldSettings">
					 <!--
						<fieldset class="language">
							<legend></legend>
						</fieldset>
					  -->
						<div class="general"></div>
					</div>
					<div id="formSettings">
					   <!--
						<fieldset class="language">
							<legend>
								<label for="language">Language: </label> <select id="language">
									<option value="en">English</option>
									<option value="zh_CN">简体中文</option>
								</select>
							</legend>
						</fieldset>
						-->
						<div class="general"></div>
					</div>
				</div>
			</div>
		</div>
		<form id="builderForm" action="#" class="uniForm">
			<input type="hidden" id="name" name="name" />
			<input type="hidden" id="settings" name="settings" />
			<div id="outPanel">
				<div id="builderPanel">
					<div class="formHeading"></div>
					<div>
						<table width="100%" id="outerTableLayout">
							<tr>
								<td>
									<table width="100%" id="tableLayout">
										<thead id="tableLayoutHeader">
											<tr>
												<th class="tableControl"><div style='width: 20px;'></div></th>
												<th class="colControl"></th>
												<th class="colControl"></th>
											</tr>
										</thead>
										<tbody id="tableLayoutBody">
											<tr>
												<td class="rowControl"></td>
												<td class="controlContainer"></td>
												<td class="controlContainer"></td>
											</tr>
											<tr>
												<td class="rowControl"></td>
												<td class="controlContainer"></td>
												<td class="controlContainer"></td>
											</tr>
	  									</tbody>
									</table>
								</td>
								<td width='20px'></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="buttons">
				<input type="button" name="create" class="save" value="保存" id="create" />
				<input type="button" name="preview" class="save" value="预览" id="preview" />				
				<input type="button" name="json" class="save" value="查看定义" id="json" />
				<input type="button" name="merge" class="save" value="合并" id="merge" />
				<input type="button" name="splitH" class="save" value="列分割" id="splitH" />
				<input type="button" name="splitV" class="save" value="行分割" id="splitV" />
			</div>
		</form>
	</div>
	<!--
	<div style="hidden">
		<form id="previewForm" method="GET" action="DispatchAction.do" target="_blank">
			<input type="hidden" name="efFormEname" value="EDMD91">
			<input type="hidden" id="formData" name="formData"/>
		</form>
	</div>
 	-->
 </body>
</html>
