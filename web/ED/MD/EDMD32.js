var uiControls={};
var TAG_NAME_ARRAY='tagName'; //存放所有tag名的数组 的 key
var TAG_ATTR_LIST='tagAttr';  //tag下所有属性数据(Array)(构造PropertyGrid使用) 的key
var TAG_ATTR_MAP='attrMap';   //tag属性名大小写对应关系(JSON) 的key
var TAG_ATTR_INDEX='index';   //tag的属性名在 属性数据(Array)的位置关系(JSON) 的key


//全局节点计数器
var node_id_seq = 1;
var node_id_zombine=1;
var selectId='';


//加载easyui.js 待改进
$(document).ready(function () {
	   jQuery.ajax({
        crossDomain: true,
        dataType: "script",
        url: "./ED/MD/EDMD30.easyui.js",
        success: function(){
		   		//initLoad();
		   $('#efFormLoad').kTree({container:'#efFormArch'});
		   $('#efFormLoad1').kTree({container:'#efFormArch1'});
//		   $('#efFormLoad').kTree();
        },
        error: function(){
        }
    });
});


/**
 * 初始构造左侧设计树
 */
function initLoad()
{

	loadPropertyPool();          //创建属性池
	
	//属性面板
	$('#tt').propertygrid({
        width: 298,
        height: 'auto',
        showGroup: true,
        scrollbarSize: 0,
        columns: [[
                { field: 'name', title: '属性', width: 100, resizable: true },
                { field: 'value', title: '值', width: 100, resizable: false }
        ]]
    });
	
    var updateOutput = function (e) {
        var list = e.length ? e : $(e.target),
            output = list.data('output');
        if (window.JSON) {
            output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
        } else {
            output.val('JSON browser support required for this demo.');
        }
    };

    loadDoc($('#efFormLoad'));

    // activate Nestable for list 1
    $('#efFormArch').nestable({
        group: 1
    })
    .on('change', updateOutput);

    $('#efFormArch div').each(function () {
        if ($(this).is('div')) {
            _initDivMenu($(this).attr("id"));
        }
    });

    // output initial serialised data
    updateOutput($('#efFormArch').data('output', $('#nestable-output')));

    $('#nestable-menu').on('click', function (e) {
        var target = $(e.target),
            action = target.closest('button').data('action');
        if (action === 'expand-all') {
            $('.dd').nestable('expandAll');
        }
        else if (action === 'collapse-all') {
            $('.dd').nestable('collapseAll');
        }
        else if(action == "input-jsp"){
        	efwindow.show(null,"importJsp","center");
        }
        else if(action == "save-jsp"){
        	alert("save-jsp");
        }
        else if(action == "outline-jsp"){
        	alert("预览");
        }
    });
    
    //事件委托 change
    $(document).delegate("#propertyGrid","keyup", function(e){
    	var handle = $(e.target);
    	//更新左侧 树 和 右侧的 textarea
    	
    	var val=handle.val();
    	var title=handle.parents('td:[field="value"]').prev().find('div').html();
//    	var changedRows = $('#tt').propertygrid('getChanges');
    	var changedRows = $('#tt').propertygrid().data().datagrid.data.rows;

    	
    	
    	//同步数据
    	var select=$(selectId);
    	
    	var _tagAttrObj={};
    	
    	var oldData=select.parent().data('data');
    	oldData[title]=val;
//    	for(var index=0;index<changedRows.length;index++)
//    	{
//    		oldData[changedRows[index].name]=changedRows[index].value;
//    	}
    	
    	
    	
    	var _tagAttr=JSON2String(oldData);
    	select.parent().attr('data-data',_tagAttr);
    	
        var src=serialize(select.parent()); //参数是li
      
        var _tagAttr=JSON2String(src);
        
    	$('#jspcode').val($.formatXml(generateCode(src[0]).toXml()));
    	
    	});
}




/**
 * 读取标签tag文件
 * @param {String} url:标签文件路径(须为xml格式)
 */
function loadPropertyPool(url)
{
	url="./ED/MD/EF-2.0.xml";
	
    $.ajax({
        url: url,
        dataType: 'xml',
        type: 'GET',
        timeout: 2000,
        error: function(xml)
        {
            alert("加载XML 文件出错！");
        },
        success: function(xml)
        {

        	var tagNameArray=[];
        	uiControls['tagName']=tagNameArray;
        	
            $(xml).find("tag").each(function(i,platTag)
            {
            	//tag的属性列表
            	var attrList = [];
            	
            	//记录tag的属性名索引,使用是快速查找 ;例如: {'cname':1,'ename':0}
            	var attrIndexList={};
            	
            	//属性名的对应关系 (dom attributes Name 大小写不敏感)
            	var attrMap={};
            	
            	
            	//处理单个个EFControl tag
            	$(platTag).each(function(j,item){
            		
            		//处理EFControl tag的属性
                   	$(item).find("attribute").each(function(k,attr){
                   		var attrName=$(attr).find('> name').text();
                   		var key=attrName.toLowerCase();
                   		
                    	//用小写的属性值作为key,value是实际的属性名
                   		attrMap[key]=attrName;
                   		
                   		//构造PropertyGrid所需数据
                   		attrList.push({ "name": attrName, "group": "", "value": "", "editor": "text"});
                   		
                   		//建立tag的属性名索引
                   		attrIndexList[attrName]=k;
                   	});
//                   	rows.push({"tagName":$(item).find('> name').text(),"tagAttr":attrList,'attrMap':attrMap});
                   	
                   	var tagName=$(item).find('> name').text();
                   	uiControls[tagName]={"tagAttr":attrList,'attrMap':attrMap,'index':attrIndexList};
                   	tagNameArray.push(tagName);
            	});
 
            });
            
            createControlWnd();          //创建控件选择框中的控件列表
            
            //树控件数据绑定
            bindingData($('#efFormLoad'));
        }
    });
};



/**
 * 创建
 * @return
 */
function createControlWnd()
{
	//拿到控件名集合
	var controlSet = uiControls[TAG_NAME_ARRAY];
    var div = $("#ctrlWnd"); 
    var table = $("<table id='controlTable' />");//创建table 
    table.hide();
    table.click(doclick);
    for (var i=0; i<controlSet.length; i++)
    {
        var row = $('<tr />');//创建一行 
        var cell = $('<td />').width(150).html(controlSet[i]);//创建一个单元 
        
        row.append(cell);
        cell = $('<td />').width(150).html('图标');//创建一个单元 
        row.append(cell);
        table.append(row);
      
    }
    div.append(table); 
}



//https://github.com/dbushell/Nestable
/**
 * @param {jQuery} load_doc_node  DOM节点
 * @param {String} arc_node       节点的id
 */
function bindingData(load_doc_node, arc_node) {
	
	load_doc_node.children().each(function () {
		
		var arc_node_new = '_node_' + node_id_zombine;
		
		//li id
		var node_li_id=node_id_zombine;
		
		node_id_zombine++;
		
		var _tagAttrObj={};
		
		
		var start=$(this).attr('tag').indexOf(':')+1;
		var tag=$(this).attr('tag').substr(start);
		
		
		//处理节点的属性
		$(this.attributes).each(function(i,o){
			if(uiControls[tag]&&o.name!='tag')
		    {
				//处理属性名大小写问题
				_tagAttrObj[uiControls[tag][TAG_ATTR_MAP][o.name]]=o.value;}
			else
			{
				_tagAttrObj[o.name]=o.value;
			}
		});
		
		var _tagAttr=JSON2String(_tagAttrObj);
		
		//div data
		$('#' + arc_node_new).attr("tagAttr", _tagAttr);
		
		//li data data-data 防止拖动时 data丢失
		$('#' + node_li_id).attr('data-data',_tagAttr);
		
		bindingData($(this), arc_node_new);
		
	});
	
}

/**
 * 根据页面DOM结构 构造ol,li (Nestable需要)
 * @param {jQuery} load_doc_node  DOM节点
 * @param {String} arc_node       节点的id
 */
function loadDoc(load_doc_node, arc_node) {
	
    load_doc_node.children().each(function () {
    	
    	//ol node
        var $ol = $('<ol />').addClass('dd-list');

        //div id
        var arc_node_new = '_node_' + node_id_seq;
        
        //li id
        var node_li_id=node_id_seq;
        
        //li node  && child node  is div
        var $li_node = $('<li />').addClass('dd-item').attr({'id':node_id_seq,
        	'data-id':'li_data_id'+node_id_seq
        }).append( //li>div
        		$('<div />').addClass('dd-handle').attr({
        			'id':arc_node_new
        		}).html($(this).attr('tag'))
        		);
        
        node_id_seq++;

        
        if (arc_node === undefined) { //arc_node未定义时
        	//树结构展示的div
            $('#efFormArch').append($ol).find("> ol").append($li_node);
        } else {
            var node_operate = $('#' + arc_node).parent().find("> ol");

            if (node_operate.length == 0) {
                $('#' + arc_node).parent().append($ol);
            }

            $('#' + arc_node).parent().find("> ol").append( $li_node );
        }
        	
        //事件委托
        $(document).delegate("#"+arc_node_new,"mousedown", function(e){
        	var handle = $(e.target);
        	selectId="#"+arc_node_new;
          if (handle.attr("allowDrag") !== "1") return;
          var src=serialize($("#"+node_li_id));
          
          var xxx=JSON2String(src);
        	$('#jspcode').val($.formatXml(generateCode(src[0]).toXml()));
        	showProperty(arc_node_new);
        	});

        loadDoc($(this), arc_node_new);

    });

}

/**
 * 节点下所有数据 序列化
 *@param {jQuery} node 节点
 */
serialize = function(node)
{
    var data,depth = 0;
        //ol jQuery object  ol
        step  =  function(ol, depth)
        {
            var array = [ ],
                items = ol.children('li');
            
            items.each(function()
            {
                var  li  = $(this),
                    item = $.extend({}, li.data('data')),
                    sub  = li.children('ol');
                if (sub.length) {
                    item.children = step(sub, depth + 1);
                }
                array.push(item);
            });
            return array;
        };
        
        //点击时触发拖动 
        var virtualNode=$('<ol />').append(node.clone());
        data = step(virtualNode,depth);
        
//        if(node.is('li'))
//        {
//        	//使用父节点
//        	if(node.index()==0)
//        	{
//        	  data = step(node.parent(),depth);
//        	}
//        	else
//        	{
//        		data=node.data('data');
//        		$.extend(data, step(node.children('ol'),depth));
//        	}
//        }    
       
    return data;
},

/**
 * 根据节点的JSON数据生成JSP代码
 * @param {JSON} src 节点的数据 { tag:"EF:EFPage", formid:"EDFA02"}
 */
generateCode = function (src)
{
 var node=$.node(src.tag);
 for(key in src)
 {
	 if(key!='tag')
	 {
		 if(key=='children')
		 {
			 for(child in src['children'])
			 {
				 node.appends(generateCode(src['children'][child]));
			 }
		 }
		 else
		 {
		 node.attrs(key,src[key]);
		 }
		 
	 }
 }
 return node;
};

/**
 * 添加节点
 * 1.弹出Combox 用户选择控件(控件类型过滤) 
 * 2.选中控件后，传递控件tag至此接口
 * @param nodeId  点击的节点div的id 例如：:_node_1
 */
function addChildNode(nodeId) {
	
	//TODO：弹出弹出Combox 用户选择控件(控件类型过滤) 
	
	    $('#ctrlWnd').css('display','block');
	    $('#controlTable').css('display','block');
	    $('#ctrlWnd').attr('NodeId',nodeId);
	    efwindow.show($('#'+nodeId),"ctrlWnd","center");
		return;
}


function addData(nodeId,tag){

	//展示区的div
    var nestable_data = $('#efFormArch').data('nestable');

    var $ol =$('<ol />').addClass('dd-list');
    
    //需要用户选中的Tag名  div data-data需要和PropertiesGrid联动
    var $li_node=$('<li />').addClass('dd-item').attr({
    	'id':node_id_seq,'data-id':'li_data_id'+node_id_seq   //node_id_seq是global变量
    }).append( //li>div
    		$('<div />').addClass('dd-handle').attr({
    			'id':'_node_' + node_id_seq,'allowDrag':1
    		}).html('EF:'+tag)   //用户选择的tag 请点击设置属性
    		);
    
    $li_node.attr('data-data','{"tag":"EF:'+tag+'","id":123,"name":"test"}');
    
    
    
    
    //找到div所在的li的子元素ol
    var node_operate = $('#' + nodeId).parent().find("> ol");

    //节点没有子节点(ol) 先append ol
    if (node_operate.length == 0) {
        $('#' + nodeId).parent().append($ol);
        nestable_data.setParent($('#' + nodeId).parent()); //设置nestable_data数据
    }

    //li>ol append child li
    $('#' + nodeId).parent().find("> ol").append($li_node);
    
    _initDivMenu('_node_' + node_id_seq);
    
    
    
    //给新增的li>div 委托事件
    $(document).delegate("#_node_"+node_id_seq,"mousedown", function(e){
    	var handle = $(e.target);
    	selectId="#_node_"+node_id_seq;
        if (handle.attr("allowDrag") !== "1") return;
        var src=serialize(handle.parent()); //参数是li
      
        var _tagAttr=JSON2String(src);
        
    	$('#jspcode').val($.formatXml(generateCode(src[0]).toXml()));
    	showProperty(selectId);
        
      
    	});

    node_id_seq++;

    nestable_data.expandItem($('#' + nodeId).parent());
	
};

function doclick() 
{ 
	var td =$(event.srcElement); // 通过event.srcElement 获取激活事件的对象 td 
	var tag=td.closest('tr').children('td:first').html();
	
	var nodeId=$('#ctrlWnd').attr('NodeId');
	addData(nodeId,tag);
	efwindow.hide();
} 

/**
 * 删除子节点
 * @param {String} 
 *       	nodeId:节点ID
 * @return void
 */
function delChildNode(nodeId)
{
	$('#popControlWnd').dialog('close');
	//需要从黄可方解析NODE获取NODE控件的名称
	//var controlName = parseFromNode(nodeId);
    //updateToPage("EFGrid");
	
	
	//暂时只更新nestable的div 
	
	$('#'+nodeId).parent().remove();
	
	//页面div 后续处理
}


/**
 * 显示控件的属性列表(PropertyGrid)
 * @param {String} nodeId:节点ID
 * @return void
 */
function showProperty(nodeId)
{
	//例如tag EF:EFTree 截取 EFTree
	var start=$('#'+nodeId).parent().data('data').tag.indexOf(':')+1;
	var tag=$('#'+nodeId).parent().data('data').tag.substr(start);
	
	$('#tt').propertygrid({
        width: 298,
        height: 'auto',
        showGroup: true,
        scrollbarSize: 0,
        columns: [[
                { field: 'name', title: '属性', width: 100, resizable: true },
                { field: 'value', title: '值', width: 100, resizable: false }
        ]]
    });
	
	//没有tag属性数据
	if(!uiControls[tag]) return;
	
	
	//读取节点默认数据 li上的数据
	var defailtData=$('#'+nodeId).parent().data('data');
	
	//clone tag的所有属性数据(构造PropertyGrid使用)
	var allData=jQuery.extend(true, [], uiControls[tag][TAG_ATTR_LIST]);
	
	//处理原有的数据
	for(key in defailtData)
	{
		if(key!='tag')
		{
		  //获取属性名index	
		  var i=uiControls[tag][TAG_ATTR_INDEX][key];
		  //复制原有的数据
		  allData[i].value=defailtData[key];
		}
	}
	//PropertyGrid加载数据
	$('#tt').propertygrid('loadData', allData);
	
	$("#propertyGrid").show();
	
	/* 不需要
	var dbClickCount = $("#"+nodeId).attr("dbClickCount");
	dbClickCount++;
	dbClickCount = dbClickCount%2;
	$("#"+nodeId).attr("dbClickCount",dbClickCount);
	if (dbClickCount == 1)
	{
		
		$("#propertyGrid").show();
	}
	else
	{
		$("#propertyGrid").hide();
	}
	*/
}


/**
 * 初始化树节点右侧菜单
 * @param {String} nodeId  节点div id  例如:_node_1
 */
function _initDivMenu(nodeId) {
	
	  var innerHtml = "<div style='width:150px;float:right;text-align:right;'>" +
	  "<a id='" + nodeId + "_menu_add_child' href='#' onclick=addChildNode('" + nodeId + "');>Add</a>" +
	  "&nbsp;" +
	  "<a id='" + nodeId + "_menu_del_child' href='#' onclick=delChildNode('" + nodeId + "');>Del</a>" +
	  "</div>";

	  $('#' + nodeId).attr("allowDrag", "1").append(innerHtml);
	  $('#' + nodeId).attr("dbClickCount",0);

}
