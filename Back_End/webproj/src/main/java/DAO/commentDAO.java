package DAO;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.print.event.PrintEvent;

import Models._comment;
import Services.DBProvider;

public class commentDAO {
    /**
     * Insert: EXEC dbo.insComment @author = '',  @postid = 0, @content = N''
     *
     * Get comments list: SELECT * FROM [dbo].[tb_comments] WHERE c_postid = '' ORDER BY c_datetime DESC
     */

    public void insertComment(_comment cmt) {
        DBProvider dbProvider = new DBProvider();
        try
        {
            dbProvider.dbExecuteUpdate("EXEC dbo.insComment @author = '" + cmt.getAuthor() + "',  @postid = " + cmt.getPostId() + ", @content = N'" + cmt.getContent() + "'");
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
    }

    public ArrayList<_comment> getList(int postId) {
        ArrayList<_comment> tencmt = new ArrayList<_comment>();

        DBProvider dbProvider = new DBProvider();
        ResultSet rSet = null;

        try {
            rSet = dbProvider.dbExecuteQuery("SELECT * FROM [dbo].[tb_comments] WHERE c_postid = '" + postId + "' ORDER BY c_datetime DESC");

            while(rSet.next()) {
                _comment tempcmt = new _comment();
                tempcmt.setPostId(rSet.getInt("c_postid"));
                tempcmt.setAuthor(rSet.getString("c_author"));
                tempcmt.setContent(rSet.getString("c_content"));
                tempcmt.setDatetimeCreated(rSet.getString("c_datetime"));

                tencmt.add(tempcmt);
            }
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
        return tencmt;
    }
}
