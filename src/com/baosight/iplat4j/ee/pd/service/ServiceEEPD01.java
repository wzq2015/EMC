package com.baosight.iplat4j.ee.pd.service;

import com.baosight.iplat4j.common.constant.EPResource;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.resource.I18nMessages;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.ej.pd.JobConstants;
import com.baosight.iplat4j.ej.pd.JobQueueManager;
import com.baosight.iplat4j.ej.pd.domain.EJPD01;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceEEPD01 extends ServiceEPBase {

	public EiInfo initLoad(EiInfo inInfo) {

		EJPD01 ejpd01 = new EJPD01();
		EiInfo outInfo = super.initLoad(inInfo, ejpd01);
		return outInfo;
	}

	/**
	 * 查询作业信息
	 * 
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		EJPD01 ejpd01 = new EJPD01();
		inInfo.setMethodParam(MethodParamConstants.sqlName, "EJPD01.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, ejpd01);
		EiInfo outInfo = super.query(inInfo, true);
		return outInfo;
	}

	/**
	 * 添加作业记录
	 * 
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		EJPD01 ejpd01 = new EJPD01();
		inInfo.getBlock(JobConstants.RESULTBLOCKNAME).setBlockMeta(ejpd01.eiMetadata);

		int i = 0;
		// 要添加的数据存储在"result"Block块中
		EiBlock eiBlock = inInfo.getBlock(JobConstants.RESULTBLOCKNAME);
		int rowcount = eiBlock.getRowCount();

		for (i = 0; i < rowcount; i++) {
			ejpd01.fromMap(eiBlock.getRow(i));
			// 逐条记录添加
			dao.insert("EJPD01.insert", ejpd01);
		}

		//刷新队列
		if(rowcount > 0)
		{
			 JobQueueManager jobQueueManager = (JobQueueManager)SpringApplicationContext.getBean("jobQueueManager");
			 jobQueueManager.setUpdateTime();
		}

		inInfo.setMsgByKey(EPResource.EP_1000,
				new String[] { String.valueOf(i), I18nMessages.getText("label.insert", "插入") });

		return query(inInfo);
	}

	/**
	 * 删除参数记录
	 * 
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		EJPD01 ejpd01 = new EJPD01();
		inInfo.getBlock(JobConstants.RESULTBLOCKNAME).setBlockMeta(ejpd01.eiMetadata);

		super.delete(inInfo, "EJPD01.delete", JobConstants.RESULTBLOCKNAME);

		return query(inInfo); // 删除记录后重新查询刷新显示页面
	}

	/**
	 * 修改作业记录
	 * 
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		EJPD01 ejpd01 = new EJPD01();
		inInfo.getBlock(JobConstants.RESULTBLOCKNAME).setBlockMeta(ejpd01.eiMetadata);

		int i = 0;
		// 要修改的数据存储在"result"Block块中
		EiBlock eiBlock = inInfo.getBlock(JobConstants.RESULTBLOCKNAME);

		int rowcount = eiBlock.getRowCount();
		for (i = 0; i < rowcount; i++) {
			ejpd01.fromMap(eiBlock.getRow(i));
			// 逐条记录修改
			dao.update("EJPD01.update", ejpd01);
		}

		//刷新队列
		if(rowcount > 0)
		{
			 JobQueueManager jobQueueManager = (JobQueueManager)SpringApplicationContext.getBean("jobQueueManager");
			 jobQueueManager.setUpdateTime();
		}
		inInfo.setMsgByKey(EPResource.EP_1000,
				new String[] { String.valueOf(i), I18nMessages.getText("label.update", "修改") });

		return query(inInfo);
	}

}
