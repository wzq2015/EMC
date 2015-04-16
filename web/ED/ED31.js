var _DIAGNOSE_ID = 0;

var diagnoseInfoMap = new Object();

// function get_current_job() {
// return diagnoseInfoMap[_DIAGNOSE_ID];
// }

function desc_job(info) {
	var r = [];
	r.push("id=" + info.id);
	r.push("name=" + info.name);
	r.push("ok=" + info.ok);
	r.push("t1=" + info.t1);
	r.push("t2=" + info.t2);
	r.push("t3=" + info.t3);
	r.push("t4=" + info.t4);
	r.push("step=" + info.step);
	r.push("window=" + isAvailable(info.wnd) ? info.wnd.document.title : "");
	return r.join(",");
}

/**
 * 收集诊断信息
 * 
 * @param step
 * @param job
 *            step为1时，job为null，如果没有传入wnd，需要依赖job来确定
 * @param wnd
 *            如果传入window，依赖window来确定当前的job
 * @param name
 *            step为1时，需要设置
 */
function diagnose(step, job, wnd, name) {
	// var job = get_current_job();
	var currentJob = null;
	if (isAvailable(job)) {
		currentJob = job;
	} else if (isAvailable(wnd)) {
		// 通过window来定位
		var id = wnd.ef.get("__$$DIAGNOSE$$__").value;
		currentJob = diagnoseInfoMap[id];
	}
	switch (step) {
	case 1: // 前台开始提交
		// if(isAvailable(job) && !job.ok) {
		// if (job.step == 1) {
		// // 点击按钮等也可能触发打开新页面等操作，直接忽略
		// } else {
		// alert("诊断任务异常[1]：开始新的诊断时有任务未结束[" + desc_job(job) + "]！");
		// break;
		// }
		// }
		if (isAvailable(currentJob)) {
			if (!currentJob.ok) {
				if (!isAvailable(currentJob.wnd)) {
					currentJob.wnd = wnd;
				}
				return currentJob;
			}
		}
		// 新任务
		_DIAGNOSE_ID++;
		var newJob = new Object();
		newJob.name = name;
		newJob.id = _DIAGNOSE_ID;
		newJob.t1 = new Date().getTime();
		newJob.ok = false;
		newJob.step = 1;
		newJob.wnd = wnd;
		if (isAvailable(wnd)) {
			wnd.ef.get("__$$DIAGNOSE$$__").value = newJob.id;
		}
		diagnoseInfoMap[newJob.id] = newJob;
		return newJob;
	case 2: // 前台提交之前
		if (isAvailable(currentJob)) {
			currentJob.t2 = new Date().getTime();
			currentJob.step = 2;
			if (!isAvailable(currentJob.wnd)) {
				currentJob.wnd = wnd;
			}
			return currentJob;
		} else {
			alert("invalid arguments[2]");
		}
		// if (job.ok) {
		// alert("诊断任务异常[2]：任务已经结束[" + desc_job(job) + "]！");
		// break;
		// }
		return null;
	case 3: // 返回到前台
		if (isAvailable(currentJob)) {
			currentJob.t3 = new Date().getTime();
			currentJob.step = 3;
			if (!isAvailable(currentJob.wnd)) {
				currentJob.wnd = wnd;
			}
			return currentJob;
		} else {
			alert("invalid arguments[3]");
		}
		// if (job.ok) {
		// alert("诊断任务异常[3]：任务已经结束[" + desc_job(job) + "]！");
		// break;
		// }
		return null;
	case 4: // 前台渲染结束
		if (isAvailable(currentJob)) {
			currentJob.t4 = new Date().getTime();
			currentJob.step = 4;
			currentJob.ok = true;
			if (!isAvailable(currentJob.wnd)) {
				currentJob.wnd = wnd;
			}
			diagnose_finish(currentJob);
			return currentJob;
		} else {
			alert("invalid arguments[4]");
		}
		// if (job.ok) {
		// alert("诊断任务异常[4]：任务已经结束[" + desc_job(job) + "]！");
		// break;
		// }
		return null;
	default:
		alert("诊断任务异常[" + step + "]：[" + desc_job(job) + "]！");
	}
}

function find_diagnose_window() {
	var _wnd = window;
	while (!isAvailable(_wnd._DIAGNOSE_ID)) {
		if (_wnd != _wnd.opener) {
			_wnd = _wnd.opener;
			continue;
		}
		if (_wnd != _wnd.top) {
			_wnd = _wnd.top;
			continue;
		}
		_wnd = null;
		break;
	}
	return _wnd;
}

function efform_onload() {
	efregion.show("ef_region_inqu");
	$("#ef_tab_y > br").filter(":first").css("display", "none");
	$("#ef_tab_y > #jquery_tab_div_content").css("border", "0px");
	$("#ef_tab_y").css("padding-top", "8px").css("padding-left", "4px");
	// efregion.show("ef_region_result");
	var formEname = ef.get("inqu_status-0-formEname").value.toUpperCase();
	if (formEname != null && formEname.trim().length > 0) {
		openDiagnoseForm(formEname);
	}
}

function diagnose_finish(info) {
	var url = frame_url + "&id=" + info.id + "&name=" + encodeURIComponent(info.name) + "&t1="
			+ info.t1 + "&t2=" + info.t2 + "&t3=" + info.t3 + "&t4=" + info.t4;
	// ef.get("frame").src = encodeURI(url);
	$("#ef_tab_y iframe")[1].src = url;
	// efRoundIframechange_option("ef_tab_y", 1);
}

function openDiagnoseForm(form_ename) {
	try {
		efRoundIframechange_option("ef_tab_y", 0);
	} catch (ex) {
	}
	var j = diagnose(1, null, null, "加载页面: [" + form_ename + "]");
	$("#ef_tab_y iframe")[0].src = CONTEXT_PATH
			+ "/DispatchAction.do?efFormEname=" + form_ename
			+ "&__$$DIAGNOSE$$__=" + j.id;
	// var wnd = efform.openNewForm(form_ename, "__$$DIAGNOSE$$__=" + j.id);
	diagnose(2, j, null);
}

/**
 * 打开的页面加载完成的回调
 */
function diagnose_efform_onload(wnd, id) {
	diagnose(4, null, wnd);
	// 按钮点击
	var _oldBtnClick = wnd.efbutton.onClickButton;
	wnd.efbutton.onClickButton = function(button_ename, button_cname) {
		diagnose(1, null, wnd, "点击按钮: " + button_cname + "[" + button_ename
				+ "]");
		_oldBtnClick(button_ename, button_cname);
	}
	// 表单提交
	var _oldSubmitForm = wnd.efform.submit;
	wnd.efform.submit = function(formSubmit) {
		diagnose(2, null, wnd);
		_oldSubmitForm(formSubmit);
	}

	// 翻页等
	var _oldJumpTo = wnd.efpage.jumpTo;
	wnd.efpage.jumpTo = function(grid_id) {
		diagnose(1, null, wnd, "跳转到指定页: [" + grid_id + "]");
		_oldJumpTo(grid_id);
	}

	var _oldLimit = wnd.efpage.limit;
	wnd.efpage.limit = function(grid_id) {
		diagnose(1, null, wnd, "改变每页记录数: [" + grid_id + "]");
		_oldLimit(grid_id);
	}

	var _oldGoFirst = wnd.efpage.goFirst;
	wnd.efpage.goFirst = function(grid_id) {
		diagnose(1, null, wnd, "到首页: [" + grid_id + "]");
		_oldGoFirst(grid_id);
	}

	var _oldGoPrevious = wnd.efpage.goPrevious;
	wnd.efpage.goPrevious = function(grid_id) {
		diagnose(1, null, wnd, "上一页: [" + grid_id + "]");
		_oldGoPrevious(grid_id);
	}

	var _oldGoNext = wnd.efpage.goNext;
	wnd.efpage.goNext = function(grid_id) {
		diagnose(1, null, wnd, "下一页: [" + grid_id + "]");
		_oldGoNext(grid_id);
	}

	var _oldGoLast = wnd.efpage.goLast;
	wnd.efpage.goLast = function(grid_id) {
		diagnose(1, null, wnd, "到末页: [" + grid_id + "]");
		_oldGoLast(grid_id);
	}

	// 打开弹出页面
	var _oldOpenNewForm = wnd.efform.openNewForm;
	wnd.efform.openNewForm = function(form_ename, para_list, is_maximum) {
		var j = diagnose(1, null, null, "弹出页面: [" + form_ename + "]");
		if (isAvailable(para_list)) {
			para_list += "&__$$DIAGNOSE$$__=" + j.id;
		} else {
			para_list = "__$$DIAGNOSE$$__=" + j.id;
		}
		var _w = _oldOpenNewForm(form_ename, para_list, is_maximum);
		diagnose(2, j, _w);
	}

	// 提交
	var _oldSubmitData = wnd.efgrid._submitFormData;
	wnd.efgrid._submitFormData = function(grid_ids, package_name, service_name,
			method_name, include_selected_data, include_metadata,
			need_validate, need_callback) {
		// 处理非典型提交
		// var job = get_current_job();
		// var flag = false;
		// if (job.ok == true) {
		diagnose(1, null, wnd, "提交表单: [" + method_name + "]");
		// }
		_oldSubmitData(grid_ids, package_name, service_name, method_name,
				include_selected_data, include_metadata, need_validate,
				need_callback);
	}

	// 加载Tab页面
	// var _oldLoadTabPage = wnd.loadTabPage;
	// wnd.loadTabPage = function(index) {
	// var frame = wnd.frames[index];
	// var _p = wnd.path[index];
	// var j = diagnose(1, null, null, "加载TAB页面: [" + _p + "]");
	// _p += "&__$$DIAGNOSE$$__=" + j.id;
	// var _path = wnd.selected == null ? _p : wnd.composePath(frame, _p,
	// index);
	// if (wnd.$(frame).attr("__src") != _path) {
	// wnd.$(frame).attr("__src", _path);
	// frame.src = _path;
	// wnd.efform.setStatus(0, "正在加载...");
	// }
	// //_oldLoadTabPage(index);
	// diagnose(2, j, null);
	// }

}

function openFormById(eventTag) {
	var event = eventTag || window.event;
	if (event.keyCode == 13) {
//		if (status == "true") {
			var formEname = ef.get("inqu_status-0-formEname").value
					.toUpperCase();
			if (formEname != null) {
				openDiagnoseForm(formEname);
			}
//		} else {
//			alert("诊断未开启！");
//		}
	}
}

//function button_change_onclick() {
//	var inInfo = new EiInfo();
//	inInfo.set("status", status == "true" ? "false" : "true");
//	EiCommunicator.send("ED31", "changeStatus", inInfo, null, false, false);
//	if (ajaxEi != null) {
//		status = ajaxEi.get("status");
//		$("#button_change a").text(status == "true" ? " 已开启 [点击关闭]" : " 已关闭 [点击开启]");
//	}
//}
