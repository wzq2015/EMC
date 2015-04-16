<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib uri="/WEB-INF/framework/tlds/EF-2.0.tld" prefix="EF"%>

<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>

<%
  com.baosight.iplat4j.ef.ui.template.tree.TreeTemplate template = com.baosight.iplat4j.ef.ui.template.tree.TreeTemplateUtils.newTreeTemplate();
  com.baosight.iplat4j.ef.ui.template.tree.TreeTemplateNode china = template.addTopNode("China", "中国");
  com.baosight.iplat4j.ef.ui.template.tree.TreeTemplateLeaf JS = china.addSubLeaf("JS", "江苏");
  JS.setProperty( "check", "true");
  com.baosight.iplat4j.ef.ui.template.tree.TreeTemplateLeaf SH = china.addSubLeaf("SH", "上海");
  SH.setProperty( "radio", "true");
  request.setAttribute( "worldMap", template );
%>

<html>
<head>
  <title>Welcome to iPlat4j</title>
  <link href="<%= request.getContextPath()%>/framework/css/style.css" rel="stylesheet" type="text/css">

	<script class="javascript" src="./EF/SyntaxHighlighter/shCore.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushJScript.js"></script>
	<script class="javascript" src="./EF/SyntaxHighlighter/shBrushXmlOrJsp.js"></script>
	<link type="text/css" rel="stylesheet" href="./EF/SyntaxHighlighter/SyntaxHighlighter.css"></link>
	  <script type="text/javascript">
  	efform_onload = function(){
		efregion.show("ef_region_codeDemo");
		efregion.toggleShow("ef_region_codeDemo");
	}
  </script>
</head>
<body>


    <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>
  <h3>该示例演示了树组件的以下特性</h3>
  <i> - 使用模板定义树结构, 及多个模板的合并; 其中支持下面的模板定义方式:</i><br>
  <ul>
      <li>JSP文件中直接定义模板
      <li>保存在服务器端(pageContext, request, session, application)的模板
      <li>基于ePass的模板树定义的模板
  </ul>

	<i> - 定义树节点项点击时的行为</i>
	<br/>
  <i> - 为树节点增加选择框,并取得树节点选择框的状态</i>

	<p>


  <script>
	    function checkStatus()
	    {
	      _selectedItems = tree.getChecked();
	      for( var i=0; i<_selectedItems.length;i++ ){
	        alert( _selectedItems[i] );
	      }
	    }


	    function treeNodeInitializer(node){
	      if (node.leaf()) {
           node.type( new radioItemType(true) );
          }
          node.textClicked = function(){ alert(node.label()+ ":" + node.text() ); };
          node._jTreeNodeDIV.title = node.label()+" "+node.text();
          		node.addMenuItem("", {
					label : "add",
					parent : "",
					text : "新增",
					leaf : "1",
					func : function(id, label) {
						//此处添加事件
						alert("新增id：" + id +" label:" + label);
					}
				});
		  node.addMenuItem("", {
					label : "remove",
					parent : "",
					text : "删除",
					leaf : "1",
					//此处添加事件
					func : function(id, label) {
						alert("新增id：" + id +" label:" + label);
					}
				});
	    }

	    function configTree(tree){
	      tree.nodeInitializer = treeNodeInitializer;
	      tree.emptyNodeAsLeaf = true;
	      tree.initialExpandDepth = 3;
	    }
    </script>
  <input type="button" value="Checkbox" onclick="checkStatus()"/>

  <EF:EFTreeModel id="tModel">
	  <EF:EFTemplate id="NewsSite">
		    <EF:EFNode label="Search" text="新闻网站">
		      <EF:EFProperty name="check" value="true"/>
				  <EF:EFLeaf label="SINA" text="新浪" url="http://www.sina.com">
				    <EF:EFProperty name="check" value="true"/>
				  </EF:EFLeaf>
				  <EF:EFLeaf label="GOOGLE" text="谷歌" url="http://www.google.com" >
				    <EF:EFProperty name="check" value="false"/>
				  </EF:EFLeaf>
		    </EF:EFNode>
		</EF:EFTemplate>
		<EF:EFTemplate ref="worldMap"/>
  </EF:EFTreeModel>

  <EF:EFTree model="tModel" id="tree" text="静态树" configFunc="configTree">
  </EF:EFTree>
<!-- 代码展示  -->
<div id = "ef_region_codeDemo" title="示例代码">
<div id="ef_tab_h"  lastRange="99%" eftabType="efRoundDivTab">
	<div id="jsp" title="JSP 源代码" >
	<textarea  name="codeh" class="html">
 &lt;h3&gt;该示例演示了树组件的以下特性&lt;/h3&gt;
  &lt;i&gt; - 使用模板定义树结构, 及多个模板的合并; 其中支持下面的模板定义方式:&lt;/i&gt;&lt;br&gt;
  &lt;ul&gt;
      &lt;li&gt;JSP文件中直接定义模板
      &lt;li&gt;保存在服务器端(pageContext, request, session, application)的模板
      &lt;li&gt;基于ePass的模板树定义的模板
  &lt;/ul&gt;
	&lt;i&gt; - 定义树节点项点击时的行为&lt;/i&gt;
	&lt;br/&gt;
  &lt;i&gt; - 为树节点增加选择框,并取得树节点选择框的状态&lt;/i&gt;
	&lt;p&gt;
  &lt;script&gt;
	    function checkStatus()
	    {
	      _selectedItems = tree.getChecked();
	      for( var i=0; i&lt;_selectedItems.length;i++ ){
	        alert( _selectedItems[i] );
	      }
	    }
	    function treeNodeInitializer(node){
	      if (node.leaf()) {
           node.type( new radioItemType(true) );
          }
          node.textClicked = function(){ alert(node.label()+ ":" + node.text() ); };
          //支持右键菜单
          node.addMenuItem("", {
					label : "add",
					parent : "",
					text : "新增",
					leaf : "1",
					func : function(id, label) {
						//此处添加事件
						alert("新增id：" + id +" label:" + label);
					}
				});
		  node.addMenuItem("", {
					label : "remove",
					parent : "",
					text : "删除",
					leaf : "1",
					//此处添加事件
					func : function(id, label) {
						alert("新增id：" + id +" label:" + label);
					}
				});
	    }

	    function configTree(tree){
	      tree.nodeInitializer = treeNodeInitializer;
	      tree.emptyNodeAsLeaf = true;
	    }
    &lt;/script&gt;
  &lt;input type="button" value="Checkbox" onclick="checkStatus()"/&gt;

  &lt;EF:EFTreeModel id="tModel"&gt;
	  &lt;EF:EFTemplate id="NewsSite"&gt;
		    &lt;EF:EFNode label="Search" text="新闻网站"&gt;
		      &lt;EF:EFProperty name="check" value="true"/&gt;
				  &lt;EF:EFLeaf label="SINA" text="新浪" url="http://www.sina.com"&gt;
				    &lt;EF:EFProperty name="check" value="true"/&gt;
				  &lt;/EF:EFLeaf&gt;
				  &lt;EF:EFLeaf label="GOOGLE" text="谷歌" url="http://www.google.com" &gt;
				    &lt;EF:EFProperty name="check" value="false"/&gt;
				  &lt;/EF:EFLeaf&gt;
		    &lt;/EF:EFNode&gt;
		&lt;/EF:EFTemplate&gt;
		&lt;EF:EFTemplate ref="worldMap"/&gt;
  &lt;/EF:EFTreeModel&gt;

  &lt;EF:EFTree model="tModel" id="tree" text="静态树" configFunc="configTree"&gt;
  &lt;/EF:EFTree&gt;
	</textarea>
</div>
<div id="javascript" title="Javasript 源代码" >
	<textarea name="codeh" class="javascript">

	function checkStatus()
    {
      _selectedItems = tree.getChecked();
      for( var i=0; i<_selectedItems.length;i++ ){
        alert( _selectedItems[i] );
      }
    }


    function treeNodeInitializer(node){
      if (node.leaf()) {
          node.type( new radioItemType(true) );
         }
         node.textClicked = function(){ alert(node.label()+ ":" + node.text() ); };
         node._jTreeNodeDIV.title = node.label()+" "+node.text();	//设置树节点的悬浮提示框内容。(toolTip)
    }

    function configTree(tree){
      tree.nodeInitializer = treeNodeInitializer;
      tree.emptyNodeAsLeaf = true;
      tree.initialExpandDepth = 2;	//设置树初始加载时展开的深度。
    }
	</textarea>
 </div>
<EF:EFTab tabId="h" action="fundivh"/>
<script type="text/javascript">
	dp.SyntaxHighlighter.HighlightAll('codeh');
</script>
</div>
<script type="text/javascript">
var tab  = ef.get("jquery_tab_div_content");
tab.style.height = "";
var tab1 = ef.get("jsp");
tab1.style.display = "block";
tab1.style.height = "";
tab1.style.width = "100%";
var tab2 = ef.get("javascript");
tab2.style.height = "";
tab2.style.width = "100%";
</script>
</body>
</html>
