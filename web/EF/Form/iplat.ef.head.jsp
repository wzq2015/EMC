<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.ei.EiConstant"%>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo"%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<%@page import="com.baosight.iplat4j.ep.monitor.DiagnosticJob"%>
<%@page import="com.baosight.iplat4j.ep.monitor.DiagnosticJobType"%>
<%@page import="com.baosight.iplat4j.ep.monitor.Diagnostics"%>

<jsp:useBean id="ei" scope="request" class="com.baosight.iplat4j.core.ei.EiInfo" />
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<%
	String efFormEname = (String) request.getAttribute("efFormEname");
    String efFormCname = (String) request.getAttribute("efFormCname");
    
	DiagnosticJob log = Diagnostics.start(DiagnosticJobType._0600_FORM_RENDER, efFormEname, request.getRequestURI());
	pageContext.setAttribute("__log__", log, PageContext.REQUEST_SCOPE);

	if (efFormEname == null) {
		efFormEname = (String) request.getParameter("efFormEname");
	}
	String pageTitle = efFormEname + "/" + efFormCname;
	//String pageTitle = efFormCname;

	String help = I18nMessages.getText("E_plat_form_help", "帮助");
	String favorites = I18nMessages.getText("E_plat_form_favorites", "收藏");
	String print = I18nMessages.getText("E_plat_form_print", "打印当前页面");
	String close = I18nMessages.getText("E_plat_form_close", "关闭当前页面");
	String fullScreen = I18nMessages.getText("E_plat_form_fullScreen", "全屏显示当前页面");
	String eiStatusImg = I18nMessages.getText("E_plat_form_eiStatusImg", "显示详细信息");
	String codeMsg = I18nMessages.getText("E_plat_form_codeMsg", "信息代码的帮助信息");
	String helpUrl = FrameworkInfo.getHelpUrl();
	String helpType = FrameworkInfo.getHelpType();

	String helpFilePath = null;
	if (efFormEname.startsWith("E")) {
		helpFilePath = helpUrl + "platform/" + efFormEname + "." + helpType;
	} else {
		helpFilePath = helpUrl + efFormEname.substring(0, 2) + "/" + efFormEname + "." + helpType;
	}

	//	从session中获得用户选择的风格和字体，如未选择过，默认为default
	String chooseUI = "default";
	
	//判断是否指定了__forceUIStyle属性，如果指定__forceUIStyle属性则按照__forceUIStyle设定载入
	Object tempUIStyle = ei.get("__forceUIStyle");
	String forceUIStyle = null;
	if (tempUIStyle != null) forceUIStyle = tempUIStyle.toString();
	
	String userInterfaceStyle = (String) session.getAttribute("userInterfaceStyle");
	if (forceUIStyle != null && forceUIStyle.length() > 0) {
		chooseUI = forceUIStyle;	
	} else {
	  if (userInterfaceStyle != null && userInterfaceStyle.length() > 0) {
		chooseUI = userInterfaceStyle;
	  }
	}
%>
<%
String domain = FrameworkInfo.getProjectAppTopDomain();
if (domain != null && domain.startsWith(".")) { 
	domain = domain.substring(1);
%>
<script type="text/javascript">
try {
	document.domain='<%= domain %>';
} catch (ex) {
	alert('domain not valid[<%= domain %>]');
}
</script>
<%
}
%>
<script type="text/javascript">
var _helpFilePath = '<%= helpFilePath %>';
</script>

<script type="text/javascript">
if("undefined" != typeof scrolltotop)
	scrolltotop.init();
<%
	String isDiagForm = efFormEname.startsWith("EP31") ? "true" : "false";
%>
	function find_diagnose_window() {
		if (<%=isDiagForm%>) return null;
		var _wnd = window;
		try {
			while (isAvailable(_wnd) && !isAvailable(_wnd._DIAGNOSE_ID)) {
				try {
					if (isAvailable(_wnd.opener) && _wnd != _wnd.opener) {
						_wnd = _wnd.opener;
						continue;
					}
					if (isAvailable(_wnd.top) && _wnd != _wnd.top) {
						_wnd = _wnd.top;
						continue;
					}
				} catch(ex) {
					_wnd = null;
					break;
				}
				_wnd = null;
				break;
			}
		} catch (_ex) {
			return null;
		}
		return _wnd;
	}
	/*
	var d_wnd = find_diagnose_window();
	if (d_wnd != null) {
		d_wnd.diagnose(3, null, window);
	}
	*/

   //注销或刷新父页面时注销子页面
	window.onunload = function() {
	    for(var propName in winMap) {
	        try {                
	            winMap[propName].close(); 
	        }catch(e) {
          }           
	    }

	}
</script>

<%
	//  从后台服务获取是否国际化开关
	if (FrameworkInfo.isInternational()) {
%>
<script type="text/javascript">
		if(efresource.config != undefined && efresource.config.INTERNATIONAL != undefined ){
			efresource.config.INTERNATIONAL="true";
			// 加载必要的前台国际化资源
			resource.getInternationalValues("ef.*");
		}

</script>
<%
	}
%>

<script type="text/javascript" src="./EF/Form/iplat.ef.head.js"></script>
<% 
	if(!chooseUI.equals("default")){
%>
<link href="./EF/Themes/<%=chooseUI%>/jquery-ui.custom.css" rel="stylesheet" type="text/css" />
<link href="./EF/Themes/<%=chooseUI%>/iplat-ui-theme-2.0.css" rel="stylesheet" type="text/css" />
<%
	} else {
%>
<link href="./EF/Themes/styleApple/jquery-ui.custom.css" rel="stylesheet" type="text/css" />
<link href="./EF/Themes/styleApple/iplat-ui-theme-2.0.css" rel="stylesheet" type="text/css" />
<%
	} 
%>

<script type="text/javascript">
efvalidator.init();
</script>

<div id=ef_form_head class='ef-form-head'>
	<div id=efFormHead style="">
	<table cellSpacing=0 cellPadding=0 border=0>
		<col align=right width=30>
		<col align=left width=100%>
		<col align=right width=30>
		<tbody>
			<tr>
				<td class='ef-state-default ef-cornerredius-all ef-iconbutton-noborder'>
					<div style="margin:2px;"
						id="iplat_efformDev_id" title="<%=efFormEname%>"
						<%if (FrameworkInfo.getProjectType().equals("1")) {%>
						class="ef-icon ef-icon-run" <%} else {%>
						class="ef-icon ef-icon-dev" <%}%> >
				</td>
				<td id=pageTitle class='ef-form-head-title'><%=pageTitle%>&nbsp;</td>

										
				<!-- 配置按钮图标 -->
				<td><div><a id='_efFormConfig' href="#"></a></div></td>
						
			</tr>
			<tr></tr>
		</tbody>
	</table>
	</div>
	
    <!-- 页面公用变量 -->
	<div id="efFormCommonValue" style='display: none' >
	  <EF:EFInput blockId="" ename="efFormEname" row="" type="hidden" />
	  <EF:EFInput blockId="" ename="efFormCname" row="" type="hidden" />
	  <EF:EFInput blockId="" ename="efFormPopup" row="" type="hidden" />
	  <EF:EFInput blockId="" ename="efFormTime" row="" type="hidden" />
	  <EF:EFInput blockId="" ename="efCurFormEname" row="" type="hidden" />
	  <EF:EFInput blockId="" ename="efCurButtonEname" row="" type="hidden" />
	  <EF:EFInput blockId="" ename="packageName" row="" type="hidden" />
	  <EF:EFInput blockId="" ename="serviceName" row="" type="hidden" />
	  <EF:EFInput blockId="" ename="methodName" row="" type="hidden" />
	  <EF:EFInput blockId="" ename="efFormInfoTag" row="" type="hidden" />
	  <EF:EFInput blockId="" ename="efFormLoadPath" row="" type="hidden" />
	  <EF:EFInput blockId="" ename="efFormButtonDesc" row="" type="hidden" />

      <EF:EFInput blockId="" ename="__$$DIAGNOSE$$__" row="" type="hidden" />

	</div>
</div>

<!-- 状态提示行 -->
<div id="efFormStatus" class="ui-state-default ef-form-status-content" style='width:400px;display: none' >
	<table id="efFormMsg" cellspacing="0" cellpadding="0" border="0" >
		<col align=center width=18px>
		<col align=left width=60px>
		<col align=left width=100%>
		<col align=center width=18px>
		<col align=center width=18px>
		<tbody>
			<tr>
				<td title="页面状态">
                       <span class="ui-icon ui-icon-info" id='_eiStatusImg'></span>
				</td>
				<td>
					<span id='_efFormEname' style='padding-right:5px;'><%=efFormEname%></span>
				</td>
				<td>
					<span id="_eiMsg" style='overflow: hidden; word-break:break-all'>&nbsp;<%=(ei.getMsg()==null)?"":ei.getMsg()%></span>
				</td>
				<td title="关闭状态提示"><span class="ui-icon ui-icon-circle-close" id='_closeStatus'></span></td>
				<td title="状态提示切换"><span class="ui-icon ui-icon-pin-w" id='_stickStatus'></span></td>
			</tr>
		</tbody>
	</table>
	<table id='efFormDetailDiv' style='display: none' cellSpacing=0 cellPadding=0 width="100%" border=0>
		<col align="right" width="15%">
		<col align="left" width="85%">
		<tbody>
		<tr>
			<td>信息键码：</td>
			<td>
					<% 
					  	String displayMsgKey = ei.getMsgKey();
					    if (displayMsgKey != null){
							String queryKey = EiConstant.queryBlock + EiConstant.separator + "0" + EiConstant.separator + "fkey=" + ei.getMsgKey();
							String linkStr = "efform.openNewForm('EP02', '"	+ EiConstant.methodName + "=get&" + queryKey + "');";
					%>
					<a title="<%=codeMsg%>" href="javascript:<%=linkStr%>">
					   <span id="_eiMsgKey"><%=displayMsgKey%></span>
					</a>
					<%  
						}
					%>	
		    </td>						
		</tr>
		<tr>
			<td>详细信息：</td>
			<td id=efFormDetailMsg><span id="_eiDetailMsg"><%=ei.getDetailMsg()%></span></td>
		</tr>
	</table>
</div>

<div id="_efFormConfigMenu" >
    <!-- efform配置按钮下拉菜单 -->
	<div id="efFormConfigMenu" class="ef-form-config-menu ui-widget ui-widget-content ui-corner-all ef-widget-shadow"  style='width:170px;padding:5px;display: none'>
      <div id="_efFormConfigMenu">
        <div>
            <a id='_efFormMenu_close' href="#"><%=close%></a>
        </div>
        <div>
            <a id='_efFormMenu_showMode' href="#"><%=fullScreen%></a>
        </div>
        
        <div class='ef-menuconfig-sep'></div>        
        
        <div>
            <a id='_efFormMenu_print' href="#"><%=print%></a>
        </div>
        
        <div class='ef-menuconfig-sep'></div>        
        
        <div>
            <a id='_efFormMenu_diagnostics' href="#">页面诊断工具</a>
        </div>
        <div>
            <a id='_efFormMenu_viewEiInfo' href="#">数据检查</a>
        </div>
        <div>
            <a id='_efFormMenu_viewLog' href="#">打开交互日志</a>
        </div>
        
        <div class='ef-menuconfig-sep'></div>        

        <div>
            <a id='_efFormMenu_help' href="#"><%=help%></a>
        </div>
        
        <div class='ef-menuconfig-sep'></div>        

        <div>
            <a id='_efFormMenu_favorites' href="#"><%=favorites%></a>
        </div>
        
      </div>
	</div>

    <!-- efregion配置按钮下拉菜单 -->
	<div id="efRegionConfigMenu" class="ui-widget ui-widget-content ui-corner-all ef-widget-shadow"  style='width:170px;padding:5px;display: none'>
      <div id="_efRegionConfigMenu">
        <div>
            <a id='_efRegionMenu_clear' href="#"></a>
        </div>
        
        <div class='ef-menuconfig-sep'></div>        
        
        <div>
            <a id='_efRegionMenu_load' href="#"></a>
        </div>        
        <div>
            <a id='_efRegionMenu_save' href="#"></a>
        </div>
      </div>
	</div>	
</div>	
    
<iframe id="_dummy_iframe" src="about:blank" style="display: none;"></iframe>
<!-- fix iframe status bar problem -->
<script type="text/javascript">
var d_wnd = find_diagnose_window();
if (d_wnd != null) {
	d_wnd.diagnose(3, null, window);
}
var _oldSetStatus = efform.setStatus;
var _oldOnload = null;
if (typeof efform_onload === "function") {
	_oldOnload = efform_onload;
}

setParentStatus = function( status_code, msg, msgKey ) {
	_oldSetStatus(status_code, msg, msgKey);
	window.parent.efform.setStatus(status_code, msg, msgKey);
}

if(window.parent!=window) { //是子页面
	if (window.parent.hideSubPageHead == true) {
		efform.hideFormHead();
		efform.setStatus = setParentStatus;
		//efform.getFormStatus() + ";MsgKey:" + efform.getMsgKey() + ";Msg:" + efform.getMsg() 
		setParentStatus(efform.getFormStatus(), efform.getMsg(), efform.getMsgKey());
	}
	
	if (typeof window.parent.onSubPageLoad === "function") {		
		efform_onload = function() {
			if (typeof _oldOnload === "function") {
				_oldOnload();
			}
			window.parent.onSubPageLoad(window);
		}
	}
}
</script>

<script type="text/javascript">
	if (d_wnd != null) {
		var __oldOnload = null;
		if (typeof efform_onload === "function") {
			__oldOnload = efform_onload;
		}
		efform_onload = function() {
			var _oldEiSend = EiCommunicator.send;
			EiCommunicator.send = function(sService, sMethod, sEiInfo, sCallback, hasForm, ajaxMode) {
				var newCallback = {
						onSuccess: function(ajaxEi) {
							d_wnd.diagnose(3, null, window);
							if ((typeof( sCallback ) == "object") && (sCallback != null)) {
			                    if (typeof( sCallback.onSuccess ) == "function") sCallback.onSuccess(ajaxEi);
			                  }
							d_wnd.diagnose(4, null, window);
						},
						onFail: function(msg, status, e) {
							d_wnd.diagnose(3, null, window);
							if (typeof( sCallback ) == "object") {
			                    if ( typeof( sCallback.onFail ) == "function") sCallback.onFail(msg, status, e);
			                  }
							d_wnd.diagnose(4, null, window);
						}
				
				};
				_oldEiSend(sService, sMethod, sEiInfo, newCallback, hasForm, ajaxMode);
			}
			$("body").ajaxSend(function(evt, request, settings) {
				d_wnd.diagnose(1, null, window, "Ajax调用");
				var j = d_wnd.diagnose(2, null, window);
				settings.data += "&__$$DIAGNOSE$$__=" + j.id;
// 				var _oldSuccess = settings.success;
// 				settings.success = function(msg) {
// 					d_wnd.diagnose(3, null, window);
// 					_oldSuccess(msg);
// 					d_wnd.diagnose(4, null, window);
// 				};
// 				var _oldError = settings.error;
// 				settings.error = function(xmlR, status, e) {
// 					d_wnd.diagnose(3, null, window);
// 					_oldError(xmlR, status, e);
// 					d_wnd.diagnose(4, null, window);
// 				}
			});
			if (typeof window.loadTabPage === "function") {
				window.loadTabPage = function(index) {
					var frame = frames[index];
					var _p = path[index];
					var j = d_wnd.diagnose(1, null, null, "加载TAB页面: [" + _p + "]");
					_p += "&__$$DIAGNOSE$$__=" + j.id;
					var _path = selected == null ? _p : composePath(frame, _p,
							index);
					if ($(frame).attr("__src") != _path) {
						$(frame).attr("__src", _path);
						frame.src = _path;
						efform.setStatus(0, "正在加载...");
					}
					d_wnd.diagnose(2, j, null);
				}
			}
			if (typeof __oldOnload === "function") {
				__oldOnload();
			}
			d_wnd.diagnose_efform_onload(window);
		}
	}
</script>

<%
	//ei.setMsg("");
%>


<EF:EiInfo />
