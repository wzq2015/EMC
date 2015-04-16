/**
 * wangyuqiu@2009-4-23
 */
var efportal = function(id){
	this.id = id;
	$.extend(this,efportal.defaultConfig);
	this.dragObj = {};

}
efportal.imageURL = "./EV/images/";

efportal.defaultConfig = {
	style:"33%:33%:33%",
	model:"columnModel",//columnModel and vtabModel
	id:"myefPortal",
	paintNode:"body"
}

efportal.prototype.init = function(config,portlets){
	if(typeof config === "object")
		$.extend(this,config);
	if(undefined != portlets)
		this.portlets = portlets;
	else
		this.portlets = efportlet.portlets;	
	
	for(var key in this.portlets){
		this.portlets[key].portal = this;
	}
	
	if(undefined == this.model || this.model == "columnModel")
		this._initColumnModel();
	else if(this.model == "vTabModel")
		this._initVtabModel();
	
}

// 竖状Tab布局
efportal.prototype._initVtabModel = function(){
	var instance = this;
	this.vTab = $("<div ></div>");
	this.vTab.addClass("vTab_body");
	this.vTab.addClass("vTab_body_border");
	this.vTab.width(document.body.clientWidth-120);
	this.vTab.height(document.body.clientHeight-120);
	this.vTab.appendTo(this.paintNode);
	this.vTabHead = $("<div></div>");
	this.vTabHead.addClass("vTab_body_head");
	this.vTabHead.appendTo(this.vTab);
	this.vTabHeadUL = $("<ul></ul>");
	this.vTabHeadUL.appendTo(this.vTabHead);
	this.vTabContent = $("<div></div>");
	this.vTabContent.addClass("vTab_body_content");
	this.vTabContent.appendTo(this.vTab);
	for(var key in this.portlets){
		var liNode = $("<li>"+this.portlets[key].portletName+"</li>");
		liNode.attr("id",key+"_li");
		//alert(liNode.attr("id"));
		liNode.click(function(){
			instance.onVtabLiClick(this.id);
		});
		this.vTabHeadUL.append(liNode);
		var contentNode = $("<div ></div>");
		contentNode.attr("id",key+"_content");
		contentNode.css({"display":"none"});
		this.portlets[key].body.appendTo(contentNode);
		this.vTabContent.append(contentNode);
	}
	
	
	
}

efportal.prototype.onVtabLiClick = function(id){
	$("#"+id).addClass("hover");
	$("#"+id.substring(0,id.length-3)+"_content").css({"display":"block"});
	
	this.portlets[id.substring(0,id.length-3)].expand(id.substring(0,id.length-3));
}

efportal.prototype._gripper = {};

// 初始化portlets 布局 ，并且绑定拖拽事件
efportal.prototype._initColumnModel = function(){
	var instance = this;
	this.container = $("<div class=PortletContainer id="+ this.id +" ></div>");

	this.container.appendTo(this.paintNode);
	this.containerColunms = $("<div class=PortletColumns></div>");
	this.containerColunms.appendTo(this.container);
	this.containerColumnsArray = new Array();
	this.containerGrippers = new Array();
	var styleArray = this.style.split(":");
	this.styleCount = styleArray.length;
	for(i=0;i<styleArray.length;i++){
		//alert(styleArray[i]);
		var column = $("<div class=PortletColumn ></div>");
		
		var str = styleArray[i];
		
		_width= (parseInt($(this.paintNode).attr("width"))-str.length*10)*(new Number(str.substring(0,str.length-1))/100);
		column.width(_width);
		
		//column.css({"width":styleArray[i]});
		this.containerColumnsArray.push(column); 
		
		column.appendTo(this.containerColunms);
		if(i<(styleArray.length-1)){
			var gripper = $("<div id='gripper1' class=PortletColumnGripper ></div>");
			gripper.attr({"index":i});
			gripper.mouseover(function(){
				//this.style.height = document.body.clientHeight;
				this.style.backgroundColor = "#FFFF00";
			});
			gripper.mouseout(function(){
				this.style.backgroundColor = "";
			});
			
			gripper.mousedown(function(e){
				//alert(e);
				e = e || window.event;
				instance._gripper._OriginPosX = e.screenX;
				instance._gripper._gripperStatus = true;
				instance._gripper.index = this.index;
				instance._gripper._onmousemove = window.document.body.onmousemove;
				instance._gripper._onmouseup = window.document.body.onmouseup;
				window.document.body.onmouseup = function(e){
					instance.gripperMouseUp(e);
				};
				window.document.body.onmousemove = function(e){instance.gripperMouseMove(e)};
			});
			
			gripper.appendTo(this.containerColunms);
			this.containerGrippers.push(gripper);
		}
	}

	// portlets渲染 并且绑定拖拽事件	
	for(var key in this.portlets){
	    var portletInstance = this.portlets[key];
		var splitCount = styleArray.length;
		portletInstance.body.appendTo(this.containerColumnsArray[parseInt(portletInstance.portletPosition)%splitCount]);
		
		portletInstance.headsun.attr({"key":key});
		portletInstance.widthTo(this.containerColumnsArray[parseInt(portletInstance.portletPosition)%splitCount].css("width"));
		
		portletInstance.headsun.get(0).onmousedown=function(e){
			instance.mouseDown(e,this);
		}	

		/*
		portletInstance.headsun.get(0).onmouseup=function(e){
			instance.mouseUp(e,this);
		}	
		
		portletInstance.headsun.get(0).onmousemove=function(e){
			instance.mouseMove(e,this);
		}
		*/			
	
		
		portletInstance.showTabCallBack();
	}
	

	
}

efportal.prototype.gripperMouseUp = function(e){
	if(this._gripper._gripperStatus == true){
		e = e || window.event;
		this._gripper._gripperStatus = false;
		window.document.body.onmousemove = this._gripper._onmousemove;
		window.document.body.onmousup = this._gripper._onmouseup;	
	}
}

efportal.prototype.gripperMouseMove = function(e){
			  e = e || window.event;

			  if(this._gripper._gripperStatus == true){	
					var i = parseInt(this._gripper.index);
					var leftColumn = this.containerColumnsArray[i];
					var rightColumn = this.containerColumnsArray[i+1];
					var posX = e.screenX;
	 				var minPx = posX - parseInt(this._gripper._OriginPosX);
	 				if (Math.abs(minPx) < 2) return; 
					this._gripper._OriginPosX = posX;
	  				leftWidth = parseInt(leftColumn.css("width")) + parseInt(minPx);
	  				rigthWidth = parseInt(rightColumn.css("width")) - parseInt(minPx);
	  				
	  				//防止拖出边界
	  				if(leftWidth<200||rigthWidth<200){
	  				   return;
	  				}
	  				
	  				
	  				leftColumn.width(leftWidth);
	  				rightColumn.width(rigthWidth);
	  				var leftCount = leftColumn.children().size();
	  				for(var k=0;k<leftCount;k++){
	  					this.portlets[leftColumn.children().get(k).id].widthTo(leftWidth);
	  				}
	  				var rightCount = rightColumn.children().size();
	  				for(var h=0;h<rightCount;h++){
	  					this.portlets[rightColumn.children().get(h).id].widthTo(rigthWidth);
	  				}
			 	}			  
}

efportal.prototype.mouseDown = function(e,obj){
	var instance = this;
	e = e || window.event;
	var srcNode  = e.srcElement || e.target;	
   //debugger;
   if(!!$(obj).attr("key") && ($(obj).attr("key") == srcNode.parentNode.parentNode.id)){

	   if(this.dragObj.o!=null)
	     return ;
	   this._dragStatus = true;  
	   this.dragObj.o=this.portlets[$(obj).attr("key")].body.get(0);
	   this.dragObj.o.style.zIndex = "10";
	   this.dragObj.portlet = this.portlets[$(obj).attr("key")];

	   this.dragObj.xy=this.getNodePosition(this.dragObj.o);
	   this.dragObj.xy.mx = this.getMouseOffset(this.dragObj.o,e).x;
	   this.dragObj.xy.my = this.getMouseOffset(this.dragObj.o,e).y;
	   
	    
	   this.dragObj.o.style.position="absolute";
	   this.dragObj.o.style.filter = "Alpha(opacity=30)";
	   
	   var om=document.createElement("div");
	   om.className = "dragBlank";
	   this.dragObj.otemp=om;
	
	   om.style.width = this.dragObj.xy.w;
	   om.style.height = this.dragObj.xy.h;
	   //alert(this.dragObj.xy.w);
	   this.dragObj.o.parentNode.insertBefore(om,this.dragObj.o);
	   this.dragObj.o.style.left =this.dragObj.xy.x - 5;
	   this.dragObj.o.style.top =this.dragObj.xy.y - 5; 				   
	   
	   //计算各个portlet的初始位置
	   var instance = this;
	   for(i=0;i<this.containerColumnsArray.length;i++){
	   	   var xywh = instance.getNodePosition(this.containerColumnsArray[i].get(0));
	   	   
	   	   this.containerColumnsArray[i].get(0).xywh_x = xywh.x;
	   	   this.containerColumnsArray[i].get(0).xywh_y = xywh.y;
	   	   this.containerColumnsArray[i].get(0).xywh_w = xywh.w;
	   	   this.containerColumnsArray[i].get(0).xywh_h = xywh.h;

		   this.containerColumnsArray[i].children().each(function(){
			   var xywh = instance.getNodePosition(this);
			   if(this !=instance.dragObj.o && this!=instance.dragObj.otemp){
				   this.xywh_x = xywh.x;
				   this.xywh_y = xywh.y;
				   this.xywh_w = xywh.w;
				   this.xywh_h = xywh.h;
				   this.xywh_cx = xywh.x+xywh.w/2;
				   this.xywh_cy = xywh.y+xywh.h/2;
			   } else if(this == instance.dragObj.o){
				   this.xywh_x = xywh.x;
				   this.xywh_y = xywh.y;
				   this.xywh_w = xywh.w;
				   this.xywh_h = 25;
				   this.xywh_cx = xywh.x+xywh.w/2;
				   this.xywh_cy = xywh.y+25/2;
			   }
			   
		   });
	   }
	   
	  this._onmousemove = window.document.body.onmousemove;
	  this._onmouseup = window.document.body.onmouseup;
	  window.document.body.onmouseup = function(e){
		  instance.mouseUp(e);
	  };
	  window.document.body.onmousemove = function(e){ instance.mouseMove(e)};
	   
	}   

}


efportal.prototype.mouseUp = function(e){
	e = e || window.event;
	if(this._dragStatus == true ){
	   this.dragObj.o.style.zIndex = "0";
	   this.dragObj.o.style.filter = "Alpha(opacity=100)";
	   this.dragObj.otemp.parentNode.insertBefore(this.dragObj.o,this.dragObj.otemp);
	   this.dragObj.o.style.position="";
	   
	   this.dragObj.portlet.widthTo(this.dragObj.otemp.style.width);
	   //this.dragObj.o.style.width = (this.dragObj.otemp.style.width);
	  //alert(this.dragObj.otemp.style.width);
	   this.dragObj.otemp.parentNode.removeChild(this.dragObj.otemp);
	   
	   var orangeOrder = "";
	   for(var key in this.portlets){
	   		if(!this.portlets[key].closedStatus )
	   			orangeOrder +=key+":"+this.portlets[key].portletPosition+";";
	   }
	   
	   //调整拖动后的次序
	   for(var i=0;i<this.containerColumnsArray.length;i++){
		   var count = this.containerColumnsArray[i].children().size();	   
		   for(var j=0;j<count;j++){
		   		var nodeId = this.containerColumnsArray[i].children().get(j).id;
		   		this.portlets[nodeId].portletPosition = i+j*this.styleCount;
		   }
	   }
	   var newOrder = "";
	   for(var key in this.portlets){
	   		if(!this.portlets[key].closedStatus )
	   			newOrder +=key+":"+this.portlets[key].portletPosition+";";
	   }	   
	   
	   //判断次序是否改变 来调用回调
	   if(newOrder != orangeOrder){
	   		this.dragObj.portlet.endDragCallBack(newOrder);
	   }
	   
	   this.dragObj = {};
	   window.document.body.onmousemove = this._onmousemove;
	   window.document.body.onmousup = this._onmouseup;	
	   this._dragStatus = false;
	}

}

efportal.prototype.mouseMove = function(e){
	e = e || window.event;
	//var srcNode  = e.srcElement || e.target;		
	//if((this.dragObj.o!=null) && srcNode.parentNode.parentNode.id == this.dragObj.o.id){
	if(this._dragStatus == true){
		var mouseReal = this.getMouseReal(e);
		this.dragObj.o.style.left = mouseReal.x - this.dragObj.xy.mx -5;
		this.dragObj.o.style.top = mouseReal.y - this.dragObj.xy.my -5; 	
		this.moveObjTo(e);
	}
}

efportal.prototype.moveObjTo = function(e){
	   var xywh = this.getNodePosition(this.dragObj.o);
	   this.dragObj.o.xywh_x = xywh.x;
	   this.dragObj.o.xywh_y = xywh.y;
	   this.dragObj.o.xywh_w = xywh.w;
	   this.dragObj.o.xywh_h = xywh.h;
	   this.dragObj.o.xywh_cx = xywh.x+xywh.w/2;
	   this.dragObj.o.xywh_cy = xywh.y+25/2;	

	   for(i=0;i<this.containerColumnsArray.length;i++){
		   var count = this.containerColumnsArray[i].children().size();
		   for(j=count-1;j>=0;j--){
			   var jnode = this.containerColumnsArray[i].children().eq(j);
			   if(parseInt(jnode.attr("xywh_x")) < parseInt(this.dragObj.o.xywh_cx) 
					   && parseInt(this.dragObj.o.xywh_cx) < (parseInt(jnode.attr("xywh_x"))+parseInt(jnode.attr("xywh_w"))) ){
				   
				   if((parseInt(jnode.attr("xywh_cy"))) < parseInt(this.dragObj.o.xywh_cy) ){
					   this.dragObj.otemp.parentNode.removeChild(this.dragObj.otemp);
					   jnode.after(this.dragObj.otemp);
					   this.dragObj.otemp.style.width = jnode.get(0).style.width;
					   break;
				   }else if((parseInt(jnode.attr("xywh_cy"))) > parseInt(this.dragObj.o.xywh_cy) 
				   		&& parseInt(this.dragObj.o.xywh_cy) >(parseInt(jnode.attr("xywh_y")))){
				   	   this.dragObj.otemp.parentNode.removeChild(this.dragObj.otemp);
				   	   jnode.before(this.dragObj.otemp);
				   	   this.dragObj.otemp.style.width = jnode.get(0).style.width;
				   	   break;
				   }
				   //else if(i== (parseInt(this.dragObj.portlet.portletPosition)%this.styleCount)){
				   //	   this.dragObj.otemp.style.width = this.containerColumnsArray[i].get(0).style.width;
				   //}
				   
			   }
		   }
		   if(count == 0){
		       var jnode = this.containerColumnsArray[i].eq(0);
				
			   if(parseInt(jnode.get(0).xywh_x) < parseInt(this.dragObj.o.xywh_cx) 
					   && parseInt(this.dragObj.o.xywh_cx) < (parseInt(jnode.get(0).xywh_x)+parseInt(jnode.get(0).xywh_w)) ){
										
					this.dragObj.otemp.parentNode.removeChild(this.dragObj.otemp);
					jnode.append(this.dragObj.otemp);
					this.dragObj.otemp.style.width = jnode.get(0).style.width;
					break;
		     }
		  } 		   
  
	   }
	   
}

efportal.prototype.getNodePosition = function(srcNode){


	var t=srcNode.offsetTop;

	var l=srcNode.offsetLeft;

	var w=srcNode.offsetWidth;
	var h=srcNode.offsetHeight;
	while(srcNode=srcNode.offsetParent){
	   t+=srcNode.offsetTop;
	   l+=srcNode.offsetLeft;
	}

   return {x:l,y:t,w:w,h:h};

}

efportal.prototype.getMouseReal = function(e){


 	return {
  		x:e.clientX + document.body.scrollLeft - document.body.clientLeft,
  		y:e.clientY + document.body.scrollTop  - document.body.clientTop
 	};

}

efportal.prototype.getMouseOffset = function(target, ev){
 	ev = ev || window.event;

 	var docPos    = this.getNodePosition(target);
 	var mousePos  = this.getMouseReal(ev);
 	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

efportal.prototype.refresh = function(){

}

