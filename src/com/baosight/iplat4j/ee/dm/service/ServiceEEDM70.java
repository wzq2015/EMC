package com.baosight.iplat4j.ee.dm.service;


import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ef.chart.ChartConstants;
import com.baosight.iplat4j.ef.chart.ChartUtils;
import com.baosight.iplat4j.ef.chart.EfChart;
import com.baosight.iplat4j.ef.chart.chartElement.CEApply;
import com.baosight.iplat4j.ef.chart.chartElement.CECategory;
import com.baosight.iplat4j.ef.chart.chartElement.CEDataSeries;
import com.baosight.iplat4j.ef.chart.chartElement.CETrendLine;
import com.baosight.iplat4j.ef.chart.chartElement.CEVLine;
import com.baosight.iplat4j.ef.chart.chartElement.styleImpl.SAnimation;
import com.baosight.iplat4j.ef.chart.chartElement.styleImpl.SFont;
import com.baosight.iplat4j.ep.ServiceEPBase;

/**
 * fusionChart图形示例程序
 * @author 
 *
 */
public class ServiceEEDM70 extends ServiceEPBase{
	
	/**
	 * 获取fusionChart展现数据
	 * @param info
	 * @return
	 */
	public EiInfo getChartData(EiInfo info){
		EfChart chart;
		String dataType = info.getString("dataType");
		if("1".equals(dataType)){
			chart = generateSDtata(info); 
		}else{
			chart = generateCData(info); 
		}
		
		StringBuffer sb = new StringBuffer();
		sb.append(ChartUtils.chartAttr2Str("bgcolor",info.getString("bgcolor")));
		sb.append(ChartUtils.chartAttr2Str("canvasBgColor",info.getString("canvasBgColor")));
		sb.append(ChartUtils.chartAttr2Str("showValues",info.getString("showValues")));
		chart.setEtc(sb.toString());
		EiBlock block = info.addBlock("efChartBlock");
		block.set(ChartConstants.chartAttrName, chart);
		return info;
	}
	
	/**
	 * 单系列图形对象
	 * @return
	 */
	private EfChart generateSDtata(EiInfo info){
		EfChart chart  = new EfChart("冰箱产量示意图","月份","产量");
		//类别信息
		chart.addCategories(new Object[]{"1月","2月","3月"});
		//数据信息
		chart.addDataSeriesList(new String[]{"120","240","100"});
		return chart;
	}
	
	/**
	 * 多系列图形对象
	 * @return
	 */
	private EfChart generateCData(EiInfo info){
		String chartType = info.getString("chartType");
		EfChart chart  = new EfChart("牛羊猪肉销售量示意图","月份","销售量");
		//类别信息
		String isFreeChart = info.getString("isFreeChart");
		if("1".equals(isFreeChart)){
			chart.addCategories(new Object[]{"1月","2月",new CECategory("3月"),"4月"});
		}else{
			chart.addCategories(new Object[]{"1月","2月",genVLine(),new CECategory("3月"),"4月"});
		}
		
		//数据信息
		CEDataSeries dataSeries1 = new CEDataSeries();
		dataSeries1 = new CEDataSeries("猪肉","FF7FFF","1",null,new String[]{"320","440","200","300"});
		chart.addDataSeriesList(dataSeries1);
		
		CEDataSeries dataSeries2 = new CEDataSeries();
		dataSeries2 = new CEDataSeries("牛肉","FF0000",null,null,new String[]{"220","140","200","260"});
		if("MSColumnLine3D".equals(chartType)){
			dataSeries2.setRenderAs("Line");
		}
		chart.addDataSeriesList(dataSeries2);
		
		CEDataSeries dataSeries3 = new CEDataSeries();
		dataSeries3 = new CEDataSeries("羊肉","FFFF2A",null,null,new String[]{"120","220","480","400"});
		if("MSColumnLine3D".equals(chartType)){
			dataSeries3.setRenderAs("Line");
		}
		chart.addDataSeriesList(dataSeries3);
		
		//趋势线
		CETrendLine trendLine = new CETrendLine();
		trendLine.setStartValue("250");
		trendLine.setIsTrendZone("0");
		trendLine.setThickness("2");
		trendLine.setDisplayValue("合格标准");
		trendLine.setColor("0372AB");
		chart.addTrendLine(trendLine);
		
		CETrendLine trendLine1 = new CETrendLine();
		trendLine1.setStartValue("250");
		trendLine1.setEndValue("350");
		trendLine1.setIsTrendZone("1");
		trendLine1.setValueOnRight("1");
		trendLine1.setDisplayValue("达标");
		trendLine1.setColor("BC9F3F");
		chart.addTrendLine(trendLine1);
		
		CETrendLine trendLine2 = new CETrendLine();
		trendLine2.setStartValue("350");
		trendLine2.setEndValue("500");
		trendLine2.setIsTrendZone("1");
		trendLine2.setValueOnRight("1");
		trendLine2.setDisplayValue("优秀");
		trendLine2.setColor("894D1B");
		chart.addTrendLine(trendLine2);
		
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
		return chart;
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
	
}
