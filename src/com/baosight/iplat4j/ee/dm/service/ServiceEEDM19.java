/**
树控件Demo文件列表：
1. web -> EE -> DM -> EEDM19.jsp										前台页面
2. web -> EE -> DM -> EEDM19.js											前台javascript
3. src -> com.baosight.iplat4j.ee.dm.service.ServiceEEDM19.java			后台服务，实现增删改查的业务逻辑
4. src -> com.baosight.iplat4j.ee.dm.service.ServiceEEDM1901.java		定义如何获取树中的内容
5. src -> com.baosight.iplat4j.ee.dm.domain.EEDM19.java					定义javabean
6. scr -> com.baosight.iplat4j.ee.dm.sql.EEDM19.xml						定义sql语句映射
7. 数据库中iplat.TEE05表													包括公司、产品、规格、合同号、金额字段
*/


package com.baosight.iplat4j.ee.dm.service;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ed.domain.Tedfa701;
import com.baosight.iplat4j.common.ee.domain.Tee16;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.dm.domain.EEDM19;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author wuzhanqing
 * @since 2009-06-22
 */
public class ServiceEEDM19 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM01.class);

	private final String SUBPAGE_RESULT_BLOCK_ID = "sp_result";
	private final String SUBPAGE_QUERY_BLOCK_ID = "sp_inqu_status";
	
	
	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		EEDM19 eedm19Bean = new EEDM19();
		
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM19.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, eedm19Bean);
		
		EiInfo outInfo = super.query(inInfo, true);
		
		// 设定总计值
		EEDM19 sumParam = new EEDM19();
		sumParam.setContractID("500");;
		sumParam.setAmount("3000");
		outInfo.getBlock(EiConstant.resultBlock).set(EiConstant.COLUMN_TOTAL_SUM, sumParam.toMap());

		//在EiInfo中添加从表的block块，设置好列信息并添加一空行
		EiBlock eiBlock = outInfo.addBlock(SUBPAGE_RESULT_BLOCK_ID);
		eiBlock.setBlockMeta(eedm19Bean.eiMetadata);	
		eiBlock.addRow(eedm19Bean);
		
		
		return outInfo;
	}

	/**
	 * 查询操作
	 * @param inInfo 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {

		EEDM19 eedm19Bean = new EEDM19();
		
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM19.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, eedm19Bean);
		
		EiInfo outInfo = super.query(inInfo, true);
		
		EEDM19 sumParam = new EEDM19();
		sumParam.setContractID("500");;
		sumParam.setAmount("3000");

		outInfo.getBlock(EiConstant.resultBlock).set(EiConstant.COLUMN_TOTAL_SUM, sumParam.toMap());

		
		return outInfo;
	}
	
	/**
	 * 删除操作
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		EEDM19 eedm19Bean = new EEDM19();
		
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM19.delete");
		inInfo.getBlock("result").setBlockMeta(eedm19Bean.eiMetadata);

		super.delete(inInfo, true);
		return query(inInfo); //删除记录后重新查询并刷新页面
	}

	/**
	 * 修改操作
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		EEDM19 eedm19Bean = new EEDM19();
		
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM19.update");
		inInfo.getBlock("result").setBlockMeta(eedm19Bean.eiMetadata);

		super.update(inInfo, true);
		
		return query(inInfo);
	}

	/**
	 * 添加操作
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		EEDM19 eedm19Bean = new EEDM19();
		
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM19.insert");
		inInfo.getBlock("result").setBlockMeta(eedm19Bean.eiMetadata);

		super.insert(inInfo, true);
		
		return query(inInfo);
	}

	/**
	 * 子页面查询
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo querySubpage(EiInfo inInfo) {
	    
		EEDM19 eedm19Bean = new EEDM19();
	   
        inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM19.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, eedm19Bean);
		inInfo.setMethodParam(MethodParamConstants.inDataBlock, SUBPAGE_RESULT_BLOCK_ID);
		inInfo.setMethodParam(MethodParamConstants.outDataBlock, SUBPAGE_RESULT_BLOCK_ID);
		inInfo.setMethodParam(MethodParamConstants.queryBlock, SUBPAGE_QUERY_BLOCK_ID);
		
		EiInfo outInfo = super.query(inInfo, true);

		return outInfo;
	}
}