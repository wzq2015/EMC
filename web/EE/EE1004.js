var page_offset = 0;
var ei_offset = 10;
var ei_limit = 10;
var ei_count = -1;

navibar_first_onclick = function()
{
	if( ei_offset == 0 )
	{
		page_offset = 0;
		load_data();
	}
	else
	{
		ef.get( "result-offset" ).value = 0;
		ef.get( "serviceName" ).value = "EE1004";
		ef.get( "methodName" ).value = "query";
		document.forms[0].submit();
	}
}

navibar_previous_onclick = function()
{
	if( page_offset > 0 )
	{
		page_offset--;
		load_data();
	}
	else
	{
		ef.get( "result-pre" ).value = true;
		ef.get( "result-offset" ).value = ei_offset - ei_limit;
		ef.get( "serviceName" ).value = "EE1004";
		ef.get( "methodName" ).value = "query";
		document.forms[0].submit();
	}
}

navibar_next_onclick = function()
{
	
	if( page_offset < ei_limit-1 )
	{
		page_offset++;
		load_data();
	}
	else
	{
		ef.get( "result-offset" ).value = ei_offset + ei_limit;
		ef.get( "serviceName" ).value = "EE1004";
		ef.get( "methodName" ).value = "query";
		document.forms[0].submit();
	}
}

navibar_last_onclick = function()
{
	if( (ei_offset + ei_limit > ei_count ) )
	{
		page_offset = ei_count - ei_offset -1;
		load_data();
	}
	else
	{
		var mod = ei_count % ei_limit;		
		var pages = (ei_count - mod)/ ei_limit;
		ef.get( "result-offset" ).value = ( mod ==0 )? ei_limit*(pages-1): ei_limit * pages ;
		ef.get( "result-last" ).value = true;
		ef.get( "serviceName" ).value = "EE1004";
		ef.get( "methodName" ).value = "query";
		document.forms[0].submit();
	}
}

load_data = function()
{
	//debugger;
	var ei = _getEi();
	var block = ei.getBlock( "result" );	
	var real_offset = ei_offset + page_offset;
	
	var navi_bar = efform.getNavigationBar( "navibar" );
	
	navi_bar.setButtonStatus( "first", ( real_offset >0 ) );
	navi_bar.setButtonStatus( "previous", ( real_offset >0 ) );

	if( ei_count < 0 )
	{
		navi_bar.setButtonStatus( "last", false );
	}
	else if( real_offset >= ei_count-1 )
	{
		navi_bar.setButtonStatus( "next", ( ei_count < 0 ) );
		navi_bar.setButtonStatus( "last", false );
	}
	else
	{
		navi_bar.setButtonStatus( "next", true );
		navi_bar.setButtonStatus( "last", true );
	}
	
	ef.get( "current_offset" ).innerText = real_offset+1;
	
	ef.get( "result-0-product_id" ).value = block.getCell(page_offset,"product_id");
	ef.get( "result-0-company_name" ).value = block.getCell(page_offset,"company_name");
	ef.get( "result-0-sale_date" ).value = block.getCell(page_offset,"sale_date");
	ef.get( "result-0-price" ).value = block.getCell(page_offset,"price");
	var country_value = block.getCell(page_offset,"made_country");
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
	ef.get( "result-0-company_page" ).innerText = block.getCell(page_offset,"company_page");
}

efform_onload = function()
{
	//debugger;
	//efregion.show("ef_region_detail");
	var ei = _getEi();
	var block = ei.getBlock( "result" );
	ei_offset = isAvailable( block.get("offset") ) ? eval(block.get("offset")):0; 
	ei_limit = isAvailable( block.get("limit") ) ? eval(block.get("limit")):10;	
	ei_count = isAvailable( block.get("count") ) ? eval(block.get("count")):-1;	
	page_offset = 0;
	if( isAvailable( block.get("last") ) )
		page_offset = ei_count - ei_offset -1;
	else if( isAvailable( block.get("pre") ) )
		page_offset = ei_limit-1;
	load_data();
}

efcalendar_click = function (control_source, id) {
  var node = ef.getNodeById(id);
  efcalendar(control_source, node, 'yyyymmdd', true);
}