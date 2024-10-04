create database if not exists newsseug;
use newsseug;

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

-- Create tables
create table if not exists members
(
    member_id         bigint                             not null DEFAULT nextval(members_seq),
    birth             date                               null,
    nickname          varchar(255)                       null,
    profile_image_url varchar(255)                       null,
    provider_id       varchar(255)                       not null,
    gender            enum ('FEMALE', 'MALE')            null,
    provider          enum ('GOOGLE', 'KAKAO')           not null,
    role              enum ('ROLE_ADMIN', 'ROLE_MEMBER') null,
    activation_status enum ('ACTIVE', 'INACTIVE')        not null default 'ACTIVE',
    created_at        timestamp                          not null default CURRENT_TIMESTAMP,
    updated_at        timestamp                          not null default CURRENT_TIMESTAMP,
    primary key (member_id),
    constraint UKilvrhdmws4av314ebhvn26im5 unique (provider_id)
);

create table if not exists folders
(
    folder_id         bigint                      not null DEFAULT nextval(folders_seq),
    member_id         bigint                      not null,
    article_count     bigint                      null,
    thumbnail_url     varchar(255)                null,
    title             varchar(10)                 not null,
    activation_status enum ('ACTIVE', 'INACTIVE') not null default 'ACTIVE',
    created_at        timestamp                   not null default CURRENT_TIMESTAMP,
    updated_at        timestamp                   not null default CURRENT_TIMESTAMP,
    primary key (folder_id),
    constraint FKco4xraxvdqyci1h0bfgnvq1yf
        foreign key (member_id) references members (member_id) on delete cascade
);


create table if not exists press
(
    press_id          bigint                      not null DEFAULT nextval(press_seq),
    subscribe_count   bigint                      null    default 0,
    description       varchar(255)                null,
    image_url         varchar(255)                null,
    name              varchar(255)                null,
    activation_status enum ('ACTIVE', 'INACTIVE') not null default 'ACTIVE',
    created_at        timestamp                   not null default CURRENT_TIMESTAMP,
    updated_at        timestamp                   not null default CURRENT_TIMESTAMP,
    primary key (press_id)
);

create table if not exists articles
(
    article_id        bigint                                                                            not null DEFAULT nextval(articles_seq),
    press_id          bigint                                                                            not null,
    hate_count        bigint                                                                            not null        default 0,
    like_count        bigint                                                                            not null        default 0,
    source_created_at timestamp                                                                         null,
    view_count        bigint                                                                            not null,
    content_url       varchar(255)                                                                      null,
    source_url        varchar(255)                                                                      not null,
    thumbnail_url     varchar(255)                                                                      null,
    title             varchar(255)                                                                      not null,
    video_url         varchar(255)                                                                      null,
    category          enum ('ACCIDENT', 'ECONOMY', 'POLITICS', 'SCIENCE', 'SOCIETY', 'SPORTS', 'WORLD') not null,
    conversion_status enum ('EXCEED_TOKEN', 'FILTERED', 'RUNNING', 'SUCCESS', 'UNKNOWN_FAIL')           not null,
    activation_status enum ('ACTIVE', 'INACTIVE')                                                       not null        default 'ACTIVE',
    created_at        timestamp                                                                         not null        default CURRENT_TIMESTAMP,
    updated_at        timestamp                                                                         not null        default CURRENT_TIMESTAMP,
    primary key (article_id),
    constraint FKd04v02rcdg3lmlu45mw9vfomc
        foreign key (press_id) references press (press_id) on delete cascade
);

create table if not exists bookmarks
(
    bookmark_id       bigint                      not null DEFAULT nextval(bookmarks_seq),
    article_id        bigint                      not null,
    folder_id         bigint                      not null,
    activation_status enum ('ACTIVE', 'INACTIVE') not null default 'ACTIVE',
    created_at        timestamp                   not null default CURRENT_TIMESTAMP,
    updated_at        timestamp                   not null default CURRENT_TIMESTAMP,
    primary key (bookmark_id),
    constraint uniqueBookmark
        unique (article_id, folder_id),
    constraint FKgw1od0yvy1n3r2p0r4cb7x57a
        foreign key (folder_id) references folders (folder_id) on delete cascade,
    constraint FKrgc71ng0qy59rn9y741gi2mjr
        foreign key (article_id) references articles (article_id) on delete cascade
);

create table if not exists histories
(
    history_id        bigint                      not null DEFAULT nextval(histories_seq),
    article_id        bigint                      not null,
    member_id         bigint                      not null,
    play_time         int                         not null,
    activation_status enum ('ACTIVE', 'INACTIVE') not null default 'ACTIVE',
    created_at        timestamp                   not null default CURRENT_TIMESTAMP,
    updated_at        timestamp                   not null default CURRENT_TIMESTAMP,
    primary key (history_id),
    constraint FK6dwu9pkt9gecpbk3r8u4oqk7n
        foreign key (article_id) references articles (article_id) on delete cascade,
    constraint FKr5eq32k17h6xd5u1ridpahnlg
        foreign key (member_id) references members (member_id) on delete cascade
);

create table if not exists likes
(
    like_id           bigint                      not null DEFAULT nextval(likes_seq),
    article_id        bigint                      not null,
    member_id         bigint                      not null,
    activation_status enum ('ACTIVE', 'INACTIVE') not null default 'ACTIVE',
    created_at        timestamp                   not null default CURRENT_TIMESTAMP,
    updated_at        timestamp                   not null default CURRENT_TIMESTAMP,
    primary key (like_id),
    constraint FK166rh7nhmtcajf0xo1f1i3s8p
        foreign key (member_id) references members (member_id) on delete cascade,
    constraint FKic6sfk54mitq78b48367cfiet
        foreign key (article_id) references articles (article_id) on delete cascade
);

create table if not exists hates
(
    hate_id           bigint                      not null DEFAULT nextval(hates_seq),
    article_id        bigint                      not null,
    member_id         bigint                      not null,
    activation_status enum ('ACTIVE', 'INACTIVE') not null default 'ACTIVE',
    created_at        timestamp                   not null default CURRENT_TIMESTAMP,
    updated_at        timestamp                   not null default CURRENT_TIMESTAMP,
    primary key (hate_id),
    constraint FKeu114uu249552fnxpjoesei59
        foreign key (member_id) references members (member_id) on delete cascade,
    constraint FKp1hq7yrqfyhean2q5gj53i4em
        foreign key (article_id) references articles (article_id) on delete cascade
);

create table if not exists reports
(
    report_id         bigint                      not null DEFAULT nextval(reports_seq),
    article_id        bigint                      not null,
    type              enum ('DISLIKE', 'EXPLICIT_CONTENT', 'HATE_SPEECH_OR_SYMBOLS', 'MISINFORMATION', 'SPAM') not null,
    activation_status enum ('ACTIVE', 'INACTIVE') not null default 'ACTIVE',
    created_at        timestamp                   not null default CURRENT_TIMESTAMP,
    updated_at        timestamp                   not null default CURRENT_TIMESTAMP,
    primary key (report_id),
    constraint FKvd08qavn9nwy8fa6n5349tb7
        foreign key (article_id) references articles (article_id) on delete cascade
);


create table if not exists subscribes
(
    subscribe_id      bigint                      not null DEFAULT nextval(subscribes_seq),
    member_id         bigint                      null,
    press_id          bigint                      null,
    activation_status enum ('ACTIVE', 'INACTIVE') not null default 'ACTIVE',
    created_at        timestamp                   not null default CURRENT_TIMESTAMP,
    updated_at        timestamp                   not null default CURRENT_TIMESTAMP,
    primary key (subscribe_id),
    constraint uniqueSubscribe
        unique (member_id, press_id),
    constraint FK1ll7f1tjs7lt3xiqfcbrfmdum
        foreign key (member_id) references members (member_id) on delete cascade,
    constraint FKj3n9k136ixactnmfdhflm2i4n
        foreign key (press_id) references press (press_id) on delete cascade
);