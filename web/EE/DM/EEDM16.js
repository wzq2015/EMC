/*
  点击查询按钮后调用后台的service
*/
var ifShow = false;
/*
efform_onload = function(){
	efregion.show("ef_region_codeDemo");
	efregion.toggleShow("ef_region_codeDemo");
}*/

button_query_onclick = function ()
{
	/*
	ifShow = true;
	//efgrid.submitInqu( "ef_grid_result", "ee","EEDM16","query");
	var grid = efgrid.getGridObject("ef_grid_result");
	var info = new EiInfo();
	info.setByNodeObject( document.forms[0] );
	var block = info.getBlock( grid.blockId );
	if( !isAvailable( block ) ) {
			block = new EiBlock( grid.getBlockData().getBlockMeta() );
			info.addBlock( block );
	}

	block.setAttr( grid.getBlockData().getAttr() );
	block.set( "orderBy", grid.getOrderBy() );


	EiCommunicator.send( "EEDM16", "query", info, null ,false,true );
	ifShow = false;
	*/
	efgrid.submitInqu( "ef_grid_result", "ee","EEDM16","query", true );

}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ee","EEDM16","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ee","EEDM16","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	//efgrid.submitForm( "ef_grid_result", "ee","EEDM16","update",true );
	//var grid = efgrid.getGridObject("ef_grid_result");
	var dataDiv = efgrid.getDataDiv(ef.get("ef_grid_result__grid_table"));
	alert(dataDiv.scrollHeight);
	alert(dataDiv.scrollTop);


}


/*
$(document).ready(function () {
            $("div#divStatus").ajaxStart(function () {

            	if(ifShow == true){

				 	divwindow = new EFModelWindow("testDivWindow");
					divwindow.set($("<img src="+EF_IMAGES_PATH+"ajax-loader.gif >"));

					divwindow.height = 30;
					divwindow.width = 30;


					divwindow.show();



					$("div#divStatus").ajaxStop(function () {
	                	divwindow.close();
	                	var grid = efgrid.getGridObject("ef_grid_result");
						grid.setData(ajaxEi);
						grid.refresh();
	            	});
            	}
               // $(this).html("<img src="+EF_IMAGES_PATH+"ajax-loader.gif >");
            });
        });
*/

/**
	<EF:EFColumn ename="double1" cname="数据一" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double2" cname="数据二" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double3" cname="数据三" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double4" cname="数据四" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double5" cname="数据五" sort="true" formatString="#,###,##0.000" />

    <EF:EFColumn ename="double6" cname="数据六" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double7" cname="数据七" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double8" cname="数据八" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double9" cname="数据九" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double10" cname="数据十" sort="true" formatString="#,###,##0.000" />

    <EF:EFColumn ename="double11" cname="数据十一" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double12" cname="数据十二" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double13" cname="数据十三" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double14" cname="数据十四" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double15" cname="数据十五" sort="true" formatString="#,###,##0.000" />

    <EF:EFColumn ename="double16" cname="数据十六" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double17" cname="数据十七" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double18" cname="数据十八" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double19" cname="数据十九" sort="true" formatString="#,###,##0.000" />
	<EF:EFColumn ename="double20" cname="数据二十" sort="true" formatString="#,###,##0.000" />


**/