<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.core.ei.EiInfo,
								java.util.*,
								com.baosight.iplat4j.ec.tm.service.ServiceECTM14"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	EiInfo info = (EiInfo)request.getAttribute("ei");
	String keyWord = info.getCellStr("inqu_status",0,"keyWord");
	String pageNum = info.getCellStr("inqu_status",0,"pageNum");
	String columnId = info.getCellStr("inqu_status",0,"columnId");
	String siteId = info.getCellStr("inqu_status",0,"siteId");
	String serchUnitStyleId = info.getCellStr("inqu_status",0,"searchUnitStyleId");
	String articleTitle = info.getCellStr("inqu_status",0,"articleTitle");
	String author = info.getCellStr("inqu_status",0,"author");
	String articleAbstract = info.getCellStr("inqu_status",0,"articleAbstract");
	String articleContent = info.getCellStr("inqu_status",0,"articleContent");
	//keyWord = new String(keyWord.getBytes("ISO8859_1"),"UTF-8");
	//articleTitle = new String(articleTitle.getBytes("ISO8859_1"),"UTF-8");
	//articleAbstract = new String(articleAbstract.getBytes("ISO8859_1"),"UTF-8");
	//author = new String(author.getBytes("ISO8859_1"),"UTF-8");
	//articleContent = new String(articleContent.getBytes("ISO8859_1"),"UTF-8");
	
	ServiceECTM14 ectm14 = new ServiceECTM14();
	Map searchMap = new HashMap();
	searchMap.put("siteId", siteId);
    searchMap.put("columnId", columnId);
    searchMap.put("keyWord", keyWord);
    searchMap.put("articleTitle", articleTitle);
    searchMap.put("author", author);
    searchMap.put("articleAbstract", articleAbstract);
    searchMap.put("articleContent", articleContent);
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>搜索单元</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EC/TM/ECTM14.js"></script>
	<style>
	A.linkstyle:link {
		FONT-SIZE: 12px; COLOR: #444444; FONT-FAMILY: "Verdana"; TEXT-DECORATION: none;
	}
	A.linkstyle:visited {
		FONT-SIZE: 12px; COLOR: #444444; FONT-FAMILY: "Verdana"; TEXT-DECORATION: none;
	}
	A.linkstyle:hover {
		FONT-SIZE: 12px; COLOR:#777777; FONT-FAMILY: "Verdana"; TEXT-DECORATION: underline;
	}
	</style>
</head>
<body class="" onkeydown="keypress(this);">

<form id="ECTM14" method="POST" action="<%=actionUrl%>" onsubmit=" return false;">



<div id = "ef_region_all" title="" efRegionShowClear=false>
	<div id="ef_region_main">
        <table id="mainFrameTable" width="750" align=center  height="82%" cellpadding=1 cellspacing=0 >
		  <tr>
			<td id="rightContent" width=100% vAlign="middle" >
			    <EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden"/>
				<EF:EFInput blockId="inqu_status" ename="siteId" row="0" type="hidden"/>
				<EF:EFInput blockId="inqu_status" ename="searchUnitStyleId" row="0" type="hidden"/>
				<EF:EFInput blockId="inqu_status" ename="keyWord" row="0" type="hidden"/>
				<EF:EFInput blockId="inqu_status" ename="searchUnitStyleId" row="0" type="hidden"/>
				
				<EF:EFInput blockId="inqu_status" ename="articleTitle" row="0" type="hidden"/>
				<EF:EFInput blockId="inqu_status" ename="author" row="0" type="hidden"/>
				<EF:EFInput blockId="inqu_status" ename="articleAbstract" row="0" type="hidden"/>
				<EF:EFInput blockId="inqu_status" ename="articleContent" row="0" type="hidden"/>
			  <div style='width:100%;border:#ffffff 1px solid;display:;'>
			  	<div valign=center style='width:100%;height:26px;border:#bbbbbb 1px solid;padding-left:5px;padding-top:6px;background-color:#eeeeee;'>
			  		<table> 
			  			<tr >
			  				<td style="width:68%;font-size:14px;">搜索结果</td>
			  				<td id="sTd" style="width:32%;font-size: 12px;"></td>
			  			</tr>
			  		</table>
			  		</div>
			  	<div id='searchresult' name='搜索结果区域' style='width:100%;height:420;border:#bbbbbb 1px solid;padding-left:5px;'>
			  	<%ectm14.searchResult(pageContext, pageNum, searchMap,serchUnitStyleId);%>
			  	</div>
              </div>
            </td>
    	  </tr>
        </table>
	</div>
</div>  
<script>
	var obj = document.getElementById("sHidden");
	if(obj!=null){
		document.getElementById("sTd").innerHTML = obj.value; 
	}
	
</script>
<EF:EFRegion/>

</form>
</body>
</html>   
