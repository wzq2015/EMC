/**
 *
 */
package com.baosight.iplat4j.ee.dm.service;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.constant.EPResource;
import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author ranyunqian
 *
 */
public class ServiceEEDM01 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM01.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		return query(inInfo);
	}

	/**
	 * 查询
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {

		TEEDM01 teedm01 = new TEEDM01();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "teedm01.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, teedm01);

		EiInfo outInfo = super.query(inInfo, true);

		return outInfo;
	}

	/**
	 * 删除
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock("result").setBlockMeta(teedm01.eiMetadata);

		super.delete(inInfo);
		return query(inInfo); //删除记录后重新查询并刷新页面
	}

	/**
	 * 修改
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock("result").setBlockMeta(teedm01.eiMetadata);

		super.update(inInfo);
		return query(inInfo);
	}

	/**
	 * 添加
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock("result").setBlockMeta(teedm01.eiMetadata);

		super.insert(inInfo);
		return query(inInfo);
	}

}
