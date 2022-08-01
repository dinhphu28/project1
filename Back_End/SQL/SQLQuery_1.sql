CREATE DATABASE itproject1
GO

USE itproject1
GO

-- List tables:
-- {
    -- tb_norm_user_acc(c_nuname/, c_npasswd)
    -- tb_mod_user_acc(c_muname/, c_mpasswd)
    -- tb_mod_user_info(c_muname/, c_dis_name)
    -- tb_posts(c_postid/, c_title, c_description, c_content, _datetime_created, c_author, c_url, c_category)
    -- tb_post_evaluation(c_postid/, c_upvote, c_downvote)
    -- tb_comments(c_author/, c_postid/, c_datetime/, c_content)
	-- tb_norm_user_info(c_nuname/, c_avatar)
-- }
-- /List tables


-- tb_norm_user_acc(c_nuname/, c_npasswd)
CREATE TABLE tb_norm_user_acc (
    c_nuname VARCHAR(30),
    c_npasswd VARCHAR(70) NOT NULL,

    PRIMARY KEY(c_nuname)
)
GO

-- tb_norm_user_info(c_nuname/, c_avatar)
CREATE TABLE tb_norm_user_info (
    c_nuname VARCHAR(30) REFERENCES tb_norm_user_acc(c_nuname),
    c_avatar VARCHAR(500) DEFAULT 'https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201809210816',

    PRIMARY KEY(c_nuname)
)
GO

-- tb_mod_user_acc(c_muname/, c_mpasswd)
CREATE TABLE tb_mod_user_acc (
    c_muname VARCHAR(30),
    c_mpasswd VARCHAR(70) NULL,

    PRIMARY KEY(c_muname)
)
GO

-- tb_mod_user_info(c_muname/, c_dis_name)
CREATE TABLE tb_mod_user_info (
    c_muname VARCHAR(30) REFERENCES tb_mod_user_acc(c_muname),
    c_dis_name NVARCHAR(100) NOT NULL,

    PRIMARY KEY(c_muname)
)
GO

-- tb_posts(c_postid/, c_title, c_description, c_content, _datetime_created, c_author, c_url, c_category)
CREATE TABLE tb_posts (
    c_postid INT IDENTITY(1,1),
    c_title NVARCHAR(500) NOT NULL,
    c_description NTEXT NOT NULL,
    c_content NTEXT NOT NULL,
    c_datetime_created DATETIME NOT NULL,
    c_author VARCHAR(30) REFERENCES tb_mod_user_acc(c_muname) NOT NULL,
    c_aurl NVARCHAR(500) UNIQUE NOT NULL,
    c_category NVARCHAR(50) NOT NULL,
    c_thumbnailUrl NVARCHAR(500) NOT NULL,

    PRIMARY KEY(c_postid)
)
GO

-- tb_post_evaluation(c_postid/, c_upvote, c_downvote)
CREATE TABLE tb_post_evaluation (
    c_postid INT,
    c_upvote INT DEFAULT 0,
    c_downvote INT DEFAULT 0,

    FOREIGN KEY(c_postid) REFERENCES tb_posts(c_postid),
    PRIMARY KEY(c_postid)
)
GO

-- tb_comments(c_author/, c_postid/, c_datetime/, c_content)
CREATE TABLE tb_comments (
    c_author VARCHAR(30) REFERENCES tb_norm_user_acc(c_nuname),
    c_postid INT REFERENCES tb_posts(c_postid),
    c_datetime DATETIME,
    c_content NTEXT NOT NULL,

    PRIMARY KEY(c_author, c_postid, c_datetime)
)
GO

CREATE TABLE tb_userVoteState (
    c_postid INT REFERENCES tb_posts(c_postid),
    c_nuname varchar(30) REFERENCES tb_norm_user_acc(c_nuname),
    c_voteStatus INT, -- 1: UpVote | 0: DownVote | if nonVote then delete record

    PRIMARY KEY(c_postid, c_nuname)
)
GO


-- Procedures

CREATE PROC insComment
@author VARCHAR(30), @postid INT, @content NTEXT
AS
BEGIN
    INSERT dbo.tb_comments
    (
        c_author,
        c_postid,
        c_datetime,
        c_content
    )
    VALUES
    (   @author,        -- c_author - varchar(30)
        @postid,         -- c_postid - int
        GETDATE(), -- c_datetime - datetime
        @content        -- c_content - ntext
        )
END
GO

-- EXEC dbo.insComment @author = '',  @postid = 1, @content = N''
-- GO

CREATE PROC insMod
@uname VARCHAR(30), @passwd VARCHAR(70), @disname NVARCHAR(100)
AS
BEGIN
    INSERT dbo.tb_mod_user_acc
    (
        c_muname,
        c_mpasswd
    )
    VALUES
    (   @uname, -- c_muname - varchar(30)
        @passwd  -- c_mpasswd - varchar(70)
        );
	INSERT dbo.tb_mod_user_info
	(
	    c_muname,
	    c_dis_name
	)
	VALUES
	(   @uname, -- c_muname - varchar(30)
	    @disname -- c_dis_name - nvarchar(100)
	    )
END
GO

-- EXEC dbo.insMod @uname = '', @passwd = '', @disname = N''
-- GO

CREATE PROC changePasswdMod
@uname VARCHAR(30), @passwd VARCHAR(70)
AS
BEGIN
    UPDATE dbo.tb_mod_user_acc
	SET c_mpasswd = @passwd
	WHERE c_muname = @uname
END
GO

-- EXEC dbo.changePasswdMod @uname = '', @passwd = ''
-- GO

CREATE PROC insNormUser
@uname VARCHAR(30), @passwd VARCHAR(70)
AS
BEGIN
    INSERT dbo.tb_norm_user_acc
    (
        c_nuname,
        c_npasswd
    )
    VALUES
    (   @uname, -- c_nuname - varchar(30)
        @passwd  -- c_npasswd - varchar(70)
        );
	INSERT dbo.tb_norm_user_info
	(
	    c_nuname,
	    c_avatar
	)
	VALUES
	(   @uname, -- c_nuname - varchar(30)
	    'https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201809210816'  -- c_avatar - varchar(500)
	    )
END
GO

-- EXEC dbo.insNormUser @uname = '', @passwd = ''
-- GO

CREATE PROC changePasswdNorm
@uname VARCHAR(30), @passwd VARCHAR(70)
AS
BEGIN
    UPDATE dbo.tb_norm_user_acc
	SET c_npasswd = @passwd
	WHERE c_nuname = @uname
END
GO

-- EXEC dbo.changePasswdMod @uname = '', @passwd = ''
-- GO

CREATE PROC changeAvtNorm
@uname VARCHAR(30), @avtlink VARCHAR(500)
AS
BEGIN
    UPDATE dbo.tb_norm_user_info
	SET c_avatar = @avtlink
	WHERE c_nuname = @uname
END
GO

-- EXEC dbo.changeAvtNorm @uname = '', @avtlink = ''
-- GO

CREATE PROC insPost
@title NVARCHAR(500), @description NTEXT, @content NTEXT, @author VARCHAR(30), @aurl NVARCHAR(500), @category NVARCHAR(50), @thumbUrl NVARCHAR(500)
AS
BEGIN
	INSERT dbo.tb_posts
	(
	    c_title,
	    c_description,
	    c_content,
	    c_datetime_created,
	    c_author,
	    c_aurl,
	    c_category,
	    c_thumbnailUrl
	)
	VALUES
	(   @title,       -- c_title - nvarchar(500)
	    @description,       -- c_description - ntext
	    @content,       -- c_content - ntext
	    GETDATE(), -- c_datetime_created - datetime
	    @author,        -- c_author - varchar(30)
	    @aurl,       -- c_aurl - nvarchar(500)
	    @category,       -- c_category - nvarchar(50)
	    @thumbUrl        -- c_thumbnailUrl - nvarchar(500)
	    );

	DECLARE @findPostId INT;
	SELECT TOP(1) @findPostId = c_postid
	FROM dbo.tb_posts
	ORDER BY c_datetime_created DESC;

	INSERT dbo.tb_post_evaluation
	(
	    c_postid,
	    c_upvote,
	    c_downvote
	)
	VALUES
	(   @findPostId, -- c_postid - int
	    0, -- c_upvote - int
	    0  -- c_downvote - int
	    )
END
GO

-- EXEC dbo.insPost @title = N'', @description = N'', @content = N'', @author = '', @aurl = N'', @category = N'', @thumbUrl = N''
-- GO

CREATE PROC changePostEval
@postId INT, @upv INT, @downv INT
AS
BEGIN
    UPDATE dbo.tb_post_evaluation
	SET c_upvote = @upv, c_downvote = @downv
	WHERE c_postid = @postId
END
GO

-- EXEC dbo.changePostEval @postId = 0, @upv = 0, @downv = 0
-- GO

CREATE PROC changeVoteState
@postId INT, @uname VARCHAR(30), @voteState INT	-- 1: up | 0: down | 2: delete record
AS
BEGIN
	DECLARE @findPostId INT, @findUname VARCHAR(30), @existed INT;

	SELECT @existed = COUNT(c_nuname)
	FROM dbo.tb_userVoteState
	WHERE c_nuname = @uname AND c_postid = @postId;

	IF @existed = 0
		BEGIN
			INSERT dbo.tb_userVoteState
			(
				c_postid,
				c_nuname,
				c_voteStatus
			)
			VALUES
			(   @postId,  -- c_postid - int
				@uname, -- c_nuname - varchar(30)
				@voteState   -- c_voteStatus - int
				)
			
			IF @voteState = 1
				UPDATE tb_post_evaluation
				SET c_upvote = c_upvote + 1
				WHERE c_postid = @postId;
			ELSE IF @voteState = 0
				UPDATE tb_post_evaluation
				SET c_downvote = c_downvote + 1
				WHERE c_postid = @postId;
		END;
	ELSE
		BEGIN
			DECLARE @currentVState INT;

			SELECT @currentVState = c_voteStatus
			FROM tb_userVoteState
			WHERE c_nuname = @uname AND c_postid = @postId;

			IF @voteState = 2
				BEGIN
					DELETE FROM dbo.tb_userVoteState
					WHERE c_postid = @postId AND c_nuname = @uname;

					IF @currentVState = 1
						UPDATE tb_post_evaluation
						SET c_upvote = c_upvote - 1
						WHERE c_postid = @postId;
					ELSE
						UPDATE tb_post_evaluation
						SET c_downvote = c_downvote - 1
						WHERE c_postid = @postId;
				END;
			ELSE
				BEGIN
					UPDATE dbo.tb_userVoteState
					SET c_voteStatus = @voteState
					WHERE c_postid = @postId AND c_nuname = @uname;

					IF @voteState = 1
						UPDATE tb_post_evaluation
						SET c_upvote = c_upvote + 1, c_downvote = c_downvote - 1
						WHERE c_postid = @postId;
					ELSE
						UPDATE tb_post_evaluation
						SET c_upvote = c_upvote - 1, c_downvote = c_downvote + 1
						WHERE c_postid = @postId;
				END;
		END;
END
GO

-- EXEC dbo.changeVoteState @postId = 0, @uname = '', @voteState = 0
-- GO

CREATE PROC getTenArticles
@pageNum INT, @category NVARCHAR(50)
AS
BEGIN
	IF @category = N'default'
		SELECT *
		FROM (
			SELECT *, ROW_NUMBER() OVER(ORDER BY c_postid DESC) AS RN
			FROM tb_posts
		) as sl1
		WHERE RN BETWEEN 10 * (@pageNum - 1) + 1 AND 10 * (@pageNum)
		ORDER BY c_postid DESC;
	ELSE
		SELECT *
		FROM (
			SELECT *, ROW_NUMBER() OVER(ORDER BY c_postid DESC) AS RN
			FROM tb_posts
			WHERE c_category = @category
		) as sl2
		WHERE RN BETWEEN 10 * (@pageNum - 1) + 1 AND 10 * (@pageNum)
		ORDER BY c_postid DESC;
END
GO

-- EXEC getTenArticles @pageNum = 1, @category = N'back-end'
-- GO

CREATE PROC getTenArticlesEval
@pageNum INT, @category NVARCHAR(50)
AS
BEGIN
	IF @category = N'default'
		SELECT *
		FROM (
			SELECT *,ROW_NUMBER() OVER(ORDER BY tb_post_evaluation.c_postid DESC) AS RN
			FROM tb_post_evaluation
		) AS sl3
		WHERE RN BETWEEN 10 * (@pageNum - 1) + 1 AND 10 * (@pageNum)
		ORDER BY c_postid DESC;
	ELSE
		SELECT *
		FROM (
			SELECT tb_post_evaluation.c_postid, tb_post_evaluation.c_upvote, tb_post_evaluation.c_downvote ,ROW_NUMBER() OVER(ORDER BY tb_post_evaluation.c_postid DESC) AS RN
			FROM tb_post_evaluation, tb_posts
			WHERE tb_posts.c_postid = tb_post_evaluation.c_postid AND tb_posts.c_category = @category
		) AS sl3
		WHERE RN BETWEEN 10 * (@pageNum - 1) + 1 AND 10 * (@pageNum)
		ORDER BY c_postid DESC;
END
GO

-- EXEC getTenArticlesEval @pageNum = 1, @category = N'back-end'
-- GO

