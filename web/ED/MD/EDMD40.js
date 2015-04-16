$(document).ready(function() {
	$("#alert_button").click( function() {
		EFAlert('这是一个警告框!', '系统警告');
	});

	$("#confirm_button").click( function() {
		EFConfirm('你确认这么做吗?', '确认框', function(r) {
			EFAlert('您选择的是: ' + r, '选择结果');
		});
	});

	$("#prompt_button").click( function() {
		
		EFPrompt('请输入值:', '默认值', '输入对话框', function(r) {
			if( r ) {
				EFAlert('您输入的值是:' + r);
			}
		});
		
	});

	$("#alert_button_with_html").click( function() {
		EFAlert('您可以使用HTML消息,比如<strong>黑体</strong>、<em>斜体</em>、<u>下划线</u>!');
	});
	
	//Example of preserving a JavaScript event for inline calls.
	$("#click").click(function(){ 
		$('#click').css({"background-color":"#f00", "color":"#fff", "cursor":"inherit"}).text("Open this window again and this message will still be here.");
		return false;
	});
});
example1_onclick = function(){
	var efbox=EFColorbox({href:("./ED/MD/ohoopee1.jpg"),title:"Me and my grandfather on the Ohoopee."});
	
};
example2_onclick = function(){
	EFColorbox({href:"./ED/MD/ajax.html",title:"Homer Defined"});
};
example3_onclick = function(){
	EFColorbox({href:"./ED/MD/flash.html",title:"Royksopp: Remind Me"});
};
example4_onclick = function(){
	EFColorbox({href:"http://www.adobe.com/jp/events/cs3_web_edition_tour/swfs/perform.swf",title:"The Knife: We Share Our Mother's Health",iframe:true, innerWidth:425, innerHeight:344});
};
example5_onclick = function(){
	EFColorbox({href:"http://www.baidu.com",title:"baidu",width:"80%", height:"80%", iframe:true});
};
example6_onclick = function(){
	EFColorbox({href:"#inline_example1",title:"baidu",width:"50%", inline:true});
};
select = function (){
	
};
/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ed","EDMD40","query");
}

button_export_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ed","EDMD40","export");
	efbutton.setButtonStatus("export", true);
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ed","EDMD40","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ed","EDMD40","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ed","EDMD40","update",true );
}