
//初始化
efform_onload = function (){
	none_button();
	ef.get("ef_grid_result").style.display="none";
}
function treeNodeInitializer(node){
 node.textClicked = function(){ treeNodeClicked( node ); };
}

function treeNodeClicked(node){
  flushStartEnd();
  var classId = node.label();
  ef.get("inqu_status-0-templateUnitType").value=classId;
  efgrid.submitInqu( "ef_grid_result", "ec","ECTM08","query");
  not_none_button();
  ef.get("ef_grid_result").style.display="";
  ef.get("code_div").style.display="none";
  get_height();
 // initElement();
}
	
function configTree(tree){
  tree.nodeInitializer = treeNodeInitializer;          
  tree.emptyNodeAsLeaf = true;
  tree.expand();
}

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id ){
      if(grid_id=="ef_grid_result"){
      	var grid = efgrid.getGridObject( "ef_grid_result" );
      	var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
      	if(columnEname=="edit"){   
      		return "<div align='center' efval=''><input value='编辑' class='buttonclass' type='button' align='center' onclick='editCode(\""+row_index+"\",\""+col_index+"\")'></div>" ;
      	}
      }
}

//点击新增按钮
function button_insert_onclick(){
	flushStartEnd();
	efgrid.submitForm( "ef_grid_result", "ECTM","ECTM08","insert", true );
	ef.get("code_div").style.display="none";
	get_height();	
}

//点击删除按钮触发函数
function button_delete_onclick(){
	flushStartEnd();
	efgrid.submitForm( "ef_grid_result", "ECTM","ECTM08","delete", true );	
	ef.get("code_div").style.display="none";
	get_height();
}

//点击修改按钮触发函数
function button_update_onclick(){
	flushStartEnd();
	efgrid.submitForm( "ef_grid_result", "ECTM","ECTM08","update",true );
	ef.get("code_div").style.display="none";
	get_height();
}
function check(){
  var code=ef.get("inqu_status-0-sound_code").value;
  if(code!=null){
     var index1=code.indexOf("<!--SUBFOR-->");
     var lastIndex1=code.lastIndexOf("<!--SUBFOR-->");
     var index2=code.indexOf("<!--/SUBFOR-->");
     var indexlastIndex2=code.lastIndexOf("<!--/SUBFOR-->");
    
     if(index1!=lastIndex1){
         alert("该样式中只可有一个循环起始标签");
         return false;
     }
     if(index2!=indexlastIndex2){
         alert("该样式中只可有一个循环结束标签");
         return false;
     }
     if(index1!=-1&&index2==-1){
         alert("循环起始标签缺少配对的循环结束标签");
         return false;
     }
     if(index1==-1&&index2!=-1){
         alert("循环结束标签缺少配对的循环起始标签");
         return false;
     }
     return true;  
  }
  return false;
}
//点击保存按钮触发函数
function button_sound_code_save_onclick(){
	flushStartEnd();
	if(check()){
	var grid = efgrid.getGridObject( "ef_grid_result" );
	var info = new EiInfo();
	info.set("styleId",ef.get("inqu_status-0-sId").value);
	info.set("styleCode",ef.get("inqu_status-0-sound_code").value);
	info.set("classId",ef.get("inqu_status-0-templateUnitType").value);
	EiCommunicator.send( "ECTM08", "save" , info, null );
    if(ajaxEi!=null)
       grid.refresh(ajaxEi);
	ef.get("code_div").style.display="none";
	get_height();
	}
}

//点击编辑按钮时触发函数
function editCode(row_index,col_index){
	flushStartEnd();
	grid = efgrid.getGridObject( "ef_grid_result" );
	row= grid.getRowData(row_index);
	if( grid.rowStatus[row_index]==0 || grid.rowStatus[row_index]==2){
		setSelectValue();
		ef.get("inqu_status-0-sId").value=row["styleId"];
	    ef.get("inqu_status-0-sound_code").value=row["styleCode"];
	   	ef.get("code_div").style.display="";
	   	get_height();
	}else if(grid.rowStatus[row_index]==1 || grid.rowStatus[row_index]==3){
	   	alert("数据库未存在此条记录，请新增后再编辑!");
	}
}

var start=0; 
var end=0;
//选择源码下拉框时触发函数
function sound_code_select(){
	var textBox = ef.get("inqu_status-0-sound_code"); 
	var pre = textBox.value.substr(0, start); 
	var post = textBox.value.substr(end); 
	textBox.value = pre + ef.get("inqu_status-0-code").value + post; 
	ef.get("inqu_status-0-code").value="";
	flushStartEnd();
}

//光标在textarea上操作时触发函数
function record_cursor_touch_off(textBox){
	if(typeof(textBox.selectionStart) == "number"){ 
		start = textBox.selectionStart; 
		end = textBox.selectionEnd; 
	} 
	else if(document.selection){ 
		var range = document.selection.createRange(); 
			if(range.parentElement().id == textBox.id){ 
				var range_all = document.body.createTextRange(); 
				range_all.moveToElementText(textBox); 
				for (start=0; range_all.compareEndPoints("StartToStart", range) < 0; start++) 
				range_all.moveStart('character', 1); 
				for (var i = 0; i <= start; i ++){ 
					if (textBox.value.charAt(i) == '\n') 
					start++; 
				} 
				var range_all = document.body.createTextRange(); 
				range_all.moveToElementText(textBox); 
				for (end = 0; range_all.compareEndPoints('StartToEnd', range) < 0; end ++) 
					range_all.moveStart('character', 1); 
				for (var i = 0; i <= end; i ++){ 
					if (textBox.value.charAt(i) == '\n') 
					end ++; 
				} 
			} 
	}
}

//判断高度，调整高度
function get_height(){
	if(ef.get("code_div").style.display=="none"){
		ef.get("ef_grid_result").style.height="531px";
	}else if(ef.get("code_div").style.display==""){
		ef.get("ef_grid_result").style.height="218px";
	}
}

//灰化所有按钮
function none_button(){
	efbutton.setButtonStatus("insert", false);
	efbutton.setButtonStatus("delete", false);
	efbutton.setButtonStatus("update", false);
}

//恢复所有按钮灰化
function not_none_button(){
	efbutton.setButtonStatus("insert", true);
	efbutton.setButtonStatus("delete", true);
	efbutton.setButtonStatus("update", true);
}

//当点击新增图标时若样式源码区域已显示则隐藏
function efgrid_onAddNewRow( grid_id ){
	flushStartEnd();
	ef.get("code_div").style.display="none";
	get_height();
}

//清空start和end值
function flushStartEnd(){
	start=0;
	end=0;
}

function showElementPage(){
   efwindow.show(ef.get("editElement"),"subpage");
   //efgrid.submitInqu( "ef_grid_element_result", "ECTM","ECTM08","queryElement");
}

function initElement(){
    var info=new EiInfo();
	var templateUnitType=ef.get("inqu_status-0-templateUnitType").value;
	info.set("templateUnitType",templateUnitType);
	//info.set("elementId",elementId);
    EiCommunicator.send( "ECTM08", "queryElement" , info, null );
    if(ajaxEi!=null){
       fillSelect(ajaxEi);
       fillPageSelect(ajaxEi);
       }
   
}
function fillSelect(info){
      clearOpt();
       obj = document.getElementById("element_result-0-code"); 
       var block=info.getBlock("element_result");
       var rows=block.rows;
       var objOption = new Option("可替换元素","");
        obj.options[obj.options.length]=objOption;
       for(var i=0;i<rows.length;i++){
          var name=block.getCell(i,"elementName");
          var value=block.getCell(i,"elementId");
          var option=new Option(name,value);
          obj.options[obj.options.length]=option;
           }
}
function fillPageSelect(info){
      clearPageOpt();
       obj = document.getElementById("inqu_status-0-code"); 
       var block=info.getBlock("element_result");
       var rows=block.rows;
       var objOption = new Option("可替换元素","");
        obj.options[obj.options.length]=objOption;
       for(var i=0;i<rows.length;i++){
          var name=block.getCell(i,"elementName");
          var value=block.getCell(i,"elementCode");
          var option=new Option(name,value);
          obj.options[obj.options.length]=option;
           }
  
}
function clearPageOpt(){
     obj = document.getElementById("inqu_status-0-code"); 
     for(i=obj.options.length-1 ; i>= 0 ; i--)
     obj.options[i] = null;
}
function clearOpt(){
   obj = document.getElementById("element_result-0-code"); 
     for(i=obj.options.length-1 ; i>= 0 ; i--)
     obj.options[i] = null;
      ef.get("element_result-0-elementName").value="";
      ef.get("element_result-0-elementCode").value="";     
}

function checkIsContain(){
    var elementName=ef.get("element_result-0-elementName").value;
    var obj = ef.get("element_result-0-code"); 
    var isExit = false;  
     for(var i=0;i<obj.options.length;i++)  
     {  
       if(obj.options[i].text == elementName)  
        {  
          isExit = true;  
             break;  
        }  
   }       
   return isExit; 
} 

function button_insert_element_onclick(){

 if(checkIsContain())
 {
    alert("该替换元素名称已经存在!");
    return;
 }
	var info=new EiInfo();
	var elementName=ef.get("element_result-0-elementName").value;
	var elementCode=ef.get("element_result-0-elementCode").value;
	var templateUnitType=ef.get("inqu_status-0-templateUnitType").value;
	info.set("elementName",elementName);
	info.set("elementCode",elementCode);
	info.set("templateUnitType",templateUnitType);
	EiCommunicator.send( "ECTM08", "insertElement" , info, null );
	if(ajaxEi!=null){
	   var state=ajaxEi.getStatus();
	   if(state!=-1){
	     alert("新增成功!");
	   }
	    fillSelect(ajaxEi);
	    fillPageSelect(ajaxEi);
	}
}
function button_update_element_onclick(){
    var info=new EiInfo();
	var elementName=ef.get("element_result-0-elementName").value;
	var elementCode=ef.get("element_result-0-elementCode").value;
	var obj = ef.get("element_result-0-code"); 
    var elementId=obj.value;
	info.set("elementName",elementName);
	info.set("elementCode",elementCode);
	info.set("elementId",elementId);
	var obj = ef.get("element_result-0-code"); 
	
	var selecName=obj.options[obj.selectedIndex].text;
	if(selecName!=elementName){
	   alert("不能修改替换元素名称!");
	   return;
	}
	EiCommunicator.send( "ECTM08", "updateElement" , info, null );
		if(ajaxEi!=null){
	   var state=ajaxEi.getStatus();
	   if(state!=-1){
	     alert("修改成功!");
	   }
	    fillSelect(ajaxEi);
	    fillPageSelect(ajaxEi);
	}
}
function button_delete_element_onclick(){
    var obj = ef.get("element_result-0-code"); 
    var elementId=obj.value;
    var info=new EiInfo();
    info.set("elementId",elementId);
	EiCommunicator.send( "ECTM08", "deleteElement" , info, null );
		if(ajaxEi!=null){
	   var state=ajaxEi.getStatus();
	   
	   if(state!=-1){
	     alert("删除成功!");
	   }
	   fillSelect(ajaxEi);
	   fillPageSelect(ajaxEi);
	}	
}
function element_detail(){
   var obj = ef.get("element_result-0-code"); 
   var elementId=obj.value;
   if(elementId.trim()==""){
      ef.get("element_result-0-elementName").value="";
      ef.get("element_result-0-elementCode").value="";
      return ;
   }
    var info=new EiInfo();
    info.set("elementId",elementId);
   EiCommunicator.send( "ECTM08", "queryElement" , info, null );
   if(ajaxEi!=null){
       var block=ajaxEi.getBlock("element_result");
       var name=block.getCell(0,"elementName");
       var code=block.getCell(0,"elementCode");
       ef.get("element_result-0-elementName").value=name;
       ef.get("element_result-0-elementCode").value=code;
   }
}
//给样式替换元素下拉框赋值
function setSelectValue(){
	ef.get("inqu_status-0-code").options.length = 0;
	var classId = ef.get("inqu_status-0-templateUnitType").value;
	if(classId == "2"){
		ef.get("inqu_status-0-code").options.add(new Option("可替换元素",""));
		ef.get("inqu_status-0-code").options.add(new Option("名称","<!--COLUMNNAME-->"));
		ef.get("inqu_status-0-code").options.add(new Option("链接","<!--COLUMNLINK-->"));
		ef.get("inqu_status-0-code").options.add(new Option("前缀","<!--COLUMNSTART-->"));
		ef.get("inqu_status-0-code").options.add(new Option("后缀","<!--COLUMNEND-->"));
		ef.get("inqu_status-0-code").options.add(new Option("图片","<!--COLUMNIMAGE-->"));
	}else if(classId == "3"){
		ef.get("inqu_status-0-code").options.add(new Option("可替换元素",""));
		ef.get("inqu_status-0-code").options.add(new Option("标题","<!--TITLE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("作者","<!--AUTHOR-->"));
		ef.get("inqu_status-0-code").options.add(new Option("来源","<!--SOURCE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("摘要","<!--ABSTRACT-->"));
		ef.get("inqu_status-0-code").options.add(new Option("副标题","<!--SUBTITLE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("关键字","<!--KEYWORDS-->"));
		ef.get("inqu_status-0-code").options.add(new Option("链接","<!--TITLELINK-->"));
		ef.get("inqu_status-0-code").options.add(new Option("引用链接","<!--REFLINK-->"));
		ef.get("inqu_status-0-code").options.add(new Option("前缀","<!--TITLESTART-->"));
		ef.get("inqu_status-0-code").options.add(new Option("后缀","<!--TITLEEND-->"));
		ef.get("inqu_status-0-code").options.add(new Option("显示时间","<!--DISPLAYTIME-->"));
		ef.get("inqu_status-0-code").options.add(new Option("图片","<!--TITLEIMAGE-->"));
	}else if(classId == "4"){
		ef.get("inqu_status-0-code").options.add(new Option("可替换元素",""));
		ef.get("inqu_status-0-code").options.add(new Option("循环起始","<!--SUBFOR-->"));
		ef.get("inqu_status-0-code").options.add(new Option("循环结束","<!--/SUBFOR-->"));
		ef.get("inqu_status-0-code").options.add(new Option("名称","<!--NAME-->"));
		ef.get("inqu_status-0-code").options.add(new Option("链接","<!--LINK-->"));
	}else if(classId == "5"){
		ef.get("inqu_status-0-code").options.add(new Option("可替换元素",""));
		ef.get("inqu_status-0-code").options.add(new Option("标题","<!--TITLE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("图片","<!--ARTICLEIMAGE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("正文","<!--CONTENT-->"));
		ef.get("inqu_status-0-code").options.add(new Option("摘要","<!--ABSTRACT-->"));
		ef.get("inqu_status-0-code").options.add(new Option("来源","<!--SOURSE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("作者","<!--AUTHOR-->"));
		ef.get("inqu_status-0-code").options.add(new Option("副标题","<!--SUBTITLE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("关键字","<!--KEYWORDS-->"));
		ef.get("inqu_status-0-code").options.add(new Option("显示时间","<!--DISPLAYTIME-->"));
		ef.get("inqu_status-0-code").options.add(new Option("浏览次数","<!--VISITED-->"));
		ef.get("inqu_status-0-code").options.add(new Option("评论","<!--COMMENT-->"));
		ef.get("inqu_status-0-code").options.add(new Option("打印","<!--PRINT-->"));
		ef.get("inqu_status-0-code").options.add(new Option("关闭","<!--CLOSE-->"));
	}else if(classId == "6"){
		ef.get("inqu_status-0-code").options.add(new Option("可替换元素",""));
		ef.get("inqu_status-0-code").options.add(new Option("循环起始","<!--SUBFOR-->"));
		ef.get("inqu_status-0-code").options.add(new Option("循环结束","<!--/SUBFOR-->"));
		ef.get("inqu_status-0-code").options.add(new Option("标题","<!--TITLE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("链接","<!--TITLELINK-->"));
		ef.get("inqu_status-0-code").options.add(new Option("引用链接","<!--REFLINK-->"));
		ef.get("inqu_status-0-code").options.add(new Option("副标题","<!--SUBTITLE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("关键字","<!--KEYWORDS-->"));
		ef.get("inqu_status-0-code").options.add(new Option("摘要","<!--ABSTRACT-->"));
		ef.get("inqu_status-0-code").options.add(new Option("显示时间","<!--DISPLAYTIME-->"));
		ef.get("inqu_status-0-code").options.add(new Option("图片","<!--TITLEIMAGE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("来源","<!--SOURSE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("作者","<!--AUTHOR-->"));
	}else if(classId == "7"){//相关文章样式
		ef.get("inqu_status-0-code").options.add(new Option("可替换元素",""));
		ef.get("inqu_status-0-code").options.add(new Option("标题","<!--TITLE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("链接","<!--TITLELINK-->"));
		ef.get("inqu_status-0-code").options.add(new Option("作者","<!--AUTHOR-->"));
		ef.get("inqu_status-0-code").options.add(new Option("来源","<!--SOURCE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("摘要","<!--ABSTRACT-->"));
		ef.get("inqu_status-0-code").options.add(new Option("副标题","<!--SUBTITLE-->"));
		ef.get("inqu_status-0-code").options.add(new Option("关键字","<!--KEYWORDS-->"));
		ef.get("inqu_status-0-code").options.add(new Option("前缀","<!--TITLESTART-->"));
		ef.get("inqu_status-0-code").options.add(new Option("后缀","<!--TITLEEND-->"));
		ef.get("inqu_status-0-code").options.add(new Option("显示时间","<!--DISPLAYTIME-->"));
		ef.get("inqu_status-0-code").options.add(new Option("引用链接","<!--REFLINK-->"));
	}else if(classId == "9"){
		ef.get("inqu_status-0-code").options.add(new Option("可替换元素",""));
	}else if (classId == "91"){
		ef.get("inqu_status-0-code").options.add(new Option("可替换元素",""));
		ef.get("inqu_status-0-code").options.add(new Option("页码","<!--pageNum-->"));
		ef.get("inqu_status-0-code").options.add(new Option("翻页链接","<!--link-->"));
	}else if (classId == "92"){
		ef.get("inqu_status-0-code").options.add(new Option("可替换元素",""));
		ef.get("inqu_status-0-code").options.add(new Option("总记录数","<!--totalNum-->"));
		ef.get("inqu_status-0-code").options.add(new Option("总页数","<!--totalPageN-->"));
		ef.get("inqu_status-0-code").options.add(new Option("结果记录集","<!--recordList-->"));
		ef.get("inqu_status-0-code").options.add(new Option("翻页区域","<!--trunPageRegion-->"));
	}
	
}