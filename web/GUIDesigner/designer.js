                  
var mainBoard;
var mainDesignContent;
var hint;

var dragBegin;
var orgX;
var orgY;

var currentDragObject;
var amplifyTimeField
var amplifyTime;
var equipmentSizeField;
var equipment;
var propertySetter;
var currentSelectedControl;
var util;
var container;
var isAdd;
var deviceType;   //当前设备类型
var dragType;
var controlIndex=0;
var Supplier;
var ifBelongGrid;

//动态增加属性按钮
var addAttrBtn;
var newAttrName;
var newAttrValue;

//是否是导入的布局
var importFlag;
var layoutContent;
var impFileBtn;

//added by shaohuan
var targetContainer;  //目标容器
var freezeCursor;  //鼠标在鼠标点下去弹起来之前，移动的过程中不能让鼠标形状再继续改变
var selfUpdate;    //更新标识
var editStatus;    //文本类控件的编辑状态
var explorerType;  //浏览器类型
var test;          //测试

//浏览器类型
var browserType;

//几个tab页
var tabSet;
var currentTab;


//为拖动生成控件而需要的全局变量
var _startX = 0;            //鼠标起始位置
var _startY = 0;
var _offsetX = 0;           // 距离当前元素的偏移
var _offsetY = 0;
var _dragElement;          
var _oldZIndex = 0;         //临时增加拖拽对象的zIndex


function initPage()
{
	mainBoard = document.getElementById("mainBoard");
	mainBoard.className = "canvas";
	mainDesignContent = document.getElementById("mainDesignContent");
	hint = document.getElementById("hint");
	equipmentSizeField = document.getElementById("equipmentSizeField");
	amplifyTimeField = document.getElementById("amplifyTimeField");
	equipment = document.getElementById("equipmentField");
	dragBegin = false;
	deviceType = "iPad";
	Supplier = "Apple";
	equipmentField.value = "iPad";
	ifBelongGrid = false;
	freezeCursor = false;
	orgX = -1;
	orgY = -1;
	isAdd = true;
	currentDragObject = null;
	amplifyTime = eval(amplifyTimeField.innerText);
	propertySetter = new propertySetter();
	propertySetter.init();
	util = new Util();
	generateControlList();
	detectBrowser();
	
	//动态增加属性按钮
	addAttrBtn = document.getElementById("addAttrBtn");
	newAttrName = document.getElementById("newAttrName");
	newAttrValue = document.getElementById("newAttrValue");
	
	addAttrBtn.onclick = addNewProperty;	
	selfUpdate = false;         //自更新
	importFlag = false;         //是否是引入的布局
	editStatus = false;         //文本类控件是否是编辑状态
	
	//tabSet
	tabSet = new Array();
	tabSet.push("mainDesign");
	tabSet.push("mainCode");
	tabSet.push("layoutCode");
	currentTab = "mainDesign";
	
	//拖拽框
	util.$('dragger').style.display = "none";
	
}

//added by shaohuan
//chrome和safari用的是同一内核，所以要区别对待
//判断浏览器类型
function detectBrowser()
{
       var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
       
	   var OsObject = "";  
	   if(navigator.userAgent.indexOf("MSIE")>0) {  
	        return "MSIE";  
	   }  
	   
	   if(is_chrome) {  
	        return "Chrome";  
	   }  
	   
	   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
		   if (!is_chrome)
			   return "Safari";  
	   }   

	   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
	        return "Firefox";  
	   }  

	   if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
	        return "Camino";  
	   }  
	   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
	        return "Gecko";  
	   }  
	   return Osobject;
}

//added by shaohuan
//切换设备类型时重置邮编面板
resetPropertyPanel = function()
{
	dragBegin = false;
	ifBelongGrid = false;
	freezeCursor = false;
	orgX = -1;
	orgY = -1;
	currentDragObject = null;
	document.getElementById("attributeContent").innerHTML = "";
	document.getElementById("layoutCodeButton").innerHTML = "&nbsp; 导入布局 &nbsp; ";
	util.$('dragger').style.display = "none";
	propertySetter.currentControlType = null;
	propertySetter.currentControlNode = null;
	propertySetter.newPropertyName = "";
	propertySetter.newPropertyValue = "";
	propertySetter.firstTime = true;
	selfUpdate = false;
	importFlag = false;
	editStatus = false;
}


//added by shaohuan
//往property里面添加新的属性
addNewProperty = function()
{
	var name = newAttrName.value;
	var value = newAttrValue.value;
	propertySetter.addPropertyToNode(newAttrName.value,newAttrValue.value);
	
}



importLayoutFile = function()
{
	layoutContent = "";
	var ForReading = 1;
	
	if (window.File && window.FileReader && window.FileList && window.Blob) {
//	    var r = new FileReader();
//        var content = r.readAsDataURL(document.all.attachFile.value);
//        alert(content);
        alert(document.all.attachFile.value);
	} else {//IE浏览器
		var fso = new ActiveXObject("Scripting.FileSystemObject");
	    var reader = fso.OpenTextFile(document.all.attachFile.value, ForReading,1,-1); /*此处为含全部路径的文件名*/
	    if(!reader.atendofstream)  
	    {     
	       //一次性全部读完所有的内容  
	    	layoutContent = reader.ReadAll();  
	    }  
	    reader.Close();    
	}
	

//    var f = attachFile; 
//	
//    if (f) {
//      var r = new FileReader();
//      r.onload = function(e) { 
//	      var contents = e.target.result;
//        alert( "Got the file.n" 
//              +"name: " + f.name + "n"
//              +"type: " + f.type + "n"
//              +"size: " + f.size + " bytesn"
//              + "starts with: " + contents.substr(1, contents.indexOf("n"))
//        );  
//      }
//      r.readAsText(f);
//    } else { 
//      alert("Failed to load file");
//    }
//	
	//以下代码只适用于IE
//    var fso, f1, reader;
//    var ForReading = 1;
//    fso = new ActiveXObject("Scripting.FileSystemObject");
//    reader = fso.OpenTextFile(document.all.attachFile.value, ForReading,1,-1); /*此处为含全部路径的文件名*/
//    if(!reader.atendofstream)  
//    {     
//       //一次性全部读完所有的内容  
//    	layoutContent = reader.ReadAll();  
//    }  
//    reader.Close();
    
    importLayout();
}


function showFileContent() {
	 if (document.ReadURL.finished==0) {
	  setTimeout("showFileContent()",100);
	  return;
	 }
	 fileContent=document.ReadURL.fileContent;
	 document.form1.textarea1.value=fileContent;
	}


//added by shaohuan
//导入已有的视图布局
importLayout = function()
{
	importFlag = true;
	var nodeList = new Array();                   //存储布局文件中的所有节点
	var appendFlag = new Object();                //节点是否已经处理的标识集
	
	//校验导入布局与当前布局是否匹配
	var layoutType = layoutContent.substring(0,4);
	if (layoutType != deviceType)
	{
		alert("导入布局文件与当前布局不匹配！");
		return;
	}
	
	
	
	layoutContent = layoutContent.substring(4);
	eval("var p="+layoutContent+";");
	for (var i=0; i<p.block.rows.length; i++)
	{
		var	controlName = p.block.rows[i].type;
		var x = p.block.rows[i].x;
		var y = p.block.rows[i].y;
		var width = p.block.rows[i].width;
		var height = p.block.rows[i].height;
		var node = eval("new " + Supplier + controlName + "(" +x+"," + y + "," + width + "," + height + ").obj");
		
		node.property.eName= p.block.rows[i].eName;
		node.property.eValue = p.block.rows[i].eName;
		node.property.eBindName = p.block.rows[i].eBindName;
		node.property.eId = p.block.rows[i].eId;
		node.property.eParent = p.block.rows[i].eParent;
		
		
		for (var attr in p.block.rows[i])
		{
			//若导入的JSON串中包含自定义属性，则需将自定义属性赋给node的Property，以及添加到分类Custom中去
			//node的GROUP里面没有，并且它不是x,y,width,......eBindName
			if (!ifSelfPropertyExist(node,attr) && !ifVarInNode(node.property,attr))
			{
				node.property.group["Custom"].push(attr);                     //属性名
				node.property[attr] = p.block.rows[i][attr];                 //属性名和属性值
			}
		}
		
	    //至此，一个节点已创建完毕需要将其添加到节点集合中
		nodeList.push(node);
		
		//如果此节点没有父节点，则直接添加到画布中
		if (node.property.eParent == "self")
		{
			setNodeOriginAndSize(node,amplifyTime);
			mainBoard.appendChild(node);
			appendFlag[node.property.eId] = true;
		}
		else{
			appendFlag[node.property.eId] = false;
		}
	}
	
	//开始遍历将其添加到画布上
    for (var i=0; i<nodeList.length; i++)
    {
    	var node = nodeList[i];
    	var eId = node.property.eId;
    	if (appendFlag[eId] == false)
    	{
    		var parentNode;
    		var eParentId = node.property.eParent;
    		for (var j=0; j<nodeList.length; j++)
    		{
    			if (nodeList[j].property.eId == eParentId)
    				parentNode = nodeList[j];
    		}
    		setNodeOriginAndSize(node,amplifyTime);
    		parentNode.appendChild(node);
    		appendFlag[eId] = true;
    	}
    }
		
	importFlag = false;
}


//added by shaohuan
//判断导入的JSON中有没有自定义属性
ifSelfPropertyExist = function(node, selfPropertyName)
{
	var groups = node.property.group;	
	for(var i=0;i<groups.length;i++)
	{
		var group =  groups[i];

		for(var j=0;j<groups[groups[i]].length;j++)
		{
			if (node.property.group[groups[i]][j]==selfPropertyName)
				return true;
		}
	}
	return false;
}

//added by shaohuan
//判断NODE是否有某属性
ifVarInNode = function(node,name)
{
	for (var c in node)
	{
		if (c == name)
			return true;
	}
	return false;
}


//保存
saveLayoutFile = function()
{
//	var text = document.getElementById("mainCodeArea").innerText;
	var text = generateJsonString();
	text = deviceType+text;
	
	if (text.length > 30  && confirm("要保存吗？"))
	{
		//判断浏览器类型
		switch(detectBrowser()){
		case "MSIE":
			var b=window.open('', '', 'height=600, width=600, top=200, left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
			b.document.open(); 
			b.document.write(text); 
			b.document.close(); 
			b.document.execCommand('Saveas',false,'C:\\design.txt');
			b.close();
			break;
		case "Chrome":
			var content = text;
			var uriContent = "data:application/octet-stream," + encodeURIComponent(content);
			var newWindow = window.open(uriContent, 'neuesDokument');
			break;
		case "Safari":
			var content = text;
			var makeDataURI = "data:application/octet-stream,"+ encodeURIComponent(content);
			document.location.href = makeDataURI;
			break;
		}

	}
}

onEquipmentChanged = function(sender)
{
	saveLayoutFile();
	//获取设备类型
	deviceType = sender.options[sender.selectedIndex].value;
	switch(deviceType)
	{
		case "iPad":
			Supplier = "Apple";
			mainBoard.innerHTML = "";    //清空画布
			generateControlList();
			equipmentSizeField.value = "1024*768";
			setAmplifyTime(0.5);
			setEquipmentSize("1024*768",amplifyTime);
			showScaling();
//			importLayout();            //导入布局函数
			resetPropertyPanel();
			break;
		case "iPhone":			
			Supplier = "Apple";
			generateControlList();
			mainBoard.innerHTML = "";
			equipmentSizeField.value = "320*480";
			setAmplifyTime(1);
			setEquipmentSize("320*480",amplifyTime);
			showScaling();
			resetPropertyPanel();
			break;
		case "aPad":
			Supplier = "Android";
			generateControlList();
			mainBoard.innerHTML = "";
			equipmentSizeField.value = "1024*768";
			setAmplifyTime(0.5);
			setEquipmentSize("1024*768",amplifyTime);
			showScaling();
			resetPropertyPanel();
			break;
		case "aPhone":		
			Supplier = "Android";
			generateControlList();
			mainBoard.innerHTML = "";
			equipmentSizeField.value = "480*800";
			showScaling();
			setAmplifyTime(1);
			setEquipmentSize("480*800",amplifyTime);
			resetPropertyPanel();
			break;
	}
}

//added by shaohuan
//缩放显示与隐藏
showScaling = function()
{
	if (deviceType=="iPad" || deviceType=="aPad")
	{
	    document.getElementById('amplifyTimeField').style.display = "";
	    document.getElementById('amplify').style.display = "";
	    document.getElementById('reduce').style.display = "";
	}else{
	    document.getElementById('amplifyTimeField').style.display = "none";
	    document.getElementById('amplify').style.display = "none";
	    document.getElementById('reduce').style.display = "none";
	}

}

setAmplifyTime = function(time)
{
	amplifyTimeField.innerText = amplifyTime = time;
}

setEquipmentSize = function(size,time,direction)
{
	var _size = size.split("*");

	var width = eval(_size[0]);
	var height = eval(_size[1])
	
	mainBoard.style.pixelWidth = width * time;
	mainBoard.style.pixelHeight = height * time;
	
	setChildrenOriginAndSize(mainBoard,time);
}

setChildrenOriginAndSize = function( node , time)
{
	var childNodes = node.childNodes;
	for(var i =0 ; i< childNodes.length ; i++)
	{
		if(childNodes[i].className!="control")
			continue;
		else
		{
			setNodeOriginAndSize(childNodes[i],time);
		}
		
		if(childNodes[i].childNodes.length>0) 
		{
			setChildrenOriginAndSize(childNodes[i] , time);
		}
	}
}

setNodeOriginAndSize = function(node,time)
{
	node.style.pixelLeft = node.property.x * time;
	node.style.pixelTop = node.property.y * time;
	node.style.pixelWidth = node.property.width * time;
	node.style.pixelHeight = node.property.height * time;
	node.style.fontSize = 16 * time;
}


amplify = function(isEnlarge)
{
	if(isEnlarge)
	{
		if(amplifyTime < 1)
		  amplifyTime += 0.5;
	}
	else
	{
		if(amplifyTime > 0.5)
		   amplifyTime -=0.5;
	}
	amplifyTimeField.innerText = amplifyTime;
	setEquipmentSize(equipmentSizeField.value,amplifyTime);
}

onSpliterClicked = function(sender,direction)
{
	var content =null;
	if(direction =="left")
		content = util.getSiblingofNode(sender,"previous");
	else
		content = util.getSiblingofNode(sender,"next");

	 util.changeNodeVisibleStatus(content);
}

showFirstHideOthers = function(first,selected,normal)
{
	if(first==null) return;
	
	//隐藏其他选项卡
	for (var i=0; i<tabSet.length; i++)
	{
		var tabName = tabSet[i];
		if (tabName != first)
		{
			document.getElementById(tabName+"Content").style.display='none';
			document.getElementById(tabName+"Button").style.backgroundColor = normal;
		}
	}
	
	//显示当前选项卡
	document.getElementById(first+"Content").style.display='block';
	document.getElementById(first+"Button").style.backgroundColor = selected;
	
	if (first == "layoutCode")
	{
		var btnName = document.getElementById("layoutCodeButton").innerText.toString().trim();
		if (btnName == "导入布局")
		{
//			document.getElementById("layoutCodeArea").innerText = "";	
			document.getElementById("layoutCodeButton").innerHTML = "&nbsp; 确定导入 &nbsp; ";
		}
		else
		{
			//生成布局文件，并且切换到布局选项卡
		
			
			
			switch(detectBrowser()){
			case "MSIE":
				layoutContent = document.getElementById("layoutCodeArea").innerText.toString();
				break;
			case "Chrome":
				layoutContent = document.getElementById("layoutCodeArea").value.toString();
				break;
			case "Safari":
				layoutContent = document.getElementById("layoutCodeArea").value.toString();
				break;
			}
			
			
			
			
			importLayout();
			
			document.getElementById("layoutCodeButton").innerHTML = "&nbsp; 导入布局 &nbsp; ";
			//切换到设计选项卡
			showFirstHideOthers('mainDesign','','lightGray');
			
		}

		
	}
	
}

addAppleControl = function(controlName,x,y)
{ 
	var str = "(" + x +"," + y + ").obj";
	var controlString = Supplier+controlName+str;
	var node = eval("new " + controlString);
	if(controlName=="EFButton" || controlName=="EFLabel" || controlName=="EFTextField")
		setNodeEditable(node);
	

	
	

	setNodeOriginAndSize(node,amplifyTime);
	

	
	//如果添加的位置超过了画布范围，就要做相应的处理
	var rflag = false;
	var bflag = false;
	var curXPos = node.style.pixelWidth + node.style.pixelLeft;
	var curYPos = node.style.pixelHeight + node.style.pixelTop;
	if (curXPos > mainBoard.style.pixelWidth)
	{
		rflag = true;
		node.style.pixelLeft = mainBoard.style.pixelWidth-node.style.pixelWidth;
	}
	if (curYPos > mainBoard.style.pixelHeight)
	{
		bflag = true;
		node.style.pixelTop = mainBoard.style.pixelHeight-node.style.pixelHeight;
	}

	
	
	mainBoard.appendChild(node);

	isAdd = false;
	node.property.eId=controlName+controlIndex++;
	node.property.eParent="self"; //modify when drag to another container
	
	var gridCell = null;
	
	if (controlName == "EFGrid")
	{
		ifBelongGrid = false;
		gridCell = eval("new AppleEFGridCell().obj");
		setNodeOriginAndSize(gridCell,amplifyTime);
	}
	if (gridCell != null)
	{
		node.appendChild(gridCell);
		node.property.haveChild="true";
		gridCell.property.eId=node.property.eId+"Cell";
		gridCell.property.eParent=node.property.eId;
	}
	
	return [node,rflag,bflag];
}

//added by shaohuan
//添加Android控件
addAndroidControl = function(controlName,x,y)
{ 
	var str = "(" + x +"," + y + ").obj";
	var controlString = Supplier+controlName+str;
	var node = eval("new " + controlString);
	
    setNodeOriginAndSize(node,amplifyTime);
    
  //如果添加的位置超过了画布范围，就要做相应的处理
	var rflag = false;
	var bflag = false;
	var curXPos = node.style.pixelWidth + node.style.pixelLeft;
	var curYPos = node.style.pixelHeight + node.style.pixelTop;
	if (curXPos > mainBoard.style.pixelWidth)
	{
		rflag = true;
		node.style.pixelLeft = mainBoard.style.pixelWidth-node.style.pixelWidth;
	}
	if (curYPos > mainBoard.style.pixelHeight)
	{
		bflag = true;
		node.style.pixelTop = mainBoard.style.pixelHeight-node.style.pixelHeight;
	}
	
    mainBoard.appendChild(node);

	isAdd = false;
	node.property.eId=controlName+controlIndex++;
	node.property.eParent="self"; //modify when drag to another container
	
	var gridCell = null;
	if (controlName == "EFGrid")
	{
		ifBelongGrid = false;
		gridCell = eval("new AndroidEFGridCell().obj");
		setNodeOriginAndSize(gridCell,amplifyTime);
		
	}
	
	if (gridCell != null)
	{
		node.appendChild(gridCell);
		node.property.haveChild="true";
		gridCell.property.eId=node.property.eId+"Cell";
		gridCell.property.eParent=node.property.eId;
	}
	
	return node;

}


setNodeEditable = function(node)
{
	node.ondblclick = function()
	{
		var text  = node.innerText;

		var input = document.createElement("input");
		input.type="text";
		input.value = text;
		input.style.pixelWidth = node.style.pixelWidth-5;
		if(node.childNodes.length>0)
			node.removeChild(node.childNodes[0]);
		node.appendChild(input);
		input.focus();
		editStatus = true;
		input.onblur = function()
		{
			if(node.childNodes.length>0)
				node.removeChild(node.childNodes[0]);
			node.innerText = input.value;
			node.property["eValue"] = input.value;
			propertySetter.propertyInputNodeList["eValue"].value = input.value;
			editStatus = false;
		};
		
		//添加回车事件，回车键时，编辑完成
		input.onkeydown = function()
		{
			var code;
			if(!e)  
		    {   
				var e = window.event; 
				code = e.keyCode||e.which||e.charCode;
				if(code == 13)   //如果是回车键的话，编辑完成
				{
					if(node.childNodes.length>0)
						node.removeChild(node.childNodes[0]);
					node.innerText = input.value;
					node.property["eValue"] = input.value;
					propertySetter.propertyInputNodeList["eValue"].value = input.value;
					editStatus = false;
				}   
		    }  
		};
	}
}
	
editFinished = function(node,input)
{
	if(node.childNodes.length>0)
		node.removeChild(node.childNodes[0]);
	node.innerText = input.value;
	node.property["eValue"] = input.value;
	propertySetter.propertyInputNodeList["eValue"].value = input.value;
	editStatus = false;
		
}

//added by shaohuan
//判断画布中是否有容器
ifContainerExist = function()
{
	var nodes = mainBoard.childNodes;
	var gridCount = 0;
	for (var i=0; i<nodes.length; i++)
	{
		
		if (nodes[i].isContainer == true)
			return true;
		else if(nodes[i].property!=null && nodes[i].property.type=="EFGrid")
			gridCount++;
	}
	if (gridCount==1 && ifBelongGrid)
		return true;
	if (gridCount > 1)
		return true;
	return false;
}



controlDragStyle = function(sender)
{
	if (sender.property==null || sender.property.width==null || sender.property.height==null)
		return;
	
//	//added by shaohuan
//	//如果是EFGridCell，则只能对其进行向下拖动的操作
//	var cellType = Supplier+"EFGridCell";
	if (sender.property.type == "EFGridCell")
	{
		if(window.event.offsetY>(sender.property.height * amplifyTime-3))
		{
			sender.style.cursor="s-resize";
			dragType = "s";
			return;
		}
	}
	
	
	if(window.event.offsetX>(sender.property.width * amplifyTime-3)&&
        window.event.offsetY>(sender.property.height * amplifyTime-3))
	{
        
		sender.style.cursor="se-resize";
        
		dragType = "se";
    
	}
	else if(window.event.offsetX>(sender.property.width * amplifyTime-3))
    
	{
        
		sender.style.cursor="e-resize";
        
		dragType = "e";
    
	}
	else if(window.event.offsetY>(sender.property.height * amplifyTime-3))
    
	{
        
		sender.style.cursor="s-resize";
        
		dragType = "s";
    
	}
	else
	{
        
		sender.style.cursor="crosshair";
        
		dragType = "ch";
    
	}

}

controlDragSize = function()
{
    
	var currentX = window.event.clientX;
	var currentY = window.event.clientY;
	
	//added by shaohuan 
	//预防出现事件捕捉并发而出现的currentDragObject等为空的情况
	if (currentDragObject==null || currentDragObject.style==null || currentDragObject.property==null) 
		return;
    
	switch (dragType)
	{
			
		case "se": 
			//added by shaohuan
			//拖动大小的过程中控制其不能超过父控件大小
			var curWidth = currentDragObject.style.pixelWidth+(currentX - orgX);
			var curXPos = curWidth + currentDragObject.style.pixelLeft;
			var parentWidth = currentDragObject.parentNode.style.pixelWidth;
			
			var curHeight = currentDragObject.style.pixelHeight+(currentY - orgY);
			var curYPos = curHeight + currentDragObject.style.pixelTop;
			var parentHeight = currentDragObject.parentNode.style.pixelHeight;
			
			
			if (curXPos <= parentWidth)
			{
				currentDragObject.style.pixelWidth = currentDragObject.style.pixelWidth+(currentX - orgX);
			}
			else
			{
				currentDragObject.style.pixelWidth = parentWidth-currentDragObject.style.pixelLeft;
			}
			if (curYPos <= parentHeight)
			{
				currentDragObject.style.pixelHeight = currentDragObject.style.pixelHeight+(currentY - orgY);
			}
			else
			{
				currentDragObject.style.pixelHeight = parentHeight-currentDragObject.style.pixelTop;
			}
	        if(currentDragObject!=null&&typeof(currentDragObject.property.width)!="undefined"&&typeof(currentDragObject.property.height)!="undefined") 
			{
	        	
	            if (eval(currentDragObject.style.pixelWidth) <= 0)
	            {
	            	currentDragObject.style.pixelWidth = 0;
	            	currentDragObject.property.width = 0;
	            }
	            	
	            
	            if (eval(currentDragObject.style.pixelHeight) <= 0)
	            {
	            	currentDragObject.style.pixelHeight = 0;
	            	currentDragObject.property.height = 0;
	            }
	            
				currentDragObject.property.width = currentDragObject.style.pixelWidth/amplifyTime;
		                
				currentDragObject.property.height = currentDragObject.style.pixelHeight/amplifyTime;
	
				propertySetter.setPropertyToField("width",currentDragObject);
		                
				propertySetter.setPropertyToNode("width",currentDragObject);
		                
				propertySetter.setPropertyToField("height",currentDragObject);
		                
				propertySetter.setPropertyToNode("height",currentDragObject);
				
			    var cell = getDragCellInGrid();
			    if (cell != null)
			    {
	        		cell.style.pixelWidth = currentDragObject.style.pixelWidth;
	        		cell.property.width = currentDragObject.property.width;
	    			propertySetter.setPropertyToField("width",cell);
	    			propertySetter.setPropertyToNode("width",cell);
			    }
	            
				
	
			}
                
				
		break;

			
		case "e": 
			var curWidth = currentDragObject.style.pixelWidth+(currentX - orgX);
			var curXPos = curWidth + currentDragObject.style.pixelLeft;
			var parentWidth = currentDragObject.parentNode.style.pixelWidth;
			if (curXPos <= parentWidth)
			{
				currentDragObject.style.pixelWidth = currentDragObject.style.pixelWidth+(currentX - orgX);
			}
			else
			{
				currentDragObject.style.pixelWidth = parentWidth-currentDragObject.style.pixelLeft;
			}
		   if(currentDragObject!=null&&typeof(currentDragObject.property.width)!="undefined") 
		  {
			currentDragObject.property.width = currentDragObject.style.pixelWidth/amplifyTime;
			
            if (eval(currentDragObject.style.pixelWidth) <= 0)
            {
            	currentDragObject.style.pixelWidth = 0;
            	currentDragObject.property.width = 0;
            }
            	
			
            
			propertySetter.setPropertyToField("width",currentDragObject);
		            
			propertySetter.setPropertyToNode("width",currentDragObject);
			
		    var cell = getDragCellInGrid();
		    if (cell != null)
		    {
        		cell.style.pixelWidth = currentDragObject.style.pixelWidth-2;
        		cell.property.width = currentDragObject.property.width-2;
    			propertySetter.setPropertyToField("width",cell);
    			propertySetter.setPropertyToNode("width",cell);
		    }
            

		}
				
		break;

			
		case "s": 
			var curHeight = currentDragObject.style.pixelHeight+(currentY - orgY);
			var curYPos = curHeight + currentDragObject.style.pixelTop;
			var parentHeight = currentDragObject.parentNode.style.pixelHeight;
			
			
			if (curYPos <= parentHeight)
			{
				currentDragObject.style.pixelHeight = currentDragObject.style.pixelHeight+(currentY - orgY);
			}
			else
			{
				currentDragObject.style.pixelHeight = parentHeight-currentDragObject.style.pixelTop;
			}

			 if(currentDragObject!=null&&typeof(currentDragObject.property.height)!="undefined") 
			{
				currentDragObject.property.height = currentDragObject.style.pixelHeight/amplifyTime;
				
	            if (eval(currentDragObject.style.pixelHeight) <= 0)
	            {
	            	currentDragObject.style.pixelHeight = 0;
	            	currentDragObject.property.height = 0;
	            }
	            	
	            
				propertySetter.setPropertyToField("height",currentDragObject);
		                
				propertySetter.setPropertyToNode("height",currentDragObject);
	
			}
				
			break;
			default :
	}
	

}


//added by shaohuan
//得到EFGrid里面的EFGridCell
getCellInGrid = function(node)
{
	if (node==null || node.property==null || node.property.type==null)
		return null;
	if (node.property.type == "EFGrid")
	{
		//获取EFGridCell
		var nodes = node.childNodes;
		for (var i=0; i<nodes.length; i++)
		{
			var c = nodes[i];
			if (c.property!=null && c.property.type!=null && c.property.type=="EFGridCell")
				return c;
		}
	}
	
	return null;

}

//added by shaohuan
//在拖动EFGrid的过程中只改变Grid里面的宽度
getDragCellInGrid = function()
{
	if (currentDragObject==null || currentDragObject.property==null)
		return null;
	var type = currentDragObject.property.type;
	if (type == "EFGrid")
	{
		//获取EFGridCell
		var nodes = currentDragObject.childNodes;
		for (var i=0; i<nodes.length; i++)
		{
			var c = nodes[i];
			if (c.property!=null && c.property.type!=null && c.property.type=="EFGridCell")
				return c;
		}
		        		
	}
	return null;	
}


//得到OBJ在屏幕中的绝对位置
function findPos(obj) {
	var curleft = curtop = 0;
	while(obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
			obj = obj.offsetParent
	}
	return [curleft,curtop];
}


panelOnMouseDown = function(e)
{
	 //IE下不传递event对象，所以要重新赋值
    if (e == null) 
        e = window.event; 
    
    // IE下用srcElement，其他浏览器下用target
    var target = e.target != null ? e.target : e.srcElement;
    
    //IE下，鼠标左键单击是 1
    //火狐和其他浏览器下是0
    if ((e.button == 1 && window.event != null ||   e.button == 0) && (target.className=='controlSurface'))
    {    	
    	util.$('dragger').title = target.title;
    	util.$('dragger').style.backgroundImage =  "url(img/"+target.title+"_choose.png)";
    	
    	util.$('dragger').style.display = "";
    	util.$('dragger').style.left = e.clientX + 'px';
    	util.$('dragger').style.top = e.clientY + 'px';
    	
        
        _startX = event.clientX-util.$('dragger').offsetLeft;  
        _startY = event.clientY-util.$('dragger').offsetTop; 
        
    	target = util.$('dragger');
    	
        //将拖动对象的DIV置于最上层
        _oldZIndex = target.style.zIndex;
        target.style.zIndex = 10000;
        
        //拖拽对象
        _dragElement = target;

        //添加鼠标MOVE和UP事件
        document.onmousemove = OnMouseMove;
        document.onmouseup = OnMouseUp;
        
        // 相当于文字选中
        document.body.focus();

        // 阻止IE下选择文字
        document.onselectstart = function () { return false; };
        // 在IE下使其不能拖动图片
        target.ondragstart = function() { return false; };
        
        //阻止其他IE浏览器下的文字选中
        return false;
    }

}


function OnMouseMove(e)
{
    if (e == null) 
        var e = window.event; 
    _dragElement.style.left = ( e.clientX - _startX) + 'px';
    _dragElement.style.top = ( e.clientY - _startY) + 'px';

}


function OnMouseUp(e)
{
    if (_dragElement != null)
    {
        _dragElement.style.zIndex = _oldZIndex;
        
        _dragElement.style.display = "none";
        document.onmousemove = null;
        document.onselectstart = null;
        _dragElement.ondragstart = null;

  	  //此时知道dragger在浏览器中的位置
  	  //需要减去board在浏览器中的位置，就是它在board中的位置 
  	  var posIE = findPos(mainBoard);
  	  var posXInBoard = e.clientX - posIE[0];
  	  var posYInBoard = e.clientY - posIE[1];
  	  
  
      
      var posRight = posIE[0]+mainBoard.style.pixelWidth;
      var posBottom = posIE[1]+mainBoard.style.pixelHeight;
      
//      alert(_dragElement.style.pixelLeft + "  " + _dragElement.style.pixelTop +"\n" + _dragElement.style.pixelWidth + " " +_dragElement.style.pixelHeight);
      if (posXInBoard>mainBoard.style.pixelWidth || posYInBoard>mainBoard.style.pixelHeight)
    	  return;

	  if (posXInBoard<0 || posYInBoard<0)
  		  return;
	  
	  
	  //寻找目标容器
      targetContainer = mainBoard;   //目标容器的初始化
		
      //先添加到画布上去
      var result = addControl(posXInBoard/amplifyTime,posYInBoard/amplifyTime);
      var node = result[0];
//      alert(node.style.pixelLeft + "  " + node.style.pixelTop +"\n" + node.style.pixelWidth + " " +node.style.pixelHeight);
      
      currentDragObject = node;
      getTargetContainer(mainBoard);
//      alert("我 " + node.style.pixelLeft + "  " + node.style.pixelTop +"\n" + node.style.pixelWidth + " " + node.style.pixelHeight);
      
//      alert("找到目标容器");
		
 	 //如果找到了目标容器，则需要将当前拖拽对象添加到目标容器上
 	  if (targetContainer != mainBoard) 
 	 {
 		
	    node.style.display = "none";
 		  
  	     //然后计算当前拖拽对象在目标容器中的相对位置	
        // 此时可能出现要添加的控件的像素位置在ADDCONTROL的时候进行了二次调整，因此需要判断一下
	    var pixelPosX = posXInBoard - eval(getPixelLeftInBoard(targetContainer));
	    var pixelPosY =  posYInBoard - eval(getPixelTopInBoard(targetContainer)); 
	    if (result[1] == true)
	    {
	    	node.style.pixelLeft = targetContainer.style.pixelWidth - node.style.pixelWidth;
	    	pixelPosX = eval(getPixelLeftInBoard(node)) - eval(getPixelLeftInBoard(targetContainer));
	    }
	    if (result[2] == true)
	    {
	    	node.style.pixelRight = targetContainer.style.pixelHeight - node.style.pixelHeight;
	    	pixelPosY =   eval(getPixelTopInBoard(node)) - eval(getPixelTopInBoard(targetContainer)); 
	    }
	 
		
	    node.property.x = pixelPosX/amplifyTime;
	    node.property.y = pixelPosY/amplifyTime;
	    setNodeOriginAndSize(node,amplifyTime);
	    
        
		//从画布中剔除
        mainBoard.removeChild(node);
			
        node.style.display = "";
    	targetContainer.appendChild(node);
//    	alert(node.style.pixelLeft + "  " + node.style.pixelTop +"\n" + node.style.pixelWidth + " " +node.style.pixelHeight);
        //添加到目标容器中去
    
        
        if(targetContainer.className=="control")
        {
            node.property.eParent=targetContainer.property.eId;
            targetContainer.property.haveChild="true";
        }  
        
//        alert(node.style.pixelLeft + "  " + node.style.pixelTop +"\n" + node.style.pixelWidth + " " +node.style.pixelHeight);
        
 	 }
  	  
      //拖动结束 
      _dragElement = null;
	  //拖拽完毕，将当前拖拽对象置为空
	  currentDragObject = null;
	  targetContainer = null;
        
    }
}

function addControl(x,y)
{
        //生成控件
	    var controlName = util.$('dragger').title;
		if (Supplier == "Apple")
		{
			
			return addAppleControl(controlName,x,y);
		}
		else
		{
			return addAndroidControl(controlName,x,y);
		}
}



boardOnMouseDown = function(e)
{
	 if (e == null) 
	       e = window.event; 
	    
	 // IE uses srcElement, others use target
	 var target = e.target != null ? e.target : e.srcElement;
	
	if(window.event.srcElement!=null)
	{
		//added by shaohuan
		//如果文本类控件处于编辑状态，则不予相应
		if(editStatus==true)
			return;
		
		//固定当前鼠标形状
		sender = window.event.srcElement;
		
		//不让拖动画布
		if (sender.className=="canvas")
			return;
		if (sender.tagName == "IMG"){
			sender = sender.parentNode;
		}
		
		controlDragStyle(sender);
		freezeCursor = true;
		
//		var cellType = Supplier+"EFGridCell";
        if (sender.property!=null && sender.property.type!=null && sender.property.type=="EFGridCell")
   	    {
            currentSelectedControl = window.event.srcElement;
        	//点击面板内元素，生成右侧属性
			propertySetter.setPropertyFromControlNode(window.event.srcElement);
   		   if (dragType != "s")
   			 return;
   	    }
        
		
		if(sender.className=="control"||sender.className=="controlItem" )
		{
			//如果鼠标点击是不同对象的时候
			if (sender!=currentDragObject && sender.className=="control")
			{
				if (currentDragObject!=null)
				{
					if (currentDragObject.isContainer )
					{
						currentDragObject.style.borderColor = "#1880c9";
						currentDragObject.style.borderWidth ="1px";
					}
					else{
						currentDragObject.style.borderColor = "#ffffff";
						currentDragObject.style.borderWidth ="1px";
					}
					currentDragObject.style.zIndex = 1;
				}
				currentDragObject = sender;	
				currentDragObject.style.zIndex = 2;
				sender.style.borderColor = "#1880c9";
				sender.style.borderWidth = "2px";
			}
			
		}
		
		
		dragBegin = true;
		orgX = window.event.clientX;
		orgY = window.event.clientY;

		if(sender.className=="control")
		{
			currentSelectedControl = sender;

            if(typeof(currentSelectedControl.property.onClick) != "undefined")
			{
             document.getElementById("controlType").value=currentSelectedControl.property.onClick; //switch tab event value
			}
			else
			{
             document.getElementById("controlType").value="";
			}
			

            //点击面板内元素，生成右侧属性
			propertySetter.setPropertyFromControlNode(sender);
		}
	}
}

bodyOnMouseOver = function()
{
	if (this.className=="control" && this!=currentDragObject)
	{
	    this.style.borderColor = "#1880c9";
	    this.style.borderWidth ="1px";
	}
}

bodyOnMouseOut = function()
{
	
	if (this.className=="control" && this.isContainer!=true && this!=currentDragObject)
	{
		this.style.borderWidth = "1px";
		if (this.property.type != "EFGrid")
		{
	      this.style.borderColor = "#ffffff";
	     
		}
	}else if(this.className=="control" && this.isContainer==true && this!=currentDragObject){
		this.style.borderColor = "#1880c9";
		this.style.borderWidth = "1px";
	}
}

controlTreeOnMouseMove = function()
{
	
   if (window.event.srcElement.tagName == "IMG")
   {
	   
//    	var control = window.event.srcElement;
//		control.src = "img/zoomOut.png";
   }
}
bodyOnMouseMove = function()
{		
	hint.innerHTML = (window.event.offsetX)+' '+ (window.event.offsetY);
    
	//如果文本类控件处于编辑状态，则需要屏蔽鼠标响应事件
	if (editStatus == true)
		return;
    if(this.className=="control"){
    	//added by shaohuan
    	//如果鼠标已经按下，则鼠标形状就不需要改变，若没有按下，则需要根据鼠标的位置来改变形状
    	if (!freezeCursor)
    	{
    		controlDragStyle(this);
    	}
    }
    
    
	if(dragBegin && currentDragObject!=null)
	{
        var currentX = window.event.clientX;
        var currentY = window.event.clientY;
        
        
        //鼠标是十字形，进行拖动
        if(dragType=="ch"){        	          
        	if (currentDragObject.tagName == "IMG")
        		currentDragObject = currentDragObject.parentNode;
        	
            currentDragObject.style.pixelLeft += currentX - orgX;
            currentDragObject.style.pixelTop += currentY - orgY;
            
            var parentNode = currentDragObject.parentNode;
            
            if (parentNode == mainBoard)
            {
                if(currentDragObject.style.pixelLeft < 0) currentDragObject.style.pixelLeft = 0;
                if(currentDragObject.style.pixelTop < 0) currentDragObject.style.pixelTop = 0;
            }
            

            if(currentDragObject.className == "control")
            {
                currentDragObject.property.x =  currentDragObject.style.pixelLeft / amplifyTime ;
                currentDragObject.property.y =  currentDragObject.style.pixelTop / amplifyTime ;
                
                keepControlInBoard(currentDragObject);
                
      
                propertySetter.setPropertyToField("x",currentDragObject);
                propertySetter.setPropertyToField("y",currentDragObject);
                               
            }
        }
        else
        {
        	//相当于拖动结束
            controlDragSize();
        }
        orgX = currentX;
        orgY = currentY;
	}
}


keepControlInBoard =  function(control)
{
	var node = control.parentNode;
	
	//added by shaohuan
	//2012-02-10
	
	//这是两个临界值，若超出画布范围时替换使用
	var leftOff = mainBoard.clientWidth - control.clientWidth;
	var TopOff =  mainBoard.clientHeight - control.clientHeight;
	
	//得到容器的距离
	var parentNode = control.parentNode;
	if (parentNode == mainBoard)
	{
		if(control.style.pixelTop > TopOff) control.style.pixelTop = TopOff;
		if(control.style.pixelLeft > leftOff) control.style.pixelLeft = leftOff;
		return;
	}
	
	var disPIB_X = eval(getPixelLeftInBoard(parentNode));
	                        
	var disPIB_Y = eval(getPixelTopInBoard(parentNode));
	
	if (control.style.pixelLeft > 0)
	{
		var temp = control.style.pixelLeft+disPIB_X;
		if (temp > leftOff)
		{
			control.style.pixelLeft = leftOff-disPIB_X;
		}
	}

	if (control.style.pixelTop > 0)
	{
		var temp = control.style.pixelTop+disPIB_Y;
		if (temp > TopOff)
		{
			control.style.pixelTop = TopOff-disPIB_Y;
		}
	}
	
	if (control.style.pixelLeft < 0)
	{
		if (Math.abs(control.style.pixelLeft) > disPIB_X)
		{
			control.style.pixelLeft = -disPIB_X;
		}
	}
	
	if (control.style.pixelTop < 0)
	{
		if (Math.abs(control.style.pixelTop) > disPIB_Y)
		{
			control.style.pixelTop = -disPIB_Y;
		}
	}

}



//added by shaohuan
//递归得到目标容器
getTargetContainer = function(control)
{
	//画布中的元素类型有几类：1.容器 2.EFGrid 3.非容器 
	//EFGrid是一个杂交体，它本身不是容器，但是与它唯一绑定的EFGridCell是容器，可以往里面拖控件， 所以
    //EFGrid既是容器，又是非容器
	//以下代码中处理了这3种情况。
	
	//针对每一个node进来，都要先判断它本身是不是容器，是容器的话，它是不是包含了当前的拖拽对象，如果包含了，则需要替换目标容器
	var nodes = control.childNodes;	
	if (control == currentDragObject)
		return;
	 if (control.isContainer==true)   //对应于1类：容器
	 {
		if (ifContain(control))  //判断control是否包含当前拖拽对象，如果包含，则替换目标容器targetContainer
		{
			targetContainer = control;
		}
		
		if (nodes.length == 0)
			return;
		//接着要做的事情是循环递归遍历control的子节点
		for (var i=0; i<nodes.length; i++)
		{
			getTargetContainer(nodes[i]);
		}
     }else if(control == mainBoard){ //如果本身为画布，则直接遍历
		if (nodes.length == 0)
			return;
		 for (var i=0; i<nodes.length; i++)
	     {
			getTargetContainer(nodes[i]);
		 }
     }else if(control.isContainer!=true && control.property!=null && control.property.type=="EFGrid"){ //对应于第2类：EFGrid
	    	//若当前control不是容器，但它若是EFGrid的时候，它本身也可以是目标容器
			var cell = getCellInGrid(control);
			if (cell!= null && ifContain(cell)) 
			{
				targetContainer = cell;
			}
			
			//因为cell是容器，所以也要遍历cell
			var nodesInCell = cell.childNodes;
			for (var c=0; c<nodesInCell.length; c++)
			{
				getTargetContainer(nodesInCell[c]);
			}
	     }	
}


bodyOnMouseUp = function(e)
{
		dragBegin = false;
//		added by shaohuan
//		当鼠标起来之后，释放对鼠标的冻结，此时可以释放对鼠标的冻结
		freezeCursor = false;

		//拖控件是一个先出后入或者先入后出的过程，准确地说是一个先出后入的过程，因为初始化的时候它也必在一个容器Board上
		if (dragType == "ch" && mainBoard!=null)
		{
			if (currentDragObject!=null)
			{	
	            if (currentDragObject.property==null || currentDragObject.style==null)
	            	return;
	            	
	            
	            if (currentDragObject.className!="canvas" && currentDragObject.className!="control")
	            	return;
	        
//	            var cellType = Supplier+"EFGridCell";
	            if (currentDragObject.property.type == "EFGridCell")
	            	return;
	            
		        //移动后，判断是否已经移出原有的容器
	            var parentNode = currentDragObject.parentNode;
	            
	            if (parentNode == null)
	            	return;
	          
	            var leftOff = currentDragObject.parentNode.clientWidth - currentDragObject.clientWidth;
	        	var TopOff = currentDragObject.parentNode.clientHeight - currentDragObject.clientHeight;
	        	
	        	//如果父容器控件不是mainBoard，并且没有出父容器控件，则直接返回
	        	//这里需要处理一下，它可能没有出父控件，但是它可以进入父控件里面的一个容器控件
		        
		        //寻找目标容器
			    targetContainer = mainBoard;   //目标容器的初始化
			    getTargetContainer(mainBoard);

				
				
	        	//若目标容器和父容器相同，则直接返回
	        	if (targetContainer == parentNode) //说明没有拖拽出原有的父控件，直接返回，啥也不干
	        	{
	        		return;
	        	}
	        	
	        	
	        	//若不相同，则需从原容器中将控件移除，然后坐标转换，最后添加到目标容器中去

				
				//出了原有的容器进入到了新的容器中，则需将控件的像素的相对于面板的绝对位置置换为容器中的位置
		       
	            //然后计算当前拖拽对象在目标容器中的相对位置	
	        	currentDragObject.style.pixelLeft = eval(getPixelLeftInBoard(currentDragObject))-eval(getPixelLeftInBoard(targetContainer));        	
			    currentDragObject.style.pixelTop =  eval(getPixelTopInBoard(currentDragObject))-eval(getPixelTopInBoard(targetContainer));
		        
			    //由像素位置得到坐标位置
	            currentDragObject.property.x =  currentDragObject.style.pixelLeft / amplifyTime ;
	            currentDragObject.property.y =  currentDragObject.style.pixelTop / amplifyTime ;
	            
	            
				//先要从原有容器上移除
				if (parentNode != null)
				{
					parentNode.removeChild(currentDragObject);
				}
				
	            //添加到目标容器中去
	            targetContainer.appendChild(currentDragObject);
	            if(targetContainer.className=="control")
	            {
	              currentDragObject.property.eParent=targetContainer.property.eId;
	              targetContainer.property.haveChild="true";
	            }
	            else if(targetContainer==mainBoard)
	            {
	            	 currentDragObject.property.eParent="self";
	                 //targetContainer.property.haveChild="true";
	            }            
	            
	            propertySetter.setPropertyToField("x",currentDragObject);
	            propertySetter.setPropertyToField("y",currentDragObject);
			}
			
		
		   //拖拽完毕，将当前拖拽对象置为空
		   currentDragObject = null;
		   targetContainer = null;
		   orgX = -1;
		   orgY = -1;
		}
}


//added by shaohuan
//得到控件在画布中距左边位置
function getPixelLeftInBoard(node)
{
	if (node==null || node.style==null)
		return 0;
	//若传过来的参数节点是画布本身，那画布相对于自身，像素为止肯定为0了
	if (node == mainBoard)
		return 0;
	var posLeft = node.style.pixelLeft;
	
	var parent = node.parentNode;
	while (parent != mainBoard)
	{
		posLeft = posLeft+parent.style.pixelLeft;
		parent = parent.parentNode;
	}

	return posLeft;

}

//added by shaohuan
//得到控件在画布中距上边位置
function getPixelTopInBoard(node)
{
	if (node==null || node.style==null)
		return 0;
	if (node == mainBoard)
		return 0;
	var posTop = node.style.pixelTop;
	var parent = node.parentNode;
	while (parent != mainBoard)
	{
		posTop = posTop+parent.style.pixelTop;
		parent = parent.parentNode;
	}
	
	return posTop;
}




//added by shaohuan
//此代码为备用，针对两控件A和B的坐标都为绝对坐标时的情况
function rectOverlap(A, B)  
{  

	if (A==null || B==null)
		return true;
	if (A.property==null || B.property==null)
		return true;
	if (A.property.x==null || A.property.y==null || B.property.x==null || B.property.y==null)
		return true;
    var xOverlap =  valueInRange(A.property.x, B.property.x, B.property.x + eval(B.property.width)) ||  
                    valueInRange(B.property.x, A.property.x, A.property.x + eval(A.property.width));  
    var yOverlap =  valueInRange(A.property.y, B.property.y, B.property.y + eval(B.property.height)) ||  
                    valueInRange(B.property.y, A.property.y, A.property.y + eval(A.property.height));  
    return xOverlap && yOverlap;  
}  

function valueInRange(value, min, max)  
{  
	return (value <= max) && (value >= min);  
}  




//added by shaohuan 
//判断容器是否包含当前拖拽的对象CurrentDragObject
ifContain = function(container)
{
    if (container == mainBoard)
    {
    	return true;
    }
    
	if (currentDragObject==null || currentDragObject.property==null)
		return false;
	if (currentDragObject.property.x==null || currentDragObject.property.y==null)
		return false;
    
	
	
	var x1 = eval(getPixelLeftInBoard(container))/ amplifyTime;
	var y1 = eval(getPixelTopInBoard(container))/ amplifyTime;
	var x1w = eval(container.property.width);
	var y1h = eval(container.property.height);
    
	var x2 = eval(getPixelLeftInBoard(currentDragObject))/ amplifyTime;
	var y2 = eval(getPixelTopInBoard(currentDragObject))/ amplifyTime;
	var x2w = eval(currentDragObject.property.width);
	var y2h = eval(currentDragObject.property.height);
	
	var x1right = x1+x1w;
	var x2right = x2+x2w;
	var y1bottom = y1+y1h;
	var y2bottom = y2+y2h;
	
	if (x1<=x2 && y1<=y2 && x1right>=x2right && y1bottom>=y2bottom)
		return true;
	return false;

}

//added by shaohuan
//控件的属性改变后按回车键时
propertyEnterChanged = function(sender)
{
	var code;
	if(!e)  
    {   
		var e = window.event; 
		code = e.keyCode||e.which||e.charCode;
		if(code == 13)
		{
			propertyChanged(sender);
		}   
    }  

}
propertyChanged= function(sender)
{
	if(currentSelectedControl!=null)	
	{
		sender = window.event.srcElement;
		switch (sender.id)
		{
			case "x":
				//added by shaohuan，设置的坐标的可能不合法
				var newValue = eval(sender.value)*amplifyTime;
				var parent = currentSelectedControl.parentNode;
				var leftoff = eval(parent.clientWidth)-eval(currentSelectedControl.clientWidth);
				if (newValue > leftoff)
				{
					sender.value = currentSelectedControl.property.x;
				}
				else
				{
					propertySetter.setPropertyToNode("x",currentSelectedControl);
					currentSelectedControl.style.pixelLeft = currentSelectedControl.property.x * amplifyTime;
				}

				break;

			case "y": 
				var newValue = eval(sender.value)*amplifyTime;
				var parent = currentSelectedControl.parentNode;
				var topoff = eval(parent.clientHeight)-eval(currentSelectedControl.clientHeight);
				if (newValue > topoff)
				{
					sender.value = currentSelectedControl.property.y;
				}
				else
				{
					propertySetter.setPropertyToNode("y",currentSelectedControl);
					currentSelectedControl.style.pixelTop = currentSelectedControl.property.y * amplifyTime;
				}

				break;

			case "width": 
				var newValue = eval(sender.value)*amplifyTime;
				var parent = currentSelectedControl.parentNode;
				var maxWidth = eval(parent.clientWidth);
				var leftoff = newValue+currentSelectedControl.style.pixelLeft;
				if (leftoff > maxWidth)
				{
					sender.value = currentSelectedControl.property.width;
				}
				else
				{
					propertySetter.setPropertyToNode("width",currentSelectedControl);
					currentSelectedControl.style.pixelWidth = currentSelectedControl.property.width * amplifyTime;
				}

				break;

			case "height": 
				var newValue = eval(sender.value)*amplifyTime;
				var parent = currentSelectedControl.parentNode;
				var maxHeight = eval(parent.clientHeight);
				var topoff = newValue+currentSelectedControl.style.pixelTop;
				if (topoff > maxHeight)
				{
					sender.value = currentSelectedControl.property.height;
				}
				else
				{
					propertySetter.setPropertyToNode("height",currentSelectedControl);
					currentSelectedControl.style.pixelHeight = currentSelectedControl.property.height * amplifyTime;
				}

				break;
				
			case "eValue":
				currentSelectedControl.innerText = sender.value;
				currentSelectedControl.property["eValue"] = sender.value;
				break;
			default :
				propertySetter.setPropertyToNode(sender.id,currentSelectedControl);
		}
		
	}
}

function del()
{
	var currKey=0,CapsLock=0,e=e||event;
	currKey=e.keyCode||e.which||e.charCode;
	if((currKey == 8 || currKey == 46) && currentSelectedControl!=null)
	{
		//modified by shaohuan
		if (currentSelectedControl.property.type=="EFGridCell")
			return;
		if(editStatus == true)          //如果文本类的控件处于编辑状态，则需要屏蔽退格键和DELETE键
			return;
		var parent = currentSelectedControl.parentNode;
		parent.removeChild(currentSelectedControl);
	}
}



function generateSingleJson (row)
{
	if(row.className!="control")
		return "";
	var rowText = new Array();
	

	rowText.push('{');

	for(var attr in row.property)
	{
		if(attr=="group") continue;
		rowText.push(attr +':' + '"'+ row.property[attr] +'",');
	}
	
	rowText.push('}');
    rowText.push(',');
	
	
	if(typeof(row.property.haveChild)!="undefined"&&row.property.haveChild=="true")
	{
	   var rowNodes=row.childNodes;
	   for(var i=0;i<rowNodes.length;i++)
	   {
		   rowText.push(generateSingleJson(rowNodes[i]));
	   }
	}
	rowText = rowText.join("")
	return rowText;
	
}

generateJsonString = function()
{
	var	nodes = mainBoard.childNodes;
	var blockText = new Array();
	blockText.push('{"block":{');
	blockText.push('"rows":[');

	for(var i=0;i<nodes.length;i++)
	{
		var row = nodes[i];
		if(row.className!="control") continue;
		var rowText = new Array();
		rowText.push(generateSingleJson(row));
		blockText.push(rowText);
		
	}

	blockText = blockText.join("");
	blockText=blockText.substr(0,blockText.length-1);
	
	blockText+=']}}';    
    return blockText;
}

setEvent2Control = function()
{

 currentSelectedControl.property.onClick=document.getElementById("controlType").value;//event value 2 control

}

generateCode = function()
{
	var xmlHttp;

	if(window.XMLHttpRequest)
		xmlHttp = new XMLHttpRequest();
	else 
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

	xmlHttp.onreadystatechange = function()
	{
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
			document.getElementById("mainCodeArea").innerText = xmlHttp.responseText;
		else
			document.getElementById("mainCodeArea").innerText = "get data error!!";
	}
	
	var jsonCode=generateJsonString();
	
	
	var postdata=encodeURI(encodeURI(jsonCode));
	var equipment=equipmentField.value;
//	xmlHttp.open("POST","http://168.2.238.46:8088/CodeGenerator/CodeGenerateServlet",true);
	xmlHttp.open("POST","http://10.25.10.6:8088/PlatDemo/CodeGenerateServlet",true);
	xmlHttp.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" ); 
	xmlHttp.send('code='+postdata+'&equipment='+equipment);
	document.getElementById("mainCodeArea").innerText = "getting data!" +"<br/>"; 
	
}
