<%@page import="com.baosight.iplat4j.ep.monitor.DiagnosticJob"%>
<%@page import="com.baosight.iplat4j.ep.monitor.DiagnosticJobType"%>
<%@page import="com.baosight.iplat4j.ep.monitor.Diagnostics"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.ei.EiConstant"%>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo"%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>

<%
	String efFormEname = (String) request.getAttribute("efFormEname");
	DiagnosticJob log = Diagnostics.start(DiagnosticJobType._0600_FORM_RENDER, efFormEname, request.getRequestURI());
	pageContext.setAttribute("__log__", log, PageContext.REQUEST_SCOPE);

	String efFormCname = (String) request.getAttribute("efFormCname");
	String pageTitle = "";
	if (efFormEname != null) {
		pageTitle = efFormEname + "/" + efFormCname;
	}else{
		efFormEname = (String)request.getParameter("efFormEname");
		pageTitle = efFormEname + "/" + efFormCname;
	}
	String help=I18nMessages.getText("E_plat_form_help","帮助");
	String favorites=I18nMessages.getText("E_plat_form_favorites","收藏");
	String print=I18nMessages.getText("E_plat_form_print","打印当前页面");
	String close=I18nMessages.getText("E_plat_form_close","关闭当前页面");
	String fullScreen=I18nMessages.getText("E_plat_form_fullScreen","全屏显示当前页面");
	String eiStatusImg=I18nMessages.getText("E_plat_form_eiStatusImg","显示详细信息");
	String codeMsg=I18nMessages.getText("E_plat_form_codeMsg","信息代码的帮助信息");
	String helpUrl = FrameworkInfo.getHelpUrl();
	String helpType = FrameworkInfo.getHelpType();
	
	String helpFilePath = null;
	if (efFormEname.startsWith("E")) {
		helpFilePath = helpUrl + "platform/" + efFormEname + "." + helpType;
	} else {
		helpFilePath = helpUrl + efFormEname.substring(0, 2) + "/"
		+ efFormEname + "." + helpType;
	}
	
	String new_href = "";
	String new_tab_href = "";
	String image_setpath = "";
	
	//	从session中获得用户选择的风格和字体，如未选择过，默认为蓝色风格和小号字体
	String choose_one = "default";
	String para = (String)session.getAttribute("userInterfaceStyle");
	if(para!=null&&para.length()>0){
		choose_one = para;
	}

%>

<jsp:useBean id="ei" scope="request"
	class="com.baosight.iplat4j.core.ei.EiInfo" />

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<EF:EFInput blockId="" ename="__$$DIAGNOSE$$__" row="" type="hidden" />
<script type="text/javascript">
<%
	String isDiagForm = efFormEname.startsWith("EP31")?"true":"false";
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
	var d_wnd = find_diagnose_window();
	if (d_wnd != null) {
		d_wnd.diagnose(3, null, window);
	}
</script>

<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.tab.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.treeTable.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.flexbox.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.alerts.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.colorbox.js"></script>
<script type="text/javascript" src="./EF/jQuery/swfupload.js"></script>
<script type="text/javascript" src="./EF/jQuery/swfupload.queue.js"></script>
<script type="text/javascript" src="./EF/jQuery/handlers.js"></script>
<script type="text/javascript" src="./EF/jQuery/fileprogress.js"></script>
<script type="text/javascript" src="./EF/CONFIG.js"></script>

<link href="./EF/EF.css" rel="stylesheet" type="text/css"/>			
<%
	//  从后台服务获取是否国际化开关
	if(FrameworkInfo.isInternational())
	{%>
		<script type="text/javascript">
			if(efresource.config != undefined && efresource.config.INTERNATIONAL != undefined ){
				efresource.config.INTERNATIONAL="true";
				// 加载必要的前台国际化资源
				resource.getInternationalValues("ef.*");
			}
		</script>
	<%}
		
	if(choose_one.equals("default")){%>
		<link href="./EF/Images/tab.css" rel="stylesheet" type="text/css"/>	
	<%}else{	
		
		new_href = "./EF/style/style"+choose_one+"/EF.css";
		new_tab_href = "./EF/style/style"+choose_one+"/Images/tab.css";

		%>
		<script type="text/javascript" src="./EF/style/style<%=choose_one %>/EFIco.js"></script>
		<link href="<%=new_href%>" rel="stylesheet" type="text/css"/>		
		<link href="<%=new_tab_href%>" rel="stylesheet" type="text/css"/>		
		
	<%}%>
<script type="text/javascript">
efvalidator.init();
</script>
<div id=ef_form_head>
  <table cellSpacing=0 cellPadding=0 width="100%" border=0>
	<col align=center width=18>
	<col align=left width=100%>
	<col align=center width=18>
	<col align=center width=18>
	<col align=center width=18>
	<tbody>
		<tr>
			<td>
			  <img style="margin:3px; margin-bottom:0px;" id="iplat_efformDev_id" title="<%=pageTitle%>" 
				<% if (FrameworkInfo.getProjectType().equals("1")) { %>
				onload="efico.setImageSrc(this,'efform.run')" src="./EF/Images/eftree_blank.png"
				<% } else {   %>
				onload="efico.setImageSrc(this,'efform.dev')" src="./EF/Images/eftree_blank.png"
				<% }   %>
				onclick="efform.togglenav();"
				ondblclick="efwindow.hide();efform.openNewForm('EP08');">
		    </td>
			<td id=pageTitle class=breadcrumbs noWrap><%=pageTitle%>&nbsp;</td>
			<td sytle=''><img style="margin-right:5px" id="iplat_helpImage_id" title="<%=help%>" 
				onload="efico.setImageSrc(this,'efform.help')" src="./EF/Images/eftree_blank.png"
				onmouseover="this.style.cursor='hand'"
				onclick="window.open('<%=helpFilePath%>')"></td>
			<td sytle=''><img style="margin-right:5px" id="iplat_favoritesImage_id" title="<%=favorites%>" 
				onload="efico.setImageSrc(this,'efform.dev')" src="./EF/Images/eftree_blank.png"
				onmouseover="this.style.cursor='hand'"
				onclick="favorites()"></td>
			<td sytle=''><img style="margin-right:5px" id="iplat_printImage_id" title="<%=print%>" 
				onload="efico.setImageSrc(this,'efform.print')" src="./EF/Images/eftree_blank.png"
				onmouseover="this.style.cursor='hand'" onclick="window.print();"></td>
			<script type="text/javascript">
				var fullScreenStatus = "inline";
				var newform=window.parent.__newForm;
				if(newform == undefined)
				{
					document.write("<td><img id='iplat_pageClose_id' style='margin-right:3px' title='<%=close%>'  <% if ((ei.getString("efFormPopup") != null) && ei.getString("efFormPopup").equalsIgnoreCase("1")) { %>  onload=\"efico.setImageSrc(this,'efform.return')\" src='./EF/Images/eftree_blank.png' <% } else {   %> onload=\"efico.setImageSrc(this,'efform.close')\" src=\"./EF/Images/eftree_blank.png\"  <% } %> onmouseover=\"this.style.cursor='hand'\" onclick='window.close();'></td>");
				}
				else if(newform != undefined || newform=='false')
				{
					document.write("<td><img id='iplat_pageFullScreen_id' style='margin-right:3px' title='<%=fullScreen%>' onload=\"efico.setImageSrc(this,'efform.tofull')\" src='./EF/Images/eftree_blank.png' onmouseover=\"this.style.cursor='hand'\" onclick='toggleFullScreen()'></td>");
				}
				
				function toggleFullScreen()
				{
					if(fullScreenStatus == "inline")
					{
						fullScreenStatus = "none";

						if(parent.document.getElementById("leftTree")!=null)
						{
							parent.document.getElementById("leftTree").style.display = "none";
						}
						if(parent.document.getElementById("middleSplitter")!=null)
						{
							parent.document.getElementById("middleSplitter").style.display = "none";
						}
						if(parent.document.getElementById("frameHeadLine")!=null)
						{
							parent.document.getElementById("frameHeadLine").style.display = "none";
						}
						if(parent.document.getElementById("frameMenuLine")!=null)
						{
							parent.document.getElementById("frameMenuLine").style.display = "none";
						}
						
						efico.setImageSrc('iplat_pageFullScreen_id','efform.full');
					}
					else
					{
						fullScreenStatus = "inline";
						if(parent.document.getElementById("leftTree")!=null)
						{
							parent.document.getElementById("leftTree").style.display = "inline";
						}
						if(parent.document.getElementById("middleSplitter")!=null)
						{
							parent.document.getElementById("middleSplitter").style.display = "inline";
						}
						if(parent.document.getElementById("frameHeadLine")!=null)
						{
							parent.document.getElementById("frameHeadLine").style.display = "inline";
						}
						
						if(parent.document.getElementById("frameMenuLine")!=null)
						{
							parent.document.getElementById("frameMenuLine").style.display = "inline";
						}
						
						efico.setImageSrc('iplat_pageFullScreen_id','efform.tofull');
					}
					
				}
				</script>
		
		</tr>
		<tr>
			<td id=efFormStatusImg>
			<div id="_eiStatusImg"><img id="__eiStatusImg" style="margin:3px" title="<%=eiStatusImg%>"
				onmouseover="this.style.cursor='hand'"
				onclick="ef.toggleDivDisplay('efFormDetailDiv');"
				<% if (ei.getStatus() == 0) { %>
				onload="efico.setImageSrc(this,'efform.normal')" src="./EF/Images/eftree_blank.png"
				<% } else {   %>
				<% if (ei.getStatus() < 0) { %>
				onload="efico.setImageSrc(this,'efform.error')" src="./EF/Images/eftree_blank.png"
				<%   } else { %>
				<% if (ei.getStatus() > 0) { %>
				onload="efico.setImageSrc(this,'efform.alert')" src="./EF/Images/eftree_blank.png"
				<%     } %> <%   }   %>
				<% } %>></div>
			</td>
			<%
						String queryKey = EiConstant.queryBlock + EiConstant.separator
						+ "0" + EiConstant.separator + "fkey=" + ei.getMsgKey();
				String linkStr = "efform.openNewForm('EP02', '"
						+ EiConstant.methodName + "=get&" + queryKey + "');";
			%>
			<td id=efFormMsg><a title="<%=codeMsg%>" onclick="<%=linkStr %>"
				onmouseover="this.style.cursor='hand'"> <span id="_eiMsgKey"><%=ei.getDisplayMsgKey()%></span>
			</a>: <span id="_eiMsg"><%=ei.getMsg()%></span></td>
			<td></td>
		</TR>
		<tr>
			<td colspan=3><span id="ei_message"></span></td>
		</tr>
	</tbody>
  </table>

  <div id=efFormDetailDiv style='display:none'>
    <table cellSpacing=0 cellPadding=0 width="100%" border=0>
	  <tr>
		<td id=efFormDetailMsg><span id="_eiDetailMsg"><%=ei.getDetailMsg()%></span></td>
	  </tr>
    </table>
  </div>

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
  
</div>
<iframe id="_dummy_iframe" src="about:blank" style="display:none;"></iframe><!-- fix iframe status bar problem -->
<script type="text/javascript">
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
			$("body").ajaxSend(function(evt, request, settings) {
				d_wnd.diagnose(1, null, window, "Ajax调用");
				var j = d_wnd.diagnose(2, null, window);
				settings.data += "&__$$DIAGNOSE$$__=" + j.id;
				var _oldSuccess = settings.success;
				settings.success = function(msg) {
					d_wnd.diagnose(3, null, window);
					_oldSuccess(msg);
					d_wnd.diagnose(4, null, window);
				};
				var _oldError = settings.error;
				settings.error = function(xmlR, status, e) {
					d_wnd.diagnose(3, null, window);
					_oldError(xmlR, status, e);
					d_wnd.diagnose(4, null, window);
				}
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

<script type="text/javascript">
//收藏
function favorites() {
	var inInfo = new EiInfo();
	inInfo.set("efFormEname", $("#efFormEname").val());
	EiCommunicator.send("ES10", "favorites", inInfo, {
		onSuccess : function(eiinfo) {
			var status = eiinfo.getStatus();
			if(status != -1)
				alert('收藏页面成功!');
			else
				alert('收藏夹已存在该页面!');
		},
		onFail : function(eMsg) {
			alert(eMsg);
		}
	}, false);
}
</script>

<%
ei.setMsg("");
%>

<EF:EiInfo />
