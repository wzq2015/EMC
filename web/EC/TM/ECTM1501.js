
//载入页面时执行
window.onload=function(){
  var btn=document.getElementById("advancedSearch");
  btn.onclick=advancedSearch;
}

//高级搜索
function advancedSearch() 
{	
	var siteId = document.getElementById("siteId").value;
	var columnId = document.getElementById("columnId").value;
	var articleTitle = document.getElementById("articleTitle").value;
	var author = document.getElementById("author").value;
	var articleAbstract = document.getElementById("articleAbstract").value;
	var articleContent = document.getElementById("articleContent").value;
	if(articleTitle.trim().length==0 && author.trim().length==0 && articleAbstract.trim().length==0 && articleContent.trim().length==0){
		alert("请输入查询条件！");
		return;
	}else{
		EiCommunicator.send( "ECTM15", "getTemplateInfo" , new EiInfo(), null );
		if(ajaxEi!=null){
			templateTypeId=ajaxEi.get("templateTypeId");
			templateFilename=ajaxEi.get("templateFilename");
			templateDefId=ajaxEi.get("templateDefId");
			insId=ajaxEi.get("templateInsId");
			
		    var params={"articleTitle":encodeURI(articleTitle)};
	        articleTitle=jQuery.param(params);
	        
	        params={"author":encodeURI(author)};
	        author=jQuery.param(params);
	        
	        params={"articleAbstract":encodeURI(articleAbstract)};
	        articleAbstract=jQuery.param(params);
	        
	        params={"articleContent":encodeURI(articleContent)};
	        articleContent=jQuery.param(params);
	        
			var childWindow=window.open("EC/File/module/" + templateTypeId +"/" + templateFilename + "?tempDefId="+templateDefId+"&tempInsId="+insId+"&nodeId=0000000099999999&nodeType=s&imagespath=/EC/File/module/" + templateTypeId +"/images&siteId="+siteId+"&columnId="+columnId+"&"+articleTitle+"&"+author+"&"+articleAbstract+"&"+articleContent,"模板设置","top=0,left=0,menubar=no,width="+screen.width+",height="+screen.availHeight+",scrollbars=yes,resizable=yes");
		    childWindow.focus();
		}
	}
}