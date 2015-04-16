package com.baosight.iplat4j.ee.dm.service;

import java.util.HashMap;
import java.util.Map;

import com.baosight.iplat4j.common.constant.EPResource;
import com.baosight.iplat4j.core.FrameworkInfo;
import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.threadlocal.UserSession;
import com.baosight.iplat4j.ep.DaoEPBase;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.NameParser;

public class ServiceEEDM1010 extends ServiceEPBase {

	/**
	 * 页面初始化
	 * 
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {
		EiInfo outInfo = new EiInfo();
		outInfo.setMsgByKey(EPResource.EP_2001, new String[] { String
				.valueOf(UserSession.getLoginName()) });
		EiBlockMeta eiMetadata = new EiBlockMeta();
		outInfo.addBlock("result");
		outInfo.getBlock("result").setBlockMeta(eiMetadata);
		return outInfo;
	}

	/**
	 * query
	 * 
	 * @param 包含参数的EiInfo
	 * @return 包含结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {
		String serviceName = parseQueryInfo(inInfo);
		String queryServiceName = serviceName + ".query";
		DaoEPBase daoBean = getBean(serviceName);

		EiInfo outInfo = super.query(inInfo, queryServiceName, daoBean, null,
				"inqu_status", "result", "result", true);

		return outInfo;
	}

	private DaoEPBase getBean(String serviceName) {
		DaoEPBase daoBean = null;

		String subSystemName = NameParser.getServicePackageName(serviceName);
		String projectName = FrameworkInfo
				.getProjectEnameByModule(subSystemName);
		String classLoadName = "com.baosight." + projectName + "."
				+ subSystemName + ".domain." + serviceName;
		try {
			Class bean = Class.forName(classLoadName);
			daoBean = (DaoEPBase) bean.newInstance();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return daoBean;
	}

	private String parseQueryInfo(EiInfo inInfo) {
		Map infoQueryRow = inInfo.getBlock(EiConstant.queryBlock).getRow(0);
		// 获取服务名
		String serviceName = infoQueryRow.get("service_name").toString()
				.toUpperCase().trim();

		EiBlock queryBlock = new EiBlock(EiConstant.queryBlock);

		Map queryRow = new HashMap();
		for (int i = 1; i < 4; i++) {
			String fieldName = "fieldName" + i;
			String filedValue = "fieldValue" + i;
			Object keyObject = infoQueryRow.get(fieldName);
			Object valueObject = infoQueryRow.get(filedValue);
			if (keyObject != null && valueObject != null) {
				String key = keyObject.toString().trim();
				String value = valueObject.toString().trim();
				if ((!"".equals(key)) && (!"".equals(value))) {
					queryRow.put(key, value);
				}
			}
		}
		queryBlock.addRow(queryRow);
		inInfo.setBlock(queryBlock);
		return serviceName;
	}

	public EiInfo insert(EiInfo inInfo) {
		String serviceName = parseQueryInfo(inInfo);
		String insertServiceName = serviceName + ".insert";
		String queryServiceName = serviceName + ".query";

		super.insert(inInfo, insertServiceName, "result", true);

		DaoEPBase daoBean = getBean(serviceName);
		EiInfo outInfo = super.query(inInfo, queryServiceName, daoBean, null,
				"inqu_status", "result", "result", true);
		return outInfo;
	}

	public EiInfo update(EiInfo inInfo) {
		String serviceName = parseQueryInfo(inInfo);
		String updateServiceName = serviceName + ".update";
		String queryServiceName = serviceName + ".query";

		super.update(inInfo, updateServiceName, "result", true);

		DaoEPBase daoBean = getBean(serviceName);
		EiInfo outInfo = super.query(inInfo, queryServiceName, daoBean, null,
				"inqu_status", "result", "result", true);
		return outInfo;
	}

	public EiInfo delete(EiInfo inInfo) {
		String serviceName = parseQueryInfo(inInfo);
		String deleteServiceName = serviceName + ".delete";
		String queryServiceName = serviceName + ".query";

		super.delete(inInfo, deleteServiceName, "result", true);

		DaoEPBase daoBean = getBean(serviceName);
		EiInfo outInfo = super.query(inInfo, queryServiceName, daoBean, null,
				"inqu_status", "result", "result", true);
		return outInfo;
	}
}
