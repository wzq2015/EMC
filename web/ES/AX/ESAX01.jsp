<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<script type="text/javascript" src="./EF/jQuery/jquery-1.7.js"></script>
<script type="text/javascript" src="./EF/iplat-ui-control.js"></script>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>


<c:set var="attr" value="${ei.attr}" />
<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
<head>
<script type="text/javascript">
EFWizardPath	= "./EF/Tree/";

function wizard() {
  this._title = "[WIZARD TITLE]";
  this._page = "";
  this._props = {};	
}

wizard.prototype.getType = function(){
  return "wizard";
}

wizard.prototype.title = function(v){
  if (v === undefined) { return this._title;	}
  this._title = v;
}

wizard.prototype.page = function(v){
  if (v === undefined) { return this._page;	}
  this._page = v;
}

wizard.prototype.prop = function(v){
  if (v === undefined) { return this._props;	}
  this._props = v;
}


wizard.prototype.render = function(){
  //alert( "render" );
  var _jFrame = $("<iframe/>");    
  _jFrame.css({ "margin":"0", "padding":"0", "background-color":"transparent", "background-image":"none","height":"550px" ,'overflow':'visible'});

  _jFrame.attr("src", './ES/AX/fckdialog.html');
  _jFrame.attr("frameBorder", "0");
  _jFrame.attr("allowTransparency", "true");
  _jFrame.attr({"width":"100%", "height":"100%"});

  
  var domN = _jFrame.get(0);
  domN.wizard = this;
  return domN;
}

 function onLoad(){	
	   //alert( "wizard1" ); 
	   var wizardA = new wizard();
	   
	   wizardA.title("权限数据导入导出向导");
	   var start = "<%=contextpath%>" + "/ES/AX/_opt_imex.jsp";
	   wizardA.page( start );
	   //alert( "wizard2" );
	   $("#p").get(0).appendChild( wizardA.render() );   
	   //alert( "wizard3" ); 
 };    

</script>

</head>

<body onload="onLoad()">

<form id="exportForm" name="exportForm" method="POST" action="<%=listUrl%>">
<div id="p" style="width:100%,height:100%"></div>
</form>

</body>
</html>
