function propertySetter()
{
	this.propertyNode = document.getElementById("attributeContent");
	this.propertyInputNodeList = new Object();
	//this.propertyTrNodeList = new Object();

    propertyFieldGenerate(this.propertyInputNodeList,"eId");
	propertyFieldGenerate(this.propertyInputNodeList,"eParent");
	propertyFieldGenerate(this.propertyInputNodeList,"onClick");

	propertyFieldGenerate(this.propertyInputNodeList,"type");
	propertyFieldGenerate(this.propertyInputNodeList,"eName");
	propertyFieldGenerate(this.propertyInputNodeList,"eValue");
	propertyFieldGenerate(this.propertyInputNodeList,"eBindName");
	propertyFieldGenerate(this.propertyInputNodeList,"x");
	propertyFieldGenerate(this.propertyInputNodeList,"y");
	propertyFieldGenerate(this.propertyInputNodeList,"width");
	propertyFieldGenerate(this.propertyInputNodeList,"height");
	
	this.propertyTableNodeList = new Object();
	this.currentTableNode = null;
	
	this.currentControlType = null;
	this.currentControlNode = null;
	this.newPropertyName = "";
	this.newPropertyValue = "";
	this.firstTime = true;

	this.init = function() { }

	this.setPropertyFromControlNode = function(node)
	{
		//added by shaohuan
		if (node == null)
			return;
		
		//1.如果是自身节点，但没有自更新操作，直接return
		//2.对于是自己且是自更新的情况，不用判断，直接往下走就是了
		//3.对于不是自己，管它自更新标识是不是为真，直接赋值，往下刷新列表
//		if((this.currentControlNode==node) && !selfUpdate)  //只有自己才需要判断是否是自更新操作
//		{
//			return;
//		}
//		else if (this.currentControlNode != node)
//		{
//			this.currentControlNode = node;
//		}
		
//		 if (this.currentControlNode != node)
//		{
//			this.currentControlNode = node;
//		}
		

//		if((this.currentControlType!=node.property.type)||selfUpdate)  //处理还没有被点击过，即没有将数据塞入相应的数据存储体中的情况，以及自更新的情况
		if((this.currentControlNode != node)|| selfUpdate) 
		{
		    if(this.currentControlNode != node)
			{
				this.currentControlNode = node;
			}
//		    
//			if((this.propertyTableNodeList[node.property.type]==null)||selfUpdate)
//			{
			this.currentTableNode = this.propertyTableNodeList[node.property.type] = document.createElement("table");
			this.currentTableNode.width="100%";
			for(var i=0;i<node.property.group.length;i++)
			{
				var row = this.currentTableNode.insertRow(this.currentTableNode.rows.length);
				row.className = "horizontalLine"
				var td = document.createElement("td");
				td.innerHTML = " - "+node.property.group[i];
				td.colSpan=2;
				row.appendChild(td);
				row.onclick = onRowClicked;
			
				var props =  node.property.group[node.property.group[i]];
				for(var j=0;j<props.length;j++)
				{
					row = this.currentTableNode.insertRow(this.currentTableNode.rows.length);
					
					if(this.propertyInputNodeList[props[j]] == null)
					{
						propertyFieldGenerate(this.propertyInputNodeList,props[j]);
					}
					
					row.insertCell(0).innerHTML =  props[j]+":" ;
					row.insertCell(1).appendChild(this.propertyInputNodeList[props[j]]);
					
					this.propertyInputNodeList[props[j]].value = node.property[props[j]];
	
				}
			}
			
			//added by shaohuan
			selfUpdate = false;
			newAttrName.value = "";
			newAttrValue.value = "";
//			}
//			else   //没有新属性的加入，直接刷新值就可以了
//			{
//				var index = 0;
//				this.currentTableNode = this.propertyTableNodeList[node.property.type];
//
//				for(var i=0;i<node.property.group.length;i++)
//				{
//					var row = this.currentTableNode.rows[index++];
//                    
//			
//					var props =  node.property.group[node.property.group[i]];
//					for(var j=0;j<props.length;j++)
//					{
//						row = row = this.currentTableNode.rows[index++];;
//						row.cells[1].appendChild(this.propertyInputNodeList[props[j]]);
//						this.propertyInputNodeList[props[j]].value = node.property[props[j]];
//					}
//
//				}
//
//			}

			if(this.propertyNode.firstChild!=null) 
					{this.propertyNode.removeChild(this.propertyNode.firstChild);}
				this.propertyNode.appendChild(this.currentTableNode);

			this.currentControlType = node.property.type;
			
		}
//		else
//		{
//			for(var i=0;i<node.property.group.length;i++)
//			{
//				var props =  node.property.group[node.property.group[i]];
//				for(var j=0;j<props.length;j++)
//				{
//					this.propertyInputNodeList[props[j]].value = node.property[props[j]];
//				}
//			}
//		}
//		
		
	}

	this.clear = function()
	{
		this.classNameField.value = "";
		this.xField.value = "";
		this.yField.value = "";
		this.widthField.value = "";
		this.heightField.value = "";
		
		this.eNameField.value = "";
		this.eValueField.value = "";
		this.eBindNameField.value = "";
	}
	this.setPropertyToField = function(name,node)
	{
		this.propertyInputNodeList[name].value = node.property[name];
	}

	this.setPropertyToNode = function(name,node)
	{
		 node.property[name] = this.propertyInputNodeList[name].value;
	}
	
	this.addPropertyToNode = function(name,value)
	{
		if (this.currentControlNode == null)
		{
			alert("请选择控件!");
		}else if(this.ifPropertyExist(name)){
			alert("属性已经存在!");
		}else if(name == ""){
				alert("属性名不能为空!");
		}else{
			//确认自定义的Group分组追踪没有此属性
			this.currentControlNode.property[name] = value;
			
			var flag = false;

        	this.currentControlNode.property.group["Custom"].push(name);  //将这个node的属性添加到分组Custom中去，以方便管理
			
        	//判断属性池子里面有没有与此属性对应的文本框，如果没有，则需要创建一个
			if(this.propertyInputNodeList[name] == null)
			{
				propertyFieldGenerate(this.propertyInputNodeList,name);
			}
			//创建后，它是一个空的TEXT，里面的值需要给赋一下
			this.propertyInputNodeList[name].value = value;               //这个框中的值将会显示是多少
			selfUpdate = true;                                            //将要进行更新的标识
			
			//更新右边这个Table
			this.setPropertyFromControlNode(this.currentControlNode);     //刷新列表
		} 
	
	}
	

	//判断属性是否已经添加
	this.ifPropertyExist = function(name)
	{
		var node = this.currentControlNode.property;
		for(var c in node)
		{
			if (name==c)
				return true;
		}
		
		return false;

	}
	
	
//	this.ifPropertyExist = function(name)
//	{
//		for(var i=0;i<this.currentControlNode.property.group.length;i++)
//		{
//			var props =  this.currentControlNode.property.group[this.currentControlNode.property.group[i]];
//			for(var j=0;j<props.length;j++)
//			{
//				if (props[j] == name)
//					return true;
//			}
//
//		}
//		return false;
//	}

}


function onRowClicked()
{
	var node = window.event.srcElement;
	
	if(node.innerText.indexOf("-")>-1)
	{
		node.innerText = node.innerText.replace("-","+");
	}
	else
	{
		node.innerText = node.innerText.replace("+","-");
	}
	
	if(node.tagName=="TD") node = node.parentNode;
	var tempRow = util._nextSiblingOfNode(node);
	while(tempRow!=null && tempRow.className!= "horizontalLine")
	{
		util.changeNodeVisibleStatus(tempRow);
		tempRow = util._nextSiblingOfNode(tempRow);
	}
}


function propertyFieldGenerate(propertyInputNodeList,name)
{
	propertyInputNodeList[name] = document.createElement('input');
	propertyInputNodeList[name].type="text";
	propertyInputNodeList[name].id = name;
	propertyInputNodeList[name].className="flatInput";
	propertyInputNodeList[name].onblur = propertyChanged;
	propertyInputNodeList[name].onkeydown = propertyEnterChanged;
	
}