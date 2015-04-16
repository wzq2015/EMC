document.oncontextmenu = new Function ("return false") ;

window.document.onresizeend=function(){
   alert("haha");
}
var areaArray=[];
var rowGapArray=[];
var gapArray=[];
var _MAXROWNUM=6;
var _MAXCOLUMNNUM=6;
efPortArea.defaultConfig = {	
    portAreaDistance:"2",//区域列间隔
    columnDistance:"2",//区域行间隔
    minDistance:"5"
	
}
function efPortArea(obj){
   this.width=$(obj).width();
   this.height=$(obj).height();
   this.paintNode=obj;
   $.extend(this,efPortArea.defaultConfig);
   
}
efPortArea.prototype._initBody=function(width,height,type,row,column,widthType,percentWidth){
  
    this.container = $("<div  class=PortletArea ></div>");
	this.container.appendTo(this.paintNode);
	this.width=width;
	this.percentWidth=width;
	this.height=height;
	//"2":百分比 "3":固定宽度 "1":非固定宽度
	if(widthType==undefined)
	    this.widthType="1";
	 else
	    this.widthType=widthType;
	    
	if(this.widthType=='2'){
	    var parWidth=parseInt($("#myPortal_area").width()-2);
	  
	   // this.width=Math.round(parWidth*this.percentWidth/100);
	   if(percentWidth!=undefined){
	      this.percentWidth=percentWidth;
	      this.width=Math.round(parWidth*percentWidth/100)
	   }else{
	   this.percentWidth=Math.round(this.width*100/parWidth);
	   }
	}
	
	this.row=row;
	this.type=type;
	//type分为row,area两种
	if(this.type=='area'){
	this.column=column;
	
	}else if(this.type=='row'){
	   var rowGroup=[];
	   areaArray[row]=rowGroup;
	}

	
	this.container.height(this.height);
	this.container.width(this.width);
//	this.container.bind("mouseover",showEdit());
if(this.type=='area'){
 var instance=this;
   if(areaArray[row]!=null){
	  areaArray[row][column]=instance;
	}

   
    this.container.hover(function(e){instance.showEdit(e);},function(e){instance.hidEdit(e);});
	var options=[];
	var instance=this;
    var option1={text:"添加行",func:function(){instance._addRow(); },image:"images/row_add.png"};

    var option3={text:"删除行",func:function(){if(areaArray.length>1) instance._delRow(); else alert("必须保留一个区域行");},image:"images/row_delete.png"};
    var option2={text:"分列",func:function(){ var column=prompt("分成多少列","");if(!isNaN(column)&&column>=1){instance._divideColumn(column);}},image:"images/row_fl.png"};
    options.push(option1);
    options.push(option3);
    options.push(option2);
   
	rightMenu(instance.container,options);
	
	}
}

var editStyle={
   'cursor':'pointer',
   'color':'blue',
   'font-size':'18'
};

var editDialog={
   'z_index':'10001',
   'position':'absolute'
  
};

var editBtn={
    'background-color': '#ffe695',
	'font-size': '12px',
	'font-weight': 'Bold',
	'border-bottom': '1px solid #d0bb03',
	'border-right': '1px solid #d0bb03',
	'border-left': '1px solid #ffffff',
	'border-top': '1px solid #ffffff',
	'color': '#505050',
	'font-family': 'verdana, arial, helvetica, sans-serif',
	'text-align': 'center',
	'padding-bottom': '1px',
	'cursor':'hand'
}

efPortArea.prototype.showEdit=function(e){
   
   $("#edit").remove();
   
   var srcNode  = e.srcElement || e.target;
   var instance=this;
   var width=$(srcNode).width();
   var height=$(srcNode).height();
   var offset=$(srcNode).offset();
   var top1=offset.top+5;
   var left1=offset.left+2;
   var editDiv=$("<div id='edit'></div>");
   editDiv.css("z_index","1000");
   editDiv.css("position","absolute");
   editDiv.css("top",top1);
   editDiv.css("left",left1);
   editDiv.css(editStyle);
   var editimage=$("<image src='./EV/skins/default/images/layout_edit.png' alt='编辑'></image>");
   editimage.appendTo(editDiv);
   editDiv.mouseover(function(){
       $(this).show();
       //$(this).empty();
      // $("<image src='./EV/skins/default/images/layout_edit_large.png' alt='编辑'></image>").appendTo($(this));
      //$(this).children().attr('src','./EV/skins/default/images/layout_edit_large.png');
   });
   editDiv.mouseout(function(){$(this).hide();});
   editDiv.click(function(){/*instance.editDialog();*/ 
    var row =instance.row;
    instance.editDialog();
    
   });
   
   editDiv.appendTo(window.document.body);
   this.editTitle=editDiv;
   this.editTitle.hide();
  // this.editTitle.slideToggle("slow");
   this.editTitle.fadeIn("slow");
 //   this.editTitle.show();
}

efPortArea.prototype.hidEdit=function(e){
    if(this.editTitle){
        this.editTitle.hide();
      //  $("#edit").fadeOut("slow");
    
     // this.editTitle.slideToggle("slow");
    }
}
var edit_dialog;
efPortArea.prototype.editDialog=function(){
   showMask();
    var container=this.container;
    var instance=this;
    var col=parseInt(this.column)+1;
    var row=parseInt(this.row)+1;
    var width=parseInt(container.width());
    var clientWidth=parseInt(document.body.clientWidth);
    var ratio=width/clientWidth;
    if(edit_dialog) edit_dialog.remove();
    
    if(this.widthType=='2'){
       var wid= "<input nullable='false' maxLength='4' style='width:120px'  type='text' id='result-0-width' name='result-0-width' value='"+this.percentWidth+"' class='inputField'  /><span id='percentTag'>%</span>";
    }else{
       var wid="<input nullable='false' maxLength='4'  style='width:120px'  type='text' id='result-0-width' name='result-0-width' value='"+this.width+"' class='inputField'  />";
       
    }
    
    var edit_top=$("<div style='width:255px' class='window_topdiv'>"+
         "<div class='window_topleft'></div>"+
         "<div class='window_topbg' style='width:235px'></div>"+
    	 "<div class='window_topright'></div>"+
	     "</div>");
    
    edit_content=$("<div style='width:255px;height:125px' class='window_contentbox'>"+ 
             "<div class='window_leftbg' style='height:125px'></div>"+
             
             "<div id = 'ef_region_inqu' class='window_contentbg'  title='PortArea参数设置'>"+
             "<div>"+
	         "<table width='235' border='0' cellspacing='1'>"+
	         "<tr>"+
	         "<td nowrap width='15%'>行号</td>"+
	         "<td nowrap width='30%'>"+row+"</td>"+
	         "<td nowrap width='15%'>列号</td>"+
	         "<td nowrap width='40%'>"+col+"</td>"+
	         "</tr>"+
             "<tr>"+
	         "<td colspan='4'><b>区域宽度类型</b></td>"+
	         "</tr><tr>"+
	         "<td colspan='4' >"+
	         "百分比<input  type='radio' id='result-0-widthType' name='result-0-widthType' value='2' class='inputField' "+(this.widthType=='2'?'checked':'')+" />"+
	         "固定<input  type='radio' id='result-0-widthType' name='result-0-widthType' value='3' class='inputField' "+(this.widthType=='3'?'checked':'')+" />"+
	         "无固定值<input  type='radio' id='result-0-widthType' name='result-0-widthType' value='1' class='inputField' "+(this.widthType=='1'?'checked':'')+" />"+
	         "</td>"+
	         "</tr>"+
	         "<tr>"+
	         "<td colspan='4'>区域宽度"+
	       
	         wid+
	         "</td>"+
	         "</tr></table></div>"+
	         "<div class='window_contentbottom' >"+ 
             "<table width='200' align='right'>"+
             "<tr align='center'>"+ 
             "<td width='122'><input name='Submit' id='edit_confirm' type='button' class='button' value='确 定'></td>"+
             "<td width='104'><input name='Submit2' id='edit_cancel' type='button' class='button' value='取 消'></td>"+
            " </tr>"+
            "</table>"+
            " </div>"+
            "</div>"+
            "<div  class='window_rightbg' style='height:125px'></div>"+
            "</div>");
            
   var edit_bottom=$("<div style='width:255px' class='window_bottom'>"+
                     "<div  class='window_bottomleft'> </div>"+
    	             "<div  class='window_bottombg' style='width:235px'></div>"+
                     "<div class='window_bottomright'></div>"+
                     "</div>"); 
    edit_dialog=$("<div popdiv='true'></div>");
   
    edit_top.appendTo(edit_dialog); 
    edit_content.appendTo(edit_dialog);
    edit_bottom.appendTo(edit_dialog);
	         
   var width=$(container).width();
   var height=$(container).height();
   var offset=$(container).offset();
   var top1=offset.top+10;
   var left1=offset.left+20;
   edit_dialog.css(editDialog);
  // edit_dialog.width("300px");
  // edit_dialog.height("100px");
   edit_dialog.css("top",top1);
   edit_dialog.css("left",left1);
   edit_dialog.appendTo(window.document.body);
 $($("#ef_region_inqu input[type='radio']").get(0)).click(function(){
     if($("#percentTag").length==0)
     $("<span id='percentTag'>%</span>").insertAfter($("#result-0-width"));
     
    // $("#result-0-width").attr('readOnly',"false");
     
 });
   
 $($("#ef_region_inqu input[type='radio']").get(1)).click(function(){
     $("#percentTag").remove();
    // $("#result-0-width").attr('readOnly',"false");
 });
  $($("#ef_region_inqu input[type='radio']").get(2)).click(function(){
    $("#percentTag").remove();
   // $("#result-0-width").attr('readOnly',"true");
     
 });
   /*
   var btnArea=$("<div></div>");
  // btnArea.appendTo(edit_dialog);
   //btnArea.css("float","left");
   
   var btn=$("<div></div");
   btn.text("完成");
   btn.css(editBtn);
   btn.width("50");
   btn.height("15");
   btn.appendTo(btnArea);
   btn.css("float","right");
   */
   $("#edit_confirm").click(function(){
  
   var widthType=$("#ef_region_inqu input[type='radio']:checked").val();
   var width=$("#result-0-width").val();
   var group=areaArray[instance.row].slice(0);
   var formerWidth=areaArray[instance.row][instance.column].container.width();
   var formerType=areaArray[instance.row][instance.column].widthType;
   
   if(!(!isNaN(width)&&width>0&&parseInt(width)==width)){
           alert("宽度必须为正整数!");
           return;                      
   }
   
   
   if(widthType=='2'){
      var formerPercentWidth=areaArray[instance.row][instance.column].percentWidth;
      if(width>100){
       alert('百分比不能超过100%');
       }else{
           var parWidth=instance.container.parent().width()-2;
	     //  var realwidth=Math.round(parWidth*width/100)-2;
	       
	       var real=parWidth-(group.length-1)*efPortArea.defaultConfig.portAreaDistance;
           realwidth=Math.round(real*width/100);
	       
	       group[instance.column].widthType=widthType;
	       group[instance.column].container.width(realwidth);
	       group[instance.column].percentWidth=width;
	       if(isOut(group)===0){
	            alert("当前行百分比总数超过100%,请检查!");
	            group[instance.column].container.width(formerWidth+2);
                group[instance.column].widthType=formerType;
                group[instance.column].percentWidth=formerPercentWidth
	            return;
	            }
	       
          if(isOut(group)){
               var result=confirm("超出当前屏幕总分辨率，可能会使其它区域无法正常显示,是否执行当前操作?");
                  if(!result){
                  group[instance.column].container.width(formerWidth+2);
                  group[instance.column].widthType=formerType;
                  group[instance.column].percentWidth=formerPercentWidth;
                     return;
             }
          }
          
           areaArray[instance.row][instance.column].widthType=widthType;
           areaArray[instance.row][instance.column].percentWidth=width;
          // var parWidth=instance.container.parent().width();
	       //var realwidth=Math.round(parWidth*width/100);
	       areaArray[instance.row][instance.column].width=realwidth;
	       areaArray[instance.row][instance.column].container.width(realwidth);
       }
      }else{
       group[instance.column].container.width(width);
       group[instance.column].widthType=widthType;
       if(isOut(group)){
               var result=confirm("超出当前行总宽度，可能会使其它区域无法正常显示,是否执行当前操作?");
                  if(!result){
                  group[instance.column].container.width(formerWidth);
                  group[instance.column].widthType=formerType;
                     return;
             }
          }
       
      areaArray[instance.row][instance.column].widthType=widthType;
      areaArray[instance.row][instance.column].width=width;
      areaArray[instance.row][instance.column].container.width(width);
   
      }
      refreshRow(areaArray[instance.row]);
      edit_dialog.hide();
      hideMask();
   });
   /*
   var cancel=btn.clone();
   cancel.text("取消");
   cancel.appendTo(btnArea);
   */
   $("#edit_cancel").click(function(){
       edit_dialog.hide();
       hideMask();
   });
}

function isOut(rowGroup){
      var length=rowGroup.length;
      var wholeWidth=rowGroup[0].container.parent().width();
      var otherLength=0;
      var unFixCount=0;
      var percentTotal=0;
      for(var i=0;i<length;i++){
      var instance=rowGroup[i];
      //如果为非固定列，则自动拉伸，如果为固定列或百分比，则不动
      if(instance.widthType!='1'){
          otherLength=otherLength+parseInt(instance.container.width())+2;
          if(instance.widthType=='2'){
            percentTotal=percentTotal+parseInt(instance.percentWidth);
        
            if(percentTotal>100)
               return 0;
          }
      }else
        unFixCount++;
   }
   
   var unFixWidths=parseInt(wholeWidth)-parseInt(otherLength)-parseInt((length-1)*(rowGroup[0].portAreaDistance));
   if(unFixWidths>=unFixCount*2)
    return false;
   else 
     return true;
}

function refreshRow(rowGroup){
   var length=rowGroup.length;
   var otherLength=0;
   var unFixGroup=[];
   var nowWidth;
   var wholeWidth=rowGroup[0].container.parent().width();
   var count=0;
   var remain=wholeWidth;
   var unFixShow=true;
   var lastArea;
   for(var i=0;i<length;i++){
      var instance=rowGroup[i];
      //如果为非固定列，则自动拉伸，如果为固定列或百分比，则不动
      if(instance.widthType!='1'){
           remain=wholeWidth-otherLength-count*efPortArea.defaultConfig.portAreaDistance;
        
          if(remain>parseInt(instance.width)){
          otherLength=otherLength+parseInt(instance.width);
          instance.container.width(instance.width);
          }else{
          lastArea=instance;
          if(!(i==length-1&&unFixGroup.length==0))
          remain=remain-instance.portAreaDistance;
             instance.container.width(remain);
             unFixShow=false
          }
          count++;
          
      }else{
          unFixGroup.push(instance);
      }
   }

var unFixWidths=parseInt(wholeWidth)-parseInt(otherLength)-parseInt((length-1)*(efPortArea.defaultConfig.portAreaDistance));
   if(unFixShow&&parseInt(unFixWidths)>0){
   if(unFixGroup.length>0){
   var avUnFixWidth=Math.round(unFixWidths/unFixGroup.length);
   for(var i=0;i<unFixGroup.length-1;i++){
         unFixGroup[i].width= avUnFixWidth;
         unFixGroup[i].container.width(avUnFixWidth);
   }
   var lastUnFixWidth=unFixWidths-avUnFixWidth*(unFixGroup.length-1);
   unFixGroup[unFixGroup.length-1].width= lastUnFixWidth;
   unFixGroup[unFixGroup.length-1].container.width(lastUnFixWidth);
   }
   }else{
       realLeftWidth=remain-parseInt(unFixGroup.length)*efPortArea.defaultConfig.portAreaDistance;
       lastArea.container.width(realLeftWidth);
       for(var i=0;i<unFixGroup.length;i++){
         var row=unFixGroup[i].row;
         var col=unFixGroup[i].col;
         unFixGroup[i].container.width(0);
         //gapArray[i].
   }
   }
}



function efAreaGap(obj,gapType,row,col){
   this.width=$(obj).width();
   this.height=$(obj).height();
   this.paintNode=obj;
   this.container=$("<div></div>");
   this.container.appendTo(this.paintNode);
   this.gapType=gapType;
   this.row=row;
   if(this.gapType=='columnGap')
      this.col=col;
}
/*
function efAreaRefresh(){
   var containter=$("#myPortal_area");
   var rowLength=areaArray.length;
   for(int i=0;i<rowLength;i++){
     var rowArea=areaArray[i];
   }
}
*/

efPortArea.prototype._delRow=function(){
   var instance=this;
   var curRow=instance.row;
   var superNode=instance.container.parents("#myPortal_area");
   var children=superNode.children(".PortletAreaRow");
   var childNum=children.length;
   var num=childNum-1;
   var height=parseInt(superNode.height());
   var gap=(num-1)*instance.columnDistance;
   var areaHeight=Math.round((height-gap)/num);
   
     //获取当前的行对象
  if(instance.container.hasClass("PortletAreaRow")){
     var rowArea=instance.container;
  }else{
     var rowArea=instance.container.parent();
  }
  
  
  
  var width=rowArea.width();
  rowArea.prev("div.PortletAreaRGap").remove();
  rowArea.remove();

  
  children=superNode.children(".PortletAreaRow,.PortletAreaRGap");
  
  var tempNode=$("<div></div>");
  var prevObj;
  var tempArray=areaArray.slice(0);
  areaArray=[];
  gapArray=[];
  var rownum=0;
  var gapnum=0;
 tempArray.splice(curRow,1);
  for(var a=0;a<children.length;a++){
     var rowAreaArray=[];
     var colGapArray=[];
     var child=children[a];
     var type='row';
     if($(child).hasClass("PortletArea")){
        if(a<children.length-1){
        $(child).height(areaHeight);
        }else{
          var lastareaHeight=height-areaHeight*(num-1)-gap-2;
          $(child).height(lastareaHeight);
        }
      
         var area=obj2Area($(child),rownum,rowAreaArray,colGapArray,tempArray[rownum]);
         $(child).replaceWith(area); 
         //areaArray.push(rowAreaArray);
         areaArray[rownum]=rowAreaArray;
         rownum++;
     }
     if($(child).hasClass("PortletAreaRGap")){
        var columnGap=new efAreaGap(tempNode,'rowGap',gapnum);
        columnGap.container.addClass("PortletAreaRGap");
        columnGap.container.height(instance.portAreaDistance);
        columnGap.container.width(width);
        //columnGap.container.bind("mousedown",gapAction);
        rowGapMenu(columnGap);
        $(child).replaceWith(tempNode.children());
        rowGapArray.push(columnGap);
        gapArray.push(colGapArray);
        gapnum++;
     }
     
     
  }
  
}

efPortArea.prototype._addRow=function(){

  if(areaArray.length==_MAXROWNUM){
     alert("已达行数上限，无法继续新增行");
     return;
  }

   var instance=this;
   var superNode=instance.container.parents("#myPortal_area");
   var children=superNode.children(".PortletAreaRow");
   var childNum=children.length;
   var num=childNum+1;
   var height=parseInt(superNode.height());
   var gap=(num-1)*instance.columnDistance;
   var areaHeight=Math.round((height-gap)/num); 
   
   var rowId=instance.row;
  //获取当前的行对象
   var rowArea=instance.container.parent();
   
   var row=instance.row+1;
     
   var oldAreaArray=areaArray.slice(0);
   //构造新行，并插入鼠标所在行的下一行,同时也要构造gap对象
   
   var tempNode=$("<div></div>");
   
   var areaGap=new efAreaGap(tempNode,'rowGap',rowId);
   areaGap.container.addClass("PortletAreaRGap");
   areaGap.container.width(rowArea.width()+2);
   areaGap.container.height(instance.columnDistance);
   rowGapMenu(areaGap);
   
   
   
   
   //rowGapArray.push(areaGap);
   //debugger;
  // alert(rowArea.width());
   var area=new efPortArea(tempNode);
   area._initBody(rowArea.width()+2,areaHeight,'row',row);
   area.container.addClass("PortletAreaRow");
 
   var emarea=new efPortArea(area.container);
   emarea._initBody(rowArea.width(),areaHeight,'area',row,0);
 
   var newGroup=[];
   newGroup.push(emarea);
   oldAreaArray.splice(row,0,newGroup);
 /*
 if(row!=oldAreaArray.length){
  oldAreaArray= oldAreaArray.slice(0,row).concat(newGroup).concat(oldAreaArray.slice(row));
  }else{
     oldAreaArray.push(newGroup);
  }
  */
   
   tempNode.children().insertAfter(rowArea);
   
   
   children=superNode.children(".PortletAreaRow,.PortletAreaRGap");
   areaArray=[];
   rowGapArray=[];
   gapArray=[];
   var rowgapnum=0;
   var rownum=0;

   for(var i=0;i<children.length;i++){
    var areaRowGroup=[];
    var colGapGroup=[];
     var child=children[i];
     
     if($(child).hasClass("PortletAreaRGap")){
         var gapNode=$("<div></div>");
          var areaGap=new efAreaGap(gapNode,'rowGap',rowgapnum);
           areaGap.container.addClass("PortletAreaRGap");
           areaGap.container.width($(child).width()+2);
           areaGap.container.height(instance.columnDistance);
           rowGapMenu(areaGap);
           rowGapArray.push(areaGap);
           $(child).replaceWith(gapNode.children());
           rowgapnum++;
       continue;
     }
        
     var tempNode=$("<div></div>");
     
     var realHeight;
     if(i<num-1){
     realHeight=areaHeight;
     }else{
        realHeight=height-areaHeight*(num-1)-gap;
     }
     
     var type='row';
    
     
      var area=new efPortArea(tempNode);
      area._initBody($(child).width()+2,realHeight,type,rownum);
      area.container.addClass("PortletAreaRow");
      
      
     
     var childArea=$(child).children(".PortletArea,.PortletAreaCGap");
    var colcolumn=0;
    var gapnum=0;
    
     for(var j=0;j<childArea.length;j++){
        
         var cArea=childArea[j];
         var width=$(cArea).width()+2;
          type ='area';
         if($(cArea).hasClass("PortletArea")){
         
         var areaChild=new efPortArea(area.container);
         areaChild._initBody(width,realHeight,type,rownum,colcolumn,oldAreaArray[rownum][colcolumn].widthType);
         areaChild.container.css("float","left");
         areaRowGroup.push(areaChild);
         colcolumn++;
         }else if($(cArea).hasClass("PortletAreaCGap")){
           var columnGap=new efAreaGap(area.container,'columnGap',i,gapnum);
            columnGap.container.addClass("PortletAreaCGap");
            columnGap.container.height(areaHeight);
            columnGap.container.width(instance.portAreaDistance);
           // columnGap.container.bind("mousedown",gapAction);
            bindMenu(columnGap);
            gapMenu(columnGap);
            colGapGroup.push(columnGap);
            gapnum++;
         }
         
       area.container.unbind("contextmenu");  
       
     }
   areaArray[rownum]=areaRowGroup;
     gapArray.push(colGapGroup);
     rowGapArray.push();
     $(child).replaceWith(tempNode.children());
     rownum++;
 }
 
}

function obj2Area(obj,row,rowAreaArray,colGapArray,rowArray){
      var tempNode=$("<div></div>");
     var rowArea=new efPortArea(tempNode);
     var areaHeight=obj.height()+2;
     rowArea._initBody(obj.width()+2,areaHeight,'row',row);
     rowArea.container.addClass("PortletAreaRow");
     var childArea=obj.children(".PortletArea,.PortletAreaCGap");
     var areacolumn=0;
     var gapcolumn=0;
        for(var j=0;j<childArea.length;j++){
         
         var cArea=childArea[j];
         var width=$(cArea).width()+2;
         if($(cArea).hasClass("PortletArea")){
         
       
         var areaChild=new efPortArea(rowArea.container);
         areaChild._initBody(width,areaHeight,'area',row,areacolumn,rowArray[areacolumn].widthType);
         areacolumn++;
         areaChild.container.css("float","left");
         rowAreaArray.push(areaChild);
         }else if($(cArea).hasClass("PortletAreaCGap")){
           var columnGap=new efAreaGap(rowArea.container,'columnGap',row,gapcolumn);
            columnGap.container.addClass("PortletAreaCGap");
            columnGap.container.height(areaHeight);
            columnGap.container.width(areaChild.portAreaDistance);
           // columnGap.container.bind("mousedown",gapAction);
           bindMenu(columnGap);
            gapMenu(columnGap);
            gapcolumn++;
            colGapArray.push(columnGap);
         }
         rowArea.container.unbind("contextmenu");  
     }
     return tempNode.children();
}



efAreaGap.prototype._exchangeRow=function(){
    //debugger;
     var instance=this;
     var row=instance.row;
     var gap=instance.container;
     var upArea=gap.prev("div.PortletAreaRow");
     var downArea=gap.next("div.PortletAreaRow");
     //如果使用clone,无法将右键事件colne，故只能是手动来
     var upArrayGroup=[];
     var downArrayGroup=new Array();
     var upgapArrayGroup=[];
     var dowGapArrayGroup=[];
     var copyArray=areaArray.slice(0);
  
     
     var newUpArea=obj2Area(upArea,row+1,upArrayGroup,upgapArrayGroup,copyArray[row]);
     var newDownArea=obj2Area(downArea,row,downArrayGroup,dowGapArrayGroup,copyArray[row+1]);
     /*
     alert(downArrayGroup.length);
     
     for(var i=0;i<downArrayGroup.length;i++){
        alert(downArrayGroup[i].width);
     }
     */
     areaArray[row]=downArrayGroup;
     areaArray[row+1]=upArrayGroup;
     
     gapArray[row]=dowGapArrayGroup;
     gapArray[row+1]=upgapArrayGroup;
     
    // alert(areaArray[0][1].width);
     upArea.replaceWith(newDownArea);
     downArea.replaceWith(newUpArea);
     
}


efAreaGap.prototype._mouseDown=function(e){
    var container=this.container;
    var instance=this;
      
       var row=this.row;
       var col=this.col;
    var leftArea=container.prev("div");
    var rightArea=container.next("div");
    
    dragFlag=true;
    e = e || window.event;
    var mousePointX=e.screenX;
    var leftAreaWidth=parseInt(leftArea.width());
    var rightAreaWidth=parseInt(rightArea.width());
    var grapWidth=parseInt(container.width());
    var wholeWidth=leftAreaWidth+rightAreaWidth+grapWidth;
  
    var  realAct=function(et){
       et=et||window.event;
       if(dragFlag){
       var newmousePointX=et.screenX;
       var newLeftWidth=leftAreaWidth+newmousePointX-mousePointX;
       var newRightWidth=wholeWidth-newLeftWidth-grapWidth+4;
       if(newLeftWidth<5||newRightWidth<5){
       return;
          }
          
          leftArea.width(newLeftWidth);
          rightArea.width(newRightWidth); 
              
        }
    };
     var fixArea=function(ev){
     ev = ev || window.event; 
     if(dragFlag){
       var leftArea=container.prev("div");
       var rightArea=container.next("div");
     
     
     
     var tempNode=$("<div></div>");
     var area=new efPortArea(tempNode);
     area._initBody(leftArea.width()+2,leftArea.height()+2,'area',row,col,areaArray[row][col].widthType);
     area.container.css("float","left"); 
     leftArea.replaceWith(area.container);
   //  alert(area.widthType);
  //   alert(area.width);
     areaArray[row][col]=area;
     
     tempNode.empty();
     var rightarea=new efPortArea(tempNode);
     rightarea._initBody(rightArea.width()+2,rightArea.height()+2,'area',row,col+1,areaArray[row][col+1].widthType);
     rightarea.container.css("float","left"); 
     rightArea.replaceWith(rightarea.container);
     areaArray[row][col+1]=rightarea;
     
     refreshRow(areaArray[row]);
     
     container.unbind("mousemove");
     container.unbind("mouseup");
     dragFlag=false;
     }              
     };
     window.document.body.onmousemove = function(e){realAct(e)};
     window.document.body.onmouseup = function(e){fixArea(e);};
     container.bind("mousemove",realAct);
     container.bind("mouseup",fixArea);
}





efPortArea.prototype._divideColumn=function(num){
   var instance=this;
   var row=instance.row;
   var rowGroup=areaArray[row];
   var widthType=instance.widthType;
    num=parseInt(num);
   if(rowGroup.length+num-1>_MAXCOLUMNNUM){
    alert("同一行总列数不能超过"+_MAXCOLUMNNUM);
      return;
   }
   
   var colGapGroup=[];
   if(gapArray[row]!=null){
     colGapGroup=gapArray[row];
   }
   
   var column=instance.column!=undefined?instance.column:0;
   
   var prevGapGroup=[];
   var nextGapGroup=[];
   
   var gapindex=column-1;
   if(column!=0)
    prevGapGroup=colGapGroup.slice(0,column);
   if(column!=colGapGroup.length)
    nextGapGroup=colGapGroup.slice(column);
   
   
 
   var prevGroup=[];
   var nextGroup=[];
   if(column!=0)
    prevGroup=rowGroup.slice(0,column);
   if(column!=rowGroup.length-1)
    nextGroup=rowGroup.slice(column+1);
   
   var tempGroup=[];
   
   var tempGapGroup=[];
   
   var gap=(num-1)*instance.portAreaDistance;
   var width=parseInt(instance.width);

   var areaWidth=Math.round((width-gap)/num); 
   var tempNode=$("<div></div>");
   var lastArea;
   for(var i=0;i<num;i++){
      var height=instance.height-2;
      
      if(i<num-1){
      var area=new efPortArea(tempNode);
      area._initBody(areaWidth+2,height,'area',row,column+i,widthType); 
      area.container.css("float","left");
      tempGroup.push(area);
      
      var columnGap=new efAreaGap(tempNode,'columnGap',row,i);
      columnGap.container.addClass("PortletAreaCGap");
      columnGap.container.height(height);
      columnGap.container.width(instance.portAreaDistance);
      bindMenu(columnGap);
      gapMenu(columnGap);
      tempGapGroup.push(columnGap);
       }else{
          lastWidth=width-(areaWidth*(num-1))-gap;
          var area=new efPortArea(tempNode);
          area._initBody(lastWidth,height,'area',row,column+i,widthType); 
          area.container.css("float","left");
          area.container.width(lastWidth);
          
          lastArea=area;
          tempGroup.push(lastArea);
       }
   }
   areaArray[row]=prevGroup.concat(tempGroup,nextGroup);

  
   gapArray[row]=prevGapGroup.concat(tempGapGroup,nextGapGroup);   
   (instance.container).replaceWith(tempNode.children());
   
   var afterArea=lastArea.container.nextAll(".PortletArea");
   var afterGap=lastArea.container.nextAll(".PortletAreaCGap");
   for(var i=0;i<afterArea.length;i++){
      var child=afterArea[i];
      var tempNode=$("<div></div>");
      var colnum=lastArea.column+1+i;
      var areaChild=new efPortArea(tempNode);
      
      areaChild._initBody($(child).width()+2,$(child).height(),'area',lastArea.row,colnum,nextGroup[i].widthType);
      areaChild.container.css("float","left"); 
      ($(child)).replaceWith(tempNode.children());
      areaArray[lastArea.row][colnum]=areaChild;
   }
    for(var i=0;i<afterGap.length;i++){
      var child=afterGap[i];
      var tempNode=$("<div></div>");
      var colnum=lastArea.column+i;
     var columnGap=new efAreaGap(tempNode,'columnGap',lastArea.row,colnum);
      columnGap.container.addClass("PortletAreaCGap");
      columnGap.container.height($(child).height());
      columnGap.container.width(area.portAreaDistance);
       bindMenu(columnGap);
       gapMenu(columnGap);
      ($(child)).replaceWith(tempNode.children());
      gapArray[lastArea.row][colnum]=areaChild;
      
   }

   refreshRow(areaArray[row]);
   
}

function bindMenu(instance){
   instance.container.mousedown(function(e){instance._mouseDown(e);});
}

function gapMenu(instance){
      
      var options=[]; 
      var option1={text:"合并列",func:function(){ instance._unitColumn();},image:"images/hbl.png"};
      options.push(option1);
      rightMenu(instance.container,options);
}

function rowGapMenu(instance){
     var options=[]; 
      var option1={text:"交换行",func:function(){instance._exchangeRow();},image:"images/jhh.png"};
      options.push(option1);
      rightMenu(instance.container,options);
}

efAreaGap.prototype._unitColumn=function(){
         var instance=this;
         var row=this.row;
         var col=this.col;
         var gap=instance.container;
         var leftArea=gap.prev("div");
         var rightArea=gap.next("div");
         var width=parseInt(leftArea.width()+2)+parseInt(gap.width())+parseInt(rightArea.width()+2);
         var rightAreaCol=col+1;
         rightArea.remove();
         
         areaArray[row].splice(col+1,1);
         
         gap.remove();
         
         gapArray[row].splice(col,1);
         
       //  alert(width);
         
          var tempNode=$("<div></div>");
          var area=new efPortArea(tempNode);
          
          area._initBody(width,leftArea.height()+2,'area',row,col,areaArray[row][col].widthType);
          leftArea.replaceWith(area.container);
          area.container.css("float","left"); 
          
          areaArray[row][col]=area;
          
          var afterArea=area.container.nextAll(".PortletArea");
          var afterGap=area.container.nextAll(".PortletAreaCGap");
          for(var i=0;i<afterArea.length;i++){
             var child=afterArea[i];
             var tempNode=$("<div></div>");
             var colnum=col+1+i;
             var areaChild=new efPortArea(tempNode);
             areaChild._initBody($(child).width()+2,$(child).height(),'area',row,colnum,areaArray[row][colnum].widthType);
             areaChild.container.css("float","left"); 
             ($(child)).replaceWith(tempNode.children());
             areaArray[row][colnum]=areaChild;
          }
           for(var i=0;i<afterGap.length;i++){
             var child=afterGap[i];
             var tempNode=$("<div></div>");
             var colnum=col+i;
            var columnGap=new efAreaGap(tempNode,'columnGap',row,colnum);
             columnGap.container.addClass("PortletAreaCGap");
             columnGap.container.height($(child).height());
             columnGap.container.width(area.portAreaDistance);
              bindMenu(columnGap);
              gapMenu(columnGap);
             ($(child)).replaceWith(tempNode.children());
             gapArray[row][colnum]=areaChild;
             
          }
          refreshRow(areaArray[row]);
         
}

function _ui2info(){

    var efArea=new EiInfo();
   
    var meta=initAreaMeta("area");
     var rowBlock=new EiBlock(meta);
  //  rowBlock.setBlockMeta(meta);
    
    for(var a=0;a<areaArray.length;a++){
          var rowG=areaArray[a];
          for(var i=0;i<rowG.length;i++){
             var area=rowG[i];
             var rowNo=area.row;
             var colNo=area.column;
             var widthType=area.widthType;
             var width=area.width;
             var percentWidth=area.percentWidth;
             var areaA=new Array();
             areaA[0]=a+"";
             areaA[1]=i+"";
             areaA[2]=widthType+"";
             if(widthType=='2')
                 areaA[3]=percentWidth+"";
              else
                 areaA[3]=width+"";
             rowBlock.addRow(areaA);
          }
          
    }
    efArea.addBlock(rowBlock);
    return efArea;
}

function _info2ui(info){
   var count=info.get("blockCount");
   var blocks=info.getBlocks();
   var superContainer=$("#myPortal_area");
   var width=parseInt(superContainer.width());
   var height=parseInt(superContainer.height());
   var gap=(count-1)*efPortArea.defaultConfig.columnDistance;
   var areaHeight=Math.round((height-gap)/count); 
   var b;
   areaArray=[];
   rowGapArray=[];
   gapArray=[];
   
   for(var key=0;key<count;key++){
   
  // for(var key in blocks){
      var rowGroup=[];
      var colGapArray=[];
        //构建rowgap
      if(b){
       var areaGap=new efAreaGap(superContainer,'rowGap',parseInt(key)-1);
       areaGap.container.addClass("PortletAreaRGap");
       areaGap.container.width(width);
       areaGap.container.height(efPortArea.defaultConfig.columnDistance);
       rowGapMenu(areaGap);
       rowGapArray.push(areaGap);
       }
   
   
 //  alert(superContainer.attr('outerHTML'));
       //构建AreaRow
       
       var realHeight= areaHeight;
       if(key==count-1){
         realHeight=height-gap-(areaHeight)*(count-1);
       }
       
      var block=blocks[key];
      var areaRow=new efPortArea(superContainer);
      areaRow._initBody(width,realHeight,'row',key);
      areaRow.container.addClass("PortletAreaRow");
      b=true;
      
      var rows = block.getRows();
      for( var i = 0; i < rows.length; i++ ){
         var row = rows[i];
         var rowId=parseInt(row[0]);
         var columnId=parseInt(row[1]);
         var widthType=parseInt(row[2]);
         var areawidth=parseInt(row[3]);
       //  alert(rowId+":"+columnId+":"+widthType+":"+areawidth);
         
         if(widthType=='2'){
             var real=width-(rows.length-1)*efPortArea.defaultConfig.portAreaDistance-2;
             areawidth=Math.round(real*areawidth/100);
         }
         //构建区域
         var emarea=new efPortArea(areaRow.container);
         emarea._initBody(areawidth,realHeight,'area',rowId,columnId,widthType);
         emarea.container.css("float","left");
         
         rowGroup.push(emarea);
         
         //构建columngap 
         if(columnId<rows.length-1){
          var columnGap=new efAreaGap(areaRow.container,'columnGap',rowId,columnId);
          columnGap.container.addClass("PortletAreaCGap");
          columnGap.container.height(realHeight);
          columnGap.container.width(efPortArea.defaultConfig.portAreaDistance);
          bindMenu(columnGap);
          gapMenu(columnGap);
          colGapArray.push(columnGap);
          }
          
      }
      
      gapArray.push(colGapArray);
      areaArray[key]=rowGroup;
      refreshRow(rowGroup);
      
   }
   
   
   
}
function initAreaMeta(blockId){
     var meta=new EiBlockMeta(blockId);
     
      var column=new EiColumn("rowId");
     column.pos=0;
     meta.addMeta(column);
     
     column=new EiColumn("columnId");
     column.pos=1;
     meta.addMeta(column);
     
      column=new EiColumn("widthType");
     column.pos=2;
     meta.addMeta(column);
     
      column=new EiColumn("width");
     column.pos=3;
     meta.addMeta(column);
     
     return meta;
}

window.onresize=function(){
   var superNode=$("#myPortal_area");
   var anNode=superNode.parent();
   superNode.width(anNode.width());
   superNode.height(parseInt(anNode.height())-2);
  
   var width=anNode.width();
   var children=superNode.children(".PortletAreaRow");
   
   var childNum=children.length;
   var num=childNum;
   var height=parseInt(anNode.height());
   var gap=(num-1)*efPortArea.defaultConfig.columnDistance;
   var areaHeight=Math.round((height-gap)/num);
   
   var tempArray=areaArray.slice(0);
   areaArray=[];
   gapArray=[];
   var rownum=0;
   var gapnum=0;
   var tempNode=$("<div></div>");
   children=superNode.children(".PortletAreaRow,.PortletAreaRGap");
 //  window.status=width+":"+superNode.width();
   for(var a=0;a<children.length;a++){
     var rowAreaArray=[];
     var colGapArray=[];
     var child=children[a];
     var type='row';
     if($(child).hasClass("PortletArea")){
          $(child).width(width);
        if(a<children.length-1){
        $(child).height(areaHeight);
        
        }else{
          var lastareaHeight=height-areaHeight*(num-1)-gap-2;
          $(child).height(lastareaHeight);
        }
       
         var area=rowRefresh($(child),rownum,rowAreaArray,colGapArray,tempArray[rownum]);
         $(child).replaceWith(area); 
         //areaArray.push(rowAreaArray);
         areaArray[rownum]=rowAreaArray;
         refreshRow(areaArray[rownum]);
         rownum++;
         
     }
     if($(child).hasClass("PortletAreaRGap")){
        var columnGap=new efAreaGap(tempNode,'rowGap',gapnum);
        columnGap.container.addClass("PortletAreaRGap");
        columnGap.container.height(efPortArea.defaultConfig.portAreaDistance);
        columnGap.container.width(width);
        //columnGap.container.bind("mousedown",gapAction);
        rowGapMenu(columnGap);
        $(child).replaceWith(tempNode.children());
        rowGapArray.push(columnGap);
        gapArray.push(colGapArray);
        gapnum++;
     }
     }
}
function rowRefresh(obj,row,rowAreaArray,colGapArray,rowArray){
      var tempNode=$("<div></div>");
      var rowArea=new efPortArea(tempNode);
      var areaHeight=obj.height()+2;
      var rowWidth=obj.width()+2;
      rowArea._initBody(obj.width()+2,areaHeight,'row',row);
      rowArea.container.addClass("PortletAreaRow");
      var childArea=obj.children(".PortletArea,.PortletAreaCGap");
      var areacolumn=0;
      var gapcolumn=0;
        for(var j=0;j<childArea.length;j++){
         
         var cArea=childArea[j];
        // var width=$(cArea).width()+2;
         if($(cArea).hasClass("PortletArea")){
         var speArea=rowArray[areacolumn];
         var speType=speArea.widthType;
         var speWidth='5';
          var areaChild=new efPortArea(rowArea.container);
         if(speType=='2'){
            var spePercentWidth=speArea.percentWidth;
            speWidth=Math.round(rowWidth*spePercentWidth/100);
             areaChild._initBody(speWidth,areaHeight,'area',row,areacolumn,rowArray[areacolumn].widthType,spePercentWidth);
         }else{
            speWidth=speArea.width;
            areaChild._initBody(speWidth,areaHeight,'area',row,areacolumn,rowArray[areacolumn].widthType);
         }
         areacolumn++;
         areaChild.container.css("float","left");
         rowAreaArray.push(areaChild);
         }else if($(cArea).hasClass("PortletAreaCGap")){
           var columnGap=new efAreaGap(rowArea.container,'columnGap',row,gapcolumn);
            columnGap.container.addClass("PortletAreaCGap");
            columnGap.container.height(areaHeight);
            columnGap.container.width(areaChild.portAreaDistance);
           // columnGap.container.bind("mousedown",gapAction);
           bindMenu(columnGap);
            gapMenu(columnGap);
            gapcolumn++;
            colGapArray.push(columnGap);
         }
         rowArea.container.unbind("contextmenu");  
     }
     return tempNode.children();
}

