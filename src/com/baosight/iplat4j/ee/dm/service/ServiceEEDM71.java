package com.baosight.iplat4j.ee.dm.service;

import java.util.ArrayList;
import java.util.List;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ef.chart.ChartUtils;
import com.baosight.iplat4j.ef.chart.EfChart;
import com.baosight.iplat4j.ef.chart.chartElement.CEApply;
import com.baosight.iplat4j.ef.chart.chartElement.CECategory;
import com.baosight.iplat4j.ef.chart.chartElement.CEDataSeries;
import com.baosight.iplat4j.ef.chart.chartElement.CETrendLine;
import com.baosight.iplat4j.ef.chart.chartElement.CEVLine;
import com.baosight.iplat4j.ef.chart.chartElement.styleImpl.SAnimation;
import com.baosight.iplat4j.ef.chart.chartElement.styleImpl.SFont;
import com.baosight.iplat4j.ef.chart.service.ServiceChartBase;

/**
 * 图形示例代码（template方式）
 * @author maolingyan
 *
 */
public class ServiceEEDM71 extends ServiceChartBase{
	/**
	 * 初始化
	 */
	public String[] genInitChartInfo(EiInfo info){
		StringBuffer sb = new StringBuffer();
		sb.append(ChartUtils.chartAttr2Str("bgcolor",info.getString("bgcolor")));
		sb.append(ChartUtils.chartAttr2Str("canvasBgColor",info.getString("canvasBgColor")));
		sb.append(ChartUtils.chartAttr2Str("showValues",info.getString("showValues")));
		if("1".equals(info.getString("dataType"))){
			return new String[]{"冰箱产量示意图","月份","产量",null,null,null,null,sb.toString()};
		}else{
			return new String[]{"栏目信息发布量示意图","月份","销售量",null,null,null,null,sb.toString()};
		}
	}
	
	/**
	 * category
	 */
	public List genChartCatLabels(EiInfo info){
		List list = new ArrayList();
		if("1".equals(info.getString("dataType"))){
			list.add("1月");
			list.add("2月");
			list.add("3月");
		}else{
			if("1".equals(info.getString("isFreeChart"))){
				list.add("1月");
				list.add("2月");
				list.add(new CECategory("3月"));
				list.add("4月");
			}else{
				list.add("1月");
				list.add("2月");
				list.add(genVLine());
				list.add(new CECategory("3月"));
				list.add("3月");
			}
		}
		return list;
	}
	
	public List genSChartDataValues(EiInfo info){
		List list = new ArrayList();
		list.add("120");
		list.add("240");
		list.add("100");
		return list;
	}
	
	/**
	 * 分区线
	 * @return
	 */
	private CEVLine genVLine(){
		CEVLine vline = new CEVLine();
		vline.setColor("00AACC");
		vline.setDashed("1");
		vline.setDashGap("6");
		vline.setDashLen("2");
		vline.setThickness("2");
		return vline;
	}
	
	public List genChartTrendLineList(EiInfo info){
		List list = new ArrayList();
		if(!"1".equals(info.getString("dataType"))){
			CETrendLine trendLine = new CETrendLine();
			trendLine.setStartValue("250");
			trendLine.setIsTrendZone("0");
			trendLine.setThickness("2");
			trendLine.setDisplayValue("合格标准");
			trendLine.setColor("0372AB");
			list.add(trendLine);
			
			CETrendLine trendLine1 = new CETrendLine();
			trendLine1.setStartValue("250");
			trendLine1.setEndValue("350");
			trendLine1.setIsTrendZone("1");
			trendLine1.setValueOnRight("1");
			trendLine1.setDisplayValue("达标");
			trendLine1.setColor("BC9F3F");
			list.add(trendLine1);
			
			CETrendLine trendLine2 = new CETrendLine();
			trendLine2.setStartValue("350");
			trendLine2.setEndValue("500");
			trendLine2.setIsTrendZone("1");
			trendLine2.setValueOnRight("1");
			trendLine2.setDisplayValue("优秀");
			trendLine2.setColor("894D1B");
			list.add(trendLine2);
		}
		return list;
	}
	
	public void setChartStyle(EiInfo info, EfChart chart){
		if(!"1".equals(info.getString("dataType"))){
			//样式--定义
			SAnimation animation = new SAnimation("Anim1");
			animation.setParam("_yScale");
			animation.setStart("0");
			animation.setDuration("1");
			chart.addStyleDefinition(animation);
			
			SAnimation animation2 = new SAnimation("Anim2");
			animation2.setParam("_alpha");
			animation2.setStart("0");
			animation2.setDuration("5");
			animation2.setEasing("strong");
			chart.addStyleDefinition(animation2);
			
			SFont font = new SFont("font1");
			font.setBorderColor("1D8BD1");
			font.setBgColor("1D8BD1");
			font.setColor("FFFFFF");
			chart.addStyleDefinition(font);
			//样式--应用
			chart.addStyleApply(new CEApply(animation,"VLINES"));
			chart.addStyleApply(animation2,"TRENDLINES");
			chart.addStyleApply(font,"DATAVALUES");
		}
	}
	
	protected boolean isMData(EiInfo info){
		if(!"1".equals(info.getString("dataType"))){
			return true;
		}
		return false;
	}
	
	protected List genSeriesNames(EiInfo info){
		List list = new ArrayList();
		list.add("民生新闻");
		list.add("财经新闻");
		list.add("娱乐新闻");
		return list;
	}
	
	protected List genMChartDataValues(EiInfo info){
		List list = new ArrayList();
		
		List list1 = new ArrayList();
		list1.add("320");
		list1.add("440");
		list1.add("200");
		list1.add("300");
		list.add(list1);
		
		List list2 = new ArrayList();
		list2.add("220");
		list2.add("140");
		list2.add("200");
		list2.add("300");
		list.add(list2);
		
		List list3 = new ArrayList();
		list3.add("120");
		list3.add("220");
		list3.add("480");
		list3.add("400");
		list.add(list3);
		
		return list;
	}
	
	protected List genMChartDatasetList(EiInfo info){
		String chartType = info.getString("chartType");
		List list = super.genMChartDatasetList(info);
		
		CEDataSeries datasetSeries1 = (CEDataSeries)list.get(0);
		datasetSeries1.setColor("FF7FFF");
		datasetSeries1.setShowValues("1");
		
		CEDataSeries datasetSeries2 = (CEDataSeries)list.get(1);
		datasetSeries2.setColor("FF0000");
		if("MSColumnLine3D".equals(chartType)){
			datasetSeries2.setRenderAs("Line");
		}
		
		CEDataSeries datasetSeries3 = (CEDataSeries)list.get(2);
		datasetSeries3.setColor("FFFF2A");
		if("MSColumnLine3D".equals(chartType)){
			datasetSeries3.setRenderAs("Line");
		}
		
		return list;
	}
}
