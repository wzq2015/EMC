/**
 * Generate time : 2011-07-27 15:39:40
 */
package com.baosight.iplat4j.ee.bb.service;
import org.apache.log4j.Logger;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEEBB02 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEBB02.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		EiInfo outInfo = super.initLoad(inInfo);		
		return outInfo;
	}

	/**
	 * 查询
	 * @param 输入EiInfo
	 * @return 输出EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		EiInfo outInfo = super.query(inInfo, "EEBB02.query");
		return outInfo;
	}

	/**
	 * 新增
	 * @param 输入EiInfo
	 * @return 输出EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		super.insert(inInfo, "EEBB02.insert");
		return query(inInfo);
	}
	/**
	 * 修改
	 * @param 输入EiInfo
	 * @return 输出EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		super.update(inInfo, "EEBB02.update");
		return query(inInfo);
	}
	/**
	 * 删除
	 * @param 输入EiInfo
	 * @return 输出EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		super.delete(inInfo, "EEBB02.delete");
		return query(inInfo);
	}

}
