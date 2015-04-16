$(document).ready(function() {
	//判断是否需要显示导航栏参数
	if($("#headtail").val()=="none" || $( "#_efFormGuide" ).css('display')=='none'){
		$( "#_efFormGuide" ).hide();
		return;
	};
	
	$('#' + '_efFormGuide_form').button({
		icons : {
			primary : "ui-icon-calculator"
		},
		text : false
	}).click(function(event) {
		$("#_efFormInput").hide();
		_showVisitForm();
		return false;
	});
	$('#' + '_efFormGuide_guide').button({
		icons : {
			primary : "ui-icon-person"
		},
		text : false
	}).click(function(event) {
		$("#_efVisitForm").hide();
		_showGuide();
		return false;
	});
	$('#' + '_efFormGuide_mail').button({
		icons : {
			primary : "ui-icon-mail-closed"
		},
		text : false
	})
	.click(function(event) {
		//问题反馈		
//		_showFeedBack();		
		return false;
	});
	
	_showFeedBack();
	$('#' + '_efFormGuide_comment').button({
		icons : {
			primary : "ui-icon-comment"
		},
		text : false
	}).click(function(event) {
		return false;
	});
	$('#' + '_efFormGuide_gotoTop').button({
		icons : {
			primary : "ui-icon-arrowthickstop-1-n"
		},
		text : false
	}).click(function(event) {
		return false;
	});
	$('#' + '_efFormGuide_close').button({
		icons : {
			primary : "ui-icon-circle-close"
		},
		text : false
	}).click(function(event) {
		$("#_efFormInput").hide();
		$("#_efVisitForm").hide();
		$( "#_efFormGuide" ).hide();
		$(document).unbind('mousedown', closeformGuide);
		return false;
	});
	//$( "#_efFormGuide" ).buttonset();
	$( "#_efFormGuide" ).draggable();

	$(document).bind('mousedown', closeformGuide);
	
	$("#_efFormInput").keypress(function(event) {
		  if ( event.which == 13 ) {
			  var formEname = ef.get("_formEnameInput").value.toUpperCase();
		  	  formEname = $.trim(formEname);
		      if (isAvailable(formEname)) {
		    	  efform.openNewForm(formEname);
		      }
		      return false;
	    }     	    
	});
	
});

closeformGuide = function(e) {
	var tgtdiv = jQuery(e.target);
	if($('#_efFormInput').css('display')!="none"){
		if(tgtdiv.closest('div[id=_efFormInput]').length==0 && 
			tgtdiv.closest('div[id=_efFormGuide]').length==0){
			$("#_efFormInput").hide();
		}
	}	
	if($('#_efVisitForm').css('display')!="none"){
		if(tgtdiv.closest('div[id=_efVisitForm]').length==0 && 
			tgtdiv.closest('div[id=_efFormGuide]').length==0){
			$("#_efVisitForm").hide();
		}
	}
	return true;
}

function _showVisitForm(istrue) {
	
	if ($("#_efVisitForm").css("display") == "none"||istrue) {
		$("#_efVisitForm").css("display", "inline");
	} else {
		$("#_efVisitForm").css("display", "none");
		return;
	}
	
	var info = new EiInfo();
	info.set("topCount","6");//设置显示常用画面数
	EiCommunicator.send("ED36", "getMostRecentVisitedForm", info, {
		onSuccess: function (eiInfo) {
			// Ajax提交成功后回调
			var block = eiInfo.getBlock('result');
			buildVisitForm(block);
		},
		onFail: function (eMsg) {
			alert("Error occured on call service: " + eMsg);
		}
	},true,true);
        
//	var sortForms = cookie.getVisitForms();
//	buildVisitForm(sortForms);
}

// 构建最常访问的画面
buildVisitForm = function(block){
	var form = $("#_efVisitForm");
	form.empty();
	var length = block.rows.length;
	if(length==0){
		form.css('margin-left','-51px');
		var button = "<div style='height:50px;width:100px;background:yellow;display:inline-block;margin:1px;'>没有记录!</div>";
		form.append($(button));
		return;
	}
	form.css('margin-left','-'+101*length/2+'px');
	for(var i=0;i<length;i++){
		var frmname = block.getCell(i,"formename");
		var button = "<div style='height:50px;width:100px;background:yellow;display:inline-block;margin:1px;'><a id=iplat-counter-" + frmname
			+ " style='height:50px;width:100px;' href='#' onclick=efform.openNewForm('" + frmname + "')><span>"
			+ frmname +"</span></a></div>";
		form.append($(button));
	}
}

function _showGuide() {
	if ($("#_efFormInput").css("display") == "none") {
		$("#_efFormInput").css("display", "block");
		$("#_efFormInput").position({
			of : $("#_efFormGuide"),
			my : "",
			at : "left bottom",
			offset : "-50 10"
		});
	} else {
		$("#_efFormInput").css("display", "none");
	}

}


function _showFeedBack()
{
	//做浏览器检测 
	
	var supportHTML5=false;
	
	try { 
		document.createElement("canvas").getContext("2d"); 
		supportHTML5=true;
		} catch (e) { 
			supportHTML5=false;
		} 
	
	if(supportHTML5)
	{
	 var Hoptions={                   
		        label:'意见反馈',
       modalIntro:'请填写反馈意见:',
       browserInfo:'浏览器信息' ,
       Highlight:'高亮或者遮盖显示重要区域' ,
       HighButton:'高亮图层',
       BlackButton:'遮掩图层'  ,
       nextLabel:'继续'   ,
       modalHeader:'意见反馈'  ,
       SendForm:'发送意见'
       ,btn:$('#_efFormGuide_mail')[0]
       
           };


     $(function()
     {                  
      Feedback.init(Hoptions);                     
                  });  
	}
	else
	{
		//禁用反馈按钮
		$('#' + '_efFormGuide_mail').button('disable');
	}

};

