/**
 * Generate time : 2011-04-12 03:19:50
 */
package com.baosight.iplat4j.ee.dm.service;
import org.apache.log4j.Logger;

import com.baosight.iplat4j.common.constant.EPResource;
import com.baosight.iplat4j.common.ee.domain.Teedm1001;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.resource.I18nMessages;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceEEDM1002 extends ServiceEPBase {

	private static final Logger logger = Logger.getLogger(ServiceEEDM1002.class);

	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		Teedm1001 teedm1001 = new Teedm1001();
		EiInfo outInfo = super.initLoad(inInfo, teedm1001);		
		return outInfo;
	}

	/**
	 * 查询
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
	    
	    Teedm1001 teedm1001 = new Teedm1001();
        inInfo.setMethodParam(MethodParamConstants.sqlName, "teedm1001.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, teedm1001);

		EiInfo outInfo = super.query(inInfo, true);

		return outInfo;
	}
	
	/**
	 * 删除
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		
		Teedm1001 teedm1001 = new Teedm1001();
		EiBlock block = inInfo.getBlock("result");

		block.setBlockMeta(teedm1001.eiMetadata);

		int i = 0;
		for (i = 0; i < block.getRowCount(); i++) {

			teedm1001.fromMap(block.getRow(i));

			dao.update("teedm1001.delete", teedm1001);
		}

		//删除后的提示信息用国际化资源类I18nMessages从系统配置中获取
		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(i), I18nMessages.getText("label.delete") });

		return query(inInfo);
	}

	/**
	 * 修改
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		Teedm1001 teedm1001 = new Teedm1001();
		EiBlock block = inInfo.getBlock("result");

		block.setBlockMeta(teedm1001.eiMetadata);

		int i = 0;
		for (i = 0; i < block.getRowCount(); i++) {

			teedm1001.fromMap(block.getRow(i));

			dao.update("teedm1001.update", teedm1001);
		}

		inInfo.setMsgByKey(EPResource.EP_1000, new String[] {
				String.valueOf(i), I18nMessages.getText("label.update") });

		return query(inInfo);
	}

	/**
	 * 添加
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		Teedm1001 teedm1001 = new Teedm1001();
		inInfo.getBlock("result").setBlockMeta(teedm1001.eiMetadata);

		int i = 0;
		for (i = 0; i < inInfo.getBlock("result").getRowCount(); i++) {
			teedm1001.fromMap(inInfo.getBlock("result").getRow(i));
			dao.update("teedm1001.insert", teedm1001);

		}
		inInfo.setMsgByKey(EPResource.EP_1000, new String[]{String.valueOf(i),I18nMessages.getText("label.insert")});

		return query(inInfo);

	}

}
