<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->
<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/WEB-INF/framework/tlds/EF-2.0.tld" prefix="EF"%>

<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%><html>
<head>
    <title>Graph Editor</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <link rel="stylesheet" type="text/css" href="styles/grapheditor.css">
    <script type="text/javascript">CONTEXT_PATH = "../.."</script>
	<script type="text/javascript">
		// Public global variables
		var MAX_REQUEST_SIZE = 10485760;
		var MAX_WIDTH = 6000;
		var MAX_HEIGHT = 6000;
	
		// URLs for save and export
		var EXPORT_URL = '/export';
		var SAVE_URL = '/save';
		var OPEN_URL = '/open';
		var RESOURCES_PATH = 'resources';
		var RESOURCE_BASE = RESOURCES_PATH + '/grapheditor';
		var STENCIL_PATH = 'stencils';
		var IMAGE_PATH = 'images';
		var STYLE_PATH = 'styles';
		var CONFIG_PATH = 'config';
		var CSS_PATH = 'styles';
		var OPEN_FORM = 'open.html';
	
		// Specifies connection mode for touch devices (at least one should be true)
		var tapAndHoldStartsConnection = true;
		var showConnectorImg = true;

		// Parses URL parameters. Supported parameters are:
		// - lang=xy: Specifies the language of the user interface.
		// - touch=1: Enables a touch-style user interface.
		// - storage=local: Enables HTML5 local storage.
		var urlParams = (function(url)
		{
			var result = new Object();
			var idx = url.lastIndexOf('?');
	
			if (idx > 0)
			{
				var params = url.substring(idx + 1).split('&');
				
				for (var i = 0; i < params.length; i++)
				{
					idx = params[i].indexOf('=');
					
					if (idx > 0)
					{
						result[params[i].substring(0, idx)] = params[i].substring(idx + 1);
					}
				}
			}
			
			return result;
		})(window.location.href);

		// Sets the base path, the UI language via URL param and configures the
		// supported languages to avoid 404s. The loading of all core language
		// resources is disabled as all required resources are in grapheditor.
		// properties. Note that in this example the loading of two resource
		// files (the special bundle and the default bundle) is disabled to
		// save a GET request. This requires that all resources be present in
		// each properties file since only one file is loaded.
		mxLoadResources = false;
		mxBasePath = '../WorkflowDesigner';
		mxLanguage = urlParams['lang'];
		mxLanguages = ['zh'];
	</script>
	 <script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="../../EU/mxGraph/mxClient.js"></script>	
	<script type="text/javascript" src="js/DomHelper.js"></script>
	<script type="text/javascript" src="js/Editor.js"></script>
	<script type="text/javascript" src="js/Graph.js"></script>
	<script type="text/javascript" src="js/Shapes.js"></script>
	<script type="text/javascript" src="js/EditorUi.js"></script>
	<script type="text/javascript" src="js/Actions.js"></script>
	<script type="text/javascript" src="js/Menus.js"></script>
	<script type="text/javascript" src="js/Sidebar.js"></script>
	<script type="text/javascript" src="js/Toolbar.js"></script>
	<script type="text/javascript" src="js/Dialogs.js"></script>
	<script type="text/javascript" src="js/Nodes.js"></script>
	<script type="text/javascript" src="js/Translation.js"></script>
	<script type="text/javascript" src="js/WfModel.js"></script>
	<script type="text/javascript" src="js/Validation.js"></script>
	<script type="text/javascript" src="jscolor/jscolor.js"></script>
	<script type="text/javascript" src="../../FormBuilder/js/Math.uuid.js"></script>
</head>
<body class="geEditor">
	<script type="text/javascript">
		// Extends EditorUi to update I/O action states
		(function()
		{
			var editorUiInit = EditorUi.prototype.init;
			
			EditorUi.prototype.init = function()
			{
				editorUiInit.apply(this, arguments);
				this.actions.get('export').setEnabled(false);

				/* commented by gzf
				// Updates action states which require a backend
				if (!useLocalStorage)
				{
					mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function(req)
					{
						var enabled = req.getStatus() != 404;
						this.actions.get('open').setEnabled(enabled || fileSupport);
						this.actions.get('import').setEnabled(enabled || fileSupport);
						this.actions.get('save').setEnabled(enabled);
						this.actions.get('saveAs').setEnabled(enabled);
						this.actions.get('export').setEnabled(enabled);
					}));
				}
				*/
			};
		})();
		//var node = mxUtils.load('config/diagrameditor.xml').getDocumentElement();
		var EDITOR = new EditorUi(new Editor());

		function loadWorkflowXml(xml)
		{
			var doc = DomHelper.parseXml(xml);
			if (doc.documentElement.nodeName != 'mxGraphModel' && 
				doc.documentElement.nodeName != 'WorkflowProcess') {
				alert('XML解析失败！');
				return;
			}
			EDITOR.editor.setWorkflowXml(doc.documentElement);
		}

		function initNewProcess(id, name, category) {
			var workflow = EDITOR.editor.graph.getWorkflow();
			workflow.setAttribute('Id', id);
			workflow.setAttribute('Name', name);
			workflow.setAttribute('DisplayName', name);
			workflow.setAttribute('Category', category ? category : '');
			workflow.setAttribute('DeployTime', new Date().toString("yyyy-MM-dd HH:mm:ss"));
			workflow.setAttribute('Author', '<%=UserSession.getUserId()%>');

			EDITOR.actions.get('settings').funct();
		}
	</script>
</body>
</html>
