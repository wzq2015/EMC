package com.baosight.fpserver.cm.im.service;

import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import java.util.*;
import java.util.Date;
import java.io.InputStream;
import java.sql.*;
import java.text.SimpleDateFormat;
import javax.script.*;

import org.apache.commons.pool.impl.GenericKeyedObjectPool.Config;

public class ServiceCMIMEnergysavingCalc extends ServiceEPBase 
{
	private ScriptEngine engine;
	
	public ServiceCMIMEnergysavingCalc()
	{
		ScriptEngineManager manager = new ScriptEngineManager();
        engine = manager.getEngineByName("JavaScript");
	}
	
	private String ReplaceAcqTagParts(String expression, String startTime, String endTime)
	{
		int startIndex = expression.indexOf("start(");
		while (startIndex > -1)
		{
			int startIndex2 = expression.indexOf(")", startIndex);
			if (startIndex2 < 0)
			{
				break;
			}
			String tag = expression.substring(startIndex+7, startIndex2-1);
			String tagValue = GetTagValueByTime(tag, startTime);
			if (tagValue.equals(""))
			{
				break;
			}
			expression = expression.replace("start(\"" + tag + "\")", tagValue);
			expression = expression.replace("#startTime#", startTime);
			startIndex = expression.indexOf("start(");
		}
		
		int endIndex = expression.indexOf("end(");
		while (endIndex > -1)
		{
			int endIndex2 = expression.indexOf(")", endIndex);
			if (endIndex2 < 0)
			{
				break;
			}
			String tag = expression.substring(endIndex+5, endIndex2-1);
			String tagValue = GetTagValueByTime(tag, endTime);
			if (tagValue.equals(""))
			{
				break;
			}
			expression = expression.replace("end(\"" + tag + "\")", tagValue);
			expression = expression.replace("#endTime#", endTime);
			endIndex = expression.indexOf("end(");
		}
		
		try
		{
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date startTimeDate = dateFormat.parse(startTime);
			Date endTimeDate = dateFormat.parse(endTime);
			long diff = endTimeDate.getTime() - startTimeDate.getTime();
			double totalhours = diff/(1000 * 60 * 60);
			expression = expression.replace("#runTime#", String.valueOf(totalhours));
		}
		catch (Exception e)
		{
			
		}
		
		return expression;
	}
	
	private String ReplaceInputTagParts(String expression, int projectId, int cycleIndex, int cycleId)
	{
		String startTime = "";
		String endTime = "";
		int startIndex = expression.indexOf("start(");
		while (startIndex > -1)
		{
			int startIndex2 = expression.indexOf(")", startIndex);
			if (startIndex2 < 0)
			{
				break;
			}
			String tag = expression.substring(startIndex+7, startIndex2-1);
			
			Map params = new HashMap();
			params.put("f_emcprojectId", projectId);
			params.put("f_emcprojectCycleCycleindex", cycleIndex-1);
			List cycleList = this.dao.query("tEmcprojectCycle.queryByProjectIdAndIndex", params, 0, 1000);
			if (cycleList.size() != 1)
			{
				break;
			}
			TEmcprojectCycle beforeCycle = (TEmcprojectCycle)(cycleList.get(0));
			params = new HashMap();
			params.put("f_emcprojectCycleId", beforeCycle.getF_emcprojectCycleId());
			params.put("f_deviceparaName", tag);
			List deviceParaEntryList = this.dao.query("tDeviceparaEntry.queryDeviceparaEntryByCycleId", params, 0, 1000);
			if (deviceParaEntryList.size() != 1)
			{
				break;
			}
			TDeviceparaEntry deviceparaEntry = (TDeviceparaEntry)(deviceParaEntryList.get(0));
			String tagValue = deviceparaEntry.getF_deviceparaEntryValue();
			startTime = deviceparaEntry.getF_deviceparaEntryDatetime();
			expression = expression.replace("start(\"" + tag + "\")", tagValue);
			expression = expression.replace("#startTime#", startTime);
			startIndex = expression.indexOf("start(");
		}
		
		int endIndex = expression.indexOf("end(");
		while (endIndex > -1)
		{
			int endIndex2 = expression.indexOf(")", endIndex);
			if (endIndex2 < 0)
			{
				break;
			}
			String tag = expression.substring(endIndex+5, endIndex2-1);
			
			Map params = new HashMap();
			params.put("f_emcprojectCycleId", cycleId);
			params.put("f_deviceparaName", tag);
			List deviceParaEntryList = this.dao.query("tDeviceparaEntry.queryDeviceparaEntryByCycleId", params, 0, 1000);
			if (deviceParaEntryList.size() != 1)
			{
				break;
			}
			TDeviceparaEntry deviceparaEntry = (TDeviceparaEntry)(deviceParaEntryList.get(0));
			String tagValue = deviceparaEntry.getF_deviceparaEntryValue();
			endTime = deviceparaEntry.getF_deviceparaEntryDatetime();
			expression = expression.replace("end(\"" + tag + "\")", tagValue);
			expression = expression.replace("#endTime#", endTime);
			endIndex = expression.indexOf("end(");
		}
		
		try
		{
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date startTimeDate = dateFormat.parse(startTime);
			Date endTimeDate = dateFormat.parse(endTime);
			long diff = endTimeDate.getTime() - startTimeDate.getTime();
			double totalhours = diff/(1000 * 60 * 60);
			expression = expression.replace("#runTime#", String.valueOf(totalhours));
		}
		catch (Exception e)
		{
			
		}
		
		return expression;
	}
	
	public void CalcAcqEnergysavingValue(EiInfo info)
	{
		try
		{
			List workCycleList = GetWorkCycleList();
			Map params = new HashMap();
			for (int i=0; i<workCycleList.size(); i++)
			{
				TEmcprojectCycle cycle = (TEmcprojectCycle)workCycleList.get(i);
				int cycleIndex = cycle.getF_emcprojectCycleCycleindex();
				String startTime = cycle.getF_emcprojectCycleStarttime();
				String endTime = cycle.getF_emcprojectCycleEndtime();
				int projectId = cycle.getF_emcprojectId();
				
				params = new HashMap();
				params.put("f_emcprojectId", projectId);
				List energysavingTypeList = this.dao.query("tEnergysavingType.queryByProjectId", params, 0, 1000);
				
				for (int j=0; j<energysavingTypeList.size(); j++)
				{
					try
					{
						TEnergysavingType energysavingType = (TEnergysavingType)energysavingTypeList.get(j);
						int energysavingTypeId = energysavingType.getF_energysavingTypeId();
						String formula = energysavingType.getF_energysavingTypeFormula();
						String formulaCalcStep = energysavingType.getF_energysavingTypeCalcstep();
						formula = ReplaceAcqTagParts(formula, startTime, endTime);
						formulaCalcStep = ReplaceAcqTagParts(formulaCalcStep, startTime, endTime);
	
						Object obj = engine.eval(formula);
						double energysavingValue = Double.parseDouble(obj.toString());
						Object obj1 = engine.eval(formulaCalcStep);
						String calcstep = obj1.toString();
						
						params = new HashMap();
						params.put("f_energysavingTypeId", energysavingTypeId);
						params.put("f_emcprojectCycleIndex", cycleIndex);
						List energysavingDetailList = this.dao.query("tEnergysavingDetail.queryByCycleIndexAndEnergysavingTypeId", params, 0, 1000);
						
						if ((energysavingDetailList == null) || (energysavingDetailList.size() == 0))
						{
							TEnergysavingDetail energysavingDetail = new TEnergysavingDetail();
							energysavingDetail.setF_energysavingTypeId(energysavingTypeId);
							energysavingDetail.setF_emcprojectCycleIndex(cycleIndex);
							energysavingDetail.setF_energysavingDetailAcqvalue(energysavingValue);
							energysavingDetail.setF_energysavingDetailAcqcalcstep(calcstep);
							
							this.dao.insert("tEnergysavingDetail.insert", energysavingDetail);
						}
						else if (energysavingDetailList.size() == 1)
						{
							TEnergysavingDetail energysavingDetail = (TEnergysavingDetail)(energysavingDetailList.get(0));
							energysavingDetail.setF_energysavingDetailAcqvalue(energysavingValue);
							energysavingDetail.setF_energysavingDetailAcqcalcstep(calcstep);
							
							this.dao.update("tEnergysavingDetail.update", energysavingDetail);
						}
					}
					catch (Exception e) { } 
				}
			}
		}
		catch(Exception e) { }
	}
	
	public void CalcInputEnergysavingValue(EiInfo info)
	{
		try
		{
			List workCycleList = GetWorkCycleList();
			Map params = new HashMap();
			for (int i=0; i<workCycleList.size(); i++)
			{
				TEmcprojectCycle cycle = (TEmcprojectCycle)workCycleList.get(i);
				int cycleId = cycle.getF_emcprojectCycleId();
				int cycleIndex = cycle.getF_emcprojectCycleCycleindex();
				int projectId = cycle.getF_emcprojectId();
				
				params = new HashMap();
				params.put("f_emcprojectId", projectId);
				List energysavingTypeList = this.dao.query("tEnergysavingType.queryByProjectId", params, 0, 1000);
				
				for (int j=0; j<energysavingTypeList.size(); j++)
				{
					try
					{
						TEnergysavingType energysavingType = (TEnergysavingType)energysavingTypeList.get(j);
						int energysavingTypeId = energysavingType.getF_energysavingTypeId();
						String formula = energysavingType.getF_energysavingTypeFormula();
						String formulaCalcStep = energysavingType.getF_energysavingTypeCalcstep();
						
						formula = ReplaceInputTagParts(formula, projectId, cycleIndex, cycleId);
						formulaCalcStep = ReplaceInputTagParts(formulaCalcStep, projectId, cycleIndex, cycleId);
						
						Object obj = engine.eval(formula);
						double energysavingValue = Double.parseDouble(obj.toString());
						Object obj1 = engine.eval(formulaCalcStep);
						String calcstep = obj1.toString();
						
						params = new HashMap();
						params.put("f_energysavingTypeId", energysavingTypeId);
						params.put("f_emcprojectCycleIndex", cycleIndex);
						List energysavingDetailList = this.dao.query("tEnergysavingDetail.queryByCycleIndexAndEnergysavingTypeId", params, 0, 1000);
						
						if ((energysavingDetailList == null) || (energysavingDetailList.size() == 0))
						{
							TEnergysavingDetail energysavingDetail = new TEnergysavingDetail();
							energysavingDetail.setF_energysavingTypeId(energysavingTypeId);
							energysavingDetail.setF_emcprojectCycleIndex(cycleIndex);
							energysavingDetail.setF_energysavingDetailInputvalue(energysavingValue);
							energysavingDetail.setF_energysavingDetailInputcalcstep(calcstep);
							
							this.dao.insert("tEnergysavingDetail.insert", energysavingDetail);
						}
						else if (energysavingDetailList.size() == 1)
						{
							TEnergysavingDetail energysavingDetail = (TEnergysavingDetail)(energysavingDetailList.get(0));
							energysavingDetail.setF_energysavingDetailInputvalue(energysavingValue);
							energysavingDetail.setF_energysavingDetailInputcalcstep(calcstep);
							this.dao.update("tEnergysavingDetail.update", energysavingDetail);
						}
					}
					catch (Exception e) { }
				}	
			}
		}
		catch(Exception e) { }
	}
	
	public EiInfo queryEnergysavingResultByTime(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		String startTime = info.get("StartTime").toString();
		String endTime = info.get("EndTime").toString();
		
		Map params = new HashMap();
		params.put("f_emcprojectId", info.get("f_emcprojectId"));
		List energysavingTypeList = this.dao.query("tEnergysavingType.queryByProjectId", params, 0, 1000);
		List energysavingResult = new ArrayList();
		TEnergysavingDetail energysavingDetail = new TEnergysavingDetail();
		for (int i=0; i<energysavingTypeList.size(); i++)
		{
			TEnergysavingType energysavingType = (TEnergysavingType)energysavingTypeList.get(i);
			int energysavingTypeId = energysavingType.getF_energysavingTypeId();
			energysavingDetail = new TEnergysavingDetail();
			energysavingDetail.setF_energysavingTypeId(energysavingTypeId);
			try
			{
				String formula = energysavingType.getF_energysavingTypeFormula();
				formula = ReplaceAcqTagParts(formula, startTime, endTime);
				Object obj = engine.eval(formula);
				double energysavingValue = Double.parseDouble(obj.toString());
				energysavingDetail.setF_energysavingDetailAcqvalue(energysavingValue);
			}
			catch (Exception e)
			{ 
				energysavingDetail.setF_energysavingDetailAcqvalue(0d);
			}
			
			energysavingResult.add(energysavingDetail);
		}	
		outInfo.addBlock("result");
		outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(energysavingDetail.eiMetadata);
		outInfo.getBlock(EiConstant.resultBlock).setRows(energysavingResult);
		
		return outInfo;
	}
	
	public EiInfo queryEnergysavingResultByDay(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		int year = Integer.parseInt(info.get("Year").toString());
		int month = Integer.parseInt(info.get("Month").toString());
		String energysavingTypeIds = info.get("EnergysavingTypeIds").toString();
		
		String[] energysavingTypeIdArray = energysavingTypeIds.split(",");
		Map params = new HashMap();
		params.put("f_emcprojectId", info.get("f_emcprojectId"));
		List allEnergysavingTypeList = this.dao.query("tEnergysavingType.queryByProjectId", params, 0, 1000);
		List energysavingTypeList = new ArrayList(); 
		for (int i=0; i<allEnergysavingTypeList.size(); i++)
		{
			TEnergysavingType energysavingType = (TEnergysavingType)allEnergysavingTypeList.get(i);
			boolean isFind = false;
			for (int j=0; j<energysavingTypeIdArray.length; j++)
			{
				if (energysavingType.getF_energysavingTypeId().toString().compareTo(energysavingTypeIdArray[j]) == 0)
				{
					isFind = true;
					break;
				}
			}
			if (isFind)
			{
				energysavingTypeList.add(energysavingType);
			}
		}
		
		Calendar startCalendar = Calendar.getInstance();
		Calendar endCalendar = Calendar.getInstance();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat shortDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		
		TEnergysavingDetail energysavingDetail = new TEnergysavingDetail();
		List energysavingResultList = new ArrayList();
		for (int i=0; i<energysavingTypeList.size(); i++)
		{
			startCalendar.set(year, month-1, 1, 0, 0, 0);
			endCalendar.set(year, month-1, 1, 0, 0, 0);
			endCalendar.add(Calendar.MONTH, 1);
			TEnergysavingType energysavingType = (TEnergysavingType)energysavingTypeList.get(i);
			int energysavingTypeId = energysavingType.getF_energysavingTypeId();
			
			while (startCalendar.before(endCalendar))
			{
				energysavingDetail = new TEnergysavingDetail();
				energysavingDetail.setF_energysavingTypeId(energysavingTypeId);
				String startTime = dateFormat.format(startCalendar.getTime());
				String startDay = shortDateFormat.format(startCalendar.getTime());
				energysavingDetail.setF_energysavingDetailAcqcalcstep(startDay);
				startCalendar.add(Calendar.DATE, 1);
				String endTime = dateFormat.format(startCalendar.getTime());
				try
				{
					String formula = energysavingType.getF_energysavingTypeFormula();
					formula = ReplaceAcqTagParts(formula, startTime, endTime);
					Object obj = engine.eval(formula);
					double energysavingValue = Double.parseDouble(obj.toString());
					energysavingDetail.setF_energysavingDetailAcqvalue(energysavingValue);
				}
				catch (Exception e)
				{ 
					energysavingDetail.setF_energysavingDetailAcqvalue(0d);
				}
				energysavingResultList.add(energysavingDetail);
			}
		}
		
		outInfo.addBlock("result");
		outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(energysavingDetail.eiMetadata);
		outInfo.getBlock(EiConstant.resultBlock).setRows(energysavingResultList);
		
		return outInfo;
	}
	
	private List GetWorkCycleList()
	{
		List workCycleList = new ArrayList();
		Map params = new HashMap();
		List projectCycleList = this.dao.query("tEmcprojectCycle.queryById", params, 0, 1000);
		for (int i=0; i<projectCycleList.size(); i++)
		{
			TEmcprojectCycle cycle = (TEmcprojectCycle)projectCycleList.get(i);
			String endTime = cycle.getF_emcprojectCycleEndtime();
			String endDate = endTime.substring(0, endTime.indexOf(" "));
			
			Calendar calendar = Calendar.getInstance();
		    calendar.setTime(new Date());
		    calendar.set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH) - 1);
		    Date lastDay = calendar.getTime();
		    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String nowDate = dateFormat.format(lastDay);
			if (endDate.equals(nowDate))
			{
				workCycleList.add(cycle);
			}
		}
		return workCycleList;
	}
	
	private String GetTagValueByTime(String tagName, String Time)
	{
		try
		{
			String startTime = Time;
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date startDateTime = dateFormat.parse(startTime);
			Calendar calendar = Calendar.getInstance();
		    calendar.setTime(startDateTime);
		    calendar.set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH) + 1);//设置为后一天
		    Date endDateTime = calendar.getTime();
		    String endTime = dateFormat.format(endDateTime);
		    
		    Map params = new HashMap();
		    params.put("tagName", tagName);
		    params.put("startTime", startTime);
		    params.put("endTime", endTime);

		    List resultList = this.dao.query("tEnergysavingDetail.gettagvalue", params, 0, 1);
		    if (resultList.size() > 0)
		    {
		    	return resultList.get(0).toString();
		    }
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return "";
		}
		
		return "";
	}
}