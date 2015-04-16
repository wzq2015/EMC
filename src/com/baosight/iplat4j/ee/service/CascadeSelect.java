/**
 * 
 */
package com.baosight.iplat4j.ee.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

/**
 * @author wangyuqiu
 *
 */
public class CascadeSelect extends ServiceEPBase{
	public EiInfo getCascadeSelectEiInfo(String name,int i){
		EiInfo info = new EiInfo();
		return info;
	}
	
	public List queryList(List list,String key){
		List blockList = new ArrayList();
		Map map = null;
		for(int i = 0;i<list.size();i++){
			map = (Map)list.get(i);
			Map tempMap = new HashMap();
			tempMap.put(key, map.get(key));
			if(!isContain(blockList,tempMap,key))
				blockList.add(tempMap);
		}
		return blockList;
	}
	
	public boolean isContain(List list,Map map,String key){
		Map tempMap = null;
		for(int i = 0;i<list.size();i++){
			tempMap = (Map)list.get(i);
			if(tempMap.get(key).toString().equals(map.get(key).toString()))
				return true;
		}
		return false;
	}
	
	public EiInfo queryEiInfo(List list,Map map){
		EiInfo info = getCascadeSelectEiInfo(list.get(list.size()-1).toString(),list.size()-1);
		EiBlock currentblock = info.getBlock(list.get(list.size()-1).toString());
		EiBlockMeta meta = currentblock.getBlockMeta();
		List currentList = currentblock.getRows();
		String metaStr = meta.getMetaNames();
		info.set(list.get(list.size()-1).toString()+"meta", metaStr);
		System.out.println(metaStr);
		boolean flag = true;
		for(int i = 0;i<list.size();i++){
			if(list.get(i).toString().equals(""))
				flag = false;
		}
		if(!flag){
			currentList.clear();
		} 
		else {
			if(list.size() == 1)
				return info;
			else {
				String currentValue = list.get(list.size()-2).toString();
				Map tempMap = null;
				List tempList = new ArrayList();
				tempList.addAll(currentList);
				for(int i = 0;i<tempList.size();i++){
					tempMap = (Map)tempList.get(i);
					if(!tempMap.get(info.get("searchKey")).equals(currentValue)){
						currentList.remove(tempMap);
					}
				}
			}
		}
		
		return info;
	}
	
	
	public EiInfo getCascadeSelect(EiInfo info){
		EiInfo outinfo = null;
		List selectIdsList = null;
		String idsStr = (String )info.get("idsStr");
		String[] idsStrArray = idsStr.split(",");
		
		int currentSelectIndex = info.getInt("currentSelectIndex");
		
		List paramList = new ArrayList();
		Map paramMap = new HashMap();
		for(int i = 0; i<idsStrArray.length;i++){
			String tempStr = idsStrArray[i].substring(idsStrArray[i].lastIndexOf("-")+1, idsStrArray[i].length());
			paramMap.put(tempStr, info.get(tempStr));
		}
		for(int i = 0;i<currentSelectIndex;i++){
			String tempStr = idsStrArray[i].substring(idsStrArray[i].lastIndexOf("-")+1, idsStrArray[i].length());
			paramList.add(info.get(tempStr));
		}
		// 设置list的最后一个为blockname 
		paramList.add(idsStrArray[currentSelectIndex]);
		outinfo = queryEiInfo(paramList,paramMap);

		outinfo.set("currentSelectId", info.get("currentSelectId"));
		outinfo.set("idsStr", info.get("idsStr"));
		outinfo.set("divWindowId", info.get("divWindowId"));
		return outinfo;
	}
}
