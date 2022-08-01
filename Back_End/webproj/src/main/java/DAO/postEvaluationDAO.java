package DAO;

import java.sql.ResultSet;
import java.util.ArrayList;

import Models._postEvaluation;
import Services.DBProvider;

public class postEvaluationDAO {
    /**
     * Get Posts Evaluation: SELECT TOP(10) * FROM [dbo].[tb_post_evaluation] ORDER BY c_postid DESC
     */
    public ArrayList<_postEvaluation> getTenPostsEval(int pageNum, String category) {
        DBProvider dbProvider = new DBProvider();
        ArrayList<_postEvaluation> postsEval = new ArrayList<_postEvaluation>();

        try {
            ResultSet rSet = dbProvider.dbExecuteQuery("EXEC getTenArticlesEval @pageNum = " + pageNum + ", @category = N'" + category + "'");

            while(rSet.next()) {
                _postEvaluation tempEval = new _postEvaluation();

                tempEval.setPostId(rSet.getInt("c_postid"));
                tempEval.setUpVote(rSet.getInt("c_upvote"));
                tempEval.setDownVote(rSet.getInt("c_downvote"));

                postsEval.add(tempEval);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return postsEval;
    }
}
