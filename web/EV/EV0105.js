var info;
window.onload = function (){
	onloadEV();
	info=_getEi();
	show_portlet(info,portletDistance);
}


var currentPortletInstance_portletUrl=null;
var portal;
/**
显示portal内容
*/
show_portlet = function(eiInfo,portletDistance) {
	if(eiInfo.getStatus()==-1){
		alert(eiInfo.getMsg());
		return;
	}
	var _portal = eiInfo.get("portal");
	ef.get("portalId").value = _portal.portalId;
	var pageLayout = null;
	
	if (is_not_empty_string(_portal.layOutString)){
		pageLayout = _portal.layOutString;
	}
	/**EV03、EV04 可编辑   
		*  其余则个人门户可编辑
		*/
	var editFlag=ef.get("editFlag").value;
	for ( var i = 0; i < _portal.portlets.length; i++) {
		// 构建Portlet
		var _portlet = _portal.portlets[i];
		var tabs = _portlet.tabs;
		var evcm02 = _portlet.evcm02;
		
		if (evcm02.portletContentType == "2" || "3" == evcm02.portletContentType ) {//rss
			  currentPortletInstance_portletUrl=evcm02.portletUrl;
		}
		var portlet = new efportlet(_portlet.portletId);
        portlet._showPortlet(editFlag,_portlet);
		
	}

	var style = pageLayout;
 
	 portal = new efportal("myPortal");
	portal.init( {
		"style" : style,
		"paintNode" : ef.get("portalNodeId"),
		"portletDistance" : portletDistance
	});

	if(editFlag=="false"){
		portal.gripperMouseUp = function(){};
		portal.gripperMouseMove = function(){};
		portal.mouseDown = function(e,obj){};
		portal.gripperMouseMove = function(e){};
		
		//禁止gripper拖动
		var grippers = $("div.PortletColumnGripper");
		for(t=0;t<grippers.size();t++){
			gripper = grippers.eq(t);
			gripper.mouseover(function(){});
			gripper.mouseout(function(){});
			gripper.mousedown(function(){});
		}
	}
	/* 设置页面背景颜色
	if (is_not_empty_string(bgcolorTemplate)) {
		$("body").css("background-color", bgcolorTemplate);
		$("div.PortletContainer").css("background-color",bgcolorTemplate);
		$("div.PortletColumns").css("background-color", bgcolorTemplate);
	}
*/
}

window.onresize=function(){
	$("#portalNodeId").empty();
	
	show_portlet(info);
}
on_portlet_position_change_close  = function(str) {

   if(window.confirm("删除该Portlet后下次将不显示，确定要删除吗?")){
	   on_portlet_position_change(str);
	   return true;
   }else{
       return false;
   }
}

/**
Portlet拖放或关闭操作后位置发生变化
此函数将更新后的位置信息保存进数据库
如果位置值为"-1"表示该portlet要删�?
*/
on_portlet_position_change = function(str) {
 
	var block = new EiBlock("result");
	var blockMeta = new EiBlockMeta("result");
	var portletIdMeta = new EiColumn("portletId");
	portletIdMeta.pos = 1;
	
	blockMeta.addMeta(portletIdMeta);
	var portletPositionMeta = new EiColumn("portletPosition");
	portletPositionMeta.pos = 2;
	blockMeta.addMeta(portletPositionMeta);
	
	var portletRowPositionMeta = new EiColumn("portletRowPosition");
	portletRowPositionMeta.pos = 3;
	blockMeta.addMeta(portletRowPositionMeta);
	
	block.setBlockMeta(blockMeta);

	var portletPosList = str.split(";");

	for ( var i = 0; i < portletPosList.length; i++) {
		if (is_not_empty_string(portletPosList[i])) {
			var portletPos = portletPosList[i].split(":");
			block.setCell(i, "portletId", portletPos[0]);
			block.setCell(i, "portletRowPosition", portletPos[1]);
			block.setCell(i, "portletPosition", portletPos[2]);
		}
	}
	var info = new EiInfo();
	info.addBlock(block);
	info.set("portalId",ef.get("portalId").value);
	EiCommunicator.send("EV01", "updatePortletPositionInfo", info);
}

is_not_empty_string = function(str) {
	var result = true;

	if (str == null || str.trim() == "") {
		result = false;
	}

	return result;
}

/**
Portlet内容展示回调
*/
show_portlet_content = function() {
	if (this.portlet.evcm02.portletContentType == "2") {
		//	如果是RSS内容
		info = new EiInfo();
		info.set("portlet_id",this.id);
		info.set("rss_url",currentPortletInstance_portletUrl);
		info.set("rss_contentFontSize",this.portlet.contentFontSize);
		info.set("rss_contentFontType",this.portlet.contentFontType);
		info.set("rss_contentFontColor",this.portlet.contentFontColor);
		info.set("rss_row",this.portlet.contentRows);
		
		//异步方式调用
		//需要将该PortletID保存并在“callback_rss”中使用
		EiCommunicator.send("EV01", "getRssContentBlock", info,callback_rss ,false,true);
	}else if(this.portlet.evcm02.portletContentType == "3"){
		var div_callback = {
			onSuccess : function(eiInfo) {
				var portlet_id=eiInfo.get("portlet_id");

	     		efportlet.portlets[portlet_id].content.empty();
	     		content = '<div id="' + portlet_id + '_content_info" lastRange="0">';
	     		content+=eiInfo.get("html")+"</div>";
	     		efportlet.portlets[portlet_id].content.append(content);
			},
			onFail : function(eMsg) {
				alert("failure");
			}			
			
		}
		
		var info = new EiInfo();
		info.set("portlet_id",this.id);
		var arr = currentPortletInstance_portletUrl.split("&");
		for(var i=0;arr[i++];){
			var _t = arr[i-1].split("=");
			info.set(_t[0],_t[1]);
		}
		EiCommunicator.send(info.get("serviceName"), info.get("methodName"), info,div_callback ,false,true);
		

	}
}

var callback_rss = {
	onSuccess : function(eiInfo) {
		 contentBlock = eiInfo.getBlock("result");
		 portlet_id=eiInfo.get("portlet_id");
		 rss_contentFontSize=eiInfo.get("rss_contentFontSize");
		 rss_contentFontType=eiInfo.get("rss_contentFontType");
		 rss_contentFontColor=eiInfo.get("rss_contentFontColor");
		 content = '<div id="' + portlet_id + '_content_info" lastRange="0">';
	     content += '<font size="' + rss_contentFontSize + '" face="' + rss_contentFontType + '">';
	     for ( var i = 0; i < contentBlock.getRows().length; i++) {
				content += '<li style="line-height: 20px; text-decoration: none; list-style:none; clear:both;"><a target="_blank" style="color:' + rss_contentFontColor + '" href="' + contentBlock
						.getCell(i, "link") + '">';
				content += contentBlock.getCell(i, "title") + '</a></li>';
			}
	     content += '</font>';
	     content += '</div>';
	     //将内容回写到该portlet内容�?
	     efportlet.portlets[portlet_id].content.empty();
	     efportlet.portlets[portlet_id].content.append(content);
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}



/*
弹出颜色编辑器窗�?
*/
function openSelectColor(id) {
   var obj=window.showModalDialog("./EV/Common/Color.html","","edge:raised;scroll:1;status:0;help:0;resizable:0;dialogWidth:250px;dialogHeight:250px;");
   if(obj!=undefined){
	document.getElementById(id).value=obj;
   	color_size=obj;
   	document.getElementById(id).style.background=obj;
   }
   
}


/**
Portlet参数内容展示回调
*/
show_portlet_edit_content = function() {
	var high = 160;
	var top=129;
	if(this.portlet.evcm02.portletContentType==2){
		high=160+55;
		top=129+55;
	}
	
	var borderFlagStr = true;
	if(this.portlet.borderFlag==" "){
		borderFlagStr=showBorder;
	}else{
		if(this.portlet.borderFlag=="0")
		borderFlagStr=false;
	}
	
	var imageFlagStr = true;
	if(this.portlet.imageFlag==" "){
		imageFlagStr=showIcon;
	}else{
		if(this.portlet.imageFlag=="0")
		imageFlagStr=false;
	}
    div_html="<div id = '"+this.id+"-ef_region_inqu' title='Portlet参数设置'>"+
    		 "<div style='width:460px' class='window_topdiv'>"+
    		 "<div class='window_topleft'></div>"+
    		 "<div class='window_topbg' style='width:440px'></div>"+
    		 "<div class='window_topright'></div>"+
    		 "</div>"+
    		 "<div style='width:460px;height:"+high+"px' class='window_contentbox'>"+
    		 "<div class='window_leftbg' style='height:"+high+"px'></div>"+
    		 "<div class='window_contentbg' style='width:440px;height:"+high+"px'>"+
    		 "<div >"+
    		 "<table width='100%' border='0' cellspacing='1'>"+
    		 "<tr> "+
    		 "<td width='22%' height='28' align='right'>显示边框：</td>"+
    		 "<td width='25%' height='28'>"+
    		 "<input  type='radio' id='"+this.id+"_result-0-borderFlag' name='"+this.id+"_result-0-borderFlag' value='1' class='inputField'  "+(borderFlagStr?'checked':'')+"/>是"+
	         "<input  type='radio' id='"+this.id+"_result-0-borderFlag' name='"+this.id+"_result-0-borderFlag' value='0' class='inputField'  "+(!borderFlagStr?'checked':'')+"/>否"+
    		 "</td>"+
    		 "<td width='21%' height='28' align='right'>标题栏背景色：</td>"+
    		 "<td width='25%' height='28'>"+
    		 "<input  maxLength='50' type='text' id='"+this.id+"_result-0-bgcolor' name='"+this.id+"_result-0-bgcolor' value='"+(this.portlet.bgcolor).trim()+"' class='textbox' style='width:60px'>"+
    		 "<img title='标题栏背景色'  align='center' src='EV/images/color.JPG' onmouseover=\"this.style.cursor='hand'\" onClick=\"openSelectColor('"+this.id+"_result-0-bgcolor');\"></td>"+
    		 "</td>"+
    		 "</tr>"+
    		 "<tr>"+
    		 "<td height='28' align='right'>显示图标：</td>"+
    		 "<td height='28'>"+
    		 "<input  type='radio' id='"+this.id+"_result-0-imageFlag' name='"+this.id+"_result-0-imageFlag' value='1' class='inputField'  "+(imageFlagStr?'checked':'')+"/>是"+
	         "<input  type='radio' id='"+this.id+"_result-0-imageFlag' name='"+this.id+"_result-0-imageFlag' value='0' class='inputField'  "+(!imageFlagStr?'checked':'')+"/>否"+
    		 "<td height='28' align='right'>标题字体颜色：</td>"+
    		 "<td height='28'>"+
    		 "<input  maxLength='50' type='text' id='"+this.id+"_result-0-titleFontColor' name='"+this.id+"_result-0-titleFontColor' value='"+(this.portlet.titleFontColor).trim()+"' class='textbox' style='width:60px'>"+
    		 "<img title='颜色选择器'  align='center' src='EV/images/color.JPG' onmouseover=\"this.style.cursor='hand'\" onClick=\"openSelectColor('"+this.id+"_result-0-titleFontColor');\"></td>"+
    		 "</tr>"+
    		 "<tr>"+
    		 "<td height='28' align='right'>标题字体大小：</td>"+
    		 "<td height='28'><input  maxLength='2' errorPrompt='只能输入1-20之间的正整数' validateType='positive_integer'  type='text' id='"+this.id+"_result-0-titleFontSize' name='"+this.id+"_result-0-titleFontSize' value='"+(this.portlet.titleFontSize).trim()+"' class='textbox' style='width:40px'>像素</td>"+
    		 "<td height='28' align='right'>标题字体类型：</td>"+
    		 "<td height='28'>"+
    		 "<select name='"+this.id+"_result-0-titleFontType' id='"+this.id+"_result-0-titleFontType'>"+
    		 "<option value='Arial' "+(this.portlet.titleFontType=='Arial'?'selected':'')+" >Arial</option>"+
			 "<option value='Helvetica'  "+(this.portlet.titleFontType=='Helvetica'?'selected':'')+" >Helvetica</option>"+
			 "<option value='Courier'  "+(this.portlet.titleFontType=='Courier'?'selected':'')+" >Courier</option>"+
			 "<option value='sans-serif'  "+(this.portlet.titleFontType=='sans-serif'?'selected':'')+" >sans-serif</option>"+
			 "<option value='mono'  "+(this.portlet.titleFontType=='mono'?'selected':'')+" >mono</option>"+
			 "<option value='Verdana'  "+(this.portlet.titleFontType=='Verdana'?'selected':'')+" >Verdana</option>"+
			 "<option value='Georgia'  "+(this.portlet.titleFontType=='Georgia'?'selected':'')+" >Georgia</option>"+
			 "<option value='黑体'  "+(this.portlet.titleFontType=='黑体'?'selected':'')+" >黑体</option>"+
			 "<option value='宋体'  "+(this.portlet.titleFontType=='宋体'?'selected':'')+" >宋体</option>"+
			 "<option value='幼圆'  "+(this.portlet.titleFontType=='幼圆'?'selected':'')+" >幼圆</option>"+
			 "<option value='微软雅黑'  "+(this.portlet.titleFontType=='微软雅黑'?'selected':'')+" >微软雅黑</option>"+
			 "<option value='仿宋_GB2312'  "+(this.portlet.titleFontType=='仿宋_GB2312'?'selected':'')+" >仿宋_GB2312</option>"+
			 "<option value='楷体_GB2312'  "+(this.portlet.titleFontType=='楷体_GB2312'?'selected':'')+" >楷体_GB2312</option>"+
    		 "</select></td>"+
    		 "<td height='28' align='right'>&nbsp;</td>"+
    		 "</tr>"+
    		 "<tr>"+
    		 "<td height='28' align='right'>Portlet高度：</td>"+
    		 "<td height='28'><input  maxLength='4' errorPrompt='portlet高度只能输入55-9999之间的正整数' validateType='positive_integer'  type='text' id='"+this.id+"_result-0-height' name='"+this.id+"_result-0-height' value='"+(this.portlet.height).trim()+"' class='textbox' style='width:40px'>像素</td>";
     if(this.portlet.evcm02.portletContentType==2){
     			div_html+=
     		 "<td height='28' align='right'>内容字体类型：</td>"+
    		 "<td height='28'>"+
    		 "<select name='"+this.id+"_result-0-contentFontType' id='"+this.id+"_result-0-contentFontType'>"+
    		 "<option value='Arial' "+(this.portlet.contentFontType=='Arial'?'selected':'')+" >Arial</option>"+
			 "<option value='Helvetica'  "+(this.portlet.contentFontType=='Helvetica'?'selected':'')+" >Helvetica</option>"+
			 "<option value='Courier'  "+(this.portlet.contentFontType=='Courier'?'selected':'')+" >Courier</option>"+
			 "<option value='sans-serif'  "+(this.portlet.contentFontType=='sans-serif'?'selected':'')+" >sans-serif</option>"+
			 "<option value='mono'  "+(this.portlet.contentFontType=='mono'?'selected':'')+" >mono</option>"+
			 "<option value='Verdana'  "+(this.portlet.contentFontType=='Verdana'?'selected':'')+" >Verdana</option>"+
			 "<option value='Georgia'  "+(this.portlet.contentFontType=='Georgia'?'selected':'')+" >Georgia</option>"+
			 "<option value='黑体'  "+(this.portlet.contentFontType=='黑体'?'selected':'')+" >黑体</option>"+
			 "<option value='宋体'  "+(this.portlet.contentFontType=='宋体'?'selected':'')+" >宋体</option>"+
			 "<option value='幼圆'  "+(this.portlet.contentFontType=='幼圆'?'selected':'')+" >幼圆</option>"+
			 "<option value='微软雅黑'  "+(this.portlet.contentFontType=='微软雅黑'?'selected':'')+" >微软雅黑</option>"+
			 "<option value='仿宋_GB2312'  "+(this.portlet.contentFontType=='仿宋_GB2312'?'selected':'')+" >仿宋_GB2312</option>"+
			 "<option value='楷体_GB2312'  "+(this.portlet.contentFontType=='楷体_GB2312'?'selected':'')+" >楷体_GB2312</option>"+
    		 "</select></td>"+
     			"</tr>";
    		 }else{
    		 	div_html+="<td height='28' align='right'>&nbsp;</td>"+
    		 	"<td height='28'>&nbsp;</td>"+
    		 	"</tr>";
    		 }
	 if(this.portlet.evcm02.portletContentType==2){//rss
	        div_html+=
	         "<tr>"+
    		 "<td height='28' align='right'>内容字体大小：</td>"+
    		 "<td height='28'><input  maxLength='1' errorPrompt='只能输入1-5之间的正整数' validateType='positive_integer'  type='text' id='"+this.id+"_result-0-contentFontSize' name='"+this.id+"_result-0-contentFontSize' value='"+(this.portlet.contentFontSize).trim()+"' class='textbox' style='width:40px'>像素</td>"+
    		 "<td height='28' align='right'>内容字体颜色：</td>"+
    		 "<td height='28'>"+
    		 "<input  errorPrompt='内容字体颜色不能输入空值' maxLength='50' type='text' id='"+this.id+"_result-0-contentFontColor' name='"+this.id+"_result-0-contentFontColor' value='"+(this.portlet.contentFontColor).trim()+"' class='textbox' style='width:60px'>"+
    		 "<img title='颜色选择器'  align='center' src='EV/images/color.JPG' onmouseover=\"this.style.cursor='hand'\" onClick=\"openSelectColor('"+this.id+"_result-0-contentFontColor');\"></td>"+
    		 "<td height='28' align='right'>&nbsp;</td>"+
    		 "</tr>"+
	         "<tr>"+
    		 "<td height='28' align='right'>内容显示行数：</td>"+
    		 "<td height='28'><input  maxLength='2' errorPrompt='只能输入0-20之间的正整数' validateType='positive_integer'  type='text' id='"+this.id+"_result-0-contentRows' name='"+this.id+"_result-0-contentRows' value='"+(this.portlet.contentRows).trim()+"' class='inputField' style='width:40px'>行</td>"+
    		 "</tr>";
	        }
	       div_html+=
	         "</table>"+
    		 "</div>"+
    		 "<div class='window_contentbottom' style='top:"+top+"px;height:28px'>"+
    		 "<table width='160' align='right'>"+
    		 "<tr align='center'>"+
    		 "<td width='122'><input type='button'  value='保存' id='submit_"+this.id+"' name='submit_"+this.id+"'onclick=\"savePortletParameter('"+this.id+"');\" class='button' style='height:27px'></td>"+
    		 "<td width='104'><input type='button' onclick=\"cancelEdit('"+this.id+"')\" type='submit' class='button' value='取 消' style='height:27px'></td>"+
    		 "</tr>"+
    		 "</table>"+
    		 "</div>"+
    		 "</div>"+
    		 "<div   class='window_rightbg' style='height:"+high+"px'></div>"+
    		 "</div>"+
    		 "<div style='width:460px' class='window_bottom'>"+
    		 "<div  class='window_bottomleft'> </div>"+
    		 "<div  class='window_bottombg' style='width:440px'></div>"+
    		 "<div class='window_bottomright'></div>"+
    		 "</div>"+
    		 "</div>"
         return  div_html;
}

/*关闭编辑窗口*/
function cancelEdit(id){
	document.getElementById(id+"_edit").style.display="none";
}

/**
设置portlet参数
在回调函数show_portlet_edit_content里使�?
*/
function savePortletParameter(id) {
	  div_validate=id+"-ef_region_inqu";
	  if(efvalidateDiv(div_validate)){
	    titleFontSize = ef.get(id+"_result-0-titleFontSize");
		if(titleFontSize!=null&& titleFontSize.value!=""&&titleFontSize.value > 20){
		  alert("标题字体大小过大,请设置1-20之间正整数!");
		  return false;
		}
		height = ef.get(id+"_result-0-height");
		if(height!=null && height.value!=""&&(height.value < 55 || height.value > 9999)){
		  alert("portlet高度只能输入55-9999之间的正整数!");
		  return false;
		}
	    contentFontSize = document.getElementById(id+"_result-0-contentFontSize");
	    if(contentFontSize!=null &&contentFontSize.value!="" &&contentFontSize.value > 5){
		  alert("内容字体大小过大,请设置1-5之间正整数!");
		  return false;
		}

	    contentRows = document.getElementById(id+"_result-0-contentRows");
	    if(contentRows!=null && contentRows.value!="" &&contentRows.value > 20){
		  alert("内容显示行数过大,请设置0-20之间正整数!");
		  return false;
		}

	    var info = new EiInfo();
	    var portalId = ef.get("portalId").value;
	    info.setByNode(div_validate); 
	    info.set("portletId",id);
	    info.set("portalId",portalId);
	    EiCommunicator.send( "EVPM03", "save" , info, null);
	    
	    if (ajaxEi != null) {
		     alert("操作成功");	
		     var editFlag=ef.get("editFlag").value;
		      var evUserParam=ef.get("evUserParam").value;
		     portal.repaintPortlet(id,evUserParam,editFlag);
	    }
	  }
}





