document.write('<link rel="icon"  href="app.ico"  type="image/x-icon"/>');
document.write('<link rel="SHORTCUT ICON"  href="app.ico"  type="image/x-icon"/>');

efImportFile = function(libraryName) {
    document.write('<script type="text/javascript" src="'+libraryName+'"></script>');
}
efImportCSS = function(cssName) {
    document.write('<link href="' + cssName + '" rel="stylesheet" type="text/css"/>');
}

var CONTEXT_PATH;
if ( typeof( CONTEXT_PATH ) == 'undefined' ) 	CONTEXT_PATH=".";

//css引用放在JS前面
efImportCSS(CONTEXT_PATH + "/EF/Themes/base/jquery.ui.all.css");
efImportCSS(CONTEXT_PATH + "/EF/iplat-ui-2.0.css");
efImportCSS(CONTEXT_PATH + "/EF/FeedBack/base.css");

//定义引用文件清单
var _iplat_ui_include_files = new Array(
		"/EF/jQuery/jquery-1.7.js",	
		"/EF/iplat-ui-jqueryui.js",
		"/EF/iplat-ui-control.js",
		"/EF/CONFIG.js"
);

for (_iplat_ui_file in _iplat_ui_include_files) {
	efImportFile(CONTEXT_PATH + _iplat_ui_include_files[_iplat_ui_file]);
}

document.write('<script language="text/javascript">__DEBUG = true;</script>');
