/**
 * wangyuqiu@2009-4-23
 */
var efportal = function(id){
	this.id = id;
	$.extend(this,efportal.defaultConfig);
	this.dragObj = {};

}
efportal.imageURL = EF_IMAGES_PATH;

efportal.defaultConfig = {
	style:"33%:33%:33%",
	model:"columnModel",//columnModel and vtabModel
	id:"myefPortal",
	paintNode:"body",
	portletDistance:15
}

efportal.prototype.init = function(config,portlets,info){
	if(typeof config === "object")
		$.extend(this,config);
	if(this.portletDistance==0)
		this.portletDistance=15;
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
    else if(this.model="areaModel")
	    this._initAreaModel(info);
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

efportal.prototype._initAreaModel =function(info){
   	var instance = this;
	this.container = $("<div class=PortletArea id=myPortal_area ></div>");
//	rightMenu(this.container,options);
	this.container.appendTo(this.paintNode);
	this.container.width($(this.paintNode).width());
	this.container.height($(this.paintNode).height());
	
	
	var width=this.container.width();
    var height=this.container.height();
    var offset=this.container.offset();
    var top1=offset.top+5;
    var left1=offset.left+width-20;
	var saveDiv=$("<div id='save'><img src='./EF/Images/ef-save.gif' alt='保存'/></div>");
    saveDiv.css("z_index","1000");
    saveDiv.css("position","absolute");
    saveDiv.css("top","1%");
    saveDiv.css("right","2.5%");
    //saveDiv.mouseover(function(){$(this).show();});
    //saveDiv.mouseout(function(){$(this).hide();});
    saveDiv.click(function(){
       instance._AreaSave();
    });
   
	saveDiv.appendTo(window.document.body);
	saveDiv.hide();
	 $(this.paintNode).hover(function(){saveDiv.show();});
	if(info==undefined){
	var portarea=new efPortArea(this.container);
	portarea._initBody(this.container.width(),this.container.height(),'row',0);
	portarea.container.addClass("PortletAreaRow");
	
	var area=new efPortArea(portarea.container);
	area._initBody(portarea.container.width(),portarea.container.height(),'area',0,0);
	}else{
	    _info2ui(info);
	}
	   
	//portarea.container.addClass("PortletAreaRow");
	
	
}

efportal.prototype._AreaSave=function(){
   
    var info=_ui2info();
    areaSave(info);
}



efportal.prototype.onVtabLiClick = function(id){
	$("#"+id).addClass("hover");
	$("#"+id.substring(0,id.length-3)+"_content").css({"display":"block"});
	
	this.portlets[id.substring(0,id.length-3)].expand(id.substring(0,id.length-3));
}

efportal.prototype._gripper = {};

function getstyleArray(allwidth,layoutwidth,distance){
	//var allwidth = document.body.clientWidth;//直接得得总像素
	var leftwidth = allwidth;//剩下的像素
	var styleArray = new Array();
	var truerow = 0;//列数
	var rowno = 0;//无固定值列的数目
	for(i=0;i<layoutwidth.length;i++){
		truerow = truerow + 1;
		var str = layoutwidth[i];
		if(str.indexOf('%')>0){
			leftwidth = leftwidth - allwidth*(parseInt(str)/100);
		}else if(str.indexOf('#')>0){
			rowno = rowno + 1;
		}else{
			leftwidth = leftwidth - parseInt(str);
		}	
		if(leftwidth<0) break;
	}
	var j = 0;//最后的实际列数
	if(leftwidth>0){//存在无固定值列，平分剩下的
		var rowpx = leftwidth/rowno; //无固定值列实际像素
		for(i=0;i<truerow;i++){
			var str = layoutwidth[i];
			if(str.indexOf('%')>0){
				_width = allwidth*(parseInt(str)/100);
			}else if(str.indexOf('#')>0){
				_width = rowpx;
			}else{
				_width = parseInt(str);
			}
			if(_width<0) _width = 0;			
			styleArray[j] = _width;
			j = j+1;
		}
	}else{//不存在无固定值列
		var lastrowno = allwidth;//最后一列像素
		for(i=0;i<truerow;i++){
			if(i<truerow-1){
				var str = layoutwidth[i];
				if(str.indexOf('%')>0){
					_width = allwidth*(parseInt(str)/100);		
					//if(_width<distance) _width = distance;				
					styleArray[j] = _width;	
					j = j+1;
					lastrowno = lastrowno - _width;
				}else if(str.indexOf('#')>0){
					//忽略无固定值列
				}else{
					_width = parseInt(str);
					//if(_width<distance) _width = distance;	
					styleArray[j] = _width;	
					j = j+1;
					lastrowno = lastrowno - _width;
				}
			}else{
				styleArray[i] = lastrowno;	
			}
		}
	}
	return styleArray;
}
// 初始化portlets 布局 ，并且绑定拖拽事件
efportal.prototype._initColumnModel = function(){
	var instance = this;
	this.container = $("<div class=PortletContainer id="+ this.id +" ></div>");
   
	this.container.appendTo(this.paintNode);
	//this.containerColunms = $("<div class=PortletColumns></div>");
	//this.containerColunms.appendTo(this.container);
	this.containerColumnsArray = new Array();
	this.containerGrippers = new Array();
	this.containerRowArray=new Array();
	//var allwidth =  parseInt($(this.paintNode).attr("width"));//页面传过来的总像素
	var allwidth=parseInt($(this.paintNode).width());
	this.portletDistance=this.portletDistance-2;
	if(this.portletDistance<0)
		this.portletDistance=1;
	
	
	var rowArray=this.style.split("*");
	this.styleArrays=new Array();
	for(var rowNum=0;rowNum<rowArray.length;rowNum++){
	     var rowContainer=$("<div ></div>");
	     this.containerRowArray.push(rowContainer);
	     rowContainer.appendTo(this.container);
	    rowContainer.css("float","left");
		var columnArray=new Array();
		var row=rowArray[rowNum];
		var layoutwidth = row.split(":");
			
		var tWidth = allwidth -layoutwidth.length*2-(layoutwidth.length+1)*this.portletDistance-2;
		var styleArray = getstyleArray(tWidth,layoutwidth,this.portletDistance);
		this.styleArrays.push(styleArray);
		this.styleCount = styleArray.length;
		for(i=0;i<styleArray.length+1;i++){
	
			if(i!=0){
				var column = $("<div class=PortletColumn ></div>");
				_width = styleArray[i-1];	
				column.width(_width);
				columnArray.push(column); 
				column.appendTo(rowContainer);
			}
			
			if(i==0 || i== styleArray.length) continue;
			
			var gripper = $("<div id='gripper1' class=PortletColumnGripper ></div>");
			
			gripper.attr({"index":i});
			gripper.attr({"rowIndex":rowNum});
			
			gripper.mouseover(function(){
				this.style.backgroundColor = "#9BD1FA";
				this.style.borderStyle="solid";
				this.style.borderWidth="1px";
				this.style.borderColor="#72CCE3";
			});
			
			gripper.mouseout(function(){
				this.style.backgroundColor = "";
				this.style.borderStyle="none";
			});
			
			gripper.mousedown(function(e){
				e = e || window.event;
				instance._gripper._OriginPosX = e.screenX;
				instance._gripper._gripperStatus = true;
				instance._gripper.index = this.index;
				instance._gripper.rowIndex = this.rowIndex;
				instance._gripper._onmousemove = window.document.body.onmousemove;
				instance._gripper._onmouseup = window.document.body.onmouseup;
				window.document.body.onmouseup = function(e){
					instance.gripperMouseUp(e);
				};
				window.document.body.onmousemove = function(e){instance.gripperMouseMove(e)};
			});
			
			gripper.appendTo(this.containerRowArray[rowNum]);
			this.containerGrippers.push(gripper);
			
		}
		this.containerColumnsArray.push(columnArray);
	}
    $("div.PortletColumnGripper").css("width", "6");
    $("div.PortletColumnGripper").css("margin", "0px "+ (this.portletDistance - 6) / 2 + "px");
	// portlets渲染 并且绑定拖拽事件

	for(var key in this.portlets){
	    var portletInstance = this.portlets[key];
		var rowPosition=portletInstance.portletRowPosition;
		var splitCount = this.styleArrays[rowPosition].length;
		portletInstance.body.appendTo(this.containerColumnsArray[rowPosition][parseInt(portletInstance.portletPosition)%splitCount]);
	
		portletInstance.headsun.attr({"key":key});
		portletInstance.widthTo(this.containerColumnsArray[rowPosition][parseInt(portletInstance.portletPosition)%splitCount].css("width"));
		var mg=this.portletDistance+"px 0px "+this.portletDistance+"px 0px";
		portletInstance.body.css({"margin":mg});
		portletInstance.headsun.get(0).onmousedown=function(e){
		 
		   //  stopBubble(e);
			instance.mouseDown(e,this);
		}	
       portletInstance.operationbar.get(0).onmousedown=function(e){stopBubble(e);};
       	if(!portletInstance.showBorder)
		portletInstance.content.width(portletInstance.headsun.width());
		portletInstance.showTabCallBack();
	}
	
		instance.refreshGripper();
}
function stopBubble(e){
  //一般用在鼠标或键盘事件上
  if(e && e.stopPropagation){
  //W3C取消冒泡事件
  e.stopPropagation();
  }else{
  //IE取消冒泡事件
  	window.event.cancelBubble=true;
  
  }
  };
efportal.prototype.refreshGripper=function(){
     for(var i=0;i<this.containerGrippers.length;i++){
         var gripper=this.containerGrippers[i];
         if(gripper.prev().children().length==0&&gripper.next().children().length==0){
              gripper.height(0);
         }else{
              gripper.height(20); 
         }
            
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
			var row=parseInt(this._gripper.rowIndex)
			var leftColumn = this.containerColumnsArray[row][i-1];
			var rightColumn = this.containerColumnsArray[row][i];
			var posX = e.screenX;
				var minPx = posX - parseInt(this._gripper._OriginPosX);
				if (Math.abs(minPx) < 2) return; 
			this._gripper._OriginPosX = posX;
 				leftWidth = parseInt(leftColumn.css("width")) + parseInt(minPx);
 				rigthWidth = parseInt(rightColumn.css("width")) - parseInt(minPx);
 				
 				//防止拖出边界
 				if(leftWidth<0||rigthWidth<0){
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
var newMask={
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "width": "100%",
    "height": "100%",
    "opacity": ".3",
    "filter": "alpha(opacity=0)",
    "background-color": "#FFFFFF",
    "display":"none"
}
  
efportal.prototype.showMask=function(){
	var instance=this;
	if(!this.modalWin){
	this.modalWin=new EFModalWindow('dragWindow');
	$(this.modalWin.popupMask).removeClass("efModalWindowMask");
    $(this.modalWin.popupMask).css(newMask);
	var maskDiv=$("<div ></div>");
	maskDiv.attr("id",$(this.modalWin.popupMask).attr("id"));
	maskDiv.css(newMask);
	$(this.modalWin.popupMask).replaceWith(maskDiv);
	this.modalWin.popupMask=maskDiv.get(0);
	$(this.modalWin.popupMask).click(function(){instance.hideMask();});
	}
	this.modalWin.show(30, 30);
}

efportal.prototype.hideMask=function(){
	if(this.modalWin){
		this.modalWin.hide();
	}
}
efportal.prototype.mouseClick=function(){
	this.hideMask();
}
efportal.prototype.mouseDown = function(e,obj){
     this.showMask();
	var instance = this;
	e = e || window.event;
	var srcNode  = e.srcElement || e.target;	
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
	
	  //// om.style.width = this.dragObj.xy.w;
	  //// om.style.height = this.dragObj.xy.h;
		 om.style.width = this.dragObj.o.style.width;
	     om.style.height = this.dragObj.xy.h;	   
	   
	   
	   //alert(this.dragObj.xy.w);
	   this.dragObj.o.parentNode.insertBefore(om,this.dragObj.o);
	   this.dragObj.o.style.left =this.dragObj.xy.x - 5;
	   this.dragObj.o.style.top =this.dragObj.xy.y - 5; 				   
	   
	   //计算各个portlet的初始位置
	   var instance = this;
	   
	  for(i=0;i<this.containerColumnsArray.length;i++){
	       for(j=0;j<this.containerColumnsArray[i].length;j++){
	       if(this.containerColumnsArray[i][j].children().length==0)
	              this.containerColumnsArray[i][j].height(200);
	       }
	     }
	    
	 
	   for(i=0;i<this.containerColumnsArray.length;i++){
	       for(j=0;j<this.containerColumnsArray[i].length;j++){
	   	   var xywh = instance.getNodePosition(this.containerColumnsArray[i][j].get(0));
	   	   
	       
                
	   	   this.containerColumnsArray[i][j].get(0).xywh_x = xywh.x;
	   	   this.containerColumnsArray[i][j].get(0).xywh_y = xywh.y;
	   	   this.containerColumnsArray[i][j].get(0).xywh_w = xywh.w;
	   	   this.containerColumnsArray[i][j].get(0).xywh_h = xywh.h;
	   	  
		   this.containerColumnsArray[i][j].children().each(function(){
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
	   }
	
	  this._onmousemove = window.document.body.onmousemove;
	  this._onmouseup = window.document.body.onmouseup;
	  window.document.body.onmouseup = function(e){
		  instance.mouseUp(e);
	  };
	  window.document.body.onmousemove = function(e){ instance.mouseMove(e)};
	//  window.document.body.onclick = function(e){ instance.mouseUp(e)};
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
	       for(var m=0;m<this.containerColumnsArray[i].length;m++){
		   var count = this.containerColumnsArray[i][m].children().size();	   
		   for(var j=0;j<count;j++){
		   		var nodeId = this.containerColumnsArray[i][m].children().get(j).id;
		   		this.portlets[nodeId].portletPosition = parseInt(m)+parseInt(j*this.styleArrays[i].length);
		   		this.portlets[nodeId].portletRowPosition=i;
		   }
		       this.containerColumnsArray[i][m].height(0);
		   }
	   }
	   var newOrder = "";
	   for(var key in this.portlets){
	   		if(!this.portlets[key].closedStatus )
	   			newOrder +=key+":"+this.portlets[key].portletRowPosition+":"+this.portlets[key].portletPosition+";";
	   }	   
	   
	   //判断次序是否改变 来调用回调
	   if(newOrder != orangeOrder){
	   		this.dragObj.portlet.endDragCallBack(newOrder);
	   }
	   
	   this.dragObj = {};
	   window.document.body.onmousemove = this._onmousemove;
	   window.document.body.onmousup = this._onmouseup;	
	//   window.document.body.onclick = this._onmouseup;
	   this._dragStatus = false;
	}
    this.refreshGripper();
    this.hideMask();
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
	     for(m=0;m<this.containerColumnsArray[i].length;m++){
		   var count = this.containerColumnsArray[i][m].children().size();
		   for(j=count-1;j>=0;j--){
			   var jnode = this.containerColumnsArray[i][m].children().eq(j);
			   if(parseInt(jnode.attr("xywh_x")) < parseInt(this.dragObj.o.xywh_cx) 
					   && parseInt(this.dragObj.o.xywh_cx) < (parseInt(jnode.attr("xywh_x"))+parseInt(jnode.attr("xywh_w"))) ){
				   
				   if((parseInt(jnode.attr("xywh_cy"))) < parseInt(this.dragObj.o.xywh_cy)
				          &&(parseInt(jnode.attr("xywh_y"))+ parseInt(jnode.attr("xywh_h")))>parseInt(this.dragObj.o.xywh_cy)){
					   this.dragObj.otemp.parentNode.removeChild(this.dragObj.otemp);
					   jnode.after(this.dragObj.otemp);
					   this.dragObj.otemp.style.width = jnode.get(0).style.width;
					   return;
				   }else if((parseInt(jnode.attr("xywh_cy"))) > parseInt(this.dragObj.o.xywh_cy) 
				   		&& parseInt(this.dragObj.o.xywh_cy) >(parseInt(jnode.attr("xywh_y")))){
				   	   this.dragObj.otemp.parentNode.removeChild(this.dragObj.otemp);
				   	   jnode.before(this.dragObj.otemp);
				   	   this.dragObj.otemp.style.width = jnode.get(0).style.width;
				   	   return;
				   }
				   //else if(i== (parseInt(this.dragObj.portlet.portletPosition)%this.styleCount)){
				   //	   this.dragObj.otemp.style.width = this.containerColumnsArray[i].get(0).style.width;
				   //}
				   
			   }
		   }
		   if(count == 0){
		       var jnode = this.containerColumnsArray[i][m].eq(0);
				
			   if(parseInt(jnode.get(0).xywh_x) < parseInt(this.dragObj.o.xywh_cx) 
					   && parseInt(this.dragObj.o.xywh_x) < (parseInt(jnode.get(0).xywh_x)+parseInt(jnode.get(0).xywh_w)) ){
				   if(parseInt(jnode.get(0).xywh_y)<parseInt(this.dragObj.o.xywh_y)
				   &&parseInt(this.dragObj.o.xywh_y) < (parseInt(jnode.get(0).xywh_y)+parseInt(jnode.get(0).xywh_h))){			
					this.dragObj.otemp.parentNode.removeChild(this.dragObj.otemp);
					jnode.append(this.dragObj.otemp);
					this.dragObj.otemp.style.width = jnode.get(0).style.width;
					return;
					}
		     }
		  } 		   
         }
	   }
	   
	   //this.dragObj.isMoved = false;
	   
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

efportal.prototype.saveDynamic = function(portalid,portletid,parameter){

}
efportal.prototype.repaintPortlet=function(portletId,evUserParam,editFlag){
	 var info = new EiInfo();
	// var portalId =this.id;
	// var evUserParam=ef.get("evUserParam").value;
	var portalId = ef.get("portalId").value;
	 info.set("portletId",portletId);
	 info.set("portalId",portalId);
	 
	 if(evUserParam=='null')
	    evUserParam=null;
	  info.set("evUserParam",evUserParam);
	 EiCommunicator.send( "EV0105", "getPortlet" , info, null);
	 
	 if(ajaxEi!=null){
	 	var portlet=ajaxEi.get("portlet");
	// 	var editFlag=ef.get("editFlag").value;
	 	//$(ef.get(id)).remove();
	 	var oldPortLet=efportlet.portlets[portletId];
	 	var portletInstance = new efportlet(portletId);
	 	 portletInstance._showPortlet(editFlag,portlet);
	 	 var portletInstance=efportlet.portlets[portletId];
	 	 portletInstance.portal=this;
		var rowPosition=portletInstance.portletRowPosition;
		//portletInstance.body.appendTo(this.containerColumnsArray[rowPosition][parseInt(portletInstance.portletPosition)%splitCount]);
		
		
		portletInstance.headsun.attr({"key":portletId});
		portletInstance.widthTo(oldPortLet.body.width());
		var mg=portal.portletDistance+"px 0px "+portal.portletDistance+"px 0px";
		portletInstance.body.css({"margin":mg});
		
		portletInstance.headsun.get(0).onmousedown=function(e){
			portal.mouseDown(e,this);
		}
		portletInstance.operationbar.get(0).onmousedown=function(e){stopBubble(e);};
		
	   $(oldPortLet.body).replaceWith(portletInstance.body);
	   if(!portletInstance.showBorder)
		portletInstance.content.width(portletInstance.headsun.width());
		portletInstance.showTabCallBack();
	 }

}





