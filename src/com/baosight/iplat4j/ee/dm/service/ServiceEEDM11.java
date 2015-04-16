/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.dm.domain.EEDM11;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author wangyuqiu
 *
 */
public class ServiceEEDM11 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM11.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		EEDM11 eedm01 = new EEDM11();
		EiInfo outInfo = super.initLoad(inInfo, eedm01);
		
		return outInfo;
	}

	/**
	 * 查询
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {

		EEDM11 eedm11 = new EEDM11();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM11.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, eedm11);

		EiInfo outInfo = super.query(inInfo, true);

		return outInfo;
	}
	
	/**
	 * 删除
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		EEDM11 eedm11 = new EEDM11();
		super.delete(inInfo,"EEDM11.delete",eedm11,true,"result");
		return query(inInfo); //删除记录后重新查询并刷新页面
	}

	/**
	 * 修改
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		EEDM11 eedm11 = new EEDM11();
		super.update(inInfo,"EEDM11.update",eedm11,true,"result");
		return query(inInfo);
	}

	/**
	 * 添加
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		EEDM11 eedm11 = new EEDM11();
		inInfo.getBlock("result").setBlockMeta(eedm11.eiMetadata);
		super.insert(inInfo, "EEDM11.insert",eedm11, true, "result");
		return query(inInfo);
	}

}
