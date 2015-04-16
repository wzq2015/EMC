package com.baosight.iplat4j.ee.dm.service;

import java.util.ArrayList;
import java.util.List;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ef.chart.service.ServiceChartBase;

/**
 * 单系列数据 可以用于fusionChart、freeChart
 * @author maolingyan
 *
 */
public class ServiceEEDM711 extends ServiceChartBase {
	
	/**在EEDM711的jsp标签没有配置service和method的时候，开放此方法，效果相同
	public EiInfo initLoad(EiInfo inInfo){
		return getChartData(inInfo);
	}
	*/
	
	protected String[] genInitChartInfo(EiInfo info){
		return new String[]{"冰箱产量示意图","月份","产量"};
	}
	
	protected List genChartCatLabels(EiInfo info){
		List list = new ArrayList();
		list.add("1月");
		list.add("2月");
		list.add("3月");
		return list;
	}
	
	protected List genSChartDataValues(EiInfo info){
		List list = new ArrayList();
		list.add("120");
		list.add("240");
		list.add("100");
		return list;
	}

}
