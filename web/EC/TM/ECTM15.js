efform_onload = function ()
{
	
   ef.get("searchEntry").innerHTML=ef.get("searchEntryHtml").value;
   var searchNode=$("#searchEntry   [id='search']");
   var advancedSearchNode=$("#searchEntry   [id='advancedSearch']");
   var keyword=decodeURI(ef.get("keyWord").value);
   var keyWordNode=$("#searchEntry   input[id='inqu_status-0-keyWord']");
   if(!!keyWordNode.get(0)){

      keyWordNode.get(0).value=keyword;

   }
    for(var i=0;i<searchNode.length;i++)
         searchNode.get(i).onclick=search;
    for(var i=0;i<advancedSearchNode.length;i++)
         advancedSearchNode.get(i).onclick=advancedSearch;
    
}

/*高级搜索*/
function advancedSearch() 
{	
	var siteId = ef.get("inqu_status-0-siteId").value;
	var columnId = ef.get("inqu_status-0-columnId").value;
	var childWindow = efform.openNewForm('ECTM1501', "serviceName=ECTM1501&methodName=initLoad&siteId="+siteId+"&columnId="+columnId);
    childWindow.focus();
}


/*搜索请求*/
function search() 
{	
	var siteId = ef.get("inqu_status-0-siteId").value;
	var columnId = ef.get("inqu_status-0-columnId").value;
	var keyWord = ef.get("inqu_status-0-keyWord").value;
	var filepath = "EC/File/module/"
    EiCommunicator.send( "ECTM15", "getTemplateInfo" , new EiInfo(), null );
	if(ajaxEi!=null){
		templateTypeId=ajaxEi.get("templateTypeId");
		templateFilename=ajaxEi.get("templateFilename");
		templateDefId=ajaxEi.get("templateDefId");
		insId=ajaxEi.get("templateInsId");
	    var params={"keyWord":encodeURI(keyWord)};
        var keyWord=jQuery.param(params);
		var childWindow=window.open(filepath + templateTypeId +"/" + templateFilename + "?tempDefId="+templateDefId+"&tempInsId="+insId+"&nodeId=0000000099999999&nodeType=s&imagespath=/"+filepath + templateTypeId +"/images&siteId="+siteId+"&columnId="+columnId+"&"+keyWord,"模板设置","top=0,left=0,menubar=no,width="+screen.width+",height="+screen.availHeight+",scrollbars=yes,resizable=yes");
	    childWindow.focus();
	}

}

//当回车按下时
function keypress(form0)
{
	if(event.keyCode==13)	//回车,*
	{
		search();
		
	}
}

