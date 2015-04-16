/**
 * Generate time : 2011-07-27 16:48:13
 */

/**
 * 点击查询按钮
 */
button_query_onclick = function () {
	efgrid.submitInqu("ef_grid_result", "ee", "EEBB03", "query");
}

/**
 * 点击删除按钮
 */
button_delete_onclick = function () {
	efgrid.submitForm("ef_grid_result", "ee", "EEBB03", "delete", true);
}
/**
 * 点击新增按钮
 */
button_insert_onclick = function () {
	efgrid.submitForm("ef_grid_result", "ee", "EEBB03", "insert", true);
}
/**
 * 点击修改按钮
 */
button_update_onclick = function () {
	efgrid.submitForm("ef_grid_result", "ee", "EEBB03", "update", true);
}
