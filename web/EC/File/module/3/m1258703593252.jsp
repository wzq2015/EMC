<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="http://www.baosight.com/ec" prefix="template"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>系统默认文章显示页模板</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
table {
}
-->
</style>
<link href="<%=request.getContextPath()+request.getParameter("imagespath")%>/css.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.STYLE12 {color: #0C56B1}
-->
</style>
</head>

<body>
<table width="970" height="124" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#59A4FF">
  <tr>
    <td width="971" height="124" align="center" valign="center" style="font-size:36px; font-weight:bolder">系统默认文章显示页模板</td>
  </tr>
</table>
<table width="970" height="36" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#59A4FF">
  <tr>
    <td width="970" height="36" align="left" valign="middle"><table width="100%" height="36" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td width="2%">&nbsp;</td>
        <td width="96%" align="center" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td height="8"></td>
          </tr>
        </table>
              <table width="96%" height="28" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100%" align="center" valign="middle"><template:union id="2" name="首页标题链接2"></template:union></td>
            </tr>
          </table></td>
        <td width="2%">&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>
<table width="970" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td bgcolor="#E9F6FA" height="1"></td>
  </tr>
</table>
<table width="970" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td bgcolor="#FF9601" height="3"></td>
  </tr>
</table>
<table width="970" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td width="19" align="left" valign="middle"></td>
    <td width="960" align="left" valign="middle"><template:union id="3" name="当前位置"></template:union></td>
  </tr>
  <tr>
    <td height="8" colspan="2"></td>
  </tr>
</table>
<table width="970" height="504" border="0" align="center" cellpadding="0" cellspacing="0" class="test14">
  <tr>
    <td height="30" colspan="2" align="center" valign="top" class="test18">
	<template:union id="4" name="文章正文"></template:union>
	</td>
  </tr>
</table>
<table width="976" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="4"></td>
  </tr>
</table>
<table width="970" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td bgcolor="#2578C8" height="6"></td>
  </tr>
</table>
<table width="970" height="74" border="0" cellpadding="0" cellspacing="0" class="" align="center">
  <tr>
    <td align="center" valign="middle"><template:union id="11" name="首页版权11"></template:union></td>
  </tr>
</table>

</body>
</html>
