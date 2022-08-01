package DAO;

import java.sql.ResultSet;

import Models._normUserAcc;
import Services.DBProvider;

public class normUserAccDAO {
    /**
     * Insert: EXEC dbo.insNormUser @uname = '', @passwd = ''
     *
     * Change password: EXEC dbo.changePasswdMod @uname = '', @passwd = ''
     *
     * Check valid Login info: SELECT COUNT(c_nuname) as numE FROM tb_norm_user_acc WHERE c_nuname = '' and c_npasswd = ''
     */
    public void insertNormAcc(_normUserAcc normAcc) {
        DBProvider dbProvider = new DBProvider();

        try {
            dbProvider.dbExecuteUpdate("EXEC dbo.insNormUser @uname = '" + normAcc.getUsername() + "', @passwd = '" + normAcc.getPassword()+ "'");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean checkExisted(String userName) {
        DBProvider dbProvider = new DBProvider();

        boolean existed = false;

        try {
            ResultSet rSet = dbProvider.dbExecuteQuery("SELECT COUNT(c_nuname) as numE FROM [dbo].[tb_norm_user_acc] WHERE c_nuname = '" + userName + "'");

            while(rSet.next()) {
                int tempN = rSet.getInt("numE");
                if(tempN != 0) {
                    existed = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return existed;
    }

    public boolean checkValidLoginInfo(_normUserAcc nUA) {
        DBProvider dbProvider = new DBProvider();

        boolean existed = false;

        try {
            ResultSet rSet = dbProvider.dbExecuteQuery("SELECT COUNT(c_nuname) as numE FROM tb_norm_user_acc WHERE c_nuname = '" + nUA.getUsername() + "' and c_npasswd = '" + nUA.getPassword() + "'");

            while(rSet.next()) {
                int tempN = rSet.getInt("numE");
                if(tempN != 0) {
                    existed = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return existed;
    }
}
