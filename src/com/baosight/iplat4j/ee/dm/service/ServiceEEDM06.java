/**
 * 
 */
package com.baosight.iplat4j.ee.dm.service;

import java.io.File;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.dm.domain.EEDM06;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

/**
 * @author wangyuqiu
 *
 */
public class ServiceEEDM06 extends ServiceEPBase {


	/**
	 * 页面初始化
	 * @param EiInfo
	 * @return EiInfo
	 */
	public EiInfo initLoad(EiInfo inInfo) {

		EEDM06 eedm06 = new EEDM06();
		EiInfo outInfo = super.initLoad(inInfo, eedm06);
		
		return outInfo;
	}

	/**
	 * 查询
	 * @param 包含查询参数的EiInfo
	 * @return 包含查询结果数据集的EiInfo
	 */
	public EiInfo query(EiInfo inInfo) {

		EEDM06 eedm06 = new EEDM06();

		inInfo.setMethodParam(MethodParamConstants.sqlName, "EEDM06.query");
		inInfo.setMethodParam(MethodParamConstants.daoEPBaseBean, eedm06);

		EiInfo outInfo = super.query(inInfo, true);

		return outInfo;
	}
	
	/**
	 * 删除
	 * @param 包含删除参数的EiInfo
	 * @return 返回删除指定记录后重新查询的结果数据集的EiInfo
	 */
	public EiInfo delete(EiInfo inInfo) {
		EEDM06 eedm06 = new EEDM06();
		super.delete(inInfo,"EEDM06.delete",eedm06,true,"result");
		String fileUrl = eedm06.getFileUrl();
		if(!fileUrl.trim().equals("")){
			File file = new File(fileUrl);
			if(file.exists())	
				file.delete();
		}
		return query(inInfo); //删除记录后重新查询并刷新页面
	}

	/**
	 * 修改
	 * @param 包含修改记录的EiInfo
	 * @return 返回修改指定记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo update(EiInfo inInfo) {
		EEDM06 eedm06 = new EEDM06();
		super.update(inInfo,"EEDM06.update",eedm06,true,"result");
		return query(inInfo);
	}

	/**
	 * 添加
	 * @param 包含添加记录的EiInfo
	 * @return 返回添加记录后重新查询得到的结果数据集的EiInfo
	 */
	public EiInfo insert(EiInfo inInfo) {
		EEDM06 eedm06 = new EEDM06();
		inInfo.getBlock("result").setBlockMeta(eedm06.eiMetadata);
		super.insert(inInfo, "EEDM06.insert",eedm06, true, "result");
		return query(inInfo);
	}

}
