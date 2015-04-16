button_extract_onclick = function() {

	// var info = new EiInfo();
	//
	// info.setByNodeObject(document.forms[0]);

	// EiCommunicator.send("ED20", "extract", info, extract_callback, false,
	// true);
	efgrid.submitInqu("ef_grid_result", "ed", "ED20", "extract");
};

button_export_onclick = function() {
	efgrid.submitInqu("ef_grid_result", "ed", "ED20", "export");
	efbutton.setButtonStatus("export", true);
};

button_register_onclick = function() {
	efgrid.submitForm("ef_grid_result", "ed", "ED20", "register", true);
};