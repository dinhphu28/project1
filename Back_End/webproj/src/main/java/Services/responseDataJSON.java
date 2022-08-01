package Services;

import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import DAO.commentDAO;
import DAO.modUserAccDAO;
import DAO.normUserAccDAO;
import DAO.normUserInfoDAO;
import DAO.postDAO;
import DAO.postEvaluationDAO;
import DAO.userVoteStateDAO;
import Models._comment;
import Models._modUserAcc;
import Models._modUserInfo;
import Models._normUserAcc;
import Models._normUserInfo;
import Models._post;
import Models._postEvaluation;
import Models._userVoteState;
import Models.articleJSON;
import Models.commentJSON;

public class responseDataJSON {
    /**
     * Request Json:
     * {
            'pageNumber': 1,
            'category': 'android'
        }
        Note: 'category': {'default', 'back-end', 'front-end', 'android', 'ios', 'tips-tricks'}

        Response Json:
        {
            "numberOfArticles": 324,
            "articles": [
                {
                    "_id": 1,
                    "title": "How to Start 2021 Off Right, With Charles Duhigg",
                    "description": "This week we’re getting advice on how to make our New Year’s resolutions stick with help from 			Pulitzer Prize-winning journalist Charles Duhigg. Listen to hear Charles share multiple science-backed strategies we can use to enhance habit formation, transform ba…",
                    "content": "This week we’re getting advice on how to make our New Year’s resolutions stick with help from 			Pulitzer Prize-winning journalist Charles Duhigg. Listen to hear Charles share multiple science-backed strategies we can use to enhance habit formation, transform lorem lorem",
                    "category": "covid-19",
                    "datetime": "12/16/2020 03:11",
                    "author": "Micaela Heck",
                    "upVote": 100,
                    "downVote": 18,
                    "url": "how-to-start-2021-off-right-width-charles-duhigg-12"
                },
                {
                    "_id": 2,
                    "title": "How to Start 2021 Off Right, With Charles Duhigg",
                    "description": "This week we’re getting advice on how to make our New Year’s resolutions stick with help from 			Pulitzer Prize-winning journalist Charles Duhigg. Listen to hear Charles share multiple science-backed strategies we can use to enhance habit formation, transform ba…",
                    "content": "This week we’re getting advice on how to make our New Year’s resolutions stick with help from 			Pulitzer Prize-winning journalist Charles Duhigg. Listen to hear Charles share multiple science-backed strategies we can use to enhance habit formation, transform lorem lorem",
                    "category": "covid-19",
                    "datetime": "12/16/2020 03:11",
                    "author": "Micaela Heck",
                    "upVote": 100,
                    "downVote": 18,
                    "url": "how-to-start-2021-off-right-width-charles-duhigg-123"
                },
                {
                    "_id": 3,
                    "title": "How to Start 2021 Off Right, With Charles Duhigg",
                    "description": "This week we’re getting advice on how to make our New Year’s resolutions stick with help from 			Pulitzer Prize-winning journalist Charles Duhigg. Listen to hear Charles share multiple science-backed strategies we can use to enhance habit formation, transform ba…",
                    "content": "This week we’re getting advice on how to make our New Year’s resolutions stick with help from 			Pulitzer Prize-winning journalist Charles Duhigg. Listen to hear Charles share multiple science-backed strategies we can use to enhance habit formation, transform lorem lorem",
                    "category": "covid-19",
                    "datetime": "12/16/2020 03:11",
                    "author": "Micaela Heck",
                    "upVote": 100,
                    "downVote": 18,
                    "url": "how-to-start-2021-off-right-width-charles-duhigg-1234"
                }
            ]
        }
     */
    public String resPostArticlesList(String request) {
        String response = "";
        Gson gson = new Gson();

        requestDataJSON rJson = gson.fromJson(request, requestDataJSON.class);

        postDAO pDAO = new postDAO();
        int numOfArt = pDAO.getNumberOfArticles(rJson.category);
        ArrayList<_post> lPost = new ArrayList<_post>();
        lPost.addAll(pDAO.getTenPosts(rJson.pageNumber, rJson.category));

        postEvaluationDAO pEvalDAO = new postEvaluationDAO();
        ArrayList<_postEvaluation> lPostEval = new ArrayList<_postEvaluation>();
        lPostEval.addAll(pEvalDAO.getTenPostsEval(rJson.pageNumber, rJson.category));

        ArrayList<articleJSON> retArtsList = new ArrayList<articleJSON>();

        for(int ii = 0; ii < lPost.size(); ii++) {
            _post tempP = lPost.get(ii);
            _postEvaluation tempPE = lPostEval.get(ii);

            retArtsList.add(new articleJSON(tempP, tempPE));
        }

        JsonObject jObject = new JsonObject();
        jObject.addProperty("numberOfArticles", numOfArt);
        String temp = gson.toJson(retArtsList);
        JsonArray jArray = gson.fromJson(temp, JsonArray.class);
        jObject.add("articles", jArray);

        response = "" + jObject;

        return response;
    }

    /**
     * Class for Json Object
     */
    public class requestDataJSON {
        public int pageNumber;
        public String category;

        public requestDataJSON(int pageNumber, String category) {
            this.pageNumber = pageNumber;
            this.category = category;
        }
    }


    /**
     * Request Json
     * {
            '_id': 12,
        }
     *
     * Response Json
     * {
            "comments": [
                {
                    "username": "dinhphu987",
                    "content": "This article is so great!",
                    "datetime": "12/30/2020 | 16:05"
                },
                {
                    "username": "dinhphu9876",
                    "content": "This article is so great!",
                    "datetime": "12/30/2020 | 16:05"
                },
                {
                    "username": "dinhphu98765",
                    "content": "This article is so great!",
                    "datetime": "12/30/2020 | 16:05"
                }
            ]
        }
     */
    public String resPostCommentsList(String request) {
        String response = "";

        Gson gson = new Gson();

        requestDataJSON01 rDJ = gson.fromJson(request, requestDataJSON01.class);

        commentDAO cmtDAO = new commentDAO();
        ArrayList<_comment> lCmt = new ArrayList<_comment>();
        lCmt.addAll(cmtDAO.getList(rDJ._id));

        ArrayList<commentJSON> lCmtJSON = new ArrayList<commentJSON>();

        for(_comment cmti: lCmt) {
            commentJSON tempcmt = new commentJSON(cmti);
            lCmtJSON.add(tempcmt);
        }

        JsonObject jObject = new JsonObject();
        String temp = gson.toJson(lCmtJSON);
        JsonArray jsonArray = gson.fromJson(temp, JsonArray.class);
        jObject.add("comments", jsonArray);

        response = "" + jObject;

        return response;
    }

    /**
     * Class for Json object
     */
    public class requestDataJSON01 {
        public int _id;

        public requestDataJSON01(int _id) {
            this._id = _id;
        }
    }

    /**
     * Request Json
     * {
            'username': 'dinhphu'
        }

        Response Json
        {
            'avatarUrl': 'a-link'
        }
     */
    public String resPostUserAvatar(String request) {
        String response = "";

        Gson gson = new Gson();

        requestDataJSON02 rDJ = gson.fromJson(request, requestDataJSON02.class);

        normUserInfoDAO nUiDAO = new normUserInfoDAO();
        resultDJ02 resultDJ = new resultDJ02();
        resultDJ.avatarUrl = nUiDAO.getAvatarUrl(rDJ.username);

        response = gson.toJson(resultDJ);

        return response;
    }

    /**
     * Class for Json object
     */
    public class requestDataJSON02 {
        public String username;
    }

    public class resultDJ02 {
        public String avatarUrl;
    }

    /**
     * Request
     * {
            'currentUsername': 'dinhph',
        }

        Response
        {
            'isNotExisted': true,
        }
     */
    public String resPostIsNotExistNormUsername(String request) {
        String response = "";

        Gson gson = new Gson();

        requestDataJSON03 rDJ = gson.fromJson(request, requestDataJSON03.class);

        normUserAccDAO nUaDAO = new normUserAccDAO();

        resultDJ03 resultDJ = new resultDJ03();
        resultDJ.isNotExisted = !nUaDAO.checkExisted(rDJ.currentUsername);

        response = gson.toJson(resultDJ);

        return response;
    }

    public String resPostIsNotExistModUsername(String request) {
        String response = "";

        Gson gson = new Gson();

        requestDataJSON03 rDJ = gson.fromJson(request, requestDataJSON03.class);

        modUserAccDAO mUaDAO = new modUserAccDAO();

        resultDJ03 resultDJ = new resultDJ03();
        resultDJ.isNotExisted = !mUaDAO.checkExisted(rDJ.currentUsername);

        response = gson.toJson(resultDJ);

        return response;
    }

    public class requestDataJSON03 {
        public String currentUsername;
    }

    public class resultDJ03 {
        public boolean isNotExisted;
    }

    /**
     * Request Json Object
     * {
            '_id': 0, //optional
            'title': 'How to write that',
            'description': 'some text...',
            'content': 'some text lorem...',
            'category': 'back-end',
            'datetime': 'today', //optional
            'author': 'nhathao',
            'upVote': 0, //optional
            'downVote': 0, //optional
            'url': 'url', //optional
            'thumbnailUrl': 'thumbnailUrl'
        }

        Response Json Object
        {
            "success": true
        }
     */
    public String resGetArticle(String request) {
        String response = "";

        Gson gson = new Gson();

        requestDataJSON04 rDJ = gson.fromJson(request, requestDataJSON04.class);

        _post p_post = new _post();
        p_post.setTitle(rDJ.title.replace("'", "''"));
        p_post.setDescription(rDJ.description.replace("'", "''"));
        p_post.setContent(rDJ.content.replace("'", "''"));
        p_post.setCategory(rDJ.category.replace("'", "''"));
        p_post.setAuthor(rDJ.author);
        p_post.setThumbnailUrl(rDJ.thumbnailUrl);

        getDateTimeNow gDTN = new getDateTimeNow();
        convertUniToASCII cUTA = new convertUniToASCII();
        p_post.setArticleUrl("article/" + cUTA.finalArticleUrl(rDJ.title + "-" + gDTN.resultDateTimeString()));

        postDAO pDAO = new postDAO();
        pDAO.insertPost(p_post);

        JsonObject jObject = new JsonObject();
        jObject.addProperty("success", true);
        response = "" + jObject;

        return response;
    }

    public class requestDataJSON04 {
        public String title;
        public String description;
        public String content;
        public String category;
        public String author;
        public String thumbnailUrl;
        // url (Article)
    }

    /**
     * Request Json Object
     * {
            '_id': 1;
            'username': 'dinhphu',
            'content': 'some comment',
            'datetime': 'today', //optional
        }

        Response Json Object
        {
            "success": true
        }
     */
    public String resGetComment(String request) {
        String response = "";

        Gson gson = new Gson();

        requestDataJSON05 rDJ = gson.fromJson(request, requestDataJSON05.class);

        commentDAO cmtDAO = new commentDAO();

        _comment cmt = new _comment();

        cmt.setPostId(rDJ._id);
        cmt.setAuthor(rDJ.username);
        cmt.setContent(rDJ.content);

        cmtDAO.insertComment(cmt);

        JsonObject jObject = new JsonObject();
        jObject.addProperty("success", true);
        response = "" + jObject;

        return response;
    }

    public class requestDataJSON05 {
        public int _id;
        public String username;
        public String content;
    }

    /**
     * Request Json Object
     * {
            'username': 'something',
            'password': 'something-more',
            'role': 1,
        }

        Response Json Object
        {
            'isLoggedIn': true,
        }
     */
    public String resGetLogInRequest(String request) {
        String response = "";

        JsonObject jO = new JsonObject();
        jO.addProperty("success", false);
        response = "" + jO;

        Gson gson = new Gson();

        requestDataJSON06 rDJ = gson.fromJson(request, requestDataJSON06.class);

        if (rDJ.role == 1) {
            normUserAccDAO nUaDAO = new normUserAccDAO();
            _normUserAcc nUA = new _normUserAcc();
            nUA.setUsername(rDJ.username);
            nUA.setPassword(rDJ.password);

            if (nUaDAO.checkValidLoginInfo(nUA)) {
                JsonObject jObject = new JsonObject();
                jObject.addProperty("success", true);
                response = "" + jObject;
            }
        } else if (rDJ.role == 2) {
            modUserAccDAO mUaDAO = new modUserAccDAO();
            _modUserAcc mUA = new _modUserAcc();
            mUA.setUsername(rDJ.username);
            mUA.setPassword(rDJ.password);

            if (mUaDAO.checkValidLoginInfo(mUA)) {
                JsonObject jObject = new JsonObject();
                jObject.addProperty("success", true);
                response = "" + jObject;
            }
        }

        return response;
    }

    public class requestDataJSON06 {
        public String username;
        public String password;
        public int role;
    }

    /**
     * Request Json Object
     * {
            'username': 'dinhphu',
            'password': 'pAssw0rd',
        }

        Response Json Object
        {
            "success": true
        }
     */
    public String resGetSignUpInfo (String request) {
        String response = "";

        Gson gson = new Gson();

        _normUserAcc nUA = gson.fromJson(request, _normUserAcc.class);

        normUserAccDAO nUaDAO = new normUserAccDAO();

        nUaDAO.insertNormAcc(nUA);

        JsonObject jObject = new JsonObject();
        jObject.addProperty("success", true);
        response = "" + jObject;

        return response;
    }

    /**
     * Request Json Object
     * {
            'username': 'dinhphu',
            'displayName': 'Nguyen Dinh Phu 2',
            'password': '1',
        }

        Response Json Object
        {
            "success": true
        }
     */
    public String resGetModCreateAccInfo (String request) {
        String response = "";

        Gson gson = new Gson();

        requestDataJSON07 rDJ = gson.fromJson(request, requestDataJSON07.class);

        _modUserAcc mUA = new _modUserAcc();
        _modUserInfo mUI = new _modUserInfo();

        mUA.setUsername(rDJ.username);
        mUA.setPassword(rDJ.password);

        mUI.setUsername(rDJ.username);
        mUI.setDisplayName(rDJ.displayName);

        modUserAccDAO mUaDAO = new modUserAccDAO();
        mUaDAO.insertModAcc(mUA, mUI);

        JsonObject jObject = new JsonObject();
        jObject.addProperty("success", true);
        response = "" + jObject;

        return response;
    }

    public class requestDataJSON07 {
        public String username;
        public String displayName;
        public String password;
    }

    /**
     * Request Json Object
     * {
            'username': 'dinhphu',
            'avatarUrl': 'a-link'
        }

        Response Json Object
        {
            "success": true
        }
     */
    public String resGetUserAvatar (String request) {
        String response = "";

        Gson gson = new Gson();

        requestDataJSON08 rDJ = gson.fromJson(request, requestDataJSON08.class);

        _normUserInfo nUI = new _normUserInfo();

        nUI.setUsername(rDJ.username);
        nUI.setUserAvatar(rDJ.avatarUrl);

        normUserInfoDAO nUiDAO = new normUserInfoDAO();

        nUiDAO.changeAvatar(nUI);

        JsonObject jObject = new JsonObject();
        jObject.addProperty("success", true);
        response = "" + jObject;

        return response;
    }

    public class requestDataJSON08 {
        public String username;
        public String avatarUrl;
    }

    /**
     * Request Json Object
     * {
            'username': 'someone',
        }

        Response Json Object
        {
            "success": true
        }
     */
    public String resGetModToDelete (String request) {
        String response = "";

        Gson gson = new Gson();

        requestDataJSON09 rDJ = gson.fromJson(request, requestDataJSON09.class);

        _modUserAcc mUA = new _modUserAcc();

        mUA.setUsername(rDJ.username);
        mUA.setPassword("");

        modUserAccDAO mUaDAO = new modUserAccDAO();
        mUaDAO.changePassword(mUA);

        JsonObject jObject = new JsonObject();
        jObject.addProperty("success", true);
        response = "" + jObject;

        return response;
    }

    public class requestDataJSON09 {
        public String username;
    }

    /**
     * Response Json Object
     * {
            'moderators': [
                'username': 'meomeo',
                'username': 'catcat'
            ]
        }
     */
    public String resPostModsList () {
        String response = "";

        Gson gson = new Gson();

        JsonObject jObject = new JsonObject();

        modUserAccDAO mUaDAO = new modUserAccDAO();

        ArrayList<requestDataJSON09> lMod = new ArrayList<requestDataJSON09>();

        for (int ii = 0; ii < mUaDAO.listMod().size(); ii++) {
            requestDataJSON09 tempO = new requestDataJSON09();
            tempO.username = mUaDAO.listMod().get(ii).getUsername();
            lMod.add(tempO);
        }

        String tempMl = gson.toJson(lMod);
        JsonArray jArr = gson.fromJson(tempMl, JsonArray.class);
        jObject.add("moderators", jArr);

        response = "" + jObject;

        return response;
    }

    /**
     * Request json Object
     * {
            '_id': 3,
            'username': 'someone'
        }

        Response Json object
        {
            'isUpButtonClicked': true,
            'isDownButtonClicked': false,
        }
     */
    public String resPostArticleVoteState(String request) {
        String response = "";

        Gson gson = new Gson();

        requestDataJSON10 rDJ = gson.fromJson(request, requestDataJSON10.class);

        userVoteStateDAO uVSDAO = new userVoteStateDAO();

        _userVoteState uuu = new _userVoteState();
        uuu.setPostId(rDJ._id);
        uuu.setUsername(rDJ.username);

        int vst = uVSDAO.getUserVS(uuu);

        resultDJ10 res10 = new resultDJ10();

        if (vst == 2) {
            res10.isUpButtonClicked = false;
            res10.isDownButtonClicked = false;
        } else if (vst == 1) {
            res10.isUpButtonClicked = true;
            res10.isDownButtonClicked = false;
        } else if (vst == 0) {
            res10.isUpButtonClicked = false;
            res10.isDownButtonClicked = true;
        }

        response = gson.toJson(res10);

        return response;
    }

    public class requestDataJSON10 {
        public int _id;
        public String username;
    }
    public class resultDJ10 {
        public boolean isUpButtonClicked;
        public boolean isDownButtonClicked;
    }

    /**
     * Request Json Object
     * {
            '_id': 2,
            'username': 'someone',
            'isUpButtonClicked': true,
            'isDownButtonClicked': false,
        }

        Response Json Object
        {
            "success": true
        }
     */
    public String resGetArticleVoteState(String request) {
        String response = "";

        Gson gson = new Gson();

        requestDataJSON11 rDJ = gson.fromJson(request, requestDataJSON11.class);

        _userVoteState uuu = new _userVoteState();

        uuu.setPostId(rDJ._id);
        uuu.setUsername(rDJ.username);
        if (rDJ.isUpButtonClicked == true && rDJ.isDownButtonClicked == false) {
            uuu.setVoteState(1);
        } else if (rDJ.isUpButtonClicked == false && rDJ.isDownButtonClicked == true) {
            uuu.setVoteState(0);
        } else if (rDJ.isUpButtonClicked == false && rDJ.isDownButtonClicked == false) {
            uuu.setVoteState(2);
        }

        userVoteStateDAO uVSDAO = new userVoteStateDAO();

        uVSDAO.changeUserVote(uuu);

        JsonObject jObject = new JsonObject();
        jObject.addProperty("success", true);
        response = "" + jObject;

        return response;
    }

    public class requestDataJSON11 {
        public int _id;
        public String username;
        public boolean isUpButtonClicked;
        public boolean isDownButtonClicked;
    }
}
