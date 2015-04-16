/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.constant.EPResource;
import com.baosight.iplat4j.common.ee.domain.TEEDM01;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.resource.I18nMessages;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author zhongjiwei
 * 类ServiceEEDM10是为了实现演示国际化资源使用的功能
 * 
 */
public class ServiceEEDM10 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM10.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		TEEDM01 teedm01 = new TEEDM01();
		EiInfo outInfo = super.initLoad(inInfo, teedm01);
		
		return outInfo;
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
	
	 /* 删除
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		EiBlock block = inInfo.getBlock("result");

		block.setBlockMeta(teedm01.eiMetadata);

		int i = 0;
		for (i = 0; i < block.getRowCount(); i++) {

			teedm01.fromMap(block.getRow(i));

			dao.update("teedm01.delete", teedm01);
		}

		//删除后的提示信息用国际化资源类I18nMessages从系统配置中获取
		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(i), I18nMessages.getText("label.delete") });

		return query(inInfo);
	}

	
	public EiInfo update(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		EiBlock block = inInfo.getBlock("result");

		block.setBlockMeta(teedm01.eiMetadata);

		int i = 0;
		for (i = 0; i < block.getRowCount(); i++) {

			teedm01.fromMap(block.getRow(i));

			dao.update("teedm01.update", teedm01);
		}

		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(i), I18nMessages.getText("label.update") });

		return query(inInfo);
	}

	public EiInfo insert(EiInfo inInfo) {
		TEEDM01 teedm01 = new TEEDM01();
		inInfo.getBlock("result").setBlockMeta(teedm01.eiMetadata);

		int i = 0;
		for (i = 0; i < inInfo.getBlock("result").getRowCount(); i++) {
			teedm01.fromMap(inInfo.getBlock("result").getRow(i));
			dao.update("teedm01.insert", teedm01);

		}
		inInfo.setMsgByKey(EPResource.EP_1000, new String[]{String.valueOf(i),I18nMessages.getText("label.insert")});

		return query(inInfo);
	}
	
}
