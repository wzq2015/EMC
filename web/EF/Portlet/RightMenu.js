
var menuStyle= {
      listStyle: 'none',
      padding: '1px',
      margin: '0px',
      backgroundColor: '#fff',
      border: '1px solid #999',
      width: '100px'
    };
var itemStyle= {
      margin: '0px',
      color: '#000',
      display: 'block',
      cursor: 'default',
      padding: '3px',
      border: '1px solid #fff',
      backgroundColor: 'transparent'
    };
var itemHoverStyle= {
      border: '1px solid #0a246a',
      backgroundColor: '#b6bdd2'
    };
    
var menu;
function rightMenu(obj,options){
   if(menu){
         menu.remove();
     }
 
  obj.bind('contextmenu',function(e){contextMenu(e,obj,options);});
 // obj.bind('click',function(e){if(menu!=undefined){menu.remove();}});
   window.document.body.onclick=function(){if(menu!=undefined){menu.remove();}};
}
function contextMenu(e,obj,options){
     e = e || window.event;
   //  alert(obj.attr('outerHTML'));
     if(menu){
         menu.remove();
     }
      menu=$("<div id=contextMenu class='right_menu'></div>").appendTo(window.document.body);
     var length=options.length;
     for(var i=0;i<length;i++){
     	
         var opt=options[i];
        
         var menuItem=$("<div ></div");
         var menuIcon=$("<div class='menu_lefticon'><img src='EV/skins/default/"+opt.image+"'></div>");
         var menu_line=$("<div class='menu_line1'></div>");
         var menu_content=$("<div class='menu_rightcontent'>"+opt.text+"</div>");
         menuIcon.appendTo(menuItem);
         menu_line.appendTo(menuItem);
         menu_content.appendTo(menuItem);
       //  menu_content.text(opt.text);
      //   menuItem.css(itemStyle);
         if(opt.enable==false){
           //  menuItem.css('background-color','#E1E1E1');
             menuItem.css('color','#E1E1E1');
         }
         
         
         bindAction(menuItem,opt);
         menuItem.appendTo(menu);
       }
     //  menu.hide();
     //menu.slideDown('normal');
     //$.extend(menuStyle,{"top":e.clientY,"left":e.clientX,z_index:"1000",position:"absolute",display:"block"});
       var menuStyle={"top":e.clientY,"left":e.clientX,z_index:"1000",position:"absolute",display:"block"};
     menu.css(menuStyle);
}
function bindAction( obj, opt){
  obj.hover(function(){
      if(opt.enable!=false)
        $(this).children(".menu_rightcontent").css("background"," #0000FF");
      },
      function(){
      if(opt.enable!=false) 
           $(this).children(".menu_rightcontent").css("background"," f0f0f0");;
      });
  obj.bind("click",function(){if(opt.enable!=false) {menu.remove();opt.func();}});    
}




