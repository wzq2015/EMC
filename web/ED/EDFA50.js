/**
 * 
 * 对应用例ID：108313
 × 该js函数主要实现页面选择框选择的操作逻辑
 */

// 全局变量 用来存放service初始化加载的eiinfo变量
var eiinfo ;

/**
 * 页面初始化加载方法
 * 主要用来展示没有按钮的region和初始化eiinfo变量 把eiinfo变量中的信息组织在select框中显示
 */
efform_onload = function (){
	efregion.show("ef_region_unseleted");
	efregion.show("ef_region_selected");
	
	eiinfo = _getEi();
	show_selectBox(eiinfo);
	
}

/**
 * 该方法主要是用来初始化select框中数据
 */
show_selectBox = function(eiinfo){

	var selectedBox = ef.get("selected");
	var selectedBlock = eiinfo.getBlock("selected");
	for(i=0;i<selectedBlock.rows.length;i++){
		label = selectedBlock.getCell(i,"itemDisplayCname")
			+ (selectedBlock.getCell(i,"itemMustFlag") == 0?"---非必须项":"---必须项");
		selectedBox.options.add(new Option(label,
			selectedBlock.getCell(i,"itemSeq")+":"+selectedBlock.getCell(i,"itemMustFlag")));
	}

	var msg = [];
	//把eiinfo的unSelected 块的数据放到unSelected选择框中
	var unSelectedBox = ef.get("unSelected");
	unSelectedBox.options.length = 0;
	var unSelectedBlock = eiinfo.getBlock("unSelected");
	for(i=0;i<unSelectedBlock.rows.length;i++){
		label = unSelectedBlock.getCell(i,"itemDisplayCname")
			+ (unSelectedBlock.getCell(i,"itemMustFlag") == 0?"---非必须项":"---必须项");
		if(unSelectedBlock.getCell(i,"itemMustFlag") == 0)	
			unSelectedBox.options.add(new Option(label,
				unSelectedBlock.getCell(i,"itemSeq")+":"+unSelectedBlock.getCell(i,"itemMustFlag")));
		else{
			selectedBox.options.add(new Option(label,
				unSelectedBlock.getCell(i,"itemSeq")+":"+unSelectedBlock.getCell(i,"itemMustFlag")));	
			msg.push('【'+label+'】');		
		
		}
					
	}
	
	// update by wangyuqiu@2009-03-20 
	var length = msg.length;
	msg.join('、');
	msg += "，这些项为后来追加或修改的必须项，已默认被添加到『已经选择的字段』选择框中，提交后即可被保存！";

	if(length>0)
		efform.setStatus(-1,msg);
	
}

/*
 * 关闭按钮实现方法 实现关闭页面
 */
button_cancel_onclick = function ()
{
	window.close();
}


// 该变量用来存放当前选中的select框
var currentSel = null;

/**
 * 该方法用来移动选择框中的数据
 */
function button_move_onclick(){
          if(arguments.length==1){
              button_moveUp_onclick(arguments[0]);
          }else if(arguments.length==2){
              moveRight(arguments[0],arguments[1]);
          }
      }
      
/**
 * 该方法用来把选择框中的数据上移
 */      
function button_moveUp_onclick(direction){
          if(currentSel == null) {
            alert("请选中已经选择的字段select框中的记录!");
          	return ;
          }
          var index = currentSel.selectedIndex;
          
          if(-1 == index) {
          	alert("请选中已经选择的字段select框中的记录!");
          	return ;
          }	
          if(direction){//up
              if(index==0) return;
              
              var value = currentSel.options[index-1].value;
              var text = currentSel.options[index-1].text;
              
              currentSel.options[index-1].value = currentSel.options[index].value;
              currentSel.options[index-1].text = currentSel.options[index].text;
              
              currentSel.options[index].value = value;
              currentSel.options[index].text = text;
              
              currentSel.options[index].selected = false;
              currentSel.options[index-1].selected = true;
          }else{//down
              if(index==(currentSel.length-1)) return;
              
              var value = currentSel.options[index+1].value;
              var text = currentSel.options[index+1].text;
              
              currentSel.options[index+1].value = currentSel.options[index].value;
              currentSel.options[index+1].text = currentSel.options[index].text;
              
              currentSel.options[index].value = value;
              currentSel.options[index].text = text;
              
              currentSel.options[index].selected = false;
              currentSel.options[index+1].selected = true;
          }
      }
      
/*
 * 该方法主要是实现把src选择框中选中的数据移动到des选择框中去
 */      
function moveRight(src,des){
        if(src.selectedIndex==-1){
            alert("请先选中选择框中的记录!");
            return;
        }
        for(var i=0;i<src.length;i++){
            if(src[i].selected){
                var op = document.createElement("option");
                op.value = src.options[src.selectedIndex].value;
                op.text = src.options[src.selectedIndex].text;
                arrayStr = op.value.split(":");
                if(arrayStr[1] == 0){
                	des.options.add(op);
                    src.remove(i);
                 	i--;
                }else{
                	alert("【"+op.text+"】为必须字段，不能移动到未选择字段select框中");
                }    
            }
        }   
    }

/*
 * 该按钮用来控制 单步左右移动时的按钮状态
 */    
function Button_Status_Set(obj){        
            if(obj.length==0) return;
            currentSel = obj;
        if(obj.id=="unselected"){
            document.getElementById("button_leftAll").disabled = true;
                document.getElementById("button_rightAll").disabled = false;
                
                _reSelect(document.getElementById("selected"));            
        }else{
            document.getElementById("button_leftAll").disabled = false;
            document.getElementById("button_rightAll").disabled = true;    
            
            _reSelect(document.getElementById("unselected"));                
        }       
}

function _reSelect(obj){
   for(var i=0; i<obj.length; i++){
       if(obj[i].selected) obj[i].selected = false;
   }
}

/**
 * 该方法用来选中选择框中所有记录
 */
button_checkAll_onclick = function(obj){
	if("leftCheckAll" ==obj.id){
		currentSelect = ef.get("unselected");

	}else if("rightCheckAll" == obj.id){
		currentSelect = ef.get("selected");
	}
	
	for(i=0;i<currentSelect.length;i++){
		if(obj.checked)
			currentSelect[i].selected = true;
		else
			currentSelect[i].selected = false;	
	}	
	
}

/**
 * 该方法用来移动选择框中所有的记录
 */
function button_moveAll_onclick(src,des){
    for(var i=0;i<src.length;i++){
              var op = document.createElement("option");
              op.value = src.options[i].value;
              op.text = src.options[i].text;
              arrayStr = op.value.split(":");
              if(arrayStr[1] == 0){
                des.options.add(op);
                src.remove(i);
                i--;
              }else{
                	alert("【"+op.text+"】为必须字段，不能移动到未选择字段select框中");
              } 
      }
}

//根据select框信息组织一个eiinfo 提交
button_submit_onclick = function ()
{
	unSelectedBlock = eiinfo.getBlock("unSelected");
	selectedBlock = eiinfo.getBlock("selected");
	
	//从已经选择的字段选择框中组织eiinfo信息 并且根据选择框的顺序排好顺序
	
	var newEiInfo = new EiInfo();
    var block = new EiBlock("selected");
    block.setBlockMeta(selectedBlock.getBlockMeta());
    newEiInfo.addBlock(block);
	
	var selectedBox = ef.get("selected");
	for(i=0;i<selectedBox.length;i++){
		opt = selectedBox.options[i];
		arrayStr = opt.value.split(":");
		item_seq = arrayStr[0];
		//查找item_seq的数据
		findFlage = false;
		for(j=0;j<unSelectedBlock.rows.length;j++){
			if(unSelectedBlock.getCell(j,"itemSeq") == item_seq){
				unSelectedBlock.setCell(j,"seqNo",i);
				block.rows.push(unSelectedBlock.rows[j]);
				findFlage = true;
			}
		}
		if(false == findFlage){
			for(j=0;j<selectedBlock.rows.length;j++){
				if(selectedBlock.getCell(j,"itemSeq") == item_seq){
					selectedBlock.setCell(j,"seqNo",i);
					block.rows.push(selectedBlock.rows[j]);
				}
			}			
		}
		
	}
	
	//组织完数据后 把数据提交到后台service
	
	newEiInfo.set("formEname",ef.get("inqu_status-0-formEname").value);
	newEiInfo.set("funcId",ef.get("inqu_status-0-funcId").value);
	EiCommunicator.send("EDFA50","saveSelected", newEiInfo); 
	
	
	//window.opener.efgrid.getGridObject(ef.get("inqu_status-0-gridId").value);
	window.opener.efpage.submitMetadata( window.opener.efform.getGrid( ef.get("inqu_status-0-gridId").value ));
	
	window.close();
}


