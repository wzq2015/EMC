package com.report.excel;

import java.io.*;
import java.sql.*;
import java.util.*;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.*;

public class ExcelPoi 
{	
	private class TemplateCell
	{
		String content;
		HSSFCellStyle style;
		int colId;
		int rowId;
	}
	
	private class DataSetDefinition
	{
		String dataSetName;
		String dataSetSQL;
		List<TemplateCell> cellTemplateList = new ArrayList<TemplateCell>();
	}
		
	private HSSFWorkbook _workbook = null;	
	private HSSFSheet _worksheet = null;

	private String _dbDriver = "";
	private String _dbServerUrl = "";
	private String _dbUser = "";
	private String _dbPassword = "";
	private final int MAX_TEMPLETE_ROW_COUNT = 50;
	private final int MAX_TEMPLETE_COL_COUNT = 50;
	
	private ArrayList<DataSetDefinition> dataSetDefinitionList = new ArrayList<DataSetDefinition>();
	
	private JSONObject queryStringJsonObject = null;
	
	public ExcelPoi(String dbDriver, String dbServerUrl, String dbUser, String dbPassword) 
	{
		_dbDriver = dbDriver;
		_dbServerUrl = dbServerUrl;
		_dbUser = dbUser;
		_dbPassword = dbPassword;
	}
	
	
	public void findParams(HSSFSheet worksheet)
	{			
		for (int i = 0; i < MAX_TEMPLETE_ROW_COUNT; i++)
		{
			HSSFRow row = worksheet.getRow(i);
			if (row == null)
				continue;
			
			for (int j = 0; j < MAX_TEMPLETE_COL_COUNT; j++) 
			{ 
				HSSFCell cell = row.getCell(j);
				if ((cell == null) || (cell.getCellType() != 1))
					continue;
				
				String cellValue = cell.getStringCellValue();
				int index = -1;
				while ((index = cellValue.indexOf('@')) > -1)
				{
					int index2 = cellValue.indexOf("@", index + 1);
					if (index2 > -1)
					{
						String queryParam = cellValue.substring(index + 1, index2);
						String queryParamValue = "";
						if (queryStringJsonObject.containsKey(queryParam))
						{
							queryParamValue = queryStringJsonObject.getString(queryParam);
							cellValue = cellValue.replaceAll(cellValue.substring(index, index2 + 1), queryParamValue);
						}
						else
						{
							break;
						}
					}
					cell.setCellValue(cellValue);
				}
				
				if (cellValue.startsWith("#DataSet:"))
				{
					String dataSetDefString = cellValue.substring("#DataSet:".length());
					index = dataSetDefString.indexOf("=");
					if (index < 0)
					{
						break;
					}
					String[] dataSetDefArray = new String[2];
					dataSetDefArray[0] = dataSetDefString.substring(0, index);
					dataSetDefArray[1] = dataSetDefString.substring(index + 1);
					
					DataSetDefinition definition = new DataSetDefinition();
					definition.dataSetName = dataSetDefArray[0].trim();
					definition.dataSetSQL = dataSetDefArray[1].trim();
					dataSetDefinitionList.add(definition);
					cell.setCellValue("");
				}
				
				index = cellValue.indexOf('$');
				if (index > -1)
				{
					int index2 = cellValue.indexOf("$", index + 1);
					if (index2 > -1)
					{
						String fieldParam = cellValue.substring(index + 1, index2);
						String[] fieldNameArray = fieldParam.split("\\.");
						if (fieldNameArray.length != 2)
							continue;
						for (DataSetDefinition dataset : dataSetDefinitionList)
						{
							if (dataset.dataSetName.equals(fieldNameArray[0]))
							{
								TemplateCell template = new TemplateCell();
								template.style = cell.getCellStyle();
								template.content = cellValue.replace(dataset.dataSetName+".", "");
								template.rowId = i;
								template.colId = j;
								dataset.cellTemplateList.add(template);
							}
						}
					}
				}
			}
		}
	}
	
	public void getExcelSheeet(String templatefile, String queryString) throws SQLException, ClassNotFoundException
	{
		try
		{
			_workbook = new HSSFWorkbook(new FileInputStream(templatefile));
			_worksheet = _workbook.getSheet("Sheet1") ;
			queryStringJsonObject = JSONObject.fromObject(queryString);
			
			findParams(_worksheet);
			
			Class.forName(_dbDriver);
			java.sql.DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());
			Connection dbConn = DriverManager.getConnection(_dbServerUrl , _dbUser , _dbPassword);
			
			for (int i=0; i<dataSetDefinitionList.size(); i++)
			{
				DataSetDefinition curDataSetDefinition = dataSetDefinitionList.get(i);
				String sql = curDataSetDefinition.dataSetSQL;
				PreparedStatement ps = dbConn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery();
				
				int rowIndex = 0;
				while (rs.next())
				{ 
					createTableRow(_worksheet, rs, rowIndex, curDataSetDefinition.cellTemplateList);
					rowIndex++;
				}
			}
			
			for (int i = 0; i < MAX_TEMPLETE_ROW_COUNT; i++)
			{
				HSSFRow row = _worksheet.getRow(i);
				if (row == null)
					continue;
				
				for (int j = 0; j < MAX_TEMPLETE_COL_COUNT; j++) 
				{ 
					HSSFCell cell = row.getCell(j);
					if (cell == null)
						continue;
						
					if (cell.getCellType() == HSSFCell.CELL_TYPE_FORMULA)
					{
						String formula = cell.getCellFormula();
						cell.setCellFormula(formula);
					}
					if (cell.getCellType() == HSSFCell.CELL_TYPE_STRING)
					{
						String cellValue = cell.getStringCellValue();
						int index = cellValue.indexOf("gbk:");
						if (index > -1)
						{
							String content = cellValue.substring(4);
							byte[] contentArray = content.getBytes("iso-8859-1");
							content = new String(contentArray, "GBK");
							cell.setCellValue(content);
						}
						index = cellValue.indexOf("ChineseNo:");
						if (index > -1)
						{
							String content = cellValue.substring(10);
							String chineseNo = getNumberToChineseNo(content);
							cell.setCellValue(chineseNo);
						}
					}
				}
			}
		}
		catch(Exception e) {}
	}
	
	private String getNumberToChineseNo(String rmb) 
	{
        String num = "零壹贰叁肆伍陆柒捌玖";
        String dw = "元拾佰仟万亿";
        // 补齐小数位，多加“0”不影响计算和转换
        rmb += rmb.indexOf(".") == -1 ? ".00" : "00";
        String mm[] = rmb.split("\\.");
        String money = mm[0];
        
        //转换小数
        String result = num.charAt(Integer.parseInt("" + mm[1].charAt(0))) + "角"
        			  + num.charAt(Integer.parseInt("" + mm[1].charAt(1))) + "分";
        
        for (int i = 0; i < money.length(); i++) 
        {
            String str = "";
            int n = Integer.parseInt(money.substring(money.length() - i - 1, money.length() - i));
            str = str + num.charAt(n);// 根据数值取出人民币中文大写字符
            if (i == 0) {// 根据位数判断
                str = str + dw.charAt(i);// 加上元
            } else if ((i + 4) % 8 == 0) {
                str = str + dw.charAt(4);// 加上万
            } else if (i % 8 == 0) {
                str = str + dw.charAt(5);// 加上亿
            } else {
                str = str + dw.charAt(i % 4);
            }
            result = str + result;
        }
        result = result.replaceAll("零([^亿万元角分])", "零");
        result = result.replaceAll("亿零+万", "亿零");
        result = result.replaceAll("零+", "零");
        result = result.replaceAll("零([亿万元])", "$1");
        result = result.replaceAll("壹拾", "拾");
        result = result.replaceAll("^元", "");
        result = result.replaceAll("零角零分", "整");
        result = result.replaceAll("零分", "整");
        return result;
    }
	
	public void createTableRow(HSSFSheet worksheet, ResultSet rs, int rowIndex, List<TemplateCell> cellTemplates) throws Exception
	{
		for (TemplateCell template : cellTemplates)
		{
			HSSFRow row = worksheet.getRow(template.rowId + rowIndex);
			if (row == null)
			{
				row = worksheet.createRow(template.rowId + rowIndex);
			}
			HSSFCell cell = row.createCell(template.colId);
			cell.setCellStyle(template.style);
			String cellContent = template.content;
			int index = cellContent.indexOf("$");
			while ((index = cellContent.indexOf("$")) > -1)
			{
				if (index > -1)
				{
					int index1 = cellContent.indexOf("$", index + 1);
					if (index1 > -1)
					{
						String fieldName = cellContent.substring(index + 1, index1);
						if (rs.getString(fieldName) != null)
							cellContent = cellContent.replace("$"+fieldName+"$" , rs.getString(fieldName));
						else
							cellContent = "";
					}
				}
			}
			cell.setCellValue(cellContent);
			
			try
			{
				double value = Double.parseDouble(cellContent);
				cell.setCellValue(value);
			}
			catch(Exception e)
			{
				
			}
		}
	}
	
	public void exportExcel(OutputStream os) throws IOException
	{
		_worksheet.setPrintGridlines(true);
		_workbook.write(os);
	}
}