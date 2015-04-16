
var leftNode;//源树中选中的节点
var rightNode;//目标树中选中的节点
var leftTree;

//源树的Model
var leftTreeModel =  new eiTreeModel('EDDBTT');
//目标树的Model
var rightTreeModel =  new eiTreeModel('EDDBTT');


efform_onload = function ()
{
	efregion.show("ef_region_inqu");
}	


/**
  * 追加引用
  */
button_addReference_onclick= function () 
{  
    var leftFlag = checkLeftNode();
    if( leftFlag == "-1" ){  
      alert("源项目树中没有选中节点"); 
      return;
     }
    else if( leftFlag == "0" ){  
      alert("在源项目树中请选中项目下的表节点");
      return;
    }

    var rightFlag = checkRightNode()
    if( rightFlag == "-1" ){
      alert("目的项目树中没有选中模块节点");
      return;
     }
    else if( rightFlag == "0" ){ 
      alert("在目的项目树中请选中项目下的模块");
      return;
    }
   
    var leftProjectEname = leftNode.project;
    var leftTableEname = leftNode.key;
    var rightProjectEname = rightNode.project;
    var rightModuleEname = rightNode.key;

    if( leftProjectEname == rightProjectEname ){
    alert("必须在两个不同项目间追加引用");
    return;
    }


    var flag = check( rightNode, leftNode);
    if( flag =="false" ){
     alert("目标树中模块下有与要追加的引用表相同英文名的节点");
     return;
     }
    else if( flag =="true" ){
      var eiinfo = new EiInfo();
      eiinfo.set("leftProjectEname",leftProjectEname);
      eiinfo.set("leftTableEname",leftTableEname);
      eiinfo.set("rightProjectEname",rightProjectEname);
      eiinfo.set("rightModuleEname",rightModuleEname);
 
      EiCommunicator.send("EDDBT2","addRef",eiinfo,null,false);
      if(ajaxEi != null){
         var flag=ajaxEi.get("flag");
          if(flag=="true"){
            alert("目标项目树中选中的模块所在项目有对该表的引用");
            return;
          }
      rightNode.reload();
      updateLeftTree(rightNode);
      }
    }
     
}




/**
  * 去除引用
  */
button_deleteReference_onclick= function () 
{    
   if( rightNode == null ){
     alert("目的项目树中没有选中节点");
     return;
   }
   else if( rightNode.leaf() ){
       if( rightNode.ref == "T" ){
          var parentNode = rightNode.parent();
          var projectEname = parentNode.parent().key;
          var tableEname = rightNode.key;
          var eiinfo = new EiInfo();
          eiinfo.set("projectEname",projectEname);
          eiinfo.set("tableEname",tableEname);
           
          EiCommunicator.send("EDDBT2","deleteRef",eiinfo,null,false);
          if(ajaxEi != null){
          parentNode.reload();
          updateLeftTree(parentNode);
          rightNode=null;
          }
       }
       else {
       alert("目的项目树中选中的不是引用表");
       return;
       }
   }
   else {
     alert("目的项目树中选中的不是表节点");
     return;
   }
}


/**
  * 在右边树增加和删除引用后更新左边树的相应的节点
  */
function updateLeftTree(node){
    var projectNode = node.parent();
    var prjNode = leftTree.getChildNode(projectNode.label());
    var moduleNode = prjNode.getChildNode(node.label());
    moduleNode.reload();
}


/**
  * 判断目标树中模块下是否有与要追加的引用表相同英文名的节点
  */
function check(node,cmpNode){
    var flag = "true";
    var children = node.getChildNodes();
    for (  var i = 0; i < children.length; i++ ) {
      var child = children[i];
	  if( child.key == cmpNode.key ){
	  flag = "false";
	  break;
	  }
    }
    return flag;
}


/**
  * 判断目标树中节点是否为模块节点
  */
function checkRightNode(){
    var flag="1";
    if(rightNode!=null){
      if(rightNode.depth() != 2)
      {
      flag="0";
      }
    }
    else{
      flag="-1"; 
    }
    return flag;
}


/**
  * 判断源树中节点是否为表节点
  */
function checkLeftNode(){
    var flag="1";
    if(leftNode!=null){
      if(!leftNode.leaf())
      flag="0";
    }
    else{
      flag="-1";
    }
    return flag;
}





/**
  * 源树的初始化配置
  */
function configLeftTree(tree){
    tree.emptyNodeAsLeaf = false;
    tree.activeEmptyJudger = false;
    tree.topNodeActive = false;
    tree.nodeInitializer = leftTreeNodeInitializer;
    leftTree = tree;
}

function leftTreeNodeInitializer(node){
    if( node.depth() == 1){
      node.icon(efico.get("eftree.treeImgActv"));
      node.openIcon(efico.get("eftree.treeImgInActv"));
    }
   
    if ( node.leaf() ){ 
      node.icon(efico.get("eftree.file"));
      node.openIcon(efico.get("eftree.file"));
      if( node.ref == "T" )
          node.textDom().style.color = "red";
    }
  
    if( node.depth() == 2) {
      node.icon(efico.get("eftree.treeImgForum"));
      node.openIcon(efico.get("eftree.treeImgForum"));
    }
    
    
    
    node.textClicked = function(){ 
    leftTreeNodeClicked( node ); };
}

function leftTreeNodeClicked(node){

    leftNode = node;
}



/**
  * 目标树的初始化配置
  */
function configRightTree(tree){
    tree.emptyNodeAsLeaf = false;
    tree.activeEmptyJudger = false;
    tree.topNodeActive = false;
    tree.nodeInitializer = rightTreeNodeInitializer;
}

function rightTreeNodeInitializer(node){
  
    if(node.depth() == 1){
      node.icon(efico.get("eftree.treeImgActv"));
      node.openIcon(efico.get("eftree.treeImgInActv"));
    }  
     
    if ( node.leaf() ){ 
      node.icon(efico.get("eftree.file"));
      node.openIcon(efico.get("eftree.file"));
    }
    
    if(node.depth() == 2) {
      node.icon(efico.get("eftree.treeImgForum"));
      node.openIcon(efico.get("eftree.treeImgForum"));
    }
    
    if( node.ref == "T" )
    node.textDom().style.color = "red";
    
    node.textClicked = function(){ 
    rightTreeNodeClicked( node ); };
}

function rightTreeNodeClicked(node){
  
    rightNode = node;
}
