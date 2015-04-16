var reportId = "01";//报表标识
var reportBelongTo = "01";//报表归属
var reportVersion = "01";//报表版本
/*初次加载*/  	
efform_onload = function ()
{
	efform_onload_er();
}

/*生成报表*/
button_gen_onclick = function () {
	var num = ef.get("inqu_status-0-num").value;
	gen_report("num="+num);//获取所需参数并传递gen_report方法  多参数格式：gen_report("num=9,companyCode=9")
}

/*打印预览*/
button_printview_onclick = function(){
	printview();
}

/*打印 弹出页面*/
button_print_onclick = function(){
	efwindow.show(null,"printContent","center");
	$('#coverMask').remove(); 
	var iframe=$('<iframe id="coverMask"/>').css({filter:'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)', top:0,left:0,display:"block",position:"absolute","z-index":-1}).attr({src:"javascript:false;"});
    var co=$('#printContent').parent();
	iframe.width(co.width()).height(co.height());
	$('#printContent').parent().append(iframe);
}

button_prcten_onclick = function(){
	prcten();
}