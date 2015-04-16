var uiControls={};
var TAG_NAME_ARRAY='tagName'; //存放所有tag名的数组 的 key
var TAG_ATTR_LIST='tagAttr';  //tag下所有属性数据(Array)(构造PropertyGrid使用) 的key
var TAG_ATTR_MAP='attrMap';   //tag属性名大小写对应关系(JSON) 的key
var TAG_ATTR_INDEX='index';   //tag的属性名在 属性数据(Array)的位置关系(JSON) 的key
var treeView;
var fieldSubWindow;           //字段选择子窗口
var selectedTreeItem;

//全局节点计数器
var node_id_seq = 1;
var node_id_zombine=1;
var selectId='';
var _DESIGNER_PAGE = 'DesignerPage';


$(document).ready(function () {
	 $('#designerMainDiv').layout({ closable:					true	// pane can open & close
			,	resizable:					true	// when open, pane can be resized 
			,	slidable:					true	// when closed, pane can 'slide' open over other panes - closes on mouse-out
			,	livePaneResizing:			true

			//	some resizing/toggling settings
			,	north__slidable:			false	// OVERRIDE the pane-default of 'slidable=true'
			,	north__togglerLength_closed: '100%'	// toggle-button is full-width of resizer-bar
			,	north__spacing_closed:		20		// big resizer-bar when open (zero height)
//			,	south__resizable:			true	// OVERRIDE the pane-default of 'resizable=true'
//			,	south__spacing_open:		0		// no resizer-bar when open (zero height)
//			,	south__spacing_closed:		20		// big resizer-bar when open (zero height)

			//	some pane-size settings
			,	west__minSize:				100
			,	east__size:					100
			,	east__resizable:			false
			,	east__minSize:				200
			,	east__maxSize:				.5 // 50% of layout width
			,	center__minWidth:			100

			//	some pane animation settings
			//,	west__animatePaneSizing:	false
			//,	west__fxSpeed_size:			"fast"	// 'fast' animation when resizing west-pane
			//,	west__fxSpeed_open:			1000	// 1-second animation when opening west-pane
			//,	west__fxSettings_open:		{ easing: "easeOutBounce" } // 'bounce' effect when opening
			//,	west__fxName_close:			"none"	// NO animation when closing west-pane

			//	enable showOverflow on west-pane so CSS popups will overlap north pane
			//,	west__showOverflowOnHover:	true

			//	enable state management
			,	stateManagement__enabled:	true // automatic cookie load & save enabled by default

			,	showDebugMessages: true});
	
	initLoad();
    // 删除提示框
     $("#efFormStatus").remove(); 
});


/**
 * 给新的树控件绑定数据
 */
function bindData2Tree(node) {
	
	
	node.children().each(function () {
		//li id
		var li_guid=$(this).data('guid');
		var _tagAttrObj={};
		
		var start=$(this).attr('tag').indexOf(':')+1;
		var tag=$(this).attr('tag').substr(start);
		
		
		//处理节点的属性
		$(this.attributes).each(function(i,o){
			if(uiControls[tag]&&o.name!='tag'&&uiControls[tag][TAG_ATTR_MAP][o.name])
		    {
				//处理属性名大小写问题
				_tagAttrObj[uiControls[tag][TAG_ATTR_MAP][o.name]]=o.value;}
			else
			{
				_tagAttrObj[o.name]=o.value;
			}
		});
		
		var _tagAttr=JSON2String(_tagAttrObj);
		
		
		//li data data-data 防止拖动时 data丢失
		
		$('.k-treeview').find('li:[data-uid='+li_guid+']').attr('data-data',_tagAttr);
		
		bindData2Tree($(this));
		
	});
	
}

/**
 * 序列化Tree的Node
 * @param {jQuery} node li
 * @return {Array} data
 */
function serializeNode(node)
{
    var data,depth = 0;
        //ul jQuery object  ul
        step  =  function(ul, depth)
        {
            var array = [ ],
                items = ul.children('li');
            
            items.each(function()
            {
                var  li  = $(this),
                    item = $.extend({}, li.data('data')),
                    sub  = li.children('ul');
                if (sub.length) {
                    item.children = step(sub, depth + 1);
                }
                array.push(item);
            });
            return array;
        };
        
        //点击时触发拖动 li会脱离 原来的结构  编辑时没有
        var virtualNode=$('<ul />').append(node.clone());
        data = step(virtualNode,depth);
 
       
    return data;
}

/**
 * 根据节点的JSON数据生成JSP代码
 * @param {JSON} src 节点的数据 { tag:"EF:EFPage", formid:"EDFA02"}
 */
function generateCode (src)
{
//  //处理特殊
//	if(src.jspkeywords)
//		return src.jspkeywords;
var node=$.node(src.tag);
for(key in src)
{
	 if(key!='tag')
	 {
		 if(key=='children')
		 {
			 for(var index=0; index< src['children'].length;index++)
			 {
				 node.appends(generateCode(src['children'][index]));
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
 * 显示控件的属性列表(PropertyGrid)
 * @param {jQuery} node  节点li
 */
function showPropertyGrid(node)
{
	//例如tag EF:EFTree 截取 EFTree
	var start=node.data('data').tag.indexOf(':')+1;
	var tag=node.data('data').tag.substr(start);
	
	$("#helpinfo").text("帮助提示");
	    
	//没有tag属性数据
	if(!uiControls[tag]) 
	{
//		$("#propertyGrid").hide();
		$("#propertyGrid").empty();
		return;
	}
	
	
	//读取节点默认数据 li上的数据
	var defailtData=node.data('data');
	
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
		  if(typeof i !="undefined")
		  {
		  allData[i].value=defailtData[key];
		  }
		  else
		  {
			  //用户自定义属性
			  allData.push({ "name": key, "group": "", "value": defailtData[key], "editor": "text"});
		  }
		}
	}
	//PropertyGrid加载数据
	$('#propertyGrid').grid('loadData', allData);
	
	//$("#propertyGrid").show();
}

function openWindow(name)  
{  
     window.open('about:blank',name,'height=400, width=400, top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes,location=yes, status=yes');   

}  

/**
 * 初始构造左侧设计树
 */
function initLoad()
{

	loadPropertyPool();
	fieldSubWindow = new EFSubWindow("ef_region_table", "选择表", 800, 500);
	$('#propertyGrid').grid({width:'auto',
	      columns:[{id:'name',title:'属性',width:'50%'},{id:'value',title:'值',width:'50%'},],
	      data:[]});
	
	

    $('#nestable-menu').on('click', function (e) {
        var target = $(e.target),
            action = target.closest('button').data('action');
        if (action === 'expand-all') {
            $('#efFormArch').nestable('expandAll');
            if(treeView)
            treeView.expandAll();
        }
        else if (action === 'collapse-all') {
            $('#efFormArch').nestable('collapseAll');
            if(treeView)
            treeView.collapseAll();
        }
        else if(action == "creat-newjsp"){
        	$('#textcontent').val("<EF:EFPage/>");
        	buildTree();
        }
        else if(action == "input-jsp"){
        	efform.openNewForm("EDMD31", "filetype=File");
        }
        else if(action == "save-jsp"){
        	var offset = $(e.target).offset();
        	$("#savejspdiv").css("display","block");
        	$("#savejspdiv").css("top",offset.top+30+"px");
        	$("#savejspdiv").css("left",offset.left+"px");
        }
        else if(action == "outline-jsp"){
        	
            var rootPath = $('#projRoot').val();
            //临时文件路径
            var filename = rootPath+'ED\\MD\\EDMD35.jsp';
            var srcCode = getCompleteCode();
            
            //因为form标签中才引入了iplat.ef.head.jsp，而<EF:EiInfo />是在其最后定义的
            //所以需要在Form标签中调用buildInfo，才可能拿到调用服务成功的或失败的Eiinfo
            //然后接着构造Eiinfo
            var formMatch = srcCode.match(/<\s*EF:EFForm[\s\S]*?>/gm);
            if (formMatch != null)
            {
            	var formStr = formMatch[0];
            	var formPos = srcCode.indexOf(formStr);
                var formEPos = formPos+formStr.length;
            	var preStr = srcCode.substring(0,formEPos);
            	var infoSnippet = '\n<script type="text/javascript"> buildInfo()</script> \n';
            	srcCode = preStr + infoSnippet + srcCode.substr(formEPos);
            }
            
            //添加构造Eiinfo的代码
        	var info = new EiInfo();
        	info.set("fanme", filename);
        	info.set("newfname", "");
        	info.set("text", srcCode);
        	EiCommunicator.send("EDMD30","saveJsp",info,null,false,true,true );
        	
        	//保存到临时文件之后，开始访问临时文件
        	var filename = document.getElementById("file").value;
        	if(filename == "null" || filename == "")
        	{
        		efform.openNewForm("EDMD35");
        	}
        	else
        	{
        		efform.openNewForm("EDMD35","previewPage="+filename);
        	}
        }
    });
    
    
    //事件委托 change
    $(document).delegate("#propertyGrid","keyup", function(e){
//    	alert();
    	var handle = $(e.target);
    	//更新左侧 树 和 右侧的 textarea
    	var val=handle.val();
    	
//    	var title=handle.parents('td[field="value"]').prev().find('div').html();
    	
    	//获取行的name
    	var rowindex = $('#propertyGrid').grid('getCellPosition',handle);
    	var title=$('#propertyGrid').grid('getData')[rowindex]['name'];
    	
    	
    	//同步数据
        var  selectedNode=$('#efFormArch.k-treeview').find('.k-state-selected').closest('li');
        
        var oldData=selectedNode.data('data');
    	oldData[title]=val;
    	
    	var _tagAttr=JSON2String(oldData);
    	selectedNode.attr('data-data',_tagAttr);
    	
        src=serializeNode(selectedNode); //参数是li
        
      
        var _tagAttr=JSON2String(src);
        
        //简单处理
        var output= $.formatXml(generateCode(src[0]).toXml());
        
        if($(output).attr('jspkeywords'))
        {
        	output=$(output).attr('jspkeywords');
        }
        
    	$('#textcontent').val(output);
    	
    	});
}

var tableTreeModel =  new eiTreeModel('EDDBTT');   //选择数据库表的树模型

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
	    if(node.ref=="T")
	       node.textDom().style.color = "red";
	    return;
	  }

	  if(node.depth() == 2) {
	    node.icon(efico.get("eftree.treeImgForum"));
	    node.openIcon(efico.get("eftree.treeImgForum"));
	  }

	}

function treeNodeClicked(node){
	   var project = node.project;
	   var table = node.key;

	   ef.get("inqu_status-0-projectEname").value=project;
	   ef.get("inqu_status-0-tableEname").value=table;
	   efgrid.submitInqu( "ef_grid_select", "ed","EDMD43","queryTable" );

	}

/**
 * @param 渲染页面的Eiinfo
 * @return
 */
function renderPageInfo(eiinfo,jspCodePreview)
{
	var tagNodes = $(jspCodePreview).children();
	for (var i=0; i<tagNodes.length; i++)
	{
		var child = tagNodes[i];
		var attrs = child.attributes;
		if (attrs.getNamedItem('blockId')!= null )
		{
			var blockId = attrs.getNamedItem('blockId').value;
			var block = new EiBlock(blockId);
			eiinfo.addBlock(block);
		}else if (attrs.getNamedItem('blockName')!=null){
			var blockId = attrs.getNamedItem('blockName').value;
			var block = new EiBlock(blockId);
			eiinfo.addBlock(block);
		}
		renderPageInfo(eiinfo,child);
	}
}

function selectDir(){
	efform.openNewForm("EDMD31", "filetype=DIR");
}

function efform_onPopupReturn (dir, filename){
	document.getElementById("dir").value = dir;
	document.getElementById("file").value = filename;
	document.getElementById("new_slectdir").value = filename;
	document.getElementById("new_slectdir").title = filename;
	if(dir==".jsp"&&filename != ""){
		document.forms["EDMD30"].action = "DispatchAction.do?efFormEname=EDMD30&&"+"file="+encodeURIComponent(filename);
		document.forms["EDMD30"].submit();
	}	
}

function savejsp_onclick(){
	var filename = document.getElementById("new_slectdir").value;
	if(filename == "null" || filename == ""){
		alert("请选择保存文件的路径！");
		return;
	}
	var newfile = document.getElementById("new_name").value;
	if(filename.lastIndexOf(".jsp")==-1 && (newfile == "null" || newfile == "")){
		alert("请输入文件的保存名称！");
		return;
	}
	var info = new EiInfo();
	info.set("fanme", filename);
	info.set("newfname", newfile);
	info.set("text", getCompleteCode());
	EiCommunicator.send("EDMD30","saveJsp",info,null,false,true,true );
	$("#savejspdiv").css("display","none");
}

function canceljsp_onclick(){
	document.getElementById("new_name").value = "";
	$("#savejspdiv").css("display","none");
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
        	var efControlgroups={};
        	uiControls['tagName']=tagNameArray;
        	uiControls['group']=efControlgroups;
        	
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
                   		
                   		//判断字段是否必须填写
                   		var required = "";
                   		if($(attr).find('> required').text()=="true"){
                   			//required = "<span style='color:red'>*</span>";
                   			required ="true";
                   		}
                   		//属性中文帮助
                   		var desc = attrName;
                   		if($(attr).find('> description').length == 1)
                   			desc = $(attr).find('> description').text();
                   		//判断字段类型
                   		var editor = "text";                   		
                   		
                   		//构造PropertyGrid所需数据
//                   	attrList.push({ "name": attrName+required, "group": "", "value": "", "desc": desc, "editor": editor});
                   		attrList.push({ "name": attrName,"required":required, "group": "", "value": "", "desc": desc, "editor": editor});
                   		
                   		//建立tag的属性名索引
                   		attrIndexList[attrName]=k;
                   	});
//                   	rows.push({"tagName":$(item).find('> name').text(),"tagAttr":attrList,'attrMap':attrMap});
                   	
                   	var tagName=$(item).find('> name').text();
                   	uiControls[tagName]={"tagAttr":attrList,'attrMap':attrMap,'index':attrIndexList};
                   	tagNameArray.push(tagName);
                   	
                   	//处理分组信息
                	var group=$(item).find('> group').text();
                	if(!efControlgroups[group])
                	{
                		efControlgroups[group]=[];
                	}
                	efControlgroups[group].push(tagName);
                   	
            	});
 
            });
            
//            createControlWnd();          //创建控件选择框中的控件列表
            
          ///分类处理Controls

            $(function() {
//                $( "#pluginDiv" ).accordion();
            	
            	//uiContorls 构造加数据
//            	var dataSource={'HTML':['body','div','span','body','div','span','body','div','span','body','div','span','body','div','span'],'Grid':['EFGrid','EFColumn'],'Tab':['EFTab'],'Region':['EFRegion']};
            	var dataSource=uiControls['group'];
            	
            	
            		for(var key in dataSource)
            		{
            			var item=dataSource[key];
            		
            			var h3margin={"padding":0,"margin-left":"7px","margin-right":"7px"};
            			var h3=$('<h3 />').css(h3margin).append('<a href="#">'+key+'</a>');
            		
            		
            		/** tree 方案
            		 * *
            		 */
            		var div=$('<div />').css('display','none');
            		
            		var divmargin={"margin-left":"8px","margin-right":"8px"};
            		var containerDiv=$('<div />').css(divmargin).attr('id',key).addClass('k-treeview');//.height('15%');
//            		$(item).each(function (i,o){ div.append('<span>'+o+'</span>'); });
            		$(item).each(function (i,o){ div.append($('<span ></span>').attr('tag',o)); });
            		
            		$('#pluginDiv').append(h3).append(containerDiv);
//            		div.kTree({container:containerDiv,dropTarget:'#efFormArch',helper:'clone'});
            		div.kTree({container:containerDiv,dropTarget:'#efFormArch',
            			helper:function(node)
            			{
            			var tagObj={};
            			tagObj.tag= "EF:" + node.text();
            			var leaf = node.clone().attr({'data-uid':$.createGuid(),'data-data':JSON2String(tagObj)});
            			leaf.find('span').text("EF:"+node.text());
            			return leaf;
//            			return  node.clone().attr({'data-uid':$.createGuid(),'data-data':JSON2String(tagObj)});
            			}
            		});
            		
            		
            		
            		/**template 方案
            		 * 
            		
            		
            		var containerDiv=$('<div />').attr('id',key);
                    var ul=$('<ul />');
            		$(item).each(function (i,o){ ul.append($('<li></li>').html(o)); });
            		
            		
            		
            		$('#pluginDiv').append(h3).append(containerDiv.append(ul));
            		
            		 $( "#pluginDiv li" ).draggable({
            	            appendTo: "body",
            	            helper: "clone"
            	        });
            		
            		  */
            		
            		}
            	
            	
            	
            	
            	$('#pluginDiv').multiOpenAccordion({
            		active: [1, 2],
            		click: function(event, ui) {
            			//console.log('clicked')
            		},
            		init: function(event, ui) {
            			//console.log('whoooooha')
            		},
            		tabShown: function(event, ui) {
            			//console.log('shown')
            		},
            		tabHidden: function(event, ui) {
            			//console.log('hidden')
            		}
            		
            	});
                $('#pluginDiv').multiOpenAccordion("option", "active", [0]);
                
                
                
                $('#EFtags').keyup(function(e)
                		{
                	          var filter=$(this).val();
                	          var regex=new RegExp(filter,"i");
                	          var active=[];
                	          for(var index=0;index<uiControls['group'].length;index++ )
                	          {
                	        	  active.push(0);
                	          }
                	          
                	          $('#pluginDiv').children('div .k-treeview').each(function(i,item)
                	        		  {
                	        	  
                	        	  $(item).find('li .k-in').filter(function(index,o)
                	        			  {
                	        		   return $(o).text().search(regex)<0;
                	        			  
                	        			  }).css('display','none');
                	        	  
                	        	  $(item).find('li .k-in').filter(function(index,o)
                	        			  {
                	        		  if($(o).text().search(regex)>=0)
                	        		  active[i]=1;
                	        		  return $(o).text().search(regex)>=0;
                	        		  
                	        			  }).css('display','inline-block');
                	        	  
                	        		  });
                	          
                	          var act=[];
                	          
                	          for(var i=0;i<active.length;i++)
                	          {
                	        	  if(active[i])
                	        		  act.push(i);
                	          }
                	          $('#pluginDiv').multiOpenAccordion("option", "active", act);
                	          
                		});
                
            });
            
            //树控件数据绑定
            //bindingData($('#efFormLoad'));
        }
    });
};

/**
 * 删除子节点
 * @param {String} 
 *       	nodeId:节点ID
 * @return void
 */
function delChildNode(nodeId)
{
	$('#popControlWnd').dialog('close');
	$('#'+nodeId).parent().remove();
	
	//页面div 后续处理
}

/**
 * XML反解析的方式构造左侧树
 * @param {string}
 *        element:子元素
 * @param {Div}
 *        node2Tree:代表树节点的DIV
 * @return void
 */
parseJsp2Tree = function(element, node2Tree)
{
	//first是将XML命名空间的相关信息给过滤掉
	  $(element).children().each(function(i,item){
	    	var tagName = $(item).prop('tagName');
		    	var tagNode = $('<div />');
		    	tagNode.attr('tag',tagName);
		    	
		    	if($(item).text()&&$.trim($(item).text()).length>0)
		    	{
		    		tagNode.attr('jspkeywords',$.trim($(item).text()));
		    	}
		    	
		    	var attributes = item.attributes;
		    	for (var j=0; j<attributes.length; j++)
		    	{
		    		tagNode.attr(attributes[j].name,attributes[j].value);
		    	}
                node2Tree.append(tagNode);
		      	parseJsp2Tree(item,tagNode);
	    });
}
/**
 * 根据JSP代码,生成树结构
 */
buildTree = function()
{
    var efFormArcParent =  $('#efFormArch').parent();
    var efFormLoadParent =  $('#efFormLoad').parent();
    
    //清空
    $('#efFormArch').remove();
    $('#efFormLoad').remove();
    var efFormArch = $('<div id="efFormArch"/>').width('100%'); //.addClass('dd')
    var efFormLoad = $('<div id="efFormLoad"/>');
    efFormArch.appendTo(efFormArcParent);
    efFormLoad.appendTo(efFormLoadParent);
    
	var code2Parse = '<root xmlns:EF="http://baosight.com">';
	var xmlSrcCode = $('#textcontent').val();
	
	
	//JSP 代码分析
	var docType=/(<!DOCTYPE html>)/;
	var jspDirectives=/(<%@[\s\S]*?%>)/gm; //<%@ %>
    var jspExpressionInLine=/('|"[^("<>)]*)<(%=[\s\S]*?%)>([^("<>)]*"|')/gm; //"<%= %>"
	var jspExpressions=/(>\s*)(<%=[\s\S]*?%>)/gm;//<%= %>
	var jspScriptlet=/(<%[^@|^=][\s\S]*?%>)/gm;//<% %>
    var jspInclude=/(<jsp:include[\s\S]*?jsp:include>)/gm;//<jsp:include />
    var comment=/(<!--[\s\S]*?-->)/gm; //<!-- -->
    
    xmlSrcCode=xmlSrcCode.replace(docType,'<HTMLDOCTYPE><![CDATA[$1]]></HTMLDOCTYPE>');
    xmlSrcCode=xmlSrcCode.replace(jspDirectives,'<JSPDirectives><![CDATA[$1]]></JSPDirectives>');
    
    xmlSrcCode=xmlSrcCode.replace(jspExpressionInLine,function(match)
    		{return '"'+match.substr(1,match.length-2).replace(/'/gm,'&amp;').replace(/"/gm,'&quot;')
    	.replace(/</gm,'&lt;').replace(/>/gm,'&gt;')+'"';});
    
    xmlSrcCode=xmlSrcCode.replace(jspExpressions,'$1<JSPExpression><![CDATA[$2]]></JSPExpression>');
    xmlSrcCode= xmlSrcCode.replace(jspScriptlet,'<JSPScriptlet><![CDATA[$1]]></JSPScriptlet>');
	xmlSrcCode= xmlSrcCode.replace(jspInclude,'<JSPInclude><![CDATA[$1]]></JSPInclude>');
	xmlSrcCode= xmlSrcCode.replace(comment,'<HTMLComment><![CDATA[$1]]></HTMLComment>');
	
	code2Parse += xmlSrcCode + "</root>";
    parseJsp2Tree($($.parseXML(code2Parse)).find('root'),efFormLoad);
    
   $('#efFormArch').addClass('k-treeview');
       treeView= $('#efFormLoad').kTree({container:'#efFormArch',dropTarget:'#efFormArch',
	   rightMenu:function(treeItem){
    	   
	   /** 右键菜单数据模型 * */
		var menuData = new absTreeModel();
//		
//		menuData.addChild("", {
//					label : "addNode",
//					parent : "",
//					text : " 添加   ",
//					leaf : "1",
//					imgSrc : efico.get("efgrid.frontAsc")
//				});
		menuData.addChild("", {
					label : "deleteKTreeNode",
					parent : "",
					text : " 删除  ",
					leaf : "1"
//					imgSrc : efico.get("efgrid.frontDesc")
				});
		menuData.addChild("", {
			label : "configDataModel",
			parent : "",
			text : " 配置数据模型  ",
			leaf : "1"
//			imgSrc : efico.get("efgrid.frontDesc")
		});
		
		
		var nMenu = new EFMenu(menuData, "rightMenu", "rightMenu");
		nMenu.hoverExpand = function(n){  return true; };
		nMenu.textClicked = function(node){ 
			var data = node.data();
			var menu_name = node.label();
			  if (eval("typeof " + menu_name ) == "function") {
			  	 eval(menu_name + "(treeItem); ") ;
			  }
		};
		
		nMenu._horizental = false;
		
		nMenu.render();
		
		var menu = nMenu._rootNode._jMenuDIV.attr('id','kTreeMenu');
		$('body').append(menu);
		menu.css({'top':event.clientY+'px','left':event.clientX+'px'});
		$('body').bind('click',function(){
			$('#kTreeMenu').remove();
			
		});
		
			return false;
			}});
    
    bindData2Tree($('#efFormLoad'));
    

	 //事件委托
   $(document).delegate("#efFormArch .k-in","click", function(e){
	   
	   e.stopPropagation(); 
       var handle = $(this).closest('li');
       var src=serializeNode(handle);
     
     
   //简单处理
     var output= $.formatXml(generateCode(src[0]).toXml());
     if($(output).attr('jspkeywords'))
     {
     	output=$(output).attr('jspkeywords');
     }
 	$('#textcontent').val(output);
   	showPropertyGrid(handle);
   	});

};

function deleteKTreeNode(treeItem)
{
	treeView.removeNode(treeItem);
}


/**
 * 获取最终设计代码
 */

function getCompleteCode()
{
//	buildTree();  2012-12-31 待讨论
	
    var li=$("<li data-data='{\"tag\":\"JSPVirtualRoot\"}'/>");
    var treeCopy=$('#efFormArch').children('ul').clone();
//    var treeCopy=$('#efFormArch').children('ol').clone();
	var tempCode=$.formatXml(generateCode(serializeNode(li.append(treeCopy))[0]).toXml());	 
//	var tempCode=$.formatXml(generateCode(serialize(li.append(treeCopy))[0]).toXml());	 
	var jspKeywords=/<.*jspkeywords="([\s\S]*?)".*>/gm;
	tempCode=tempCode.replace(/<JSPVirtualRoot>|<\/JSPVirtualRoot>/gm,''); //
	tempCode=tempCode.replace(jspKeywords,'$1');
	tempCode=tempCode.replace(/&lt;/gm,'<').replace(/&gt;/gm,'>').replace(/&quot;/gm,'"').replace(/&amp;/gm,"'");
	return  $.trim(tempCode);
};

/*
 * 配置数据模型
 */
function configDataModel(treeItem)
{
	selectTreeItem(treeItem);
	var data = treeItem.attr('data-data');
	
	var tag = $.parseJSON(data)['tag'];
    switch(tag){
    case "EF:EFGrid":
    	window.open( 'DispatchAction.do?efFormEname=EDMD41&previewPage=EDMD30&tag='+tag , 'Title',"left=200,top=100,height=500,width=800,scroll=auto,close=no");  
    	break;
    case "EF:EFRegion":
    	window.open( 'DispatchAction.do?efFormEname=EDMD41&previewPage=EDMD30&tag='+tag , 'Title',"left=200,top=100,height=500,width=800,scroll=auto,close=no");  
    	break;
    case "EF:EFColumn":
    	fieldSubWindow.show();
    	break;
	default:
		fieldSubWindow.show();
    }
    
}

//设定选中的树节点
function selectTreeItem(treeItem)
{
	selectedTreeItem = treeItem;
}

/**
 * 根据关联的元数据来构造EFGrid列
 * @return
 */
function buildColsFromMeta(eiInfo)
{
	   var metaEiInfo = new EiInfo();
       
	   var resultBlock = new EiBlock('leaves');
	   var blockMeta = new EiBlockMeta('leaves');
	   var colMeta = new EiColumn("columnType");
	   colMeta.pos = 0;
	   blockMeta.addMeta(colMeta);
	   
	   var colMeta1 = new EiColumn("fieldEname");
	   colMeta1.pos = 1;
	   blockMeta.addMeta(colMeta1);
	   
	   var colMeta2 = new EiColumn("fieldCname");
	   colMeta2.pos = 2;
	   blockMeta.addMeta(colMeta2);
	   
	   resultBlock.setBlockMeta(blockMeta);
	   
	   var uz = new Array();

       var blk = eiInfo.getBlock('result');
	   var eNamePos = blk.getBlockMeta().getMeta('fieldEname').pos;
	   var cNamePos = blk.getBlockMeta().getMeta('fieldCname').pos;
	   var rows = blk.getRows();
	   
	   for (var i=0; i<rows.length; i++)
	    {
	    	var row = rows[i];
	        var uc = [];
	        uc[0] = 'EFColumn';
	        uc[1] = row[eNamePos];
	        uc[2] = row[cNamePos];
	        resultBlock.addRow(uc);
	    }
		
	   metaEiInfo.addBlock(resultBlock);
	   
       efwindow.show($('#EFtags'),"ef_Popup","center");
       var metaDataGrid = efgrid.getGridObject('ef_grid_leaves');
       metaDataGrid.refresh(metaEiInfo);    
}

/**
 * 确定关联元数据
 * @return
 */
function addMetaData()
{
	//$('#pluginDiv').find(".k-item span").filter(function(){return $(this).text() == 'EFColumnGroup' })
    var metaGrid = efgrid.getGridObject('ef_grid_leaves');
    for (var i=0; i<metaGrid.getRowCount(); i++)
    {
      var colType = metaGrid.getCellValue(i,0);
      var tagObj = {};
      tagObj.tag = "EF:"+colType;
      tagObj['ename'] = metaGrid.getCellValueByColumnName(i,'fieldEname').toLowerCase();
      tagObj['cname'] = metaGrid.getCellValueByColumnName(i,'fieldCname');
      var matrixSpan = $('#pluginDiv').find(".k-item span").filter(function(){return $(this).text() == colType;});
      var matrixLi = matrixSpan.closest('li');
      var treeItem = matrixLi.clone().attr({'data-uid':$.createGuid(),'data-data':JSON2String(tagObj)});
      treeItem.find('span').text('EF:'+treeItem.text());
//      treeItem.data('data')['tag'] = "EF:"+ treeItem.data('data')['tag'];
  	  if(selectedTreeItem.children('ul').length>0)
	  {
		  selectedTreeItem.children('ul').append(treeItem);
	  }
	  else
	  {
		  selectedTreeItem.children('div').prepend('<span class="k-icon k-minus"/>');
		  selectedTreeItem.append('<ul class="k-group" role="group" style="display: block;"/>');
		  selectedTreeItem.children('ul').append(treeItem);
	  }
    }
    
	efwindow.hide();
}

/** 点击查询按钮后调用后台的service */
button_confirm_onclick = function () {
	 var metaGrid = efgrid.getGridObject("ef_grid_select");
	 var rows = metaGrid.getCheckedRows();
	 var num = rows[0];
     if(rows == ''){
        return alert('请选择字段！');
     } else if(rows.length > 1) {
    	return alert('只能选择一个字段！');
     }
     
     var data = $.parseJSON(selectedTreeItem.attr('data-data'));
     data['ename'] = metaGrid.getCellValueByColumnName(num,'itemEname').toLowerCase();
     data['cname'] = metaGrid.getCellValueByColumnName(num,'itemCname');
     selectedTreeItem.data('data',data);
     selectedTreeItem.attr('data-data',JSON2String(data));
     fieldSubWindow.hide();
     showPropertyGrid(selectedTreeItem);
}
