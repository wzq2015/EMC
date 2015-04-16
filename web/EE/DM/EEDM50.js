efform_onload =function(){
	
	//debugger;
	var start = new Date();
	var info = Json2EiInfo.prototype.parseJsonObject(__ei);
	var end = new Date();
	//alert(end.getTime()-start.getTime());
	
	
	var start = new Date();
	
	//render_region_input("ef_region_inqu_sub");
	//render_region_input("ef_region_inqu_sub2");
	var end = new Date();
	//alert(end.getTime()-start.getTime());
	
	var render = new EFFormRender();
	render.init(info);

	
}


render_region_input = function(region_id){
	
	var newNode = function(array){return this.init(array)};
	
	newNode.prototype.init = function(array){
		var div = document.createElement("div");
		
		div.align = "right";
		
		var text = document.createElement("span");
		text.innerHTML = ""+array[5];
		
		var input=document.createElement("input");
		input.Class="inputField";
		input.id=""+array[0]+"-"+array[1]+"-"+array[2];
		//input.attributes.Put("type", "text");
		//input.attributes.Put("name", input.id);
		
		div.appendChild(text);
		div.appendChild(input);
		
		
		return div;
	}
	
	
	//__eiInfo;
	var node = document.getElementById(region_id);
	
	var table = document.createElement("table");
	

	
	var i=0;
	

	var tablediv = document.createElement("div");
	for(var obj in __eiInfo.blocks){
		
		if(i%3 == 0){
			var tr = document.createElement("tr");
			table.appendChild(tr);
		}
		var td = document.createElement("td");
		td.appendChild(new newNode(__eiInfo.blocks[obj].rows[4]));
		
		tr.appendChild(td);
		i++;

		


	}

	//node.appendChild(new newNode(__eiInfo.blocks["result"].rows[5]));
	//node.appendChild(table);
	node.innerHTML = table.outerHTML;
	
	//node.innerHTML = table.outerHTML;  
	//document.body.appendChild($(node.innerHTML).get(0));
}

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM50","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM50","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM50","insert",true );
}




/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM50","update",true );
}