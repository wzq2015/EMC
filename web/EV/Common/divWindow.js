

/**
 * divWindow 对象
 */
 

function divWindow(windowId){
	if(windowId)
		this.id = windowId;
	else 
		return null;	
	this.status = 0;
	this.height = 300;
	this.width = 400;

	var instance = this;

	
	if($("#"+this.id).length == 0){
		
		this.divNode = $("<div />");
		this.divNode.attr({id:this.id});
		this.divNode.attr({"class":"divWindow"});
	
		this.backGroundDiv = $("<div />");
		this.backGroundDiv.attr({id:this.id+"_BackGroundDiv"});
		this.backGroundDiv.attr({"class":"outDivWindow"});
	
		this.divNode.appendTo("body");
		this.backGroundDiv.appendTo("body");
	
	}else{
		this.divNode = $("#"+this.id).eq(0);
		this.backGroundDiv = $("#"+this.id+"_BackGroundDiv").eq(0);
	}
	
	//this.divNode.append($("<iframe id='iframe_5' src='DispatchAction.do?efFormEname=EV13' frameborder=0 width=100% height=100%  scrolling=auto></iframe>"));
		   //$("#body").append($("<iframe id='iframe_5' src='DispatchAction.do?efFormEname=EV13' frameborder=0 width=100% height=100%  scrolling=auto></iframe>"));
	
	/*
	closeDiv= $("<div  id='containerOuter' ></div>");

	
	
	
	closeImg = $("<img src='" + EF_IMAGES_PATH + "efcalendar_close.gif' />");

	closeDiv.append(closeImg);
	
	closeImg.click(function (){
		instance.close();
	});
	
	
	closeDiv.appendTo(this.divNode);	
	*/
	
}


/**
 * 设置divWindow 的内容
 */
divWindow.prototype.set = function(node){
	    if(typeof node == "string"){
			this.divNode.append($(node));
		}else if(typeof node == "object"){
				this.divNode.append(node);
		}else{
				alert("非法参数");
	    }
}

/**
 * divWindow 展示函数
 */
divWindow.prototype.show = function(){
	
	//debugger;
	this.divNode.height(this.height);
	this.divNode.width(this.width);
	var windowWidth = window.screen.availWidth;
	var windowHeight = window.screen.availHeight;
	var popupHeight = this.divNode.height();
	var popupWidth = this.divNode.width();

	this.divNode.css({
		"position": "absolute",
		"top": windowHeight/2-popupHeight/2,
		"left": windowWidth/2-popupWidth/2
	});

	
	//this.backGroundDiv.css({
	//	"height": windowHeight
	//});	


    //show
	if(status==0){
		this.backGroundDiv.css({
			"filter": "Alpha(Opacity=30)"
		});
		this.backGroundDiv.fadeIn("fast");
		this.divNode.fadeIn("fast",this.beforeShow);
		status = 1;
	}

}

/**
 * divWindow 关闭函数
 */
divWindow.prototype.close = function(){
	if(status==1){
		this.backGroundDiv.fadeOut("fast");
		this.divNode.fadeOut("fast",this.beforeClose);
		
		status = 0;
	}	

}

/**
 * divWindow 展示前的回调
 */
divWindow.prototype.beforeShow = function( func){
	this.beforeShow = func;
}

/**
 * divWindow 关闭之前的回调
 */
divWindow.prototype.beforeClose = function( func){
	this.beforeClose = func;
}



