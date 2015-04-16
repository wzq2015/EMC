efform_onload = function ()
{
}
/*分页初始化数据*/
var urls=new Array();
var starts=new Array();
var ends=new Array();
var titles=new Array();
var substrs=new Array();
var i=0;
var formatstr="<table><tr><td nowap height='20' width=1>_START_</td><td><a class=\'linkstyle\' href=\'_LINK_\' target=\'_blank\'>_TITLE_</a></td><td nowap width=1>_END_</TD></TR></TABLE>";
var pagecount= 20;
var totalpage = 0;
var LastPage="<div align=\'center\' style=\'padding-top:3px;cursor:hand;width:70px;border:#CCCCCC 1px solid;height:20px;\'>上一页</div>";
var NextPage="<div align=\'center\' style=\'padding-top:3px;cursor:hand;width:70px;border:#CCCCCC 1px solid;height:20px;\'>下一页</div>";



//日历控件的操作
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}


/*静态单元保存按钮*/
function search() 
{	
	//清空数据
	i=0;
	totalpage=0;
	urls=new Array();
	starts=new Array();
	ends=new Array();
	titles=new Array();
	substrs=new Array();
	
	var info = new EiInfo();
	info.set("articleTitle",ef.get("inqu_status-0-articleTitle").value);
	info.set("author",ef.get("inqu_status-0-author").value);
	info.set("articleAbstract",ef.get("inqu_status-0-articleAbstract").value);
	info.set("source",ef.get("inqu_status-0-source").value);
	info.set("keyWords",ef.get("inqu_status-0-keyWords").value);
	info.set("siteId",ef.get("inqu_status-0-siteId").value);
	info.set("displayTimeStart",ef.get("inqu_status-0-displayTimeStart").value);
	info.set("displayTimeEnd",ef.get("inqu_status-0-displayTimeEnd").value);
	
	EiCommunicator.send( "ECTM13", "search" , info, null );
	if(ajaxEi!=null){
		var titlearry = ajaxEi.get("titlelist");
		var linkarry = ajaxEi.get("linklist");
		if(titlearry.length>0){
			for(var j=0;j<titlearry.length;j++){
				urls[i]=linkarry[j];
				titles[i]=titlearry[j];
				starts[i]="-";
				ends[i]="";
				i++;
			}
			document.getElementById("searchresult").innerHTML='<table width="100%"><tr valign="top"><td height=483 id="newslist"></td></tr><tr><td width="100%" id="pagelist" align="center"  class="rowspace"></td></tr></table>';
			showNews(0);
		}else{
			document.getElementById("searchresult").innerHTML='<table width="100%"><tr><td width=100% height=100 align=center valign=center>糟糕！没有查询到相关信息！</td></tr></table>';
		}
	}
}

/*选择框动态加载*/
var ajax_getCountryOfContinent_callback = {
  onSuccess : 
    function(eiInfo){  
      clearSelectCountry();
      var eiBlock = eiInfo.getBlock("site");
      var objOption = new Option("",""); 
      ef.get("inqu_status-0-siteId").options[ef.get("inqu_status-0-siteId").options.length]=objOption;
      for(i=0;i<eiBlock.getRows().length;i++){
         strName = eiBlock.getCell(i,"siteName");
         strValue = eiBlock.getCell(i,"siteId");
         var objOption = new Option(strName,strValue); 
         ef.get("inqu_status-0-siteId").options[ef.get("inqu_status-0-siteId").options.length]=objOption;
        }
    },
  onFail    : 
    function(eMsg) {
    }
}

/*分页操作js*/
function ReplaceString(s,OldPattern,NewPattern){ 	
	var i;
	var s2 = s;
	var len = OldPattern.length;
	while(s2.indexOf(OldPattern)>0){ 
	  i = s2.indexOf(OldPattern);s2 = s2.substring(0, i) + NewPattern + s2.substring(i + len, s2.length);
	}
	return s2;
}
function chgpage(nowpage){
	showNews(nowpage);
}
function showNews(start_num){
	totalpage = Math.ceil(i/pagecount)
	start_num = parseInt(start_num);
	var j=0;
	var end_num=0;
	var newshtml="";
	var pagehtml="";
	var str="";
	end_num = ((start_num+pagecount)>i) ? (i-1) : (start_num+pagecount-1);
	for(j=start_num;j<=end_num;j++)	{
		str=formatstr;
		str=ReplaceString(str,"_LINK_",urls[j]);
		str=ReplaceString(str,"_TITLE_",titles[j]);
		str=ReplaceString(str,"_START_",starts[j]);
		str=ReplaceString(str,"_END_",ends[j]);
		str=ReplaceString(str,"_SUB_",substrs[j]);
		newshtml=newshtml+str;
	}
	newshtml = "<table width=\'100%\'>"+newshtml+"</table>";
	document.getElementById("newslist").innerHTML = newshtml;
	newshtml = null;
	var currpage = start_num/pagecount+1;
	pagehtml = "<table border=0 width=\'100%\'><tr><td align=right width=\'30%\'><div align=\'center\'  style=\'padding-top:3px;width:100px; border-color:#CCCCCC; border-width:1px; border-style:solid;height:20px;background-color:#FFFF99;\'>共"+i+"条 "+currpage+" / "+totalpage+"</div></td>";
	if (currpage>1){
		pagehtml += "<td width=\'5%\'><a class=\'linkstyle\' href=\'###\' onclick=\'javascript:showNews(0)\' class=pager><div align=\'center\'  style=\'padding-top:3px;width:70px;cursor:hand;border:#CCCCCC 1px solid;height:20px;\'>首页</div></a></td>";
	}
	if(start_num>0)pagehtml+="<td width=\'5%\'><a class=\'linkstyle\' href=\'###\' onclick=\'javascript:showNews(" + (start_num - pagecount) + ")\' class=pager>"+LastPage+"</a></td>";
	if(end_num<starts.length-1)pagehtml+="<td width=\'5%\'><a class=\'linkstyle\' href=\'###\' onclick=\'javascript:showNews(" + (start_num + pagecount) + ")\' class=pager>"+ NextPage+"</a></td>";
	if (currpage<totalpage){
		pagehtml += "<td width=\'5%\'><a class=\'linkstyle\' href=\'###\'  onclick=\'javascript:showNews("+((totalpage-1)*pagecount)+")\' class=pager><div align=\'center\'  style=\'width:70px;cursor:hand;border:#CCCCCC 1px solid;padding-top:3px;height:20px;\'>尾页</div></a></td>";
	}
	pagehtml+="<td width=\'25%\'><select onchange=chgpage(this.value) class=pager>";
	for (var k=1; k<=totalpage; k++){
		var thisnum = ((k-1)*pagecount);
		pagehtml+="<option value="+thisnum;
		pagehtml+=(start_num==thisnum)?" selected" : " ";
		pagehtml+=">"+k+"</option>";
	}pagehtml+="</select></td></tr></table>";
	document.getElementById("pagelist").innerHTML=pagehtml;pagehtml = null;
}

