(function($){
	$.fn.flow = function(option){
		var defaultOptions = {
			padding: 5,
			width : 95,
			height : 15,
			lineWidth : 100,
			lineHeight : 30,
			slider : 17.5,
			handle : "draw",
			toppad:40,
			leftpad:35,
			maxlevel:0,
			showCustom:false,
			hover : function(){},
			remove : function(){},
			click : function(){}
		}
		var opts = $.extend(defaultOptions,option);
		return this.each(function(){
			var currentQuery = $(this);
			var arrayNodes = new Array();
			// 级别--节点集合
			var levelNodes = new Array();
			var breakNodes ;
			function Node(_id,_name,_level,_begin,_next){
				this.id=_id;
				this.name=_name;
				this.level=_level;
				this.begin=_begin;
				this.next=_next;
				this.parents="";
				this.path=""
			};
			var createObjectList = function(id,level){
				var root = {
					id:0,
					next:"",
					begin:"",
					name:"",
					child:[],
					level : 0,
					getSize : function(){
						return this.child.length;
					},
					getParent : function(){
						return  $(".before[id=" + this.begin + "]");
					},
					getChild:function(i){
						return $(".before[id=" + this.child[i].id + "]");
					}
				};
				var rootObj = null,temp = null;
				var $rootObject = $(".before[id=" + id + "]",currentQuery);
				// 如果存在多个id-》bug
				if($rootObject.length > 1){
					rootObj = $rootObject.eq(0);
				    for(var i=1;i<$rootObject.length;i++){
						$rootObject.eq(i).remove();
					}
				}else{
					rootObj = $rootObject;
				}
				root.id=rootObj.attr("id");
				var childID = $(".before[begin="+root.id+"]",currentQuery);
				root.next=childID.length == 0 ?"-1":"1";
				root.name=rootObj.text();
				root.level = level;
				root.begin = rootObj.attr("begin");
				var mynode = new Node(root.id,root.name,root.level,root.begin,root.next);
				temp = new Array();
				if(levelNodes.length == 0){
					temp.push(mynode);
					levelNodes.push(temp);
				}else if(levelNodes.length == level){
					temp.push(mynode);
					levelNodes.push(temp);
				}else{
					levelNodes[level].push(mynode);
				}
				if(level > opts.maxlevel)
					opts.maxlevel = level;
				for(var i=0;i<childID.length;i++){
					var child = $(".before[id=" + childID[i].id + "]",currentQuery);
					if(child.size() == 0){
						continue;
					}
					var childObject = createObjectList(child.attr("id"),level + 1);
					root.child.push(childObject);
				}
				return root;
			}

			var rootID = $(".before[begin=-1]",currentQuery).attr("id");
			// 当不存在根节点时，直接返回
			if(!rootID) return false;
			var myObjectList = createObjectList(rootID,0); //执行完后，所有的节点，都有了level字段
			//绘画div块位置
			var drawPage = function(objectList,spanID){
				var level = opts.maxlevel ;
				addDataToMaxLevel();
				findBreakNode();
				for(var i=level;i>=0;i--){
					drawCount(i,levelNodes[i],opts.handle);
				}
			}
			// 初始化每个节点的parents/path/isall
			function addDataToMaxLevel(){
				var nodes = levelNodes,parents = "",id = "";
				for(var j=0;j<nodes.length;j++){
					nodes[j].sort(compare);
					for(var i=0;i<nodes[j].length;i++){
						parents = nodes[j][i].begin + ";";
						parents = getBegins(nodes[j][i].begin,parents);
						nodes[j][i].parents = parents ;
						nodes[j][i].path = (nodes[j][i].id+";"+parents).split(';').reverse().join('');
					}
				}
				nodes = levelNodes[opts.maxlevel];
				nodes.sort(compare);
				for(var i=0;i<nodes.length;i++){
					parents = nodes[i].parents.split(";");
					if($("#"+nodes[i].id+"").attr("isall") == "0")
						$("#"+nodes[i].id+"").attr("isall","1");
					for(var j=0;j<parents.length;j++){
						if(parents[j] != "" && parents[j] != "-1"){
							if($("#"+parents[j]+"").attr("isall") == "0")
								$("#"+parents[j]+"").attr("isall","1");
						}
					}
				}
			}
			function getBegins(id,parents){
				var node = $(".before[id="+id+"]");
				if(id == "-1"){
					return parents ;
				}else{
					parents += node.attr("begin") + ";";
					return getBegins(node.attr("begin"),parents);
				}
			}
			// 找到 中间 断开的节点
			var findBreakNode = function(){
				breakNodes = new Array();
				var nodes = levelNodes;
				var parents = null,count = 0,flag = false,isTop = false;
				for(var i=0;i<nodes.length;i++){
					nodes[i].sort(compare);
					for(var j=0;j<nodes[i].length;j++){
						if($("#"+nodes[i][j].id+"").attr("isall")=="1"){
							isTop = true;
						}
						if(nodes[i][j].next == "-1"&&nodes[i][j].level != opts.maxlevel&&isTop == true&&j != (nodes[i].length-1)){
							if(!flag) count = 0 ;
							count += 1 ;
							if(nodes[i][j+1].next != "-1"){
								breakNodes.push({id:nodes[i][j+1].id,state:"-1",count:count});
								flag = false;
							}else{
								flag = true;
							}
						}
					}
					count = 0 ;
				}
			}

			// 位置计算
			var drawCount = function(level,nodes,spanID){
				var toppad,first,end;
				var left = (opts.leftpad + toNum($("#"+nodes[0].id).css("width")))*level + opts.leftpad;
				nodes.sort(compare);
				for(var i=0;i<nodes.length;i++){
					if(level==opts.maxlevel){
						if(i == 0){
							toppad = opts.toppad;
						}else{
							var beforetop = $("#"+nodes[i-1].id).css("top");
							toppad = toNum(beforetop)+opts.toppad;
						}
					}else{ //1级别
						var childs = $(".before[begin="+nodes[i].id+"]");
						if(childs.length == 0){
							if(i == 0){
								toppad = opts.toppad;
								//toppad = findFirstTop(nodes);
							}else{
								var beginChilds = $(".before[begin="+nodes[i-1].id+"]");
								if(beginChilds.length == 0){
									toppad = toNum($("#"+nodes[i-1].id+"").css("top")) + opts.toppad;
								}else{
									toppad = toNum($("#"+beginChilds[beginChilds.length-1].id+"").css("top")) + opts.toppad;
								}
							}
						}else if(childs.length == 1){
							toppad = toNum($("#"+childs[0].id+"").css("top"));
						}else{
							first = toNum($("#"+childs[0].id+"").css("top"));
							end = toNum($("#"+childs[childs.length-1].id+"").css("top"));
							toppad = (first + end)/2;
						}
					}
					drawDiv(spanID,nodes[i],left,toppad,level);
				}
			}
			function findFirstTop(nodes){
				var beginChilds,count = 0,index,space = 0,returnVal = 0,node,height;
				for(var i=0;i<nodes.length;i++){
					beginChilds = $(".before[begin="+nodes[i].id+"]");
					if(beginChilds.length == 0){
						count ++ ;
					}else{
						index = i ;
						break;
					}
				}
				beginChilds = $(".before[begin="+nodes[index].id+"]");
				afterTop = toNum($(".before[id="+beginChilds[0].id+"]").css("top"));
				height = toNum($(".before[id="+beginChilds[0].id+"]").css("height"));
				space = count*opts.toppad + opts.toppad;
				if(afterTop < space){
					for(var i=nodes[0].level+1;i<=opts.maxlevel;i++){
						for(var j=0;j<levelNodes[i].length;j++){
							node = $(".before[id="+levelNodes[i][j].id+"]");
							node.css("top",toNum(node.css("top")) +Math.abs(space));
						}
					}
					returnVal = opts.toppad ;
				}else{
					returnVal = afterTop - space ;
				}
				return returnVal;
			}
			// 绘画div块的具体位置
			var drawDiv = function(spanID,node,left,toppad,level){
				var endId = '',parents = new Array() ;
				for(var i=0;i<breakNodes.length;i++){
					if(breakNodes[i].state != level){
						parents = node.parents.split(";");
						if(constain(breakNodes[i].id,parents)){
							toppad += opts.toppad*breakNodes[i].count ;
							breakNodes[i].state = level;
							continue;
						}
					}
				}
				var span = $("#"+spanID);
				var $node = $(".before[id="+node.id+"]",currentQuery).clone();
				$(".before[id=" + node.id + "]",currentQuery).remove();
				
				var $oldCustomNode = $(".orgtree-custom[id=custom"+node.id+"]",currentQuery);
				var $customNode = $oldCustomNode.clone();
				$oldCustomNode.remove();
				
				if($(".before[id=" + node.id + "]").size() > 0){
					$node = $(".before[id=" + node.id + "]").eq(0);
					return;
				}else{
					$("#" + opts.handle + " .before").each(function(){
						var leftPX = $(this).css("left");
						var topPX = $(this).css("top");
						if(leftPX == (left+'px') && topPX == (top+'px')){
							toppad = toppad + opts.lineHeight;
						}
					});
					//配置了现实定制的div将该div放在组织机构节点前
					if(opts.showCustom)
					{
						$customNode.appendTo(span);
						$customNode.css("display","block");
						$customNode.css("position","absolute");
						$customNode.css("left",left-55);
						$customNode.css("top",toppad-10);
					}
					
					$node.appendTo(span);
					
				}
				$node.css("position","absolute");
				$node.css("left",left);
				$node.css("top",toppad);
			}
			// 线条、方向绘画
			var drawLine = function(start,end){
				if($(start).data($(end).attr("id")) == true){
					return;
				}
				var offsetLeft = $("#" + opts.handle).offset().left;
				var offsetTop = $("#" + opts.handle).offset().top;

				var x1 = start.offset().left - offsetLeft + opts.padding + opts.width;
				var x2 = start.offset().top - offsetTop + opts.padding + opts.height-6;//huangl

				var y1 = end.offset().left - offsetLeft;
				var y2 = end.offset().top - offsetTop + opts.padding + opts.height-6; //huangl
				var jg_draw = new jsGraphics(opts.handle);
				jg_draw.setStroke(1);
				if(x2 == y2){
					jg_draw.drawLine(x1,x2,y1-1,y2); // huangl
				}else{
					if(x2 < y2){
						jg_draw.drawLine(x1,x2,x1 + opts.slider,x2); // huangl
						jg_draw.drawLine(x1 + opts.slider,x2,x1 + opts.slider,y2);
						jg_draw.drawLine(x1 + opts.slider,y2,y1-1,y2);
					}else{
						jg_draw.drawLine(x1,x2,y1 - opts.slider,x2);
						jg_draw.drawLine(y1-opts.slider,x2,y1 - opts.slider,y2);
						jg_draw.drawLine(y1 - opts.slider,y2,y1-1,y2);
					}
				}
				jg_draw.paint();
				$(start).data($(end).attr("id"),true);
			}
			// main方法
			var runline = function(objectList,spanID){
				var span = $("#" + spanID);
				var $root = $(".before[id=" + objectList.id + "]");
			 	if(objectList.getSize() == 0){
					return;
				};
				for(var i = 0; i < objectList.getSize();i++){
					runline(objectList.child[i],spanID);
					try{
						drawLine($root,$(".before[id="+objectList.child[i].id+"]"));
					}catch(e){
						alert(e.description);
						break;
					}
				}
				return;
			}
			//数组中是否包含指定元素
			function constain(val,array){
				var returnVal = false;
				for(var i=0;i<array.length;i++){
					if(array[i] == val){
						returnVal = true;
						break;
					}
				}
				return returnVal;
			}
			//排序
			function compare(value1,value2){
				return compareTool(value1.path,value2.path);
			}
			function compareTool(a,b){
				var asize = a.length;
				var alist = a.split("");
				var bsize = b.length;
				var blist = b.split("");
				var limit = asize < bsize ? asize : bsize ;
				var k = 0,c1,c2;
				while(k < limit){
					if(!isNaN(alist[k])){
						c1 = parseInt(alist[k]);
					}else{
						c1 = alist[k].charCodeAt();
					}
					if(!isNaN(blist[k])){
						c2 = parseInt(blist[k]);
					}else{
						c2 = blist[k].charCodeAt();
					}
					if(c1 != c2) return c1 - c2;
					k ++ ;
				}
				return asize - bsize ;
			}
			//辅助类： 100px -> 100
			var toNum = function(str){
				return parseInt(str.substring(0,str.length-2));
			}
			try{
				drawPage(myObjectList,opts.handle);
				runline(myObjectList,opts.handle);
				$("#" + opts.handle).find(".before").hover(opts.hover,opts.remove).click(opts.click);
			}catch(e){
				alert(e.description)
			}
		});
	}
})(jQuery)