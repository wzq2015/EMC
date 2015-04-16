<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ taglib prefix="EFNew" uri="/WEB-INF/framework/tlds/EFNew.tld" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<c:set var="r" value="${ei.blocks.r}"/>

<html>
<EFNew:EFHead>
	<EFNew:EFScript src="./EE/DM/EEDM01.js"/>
</EFNew:EFHead>
<body>
<EFNew:EFForm formId="EE5010">

<%
	String path1 = request.getContextPath() + "/DispatchAction.do?efFormEname=EDFA00";
	String path2 = request.getContextPath() + "/DispatchAction.do?efFormEname=EDFA01";
	String path3 = request.getContextPath() + "/DispatchAction.do?efFormEname=EDPI10";
	
%>
<EFNew:EFLayout>
    <EFNew:EFTab tabId="ef_tab_y" lastRange="98.5%" eftabWidth="100%" action="fun">
       <EFNew:EFTabItem title="页面信息管理" eftabSrc="<%=path1 %>" eftabHeight="500px" efRemember = "yes"></EFNew:EFTabItem>
       <EFNew:EFTabItem title="按钮信息管理" eftabSrc="<%=path2 %>" eftabHeight="500px" efRemember = "no"></EFNew:EFTabItem>
       <EFNew:EFTabItem title="菜单信息管理" eftabSrc="<%=path3 %>" eftabHeight="600px" ></EFNew:EFTabItem>
    </EFNew:EFTab>


    <EFNew:EFTab tabId="ef_tab_x" lastRange="99%" eftabWidth="100%" action="fundiv">
       <EFNew:EFTabItem id="org" title="圆角DIV使用"  eftabHeight="100px" >
       <br>
       </EFNew:EFTabItem>
       <EFNew:EFTabItem id="frame" title="圆角Iframe使用"  eftabHeight="200px" eftabSrc="">
             圆角tab使用时需指定eftabType为：efRoundIframeTab，默认为圆角TAB<br>
            efRoundIframechange_option(tab_id,index,action)该方法可用操作tab跳转，<br>
           tab_id为该tab的id，index为跳转到的tab标签页的序列号，action为跳转时执行的javascript函数<br>
       </EFNew:EFTabItem>
     </EFNew:EFTab>



</EFNew:EFLayout>

<script type="text/javascript">
efRoundIframechange_option("ef_tab_y",2,fun);
function fun(currentIndex,index){
//	alert("helo")
	return true;
}

function fundiv(currentIndex,index){
//	alert((209).toString(16)+(214).toString(16)+(240).toString(16));
//	alert("he");
	return true; 
} 
efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}
</script>




</EFNew:EFForm>
</body>
</html>   
