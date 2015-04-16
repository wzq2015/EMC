/**
 * Generate time : 2012-08-16 13:25:35
 */

/**
 * 点击查询按钮
 */
//全局变量 
var EL00_subWindow;
//不能隐藏 label 和position
var hiddenColums = ["seqId","context1","context2","context3","context4","context5","information"];
//设置的展开头部
var expandIndex ="label";
//设置的不同的样式
var trClassNormal = "tableRow0";
var trClassHover = "tableRow1";
var trColorError ="red";
var trColorErrorHover = "brown";
var fontColorError = "white";

//var exI = 0;

//缓存的详细信息
var details4TreeTable ={};

var jobContext = {};
jobContext["0000"]=["项目名称","URL","session标识","线程号","客户端IP"];
jobContext["0001"]=["N/A","N/A","N/A","N/A","N/A"];
jobContext["0002"]=["项目名称","任务名称","触发器名称","服务端IP","线程号"];
jobContext["0003"]=["项目名称","任务名称","服务端IP","线程号","N/A"];
jobContext["0100"]=["页面号","服务端IP","登录用户","N/A","N/A"];
jobContext["0101"]=["服务名","方法名","登录用户","N/A","N/A"];
jobContext["0102"]=["功能号","调用方名称","调用方","调用开始时间","调用地址"];
jobContext["0200"]=["服务名","方法名","N/A","N/A","N/A"];
jobContext["0201"]=["服务名","方法名","N/A","N/A","N/A"];
jobContext["0300"]=["用户","登录方式","客户端IP","客户端信息","客户端OS"];
jobContext["0301"]=["用户","session标识","N/A","N/A","N/A"];
jobContext["0400"]=["用户","页面号","结果","N/A","N/A"];
jobContext["0401"]=["用户","页面号","按钮列表","结果","N/A"];
jobContext["0402"]=["用户","服务名","方法名","结果","N/A"];
jobContext["0500"]=["语句名","N/A","N/A","N/A","N/A"];
jobContext["0501"]=["语句名","N/A","N/A","N/A","N/A"];
jobContext["0502"]=["语句名","N/A","N/A","N/A","N/A"];
jobContext["0503"]=["语句名","offset","limit","N/A","N/A"];
jobContext["0504"]=["执行类型","offset","limit","N/A","N/A"];
jobContext["0600"]=["页面号","JSP路径","N/A","N/A","N/A"];
jobContext["0700"]=["事务传播行为","事务隔离级别","数据源名","事务名","N/A"];
jobContext["0701"]=["事务传播行为","事务隔离级别","N/A","N/A","N/A"];
jobContext["0702"]=["事务传播行为","事务隔离级别","N/A","N/A","N/A"];
jobContext["1000"]=["操作用户","用户","N/A","N/A","N/A"];
jobContext["1001"]=["操作用户","用户","N/A","N/A","N/A"];
jobContext["1002"]=["操作用户","用户","N/A","N/A","N/A"];
jobContext["1003"]=["操作用户","用户","N/A","N/A","N/A"];
jobContext["1004"]=["操作用户","用户","N/A","N/A","N/A"];
jobContext["1005"]=["操作用户","用户","N/A","N/A","N/A"];
jobContext["1006"]=["操作用户","用户","N/A","N/A","N/A"];
jobContext["1007"]=["操作用户","父机构","机构","N/A","N/A"];
jobContext["1008"]=["操作用户","父机构","机构","N/A","N/A"];
jobContext["1009"]=["操作用户","角色类型","N/A","N/A","N/A"];
jobContext["1010"]=["操作用户","角色类型","N/A","N/A","N/A"];
jobContext["1011"]=["操作用户","授权机构","角色类型","N/A","N/A"];
jobContext["1012"]=["操作用户","授权机构","角色类型","N/A","N/A"];
jobContext["1013"]=["操作用户","角色","用户","N/A","N/A"];
jobContext["1014"]=["操作用户","角色","用户","N/A","N/A"];
jobContext["1100"]=["操作用户","页面","角色","类型","N/A"];
jobContext["1101"]=["操作用户","页面","角色","类型","N/A"];
jobContext["1102"]=["操作用户","按钮","角色","类型","N/A"];
jobContext["1103"]=["操作用户","按钮","角色","类型","N/A"];
jobContext["1104"]=["操作用户","资源","资源类型","角色","类型"];
jobContext["1105"]=["操作用户","资源","资源类型","角色","类型"];
jobContext["1200"]=["操作用户","授权机构","HR机构","N/A","N/A"];
jobContext["1201"]=["操作用户","授权机构","HR机构","N/A","N/A"];
jobContext["1202"]=["操作用户","授权机构","分级管理员","N/A","N/A"];
jobContext["1203"]=["操作用户","授权机构","分级管理员","N/A","N/A"];
jobContext["1204"]=["操作用户","授权机构","页面","N/A","N/A"];
jobContext["1205"]=["操作用户","授权机构","页面","N/A","N/A"];



efform_onload = function ()
{
	EL00_subWindow = new EFSubWindow("ef_region_treetable", "结构层次", 1000, 600);
}
button_query_onclick = function () {
	if (efvalidateDiv("ef_region_inqu")) {
		efgrid.submitInqu("ef_grid_result", "el", "EL00", "query");
	}
}

/**
 * 点击删除按钮
 */
button_delete_onclick = function () {
	efgrid.submitForm("ef_grid_result", "el", "EL00", "delete", true);
}
/**
 * 点击新建按钮
 */
button_insert_onclick = function () {
	efgrid.submitForm("ef_grid_result", "el", "EL00", "insert", true);	
}

efcalendar_1_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-startDate");
	  efcalendar(control_source, node, 'yyyymmdd', true);
	}

	efcalendar_2_click = function (control_source) {
	  var node = ef.getNodeById("inqu_status-0-endDate");
	  efcalendar(control_source, node, 'yyyymmdd', true);
	}  

/**
 * 主表点击一行时，获取明细信息
 */
function efgrid_onRowClicked( grid_id, row_index ) {
	if( grid_id == "ef_grid_result" ) {
		var grid = efgrid.getGridObject(grid_id);
		var eiinfo = new EiInfo();
		eiinfo.addBlock(new EiBlock("detail"));
		eiinfo.getBlock("detail").meta.metas = efgrid.getGridObject("ef_grid_result").blockData.meta.metas;
		eiinfo.getBlock("detail").addRow(eiinfo.getBlock("detail").getMappedArray(grid.getRowData(row_index)));
		efform.fillDiv("ef_region_detail", eiinfo);
		//增加上下文信息
		var logID = grid.getRowData(row_index)["logId"];
		renderContext(logID);
		EFColorbox({href:"#ef_region_detail",title:"详细记录",width:"80%",scrolling:false,inline:true});

	}
}

function renderContext(logID)
{
	var array = jobContext[logID+""];
	var i;
	for(i = 0 ; i < array.length;i++)
	{
		
		$("#EL00_Context"+(i+1)+"_Text").text(array[i]);
		$("#EL00_Context"+(i+1)+"_TR").show();
	}
	
	for(;i<5;i++)
	{
		$("#EL00_Context"+(i+1)+"_TR").hide();
	}
}

efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{
	if( grid_id == "ef_grid_result" ) {
		var grid = efgrid.getGridObject(grid_id);
		var eiinfo = new EiInfo();
		eiinfo.setAttr(grid.getRowData(row_index));
		
		var ajax_callback = 
		 {
				onSuccess :
		    		function(eiInfo)
					{
					   details4TreeTable ={};
					   refreshGridTree(eiInfo);
//					   exI = 0;
//					   EFColorbox({href:"#ef_region_treetable",title:"层次结构",scrolling:true,maxHeight:500,inline:true});
					   EL00_subWindow.show();
		    		},
		  		onFail:
		    		function(eMsg)
					{
		    			alert(getI18nMessages("ef.ServiceFailed","服务调用失败: ") + eMsg);
					}
			};
		EiCommunicator.send("EL00", "queryTree", eiinfo, ajax_callback,true,true);
		//点击fix头部时 取消后续点击动作
		event.cancelBubble=true;
	}
}
/**
 * 弹出窗口处理方法
 */
function openPopWindow(popFormEname, fieldId) {
	var href = "DispatchAction.do?efFormEname=" + popFormEname + "&fieldId=" + fieldId;
	var win = window.open(href);
	window[win] = fieldId;
}

/**
 * 弹出窗口返回的处理方法
 */
function setValueCallback(rowData, win) {
}


function treeNodeInitializer(node){
	node.textClicked = function()
					{
						document.getElementById("inqu_status-0-logId").value=node.label() ;
						efwindow.hide();
					};
	node._jTreeNodeDIV.title = node.label()+" "+node.text();//鼠标悬浮到节点上的提示信息。
	
	//值第二层的树节点背景色为粉红色。
	if(node.depth()==2)
		node._jNodeTextDiv.style.background="pink";
}

function myConfigTree(tree){
  tree.nodeInitializer = treeNodeInitializer;
  tree.initialExpandDepth = 1;//树默认展开到第三层。  将深度设置的深一点，就可以全部展开。
}

//重新绘制一个treeGrid
function refreshGridTree(eiInfo)
{
	//获取要成为treetable的html元素
	var treetable = $(".ef_tree_grid_class");
	//生成的html
	var html = "";
	//清空原来的treetable
	treetable.text("");
    
	//paint header
	html = html.concat("<thead><tr class=tableColumnHeadings>");
	var meta = eiInfo.getBlock("$").getBlockMeta();
	var columns = eiInfo.getBlock("$").getBlockMeta().metas;
	
	//若不在隐藏栏中则显示
	for (var k in columns)
	{
		if(hiddenColums.indexOf(k) == -1)
		{
			html = html.concat("<th ");
			html = html.concat("width=\""+ 80+"\"");
			html = html.concat(">" + columns[k].descName + "</th>");
		}
	}
	html = html.concat("</tr></thead>");
	treetable.append(html);
	
	//绘制tr和td
	html = "";

	//增加数据
	//数据列表
	var itemlist = eiInfo.blocks["$"].rows;
	//通过附加背景色和改变字体来覆盖class带来的样式
	var alertStyle = "style=\"background-color:"+ trColorError +";color:"+ fontColorError +"\"";

    //默认需要的class前缀
	var childPrefix = "child-of-";
	//Map数据
	var treeMap;
	var trclass = trClassNormal;
	//用于重命名日志类型为End的数据条目
	var depth = itemlist.length;
	var tempedID = 0;
	var tempHeader = "";
	for(var i = 0 ; i < itemlist.length; i++)
	{
		treeMap = eiInfo.blocks["$"].getMappedObject(itemlist[i]);
		//store treeMap in the detailsObject with another form 存储了详细信息 通过 label-position作为键
		details4TreeTable[treeMap["label"]+"-"+treeMap["position"]] = itemlist[i];
		
		//通过id来判断是否增加。如果属于同一个id则 E覆盖S
		if(tempedID != treeMap["label"])
		{
			html += tempHeader;
			tempedID = treeMap["label"];
			
		}
		tempHeader ="";
		if( (treeMap["leaf"] != "T" && treeMap["position"] == "S") || treeMap["position"] == "L" || (treeMap["position"] == "E" && treeMap["leaf"] == "F")) // 获取非叶子节点 或 单条记录
		{
			
			tempHeader+="<tr id='" + treeMap["label"] + "-0' class='"; //通过label来命名唯一性
			if(treeMap["parent"] > 0 )  //如果是子节点 则添加  子节点样式
			{
				tempHeader+=childPrefix+ treeMap["parent"] + "-0 ";
			}
			tempHeader+=trclass
			+ "'";
			
			if(treeMap["status"] == "E")
			{
				tempHeader += alertStyle;
			}
			tempHeader += "align=\"center\">";
			
			//增加数据条目
			for (var k in columns)
			{
				if(hiddenColums.indexOf(k) == -1)
				{
					var objv = treeMap[k];
					var td = "<td>";
					if( k == expandIndex)  //如果是展开头部则添加 style
					{
						td = "<td style='padding-left:25px;'>";
					}
					
					//添加数据
					if (objv == null) {
						tempHeader += td + "</td>";
					} else {
						tempHeader += td + objv + "</td>";
					}
				}
			}
			tempHeader += "</tr>";
//			
//		}else if(treeMap["position"] == "E" && treeMap["leaf"] == "T"){ //如果是结束标志的条目 但是是子节点
//			var trhtml = "";
//			trhtml = "<tr id='" + treeMap["label"]+"-"+(depth - treeMap["depth"])+"' class='"; 
//			if(treeMap["parent"] > 0 )
//			{
//				trhtml+=childPrefix+ treeMap["parent"] + "-0 ";
//			}
//			
//			trhtml += trclass + "'";
//			if(treeMap["status"] == "E") //结束条目中可能出现错误日志 添加错误日志style
//			{
//				trhtml += alertStyle;
//			}
//			
//			trhtml += "align=\"center\">";
//			
//			for (var k in columns)
//			{
//				if(hiddenColums.indexOf(k) == -1)
//				{
//					var objv = treeMap[k];
//					var td = "<td>";
//					if(k == expandIndex)  //为了保持和S条目的对齐
//					{
//						td = "<td style='padding-left:25px;'>";
//					}
//					
//					if (objv == null) {
//						trhtml += td + "</td>";
//					} else {
//						trhtml += td + objv + "</td>";
//					}
//				}
//			}
//			trhtml += "</tr>";
//			html+=trhtml;
		}else{   //叶子节点
			html+="<tr id='" + treeMap["label"] + "' class='"
				+ childPrefix + treeMap["parent"] + "-0 " + trclass
				+ "'";
			
			if(treeMap["status"] == "E")
			{
				html += alertStyle;
			}
			
			html += "align=\"center\">";
				
			for (var k in columns)
			{
				if(hiddenColums.indexOf(k) == -1)
				{
					var objv = treeMap[k];
					var td = "<td>";
					if(k == expandIndex)
					{
						td = "<td style='padding-left:25px;'>";
					}
					
					if (objv == null) {
						html += td + "</td>";
					} else {
						html += td + objv + "</td>";
					}
				}
			}
			html += "</tr>";
		}
	}

	if(tempHeader != "")
	{		
		html += tempHeader;
		tempHeader="";
	}
//	html += "</tbody>";
	treetable.append(html);
	
	//make Jquery do this
	var opts = {};
	opts.childPrefix  = childPrefix;
	opts.treeColumn = 0;
	treetable.treeTable(opts);
	
//	//添加点击函数
//	var expanderlength =$(".expander").length;
//	for(var i = 0 ; i < expanderlength;i++)
//	{
//		$(".expander")[i].onclick = onExpanderClick;
//	}
//	

	//添加鼠标滑入和滑出动作，固定了样式 tableRow0 和 tableRow1， 并且若指定了颜色，则默认为红色和棕色，字体颜色不变
	$(".ef_tree_grid_class tbody tr").bind('mouseover',function(){
		
		this.className = this.className.replace(trClassNormal,trClassHover);
		if(this.style.backgroundColor != "")
		{
			this.style.backgroundColor = trColorErrorHover;
		}
	}).bind('mouseout',function(){
		this.className = this.className.replace(trClassHover,trClassNormal);
		if(this.style.backgroundColor != "")
		{
			this.style.backgroundColor = trColorError;
		}
	});
	
	//添加点击函数以此显示详细信息 现在位置是固定。0--id  7--position
	$(".ef_tree_grid_class tbody tr td").bind('click',function(){
		
		if(this.children.length < 1)
		{
			//需要增加一个位置计算函数
			var index = this.parentNode.cells[0].innerText + "-" +  this.parentNode.cells[7].innerText;
			var eiinfo = new EiInfo();
			eiinfo.addBlock(new EiBlock("detail"));
			eiinfo.getBlock("detail").meta.metas = efgrid.getGridObject("ef_grid_result").blockData.meta.metas;
			eiinfo.getBlock("detail").addRow(details4TreeTable[index]);
			efform.fillDiv("ef_region_detail", eiinfo);
			var logID = details4TreeTable[index][5];//5 referrs to logId 
			renderContext(logID);
			EFColorbox({href:"#ef_region_detail",title:"详细记录",width:"80%",scrolling:false,inline:true});
			
		}
	});


}

//function onExpanderClick()
//{
//	if($(".expander").length > exI+1)
//	{
//		var expanderlength =$(".expander").length;
//		for(var i = 0 ; i < expanderlength - exI;i++)
//		{
//			exI++;
//			$(".expander")[exI].onclick = onExpanderClick;
//		}
//	}
//	$("#ef_region_treetable").colorbox({title:"层次结构",scrolling:true,maxHeight:500,inline:true});
//}
