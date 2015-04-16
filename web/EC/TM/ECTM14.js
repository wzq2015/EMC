/*
点击搜索按钮后触发新的搜索，按搜索框内搜索词搜索第一页
*/
function search(a){
	
	//var pageNum = "1";
	var siteId = ef.get("inqu_status-0-siteId").value;
	var columnId = ef.get("inqu_status-0-columnId").value;
	var keyWord = ef.get("inqu_status-0-keyWord").value;
	var searchUnitStyleId = ef.get("inqu_status-0-searchUnitStyleId").value;
	var articleTitle = ef.get("inqu_status-0-articleTitle").value;
	var author = ef.get("inqu_status-0-author").value;
	var articleAbstract = ef.get("inqu_status-0-articleAbstract").value;
	var articleContent = ef.get("inqu_status-0-articleContent").value;
	location.href='DispatchAction.do?efFormEname=ECTM14&serviceName=ECTM14&methodName=search'
	+'&p=1'
	+'&siteId='+siteId
	+'&columnId='+columnId
	+'&st='+searchUnitStyleId
	+'&keyWord='+encodeURI(keyWord)
	+'&articleTitle='+encodeURI(articleTitle)
	+'&author='+encodeURI(author)
	+'&articleAbstract='+encodeURI(articleAbstract)
	+'&articleContent='+encodeURI(articleContent)
	;
	
}

/*
点击页面跳转后触发当前搜索的继续搜索，搜索词不变，页号改变
*/
function numberSelect(a){
	var pageNum = a;
	var siteId = ef.get("inqu_status-0-siteId").value;
	var columnId = ef.get("inqu_status-0-columnId").value;
	var keyWord = ef.get("inqu_status-0-keyWord").value;
	var searchUnitStyleId = ef.get("inqu_status-0-searchUnitStyleId").value;
	var articleTitle = ef.get("inqu_status-0-articleTitle").value;
	var author = ef.get("inqu_status-0-author").value;
	var articleAbstract = ef.get("inqu_status-0-articleAbstract").value;
	var articleContent = ef.get("inqu_status-0-articleContent").value;
	location.href='DispatchAction.do?efFormEname=ECTM14&serviceName=ECTM14&methodName=search'
	+'&siteId='+siteId
	+'&columnId='+columnId
	+'&st='+searchUnitStyleId
	+'&keyWord='+encodeURI(keyWord)
	+'&p='+pageNum
	+'&articleTitle='+encodeURI(articleTitle)
	+'&author='+encodeURI(author)
	+'&articleAbstract='+encodeURI(articleAbstract)
	+'&articleContent='+encodeURI(articleContent)
	;
}

//当回车按下时
function keypress(form0)
{
	if(event.keyCode==13)	//回车,*
	{
		search();
	}
}

//当鼠标到某个分页数上的时候
function getMouseOver(pageNumId){
	ef.get(pageNumId).style.backgroundColor= "#DBDBDF";
}
//当鼠标离开某个分页数上的时候
function getMouseOut(pageNumId){
	ef.get(pageNumId).style.backgroundColor= "";
}