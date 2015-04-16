
//项目英文名
var projectEname;
//表英文名
var tableEname;


efform_onload = function ()
{
	efregion.show("ef_region_inqu");
}	


/**
  * RS:93036
  * 追加索引项
  */
button_additem_onclick = function () 
{
   
   var grid = efgrid.getGridObject("ef_grid_result");
   var grid1 = efgrid.getGridObject("ef_grid_result1");
   var grid2 = efgrid.getGridObject("ef_grid_result2");
   
   if(grid1.getCheckedRows().length==0||grid.getCheckedRows().length==0)
   {
   		alert("没有选中索引或数据项！");
   		return;
   }
   
   var indexEnameResult2="";
   if(grid2.getRowCount()>0)
        indexEnameResult2 = grid2.getRowData(0).indexEname;
   var indexEname;
   var tableIndexType;
   var itemSortType =ef.get("select-0-itemSortType").value;
   var rows1 = grid1.getCheckedRows();
   //如果选择多行，则以第一行为准
   for( var j=0;j<rows1.length;j++){
        indexEname = grid1.getCellValue(rows1[j],1,TYPE_FIX);
        tableIndexType = grid1.getCellValue(rows1[j],0,TYPE_DATA);
	    break;
    }
   
  
   if(indexEnameResult2!=""&&indexEnameResult2!=indexEname)
   { 
   		alert("要追加的信息项和索引信息项列表中的信息项不属于同一个索引");
    	return;
   }
  
   var items = getItemSeqOfGrid2();
   var rows = grid.getCheckedRows();
   var itemSeq ;
   var row =new Array();
   for( var i=0; i< rows.length;i++ ){
        itemSeq = grid.getRowData(rows[i]).itemSeq;
        if( checkItemOfIndex(itemSeq,items)=="true"){//判断索引信息项grid中是否已经存在该item
        	var index={};
  			index["projectEname"]= projectEname;
    		index["tableEname"]= tableEname;
  	    	index["indexEname"]= indexEname;
  	    	index["tableIndexType"]= tableIndexType;
  	    	index["indexSeq"]= '-1';
  	    	index["itemSeq"]= itemSeq;
  	    	index["itemSortType"]= itemSortType;
  	   	 	row.push(index);
        }
   	 
   }   
   grid2.addRowData(row);
   clearSelected("ef_grid_result2");
   clearSelected("ef_grid_result")
   grid2.refresh();   
 
    
}


/**
  * 从ef_grid_result2中删除选中的行
  */
button_deleteitem_onclick = function () 
{ 
   var grid = efgrid.getGridObject("ef_grid_result2");
   var rows = grid.getCheckedRows();
   var length=rows.length;
   for(var i=0;i<length;i++){
 	   grid.removeRow(rows[0]);
	   rows=grid.getCheckedRows();
   }
   grid.refresh(); 	
   
   efform.setStatus(0,"删除"+length+"条信息项成功!"); 
}


/**
  * 从ef_grid_result1中删除选中的行，
  * 同时删除数据库中对应的索引信息
  */
button_deleteindex_onclick = function () 
{   
   
    var grid = efgrid.getGridObject("ef_grid_result1");
    var eiinfo = new EiInfo();
    block = new EiBlock( grid.getBlockData().getBlockMeta() );
    eiinfo.addBlock( block );
    efgrid._addSelectedData( block, grid );
    eiinfo.set("projectEname",projectEname);
    eiinfo.set("tableEname",tableEname);
    EiCommunicator.send("EDDBI0","deleteIndex",eiinfo,null,false);
    
    var rows = grid.getCheckedRows();
    var length=rows.length;
    for(var i=0;i<length;i++){
 	   grid.removeRow(rows[0]);
 	   rows=grid.getCheckedRows();
    }
    grid.refresh();   
	clearRows();    
}


/**
  * 保存ef_grid_result2中的信息到数据库，
  * 首先从数据库删除要保存的索引
  * 然后保存索引
  */
button_save_onclick = function () 
{
 
    var grid=efgrid.getGridObject("ef_grid_result2");
   
    if(grid.getRowCount()>0)
    {   
        if(checkIndexType() == "false"){
	    alert("要保存的索引项不是相同的类型！");
	    return;
        }
        
       
        //数据库中删除要保存的索引(作用：1.先删除再重新添加 2.只有这样才能实现主键索引的修改)
	    { 
	        var indexEname = grid.getCellValue(0,3,TYPE_FIX);
	    	var eiinfo = new EiInfo();
	    	eiinfo.set("projectEname",projectEname);
	    	eiinfo.set("tableEname",tableEname);
	   		eiinfo.set("indexEname",indexEname);
	    	EiCommunicator.send("EDDBI0","deleteOfIndex",eiinfo,null,false);
	     }
	   
	    clearSelected("ef_grid_result2");
    	var flag=countPK();//表中已经存在一个主键索引flag为"false"，否则为"true"
    
    	if(flag=="true"){
        	//保存新索引到数据库
	   	    var count=grid.getRowCount();
	    	for( var i=0; i< count;i++ ){
				grid.setCellValue( i, 4, i+"", TYPE_FIX  );	//更新序号
				grid.setCellValue( i, 3, grid.getCellValue(i,3,TYPE_FIX).toUpperCase(), TYPE_FIX  );//index_ename转化为大写
				grid.setRowChecked(i,true);
			}
			grid.refresh();
			efgrid.submitForm( "ef_grid_result2", "ed","EDDBI0","insert",true);
			getIndexOfTable();
		
		}
		else if(flag=="false")
		{
			alert("对应的表中已经包含一个主键索引，不能再添加一个！");
		}
		
	 }
	 
	 else{
	 	alert("索引信息项表为空，不需要保存！");
	 }
	 
    
}



/**
  * 判断是否可以保存
  * 索引信息项列表索引类型不是主键索引的话，返回"true"
  * 索引信息项列表索引类型是主键索引，且表还没有主键索引的话，返回"true"
  * 索引信息项列表索引类型是主键索引，但是表已经有主键索引的话，返回"false"
  * 
  */
function countPK(){
    var grid = efgrid.getGridObject("ef_grid_result2");
    var count= grid.getRowCount();
    var flag="true";
    var type=grid.getCellValue(0,0,TYPE_DATA);
   
    if(type=="PK")
    {  
        var eiinfo = new EiInfo();
		eiinfo.set("projectEname",projectEname);
		eiinfo.set("tableEname",tableEname);
		EiCommunicator.send("EDDBI0","countPK", eiinfo, null, false);
        if(ajaxEi != null){
      	   flag=ajaxEi.get("flag");
         } 
    }
    return flag;   
}



/**
  * 判断索引对应的信息项中所有行的索引类型是否相同
  */
function checkIndexType(){
    var grid = efgrid.getGridObject("ef_grid_result2");
    var flag = "true";
    var type = grid.getCellValue( 0, 0, TYPE_DATA );
    
    var count = grid.getRowCount();
    for( var i=0; i< count;i++ ){
	  if(grid.getCellValue( i, 0, TYPE_DATA )!=type) 
	   { flag="false";
	     return flag;
	   }
	
    }  
    return flag;
}




/**
  * 判断要追加的索引项在表体信息项的grid中是否已经存在
  */
function checkItemOfIndex(itemSeq,items){
    var count = items.length;
    for( var i=0; i< count;i++ ){
	  if(items[i] == itemSeq ) 
	  return "false";
    }   
    return "true";
}


/**
  * 获取索引信息项grid中的已经存在的itemSeq
  */
function getItemSeqOfGrid2(){
    var grid = efgrid.getGridObject("ef_grid_result2");
    var count = grid.getRowCount();
    var items=[];
    
    for( var i=0; i< count;i++ ){
	  items[i] = grid.getCellValue( i, 1, TYPE_DATA );
    }  
    
    return items;
}



var tableTreeModel =  new eiTreeModel('EDDBTT');



function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
}



function treeNodeInitializer(node){
  if(node.depth() == 1){
    node.icon(efico.get("eftree.treeImgActv"));
    node.openIcon(efico.get("eftree.treeImgActv"));
    return;
  }
    
  if ( node.leaf() ){ 
    node.textClicked = function(){ treeNodeClicked( node ); };
    node.icon(efico.get("eftree.file"));
    node.openIcon(efico.get("eftree.file"));  
    if( node.ref == "T" )
    node.textDom().style.color = "red";
    return;
  }
  
  if(node.depth() == 2) {
    node.icon(efico.get("eftree.treeImgForum"));
    node.openIcon(efico.get("eftree.treeImgForum"));
  }
  
}



/**
  * 点击树的叶子节点获取表对应的数据项信息和表对应的索引信息，
  */
function treeNodeClicked(node){
  
  projectEname=node.project;
  tableEname=node.key;
  ef.get("inqu_status-0-projectEname").value=projectEname;
  ef.get("inqu_status-0-tableEname").value=tableEname;   
  efgrid.submitInqu( "ef_grid_result", "ed","EDDBT1","query" );
  getIndexOfTable();
	
	 //清空索引信息项列表
	clearRows();
}



/**
  * 获取表的索引
  */
function getIndexOfTable(){ 
  var eiinfo = new EiInfo(); 
  eiinfo.set("projectEname",projectEname);
  eiinfo.set("tableEname",tableEname);
 
    //表对应的索引信息
    EiCommunicator.send("EDDBI0","getIndexOfTable",eiinfo,{
			onSuccess :
				function(eiInfo){
						var grid = efgrid.getGridObject("ef_grid_result1");
						grid.setData(eiInfo);
						grid.refresh();
				},
		    onFail    : 
		    function(eMsg) {
		      alert("failure");
		    }	
		} );	

}


/**
  * 点击索引列表中的行，在索引信息项中获取对应索引的信息项
  */
efgrid_onFixCellClick = function( grid_id, row_index, col_index, value ) 
{
	
    if( grid_id == "ef_grid_result1" )
	{  
	   
	    var grid = efgrid.getGridObject("ef_grid_result1"); 
	    clearSelected("ef_grid_result1");
        grid.setRowChecked ( row_index, true );
        grid.refresh();
	    var indexEname = grid.getCellValue(row_index,1,TYPE_FIX);
       
        
	    var eiinfo = new EiInfo();
		eiinfo.set("indexEname",indexEname);
		eiinfo.set("projectEname",projectEname);
		eiinfo.set("tableEname",tableEname);
		EiCommunicator.send("EDDBI0","getItemOfIndex",eiinfo,{
			onSuccess :
				function(eiInfo){
						var grid2 = efgrid.getGridObject("ef_grid_result2");
						grid2.setData(eiInfo);
						grid2.refresh();},
		    onFail    : 
		    function(eMsg) {
		      alert("failure");
		    }	} );
		 
	}	
}



/**
  * 当索引列表新增索引时，清空索引信息项列表
  */
efgrid_onAddNewRow = function( grid_id ){  
    clearSelected(grid_id)
	clearRows();
}



/**
  * 将grid中所有的行置为不选中状态
  */
function clearSelected(grid_id){
    var grid = efgrid.getGridObject(grid_id);
    var count=grid.getRowCount();
    for( var i=0; i< count;i++ ){
		grid.setRowChecked ( i, false );
    }  
    grid.refresh();
}

/**
  * 清除索引信息项列表中所有的行
  */
function clearRows(){
    
    var grid = efgrid.getGridObject("ef_grid_result2"); 
    var count=grid.getRowCount();
    for( var i=0; i< count;i++ ){
 	   grid.removeRow(0);
    }  
    grid.refresh();
}