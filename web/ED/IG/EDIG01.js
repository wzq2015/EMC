
efform_onload = function ()
{
	efsplitter("leftTree", "leftTreeDiv", "middleSplitter");

	efregion.show("ef_region_inqu");
}

/***树的定义**/
var tableTreeModel =  new eiTreeModel('EDDBTT');

function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
}
/***初始化树节点**/
function treeNodeInitializer(node){
	node.type( new checkItemType(false) );//给节点加复选框

  if(node.depth() == 1){
    node.icon(efico.get("eftree.treeImgActv"));
    node.openIcon(efico.get("eftree.treeImgInActv"));

    return;
  }
  if ( node.leaf() ){
    node.textClicked = function(){ treeNodeClicked( node ); };
    node.icon(efico.get("eftree.file"));
    node.openIcon(efico.get("eftree.file"));
    if(node.ref=="T"){
       node.textDom().style.color = "red";
    }
     return;
  }
  if(node.depth() == 2) {
    node.icon(efico.get("eftree.treeImgForum"));
    node.openIcon(efico.get("eftree.treeImgForum"));
  }
}

/***浏览表的字段信息***/
/////@RS [测试用例：96515]
function treeNodeClicked(node){
   //alert(node.leaf());
   //alert(node.key);
   //alert(node.depth());
   //alert(node.project);
   var project = node.project;
   var table = node.key;

   //alert(project+"   "+table);
   ef.get("inqu_status-0-projectEname").value=project;
   ef.get("inqu_status-0-tableEname").value=table;

   efgrid.submitInqu( "ef_grid_result", "ed","EDDBT1","query" );
}

/***点击“生成按钮”的动作**/
/////@RS [测试用例：96514]
button_generate_onclick = function ()
{
	//alert('GENERATE');
	var selectedInfo = [];
	var _selectedItems = nTree.getCheckedNods();
	//alert('ed length:'+_selectedItems.length);
	if(_selectedItems.length ==0){
		alert('请选择要生成的内容！');
		return;
	}

	for( var i=0; i<_selectedItems.length;i++ ){
		var sItem = _selectedItems[i];

		//alert( sItem.label()+"   depth:"+sItem.depth() );
		if(sItem.depth()==3){//选中的为表
			var pLabel =sItem.parent().label();
			//alert('pLabel:'+pLabel);
			selectedInfo[selectedInfo.length]= pLabel.replace("M@","T@")+"@"+sItem.label();
		}else{
			selectedInfo[selectedInfo.length]= sItem.label();
		}
	}
	getData2(selectedInfo);
}

/***向后台服务发送请求，获取数据**/
function getData(selectedInfo){
	var ajax_callback =
	{
		onSuccess :
		 	function (eiInfo)
			{
				var backInfo = eiInfo.get('backInfo');
				//alert(backInfo);
				data2Word(eiInfo);//data信息导入Word
				//efform.setStatus

   			},
 			onFail:
   			function(eMsg)
			{
   				alert("服务调用失败: "+eMsg );
			}
	};
	var ei_info = new EiInfo();
	for( var i=0; i<selectedInfo.length;i++ ){
		//alert(selectedInfo[i]);
		ei_info.setByNameValue( "selectedInfo:"+i, selectedInfo[i] );
	}
	//alert('xx');
	EiCommunicator.send( "EDIG01", "getData" , ei_info, ajax_callback );
}

/******/
function getData2(selectedInfo){
	var ei_info = new EiInfo();
	for( var i=0; i<selectedInfo.length;i++ ){
		//alert(selectedInfo[i]);
		ei_info.setByNameValue( "selectedInfo:"+i, selectedInfo[i] );
	}
	EiCommunicator.send("EDIG01","getData", ei_info, null, false);
	if (ajaxEi == null) return;

	var backInfo = ajaxEi.get('backInfo');
	//alert(backInfo);
	data2Word(ajaxEi);//data信息导入Word
}


/****data信息导入Word**/
/////@RS [测试用例：96516]
/////@RS [测试用例：96518]
var WordApp;//得到WORD对象
var myDoc;
var MY_FONT_SIZE = 11;//正文字体大小
function data2Word(eiInfo)
{
	//alert('call data2Word js');

	var  projectInfoListBlock = eiInfo.getBlock("ProjectInfoList");
	if(projectInfoListBlock == undefined){
		return;
	}

	WordApp=new ActiveXObject("Word.Application"); //得到WORD对象
	WordApp.Application.Visible=true;
	myDoc=WordApp.Documents.Add();
	WordApp.ActiveDocument.PageSetup.Orientation = 1;

	//'生成目录
	WordApp.Application.Selection.Font.Size = 18;
	WordApp.Application.Selection.TypeText("目录");
	WordApp. Selection.ParagraphFormat.Alignment=1;//居中对齐
	WordApp.Application.Selection.TypeParagraph();
	WordApp.ActiveDocument.Bookmarks.Add("目录");
	WordApp.Application.Selection.TypeParagraph();


	//alert('projectInfoListBlock.getRows().length:'+projectInfoListBlock.getRows().length);
	if(projectInfoListBlock.getRows().length >= 1){
		for(t = 0;t<projectInfoListBlock.getRows().length;t++){
			var projectEName = projectInfoListBlock.getCell(t,"projectEName");
			var projectCName = projectInfoListBlock.getCell(t,"projectCName");
			var moduleList = projectInfoListBlock.getCell(t,"moduleList");

			//alert('projectEName:'+projectEName);
			WordApp. Selection.TypeText(projectCName+"["+projectEName+"]");
			WordApp. Selection.Style = myDoc.Styles("标题 1");


			var  moduleListBlock = eiInfo.getBlock(moduleList);
			if(moduleListBlock != undefined){
				if(moduleListBlock.getRows().length >= 1){
					for(k = 0;k<moduleListBlock.getRows().length;k++){
						var moduleEName = moduleListBlock.getCell(k,"moduleEName");
						var moduleCName = moduleListBlock.getCell(k,"moduleCName");
						var tableList = moduleListBlock.getCell(k,"tableList");

						WordApp.Selection.TypeParagraph(); //插入段落
						WordApp.Selection.TypeText(moduleCName+"["+moduleEName+"]");
						WordApp.Selection.Style = myDoc.Styles("标题 2");


						if(tableList != undefined){
							var tableListBlock = eiInfo.getBlock(tableList);
							if(tableListBlock.getRows().length >= 1){
								for(m = 0;m<tableListBlock.getRows().length;m++){
									var tableEName = tableListBlock.getCell(m,"tableEName");
									var tableCName = tableListBlock.getCell(m,"tableCName");
									var recCount = tableListBlock.getCell(m,"recCount");
									var remark = tableListBlock.getCell(m,"remark");
									var columnMappingList = tableListBlock.getCell(m,"columnMappingList");
									var primaryKeyList = tableListBlock.getCell(m,"primaryKeyList");
									var indexListBlockName = tableListBlock.getCell(m,"indexList");

									//
									WordApp.Selection.TypeParagraph();　　　　　　　　　//插入段落
									WordApp.Selection.TypeText(tableCName+"["+tableEName+"]");
									WordApp.Selection.Style = myDoc.Styles("标题 3");

									//添加表头信息
									addTableHead(tableEName,tableCName,recCount,remark);

									//结构定义
									//添加表体信息
									addTableColumn(eiInfo,columnMappingList);

									//添加索引信息
									addIndex(eiInfo,indexListBlockName);

									//
								}
							}//end if table Block
						}else {
							//alert('tableList is null....');
						}
					}
				}//end if module block
			}//end if(moduleListBlock != undefined)

			WordApp.Selection.TypeParagraph();　　　　　　　　　//插入段落
		}// end for(i = 0;i<projectInfoListBlock.getRows().length;i++)
	}//end if(projectInfoListBlock.getRows().length >= 1)


	//goto到首页，生成目录
	WordApp.Application.Selection.GoTo(-1,0,0,"目录");
	WordApp.ActiveDocument.TablesOfContents.add(WordApp.Selection.Range,true,1,3,false,"",true,true,"",true,true,true);
	WordApp.ActiveDocument.TablesOfContents(1).TabLeader = 1
	WordApp.ActiveDocument.TablesOfContents.Format = 0;
	WordApp.Selection.Sections(1).Footers(1).PageNumbers.Add(2,true); //在页脚出生成页码
	WordApp.Application.Visible = true;

	alert('生成Word文档完毕！');
}

/***添加索引信息**/
function addIndex(eiInfo,indexListBlockName){

	var col_count = 4;
	var indexListBlock = eiInfo.getBlock(indexListBlockName);

	if(indexListBlock != undefined){
		WordApp.Selection.TypeParagraph();
		//WordApp. Selection.Font.Bold=true
		WordApp. Selection.font.Size = MY_FONT_SIZE;
		WordApp.Selection.TypeText("索引定义");
		//alert('indexListBlock:  '+indexListBlock);
		//alert('indexListBlock.getRows().length：'+indexListBlock.getRows().length);
		var myTable=myDoc.Tables.Add (WordApp.Selection.Range, indexListBlock.getRows().length+1,col_count)  //2行4列的表格
		//alert('indexListBlock.getRows().length+1:'+indexListBlock.getRows().length);

		var zd = '索引名称,索引类型,索引,说明';
		var vzd = new Array();
		vzd = zd.split(",");
		for (h= 0;h<vzd.length;h++)
		{
			with (myTable.Cell(1,h+1).Range)
			{	font.Size = MY_FONT_SIZE;
				font.Bold = true;
				InsertAfter(vzd[h]);
				ParagraphFormat.Alignment = 1;
			}
		}
		for(n = 0;n<indexListBlock.getRows().length;n++){
			var indexEname = indexListBlock.getCell(n,"indexEname");
			var indexType = indexListBlock.getCell(n,"indexType");
			var indexColumnList = indexListBlock.getCell(n,"indexColumnList");
			//alert(indexEname+'   '+indexType+'   '+indexColumnList);

			if(indexEname != undefined){
				with (myTable.Cell(n+2,1).Range)
				{	font.Size = MY_FONT_SIZE;
					InsertAfter(indexEname);
				}
			}
			if(indexType != undefined){
				with (myTable.Cell(n+2,2).Range)
				{	font.Size = MY_FONT_SIZE;
					InsertAfter(indexType);
				}
			}

			var indexColumnStr ='';
			var indexColumnListBlock = eiInfo.getBlock(indexColumnList);
			if(indexColumnListBlock != undefined){
				try{
					for(i = 0;i<indexColumnListBlock.getRows().length;i++){
						var columnEname = indexColumnListBlock.getCell(i,"columnEname");
						var columnCname = indexColumnListBlock.getCell(i,"columnCname");
						var sortTyp = indexColumnListBlock.getCell(i,"sortTyp");
						indexColumnStr = indexColumnStr+columnEname+"  "+sortTyp+",  ";
					}
				}catch(e){
					alert(e);
				}
			}
			//alert(indexColumnStr);
			if(indexColumnStr != undefined){
				with (myTable.Cell(n+2,3).Range)
				{	font.Size = MY_FONT_SIZE;
					InsertAfter(indexColumnStr);
				}
			}
		}
		//向下移动光标处理
		myTable.Cell(indexListBlock.getRows().length+1, col_count).Select();
		WordApp.Selection.MoveDown(4);　　　　//光标
		WordApp. Selection.MoveRight(1);　　　　//光标右移字符
		WordApp.Selection.TypeParagraph();　
	}
}


/***添加表体信息**/
function addTableColumn(eiInfo,columnMappingList){
	WordApp.Selection.TypeParagraph();
	//WordApp.Selection.Font.Bold=true
	WordApp.Selection.font.Size = MY_FONT_SIZE;
	WordApp.Selection.TypeText("结构定义");
	//alert(columnMappingList);
	var columnMappingBlock = eiInfo.getBlock(columnMappingList);

	var col_count = 12;
	var zd = '序号,字段英文名,字段中文名,主键,类型,长度,单位,空否,缺省值,上限,下限,备注';
	var vzd = new Array();
	vzd = zd.split(",");

	if(columnMappingBlock != undefined){
		if(columnMappingBlock.getRows().length >= 1){
			var myTable=myDoc.Tables.Add (WordApp.Selection.Range, columnMappingBlock.getRows().length+1,col_count);  //col_count列的表格
			for (h= 0;h<vzd.length;h++)
			{
				with (myTable.Cell(1,h+1).Range)
				{	font.Size = MY_FONT_SIZE;
					font.Bold = true;
					InsertAfter(vzd[h]);
					ParagraphFormat.Alignment = 1;
					if(h == 0){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 35;
					}else if(h == 1){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 150;
					}else if(h == 2){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 150;
					}else if(h == 3){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 35;
					}else if(h == 4){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 35;
					}else if(h == 5){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 35;
					}else if(h == 6){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 35;
					}else if(h == 7){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 35;
					}else if(h == 8){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 50;
					}else if(h == 9){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 35;
					}else if(h == 10){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 35;
					}else if(h == 11){
						myDoc.Application.Selection.SelectColumn();
						myDoc.Application.Selection.Columns.PreferredWidth = 100;
					}
				}
			}

			for(n = 0;n<columnMappingBlock.getRows().length;n++){
				var columnName = columnMappingBlock.getCell(n,"columnName");
				var comment = columnMappingBlock.getCell(n,"comment");
				var primaryKey = columnMappingBlock.getCell(n,"primaryKey");
				var columnType = columnMappingBlock.getCell(n,"columnType");
				var columnSize = columnMappingBlock.getCell(n,"columnSize");
				var nullable = columnMappingBlock.getCell(n,"nullable");
				var unit = columnMappingBlock.getCell(n,"unit");
				var upperValue = columnMappingBlock.getCell(n,"upperValue");
				var lowerValue = columnMappingBlock.getCell(n,"lowerValue");
				var defaultValue = columnMappingBlock.getCell(n,"defaultValue");
				var columnRemark = columnMappingBlock.getCell(n,"columnRemark");

				with (myTable.Cell(n+2,1).Range)
				{	font.Size = MY_FONT_SIZE;
					InsertAfter(n+1);
				}
				if(columnName != undefined){
					with (myTable.Cell(n+2,2).Range)
					{	font.Size = MY_FONT_SIZE;
						InsertAfter(columnName);
					}
				}
				if(comment != undefined){
					with (myTable.Cell(n+2,3).Range)
					{	font.Size = MY_FONT_SIZE;
						InsertAfter(comment);
					}
				}
				if(primaryKey != undefined){
					with (myTable.Cell(n+2,4).Range)
					{	font.Size = MY_FONT_SIZE;
						InsertAfter(primaryKey);
					}
				}

				if(columnType != undefined){
					with (myTable.Cell(n+2,5).Range)
					{	font.Size = MY_FONT_SIZE;
						InsertAfter(columnType);
					}
				}
				if(columnSize != undefined){
					with (myTable.Cell(n+2,6).Range)
					{	font.Size = MY_FONT_SIZE;
						InsertAfter(columnSize);
					}
				}
				if(unit != undefined){
					with (myTable.Cell(n+2,7).Range)
					{	font.Size = MY_FONT_SIZE;
						InsertAfter(unit);
					}
				}
				if(nullable != undefined){
					with (myTable.Cell(n+2,8).Range)
					{	font.Size = MY_FONT_SIZE;
						InsertAfter(nullable);
					}
				}
				if(defaultValue != undefined){
					with (myTable.Cell(n+2,9).Range)
					{	font.Size = MY_FONT_SIZE;
						InsertAfter(defaultValue);
					}
				}
				if(upperValue != undefined){
					with (myTable.Cell(n+2,10).Range)
					{	font.Size = MY_FONT_SIZE;
						InsertAfter(upperValue);
					}
				}
				if(lowerValue != undefined){
					with (myTable.Cell(n+2,11).Range)
					{	font.Size = MY_FONT_SIZE;
						InsertAfter(lowerValue);
					}
				}
				if(columnRemark != undefined){
					with (myTable.Cell(n+2,12).Range)
					{	font.Size = MY_FONT_SIZE;
						InsertAfter(columnRemark);
					}
				}
			}

			//向下移动光标处理
			myTable.Cell(columnMappingBlock.getRows().length+1, col_count).Select();
			WordApp.Selection.MoveDown(4);　　　　//光标
			WordApp. Selection.MoveRight(1);　　　　//光标右移字符
			WordApp.Selection.TypeParagraph();　
		}//end if column block
	}else{
		//
	}
}

/***添加表头信息**/
function addTableHead(tableEName,tableCName,recCount,remark){
	//alert('addTableHead');
	//构造表头
	WordApp.Selection.TypeParagraph();
	//WordApp. Selection.Font.Bold=true
	WordApp. Selection.font.Size = MY_FONT_SIZE;
	WordApp.Selection.TypeText("表头信息");
	var myTable=myDoc.Tables.Add (WordApp.Selection.Range, 2,4)  //2行4列的表格
	with (myTable.Cell(1,1).Range){
		font.Size = MY_FONT_SIZE;
		font.Bold = true;
		InsertAfter("表英文名");
		ParagraphFormat.Alignment = 1;
    }
    with (myTable.Cell(1,2).Range){
		font.Size = MY_FONT_SIZE;
		font.Bold = true;
		InsertAfter("表中文名");
		ParagraphFormat.Alignment = 1;
    }
	with (myTable.Cell(1,3).Range){
		font.Size = MY_FONT_SIZE;
		font.Bold = true;
		InsertAfter("记录数");
		ParagraphFormat.Alignment = 1;
    }
	with (myTable.Cell(1,4).Range){
		font.Size = MY_FONT_SIZE;
		font.Bold = true;
		InsertAfter("注释");
		ParagraphFormat.Alignment = 1;
    }

	with (myTable.Cell(2,1).Range){
		font.Size = MY_FONT_SIZE;
		InsertAfter(tableEName);
    }
	with (myTable.Cell(2,2).Range){
		font.Size = MY_FONT_SIZE;
		if(tableCName == undefined){
			InsertAfter("");
		}else {
			InsertAfter(tableCName);
		}
    }
    with (myTable.Cell(2,3).Range){
		font.Size = MY_FONT_SIZE;
		InsertAfter(recCount);
    }
    with (myTable.Cell(2,4).Range){
		font.Size = MY_FONT_SIZE;
		InsertAfter(remark);
    }

	myTable.Cell(2, 4).Select();
	WordApp.Selection.MoveDown(4);　　　　//光标
	WordApp. Selection.MoveRight(1);　　　　//光标右移字符

	WordApp.Selection.TypeParagraph();　
}

//测试data信息导入Word
function testdata2Word(eiInfo)
{
	alert('call 2Word');

	var  block = eiInfo.getBlock("TableMapping");

	//if(block.getRows().length >= 1){
	//	for(i = 0;i<block.getRows().length;i++){
	//		var eName = block.getCell(i,"tableEName");
	//		alert(eName);
	//	}
	//}
	var title = 'hello';    //取报表标题
	var ksrq = 'aaaa';
	var jsrq = 'bbbb';
	var row_count = 5;//五行4列的表格
	var col_count = 4;
	var zd = '1\\2\\3\\ddd';
	//var context = document.forms[0].context.value
	var temp

	var i=0,n =0
	var vzd = new Array();
	var vcontext = new Array();
	var vcontext1 = new Array();
	vzd = zd.split("\\");

	var WordApp=new ActiveXObject("Word.Application");    //得到WORD对象

	var wdCharacter=1
	var wdOrientLandscape = 1
	WordApp.Application.Visible=true;
	var myDoc=WordApp.Documents.Add();

	WordApp.ActiveDocument.PageSetup.Orientation = wdOrientLandscape

	WordApp. Selection.ParagraphFormat.Alignment=0  //居中对齐
	WordApp. Selection.Font.Bold=true
	WordApp. Selection.Font.Size=20

	WordApp. Selection.TypeText(title+"("+ksrq+"至"+jsrq+")");
	WordApp. Selection.MoveRight(wdCharacter);　　　　//光标右移字符

	WordApp.Selection.TypeParagraph()　　　　　　　　　//插入段落
	WordApp.Selection.TypeParagraph()　　　　　　　　　//插入段落

	//for(k=0;k<10;k++){
	if(block.getRows().length >= 1){
		for(k = 0;k<block.getRows().length;k++){
			var eName = block.getCell(k,"tableEName");
			var cName = block.getCell(k,"tableCName");
			//alert(eName);

			WordApp. Selection.TypeText('表'+k+'：'+eName);

			var myTable=myDoc.Tables.Add (WordApp.Selection.Range, row_count,col_count)  //五行4列的表格

			var TableRange;  //以下为给表格中的单元格赋值
			with (myTable.Cell(1,1).Range){
				font.Size = 12;
				InsertAfter(eName);
		    }
			with (myTable.Cell(1,2).Range){
				font.Size = 16;
				InsertAfter(cName);
		    }

			//for (i= 0;i<vzd.length;i++)
			//{
			//	with (myTable.Cell(1,i+1).Range)
			//	{	font.Size = 12;
			//		InsertAfter(vzd[i]);
			//	}
			//}

			myTable.Cell(5, 4).Select();
			WordApp.Selection.MoveDown(4);　　　　//光标
			WordApp. Selection.MoveRight(wdCharacter);　　　　//光标右移字符

			WordApp.Selection.TypeParagraph();　
		}
	}

	row_count = 0;
	col_count = 0;
}