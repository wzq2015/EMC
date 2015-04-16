 function createFlow(){
	$("#spanBefore").flow({slider:30.5,toppad:55,
		leftpad:75,showCustom:true,hover:function(){
		$(this).addClass("hover");
	},remove:function(){
		$(this).removeClass("hover");
	},click:function(){
		alert($(this).attr("id") + "->" + $(this).attr("begin") + " Click");
	}});
}

