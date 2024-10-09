CREATE DATABASE IF NOT EXISTS newsseug;
USE newsseug;

-- Create the sequences
CREATE SEQUENCE IF NOT EXISTS members_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS folders_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS press_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS articles_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS bookmarks_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS histories_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS likes_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS hates_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS reports_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS subscribes_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS birth_year_view_counts_seq START WITH 1 INCREMENT BY 1;

-- Create tables
CREATE TABLE IF NOT EXISTS members (
    member_id         BIGINT PRIMARY KEY DEFAULT nextval(members_seq),
    birth             DATE NULL,
    nickname          VARCHAR(255) NULL,
    profile_image_url VARCHAR(255) NULL,
    provider_id       VARCHAR(255)  NOT NULL,
    gender            ENUM ('FEMALE', 'MALE') NULL,
    provider          ENUM ('GOOGLE', 'KAKAO')  NOT NULL,
    role              ENUM ('ROLE_ADMIN', 'ROLE_MEMBER') NULL,
    activation_status ENUM ('ACTIVE', 'INACTIVE')  NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT UKilvrhdmws4av314ebhvn26im5 UNIQUE (provider_id)
);

CREATE TABLE IF NOT EXISTS folders (
    folder_id         BIGINT PRIMARY KEY DEFAULT nextval(folders_seq),
    member_id         BIGINT  NOT NULL,
    article_count     BIGINT NULL,
    thumbnail_url     VARCHAR(255) NULL,
    title             VARCHAR(10)  NOT NULL,
    activation_status ENUM ('ACTIVE', 'INACTIVE')  NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FKco4xraxvdqyci1h0bfgnvq1yf FOREIGN KEY (member_id) REFERENCES members (member_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS press (
    press_id          BIGINT PRIMARY KEY DEFAULT nextval(press_seq),
    subscribe_count   BIGINT NULL DEFAULT 0,
    description       VARCHAR(255) NULL,
    image_url         VARCHAR(255) NULL,
    name              VARCHAR(255) NULL,
    activation_status ENUM ('ACTIVE', 'INACTIVE')  NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
    article_id        BIGINT PRIMARY KEY DEFAULT nextval(articles_seq),
    press_id          BIGINT  NOT NULL,
    hate_count        BIGINT  NOT NULL DEFAULT 0,
    like_count        BIGINT  NOT NULL DEFAULT 0,
    source_created_at TIMESTAMP NULL,
    view_count        BIGINT  NOT NULL,
    content_url       VARCHAR(255) NULL,
    source_url        VARCHAR(255)  NOT NULL,
    thumbnail_url     VARCHAR(255) NULL,
    title             VARCHAR(255)  NOT NULL,
    video_url         VARCHAR(255) NULL,
    category          ENUM ('ACCIDENT', 'ECONOMY', 'POLITICS', 'SCIENCE', 'SOCIETY', 'SPORTS', 'WORLD')  NOT NULL,
    conversion_status ENUM ('EXCEED_TOKEN', 'FILTERED', 'RUNNING', 'SUCCESS', 'UNKNOWN_FAIL')  NOT NULL,
    activation_status ENUM ('ACTIVE', 'INACTIVE')  NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FKd04v02rcdg3lmlu45mw9vfomc FOREIGN KEY (press_id) REFERENCES press (press_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookmarks (
    bookmark_id       BIGINT PRIMARY KEY DEFAULT nextval(bookmarks_seq),
    article_id        BIGINT  NOT NULL,
    folder_id         BIGINT  NOT NULL,
    activation_status ENUM ('ACTIVE', 'INACTIVE')  NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uniqueBookmark UNIQUE (article_id, folder_id),
    CONSTRAINT FKgw1od0yvy1n3r2p0r4cb7x57a FOREIGN KEY (folder_id) REFERENCES folders (folder_id) ON DELETE CASCADE,
    CONSTRAINT FKrgc71ng0qy59rn9y741gi2mjr FOREIGN KEY (article_id) REFERENCES articles (article_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS histories (
    history_id        BIGINT PRIMARY KEY DEFAULT nextval(histories_seq),
    article_id        BIGINT  NOT NULL,
    member_id         BIGINT  NOT NULL,
    play_time         INT  NOT NULL,
    activation_status ENUM ('ACTIVE', 'INACTIVE')  NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK6dwu9pkt9gecpbk3r8u4oqk7n FOREIGN KEY (article_id) REFERENCES articles (article_id) ON DELETE CASCADE,
    CONSTRAINT FKr5eq32k17h6xd5u1ridpahnlg FOREIGN KEY (member_id) REFERENCES members (member_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS likes (
    like_id           BIGINT PRIMARY KEY DEFAULT nextval(likes_seq),
    article_id        BIGINT  NOT NULL,
    member_id         BIGINT  NOT NULL,
    activation_status ENUM ('ACTIVE', 'INACTIVE')  NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK166rh7nhmtcajf0xo1f1i3s8p FOREIGN KEY (member_id) REFERENCES members (member_id) ON DELETE CASCADE,
    CONSTRAINT FKic6sfk54mitq78b48367cfiet FOREIGN KEY (article_id) REFERENCES articles (article_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hates (
    hate_id           BIGINT PRIMARY KEY DEFAULT nextval(hates_seq),
    article_id        BIGINT  NOT NULL,
    member_id         BIGINT  NOT NULL,
    activation_status ENUM ('ACTIVE', 'INACTIVE')  NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FKeu114uu249552fnxpjoesei59 FOREIGN KEY (member_id) REFERENCES members (member_id) ON DELETE CASCADE,
    CONSTRAINT FKp1hq7yrqfyhean2q5gj53i4em FOREIGN KEY (article_id) REFERENCES articles (article_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reports (
    report_id         BIGINT PRIMARY KEY DEFAULT nextval(reports_seq),
    article_id        BIGINT  NOT NULL,
    type              ENUM ('DISLIKE', 'EXPLICIT_CONTENT', 'HATE_SPEECH_OR_SYMBOLS', 'MISINFORMATION', 'SPAM')  NOT NULL,
    activation_status ENUM ('ACTIVE', 'INACTIVE')  NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FKvd08qavn9nwy8fa6n5349tb7 FOREIGN KEY (article_id) REFERENCES articles (article_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS subscribes (
    subscribe_id      BIGINT PRIMARY KEY DEFAULT nextval(subscribes_seq),
    member_id         BIGINT NULL,
    press_id          BIGINT NULL,
    activation_status ENUM ('ACTIVE', 'INACTIVE')  NOT NULL DEFAULT 'ACTIVE',
    created_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uniqueSubscribe UNIQUE (member_id, press_id),
    CONSTRAINT FK1ll7f1tjs7lt3xiqfcbrfmdum FOREIGN KEY (member_id) REFERENCES members (member_id) ON DELETE CASCADE,
    CONSTRAINT FKj3n9k136ixactnmfdhflm2i4n FOREIGN KEY (press_id) REFERENCES press (press_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS birth_year_view_counts (
    birth_view_count_id BIGINT PRIMARY KEY DEFAULT nextval(birth_year_view_counts_seq),
    article_id          BIGINT NOT NULL,
    birth_year          INT    NULL,
    view_count          BIGINT NOT NULL DEFAULT 0,
    CONSTRAINT FK4hy7ruduqtt8ugpj8hx5ajrpc FOREIGN KEY (article_id) REFERENCES articles (article_id)
);
