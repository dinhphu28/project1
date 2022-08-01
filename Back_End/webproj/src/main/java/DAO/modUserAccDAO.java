package DAO;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

import Models._modUserAcc;
import Models._modUserInfo;
import Services.DBProvider;

public class modUserAccDAO {
    public void insertModAcc(_modUserAcc userAcc, _modUserInfo userInfo) {
        DBProvider dbProvider = new DBProvider();

        try {
            dbProvider.dbExecuteQuery("EXEC dbo.insMod @uname = '" + userAcc.getUsername() + "', @passwd = '" + userAcc.getPassword() + "', @disname = N'" + userInfo.getDisplayName() +"'");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean checkExisted(String userName) {
        DBProvider dbProvider = new DBProvider();

        boolean existed = false;

        try {
            ResultSet rSet = dbProvider.dbExecuteQuery("SELECT COUNT(c_muname) as numE FROM [dbo].[tb_mod_user_acc] WHERE c_muname = '" + userName + "'");

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

    public boolean checkValidLoginInfo(_modUserAcc mUA) {
        DBProvider dbProvider = new DBProvider();

        boolean existed = false;

        try {
            ResultSet rSet = dbProvider.dbExecuteQuery("SELECT COUNT(c_muname) AS numE FROM tb_mod_user_acc WHERE c_muname = '" + mUA.getUsername() + "' AND c_mpasswd = '" + mUA.getPassword() + "'");

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

    public void changePassword (_modUserAcc mUA) {
        DBProvider dbProvider = new DBProvider();
        try {
            dbProvider.dbExecuteUpdate("EXEC dbo.changePasswdMod @uname = '" + mUA.getUsername() + "', @passwd = '" + mUA.getPassword() + "'");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ArrayList<_modUserAcc> listMod () {
        ArrayList<_modUserAcc> lMod = new ArrayList<_modUserAcc>();

        DBProvider dbProvider = new DBProvider();
        try {
            ResultSet rSet = dbProvider.dbExecuteQuery("SELECT c_muname FROM tb_mod_user_acc WHERE c_mpasswd != ''");
            while (rSet.next()) {
                _modUserAcc tempM = new _modUserAcc();
                tempM.setUsername(rSet.getString("c_muname"));
                lMod.add(tempM);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return lMod;
    }
}

/**
 * Insert: EXEC dbo.insMod @uname = '', @passwd = '', @disname = N''
 *
 * Change password: EXEC dbo.changePasswdMod @uname = '', @passwd = ''
 */