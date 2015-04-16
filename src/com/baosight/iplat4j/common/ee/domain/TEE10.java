package com.baosight.iplat4j.common.ee.domain;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
  
public class TEE10 extends DaoEPBase {
  public String product_id   = " ";
  public String company_name = " ";
  public String made_country = " ";
  public double price        = 0;
  public String company_page = " ";
  public String search       = " ";
 
  public void initMetaData() {
    EiColumn eiColumn;
    eiColumn = new EiColumn("product_id");
    eiColumn.setDescName("��Ʒ��ʶ");
    eiColumn.setType("C");
    eiColumn.setMaxLength(20);
    eiMetadata.addMeta(eiColumn);
  
    eiColumn = new EiColumn("company_name");
    eiColumn.setDescName("��˾���");
    eiColumn.setType("C");
    eiColumn.setMaxLength(20);
    eiMetadata.addMeta(eiColumn);
  
    eiColumn = new EiColumn("made_country");
    eiColumn.setDescName("�����");
    eiColumn.setType("C");
    eiColumn.setMaxLength(20);
    eiMetadata.addMeta(eiColumn);
  
    eiColumn = new EiColumn("price");
    eiColumn.setDescName("�۸�");
    eiColumn.setType("N");
    eiColumn.setMaxLength(10);
    eiMetadata.addMeta(eiColumn);
  
    eiColumn = new EiColumn("company_page");
    eiColumn.setDescName("��˾��ҳ");
    eiColumn.setType("C");
    eiColumn.setMaxLength(50);
    eiMetadata.addMeta(eiColumn);
  
    eiColumn = new EiColumn("search");
    eiColumn.setDescName("��ѯ");
    eiColumn.setType("C");
    eiColumn.setMaxLength(20);
    eiMetadata.addMeta(eiColumn);
  
  
    eiMetadata.getMeta("product_id").setPrimaryKey(true);
  
  }
  public TEE10() {
    initMetaData();
  }
  public String getProduct_id() { 
    return product_id;
  }
  public String getCompany_name() { 
    return company_name;
  }
  public String getMade_country() { 
    return made_country;
  }
  public double getPrice() { 
    return price;
  }
  public String getCompany_page() { 
    return company_page;
  }
  public String getSearch() { 
    return search;
  }

  public void setProduct_id(String product_id ) { 
    this. product_id = product_id;
  }
  public void setCompany_name(String company_name ) { 
    this. company_name = company_name;
  }
  public void setMade_country(String made_country ) { 
    this. made_country = made_country;
  }
  public void setPrice(double price ) { 
    this. price = price;
  }
  public void setCompany_page(String company_page ) { 
    this. company_page = company_page;
  }
  public void setSearch(String search ) { 
    this. search = search;
  }

}
