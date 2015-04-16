/**
 * 
 */
package com.baosight.iplat4j.ee.dm.utils;

import java.util.HashMap;
import java.util.regex.Pattern;

import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.resource.Resources;
import com.baosight.iplat4j.core.spring.SpringApplicationContext;
import com.baosight.iplat4j.dao.Dao;
import com.baosight.iplat4j.ep.DaoEPBase;

/**
 * @author wangyuqiu
 *
 */
public class EEDMUtils {
	public static String TEMP_FILE = "eedm.tempfile.dir";
	/**
	 * 取得文件上传路径
	 * @return
	 */
	public static String getEEDMTempFileDir() {
		
		//SoaConfig soaConfig = (SoaConfig) SpringApplicationContext.getBean(SoaConstants.SOACONFIG);
		//String templateDir = soaConfig.getServiceProperty(TEMP_FILE);
		String templateDir = Resources.getValue("message", TEMP_FILE);
		
		if(templateDir == null)
			templateDir = "";

		return templateDir;
	}
	
	/**
	 * 取得所要生成的block数据块
	 * @param id
	 * @param bean
	 * @param sql
	 * @return
	 */
	public static EiBlock generateBlock(String id,DaoEPBase bean,String sql){
		EiBlock block = new EiBlock(id);
		Dao dao = (Dao)SpringApplicationContext.getBean("dao");
		block.setBlockMeta(bean.eiMetadata);
		
		int offset = 0;
		int limit = 1000;
		int size = 1000;
		java.util.List returnList = null;

		int totalSize = 0;

		while (size == limit)
		{
			try {
				returnList = dao.query(sql, new HashMap(),
						offset, limit);

				if (returnList != null){
					size = returnList.size();
					block.addRows(returnList);
				}
				else
					size = 0;

				offset += limit;

				totalSize += size;

			} catch (Exception ex) {
				ex.printStackTrace();
				break;
			}
		}
		return block;
	}	
	
}
