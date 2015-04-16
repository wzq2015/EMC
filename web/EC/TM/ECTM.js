function turnPage(pageNum,contextPath,templateUnitInsId){		
	var nodeId = document.getElementById('nodeId').value;			
	var nodeType = document.getElementById('nodeType').value;			
	var inInfo = new EiInfo();			
	inInfo.setByNode(templateUnitInsId);		
	inInfo.set('templateUnitInsId',templateUnitInsId);		
	inInfo.set('nodeId',nodeId);	
	inInfo.set('nodeType',nodeType);	
	inInfo.set('currentPage',pageNum);	
	CONTEXT_PATH =contextPath;
	EiCommunicator.send('ECTM02', 'turnPage', inInfo,null,false,false);
	if (ajaxEi != null){
		var sb = ajaxEi.get("pageString");
		var div_node = document.getElementById(templateUnitInsId);
		div_node.innerHTML = sb;
	}
 }
 
 /*
 * 用于搜索结果翻页
 */
 function trunToPage(pageNum) 
{	
	var oldHref = window.location.href;
	var temp = oldHref.split("&")[0];
	window.location.href = temp+"&pageNum="+pageNum;
}

//IE中getElementsByName获取无效，只能增加方法
var getElementsByName = function(tag, name){
    var returns = document.getElementsByName(name);
    if(returns.length > 0) return returns;
    returns = new Array();
    var e = document.getElementsByTagName(tag);
    for(var i = 0; i < e.length; i++){
        if(e[i].getAttribute("name") == name){
            returns[returns.length] = e[i];
        }
    }
    return returns;
}
//显示指定页
displayPage = function(pages){
    for(var i = 0; i < getElementsByName("div","page").length; i++){
       getElementsByName("div","page")[i].style.display="none";
    }
    getElementsByName("div","page")[pages].style.display="";
    
    for(var i = 0; i < getElementsByName("span","spanId").length; i++){
       getElementsByName("span","spanId")[i].innerHTML="<a href='javascript:displayPage("+i+")'>"+(i+1)+"</a>";
    }
       getElementsByName("span","spanId")[pages].innerHTML="<div class='active'>"+(pages+1)+"</div>";
}

//*************图片新闻相关 开始*******************
var newsNum = 0;//4; 
var nn = 1; 

function pp_portal_selectPicNew(o) { 
for(var i=1; i<=newsNum; i++) { 
var newsId = "id_portal_imgNew" + i; 

if(o==i) { // 被选中 
document.getElementById(newsId).style.display="block"; 
document.getElementById("id_portal_navLink"+i).style.background="red"; 
//add by maoly
//document.getElementById(i).style.display="block"; 
document.getElementById("test"+i).style.display="block"; 

} else { 
document.getElementById(newsId).style.display="none"; 
document.getElementById("id_portal_navLink"+i).style.background="#333"; 
//add by maoly
//document.getElementById(i).style.display="none";
document.getElementById("test"+i).style.display="none";
} 
} 
nn=o; 
} 

// 自动选择图片新闻 
function pp_portal_changePicNew() 
{ 
if(nn>newsNum) nn=1 
pp_portal_selectPicNew(nn); 
nn++; 
} 

function pp_portal_picNew_auto() { 
	pp_portal_picNew_autoTask = setInterval('pp_portal_changePicNew()', 3000); 
} 
//*************图片新闻相关  结束***************

/*-----------------------*/
/**
 * 静态翻页方法@liminhui  直接“上一页”“下一页”
 * @param pageNum
 * 
 * 
 */
function findPage(pageNum){		
	/*var nodeId = document.getElementById('nodeId').value;			
	var nodeType = document.getElementById('nodeType').value;	*/
	//总页数
	var totalPageNum = document.getElementById('totalPageNum').value;
	//当前页
	var nowPageNum = document.getElementById('nowPageNum').value;	
	nowPageNum=parseInt(nowPageNum)+parseInt(pageNum);
	if(nowPageNum<1)
		nowPageNum=1;
	if(nowPageNum>totalPageNum)
		nowPageNum=totalPageNum;
	if(pageNum==0)
		nowPageNum=1;
	
	for (var i=1; i<=totalPageNum; i++)
	{
		if(i==nowPageNum)
		{

			document.getElementById("pageNumRows_"+i).style.display="";
		}else{
		   document.getElementById("pageNumRows_"+i).style.display="none";
		}
	}
	document.getElementById('nowPageNum').value=nowPageNum;
	document.getElementById('currentPage').innerHTML=nowPageNum;
	  var sel = document.getElementById("select_Cole_Page");
	  for (var i = 0; i < sel.length; i++) { 
		  if (sel[i].value == nowPageNum) { 
			 sel[i].selected = true;               
		  }            
 
	  }
	
 }
 
/**
 * 静态跳转页面方法@liminhui  下拉
 * @param pageNum
 */
function select_Page(pageNum){	
	//总页数
	var totalPageNum = document.getElementById('totalPageNum').value;
	//当前页
	var nowPageNum = document.getElementById('nowPageNum').value;	
	for (var i=1; i<=totalPageNum; i++)
	{
		if(i==pageNum)
		{
			document.getElementById("pageNumRows_"+i).style.display="";
		}else{
			document.getElementById("pageNumRows_"+i).style.display="none";
		}
	}
	document.getElementById('nowPageNum').value=pageNum;
	document.getElementById('currentPage').innerHTML=pageNum;
	
}
