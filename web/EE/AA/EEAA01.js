button_f2_onclick = function () 
{
    //debugger;
    var node = ef.getNodeById("efFormTime");
    var dd = new Date();
    node.value =  dd.getYear() + "-" + (dd.getMonth() + 1) + "-" + (dd.getDay() + 1) + "-" + dd.getHours() + "-" + dd.getMinutes() + "-" + dd.getSeconds() + "-" + dd.getMilliseconds();
	
    if (efvalidateForm(ef.get("EDFA00"))) {
      efgrid.submitInqu( "ef_grid_result", "ed","EDFA00","query");
    }
	
}

button_copy_onclick = function () 
{
   
	
	html2canvas( [ document.body ], {
	    onrendered: function( canvas ) {
	        /* canvas is the actual canvas element, 
	           to append it to the page call for example 	        */
	           document.body.appendChild( canvas );
	           var img = canvas.toDataURL()
	           window.open(img);
	        }
	});
	
    $('body').html2canvas();
    //var queue = html2canvas.Parse();
    //var canvas = html2canvas.Renderer(queue,{elements:{length:1}});
    //var img = canvas.toDataURL()
    //window.open(img);
};

