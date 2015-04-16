var editor1,editor2,editor3;
document.write("<script language=javascript src='EU/ueditor/editor_all.js'></script>");
//----------------------标题链接RichClientEditorStart------------------------------------
 //封装FCK的三个DIV对象   
//var divFckArrTitle = new Array("FCKeditorTitlePrefix" , "FCKeditorTitleSuffix" , "FCKeditorTitleMoreDispStyle");
//三个多行文本输入域  
//var textAreaArrTitle = new Array("DataFCKeditorTitlePrefix" , "DataFCKeditorTitleSuffix" , "DataFCKeditorTitleMoreDispStyle");
//表单提交参数标识名   
var submitDataArrTitle = new Array("titleLinkPrefixString" , "titleLinkPostfixString" , "titleLinkMoreString");

var eiInfo;
efform_onload = function ()
{
	//标题链接
	eiInfo=_getEi();
	if(ef.get("result3-0-titleLinkDisplayRows").value=='' || ef.get("result3-0-titleLinkDisplayRows").value==0)
		ef.get("result3-0-titleLinkDisplayRows").value = 20;
	if(ef.get("result3-0-titleLinkDisplayCols").value=='' || ef.get("result3-0-titleLinkDisplayCols").value==0)
		ef.get("result3-0-titleLinkDisplayCols").value = 1;
	if(ef.get("result3-0-titleLinkDisplayWords").value=='' || ef.get("result3-0-titleLinkDisplayWords").value==0)
		ef.get("result3-0-titleLinkDisplayWords").value = 20;
	if(ef.get("result3-0-titleLinkPageDisplayNum").value=='' || ef.get("result3-0-titleLinkPageDisplayNum").value==0)
		ef.get("result3-0-titleLinkPageDisplayNum").value = 20;
	if(ef.get("result3-0-titleLinkPrefixEffectDays").value=='' || ef.get("result3-0-titleLinkPrefixEffectDays").value==0 )
		ef.get("result3-0-titleLinkPrefixEffectDays").value = 10;
	if(ef.get("result3-0-titleLinkPostfixEffectDays").value=='' || ef.get("result3-0-titleLinkPostfixEffectDays").value==0)
		ef.get("result3-0-titleLinkPostfixEffectDays").value = 10;

	//是否包含下级
	if(ef.get("result3-0-titleLinkIsIncludeUnder").value!='0'){
		ef.get('result3-0-isIncludeUnder').checked=true;
		formatIsIncludeUnder(ef.get('result3-0-isIncludeUnder'));
	}
	//是否分页
	if(ef.get("result3-0-titleLinkIsPage").value=='1'){
		ef.get('result3-0-isPage').checked=true;
		formatIsPage(ef.get('result3-0-isPage'));
	}
	//分组显示下级栏目
	if(ef.get("result3-0-titleLinkIsShowUnder").value=='1'){
		ef.get('result3-0-isShowUnder').checked=true;
		formatIsShowUnder(ef.get('result3-0-isShowUnder'));
	}
		
     //标题链接单选框
     var prefixHd = ef.get("result3-0-userTitlePrefixHd").value;
     ////var prefixHd = eiInfo.getBlock("result"+parent.unitTypeSize).getCell(0,"userTitlePrefix");
     if(prefixHd != "" || prefixHd != null){
	     var prefixObj = document.getElementsByName("userTitlePrefix");
	     for(var i=0;i<prefixObj.length;i++){
	        var pv = prefixObj[i].value;
	       if(prefixHd == pv){
	         prefixObj[i].checked = "checked";
	       }
	     }
     }
     
     var suffixHd = ef.get("result3-0-userTitleSuffixHd").value;
     if(suffixHd != "" || suffixHd != null){
         var suffixObj = document.getElementsByName("userTitleSuffix");
         for(var i=0;i<suffixObj.length;i++){
            var sv = suffixObj[i].value;
            if(suffixHd == sv){
                 suffixObj[i].checked = "checked";
            }
         }
     }
     
   //创建UEDITOR编辑器
 	editor1 = new baidu.editor.ui.Editor(); 
 	editor1.render("myEditor1"); 
 	editor2 = new baidu.editor.ui.Editor(); 
 	editor2.render("myEditor2"); 
 	editor3 = new baidu.editor.ui.Editor(); 
 	editor3.render("myEditor3"); 
 	//取编辑器源值
 	var value1=eiInfo.getBlock('result3').getCell('0',"titleLinkPrefixString");
    var value2=eiInfo.getBlock('result3').getCell('0',"titleLinkPostfixString");
    var value3=eiInfo.getBlock('result3').getCell('0',"titleLinkMoreString");
    value1 = value1==null?"":value1;//避免NULL值导致UEDITOR赋值异常
    value2 = value2==null?"":value2;//避免NULL值导致UEDITOR赋值异常
    value3 = value3==null?"":value3;//避免NULL值导致UEDITOR赋值异常
    //隐藏域赋值 
    ef.get('result3-0-titleLinkPrefixString').value=value1;
    ef.get('result3-0-titleLinkPostfixString').value=value2;
    ef.get('result3-0-titleLinkMoreString').value=value3;
    //UEDITOR编辑器赋值
    editor1.setContent(value1);
    editor2.setContent(value2);
    editor3.setContent(value3);
  /*
   for(var i=0;i<divFckArrTitle.length;i++){
   		var value=eiInfo.getBlock('result3').getCell('0',submitDataArrTitle[i]);
   		ef.get('result3-0-'+submitDataArrTitle[i]).value=value;
   		
   		showDialog("insert",3,divFckArrTitle[i],textAreaArrTitle[i],submitDataArrTitle[i]);
   }*/
	onselect_source(2,ef.get("result3-0-titleLinkContentSourceMode").value);
   setStyle();
   hiddenElementById("ef_form_head");
}

/*标题链接保存按钮*/
button_update3_onclick = function () 
{
	if(!styleJudge("3")){
		return;
	}
	
 	/*------------------------保存fck数据
	
     for(var i=0;i<divFckArrTitle.length;i++){
  	   	 editorToContent(3,textAreaArrTitle[i],submitDataArrTitle[i]);
  	 }*/
	ef.get("result3-0-titleLinkPrefixString").value = editor1.getContent();
	ef.get("result3-0-titleLinkPostfixString").value = editor2.getContent();
	ef.get("result3-0-titleLinkMoreString").value = editor3.getContent();
	
	if(efvalidateDiv("ef_region_result3")){
		if(ef.get("result3-0-titleLinkContentSourceMode").value<=1 && ef.get("result3-0-titleLinkSpecColumn").value==''){
			alert("请指定栏目来源！");
			return false;
		}
		
		var rows=ef.get("result3-0-titleLinkDisplayRows").value;
	    var cols=ef.get("result3-0-titleLinkDisplayCols").value; 
	    
		eiInfo.set("unitStyleId",ef.get("result3-0-unitStyleId").value);
		
		eiInfo.set("result3",0,"titleLinkContentSourceMode",ef.get("result3-0-titleLinkContentSourceMode").value);
		eiInfo.set("result3",0,"titleLinkSpecColumn",ef.get("result3-0-titleLinkSpecColumn").value);
		eiInfo.set("result3",0,"titleLinkDisplayRows",rows);
		eiInfo.set("result3",0,"titleLinkDisplayCols",cols);
		eiInfo.set("result3",0,"titleLinkDisplayWords",ef.get("result3-0-titleLinkDisplayWords").value);
		eiInfo.set("result3",0,"titleLinkPageDisplayNum",ef.get("result3-0-titleLinkPageDisplayNum").value);
		eiInfo.set("result3",0,"titleLinkPrefixString",ef.get("result3-0-titleLinkPrefixString").value);
		eiInfo.set("result3",0,"titleLinkPrefixEffectDays",ef.get("result3-0-titleLinkPrefixEffectDays").value);
		eiInfo.set("result3",0,"titleLinkPostfixString",ef.get("result3-0-titleLinkPostfixString").value);
		eiInfo.set("result3",0,"titleLinkPostfixEffectDays",ef.get("result3-0-titleLinkPostfixEffectDays").value);

		eiInfo.set("result3",0,"titleLinkMoreString",ef.get("result3-0-titleLinkMoreString").value);
		eiInfo.set("result3",0,"titleLinkIsIncludeUnder",ef.get("result3-0-titleLinkIsIncludeUnder").value);
		eiInfo.set("result3",0,"titleLinkIsPage",ef.get("result3-0-titleLinkIsPage").value);
		eiInfo.set("result3",0,"titleLinkIsShowUnder",ef.get("result3-0-titleLinkIsShowUnder").value);
		eiInfo.set("result3",0,"titleLinkAccessRule",ef.get("result3-0-titleLinkAccessRule").value);	
         var preObj = document.getElementsByName("userTitlePrefix");
         for(var i=0;i<preObj.length;i++){
         	if(preObj[i].checked)
				eiInfo.set("userTitlePrefix",preObj[i].value);
        }
          var suffixObj = document.getElementsByName("userTitleSuffix");
         for(var i=0;i<suffixObj.length;i++){
         	if(suffixObj[i].checked)
				eiInfo.set("userTitleSuffix",suffixObj[i].value);
        }
        		
	    if(check(rows,cols)){
		    EiCommunicator.send( "ECTM1003", "updateTitleLink" , eiInfo, null );
		    parent.opener.location.href = parent.opener.location.href;
		    parent.window.close();
	    }
	}
}

function openTemplatePrefixSufix(){
  var divDisplayV = ef.get("templdatePrefixSuffix").style.display;
  if(divDisplayV == "none"){
      ef.get("templdatePrefixSuffix").style.display = '';
  }else{
  	ef.get("templdatePrefixSuffix").style.display = "none";
  }
}


//是否包含下级
function formatIsIncludeUnder(obj){
	if(obj.checked)
		document.getElementById("result3-0-titleLinkIsIncludeUnder").value = "1";
	else
		document.getElementById("result3-0-titleLinkIsIncludeUnder").value = "0";
}

//是否分页
function formatIsPage(obj){
	if(obj.checked){//显示"每页行数", 隐藏"列数"属性, 隐藏"分级显示下级栏目"
		document.getElementById("result3-0-titleLinkIsPage").value = "1";
		document.getElementById("titleLink_PageDisplayNum").style.display='';
		document.getElementById("titleLink_DisplayCols").style.display='none';
		document.getElementById("titleLink_IsShowUnder").style.display='none';
		if((document.getElementById("result3-0-titleLinkDisplayCols").value>0))
			document.getElementById("result3-0-titleLinkDisplayCols").value = 1;
	}else{
		document.getElementById("result3-0-titleLinkIsPage").value = "0";
		document.getElementById("titleLink_PageDisplayNum").style.display='none';
		document.getElementById("titleLink_DisplayCols").style.display='';
		document.getElementById("titleLink_IsShowUnder").style.display='';
	}
}

//分组显示下级栏目
function formatIsShowUnder(obj){
	if(obj.checked){// 隐藏"列数"属性, 隐藏"是否分页"
		document.getElementById("result3-0-titleLinkIsShowUnder").value = "1";
		document.getElementById("titleLink_DisplayCols").style.display='none';
		document.getElementById("titleLink_IsPage").style.display='none';
		if((document.getElementById("result3-0-titleLinkDisplayCols").value>0))
			document.getElementById("result3-0-titleLinkDisplayCols").value = 1;
	}else{
		document.getElementById("result3-0-titleLinkIsShowUnder").value = "0";
		document.getElementById("titleLink_DisplayCols").style.display='';
		document.getElementById("titleLink_IsPage").style.display='';
	}
}