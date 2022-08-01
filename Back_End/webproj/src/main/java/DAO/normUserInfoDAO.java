package DAO;

import java.sql.ResultSet;

import Models._normUserInfo;
import Services.DBProvider;

public class normUserInfoDAO {
    /**
     * Change avatar: EXEC dbo.changeAvtNorm @uname = '', @avtlink = ''
     */
    public String getAvatarUrl(String userName) {
        DBProvider dbProvider = new DBProvider();
        String avtUrl = "";

        try {
            ResultSet rSet = dbProvider.dbExecuteQuery("SELECT c_avatar FROM [dbo].[tb_norm_user_info] WHERE c_nuname = '" + userName + "'");
            while(rSet.next()) {
                avtUrl = rSet.getString("c_avatar");
                break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return avtUrl;
    }

    public void changeAvatar(_normUserInfo normUser) {
        DBProvider dbProvider = new DBProvider();

        try {
            dbProvider.dbExecuteUpdate("EXEC dbo.changeAvtNorm @uname = '" + normUser.getUsername() + "', @avtlink = '" + normUser.getUserAvatar() + "'");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
