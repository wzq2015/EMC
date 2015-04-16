/*
 * FCKeditor - The text editor for Internet - http://www.fckeditor.net
 * Copyright (C) 2003-2009 Frederico Caldeira Knabben
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 * This is a Image plugin definition file.
 */

//三个多行文本输入域  
var textAreaArr = new Array("DataFCKeditor" , "DataFCKeditorArticlePrefix" , "DataFCKeditorArticleSuffix");

//定义图片按钮
var imageItem = new FCKToolbarButton('Image', FCKLang.ImageBtn);

//设置按钮的图标路径
imageItem.IconPath = FCKPlugins.Items['imageUpload'].Path + 'image.gif';
//注册按钮项
FCKToolbarItems.RegisterItem('Image', imageItem);


// ##### Defining a custom context menu entry.

var FCKImage = new Object();

FCKImage = function(name){
    this.Name = name;
}


FCKImage.prototype.GetState = function() {
    
    return FCK_TRISTATE_OFF;
}
FCKImage.prototype.Execute = function(){
 	 ImageDo();
}


function ImageDo(){
   //--------------------------------
   var oEditor = FCK ;//'DataFCKeditor'
  
   var context=oEditor.Config["Context"];
   var type='1';
   var page =context+"/DispatchAction.do?efFormEname=ECDMTT&type="+type;
   var html = FCKShowDialog( page,window,1000,600);
   
   var pInputObj =  parent.document.getElementById("inqu_status-0-articleFileIds");
   if(pInputObj != null){
  	 //给文章编辑页面的 记录从FCK上传图片的隐藏域 赋值
  	 var fckImgIds = parent.document.getElementById("inqu_status-0-articleFileIds").value;
     //取出已经被赋的值 加上 当前添加的图片id 加上分隔符
     parent.document.getElementById("inqu_status-0-articleFileIds").value =  fckImgIds += html + ",";
   }
    
        
   if (html) {
	   insertHtml(html,type);
   }

}


function FCKShowDialog(pagePath, args, width, height)
{	
	return showModalDialog(pagePath, args, "dialogWidth:" + width + "px;dialogHeight:" + height + "px;help:no;scroll:no;status:no");
}



function insertHtml(html,type)
{
	html = absolutePath(html,type);//-----------------
	
	//-------------------------------------
	var oEditor = FCK ;//'DataFCKeditor'

	oEditor.InsertHtml(html);
}



function absolutePath(html,type)
{ 
  //---------------------------------------
  var oEditor = FCK ;//'DataFCKeditor'
 
  var ip=oEditor.Config["Ip"];
  var port=oEditor.Config["Port"];
  var context=oEditor.Config["Context"];
  if(type=='1'){
  /*
   html=oEditor.Config["UploadDir"]+html;
   html="<img src='http://"+ip+":"+port+context+"/EC/DM/ECDM0104.jsp?filePath="+html+"'>";
  // html="<img src='./EC/DM/ECDM0104.jsp?filePath="+html+"'>";
  */
    html="<img src='EC/DM/ECDM0104.jsp?fileId="+html+"'>";
  }else  if(type=='0'){
   index=html.indexOf("@");
   if(index!=-1){
   name=html.substring(0,index);
   fileId=html.substring(index+1);
   /*
   path=oEditor.Config["UploadDir"]+path;
   path="http://"+ip+":"+port+context+"/EC/DM/ECDM0104.jsp?filePath="+path;
  //path="./EC/DM/ECDM0104.jsp?filePath="+path
   html="<a href='"+path+"'>"+name;
   */
   html="<a href='EC/DM/ECDM0104.jsp?fileId="+fileId+"'>"+name+"</a>";
   }
  }
	return html

}


FCKCommands.RegisterCommand('Image', new FCKImage('Image'));
