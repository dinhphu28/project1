package DAO;

import java.sql.ResultSet;
import java.util.ArrayList;

import Models._post;
import Services.DBProvider;

public class postDAO {
    /**
     * Insert: EXEC dbo.insPost @title = N'', @description = N'', @content = N'', @author = '', @aurl = N'', @category = N'', @thumbUrl = N''
     * Get list 10 posts: EXEC getTenArticles @pageNum = 1, @category = 'default'
     */
    public void insertPost(_post p_post) {
        DBProvider dbProvider = new DBProvider();

        try {
            dbProvider.dbExecuteUpdate("EXEC dbo.insPost @title = N'" + p_post.getTitle() + "', @description = N'" + p_post.getDescription() + "', @content = N'" + p_post.getContent() + "', @author = '" + p_post.getAuthor() + "', @aurl = N'" + p_post.getArticleUrl() + "', @category = N'" + p_post.getCategory() + "', @thumbUrl = N'" + p_post.getThumbnailUrl() + "'");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ArrayList<_post> getTenPosts(int pageNumber, String category) {
        ArrayList<_post> p_posts = new ArrayList<_post>();

        DBProvider dbProvider = new DBProvider();

        try {
            ResultSet rSet = dbProvider.dbExecuteQuery("EXEC getTenArticles @pageNum = " + pageNumber + ", @category = N'" + category + "'");

            //int ci = 0;
            while(rSet.next()) {
                _post tempPost = new _post();

                tempPost.setPostId(rSet.getInt("c_postid"));
                tempPost.setTitle(rSet.getString("c_title"));
                tempPost.setDescription(rSet.getString("c_description"));
                tempPost.setContent(rSet.getString("c_content"));
                tempPost.setDatetimeCreated(rSet.getString("c_datetime_created"));
                tempPost.setAuthor(rSet.getString("c_author"));
                tempPost.setArticleUrl(rSet.getString("c_aurl"));
                tempPost.setCategory(rSet.getString("c_category"));
                tempPost.setThumbnailUrl(rSet.getString("c_thumbnailUrl"));

                p_posts.add(tempPost);
                //p_posts[ci] = tempPost;
                //ci++;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return p_posts;
    }

    public int getNumberOfArticles(String category) {
        int counter = 0;
        DBProvider dbProvider = new DBProvider();

        try {
            ResultSet rSet;
            if(!category.equals("default")) {
                rSet = dbProvider.dbExecuteQuery("SELECT COUNT(c_postid) AS numE FROM tb_posts WHERE c_category = '" + category + "'");
                while(rSet.next()) {
                counter = rSet.getInt("numE");
                break;
                }
            } else {
                rSet = dbProvider.dbExecuteQuery("SELECT COUNT(c_postid) AS numE FROM tb_posts");
                while(rSet.next()) {
                counter = rSet.getInt("numE");
                break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return counter;
    }
}
