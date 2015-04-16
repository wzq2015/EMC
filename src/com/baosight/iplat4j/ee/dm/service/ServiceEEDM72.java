package com.baosight.iplat4j.ee.dm.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ef.chart.service.ServiceChartBase;

public class ServiceEEDM72 extends ServiceChartBase {
	
	protected String[] genInitChartInfo(EiInfo info) {
		String ss = info.getString("chartInfo");
		if(StringUtils.isBlank(ss))
			return null;
		
		return ss.split(",");
	}
	
	protected List genChartCatLabels(EiInfo info) {
		String ss = info.getString("chartCats");
		if(StringUtils.isBlank(ss))
			return null;
		
		String[] cc = ss.split(",");
		return Arrays.asList(cc);
	}

	protected boolean isMData(EiInfo info){
		String ss = info.getString("chartSeries");
		if(StringUtils.isBlank(ss))
			return false;
		
		return true;
	}

	protected List genSChartDataValues(EiInfo info) {
		String ss = info.getString("chartData");
		if(StringUtils.isBlank(ss))
			return null;
		
		String[] cc = ss.split(",");
		return Arrays.asList(cc);
	}

	protected List genMChartDataValues(EiInfo info) {
		String ss = info.getString("chartData");
		if(StringUtils.isBlank(ss))
			return null;
		
		String[] c = ss.split(";");
		if(c == null || c.length == 0)
			return null;
		
		List list = new ArrayList();
		
		for(int i=0;i<c.length;i++)
		{
			String[] cc = c[i].split(",");
			list.add(Arrays.asList(cc));
		}
		return list;
	}

	protected List genSeriesNames(EiInfo info) {
		String ss = info.getString("chartSeries");
		if(StringUtils.isBlank(ss))
			return null;
		
		String[] cc = ss.split(",");
		return Arrays.asList(cc);
	}


}
