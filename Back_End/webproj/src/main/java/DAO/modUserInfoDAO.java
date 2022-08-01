package DAO;

import java.sql.ResultSet;

import Services.DBProvider;

public class modUserInfoDAO {
    /**
     * Get Mod info: SELECT * FROM [dbo].[tb_mod_user_info] WHERE c_muname = ''
     */
    public String getDisplayName(String userName) {
        DBProvider dbProvider = new DBProvider();
        ResultSet rSet = null;
        String disName = "";

        try {
            rSet = dbProvider.dbExecuteQuery("SELECT * FROM [dbo].[tb_mod_user_info] WHERE c_muname = '" + userName + "'");
            while(rSet.next()) {
                disName = rSet.getString("c_dis_name");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return disName;
    }
}
