package Models;

public class commentJSON {
    private String username;
    private String content;
    private String datetime;

    public commentJSON(String username, String content, String datetime) {
        this.username = username;
        this.content = content;
        this.datetime = datetime;
    }

    public commentJSON(_comment cmt) {
        this.username = cmt.getAuthor();
        this.content = cmt.getContent();
        this.datetime = cmt.getDatetimeCreated();
    }
}
