var nodeList=new Array();
var defaultNodeIds;
var separatorCharComma="#";
var separatorCharAt="@";
var defaultId='';
var defaultNodeName;
setDefaultid = function(){
	var id=document.getElementById("inqu_status-0-defaultId").value;
	if(defaultId==''){
		defaultId=id;
	}
}
getDefaultNodeIds = function(){
	return this.defaultNodeIds;
}
setDefaultNodeIds = function(){
    defaultNodeIds=new Array();
	var nodeId=document.getElementById("inqu_status-0-nodeIds").value;
	defaultNodeIds=nodeId.split(",");
	var nodeName=document.getElementById("inqu_status-0-nodeNames").value;
	defaultNodeNames=nodeName.split(",");
	
}
efform_onload = function (){
	var headObj = document.getElementById("ef_form_head");
	headObj.style.display="none";
	setDefaultNodeIds();
	setDefaultid();
	for(var i =0; i< defaultNodeIds.length; i++){
		if(defaultNodeNames[i] != null && defaultNodeNames[i] != "")
     		selectedNode(true,defaultNodeNames[i]+separatorCharComma+defaultNodeIds[i]);
     }

     var scriptss=createHtmlSelect(nodeList);

	setDefaultNodeId(tree._rootNode);
}

var nodeTreeModel =  new eiTreeModel('EVCM0509');
function configTree(tree) {
	tree.nodeInitializer = treeNodeInitializer; 
}
function treeNodeInitializer(node) {
	node.textDom().style.color = "black";
	if (node.depth() > 0) {
		node.type( new checkItemType(false) );
	}
	if (node.depth() < 1) {
		node._opened = true;
	}
	node.icon("EF/Images/eftree_cu.gif");
	node.openIcon("EF/Images/eftree_cu.gif");
	
}

EFTreeNode.prototype.expand = function() {  
  this._needRender = this._opened?false:true;
  this._opened = true;
  this.load();
  this.render();
  var children = this.getChildNodes();
  for(var i=0;i<children.length;i++){
  	var node = children[i];
  	var nodeType = node._type;
    if ( nodeType instanceof checkItemType ){
    	var text=(node._label).split(separatorCharAt)[4];
		var value=(node._label).split(separatorCharAt)[1];
	   	if(arrayIsExitNodeIds(getDefaultNodeIds(),value)){
	   		nodeType.checkItem(true);
	   		//arrayPush(text+separatorCharComma+value);
	   	}
	}
  }
  
}
setDefaultNodeId = function(treeNode){
	for (var i = 0; i < treeNode._childNodes.length; i++) {
	    var node = treeNode._childNodes[i];
	    var nodeType = node._type;
		    if ( nodeType instanceof checkItemType )
		    {
		    	var text=(node._label).split(separatorCharAt)[4];
	 			var value=(node._label).split(separatorCharAt)[1];
		    	if(arrayIsExitNodeIds(getDefaultNodeIds(),value)){
		    		nodeType.checkItem(true);
		    		//arrayPush(text+separatorCharComma+value);
		    	}
		    }
  	}
}
checkNodeIdStatus = function() {
	nodeList=new Array();
	var _selectedItems = tree.getCheckedNods();
	for( var i=0; i<_selectedItems.length;i++ ){
		arrayPush(nodeList,_selectedItems[i]);
	} 
}

selectedNode = function (bChecked,nodeId) {
	if(!bChecked){
		arrayRemove(nodeList,nodeId);
		return;
	}
	arrayPush(nodeId);
}
checkItemType.prototype.checkDom = function (bChecked) {
     this.checked = bChecked;
     var text=(this.item._label).split(separatorCharAt)[4];
	 var value=(this.item._label).split(separatorCharAt)[1]; 
	 var selfAble = (this.item._label).split(separatorCharAt)[3];
	 if(bChecked && selfAble=="false"){
	     alert("没有权限，不允许设置!");
	     this.checked = false;
		 this._jqDom.attr("checked", this.checked);
	     return ;
	  }
     selectedNode(bChecked,text+separatorCharComma+value);
	 this._jqDom.attr("checked", this.checked);
}

checkItemType.prototype.checkboxClicked = function(bChecked){
     var scriptss=createHtmlSelect(nodeList);
  
}


createHtmlSelect = function(style){	
		var _o = document.getElementById('defaultNodeId');
		var ops=_o.options;  
		try{
			if(style){
				for (var i = ops.length; i >= 0; i--) {
					ops.remove(ops[i]);
				}
				for(i=0;i<style.length;i++){
					var _oOption = document.createElement('OPTION');
				    _o.options.add(_oOption);
				    var text=style[i].split(separatorCharComma)[0];
				    var value=style[i].split(separatorCharComma)[1];
				    if(text) _oOption.innerText = text;
					if(value) _oOption.value = value;
					if(value==defaultId){
						_oOption.selected = defaultId;
					}
				}
			}
			
		}catch(e){
		}	
		return _o;
}
button_updateNode_onclick = function(){
	if(nodeList.toString()==''){
		alert('请选择节点树');
		return;
	}
	/**这里只更新默认节点，选中的节点返回调用页面;后续可以在EV16直接处理*/
	synUpdateDefaultNodeId();
	parent.window.location.reload();
}

button_updateNode_cancel=function(){
	var objDiv = parent.document.getElementById("nodeDiv");
	$(objDiv).remove();
}

synUpdateDefaultNodeId = function(){
	var ei_info = new EiInfo();
	ei_info.set( "defaultNodeId", ef.get("defaultNodeId").value );
	ei_info.set( "nodeList", nodeList.toString() );
	EiCommunicator.send( "EV16", "updateDefaultNodeId" , ei_info,callback);
}

//	回调函数
var callback = {
	onSuccess : function(eiInfo) {
		alert("设置成功!");
		window.close();
	},
	onFail : function(eMsg) {
		alert("failure");
		window.close();
	}
}

arrayIsExitNodeIds = function(array,value){
	for( var i = 0; i < array.length; i++ )
        {
            if( array[i]==value )
            {
                return true;
            }            
        }
     return false;
}
arrayRemove = function(nodeList,key){
	for(var i=0;i<nodeList.length;i++){
		if(nodeList[i]==key){
			nodeList.splice(i,1);
		}
	}
}
arrayPush = function(key){
	if(!arrayIsExitNodeIds(nodeList,key)){
		nodeList.push(key);
	}
}