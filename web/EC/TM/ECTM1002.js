//------------------------栏目链接RichClientEditorStart----------------------------
//封装FCK的三个DIV对象  
var editor1,editor2;
document.write("<script language=javascript src='EU/ueditor/editor_all.js'></script>");
//var divFckArr = new Array("FCKeditorColumnPrefix" , "FCKeditorColumnSuffix");
//三个多行文本输入域  
//var textAreaArr = new Array("DataFCKeditorColumnPrefix" , "DataFCKeditorColumnSuffix");
//表单提交参数标识名  
var submitDataArr = new Array("columnLinkPrefixString" , "columnLinkPostfixString");

var eiInfo;
efform_onload = function ()
{
	//栏目链接
	eiInfo=_getEi();
	if(ef.get("result2-0-columnLinkDisplayRows").value=='' || ef.get("result2-0-columnLinkDisplayRows").value==0)
		ef.get("result2-0-columnLinkDisplayRows").value = 20;
	if(ef.get("result2-0-columnLinkDisplayCols").value=='' || ef.get("result2-0-columnLinkDisplayCols").value==0)
		ef.get("result2-0-columnLinkDisplayCols").value = 1;
	if(ef.get("result2-0-columnLinkDisplayWords").value=='' || ef.get("result2-0-columnLinkDisplayWords").value==0)
		ef.get("result2-0-columnLinkDisplayWords").value = 20;
	
	editor1 = new baidu.editor.ui.Editor(); 
	editor1.render("myEditor1"); 
	editor2 = new baidu.editor.ui.Editor(); 
	editor2.render("myEditor2"); 
	var value1 = eiInfo.getBlock('result2').getCell('0',"columnLinkPrefixString");
	var value2 = eiInfo.getBlock('result2').getCell('0',"columnLinkPostfixString");
	value1 = value1==null?"":value1;//避免NULL值导致UEDITOR赋值异常
	value2 = value2==null?"":value2;
	ef.get('result2-0-columnLinkPrefixString').value = value1;
	ef.get('result2-0-columnLinkPostfixString').value = value2;
	//编辑器赋值
	editor1.setContent(value1);
	editor2.setContent(value2);
	/*
	for(var i=0;i<divFckArr.length;i++){
		ef.get('result2-0-'+submitDataArr[i]).value=eiInfo.getBlock('result2').getCell('0',submitDataArr[i]);
		showDialog("insert",2,divFckArr[i],textAreaArr[i],submitDataArr[i]);
	}*/
	//判断是否显示栏目链接指定栏目属性项
	onselect_source(1,ef.get("result2-0-columnLinkContentSourceMod").value);
	setStyle();
	hiddenElementById("ef_form_head");
}
/*栏目链接保存按钮*/
button_update2_onclick = function () 
{	
	if(!styleJudge("2")){
		return;
	}
	  
	 /*------------------保存fck数据
      for(var i=0;i<divFckArr.length;i++){
    	 editorToContent(2,textAreaArr[i],submitDataArr[i]);
     }*/
	 editorToContent(2,editor1,"columnLinkPrefixString");
	 editorToContent(2,editor2,"columnLinkPostfixString");
	if(efvalidateDiv("ef_region_result2")){
		if(ef.get("result2-0-columnLinkContentSourceMod").value<=2 && ef.get("result2-0-columnLinkSpecColumn").value==''){
			alert("请指定栏目来源！");
			return false;
		}
		var rows=ef.get("result2-0-columnLinkDisplayRows").value;
	    var cols=ef.get("result2-0-columnLinkDisplayCols").value; 
		
		eiInfo.set("unitStyleId",ef.get("result2-0-unitStyleId").value);
		eiInfo.set("result2",0,"columnLinkContentSourceMod",ef.get("result2-0-columnLinkContentSourceMod").value);
		eiInfo.set("result2",0,"columnLinkSpecColumn",ef.get("result2-0-columnLinkSpecColumn").value);
		eiInfo.set("result2",0,"columnLinkDisplayRows",rows);
		eiInfo.set("result2",0,"columnLinkDisplayCols",cols);
		eiInfo.set("result2",0,"columnLinkDisplayWords",ef.get("result2-0-columnLinkDisplayWords").value);
		eiInfo.set("result2",0,"columnLinkPrefixString",ef.get("result2-0-columnLinkPrefixString").value);
		eiInfo.set("result2",0,"columnLinkPostfixString",ef.get("result2-0-columnLinkPostfixString").value);
		
		var prefix = ef.get("result2-0-columnLinkPrefixString").value;
		var postfix = ef.get("result2-0-columnLinkPostfixString").value;
		if(prefix.replace(/[^\x00-\xff]/g,"aa").length>50){
			alert("栏目前缀不能超过50个字符！");
			return;
		}
		if(postfix.replace(/[^\x00-\xff]/g,"aa").length>50){
			alert("栏目后缀不能超过50个字符！");
			return;
		}
	    if(check(rows,cols)){
		    EiCommunicator.send( "ECTM1002", "updateColLink" , eiInfo, null );
		    parent.opener.location.href = parent.opener.location.href;
		    parent.window.close();;
	    }
	}
}

//隐藏显示栏目前后缀编辑框
function openColumnPrefixSufix(){
   var divDis = ef.get("columnPrefixSuffix").style.display;
   if(divDis == "none"){
   	   ef.get("columnPrefixSuffix").style.display = '';
   }else {
      ef.get("columnPrefixSuffix").style.display = "none";
   }
}