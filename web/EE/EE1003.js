button_load1_onclick = function()
{
	var ajax_callback = efform.getSystemAjaxCallback( "ef_region_detail" );
	ajax_load_data( ajax_callback );
}

button_load2_onclick = function() 
{
	var ajax_callback = 
	{
		onSuccess : 
    		function(eiInfo)
			{ 
				set_values( eiInfo);
    		},
  		onFail: 
    		function(eMsg) 
			{
    			alert("服务调用失败: " + eMsg);
			}
	}; 	
	
	ajax_load_data( ajax_callback );
}

set_values = function( eiInfo )
{
	var product_id = ef.get( "result-0-product_id" ).value;
	var block = eiInfo.getBlock( "result" );
	if( !isAvailable( block ) || block.getRows().length<=0 )
	{
		alert( "代号为["+ product_id +"]的产品不存在" );
		return;
	}
	
	ef.get( "result-0-product_id" ).value = block.getCell(0,"product_id");
	ef.get( "result-0-company_name" ).value = block.getCell(0,"company_name");
	ef.get( "result-0-sale_date" ).value = block.getCell(0,"sale_date");
	ef.get( "result-0-price" ).value = block.getCell(0,"price");
	
	var country_value = block.getCell(0,"made_country");
	var node = ef.get( "result-0-made_country" );
	node.selectedIndex = 0;
	for( var i=0; i<node.options.length; i++ )
	{
		if( node.options[i].value == country_value )
		{
			node.selectedIndex = i;
			break;
		}
	}	
	ef.get( "result-0-company_page" ).innerText = block.getCell(0,"company_page");
	
	ef.get( "result-0-validate_0" ).value = block.getCell(0,"validate_0");
	ef.get( "result-0-validate_1" ).value = block.getCell(0,"validate_1");
	ef.get( "result-0-validate_2" ).value = block.getCell(0,"validate_2");
	ef.get( "result-0-validate_3" ).value = block.getCell(0,"validate_3");
	ef.get( "result-0-validate_4" ).value = block.getCell(0,"validate_4");
	ef.get( "result-0-validate_5" ).value = block.getCell(0,"validate_5");
	ef.get( "result-0-validate_6" ).value = block.getCell(0,"validate_6");
	ef.get( "result-0-validate_7" ).value = block.getCell(0,"validate_7");
	ef.get( "result-0-validate_8" ).value = block.getCell(0,"validate_8");
	ef.get( "result-0-validate_9" ).value = block.getCell(0,"validate_9");
}

ajax_load_data = function( callback )
{
	var product_id = ef.get( "result-0-product_id" ).value;
	if( product_id == "" )
	{
		alert( "产品代号为空" );
		return;
	}
	var ei_info = new EiInfo();	
	ei_info.setByNameValue( "inqu_data-0-product_id", product_id );
	
	EiCommunicator.send( "EE1003", "load" , ei_info, callback);
}

efcalendar_click = function( control_source, id ) 
{
  	var node = ef.get( id );
  	efcalendar(control_source, node, 'yyyy-mm-dd', true);
}

button_show_other_onclick = function()
{
	var div_node = ef.get( "other_field" );
	if( div_node.style.display == 'block' )
	{
		efform.hideDiv( "other_field" );
		ef.get( "button_show_other" ).firstChild.innerHTML = "&nbsp;显示其他字段&nbsp;";
	}
	else
	{
		efform.showDiv( "other_field" );
		ef.get( "button_show_other" ).firstChild.innerHTML = "&nbsp;隐藏其他字段&nbsp;";
	}
}

efform_onload = function()
{
	efform.hideDiv( "other_field" );
}