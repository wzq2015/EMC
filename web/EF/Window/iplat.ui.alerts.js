/**
 * Alert Dialogs
 * 
 * @class alert
 * @author wangxueping@2012/08
 */
(function($) {
   
    // Shortuct functions
    EFAlert = function(message, title, callback) {
    	if(title == null) title = "Alert";
        var popDiv = creatPopDiv(message, title, "alert");
        popDiv.dialog({
        	height: 'auto',
        	minHeight: 100,
			width: 350,
			buttons: {
				'确认': function() {
					$( this ).dialog( "close" );
					if(callback) callback(true);
				}
			}
        }).dialog("open");
    }

    EFConfirm = function(message, title, callback) {
    	if(title == null) title = 'Confirm';
        var popDiv = creatPopDiv(message, title, "confirm");
        popDiv.dialog({
			height: 'auto',
        	minHeight: 100,
			width: 350,
			buttons: {
				'确认': function() {
					$( this ).dialog( "close" );
					if(callback) callback(true);
				},
				'取消': function() {
					$( this ).dialog( "close" );
					if(callback) callback(false);
				}
			}
        }).dialog("open");
    };

    EFPrompt = function(message, value, title, callback) {
        if(title == null) title = 'Prompt';
        var popDiv = creatPopDiv(message, title, "prompt", value);
        popDiv.dialog({
        	height: 'auto',
        	minHeight: 130,
			width: 350,
			buttons: {
				'确认': function() {
					var value = $("#popup_prompt").val();
					$( this ).dialog( "close" );
					if(callback) callback(value);
				},
				'取消': function() {
					$( this ).dialog( "close" );
					if(callback) callback(null);
				}
			}
        }).dialog("open");
    };
    
    
    
    creatPopDiv = function(message, title, type, value){
    	var oldWindow = $("#popup_container");
    	if(oldWindow.length ==1 && oldWindow.dialog("isOpen")){
    		oldWindow.dialog("close");
    	}
		popDiv = document.createElement("div");
		popDiv.id = "popup_container";
		$(popDiv).append("<div id='popup_content' style ='min-width:35px;min-height:35px;float:left;'></div><div id='popup_message'>"
			+ message + "</div>");
		$("BODY").append(popDiv);
		
		$("#popup_content").addClass(type);
		if(type == "prompt") {
			$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />');
            //$("#popup_prompt").focus().select();
            if(value) $("#popup_prompt").val(value);
        }

	 	var popWindow = $(popDiv);
		popWindow.dialog({
			autoOpen: false,
			resizable: false,
			title: title,
			open: function(event, ui){
           		$('.ui-dialog-buttonset').css({"float":"none","text-align":"center"});
           		$('.ui-dialog .ui-dialog-buttonpane').css("padding","0px");
           		$('.ui-dialog .ui-dialog-buttonpane button').css("margin","4px");},
           	close: function(event, ui){
           		$("#popup_container").remove();}
		});
		
		return popWindow;
    }

})(jQuery);