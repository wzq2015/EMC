/**
 * Generate time : 2011-07-27 15:39:40
 */

/**
 * 点击查询按钮
 */
button_query_onclick = function () {
	efgrid.submitInqu("ef_grid_result", "ee", "EEBB02", "query");
}

/**
 * 点击新增按钮
 */
button_insert_onclick = function () {
	efgrid.submitForm("ef_grid_result", "ee", "EEBB02", "insert", true);
}
/**
 * 点击修改按钮
 */
button_update_onclick = function () {
	efgrid.submitForm("ef_grid_result", "ee", "EEBB02", "update", true);
}
/**
 * 点击删除按钮
 */
button_delete_onclick = function () {
	efgrid.submitForm("ef_grid_result", "ee", "EEBB02", "delete", true);
}
