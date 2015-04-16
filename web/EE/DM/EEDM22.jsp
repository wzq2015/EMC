<!DOCTYPE html>

<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page import="java.util.*" %>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<c:set var="r" value="${ei.blocks.r}"/>
<link href="EF/Images/tab.css" rel="stylesheet" type="text/css" />
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;
	charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
	<script type="text/javascript">
	efform_onload = function(){
		//efregion.show("ef_region_codeDemo");
		//efregion.toggleShow("ef_region_codeDemo");
	}
	</script>
</head>
<body class="bodyBackground">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<style>
a{
	font-size:12px;				/* 文字大小 */
}
</style>
<br>
<br>
<a> 1、TAB演示：隐藏、显示tab演示</a>
<input type="button" id="hideTab" value="隐藏">
<input type="button" id="showTab" value="显示">
<br>
<br>
<div id="ef_tab_y"  lastRange="99%"  eftabType="efRoundDivTab"   >
		<div id="test_1" title="起重机待送信息查询" >
		<a> 起重机待送信息查询</a>
		<br>
		<a>输入</a>
		<input type="text" />
		</div>
		<div id="test_2" title="测试页面2"  >
		<a>测试页面2</a>
		<br>
		<a>输入</a>
		<input type="text" />
		</div>
		<div id="test_3" title="测试页面3"  >
		<a>测试页面3</a>
		<br>
		<a>输入</a>
		<input type="text" />
			<div id="ef_tab_yy"  lastRange="99%" eftabWidth="100%" eftabType="efRoundDivTab" >
			<div id="test_11" title="起重机待送信息查询1" >
			<a> 起重机待送信息查询1</a>
			<br>
			<a>输入</a>
			<input type="text" />
			</div>
			<div id="test_21" title="测试页面21"  >
			<a>测试页面21</a>
			<br>
			<a>输入</a>
			<input type="text" />
			</div>
			<div id="test_31" title="测试页面31"  >
			<a>测试页面31</a>
			<br>
			<a>输入</a>
			<input type="text" />
			</div>
			</div>
		</div>
		<div id="test_4" title="测试页面4" >
		<a> 测试页面4</a>
		<br>
		<a>输入</a>
		<input type="text" />
		</div>
		<div id="test_5" title="测试页面5"  >
		<a>测试页面5</a>
		<br>
		<a>输入</a>
		<input type="text" />
		</div>
		<div id="test_6" title="测试页面6"  >
		<a>测试页面6</a>
		<br>
		<a>输入</a>
		<input type="text" />
		</div>
		<div id="test_7" title="测试页面7" >
		<a> 测试页面7</a>
		<br>
		<a>输入</a>
		<input type="text" />
		</div>
		<div id="test_8" title="测试页面8"  >
		<a>测试页面8</a>
		<br>
		<a>输入</a>
		<input type="text" />
		</div>
		<div id="test_9" title="测试页面9"  >
		<a>测试页面9</a>
		<br>
		<a>输入</a>
		<input type="text" />
		</div>
				<div id="test_10" title="测试页面10" >
		<a> 测试页面10</a>
		<br>
		<a>输入</a>
		<input type="text" />
		</div>
		<div id="test_11" title="测试页面11"  >
		<a>测试页面11</a>
		<br>
		<a>输入</a>
		<input type="text" />
		</div>
		<div id="test_12" title="测试页面12"  >
		<a>测试页面12</a>
		<br>
		<a>输入</a>
		<input type="text" />
		</div>
 </div>
 <br>
 <br>
 <br>
<a> 2、TAB演示：导航、新增、删除tab演示</a>
<input type="button" id="addTabH" value="增加(删除)">
<input type="button" id="addTabN" value="增加(不可删)">
<br>
<div id="tab_list" >	</div>

	<script type="text/javascript">
    eftab.show("ef_tab_y");
    eftab.show("ef_tab_yy");
    $('#hideTab').click(function(){
		eftab_hidden("ef_tab_y",2);
	});
	$('#showTab').click(function(){
		eftab_show("ef_tab_y",2);
		efRoundDivTabChange_option("ef_tab_y",2);
	});

	var i=1;
	var o=$("#tab_list").Tab({items:[
	 {id:'tab_1',title:'工作台',closed:false,icon:'',html:'<a>工作台</a>',load:'',callback:function(){}},
	 {id:'tab_2',title:'系统设置',closed:true,icon:'',html:'<a>系统设置</a>',load:'',callback:function(){}},
	 {id:'tab_3',title:'对账单',closed:true,icon:'',html:'<a>银行对账单</a>',load:'',callback:function(){}},
	 {id:'tab_4',title:'基本信息',closed:true,icon:'',html:'<a>公司员工基本信息</a>',load:'',callback:function(){}},
	 {id:'tab_5',title:'工作台',closed:false,icon:'',html:'<a>工作台</a>',load:'',callback:function(){alert("点击tab5sheet！")}},
	 {id:'tab_6',title:'银行',closed:true,icon:'',html:'<a>银行对账单</a>',load:'',callback:function(){}}
	],
	width:$("#tab_list").width(),
	height:100,
	tabcontentWidth:$("#tab_list").width(),
	tabScroll:false,
	tabWidth:100,
	tabHeight:35,
	tabScrollWidth:10,
	tabClassDiv:'benma_ui_tab',
	tabClass:'benma_ui_tab',
	tabClassClose:'tab_close',
	tabClassOn:'tab_item',
	tabClassInner:'tab_item',
	tabClassInnerLeft:'tab_item1',
	tabClassInnerMiddle:'tab_item2',
	tabClassInnerRight:'tab_item3',
	tabClassText:'text',
	tabClassScrollLeft:'scroll-left',
	tabClassScrollRight:'scroll-right',
    tabWidthSame: true
	});
   $('#addTabH').click(function(){
		o.newTab({id:'tabn_'+i,title:'新增'+i,closed:true,icon:'',html:'<a>新增'+i+'输入</a><br><input type="text" />',load:'',callback:function(){}});
		i= i+1;
	});
   $('#addTabN').click(function(){
		o.newTab({id:'tabn_'+i,title:'新增'+i,closed:false,icon:'',html:'<a>新增'+i+'输入</a><br><input type="text" />',load:'',callback:function(){}});
		i= i+1;
	});
	</script>

<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>
