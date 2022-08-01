package Models;

public class _userVoteState {
    private int postId;
    private String username;
    private int voteState; // 1: Up | 0: Down | if nonVote then this object is null

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getVoteState() {
        return voteState;
    }

    public void setVoteState(int voteState) {
        this.voteState = voteState;
    }
}
