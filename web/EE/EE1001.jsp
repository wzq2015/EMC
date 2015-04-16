<!DOCTYPE html>
<%@page pageEncoding="UTF-8" language="Java" contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<html>
<HEAD>
<TITLE>Test</TITLE>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>

<script language='javascript'>
function setSelectedValue()
{
	var node = efTreeHandler.selected;
	if( node && (window.returnValue.value != node.label) )
	{
		window.document.getElementById( "current_selected" ).innerText = node.label + "/" + node.text;
    	window.returnValue["value"] = node.label;	
    	window.returnValue["label"] = node.text;	
    }
}

function getMenuIcon(node)
{
  	if ( node.isLeaf ) return "EF/Images/eftree_cu.gif";
}

window.returnValue = new Object();
window.setInterval(setSelectedValue, 500);
</script>
</HEAD>

<BODY class="containerFooter">
<div>
<TABLE cellspacing='0' cellpadding='1' >
<tr>
	<td width="100%" align='left' nowrap>
		当前值：<font color="blue"><span id="current_selected">N/A</span></font>
	</td>
</tr>
<tr>
	<td width="100%" valign="top">
		 <EF:EFTree id="tree" text="测试菜单" iconGetter="getMenuIcon" openIconGetter="getMenuIcon" action="#">
         	<EF:EFTemplate ref="navigator" />    	  
         </EF:EFTree>     
    </td> 
</tr>

</table>  
</div>
</BODY>
</html>
