var isCognos;
var editor,editor1,editor2;
document.write("<script language=javascript src='EU/ueditor/editor_all.js'></script>");
/******文章状态列表******/
var STATE_CREATE = "10";//新稿
var STATE_DENIAL = "20";//已否
var STATE_AUDIT = "30";//审核中
var STATE_PUBLISHING = "40";//待发布
var STATE_RELEASE1 = "50";//已发
var STATE_DELETE = "00";//已删

var articleId;//文章标识
var articleState;//文章状态
var columnId;//栏目标识
var fileIdStr = ""; //拼接fileId

efform_onload = function() {
	//按钮设为不可用
	setFalseButton(); 
	fileIdStr = ef.get("fileIdStr").value;
	articleId = ef.get("inqu_status-0-articleId").value;
	articleState = ef.get("result-0-articleState").value;
	columnId=ef.get("inqu_status-0-columnId").value;
	//nodeId nodeType 在图片上传时用于获取站点文档保存方式设置 本地 or 第三方服务器
	ef.get("nodeId").value=ef.get("inqu_status-0-columnId").value;
	ef.get("nodeType").value="c";
	
	var info = new EiInfo();
	if(articleId!=null&&articleId!=""){
		info.set("artId",articleId);
		EiCommunicator.send( "ECAM02", "querySiteByArticleId" , info, querySiteInfo);   //根据文章Id查询所属站点的信息
	}else{
		info.set("columnId",columnId);
		EiCommunicator.send( "ECAM02", "querySiteByColumnId" , info, querySiteInfo);   //根据栏目Id查询所属站点的信息
	}
	
	editor = new baidu.editor.ui.Editor();      
	editor.render("myEditor"); 
	editor1 = new baidu.editor.ui.Editor(); 
	editor1.render("myEditor1"); 
	editor2 = new baidu.editor.ui.Editor(); 
	editor2.render("myEditor2"); 
	
	var eiInfo = _getEi();
	isCognos = eiInfo.get("isCognos");
	 
	var value=ef.get("inqu_status-0-flag").value;
    
   if(value=="insert"){
      ef.get("authDiv").style.display="none";
      ef.get("result-0-articleSeq").value='1';
      setState(false);
      styleInit();
      previewInit();
      return;
   }else{   	   
   	    var headLineNews=ef.get("result-0-isHeadlineNews").value;
   	    var imageNews=ef.get("result-0-isImgNews").value;
        var Authorize=ef.get("result-0-isAuthorize").value;
     
        if(headLineNews=="1"){
  	       ef.get("result-0-headLineNews").checked=true;
        } else {
           ef.get("result-0-headLineNews").checked=false;
        }
        if(imageNews=="1"){
  	       ef.get("result-0-imgNews").checked=true;
        } else {
          ef.get("result-0-imgNews").checked=false;
        }
       
        if(Authorize=="1"){
  	      ef.get("result-0-authorize").checked=true;
        } else {
          ef.get("result-0-authorize").checked=false;
        }
       checkbox_check();
        analyFont();
        previewInit();
        var titleStyle=ef.get("result-0-titleStyle").value;
        if(titleStyle.trim()!=''){
          ef.get("usefont").checked=true;
          setState(true);
        }else{
          ef.get("usefont").checked=false;
          setState(false);
        }
    }
   
}
//根据站点设置的按钮加载可用按钮
 querySiteInfo = {
      onSuccess : function(eiInfo){
		var articleBtn= eiInfo.get("siteArticleButton");
     	var btns = articleBtn.split("#");
		for(var i=0;i< btns.length;i++){
			if(btns[i]=="01")
				efbutton.setButtonStatus("view", true);
			if(btns[i]=="02")
				efbutton.setButtonStatus("save", true);	
			if(btns[i]=="03")
				efbutton.setButtonStatus("close", true);		
			if(btns[i]=="04")
				efbutton.setButtonStatus("save2submit", true);		
			if(btns[i]=="05")
				efbutton.setButtonStatus("save2new", true);		
			if(btns[i]=="06")
				efbutton.setButtonStatus("publish2new", true);		
			if(btns[i]=="07")
				efbutton.setButtonStatus("save2close", true);		
			if(btns[i]=="08")
				efbutton.setButtonStatus("save2publish", true);		
			if(btns[i]=="09")
				efbutton.setButtonStatus("audit", true);				
		}
      },
      onFail: function(eMsg){
      	alert("failure");
      }
}

function setFalseButton(){
	efbutton.setButtonStatus("view", false);
	efbutton.setButtonStatus("save", false);
	efbutton.setButtonStatus("close", false);
	efbutton.setButtonStatus("save2submit", false);
	efbutton.setButtonStatus("save2new", false);
	efbutton.setButtonStatus("publish2new", false);
	efbutton.setButtonStatus("save2close", false);
	efbutton.setButtonStatus("save2publish", false);
	efbutton.setButtonStatus("audit", false);
}
 
function styleInit(){
  ef.get("result-0-titleColor").value="#000000";
  ef.get("result-0-titleColor").style.background="#000000";
  ef.get("result-0-titleSize").value=12;
  ef.get("result-0-titleFont").value="Arial";
}
function previewInit(){
  var title=ef.get("result-0-articleTitle").value;
  //将eiInfo中的内容显示到编辑器中
  var articleprefix = ef.get("result-0-articleprefix").value;  //将前缀显示到编辑器中
  editor.setContent(articleprefix);
  var articlesuffix = ef.get("result-0-articlesuffix").value;  //将后缀显示到编辑器中
  editor1.setContent(articlesuffix);
  var article = ef.get("result-0-articleContent").value;	   //将内容显示到编辑器中
  editor2.setContent(article);						
  
  var titleColor=ef.get("result-0-titleColor").value;
  var titleSize=ef.get("result-0-titleSize").value;
  var titleFont=ef.get("result-0-titleFont").value;
  var isItal=ef.get("isItalic").checked;
  var isBold=ef.get("isBold").checked;
  ef.get("titleStylePre").innerText=title;
  ef.get("titleStylePre").color=titleColor;
  ef.get("titleStylePre").style.fontSize=titleSize+"PX";
  ef.get("titleStylePre").style.fontFamily=titleFont;
  if(isBold)
   ef.get("titleStylePre").style.fontWeight='bold';
   else
   ef.get("titleStylePre").style.fontWeight='normal';
  if(isItal)
   ef.get("titleStylePre").style.fontStyle='italic';
   else
   ef.get("titleStylePre").style.fontStyle='normal';
}
function stateChange(){
   var fontState=ef.get("usefont").checked;
   setState(fontState);
}
function setState(fontState){
   if(!fontState){
      ef.get("fontstate").style.display="none";
      ef.get("titleStyle").style.display='none';
   }else{
   ef.get("fontstate").style.display="";
   ef.get("styleCode0").innerText='编辑标题样式';
   }
}
function genFont(){
var fontState=ef.get("usefont").checked;
if(!fontState){
   ef.get("result-0-titleStyle").value="";
}else{
  var titleColor=ef.get("result-0-titleColor").value;
  var titleSize=ef.get("result-0-titleSize").value;
  var titleFont=ef.get("result-0-titleFont").value;
  var isItal=ef.get("isItalic").checked;
  var isBold=ef.get("isBold").checked;
  var titleStyle="<font id='titleFont' style='font-family:"+titleFont+";font-size:"+titleSize+"px;color:"+titleColor;
  if(isBold)
  	titleStyle=titleStyle+";font-weight:bold";
  else
  	titleStyle=titleStyle+";font-weight:normal";
  	
  if(isItal)
  	titleStyle=titleStyle+";font-style:italic";
  else
  	titleStyle=titleStyle+";font-style:normal";
  titleStyle=titleStyle+";'></font>";
  ef.get("result-0-titleStyle").value=titleStyle;
  ef.get("result-0-formerStyle").value=titleStyle;
  }
}
function analyFont(){
 var titleStyle=ef.get("result-0-formerStyle").value;
 var fontFValue=getFontValue(titleStyle,"font-family");
 var fontSValue=getFontValue(titleStyle,"font-size");
 var fontWValue=getFontValue(titleStyle,"font-weight");
 var fontStValue=getFontValue(titleStyle,"font-style");
 var colorValue=getFontValue(titleStyle,"color");
 if(colorValue!=null){
 	ef.get("result-0-titleColor").value=colorValue;
 	ef.get("result-0-titleColor").style.background=colorValue;
 }else{
  	ef.get("result-0-titleColor").value="#000000";
  	ef.get("result-0-titleColor").style.background="#000000";
 }
 if(fontSValue!=null)
 	ef.get("result-0-titleSize").value=fontSValue.substr(0,2);
 else
 	ef.get("result-0-titleSize").value=12;
 if(fontFValue!=null)
 	ef.get("result-0-titleFont").value=fontFValue;
 else
 	ef.get("result-0-titleFont").value="Arial";
 if(fontWValue=='bold')
   ef.get("isBold").checked=true;
 else if(fontWValue='normal')
     ef.get("isBold").checked=false;
 if(fontStValue=='italic')
     ef.get("isItalic").checked=true;
 else if(fontStValue=='normal')
      ef.get("isItalic").checked=false;
}

//上传图片
function upload(){
	/*
 var value=ef.get("inqu_status-0-flag").value;
 if(value=="true" || value=="insert"){
   var context=ef.get("context").value;
   var page =context+"/DispatchAction.do?efFormEname=ECDMTT&type=1";
   var url = FCKShowDialog( page,window,800,600);
   if(url!=null||url!=undefined){
   var type=[];
   type=url.split('/');
 
   ef.get("result-0-articleImg").value=type[type.length-1];
   }
   }*/
	var nodeId = document.getElementById("nodeId").value;
	var url = "./EC/DM/ECDM0105.jsp?nodeId="+nodeId;
	var fileId = window.showModalDialog(url,null,"dialogWidth:350px;dialogHeight:230px;");
	var index1 = fileId.lastIndexOf("/");
	var index2 = fileId.lastIndexOf("_");
	var fid = fileId.substring(index1+1,index2);
	ef.get("result-0-articleImg").value= fid;
}

//FCK显示框
function FCKShowDialog(pagePath, args, width, height)
{	
	return showModalDialog(pagePath, args, "dialogWidth:" + width + "px;dialogHeight:" + height + "px;help:no;scroll:no;status:no");
}

function getFontValue(sourceStr,fontName){
       var fontIndex=sourceStr.indexOf(fontName);    
	   if(fontIndex!=-1){
		   var colonIndex=sourceStr.indexOf(":", fontIndex);
		   var semiIndex=sourceStr.indexOf(";", fontIndex);
		   return sourceStr.substring(colonIndex+1, semiIndex);
	   }
	   return null; 
}
//多行文本框取值
function checkbox_check(){
   var chkHeadLineNews = ef.get("result-0-headLineNews").checked;
   var chkImgNews = ef.get("result-0-imgNews").checked;
   var checked=ef.get("result-0-authorize").checked;
   var img=document.getElementById('uploadImg');
   //是否头条新闻
   if(chkHeadLineNews==true){
        ef.get("result-0-isHeadlineNews").value="1";
   }else {
      ef.get("result-0-isHeadlineNews").value="0";
   }
   //是否图片
   if(chkImgNews==true){
        ef.get("result-0-isImgNews").value="1";
   }else {
      ef.get("result-0-isImgNews").value="0";
   }
   //是否授权
   if(checked==true){
      	img.style.display="";
       ef.get("result-0-isAuthorize").value="1";
      } else {
      img.style.display="none";
      ef.get("result-0-isAuthorize").value="0";
   }
}
//弹出授权查询
function img_authorize_onclick() {
	var info=new EiInfo();
    info.setById("inqu_status-0-articleId");
    EiCommunicator.send( "ECAM02", "getAuthInfo", info, null);	
    if(ajaxEi!=null)	
		show('result-0-articleAbstract',ajaxEi);
	}
function show(componentId,eiInfo){
	var component=document.getElementById(componentId);
	var div_node = efform.getSubGridDiv();
     var tag=ef.get("inqu_status-0-flag").value; 
	div_node.efDisplayingCol = null ;
	
	var inner_html = [];
	inner_html.push("<TABLE cellspacing='0' cellpadding='1'>");
	inner_html.push("<TR>");
	inner_html.push("<TD align='left' id='containerOuter'>&nbsp;请选择&nbsp;</TD>");
	inner_html.push("<TD align='right' id='containerOuter'><IMG src='" + EF_IMAGES_PATH + "efcalendar_close.gif' onclick='efwindow.hide();'/></TD>");
	inner_html.push("</TR>");
	inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();'><TD colspan=2>");
	inner_html.push("<div id='_ef_grid_subgrid' title='授权信息' style='overflow:hidden;width:400px;height:280px;'></div>");
	inner_html.push("</TD></TR>");
	inner_html.push("<TR onmouseover='efform.nullfunction();' onclick='efform.nullfunction();' onmousemove='efform.nullfunction();'>");
	inner_html.push("<TD class='containerFooter' colspan='2' align='right'>");

	if(tag=="false"){
	inner_html.push("<table><tr><td></td><td>");
	inner_html.push("<div class='buttonDisabled' id='bt1' onclick='' style='cursor:hand'/>增加授权</div>");
	inner_html.push("</td><td></td><td>");
	inner_html.push("<div class='buttonDisabled' id='bt2' onclick='' style='cursor:hand'/>删除授权</div>");
	inner_html.push("</td></tr></table>");
	}else{
	inner_html.push("<table><tr><td></td><td>");
	inner_html.push("<div class='buttonClass' id='bt3' onclick='authorize_add()' style='cursor:hand'/>增加授权</div>");
	inner_html.push("</td><td></td><td>");
	inner_html.push("<div class='buttonClass' id='bt4' onclick='authorize_delete()' style='cursor:hand'/>删除授权</div>");
	inner_html.push("</td></tr></table>");
     }
	inner_html.push("</TD></TR>");
	inner_html.push("</TABLE>");	
	
	div_node.innerHTML = inner_html.join("");
	
	var style_config = new Object();
	style_config["operationBar"] = "false";
	var sub_grid = new efgrid( "auth", "_ef_grid_subgrid" );
	var custom_cols = {"index":{"userSetType":0},"metas":[{"pos":0,"sourceName":"source","attr":{"source":[{"value":"POST","label":"角色"},{"value":"PSTP","label":"角色类型"}]},"editor":"combo"}]};	
	sub_grid.setEnable( true );
	sub_grid.setReadonly( true );
	sub_grid.setAjax( true );
	sub_grid.setAutoDraw( true );
	sub_grid.setServiceName( "ECAM02" );
	sub_grid.setQueryMethod( "getAuthorize");
	sub_grid.setCustomColumns( custom_cols );
    
	if (typeof(eiInfo) == "undefined") {
	  sub_grid.setData( _getEi() );
	} else {
	  sub_grid.setData( eiInfo );
	}
	sub_grid.setStyle( style_config );
	sub_grid.paint();
	efwindow_first_show=false;
	efwindow.show( component, div_node.id,"fixed" );
}
//增加授权
function authorize_add(){
	efform.openNewForm("ESUT10", "chooseType=POST,PSTP&&efFormPopup=1");
}

//回调函数
efform_onPopupReturn = function(eform, rows){

  var grid = efgrid.getGridObject( "_ef_grid_subgrid" ); 
  var tempArray = new Array();
  var typeList = "";
  var idList = "";
  var descList = "";
  for( var i=0; i<rows.length; i++ ){
    var row = rows[i];  
    typeList = typeList+row["clazz"]+"#";
    idList = idList+row["id"]+"#";
    descList = descList+row["name"]+"#";
  }
 
  document.getElementById("inqu_status-0-typeList").value = typeList;
  document.getElementById("inqu_status-0-idList").value = idList;
  document.getElementById("inqu_status-0-descList").value = descList; 
  efgrid.submitForm( "_ef_grid_subgrid", "EC","ECAM02","insert", true );
  //在db中增加数据,并返回增加后的查询结果
}
//删除授权
function authorize_delete(){
	var  grid=efgrid.getGridObject("_ef_grid_subgrid");
    if(checkNullRow()){
     efgrid.submitForm( "_ef_grid_subgrid", "EC","ECAM02","delete",true);
    }     
}
function checkNullRow(){
   var grid=efgrid.getGridObject("_ef_grid_subgrid");
   var rowCount=grid.getCheckedRowCount();
     if(rowCount==0){
      alert("请选择一条记录进行操作");
      return false;
     }
     else
      return true;
}

//日历控件的操作
efcalendar_click = function (control_source, id) {
  var value=ef.get("inqu_status-0-flag").value;
  if(value=="true"||value=="insert"){
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
  }
}

function editStyle(){
  var display=ef.get("titleStyle").style.display;
  if(display=='none'){
  	ef.get("titleStyle").style.display='';
  	ef.get("styleCode0").innerText='隐藏编辑区域';
  }else{  
     ef.get("titleStyle").style.display='none';
     ef.get("styleCode0").innerText='编辑标题样式';
  }
}
function openSelectColor() {
  var value=ef.get("inqu_status-0-flag").value;
  if(value=="true"||value=="insert"){
   var obj=window.showModalDialog("./EV/Common/Color.html","","edge:raised;scroll:1;status:0;help:0;resizable:0;dialogWidth:250px;dialogHeight:350px;");
   if(obj!=undefined){
	ef.get("result-0-titleColor").value=obj;
   	ef.get("result-0-titleColor").style.background=obj;
   ef.get("titleStylePre").color=obj;
   }
  } 
}
function changeTitleSize(){
  var fontSize=ef.get("result-0-titleSize").value;
 
   if(efvalidateObj(ef.get("result-0-titleSize"))){
     if(fontSize>=10&&fontSize<=30)
      ef.get("titleStylePre").style.fontSize=fontSize;
      else if(fontSize==''){
       ef.get("result-0-titleSize").value='12';
        ef.get("titleStylePre").style.fontSize='12px';
        }
      else{
       alert("请输入10-30的正整数");
        ef.get("result-0-titleSize").value='12';
        ef.get("titleStylePre").style.fontSize='12px';
       }
  }else{
    ef.get("result-0-titleSize").value='12';
        ef.get("titleStylePre").style.fontSize='12px';
 }
}
function fontStyleChange(){
  var font=ef.get("result-0-titleFont").value;
  ef.get("titleStylePre").style.fontFamily=font;

}
function synchContent(){
   var content=ef.get("result-0-articleTitle").value;
   ef.get("titleStylePre").innerText=content;
}

//---显示标题前缀后缀编辑框
function openPrefixSufix(){
  var fixObj = ef.get("articleprefix").style.display;
   if(fixObj == 'none'){
  	 ef.get("articleprefix").style.display='';
  	 ef.get("articlesuffix").style.display='';
  }else{
     ef.get("articleprefix").style.display="none";
      ef.get("articlesuffix").style.display="none";
  }
   
}
//更多
function more(){
  var fixObj = ef.get("moreDiv").style.display;
   if(fixObj == 'none'){
  	 ef.get("moreDiv").style.display='';
  }else{
     ef.get("moreDiv").style.display="none";
  }
   
}

function changeBold(){
   var isBold=ef.get("isBold").checked;
   if(isBold)
   ef.get("titleStylePre").style.fontWeight='bold';
   else
   ef.get("titleStylePre").style.fontWeight='normal';
   
}
function changeStyle(){
    var isItal=ef.get("isItalic").checked;
   if(isItal)
   ef.get("titleStylePre").style.fontStyle='italic';
   else
   ef.get("titleStylePre").style.fontStyle='normal';
}

//获取页面关于文章的详细信息
getArticleDetail = function(){
	var info = new EiInfo();
	var a = ef.get("result-0-articleAbstract").value;
	var b = ef.get("result-0-keyWords").value;
	if(efutils.getTotalBytes(a)>250){
		info.setMsg("摘要部分长度不能超过250！");
		info.setStatus(-1);
		return info;
	}
	if(efutils.getTotalBytes(b)>500){
		info.setMsg("关键字部分长度不能超过500！");
		info.setStatus(-1);
		return info;
	}
	var flag=ef.get("inqu_status-0-flag").value;

    if (efvalidateForm(ef.get("ECAM02"))) {
        //if( flag!="insert")
   	       checkbox_check();
    	if(check()){
    	   genFont();
    	   var articleprefix = editor.getContent();   //获取编辑器内容
    	   info.set("articleprefix",articleprefix);  //将内容添加到info中
    	   var articlesuffix = editor1.getContent();   
    	   info.set("articlesuffix",articlesuffix);  
    	   var articleContent = editor2.getContent();   
    	   info.set("articleContent",articleContent); 
    	   info.set("fileIdStr",ef.get("fileIdStr").value);
    	   
    	   info.setByNode("ef_region_result");  
    	   
    	   info.setByNode("ef_region_ext");
    	}else{
    		return null;
    	}
   	}
   	return info;
}

//判断起始时间不能早于截止时间
function check(){
   var effectStartTime=ef.get("result-0-effectStartTime").value.trim();
   var effectEndTime=ef.get("result-0-effectEndTime").value.trim();
   var displayTime=ef.get("result-0-displayTime").value.trim();
   var articleTitle=ef.get("result-0-articleTitle").value.trim();

	if(articleTitle.length==0)
	{
		alert("文章标题不能为空");
		return false;
	}
	if(effectStartTime=='')
	{
		alert("有效时间的起始时间不能为空");
		return false;
	}
	if(effectEndTime==''){
		alert("有效时间的截止时间不能为空");
		return false;
	}
	if(displayTime==''){
		alert("显示时间不能为空");
		return false;
	}
	if(effectStartTime-effectEndTime>0)
	{
		alert("起始时间不能晚于截止时间");
		return false;
	}
	if(!editor2.hasContents()){
		alert("文章内容不能为空");
		return false;
	}
    return true; 
}
//检查文章是否处于某状态
function checkState(state){
	if(state==articleState){
		return true;
	}else{
		return false;
	}
}

/*保存--------【新稿、已否】*/ 
button_save_onclick=function(){
	if(articleState!=""&&!checkState(STATE_CREATE)&&!checkState(STATE_DENIAL)){
		alert("只有处于“新稿”或者“已否”状态的文章才允许进行【保存】操作");
		return;
	}
   	var info = getArticleDetail();
   	if(info!=null){
   		EiCommunicator.send( "ECAM02", "save" , info, ajax_callback_refresh );
   	}
}

/*保存并关闭--------【新稿、已否】【保存+关闭】*/ 
button_save2close_onclick=function(){
	if(articleState!=""&&!checkState(STATE_CREATE)&&!checkState(STATE_DENIAL)){
		alert("只有处于“新稿”或者“已否”状态的文章才允许进行【保存并关闭】操作");
		return;
	}
   	var info = getArticleDetail();
   	if(info!=null){
   		EiCommunicator.send( "ECAM02", "save" , info, ajax_callback_close);
   	}
}

/*保存并新建--------【新稿、已否】【保存+新开页面】*/ 
button_save2new_onclick=function(){
	if(articleState!=""&&!checkState(STATE_CREATE)&&!checkState(STATE_DENIAL)){
		alert("只有处于“新稿”或者“已否”状态的文章才允许进行【保存并新建】操作");
		return;
	}
   	var info = getArticleDetail();
   	if(info!=null){
   		EiCommunicator.send( "ECAM02", "save" , info, ajax_callback_new);
   	}
}

/*保存并提交--------【新稿、已否】【保存+提交】*/ 
button_save2submit_onclick=function(){
	if(articleState!=""&&!checkState(STATE_CREATE)&&!checkState(STATE_DENIAL)){
		alert("只有处于“新稿”或者“已否”状态的文章才允许进行【保存并提交】操作");
		return;
	}
	
   	var info = getArticleDetail();
   	
   	if(info!=null){
   		EiCommunicator.send( "ECAM02", "save2submit" , info, ajax_callback_close);
   	}
}

/*保存并发布--------【新稿、已否、审核中、待发布】【保存+发布】*/ 
button_save2publish_onclick=function(){
	if(articleState!=""&&!checkState(STATE_CREATE)&&!checkState(STATE_DENIAL)&&!checkState(STATE_AUDIT)&&!checkState(STATE_PUBLISHING)&&!checkState(STATE_RELEASE1)){
		alert("只有处于“新稿”、“已否”、“审核中”或者“待发布”状态的文章才允许进行【保存并发布】操作");
		return;
	}
	if(!checkArticleState()){
		return;
	}
   	var info = getArticleDetail();
   	if(info!=null){
	  	if(!confirm("确定要发布吗?")){
			return;
		}
		var fileStr = document.getElementById("fileIdStr").value;
		info.set("fileStr",fileStr);
	    EiCommunicator.send( "ECAM02", "save" , info, save2publish_callback);
   	}
}

save2publish_callback = {
      onSuccess : function(eiInfo){
    	EiCommunicator.send( "ECSM01", "releaseArticle" , eiInfo, ajax_callback_close);
      },
      onFail   : function(eMsg){
      	alert("failure");
      }
    }



/*提交并新建--------【新稿、已否】【保存+提交+新开页面】*/ 
button_publish2new_onclick=function(){
	if(articleState!=""&&!checkState(STATE_CREATE)&&!checkState(STATE_DENIAL)){
		alert("只有处于“新稿”或者“已否”状态的文章才允许进行【提交并新建】操作");
		return;
	}
   	var info = getArticleDetail();
   	if(info.getStatus()==-1){
   		alert(info.getMsg());
   		return;
   	}else{
   		EiCommunicator.send( "ECAM02", "save2submit" , info, ajax_callback_new);
   	}
}

/*审核*/
button_audit_onclick=function(){
	if(!checkState(STATE_AUDIT)){
		alert("只有处于“审核中”状态的文章才允许进行【审核】操作");
		return;
	}
	efwindow.show(null,"checkContent","center");
}

/*预览*/
button_view_onclick=function(){
  	var info = new EiInfo();
  	if(articleId==""){
  		alert("文章必须新建后才允许预览！");
  		return;
  	}
	info.set("articleId",articleId);
	EiCommunicator.send( "ECAM02", "viewArticle" , info, null );
	var url=ajaxEi.get("url");
	window.open(url);
}

/*关闭*/
button_close_onclick=function(){
	var sure=confirm("文章未保存，是否要关闭？");
	if(sure){
	   var win =window.opener;
       if (!win.closed) {
		 win.efform_onPopupReturn("ECAM02", "0");
       }	
	 window.close();
   }
}

//点击审核弹出框中的取消按钮
button_cancel_onclick=function(){
  efwindow.hide();
}
//点击审核弹出框中的确定按钮
button_confirm_onclick=function(){
	var info = new EiInfo();
	info.set("articleId",articleId);
	var isPassAudit = $("input[name='isPassAudit']:checked").val();
	info.set("isPassAudit",isPassAudit);
	EiCommunicator.send( "ECAM06", "auditArticle" , info, ajax_callback_close );
  	window.close();
}


/*****回调函数说明
ajax_callback_hold  返回后台提示信息，不关闭当前页面
ajax_callback_close 关闭当前页面，刷新父页面的列表
ajax_callback_new  返回后台提示信息，并新开一个新增页面
ajax_callback_refresh  返回后台提示信息，不关闭当前页面,刷新当前页面
****/

/*---------返回后台提示信息，不关闭当前页面----------
ajax_callback_hold = {
      onSuccess : function(eiInfo){
      	alert(eiInfo.getMsg());
      },
      onFail   : function(eMsg){
      	alert("failure");
      }
    }
 */   
/*---------返回后台提示信息，不关闭当前页面,刷新当前页面----------*/
ajax_callback_refresh = {
      onSuccess : function(eiInfo){
    	alert(eiInfo.getMsg());
      	if(eiInfo.getStatus()!=-1){
      		articleId = eiInfo.get("articleId");
   			ef.get("inqu_status-0-articleId").value = articleId;
      		
   			window.opener.efform_onPopupReturn("ECAM02", "0");
            window.location.href="DispatchAction.do?efFormEname=ECAM02&methodName=query&inqu_status-0-flag=true&inqu_status-0-columnId="
             +columnId+"&inqu_status-0-articleId="+eiInfo.get("articleId");
      	}
      },
      onFail: function(eMsg){
      	alert("failure");
      }
    }
        
/*---------关闭当前页面，刷新父页面的列表----------*/
ajax_callback_close = {
      onSuccess : function(eiInfo){
      	alert(eiInfo.getMsg());
      	if(eiInfo.getStatus()!=-1){
      		var win =window.opener;
      		 if (!win.closed) {
	             win.efform_onPopupReturn("ECAM02", "0");
             }
             window.close();	
      	}
      },
      onFail   : function(eMsg){
      	alert("failure");
      }
    }
    
/*---------返回后台提示信息，并新开一个新增页面----------*/
ajax_callback_new = {
      onSuccess : function(eiInfo){
    	alert(eiInfo.getMsg());
      	if(eiInfo.getStatus()!=-1){
      		window.opener.efform_onPopupReturn("ECAM02", "0");
            window.location.href="DispatchAction.do?efFormEname=ECAM02&inqu_status-0-flag=insert&init_msg=insertAgain&inqu_status-0-columnId="+columnId;
      	}
      },
      onFail   : function(eMsg){
      	alert("failure");
      }
    }

checkArticleState = function(){
	
	var siteArticleState = "";
	var columnId = document.getElementById("inqu_status-0-columnId").value;
	var info = new EiInfo();
	info.set("nodeId",columnId);
	info.set("nodeType","c")
	EiCommunicator.send( "ECCM01", "getSiteArticleStates" , info, null );
	if(ajaxEi!=null){
		siteArticleState = ajaxEi.get("siteArticleState");
	}
	var articleState = document.getElementById("result-0-articleState").value;
    if(articleState==""){
		articleState = "10";
	}

	if(siteArticleState.indexOf(articleState,0)==-1){
		alert("文章当前的状态在所处站点下不允许发布！")
		return false;
	}

	return true;
}
//将与文章有关的图片拼接赋值给页面隐藏域
efform_onPopupReturnM = function(obj){
	if(obj!=null){
		if(fileIdStr!=null && fileIdStr!=""){
			fileIdStr += ","+ obj;
		}else{
			fileIdStr += obj;
		}
	}
	//alert("obj:"+fileIdStr);
	document.getElementById("fileIdStr").value = fileIdStr;		
}


button_extattr_onclick = function(){
	var isExist = document.getElementById("existExtAttr").value;
	if(isExist==0){
		alert("没有可维护的扩展信息，请先到站点维护扩展信息!");
		return false;
	}else{
	 efwindow.show(null,"ext","center");
	}
}
button_close1_onclick = function(){
	efwindow.hide();
}