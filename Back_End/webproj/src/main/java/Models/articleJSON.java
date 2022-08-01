package Models;

import com.google.gson.Gson;

public class articleJSON {
    public int _id;
    public String title;
    public String description;
    public String content;
    public String category;
    public String datetime;
    public String author;
    public int upVote;
    public int downVote;
    public String url;
    public String thumbnailUrl;

    public articleJSON(int _id, String title, String description, String content, String category, String datetime, String author, int upVote, int downVote, String url, String thumbnailUrl) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.category = category;
        this.datetime = datetime;
        this.author = author;
        this.upVote = upVote;
        this.downVote = downVote;
        this.url = url;
        this.thumbnailUrl = thumbnailUrl;
    }

    public articleJSON(_post p_post, _postEvaluation postEval) {
        this._id = p_post.getPostId();
        this.title = p_post.getTitle();
        this.description = p_post.getDescription();
        this.content = p_post.getContent();
        this.category = p_post.getCategory();
        this.datetime = p_post.getDatetimeCreated();
        this.author = p_post.getAuthor();
        this.upVote = postEval.getUpVote();
        this.downVote = postEval.getDownVote();
        this.url = p_post.getArticleUrl();
        this.thumbnailUrl = p_post.getThumbnailUrl();
    }
}
