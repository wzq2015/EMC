/**
 * 
 */
package com.baosight.iplat4j.ee.nt.service;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ee.domain.TEENT01;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author ranyunqian
 *
 */
public class ServiceEENT01 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEENT01.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		TEENT01 teent01 = new TEENT01();
		EiInfo outInfo = super.initLoad(inInfo, teent01);
		
		return outInfo;
	}

	/**
	 * 查询
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {

		TEENT01 teent01 = new TEENT01();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "teent01.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, teent01);

		EiInfo outInfo = super.query(inInfo, true);

		return outInfo;
	}
	
	/**
	 * 删除
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		
		TEENT01 teent01 = new TEENT01();
		inInfo.getBlock("result").setBlockMeta(teent01.eiMetadata);

		super.delete(inInfo);
		return query(inInfo); //删除记录后重新查询并刷新页面
	}

	/**
	 * 修改
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		
		TEENT01 teent01 = new TEENT01();
		inInfo.getBlock("result").setBlockMeta(teent01.eiMetadata);

		super.update(inInfo);
		return query(inInfo);
	}

	/**
	 * 添加
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		
		TEENT01 teent01 = new TEENT01();
		inInfo.getBlock("result").setBlockMeta(teent01.eiMetadata);

		super.insert(inInfo);
		return query(inInfo);
	}

}
