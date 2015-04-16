/**
 * 
 */
package com.baosight.iplat4j.ee.service;

import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.domain.TEE503;
import com.baosight.iplat4j.ef.ui.cascade.CascadeSelect;

/**
 * @author wangyuqiu
 * 
 */
public class ServiceEE503 extends CascadeSelect{

	public EiInfo getCascadeSelectEiInfo(String name,int i){
		EiInfo info = new EiInfo();
		info.addBlock(name);
		TEE503 tee503 = new TEE503();
		EiBlock block = info.getBlock(name);
		if(i == 0){
			block.setBlockMeta(tee503.getContinentBlockMeta());
			block.setRows(tee503.getContinentList());
		} else if(i == 1){
			info.set("searchKey", "continenet_cname");
			block.setBlockMeta(tee503.getCountryBlockMeta());
			block.setRows(tee503.getCountryList());
		} else if(i == 2){
			info.set("searchKey", "country_cname");
			block.setBlockMeta(tee503.getCityBlockMeta());
			block.setRows(tee503.getCityList());
		}
		return info;
	}
	
}
