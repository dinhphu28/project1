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
-- }
-- /List tables


-- tb_norm_user_acc(c_nuname/, c_npasswd)
CREATE TABLE tb_norm_user_acc (
    c_nuname varchar(30),
    c_npasswd varchar(70) NOT NULL,

    PRIMARY KEY(c_nuname)
)
GO

-- tb_mod_user_acc(c_muname/, c_mpasswd)
CREATE TABLE tb_mod_user_acc (
    c_muname varchar(30),
    c_mpasswd VARCHAR(70) NOT NULL,

    PRIMARY KEY(c_muname)
)
GO

-- tb_mod_user_info(c_muname/, c_dis_name)
CREATE TABLE tb_mod_user_info (
    c_muname VARCHAR(30),
    c_dis_name NVARCHAR(100) NOT NULL,

    FOREIGN KEY(c_muname) REFERENCES tb_mod_user_acc(c_muname),
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
    c_author VARCHAR(30) REFERENCES tb_mod_user_info(c_muname) NOT NULL,
    c_purl NVARCHAR(500) UNIQUE NOT NULL,
    c_category NVARCHAR(50) NOT NULL,

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
