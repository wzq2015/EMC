//切换显示模式
var fullScreenStatus = "inline";

// 切换显示模式
function toggleFullScreen() {
	if (fullScreenStatus == "inline") {
		fullScreenStatus = "none";

		if (parent.document.getElementById("leftTree") != null) {
			parent.document.getElementById("leftTree").style.display = "none";
		}
		if (parent.document.getElementById("middleSplitter") != null) {
			parent.document.getElementById("middleSplitter").style.display = "none";
		}
		if (parent.document.getElementById("frameHeadLine") != null) {
			parent.document.getElementById("frameHeadLine").style.display = "none";
		}
		if (parent.document.getElementById("frameMenuLine") != null) {
			parent.document.getElementById("frameMenuLine").style.display = "none";
		}

		$('#' + '_efFormMenu_showMode').button("option", "icons", {
			primary : 'ef-icon ef-icon-normalscreen'
		});
	} else {
		fullScreenStatus = "inline";
		if (parent.document.getElementById("leftTree") != null) {
			parent.document.getElementById("leftTree").style.display = "inline";
		}
		if (parent.document.getElementById("middleSplitter") != null) {
			parent.document.getElementById("middleSplitter").style.display = "inline";
		}
		if (parent.document.getElementById("frameHeadLine") != null) {
			parent.document.getElementById("frameHeadLine").style.display = "inline";
		}

		if (parent.document.getElementById("frameMenuLine") != null) {
			parent.document.getElementById("frameMenuLine").style.display = "inline";
		}

		$('#' + '_efFormMenu_showMode').button("option", "icons", {
			primary : 'ef-icon ef-icon-fullscreen'
		});

	}
}

//初始化页面的配置下拉菜单
function _initFormConfigMenu() {
	
	if ($('#' + 'efFormConfigMenu').attr("_init") === true) return;
	
	// 配置下拉菜单
	var icon_css = "ef-icon ef-icon-close";
	if (__ei.attr.efFormPopup === "1")  icon_css = "ef-icon ef-icon-return";
	$('#' + '_efFormMenu_close').addClass("ef-state-default").button({
		icons : {
			primary : icon_css
		},
		disabled : true
	}).click(function(event) {
		$('#efFormConfigMenu').hide();
		window.close();
	});
	
	$('#' + '_efFormMenu_showMode').addClass("ef-state-default")
			.button({
				icons : {
					primary : "ef-icon ef-icon-fullscreen"
				},
				disabled : true
			}).click(function(event) {
				$('#efFormConfigMenu').hide();
				toggleFullScreen();
			});

	var newform = window.parent.__newForm;
	if (newform === false) {
		$('#' + '_efFormMenu_showMode').button("enable");
	} else {
		$('#' + '_efFormMenu_close').button("enable");
	}

	$('#' + '_efFormMenu_print').addClass("ef-state-default").button({
		icons : {
			primary : "ef-icon ef-icon-print"
		}
	}).click(function(event) {
		$('#efFormConfigMenu').hide();
		window.print();
	});
	// 页面诊断工具
	$('#' + '_efFormMenu_diagnostics').addClass("ef-state-default").button({
		icons : {
			primary : "ef-icon ef-icon-wrench"
		}
	}).click(
			function(event) {
				// 打开页面诊断工具
				$('#efFormConfigMenu').hide();
				efwindow.hide();
				efform.openNewForm('EP31',
						'methodName=initLoad&inqu_status-0-formEname='
								+ __ei.attr.efFormEname);
			});
	// 查看eiInfo
	$('#' + '_efFormMenu_viewEiInfo').addClass("ef-state-default").button({
		icons : {
			primary : "ef-icon ef-icon-collapse"
		}
	}).click(function(event) {
		// 打开查看eiinfo的页面
		$('#efFormConfigMenu').hide();
		efwindow.hide();
		efform.openNewForm('EP08');
	});
	// 查看前台交互日志
	$('#' + '_efFormMenu_viewLog').addClass("ef-state-default").button({
		icons : {
			primary : "ef-icon ef-icon-collapse"
		}
	}).click(function(event) {
		$('#efFormConfigMenu').hide();
		efform.togglenav();
	});
	// 帮助
	$('#' + '_efFormMenu_help').addClass("ef-state-default").button({
		icons : {
			primary : "ef-icon ef-icon-help"
		}
	}).click(function(event) {
		$('#efFormConfigMenu').hide();
		window.open(_helpFilePath);
	});
	
	// 收藏
	$('#' + '_efFormMenu_favorites').addClass("ef-state-default").button({
		icons : {
			primary : "ef-icon ef-icon-favorites"
		}
	}).click(function(event) {
		favorites();
	});

	// 去除下拉菜单中图标的背景色
	$("#efFormConfigMenu").find("a").css("border", "none");//.css("background", "transparent");
	$("#efFormConfigMenu").find("span");//.css("background-color", "white");

	$('#' + 'efFormConfigMenu').attr("_init", true);
}

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

//初始化区域的配置下拉菜单
function _initRegionConfigMenu() {
	
   if ($('#' + 'efRegionConfigMenu').attr("_init") === true)
		return;

	$('#' + '_efRegionMenu_clear').addClass("ef-state-default").button({
		icons : {
			primary : "ef-icon ef-icon-clear"
		},
		label : getI18nMessages("ef.RunRegionClear", "清除区域数据")
	}).click(function(event) {
		efform.clearDiv($('#efRegionConfigMenu').attr("efRegionId"));
	});

	$('#' + '_efRegionMenu_save').addClass("ef-state-default").button({
		icons : {
			primary : "ef-icon ef-icon-save"
		},
		label : "保存查询条件"
	}).click(function(event) {
		efregion.saveQueryCondition($('#efRegionConfigMenu').attr("efRegionId"));
	});
	
	$('#' + '_efRegionMenu_load').addClass("ef-state-default").button({
			icons : {
				primary : "ef-icon ef-icon-load"
			},
			label : "读取保存条件"
		}).click(function(event) {
			efregion.loadQueryCondition($('#efRegionConfigMenu').attr("efRegionId"));
	});
	
	// 去除下拉菜单中图标的背景色
	$("#efRegionConfigMenu").find("a").css("border", "none");//.css("background", "transparent");
	//$("#efRegionConfigMenu").find("span").css("background-color", "white");
	$("#efRegionConfigMenu").find("span").addClass("ef-region-configMenuSpan");
	
	$('#' + 'efRegionConfigMenu').attr("_init", true);
}

//初始化状态提示
function _initFormStatusDiv() {

	if ($('#' + 'efFormStatus').attr("_init") === true) return;
	
	/*
	$('#' + 'efFormStatus li').hover(
			function () {
				$(this).addClass("ui-state-hover");
			},
			function () {
				$(this).removeClass("ui-state-hover");				
			});
	*/
	
	// 状态行提示图标
	$('#' + '_eiStatusImg').click(function(event) {
		ef.toggleDivDisplay('efFormDetailDiv');
		return false;
	});

	// 关闭状态行图标
	$('#' + '_closeStatus').click(function(event) {
		$('#efFormStatus').dialog('close');
		return false;
	});

	// 固定状态行图标
	$('#' + '_stickStatus').attr("stickStatus", "w").click(function() {
		if ($('#' + '_stickStatus').attr("stickStatus") == "w") {
			$('#' + '_stickStatus').addClass('ui-icon-pin-s').removeClass("ui-icon-pin-w").attr("stickStatus", "s");
			clearTimeout($("#efFormStatus").attr("timeId"));
		} else {
			$('#' + '_stickStatus').addClass('ui-icon-pin-w').removeClass("ui-icon-pin-s").attr("stickStatus", "w");
		}
		return false;
	});

	$('#' + 'efFormStatus').attr("_init", true);
}

//初始化页面首部DIV
function _initFormHeadDiv() {
	if ($('#' + 'efFormHead').attr("_init") === true) return;
	
	// 页面配置图标
	$('#' + '_efFormConfig').addClass("ef-state-default ef-form-configDiv").button({
		icons : {
			primary : "ef-icon ef-icon-gear",
			secondary : "ef-icon ef-icon-expand"
		},
		text : false
	}).css({'height':'20px','margin':'0px'}).click(function(event) {
		$('#_efFormConfigMenu').children().hide();
		
		var configMenuObj = $('#efFormConfigMenu');
		var leftPos = event.clientX - configMenuObj.outerWidth();
		configMenuObj.css({
			top : event.clientY + "px",
			left : leftPos,
			position : "absolute"
		}).css("z-index", "10").show();

		$("body").click(function() {

			configMenuObj.hide();
		});
		return false;
	});

	// 去除首行图标按钮的背景色
	$("#efFormHead").find("a").css("border", "none");//.css("background","transparent");
			
	$('#' + 'efFormHead').attr("_init", true);
}

$(document).ready(function() {
            //判断是否在iFrame中 
			//如果是，将head和tail隐藏，同时添加样式ef-form-iframe-body
 			if(self.frameElement != null && (self.frameElement.tagName == "IFRAME" || self.frameElement.tagName == "iframe")){
 				$( "#ef_form_head" ).hide();
 				$( "#_efFormGuide" ).hide();
 				
 				$(document.body).addClass("ef-form-iframe-body");
            } 
 			
 			//引入IE定制化样式
 			if($.browser.msie) { 
 				$(document.body).addClass("ef-form-ie");
			} 
			
			//初始化
			_initFormConfigMenu();			
			_initFormHeadDiv();
			_initFormStatusDiv();

			_initRegionConfigMenu();			

			efform.setStatus(__ei.status, __ei.msg, __ei.msgKey);
});

$(document).ready(function() {

	addButtonEffect();
	$("button").button();

	$(window).bind(	"load resize", 	function() {
		// 圆角样式
		$(".benma_ui_tab li").addClass("ef-cornerredius-top");
		$(".tab_item .tab_item1").addClass("ef-cornerredius-tl");
		$(".tab_item .tab_item3").addClass("ef-cornerredius-tr");

		// 标题栏/工具栏类样式
		$(".ef-grid-func").addClass("ef-header");
		/*
		 * $(".tableColumnHeader
		 * .tableColumn").addClass("ef-header");
		 */
		$(".ef-grid-tableHeader").addClass("ef-header");

	});
});

