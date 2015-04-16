 function createFlow(){
	$("#spanBefore").flow({hover:function(){
		$(this).addClass("hover");
	},remove:function(){
		$(this).removeClass("hover");
	},click:function(){
		alert($(this).attr("id") + "->" + $(this).attr("begin") + " Click");
	}});
}

