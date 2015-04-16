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
	<script type="text/javascript" src="./EW/EW02.js"></script>	
	<link rel="stylesheet" type="text/css" media="screen" href="./EW/WorkflowDesigner/js/layout/layout.css" />
<script type="text/javascript" src="EW/WorkflowDesigner/js/layout/jquery.layout.js"></script>
<script type="text/javascript">

	var outerLayout, innerLayout;

	/*
	 *#######################
	 *     ON PAGE LOAD
	 *#######################
	 */
	$(document).ready( function() {
		// create the OUTER LAYOUT
			outerLayout = $("body").layout(layoutSettings_Outer);

			/*******************************
			 ***  CUSTOM LAYOUT BUTTONS  ***
			 *******************************
			 *
			 * Add SPANs to the east/west panes for customer "close" and "pin" buttons
			 *
			 * COULD have hard-coded span, div, button, image, or any element to use as a 'button'...
			 * ... but instead am adding SPANs via script - THEN attaching the layout-events to them
			 *
			 * CSS will size and position the spans, as well as set the background-images
			 */

			// BIND events to hard-coded buttons in the NORTH toolbar
			//outerLayout.addToggleBtn("#tbarToggleNorth", "north");
			//outerLayout.addOpenBtn("#tbarOpenSouth", "south");
			//outerLayout.addCloseBtn("#tbarCloseSouth", "south");
			//outerLayout.addPinBtn("#tbarPinWest", "west");
			//outerLayout.addPinBtn("#tbarPinEast", "east");

			// save selector strings to vars so we don't have to repeat it
			// must prefix paneClass with "body > " to target ONLY the outerLayout panes
			//var westSelector = ".ui-layout-west"; // outer-west pane
			var eastSelector = ".ui-layout-east"; // outer-east pane

			// CREATE SPANs for pin-buttons - using a generic class as identifiers
			//$("<span></span>").addClass("pin-button").prependTo(westSelector);
			$("<span></span>").addClass("pin-button").prependTo(eastSelector);
			// BIND events to pin-buttons to make them functional
			//outerLayout.addPinBtn(westSelector + " .pin-button", "west");
			outerLayout.addPinBtn(eastSelector + " .pin-button", "east");

			// CREATE SPANs for close-buttons - using unique IDs as identifiers
			//$("<span></span>").attr("id", "west-closer")
			//		.prependTo(westSelector);
			$("<span></span>").attr("id", "east-closer")
					.prependTo(eastSelector);
			// BIND layout events to close-buttons to make them functional
			//outerLayout.addCloseBtn("#west-closer", "west");
			outerLayout.addCloseBtn("#east-closer", "east");

			/* Create the INNER LAYOUT - nested inside the 'center pane' of the outer layout
			 * Inner Layout is create by createInnerLayout() function - on demand
			 *
				innerLayout = $("div.pane-center").layout( layoutSettings_Inner );
			 *
			 */

			// DEMO HELPER: prevent hyperlinks from reloading page when a 'base.href' is set
			$("a").each( function() {
				var path = document.location.href;
				if (path.substr(path.length - 1) == "#")
					path = path.substr(0, path.length - 1);
				if (this.href.substr(this.href.length - 1) == "#")
					this.href = path + "#";
			});

		});

	/*
	 *#######################
	 * INNER LAYOUT SETTINGS
	 *#######################
	 *
	 * These settings are set in 'list format' - no nested data-structures
	 * Default settings are specified with just their name, like: fxName:"slide"
	 * Pane-specific settings are prefixed with the pane name + 2-underscores: north__fxName:"none"
	 */
	layoutSettings_Inner = {
		applyDefaultStyles : true // basic styling for testing & demo purposes
		,
		minSize : 20 // TESTING ONLY
		,
		spacing_closed : 14,
		north__spacing_closed : 8,
		south__spacing_closed : 8,
		north__togglerLength_closed : -1 // = 100% - so cannot 'slide open'
		,
		south__togglerLength_closed : -1,
		fxName : "slide" // do not confuse with "slidable" option!
		,
		fxSpeed_open : 1000,
		fxSpeed_close : 2500,
		fxSettings_open : {
			easing : "easeInQuint"
		},
		fxSettings_close : {
			easing : "easeOutQuint"
		},
		north__fxName : "none",
		south__fxName : "drop",
		south__fxSpeed_open : 500,
		south__fxSpeed_close : 1000
		//,	initClosed:						true
		,
		center__minWidth : 200,
		center__minHeight : 200
	};

	/*
	 *#######################
	 * OUTER LAYOUT SETTINGS
	 *#######################
	 *
	 * This configuration illustrates how extensively the layout can be customized
	 * ALL SETTINGS ARE OPTIONAL - and there are more available than shown below
	 *
	 * These settings are set in 'sub-key format' - ALL data must be in a nested data-structures
	 * All default settings (applied to all panes) go inside the defaults:{} key
	 * Pane-specific settings go inside their keys: north:{}, south:{}, center:{}, etc
	 */
	var layoutSettings_Outer = {
		name : "outerLayout" // NO FUNCTIONAL USE, but could be used by custom code to 'identify' a layout
		// options.defaults apply to ALL PANES - but overridden by pane-specific settings
		,
		defaults : {
			size : "auto",
			minSize : 50,
			paneClass : "pane" // default = 'ui-layout-pane'
			,
			resizerClass : "resizer" // default = 'ui-layout-resizer'
			,
			togglerClass : "toggler" // default = 'ui-layout-toggler'
			,
			buttonClass : "button" // default = 'ui-layout-button'
			,
			contentSelector : ".content" // inner div to auto-size so only it scrolls, not the entire pane!
			,
			contentIgnoreSelector : "span" // 'paneSelector' for content to 'ignore' when measuring room for content
			,
			togglerLength_open : 35 // WIDTH of toggler on north/south edges - HEIGHT on east/west edges
			,
			togglerLength_closed : 35 // "100%" OR -1 = full height
			,
			hideTogglerOnSlide : false // hide the toggler when pane is 'slid open'
			,
			togglerTip_open : "Close This Pane",
			togglerTip_closed : "Open This Pane",
			resizerTip : "Resize This Pane"
			//	effect defaults - overridden on some panes
			,
			fxName : "slide" // none, slide, drop, scale
			,
			fxSpeed_open : 750,
			fxSpeed_close : 1500,
			fxSettings_open : {
				easing : "easeInQuint"
			},
			fxSettings_close : {
				easing : "easeOutQuint"
			}
		},
		north : {
			maxSize : 25,
			spacing_open : 1 // cosmetic spacing
			,
			togglerLength_open : 0 // HIDE the toggler button
			,
			togglerLength_closed : -1 // "100%" OR -1 = full width of pane
			,
			resizable : false,
			slidable : false
			//	override default effect
			,
			fxName : "none"
		},
		south : {
			maxSize : 25,
			spacing_closed : 0 // HIDE resizer & toggler when 'closed'
			,
			slidable : false // REFERENCE - cannot slide if spacing_closed = 0
			,
			initClosed : false
		//	CALLBACK TESTING...
		//,	onhide_start:			function () { return confirm("START South pane hide \n\n onhide_start callback \n\n Allow pane to hide?"); }
		//,	onhide_end:				function () { alert("END South pane hide \n\n onhide_end callback"); }
		//,	onshow_start:			function () { return confirm("START South pane show \n\n onshow_start callback \n\n Allow pane to show?"); }
		//,	onshow_end:				function () { alert("END South pane show \n\n onshow_end callback"); }
		//,	onopen_start:			function () { return confirm("START South pane open \n\n onopen_start callback \n\n Allow pane to open?"); }
		//,	onopen_end:				function () { alert("END South pane open \n\n onopen_end callback"); }
		//,	onclose_start:			function () { return confirm("START South pane close \n\n onclose_start callback \n\n Allow pane to close?"); }
		//,	onclose_end:			function () { alert("END South pane close \n\n onclose_end callback"); }
		//,	onresize_start:			function () { return confirm("START South pane resize \n\n onresize_start callback \n\n Allow pane to be resized?)"); }
		//,	onresize_end:			function () { alert("END South pane resize \n\n onresize_end callback \n\n NOTE: onresize_start event was skipped."); }
		},
		west : {
			size : 250,
			spacing_closed : 21 // wider space when closed
			,
			togglerLength_closed : 21 // make toggler 'square' - 21x21
			,
			togglerAlign_closed : "top" // align to top of resizer
			,
			togglerLength_open : 0 // NONE - using custom togglers INSIDE west-pane
			,
			togglerTip_open : "Close West Pane",
			togglerTip_closed : "Open West Pane",
			resizerTip_open : "Resize West Pane",
			slideTrigger_open : "click" // default
			,
			initClosed : false
			//	add 'bounce' option to default 'slide' effect
			,
			fxSettings_open : {
				easing : "easeOutBounce"
			}
		},
		east : {
			size : 250,
			spacing_closed : 21 // wider space when closed
			,
			togglerLength_closed : 21 // make toggler 'square' - 21x21
			,
			togglerAlign_closed : "top" // align to top of resizer
			,
			togglerLength_open : 0 // NONE - using custom togglers INSIDE east-pane
			,
			togglerTip_open : "Close East Pane",
			togglerTip_closed : "Open East Pane",
			resizerTip_open : "Resize East Pane",
			slideTrigger_open : "mouseover",
			initClosed : true
			//	override default effect, speed, and settings
			,
			fxName : "drop",
			fxSpeed : "normal",
			fxSettings : {
				easing : ""
			}
		// nullify default easing
		},
		center : {
			paneSelector : "#mainContent" // sample: use an ID to select pane instead of a class
			,
			minWidth : 200,
			minHeight : 200
		}
	};
</script>
</head>
<body class="ui-layout-container" style="overflow: hidden; width: auto; height: auto; margin: 0px; position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; ">

<form id="EW02" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
<!-- 
<div class="ui-layout-west">

	<div class="header">业务流程管理</div>

	<div class="content">
		<EF:EFTree id="tree1" text="流程目录" model="processtree" configFunc="configTree" />
	</div>

	<div class="footer"></div>

</div>
-->

<div class="ui-layout-east">
	<div class="header">目录权限说明</div>
	
	<div class="content">		
	</div>
	<div class="footer"></div>
</div>

<!--
<div class="ui-layout-north">
	<div class="header">流程设计器</div>	
	 
	<ul class="toolbar">
		<li id="tbarToggleNorth" class="first"><span></span>隐藏工具栏</li>		
		<li id="tbarPinWest"><span></span>锁定/隐藏流程管理</li>
		<li id="tbarPinEast" class="last"><span></span>锁定/隐藏帮助</li>
		
		<li id="tbarOpenSouth"><span></span>打开状态栏</li>
		<li id="tbarCloseSouth"><span></span>关闭状态栏</li>
	</ul>
	 
</div>

<!--
<div class="ui-layout-south">
	<div class="header">WorkFlow Designer 1.0</div>	
	<div class="content" style="position: relative; height: 37px; ">
		<p></p>
	</div>
</div>
-->

<div id="mainContent">
<EF:EFInput blockId="inqu_status" row="0" ename="authorize" type="hidden"/>
<div id = "ef_region_role" title="选择授权的角色" efRegionShowClear=true>
<div  id="basicAttrInputs">
		<table>	
		<tr >
			<td nowrap="nowrap" align="left" >&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
			<td nowrap="nowrap">&nbsp;</td>
		 </tr>	
		  <tr >
			<td nowrap="nowrap" align="left" >角色名称:</td>
			<td nowrap="nowrap" >
			     <EF:EFInput ename="identity" type="hidden"/>
				 <EF:EFInput ename="identityDesc"  etc="size=50px;readonly=true"/>
			</td>
			<td nowrap >
		    	<EF:EFButton ename="select" cname="选择角色" />
		    </td>
		    <td nowrap >
		    	<EF:EFButton ename="query" cname="查询目录权限" />
		    </td>	
		 </tr>
		</table>
	</div>
</div>
<EF:EFRegion/>	

<div id = "ef_region_auth" title="勾选需要赋权限的目录" efRegionShowClear=true>
<div id="ef_tab_y"  lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">
<div id="ad" title="流程管理权限" >

<div id="ef_region_ad" title="" style="width=200px;height:450px;">
<div >
<br>
		<EF:EFTree id="adtree" text="流程目录" model="adtree" configFunc="configADTree" />
</div>	
</div>

</div>




<div id="cu" title="流程定制权限" >
<div id="ef_region_cu" title="" style="width=200px;height:450px;">
<div >
<br>
 <EF:EFTree id="cutree" text="流程目录" model="cutree" configFunc="configCUTree" />
 </div>	
</div>
</div>

<div id="cf" title="流程配置权限" >
<div id="ef_region_cf" title="" style="width=200px;height:450px;">
<div >
<br>
<EF:EFTree id="cftree" text="流程目录" model="cftree" configFunc="configCFTree" />
</div>	
</div>
</div>

</div>




<EF:EFTab tabId="y" />

<div style="overflow:hidden;width:100%">
		<table>
		  <tr>		  	    
		   <td align="left" nowrap style="width:40%">
	         </td>		   
		     <td align="right" nowrap style="width:5%">
		     <EF:EFButton ename="confirm" cname="确定" />
		     </td> 
		     <td align="left" nowrap style="width:5%">
		     <EF:EFButton ename="cancel" cname="取消" />
		     </td> 
		     <td align="left" nowrap style="width:40%">
	         </td>	
		    </tr>
 	</table>
</div>

</div>
<EF:EFRegion/>
</div>
<jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>
