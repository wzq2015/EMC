button_choose_onclick = function() {
	addCssByStyle("../../" + $("#css_file").val() );

};

button_replace_onclick = function() {
	var cssContent = $("#cssModal").val();
	
	var i = cssContent.indexOf("/**-", 0);
	while ( i > 0) {
		var j = cssContent.indexOf("-**/", i);
		
		if  (j>i) {
			var cssIn = cssContent.substring(i + 4, j);
			var cssOut = replace_css(cssIn);
			
			cssContent =cssContent.replace(cssIn, cssOut);
		}
		
		 i = cssContent.indexOf("/**-",  j);
	}
	
	cssContent = cssContent.replace("/**-", "");
	cssContent = cssContent.replace("-**/", "");
	
	$("#cssModal").val(cssContent) ;

};

function replace_css(cssIn) {
	var cssOperate = $.trim(cssIn).split("|");

	var cssFrameW = window.frames["cssFrame"];
	var doc = cssFrameW.document;
    var _body = doc.getElementsByTagName("body");
	
    var test = doc.createElement("div");
    test.innerHTML = cssIn;
    _body[0].appendChild(test);
    
    var cssOut =  $(test).addClass(cssOperate[0]).css(cssOperate[1]);
    
    return cssOut;

}

function addCssByStyle(cssString){

	var cssFrame = document.getElementById("cssFrame");

	var cssFrameW = window.frames["cssFrame"];

	var doc = cssFrameW.document;
	
    var link=doc.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", cssString);

	    var heads = doc.getElementsByTagName("head");
	    if(heads.length)
	        heads[0].appendChild(link);
	    else
	        doc.documentElement.appendChild(link);    
}

$(document).ready(function()
{
    $.ajax({
        type: "GET",
        url: "./EF/Themes/iplat-ui-theme-modal.css",
        success: function (data, textStatus) {
        	//data=data.replace("/*-", "<a>");
        	//data=data.replace("-*/", "</a>");
             $("#cssModal").html(data);
        	},
        complete : function (XMLHttpRequest, textStatus) {
            }
        });
    
    $("#css_file").val("EF/Themes/styleApple/jquery-ui.custom.css");
});


