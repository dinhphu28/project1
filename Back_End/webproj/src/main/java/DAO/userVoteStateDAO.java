package DAO;

import java.sql.ResultSet;

import Models._userVoteState;
import Services.DBProvider;

public class userVoteStateDAO {
    /**
     * Change vote state: EXEC dbo.changeVoteState @postId = 0, @uname = '', @voteState = 0
     */
    public void changeUserVote(_userVoteState uVS) {
        DBProvider dbProvider = new DBProvider();

        try {
            dbProvider.dbExecuteUpdate("EXEC dbo.changeVoteState @postId = " + uVS.getPostId() + ", @uname = '" + uVS.getUsername() + "', @voteState = " + uVS.getVoteState());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public int getUserVS(_userVoteState uVS) {
        DBProvider dbProvider = new DBProvider();
        int tempUVS = 2;

        try {
            ResultSet rSet = dbProvider.dbExecuteQuery("SELECT * FROM tb_userVoteState WHERE c_nuname = '" + uVS.getUsername() + "' AND c_postid = " + uVS.getPostId());
            while (rSet.next()) {
                tempUVS = rSet.getInt("c_voteStatus");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return tempUVS;
    }
}
