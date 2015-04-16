/**
 * Generate time : 2011-07-27 17:48:19
 */
package com.baosight.iplat4j.ee.bb.service;
import org.apache.log4j.Logger;
import com.baosight.iplat4j.ee.bb.domain.EEBB03;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceEEBB03 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEBB03.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		EEBB03 bean = new EEBB03();
		EiInfo outInfo = super.initLoad(inInfo, bean);		
		return outInfo;
	}

	/**
	 * 查询
	 * @param 输入EiInfo
	 * @return 输出EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		EEBB03 bean = new EEBB03();
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEBB03.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, bean);
		EiInfo outInfo = super.query(inInfo, true);
		return outInfo;
	}

	/**
	 * 删除
	 * @param 输入EiInfo
	 * @return 输出EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		super.delete(inInfo, "EEBB03.delete");
		return query(inInfo); // delete后重新查询并刷新页面
	}
	/**
	 * 新增
	 * @param 输入EiInfo
	 * @return 输出EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		super.insert(inInfo, "EEBB03.insert");
		return query(inInfo); // insert后重新查询并刷新页面
	}
	/**
	 * 修改
	 * @param 输入EiInfo
	 * @return 输出EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		super.update(inInfo, "EEBB03.update");
		return query(inInfo); // update后重新查询并刷新页面
	}

}
