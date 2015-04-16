function getAppleControlList()
{
	var group = new Array();

	group[0] = "Container";
	group[1] = "Single";
	group[2] = "Multiple";

	group[group[0]]  = new Array();
	group[group[1]]  = new Array();
	group[group[2]]  = new Array();
	
	group[group[0]].push("EFView");
	if(deviceType=="iPad")
	{
		group[group[0]].push("EFDetailView");
	}

	group[group[0]].push("EFForm");
	
	group[group[1]].push("EFLabel");
	group[group[1]].push("EFButton");
	group[group[1]].push("EFTextField");
	group[group[1]].push("EFCheckBox");
	group[group[1]].push("EFComboBox");
	group[group[1]].push("EFTextArea");
	group[group[2]].push("EFGrid");

	return group;
}

//added by shaohuan
//构造Android控件树
function getAndroidControlList()
{
	var group = new Array();

	group[0] = "Container";
	group[1] = "Single";
	group[2] = "Multiple";

	group[group[0]]  = new Array();
	group[group[1]]  = new Array();
	group[group[2]]  = new Array();
	
	group[group[0]].push("LinearLayout");
	group[group[0]].push("EFView");
	group[group[0]].push("EFForm");
	
	group[group[1]].push("EFLabel");
	group[group[1]].push("EFButton");
	group[group[1]].push("EFTextField");
	group[group[1]].push("EFCheckBox");
	group[group[1]].push("EFComboBox");
	group[group[1]].push("EFTextArea");
	
	//EFGrid是一个杂交体
	group[group[2]].push("EFGrid");

	return group;
}


function generateControlList()
{
	var controlContent = document.getElementById("controlContent");
	controlContent.innerHTML = ""; 
	controlContent.style.border = "1px";
	controlContent.style.margin = "0px 3px 0px 3px";
//	controlContent.style.solid = "#CACACA";
//	controlContent.style.border.style="#CACACA";
	var groups = null;
    if (deviceType=="iPad" || deviceType=="iPhone")
    {
    	iconType = "Apple";
        groups = getAppleControlList();
    
    } else if (deviceType=="aPad" || deviceType=="aPhone")
    {
    	iconType = "Android";
        groups = getAndroidControlList();    	
    }else{
    	return;
    }
    
	for(var i=0;i<groups.length;i++)
	{
		var group =  groups[i];
		var groupDiv = document.createElement("div");
		groupDiv.className = "horizontalLine";
		groupDiv.innerText = " - "+groups[i];
		groupDiv.style.backgroundImage = "url(img/ltreetitle_bg.png)";
		groupDiv.style.pixelWidth = 180;
		groupDiv.style.pixelHeight = 23;
		groupDiv.onclick = onRowClicked;
		groupDiv.style.margin = "2px 0px 0px 0px";
//		groupDiv.style.margin = "3px 3px 0px 3px";
		
		groupDiv.style.float = "left";
		
		
		groupDiv.align = "left";
		groupDiv.style.fontSize = "15px";
		
		controlContent.align = "left";
		
		
		controlContent.appendChild(groupDiv);
		
	

		for(var j=0;j<groups[groups[i]].length;j++)
		{
			var controlDiv = document.createElement("div");

			controlDiv.className = "controlItem";
			controlDiv.style.borderTopWidth = 0;
			controlDiv.style.pixelWidth = 178;
			controlDiv.style.pixelHeight = 45;
			controlDiv.style.fontSize = "14px";
			
			controlDiv.style.postion = "absolute";
			
			controlDiv.id = controlDiv.title = groups[groups[i]][j];
			
			controlDiv.style.solid = 0;
			
			controlDiv.style.float = "left";
			
		
			var img = document.createElement("img");
			img.src = "img/"+groups[groups[i]][j]+".png";
			img.align = "center";
			img.style.margin = " 5px 8px 0px 12px ";
			img.style.zIndex = "0"
		    img.style.float = "left";		
         
//			controlDiv.style.verticalAlign  = "middle";
			
			controlDiv.innerHTML =  img.outerHTML + groups[groups[i]][j];


			
			var mDiv = document.createElement("div");
			mDiv.className = "controlSurface";
			mDiv.title = groups[groups[i]][j];
			
			//为了使文字居中
			controlDiv.style.lineHeight = "45px";
			mDiv.style.margin = "-45px 0px 0px 0px";
			if (detectBrowser() == "MSIE")
			{
				mDiv.style.backgroundColor = "#ff0000";
			}

			
			controlDiv.appendChild(mDiv);
			controlContent.appendChild(controlDiv);
			
		}
	}

}


function bodyOnDragStart()
{
	alert("Jesus Christ");
}

function ifHighlight(controlName)
{
	if (controlName=="EFView"|| controlName=="EFDetailView" || controlName!="EFForm" || controlName||"EFGrid" || controlName!="EFGridCell" ||controlName!="LinearLayout")
		return true;
	return false;

}
function AppleControlMeta(controlName,x,y,width,height)
{
	this.obj = document.createElement('div');
	this.obj.property = new Object();
	this.obj.property.type = controlName;
	this.obj.property.x = x;
	this.obj.property.y = y;
	this.obj.property.width = width;
	this.obj.property.height = height;
	
    if (controlName != "EFGrid")
    	this.obj.style.backgroundImage =  "url(img/R"+ controlName+".png)"
	this.obj.style.backgroundRepeat = "no-repeat";
	this.obj.style.backgroundSize = "100% 100%";

	this.obj.property.eName= "";
	this.obj.property.eValue = "";
	this.obj.property.eBindName = "";
	
	if (ifHighlight(controlName))
	{
		this.obj.style.borderColor = "#1880c9";
	}
	else
	{	
		this.obj.style.borderColor = "#ffffff";
	}
	

	this.obj.style.pixelLeft = x;
	this.obj.style.pixelTop = y;
	this.obj.style.pixelWidth = width;
	this.obj.style.pixelHeight = height;
	
	this.obj.property.onClick = "";

	this.obj.isContainer = false;
    this.obj.objId = util.getUUID();

	this.obj.onmousedown = boardOnMouseDown;
	this.obj.onmousemove = bodyOnMouseMove;
	this.obj.onmouseup = bodyOnMouseUp;
	
	//移动时高亮显示
	this.obj.onmouseover = bodyOnMouseOver;
	this.obj.onmouseout = bodyOnMouseOut;
	
	this.obj.className="control";
	this.obj.style.position="absolute";
	this.obj.style.cursor = "hand";	

	var group = this.obj.property.group = new Array();

	group[0] = "Class";
	group[1] = "Identity";
	group[2] = "View";
	group[3] = "Event";
	group[4] = "Custom";

	group[group[0]]  = new Array();
	group[group[1]]  = new Array();
	group[group[2]]  = new Array();
	group[group[3]]  = new Array();
	group[group[4]]  = new Array();
	
	group[group[0]].push("type");

	group[group[1]].push("eName");
	group[group[1]].push("eValue");
	group[group[1]].push("eBindName");

	group[group[2]].push("x");
	group[group[2]].push("y");
	group[group[2]].push("width");
	group[group[2]].push("height");
	group[group[3]].push("onClick");
	

    
	
}


function AndroidControlMeta(controlName,x,y,width,height)
{
	this.obj = document.createElement('div');
	this.obj.property = new Object();
	this.obj.property.type = controlName;
	this.obj.property.x = x;
	this.obj.property.y = y;
	this.obj.property.width = width;
	this.obj.property.height = height;
	
	
	
	this.obj.property.eName= "";
	this.obj.property.eValue = "";
	this.obj.property.eBindName = "";
	
	if (ifHighlight(controlName))
	{
		this.obj.style.borderColor = "#1880c9";
	}
	else
	{	
		this.obj.style.borderColor = "#ffffff";
	}
	
	
	this.obj.property.eLabel = "";
	this.obj.property.description = "";
	
	
    if (controlName != "EFGrid")
    	this.obj.style.backgroundImage =  "url(img/R" + controlName+".png)";
	this.obj.style.backgroundRepeat = "no-repeat";
	this.obj.style.backgroundSize = "100% 100%";


	this.obj.style.pixelLeft = x;
	this.obj.style.pixelTop = y;
	this.obj.style.pixelWidth = width;
	this.obj.style.pixelHeight = height;
	
	//默认控件的zInde都为1
	this.obj.style.zIndex = 1;
	
	this.obj.property.onClick = "";

	this.obj.isContainer = false;
    this.obj.objId = util.getUUID();

	this.obj.onmousedown = boardOnMouseDown;
	this.obj.onmousemove = bodyOnMouseMove;
	this.obj.onmouseup = bodyOnMouseUp;
	
	//移动时高亮显示
	this.obj.onmouseover = bodyOnMouseOver;
	this.obj.onmouseout = bodyOnMouseOut;
	
	this.obj.className="control";
	this.obj.style.position="absolute";
	this.obj.style.cursor = "hand";	

	var group = this.obj.property.group = new Array();

	group[0] = "Class";
	group[1] = "Identity";
	group[2] = "View";
	group[3] = "Event";
	group[4] = "Custom";

	group[group[0]]  = new Array();
	group[group[1]]  = new Array();
	group[group[2]]  = new Array();
	group[group[3]]  = new Array();
	group[group[4]]  = new Array();
	
	
	group[group[0]].push("type");

	group[group[1]].push("eName");
	group[group[1]].push("eLabel");
	group[group[1]].push("eBindName");
	group[group[1]].push("eValue");
	group[group[1]].push("description");

	group[group[2]].push("x");
	group[group[2]].push("y");
	group[group[2]].push("width");
	group[group[2]].push("height");
	group[group[3]].push("onClick");
	
    
	
}

function AppleEFLabel(originX,originY,width,height,amplifyTime)
{	
	if(importFlag)
	{
		AppleControlMeta.call(this,"EFLabel",originX,originY,width,height);
	}
	else
	{
		AppleControlMeta.call(this,"EFLabel",originX,originY,80,25);
	}

	this.obj.property.group["Event"].pop();
	this.obj.innerHTML = "Label";
	
}

function AppleEFButton(originX,originY,sizeWidth,sizeHeight)
{	
	if(importFlag)
	{
		AppleControlMeta.call(this,"EFButton",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		AppleControlMeta.call(this,"EFButton",originX,originY,80,25);
	}

	this.obj.property.onClick="";
	this.obj.innerHTML = "EFButton";
	
}

function AppleEFTextField(originX,originY,sizeWidth,sizeHeight)
{	
	if(importFlag)
	{
		AppleControlMeta.call(this,"EFTextField",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		AppleControlMeta.call(this,"EFTextField",originX,originY,90,25);
	}
	

	this.obj.innerHTML = "EFTextField";
}

function AppleEFCheckBox(originX,originY,sizeWidth,sizeHeight)
{	
	
	if(importFlag)
	{
		AppleControlMeta.call(this,"EFCheckBox",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		AppleControlMeta.call(this,"EFCheckBox",originX,originY,25,25);
	}
	
	
	this.obj.property.onClick="";
	this.obj.property.eCheckedValue="1";
	this.obj.property.eUnCheckedValue="0";
	this.obj.property.group[this.obj.property.group[1]].push("eCheckedValue");
	this.obj.property.group["Identity"].push("eUnCheckedValue");

//	this.obj.innerHTML = "√";
	
}

function AppleEFComboBox(originX,originY,sizeWidth,sizeHeight)
{	
	
	if(importFlag)
	{
		AppleControlMeta.call(this,"EFComboBox",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		AppleControlMeta.call(this,"EFComboBox",originX,originY,80,25);
	}
	

	
	this.obj.property.eBlockName="";
	this.obj.property.eValuePath="";
	this.obj.property.group["Identity"].push("eBlockName");
	this.obj.property.group["Identity"].push("eValuePath");

	this.obj.innerHTML = "ComboBox";
	
}

function AppleEFTextArea(originX,originY,sizeWidth,sizeHeight)
{	
	
	if(importFlag)
	{
		AppleControlMeta.call(this,"EFTextArea",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		AppleControlMeta.call(this,"EFTextArea",originX,originY,80,80);
	}

	this.obj.property.group["Event"].pop();

	this.obj.innerHTML = ".....";
}


function AppleEFGrid(originX,originY,sizeWidth,sizeHeight)
{	
	if(importFlag)
	{
		AppleControlMeta.call(this,"EFGrid",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		var ifExist = ifContainerExist();
	    if (deviceType=="iPad" && !ifExist)
	    {
	    	AppleControlMeta.call(this,"EFGrid",0,0,1024,768);
	    }else if(deviceType=="iPhone" && !ifExist){
	    	AppleControlMeta.call(this,"EFGrid",0,0,320,480);    	
	    }else if(deviceType=="iPad" && ifExist){
	    	AppleControlMeta.call(this,"EFGrid",originX,originY,300,400);   
	    }else{
	    	AppleControlMeta.call(this,"EFGrid",originX,originY,150,200);
	    }
	}

 

    this.obj.style.backgroundColor = "#fffff";
	this.obj.property.eBlockName="";
	this.obj.property.group["Identity"].pop();
	this.obj.property.group["Identity"].pop();
	this.obj.property.group["Identity"].pop();
	this.obj.property.group["Identity"].push("eBlockName");
	this.obj.property.group["Event"].pop();
	
//	this.obj.innerHTML = ".....\n.....\n.....\n.....\n";
}



function AppleEFGridCell(originX,originY,sizeWidth,sizeHeight)
{	
	if (importFlag)
	{
		AppleControlMeta.call(this,"EFGridCell",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		if (!ifBelongGrid)
		{
			var ifExist = ifContainerExist();
			if(deviceType=="iPad" && !ifExist){
				AppleControlMeta.call(this,"EFGridCell",0,0,1024,44);
			}else if(deviceType=="iPad" && ifExist){
				 AppleControlMeta.call(this,"EFGridCell",originX,originY,300,44);
			}else if(deviceType=="iPhone" && !ifExist){
				AppleControlMeta.call(this,"EFGridCell",0,0,320,44);
			}else{
				AppleControlMeta.call(this,"EFGridCell",originX,originY,150,44);
			}
			
		    this.obj.style.backgroundColor = "#fffff";
			this.obj.property.group["Identity"].pop();
			this.obj.property.group["Identity"].pop();
			
//			this.obj.property.group.pop(); //custom
//			this.obj.property.group.pop(); //event
			
			this.obj.property.group["View"].length=0;
			this.obj.property.group["View"].push("height")
			
			
			this.obj.isContainer = true;
			
			ifBelongGrid = true;
		}
	}



}

function AndroidEFGridCell(originX,originY,sizeWidth,sizeHeight)
{	
	if (importFlag)
	{
		AppleControlMeta.call(this,"EFGridCell",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		var ifExist = ifContainerExist();
		if (!ifBelongGrid)
		{
			if(deviceType=="aPad" && !ifExist){
				AppleControlMeta.call(this,"EFGridCell",0,0,1024,50);
			}else if(deviceType=="aPad" && ifExist){
				 AppleControlMeta.call(this,"EFGridCell",originX,originY,300,50);
			}else if(deviceType=="aPhone" && !ifExist){
				AppleControlMeta.call(this,"EFGridCell",0,0,480,50);
			}else{
				AppleControlMeta.call(this,"EFGridCell",originX,originY,150,50);
			}
	}
		
    this.obj.style.backgroundColor = "#fffff";
		
	this.obj.property.group["Identity"].pop();
	this.obj.property.group["Identity"].pop();
	
//	this.obj.property.group.pop();
//	this.obj.property.group.pop();
	
	this.obj.isContainer = true;
	
	ifBelongGrid = true;
	}
	

}


function AppleEFView(originX,originY,sizeWidth,sizeHeight)
{		
	if(importFlag)
	{
		AppleControlMeta.call(this,"EFView",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		var ifExist = ifContainerExist();
		if(deviceType=="iPad" && !ifExist)
		{
			AppleControlMeta.call(this,"EFView",0,0,1024,768);
			this.obj.style.zIndex = 0;
		} else if(deviceType=="iPhone" && !ifExist)
		{
			AppleControlMeta.call(this,"EFView",0,0,320,480);
			this.obj.style.zIndex = 0;
		}else{
			AppleControlMeta.call(this,"EFView",originX,originY,300,400);
		}
	}
	
    this.obj.style.backgroundColor = "#fffff";
	this.obj.property.group["Identity"].pop("eBindName");
	this.obj.property.group["Identity"].pop("eValue");
	this.obj.property.group["Event"].pop();
	this.obj.isContainer = true;
	

}

function AppleEFDetailView(originX,originY,sizeWidth,sizeHeight)
{	
	if(importFlag)
	{
		AppleControlMeta.call(this,"EFView",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		AppleControlMeta.call(this,"EFView",0,0,703,768);
	}
	
    this.obj.style.backgroundColor = "#fffff";
	this.obj.property.group["Event"].pop();
	this.obj.isContainer = true;
}


//added by shaohuan
function AppleEFForm(originX,originY,sizeWidth,sizeHeight)
{	
	if(importFlag)
	{
		AppleControlMeta.call(this,"EFForm",originX,originY,sizeWidth,sizeHeight);		
	}
	else
	{

		var ifExist = ifContainerExist();
		if(deviceType=="iPad" && !ifExist)
		{
			AppleControlMeta.call(this,"EFForm",0,0,1024,768);
			this.obj.style.zIndex = 0;
		} else if(deviceType=="iPhone" && !ifExist)
		{
			AppleControlMeta.call(this,"EFForm",0,0,320,480);
			this.obj.style.zIndex = 0;
		}else{
			AppleControlMeta.call(this,"EFForm",originX,originY,300,400);
		}
	}

    this.obj.style.backgroundColor = "#fffff";
	this.obj.property.group["Event"].pop();
	this.obj.property.group["Identity"].pop("eBindName");
	this.obj.property.group["Identity"].pop("eValue");
	this.obj.isContainer = true;
	
}


function AndroidEFLabel(originX,originY,width,height,amplifyTime)
{	
	if(importFlag)
	{
		AndroidControlMeta.call(this,"EFLabel",originX,originY,width,height);
		
	}
	else
	{
		AndroidControlMeta.call(this,"EFLabel",originX,originY,80,25);
	}
	

	this.obj.innerHTML = "Label";
}

function AndroidEFButton(originX,originY,sizeWidth,sizeHeight)
{	
	if(importFlag)
	{
		AndroidControlMeta.call(this,"EFButton",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		AndroidControlMeta.call(this,"EFButton",originX,originY,80,25);
	}
	

	this.obj.property.onClick="";
	this.obj.innerHTML = "EFButton";
}

function AndroidEFTextField(originX,originY,sizeWidth,sizeHeight)
{	
	if (importFlag)
	{
		AndroidControlMeta.call(this,"EFTextField",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		AndroidControlMeta.call(this,"EFTextField",originX,originY,90,25);
	}
	

	this.obj.innerHTML = "EFTextField";
}

function AndroidEFCheckBox(originX,originY,sizeWidth,sizeHeight)
{	
	if (importFlag)
	{
		AndroidControlMeta.call(this,"EFCheckBox",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		AndroidControlMeta.call(this,"EFCheckBox",originX,originY,25,25);
	}
	this.obj.property.onClick="";
//	this.obj.innerHTML = "√";
}

function AndroidEFComboBox(originX,originY,sizeWidth,sizeHeight)
{	
	if (importFlag)
	{
		AndroidControlMeta.call(this,"EFComboBox",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		AndroidControlMeta.call(this,"EFComboBox",originX,originY,80,25);
	}
	
	this.obj.property.eBlockName="";
	this.obj.property.eValuePath="";
	this.obj.property.group["Identity"].push("eBlockName");
	this.obj.property.group["Identity"].push("eValuePath");

	this.obj.innerHTML = "ComboBox";
}

function AndroidEFTextArea(originX,originY,sizeWidth,sizeHeight)
{	
	if (importFlag)
	{
		AndroidControlMeta.call(this,"EFTextArea",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		AndroidControlMeta.call(this,"EFTextArea",originX,originY,80,80);
	}
	
	this.obj.innerHTML = ".....";
}


function AndroidEFGrid(originX,originY,sizeWidth,sizeHeight)
{	
	if (importFlag)
	{
		AndroidControlMeta.call(this,"EFGrid",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		var ifExist = ifContainerExist();
		if (deviceType =="aPad" && !ifExist )
		{
			AndroidControlMeta.call(this,"EFGrid",0,0,1024,768);
			this.obj.style.zIndex = 0;
		}else if(deviceType =="aPad" && ifExist){
			AndroidControlMeta.call(this,"EFGrid",originX,originY,300,384);
		}else if(deviceType =="aPhone" && !ifExist){
			AndroidControlMeta.call(this,"EFGrid",0,0,480,800);
			this.obj.style.zIndex = 0;
		}else{
			AndroidControlMeta.call(this,"EFGrid",originX,originY,150,200);
		}
	}

    this.obj.style.backgroundColor = "#fffff";
	this.obj.property.eBlockName="";
	this.obj.property.group["Identity"].pop();
	this.obj.property.group["Identity"].pop();
	this.obj.property.group["Identity"].pop();
	this.obj.property.group["Identity"].push("eBlockName");
	
	this.obj.style.border = "solid 2px black";
	
//	this.obj.innerHTML = ".....\n.....\n.....\n.....\n";
	
}

function AndroidEFView(originX,originY,sizeWidth,sizeHeight)
{	
	if (importFlag)
	{
		AppleControlMeta.call(this,"EFView",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		var ifExist = ifContainerExist();
		if (deviceType=="aPad" && !ifExist)
		{
			AndroidControlMeta.call(this,"EFView",0,0,1024,768);
			this.obj.style.zIndex = 0;
		}else if(deviceType=="aPhone" && !ifExist)
		{
			AndroidControlMeta.call(this,"EFView",0,0,480,800);
			this.obj.style.zIndex = 0;
		}else {
			AppleControlMeta.call(this,"EFView",originX,originY,300,400);
		}
	}

    this.obj.style.backgroundColor = "#fffff";
	this.obj.isContainer = true;

}

function AndroidLinearLayout(originX,originY,sizeWidth,sizeHeight)
{	
	if (importFlag)
	{
		AndroidControlMeta.call(this,"LinearLayout",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		var ifExist = ifContainerExist();
		if (deviceType=="aPad" && !ifExist)
		{
			AndroidControlMeta.call(this,"LinearLayout",0,0,1024,768);
			this.obj.style.zIndex = 0;
		}else if(deviceType=="aPhone" && !ifExist)
		{
			AndroidControlMeta.call(this,"LinearLayout",0,0,480,800);
			this.obj.style.zIndex = 0;
		}else {
			AppleControlMeta.call(this,"LinearLayout",originX,originY,300,400);
		}
	}
	
	//容器 082283
	//控件1e1e1f
    this.obj.style.backgroundColor = "#fffff";
	this.obj.property.group["Identity"].pop("eName");
	this.obj.property.group["Identity"].pop("eLabel");
	this.obj.property.group["Identity"].pop("eBindName");
	this.obj.property.group["Identity"].pop("eValue");
	this.obj.property.group["Identity"].pop("description");
	this.obj.isContainer = true;
}

//added by shaohuan
function AndroidEFForm(originX,originY,sizeWidth,sizeHeight)
{	
	if (importFlag)
	{
		AndroidControlMeta.call(this,"EFForm",originX,originY,sizeWidth,sizeHeight);
	}
	else
	{
		var ifExist = ifContainerExist();
		if (deviceType=="aPad" && !ifExist)
		{
			AndroidControlMeta.call(this,"EFForm",0,0,1024,768);
			this.obj.style.zIndex = 0;
		}else if(deviceType=="aPhone" && !ifExist)
		{
			AndroidControlMeta.call(this,"EFForm",0,0,480,800);
			this.obj.style.zIndex = 0;
		}else {
			AppleControlMeta.call(this,"EFForm",originX,originY,300,400);
		}
	}
	
    this.obj.style.backgroundColor = "#fffff";
	this.obj.property.group["Identity"].pop("eBindName");
	this.obj.property.group["Identity"].pop("eValue");
	this.obj.isContainer = true;
}