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
 * This is a Attach plugin definition file.
 */

// Here we define our custom Style combo, with custom widths.


//定义附件按钮
var attachItem = new FCKToolbarButton('Attach', FCKLang.AttachBtn);

//设置按钮的图标路径
attachItem.IconPath = FCKPlugins.Items['attachUpload'].Path + 'attachfile.gif';
//注册按钮项
FCKToolbarItems.RegisterItem('Attach', attachItem);


// ##### Defining a custom context menu entry.

// ## 1. Define the command to be executed when selecting the context menu item.
var FCKImage = new Object();

FCKImage = function(name){
    this.Name = name;
}


FCKImage.prototype.GetState = function() {
    
    return FCK_TRISTATE_OFF;
}
FCKImage.prototype.Execute = function(){
	AttachDo();
}


function AttachDo(){
  //var oEditor = FCKeditorAPI.GetInstance('DataFCKeditor') ;
	var oEditor = FCK ;
   var context=oEditor.Config["Context"];
   var page =context+"/DispatchAction.do?efFormEname=ECDMTT&type=0";
   var html = FCKShowDialog( page,window,1000,600);
   
  //------------------------------------------ 改造代码 获得当前文章关联的附件id 
   if(html!=null){
    var attNum = html.indexOf("@");
    if(attNum != -1){
       var attStr = html.substring(attNum+1);
        //给文章编辑页面的 记录从FCK上传附件的隐藏域 赋值
         if(!!parent.document.getElementById("inqu_status-0-articleFileIds")){
	    var attIds = parent.document.getElementById("inqu_status-0-articleFileIds").value;
	    //取出已经被赋的值 加上 当前添加的附件id 加上分隔符
	  
	    parent.document.getElementById("inqu_status-0-articleFileIds").value =  attIds += attStr + ",";
         }
    }
 //---------------------------------------------
    
   if (html) insertHtml(html,'0');
   }

}
FCKCommands.RegisterCommand('Attach', new FCKImage('Attach'));
