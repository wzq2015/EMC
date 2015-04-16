<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String fileName = request.getParameter("EEDMFILENAME");
	String path1 = request.getContextPath() + "/DispatchAction.do?efFormEname=" + fileName;
	String path2 = request.getContextPath() + "/DispatchAction.do?efFormEname=EEDM0001&EEDMFILEPATH=/EE/DM/"+fileName+ ".jsp";
%>


<EF:EFPage>
<EF:EFHead >
</EF:EFHead>

<body class="bodyBackground" scroll="yes">

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<EF:EFTab tabId="x" lastRange="98.5%" eftabWidth="100%">
     <EF:EFTabItem  title="页面功能" eftabSrc="<%=path1 %>" eftabHeight="550px" efRemember="yes"></EF:EFTabItem>
     <EF:EFTabItem title="代码展示" eftabSrc="<%=path2 %>" eftabHeight="550px" efRemember="yes"></EF:EFTabItem>
</EF:EFTab>
</body>
</EF:EFPage>
<script type="text/javascript">
//jquery自动调节非代码显示tab页的iframe高度
//代码显示页面如自动调节则会没有高度
$(function(){  
	$('#ef_tab_0 iframe').load(function() {
		//var iframeId = $(this).attr("id");
		//获取iframe内容高度并赋予iframe上
		var iframeHeight = $(this).contents().find("body").height();
		$(this).height(iframeHeight);
		//设置最小高度400像素
        $(this).height( iframeHeight < 400 ? 400 : iframeHeight );  


        //点击iframe内容时，重新获取内容高度，赋予iframe上
        this.contentWindow.document.onclick = function () {
        	var iframeHeight = $('#ef_tab_0 iframe').contents().find("body").height();
        	$('#ef_tab_0 iframe').height(iframeHeight);
        	$('#ef_tab_0 iframe').height( iframeHeight < 400 ? 400 : iframeHeight );
        };
		});
	
	
	   });

</script>