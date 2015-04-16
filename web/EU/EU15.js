


//元数据树的Model
var leftTreeModel =  new eiTreeModel('EDDBTT');



/**
  * 数据库比较
  */
button_compare_onclick = function () 
{
	
	var selectedItem = tree1.getOption();

	if(selectedItem ==""){
		alert("请选择要比较的项目！");
	}else {

		var projectEname = selectedItem.substr(2);
		//alert('projectEname:'+projectEname);
		var rightJdbcUrl = document.getElementById('rightJdbcUrl').value;
		var rightUsername = document.getElementById('rightUsername').value;
		var rightPassword = document.getElementById('rightPassword').value;
		connectDB(false);
		if(!isConnectOK){
			return;
		}
		
		var param = "&projectEname="+projectEname;
		param += "&rightJdbcUrl="+rightJdbcUrl+"&rightUsername="+rightUsername+"&rightPassword="+rightPassword;
		
		var url = "DispatchAction.do?efFormEname=EU15&serviceName=EU15&methodName=compareDB"+param;
		var winl = (screen.width - 700) / 2;
		var wint = (screen.height - 620) / 2;
		winprops = 'height=620,width=700,top='+wint+',left='+winl+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no'
		return window.open(url, '', winprops);
    }
}


/**
  * 右数据库的连接测试
  */
function connectDB(isAlertInfo){

	var ajax_callback = 
	{
		onSuccess : 
		 	function (eiInfo)
			{ 
				var isConnect = eiInfo.get('isConnect');
				if(isConnect){
					isConnectOK	= true;
					if(isAlertInfo){
						alert('连接数据库成功！');
					}
				}else{
					isConnectOK	= false;
					alert('连接数据库失败！');
				}

   			},
 			onFail: 
   			function(eMsg) 
			{
   				alert("服务调用失败: "+eMsg );
			}
	}; 	

	var jdbcUrl;
	var username;
	var password;

	
	jdbcUrl = document.getElementById('rightJdbcUrl').value;
	username = document.getElementById('rightUsername').value;
	password = document.getElementById('rightPassword').value;
	

	var ei_info = new EiInfo();	
	ei_info.setByNameValue( "jdbcDriver", 'oracle.jdbc.driver.OracleDriver' );
	ei_info.setByNameValue( "jdbcUrl", jdbcUrl );
	ei_info.setByNameValue( "username",username );
	ei_info.setByNameValue( "password",password );
	
	EiCommunicator.send( "EU15", "testDBStatus" , ei_info, ajax_callback );
}


/**
  * 元数据树的初始化配置
  */
function configLeftTree(tree){
    tree.emptyNodeAsLeaf = false;
    tree.activeEmptyJudger = false;
    tree.topNodeActive = false;
    tree.nodeInitializer = leftTreeNodeInitializer;
}

function leftTreeNodeInitializer(node){
    if( node.depth() == 1){
      node.icon(efico.get("eftree.treeImgActv"));
      node.openIcon(efico.get("eftree.treeImgInActv"));
      node.type( new radioItemType(false) );//给节点加单选框
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

}


