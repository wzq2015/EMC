package com.baosight.iplat4j.ee.dm.service;

import java.util.Iterator;

import com.baosight.iplat4j.cache.hazelcast.HazelcastFactory;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.IMap;
import com.hazelcast.impl.FactoryImpl;
import com.hazelcast.impl.FactoryImpl.HazelcastInstanceProxy;
import com.hazelcast.nio.Address;

public class ServiceEEDM91 extends ServiceEPBase {
	
	public EiInfo initLoad(EiInfo inInfo) {

		return super.initLoad(inInfo);

	}

	public EiInfo insert(EiInfo inInfo)
	{
		EiInfo outInfo = new EiInfo();
		String key = inInfo.getString("imapKey");
		String value = inInfo.getString("imapValue");
		IMap<String, String> map = null;
		try {
			map = HazelcastFactory.getInstance().getMap("test");
			map.lock(key);
			map.put(key, value);
			outInfo.setMsg("成功设置IMap，key: " + key + ", value: " + value);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			outInfo.setStatus(EiConstant.STATUS_FAILURE);
			outInfo.setMsg("设置失败： "+e.getStackTrace());
		}
		finally {
			if (map != null) {
				map.unlock(key);
			}
		}
		return outInfo;
	}
	
	public EiInfo show(EiInfo inInfo)
	{
		HazelcastInstance instance = HazelcastFactory.getInstance();
		IMap<String, String> map = instance.getMap("test");
		HazelcastInstanceProxy factoryImpl = (HazelcastInstanceProxy)instance;
		Address masterAddress = ((FactoryImpl)factoryImpl.getHazelcastInstance()).node.getMasterAddress();
		String address = masterAddress.toString();
		String show = "当前Hazelcast集群Master的地址：\n" + address +"\n";
	    show = show + "map.getLocalMapStats()接口获取的值如下:\n" + map.getLocalMapStats() + "\n";
		Iterator keys = map.keySet().iterator();
		show = show + "IMap中的键值对如下：\n";
		while(keys.hasNext())
		{
			String key = (String)keys.next();
			String value = map.get(key);
			String oneRow = "key:"+key+",value:"+value;
			show = show+oneRow+"\n";
		}

		inInfo.set("show", show);
		inInfo.setMsg("查询IMap成功!");
		return inInfo;
	}
	
//	public EiInfo getInfo(EiInfo inInfo) {
//		EiInfo outInfo = new EiInfo();
//		HazelcastInstance instance = HazelcastFactory.getInstance();
//		HazelcastInstanceProxy factoryImpl = (HazelcastInstanceProxy)instance;
//		Address masterAddress = ((FactoryImpl)factoryImpl.getHazelcastInstance()).node.getMasterAddress();
//		String address = masterAddress.getHost();
//		outInfo.set("masterAddresss", address);
//		return outInfo;
//	}
}
