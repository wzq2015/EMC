//
///**
// * EFRegion控件的图片定义
// * @type 
// * 示列代码
// */
//efico.efregion = {
//	"expand": 	[EF_IMAGES_PATH, "efregion_expand.gif"],
//	"collapse": [EF_IMAGES_PATH, "efregion_collapse.gif"],
//	"clear":	[EF_IMAGES_PATH,"efregion_clear.gif"]

if (typeof efgrid !== 'undefined') {
	efgrid.config = {
		READONLY_PROMPT : "true",
		XLS_EXPORT_MODE : "key", // xls导出默认导出key
		GRID_TOOLBAR_POSITION : "top", // 可以是top,bottom
		//设置用户不操作时的超时时间
		SESSION_TIMEOUT:1000 * 60 * 25, // 25 minutes;
		//设置可翻页的条数范围(不设置表示不限制范围)
		PAGE_SCOPE:20000,//默认超过20000条所有的翻页禁用
		SHOW_LINE_NUMBER:"false", //默认不显示行号
		AUTO_HEIGHT:"false" //grid高度默认不自适应
	};
}

if (typeof efresource !== 'undefined') {
	efresource.config = {
		INTERNATIONAL : "false"
	};
}

if (typeof efbutton !== 'undefined') {
	// 控制按钮在禁用状态和没有状态灰化还是隐藏
	efbutton.config = {
		HIDE_FORBIDDEN : "false",
		HIDE_NOAUTH : "false"
	};
}

if (typeof efregion !== 'undefined') {
	efregion.config = {
		BUTTON_POSITION : "bottom" // efregion中的按钮默认放在region底部
	}
}

if (typeof efform !== 'undefined') {
	efform.config = {
		MSG_SHOWTIME : "15000", // efform弹出提示信息停留时间设置
		MSG_ACCUMULATE: "false" // efform弹出提示信息是否根据异常消息进行累加
	}
}
