var tableTreeModel =  new eiTreeModel('ECCM04');

// 定义树组件
function configTree(tree){
  tree.emptyNodeAsLeaf = false;
  tree.activeEmptyJudger = false;
  tree.topNodeActive = false;
  tree.nodeInitializer = treeNodeInitializer;
  tree.expand();
}

//	初始化树组件
function treeNodeInitializer(node) {
	 if(node!=nTree._rootNode)
	 node.type( new radioItemType(false) );
	// node.textClicked = function(){ treeNodeClicked( node ); };
	 if(node.depth() == 1) {
	    node.icon("EF/Images/eftree_foldericon.png");
	    node.openIcon("EF/Images/eftree_openfoldericon.png");
	  }else if(node.depth()>1){
	     node.icon("EF/Images/eftree_file.png");
	    node.openIcon("EF/Images/eftree_file.png");
	  }  
}

//上传下载 进度 标志 对象
var ecam08_modalWin;
var ecam08_isShow;
efform_onload = function ()
{
     //创建 进度窗口
     ecam08_modalWin  = new EFModalWindow('ecam08_progressWindow');
     ecam08_isShow = false;
}	
//点击取消按钮
button_cancel_onclick=function(){
   window.close();
}
//点击确定按钮
button_confirm_onclick=function(){ 
   var info = new EiInfo();
   var option = nTree.getOption();
   if (option == "") {
	alert("请选择栏目!");
	return;
   }  
   var selectedItem = option.split("@");
   if(selectedItem[0] == "site"){
      alert("不能选择站点，请选择栏目进行转移！");
      return;
   }else{
        //alert("cid："+selectedItem[1]);
        document.getElementById("hdColumnId").value=selectedItem[1];
		efwindow.show(null,"importArticle","center");
   }
}

button_cancel2_onclick=function(){
  	efwindow.hide();
}
//执行导入
button_imp_onclick=function(){
	var importFile = document.getElementById('importFile').value;
	var suffix = importFile.substring(importFile.length-3,importFile.length);
	if(suffix.toLowerCase()!='zip'){
		alert('请上传zip文件！');
		return false;
	}else{
		//调用导出进度标志
		ecam08_modalWin.showProgressBar();
		ecam08_isShow = true;
		var columnId = document.getElementById("hdColumnId").value;
		ef.get("ECAM08").action = "./EC/AM/ECAM10.jsp?columnId="+columnId;
		document.forms[0].submit();
	}
}

function uploadArtilecallBack(msg) {
	ecam08_modalWin.hide();
	ecam08_isShow = false;
	efwindow.hide();
	ef.get("uploadArtilceIframe").src = "";
	alert(msg);
}