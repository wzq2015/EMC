//判断样式是否为为空若空则提示
function styleJudge(size){
	if(ef.get("result"+size+"-0-unitStyleId").value==0){
			alert("样式不能为空，请新增并选择样式!");
			return false;
	}else 
		return true;	
}

 //模式窗口取指定站点栏目号
 function openPan(type)
{
    /*var url="./EC/TM/ECTM11.jsp";
    //打开模式窗口，注意模式窗口的样式
    var mydata=showModalDialog(url,null,"dialogWidth:300px;dialogHeight:400px;center:yes;help:No;status:no;resizable:Yes;edge:sunken");
    if(mydata)
     alert("您输入的值为：" +mydata.value);*/
     var childWindow = efform.openNewForm('ECTM11', "methodName=initLoad&type="+type);
     childWindow.focus();
}

//设置样式下拉框
function setStyle()
{
	var unitTypeSize=parent.unitTypeSize;
  	obj = document.getElementById("result"+unitTypeSize+"-0-unitStyleId"); 
  	if(obj!=null)
  	{
	  	for(i=obj.options.length-1 ; i>= 0 ; i--)
	    	obj.options[i] = null;
  	}
	var eiBlock = eiInfo.getBlock("result"+unitTypeSize+"1");
	for(i=0;i<eiBlock.getRows().length;i++){
 		styleName = eiBlock.getCell(i,"styleName");
 		styleId = eiBlock.getCell(i,"styleId");
 		var objOption = new Option(styleName,styleId); 
 		ef.get("result"+unitTypeSize+"-0-unitStyleId").options[ef.get("result"+unitTypeSize+"-0-unitStyleId").options.length]=objOption;
	}
	var resultBlock=eiInfo.getBlock("result"+unitTypeSize);
	if(resultBlock!=null)
	{
		value=resultBlock.getCell(0,"unitStyleId");
		if((value!=null) && (value!="") && (value!=" "))
			ef.get("result"+unitTypeSize+"-0-unitStyleId").value=value;
	}
}

function check(rows,cols)
{
/*   delete by maoly 20121225  翻页时将所有数据都查询出来缓存在页面上，遂不做超过1000的校验
   if(rows*cols>1000){
       alert("行数和列数之乘积不能大于1000!");
       return false;
   }
   */
   return true;
}


function onselect_source(type,value){
	if(type==1&&value<=2)
		document.getElementById('colsource'+type).style.display='';
	else if(type==1&&value>2)
		document.getElementById('colsource'+type).style.display='none';
	if(type==2&&value<=1)
		document.getElementById('colsource'+type).style.display='';
	else if(type==2&&value>1)
		document.getElementById('colsource'+type).style.display='none';
	if (type==3&&value<=1){
		document.getElementById('colsource'+type).style.display='';
	} else if (type==3&&value>1){
		document.getElementById('colsource'+type).style.display='none';
	}
}

function CreateEditor(textAreaId,articleContent){
	document.getElementById(textAreaId).value=articleContent;
    var oFCKeditor = new FCKeditor(textAreaId) ;
	oFCKeditor.BasePath = './EF/Fckeditor/' ;
	oFCKeditor.ToolbarSet='MyToolbar';
	oFCKeditor.Width = '670' ;
	oFCKeditor.Height = '350' ;
	oFCKeditor.ReplaceTextarea();
}

//显示FCK控件
  /*
   *  divfck 包含fck编辑框的div
   *  tarea 多行输入域
   *  subdata 提交数据到服务器端的参数标志名称
   */
function showDialog(flag,blockId,divfck,tarea,subdata){

    var oEditor ;
	if ( typeof( FCKeditorAPI ) != 'undefined' ){
		 oEditor = FCKeditorAPI.GetInstance(tarea) ;//DataFCKeditor
	 }
	var articleContent= ef.get("result"+ blockId +"-0-" +  subdata ).value;//articleContent
	var eFCKeditorDiv	= document.getElementById( divfck ) ;	//FCKeditor

	if (!oEditor )
	{
	    //创建FCK控件
	    if(flag=="")
	    	CreateEditor(tarea,articleContent)
	    else    	
			CreateEditor2(flag,blockId,tarea,subdata) ;
	}
	else
	{	
		oEditor.SetData(articleContent ) ;
	}
	eFCKeditorDiv.style.display = '' ;
	if ( oEditor && !document.all )
	{
		if ( oEditor.EditMode == FCK_EDITMODE_WYSIWYG )
			oEditor.MakeEditable() ;
	}

   
}
//创建FCK控件
function CreateEditor2(flag,blockId,tarea,subdata){
    //DataFCKeditor
    document.getElementById( tarea ).value = ef.get("result"+ blockId +"-0-"  + subdata ).value ;//'result-0-articleContent'
    var oFCKeditor = new FCKeditor( tarea ) ;//DataFCKeditor
	oFCKeditor.BasePath = './EF/Fckeditor/' ;
	if(flag=='true'||flag=='insert') {
		oFCKeditor.ToolbarSet='MyToolbar';
	}else{
	   oFCKeditor.ToolbarSet='ReadOnly';
	 }
	   switch(subdata){
		  case 'columnLinkPrefixString': 
		        oFCKeditor.Width = '700' ;
		        oFCKeditor.Height = '200' ;
		        break;
		        oFCKeditor.Width = '700' ;
		        oFCKeditor.Height = '200' ;
		        break;
	    case 'columnLinkPostfixString':
	            oFCKeditor.Width = '700' ;
		        oFCKeditor.Height = '200' ;
		        break;
		  
		 default:
                oFCKeditor.Width = '700' ;
		        oFCKeditor.Height = '200' ;		   
	 }
	oFCKeditor.ReplaceTextarea();
	
}
/*将FCK控件的内容保存到隐藏的内容框中
function editorToContent(blockId,tarea,subdata){
   var oEditor;
   if ( typeof( FCKeditorAPI ) != 'undefined' ) {
		oEditor = FCKeditorAPI.GetInstance( tarea  ) ;//DataFCKeditor
	 }
	if(oEditor)
    	ef.get("result"+ blockId +"-0-" + subdata ).value = oEditor.GetXHTML() ;//'result-0-articleContent'
}*/

//将UEDITOR控件的内容保存到隐藏域中
function editorToContent(blockId,ueditorObj,subdata){
	ef.get("result"+ blockId +"-0-" + subdata ).value = ueditorObj.getContent();//'result-0-articleContent'
}


//隐藏页面Id所指的Element
function hiddenElementById(Id)
{
	var head=document.getElementById( Id );
	if(head!=null)
		head.style.display='none';
}

function FCKeditor_OnComplete( editorInstance ){ 
   editorInstance.Config["Context"]=parent.document.getElementById("context").value;
   editorInstance.Config["Ip"]=parent.document.getElementById("Ip").value;
   editorInstance.Config["Port"]=parent.document.getElementById("port").value;
 } 