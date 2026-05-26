-- =======================================================
-- UNIMIND TURSO (LIBSQL) DATABASE SCHEMA
-- Phase 1 Migration
-- =======================================================

-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, -- We will generate UUIDs in the backend API
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Required for Custom Auth
    name TEXT NOT NULL,
    institution TEXT NOT NULL,
    district TEXT,
    country TEXT,
    major TEXT NOT NULL,
    session TEXT,
    role TEXT NOT NULL,
    bio TEXT,
    graduations TEXT, -- Stored as JSON array
    relationship_status TEXT,
    avatar_url TEXT,
    cover_url TEXT,
    website_url TEXT,
    social_links TEXT DEFAULT '{}', -- Stored as JSON object
    skills TEXT, -- Stored as JSON array
    interests TEXT, -- Stored as JSON array
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_institution ON users(institution);

-- Table: communities
CREATE TABLE IF NOT EXISTS communities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
    visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_communities_type ON communities(type);

-- Table: community_members
CREATE TABLE IF NOT EXISTS community_members (
    community_id TEXT REFERENCES communities(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member' NOT NULL,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (community_id, user_id)
);

-- Table: posts
CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    author_id TEXT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    community_id TEXT REFERENCES communities(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT NOT NULL,
    type TEXT DEFAULT 'text' NOT NULL,
    tags TEXT, -- Stored as JSON array
    media_urls TEXT, -- Stored as JSON array
    is_pinned BOOLEAN DEFAULT 0,
    is_archived BOOLEAN DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_community ON posts(community_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);

-- Table: post_comments
CREATE TABLE IF NOT EXISTS post_comments (
    id TEXT PRIMARY KEY,
    post_id TEXT REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    author_id TEXT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    parent_comment_id TEXT REFERENCES post_comments(id) ON DELETE CASCADE,
    content TEXT,
    image_url TEXT,
    is_edited BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_comments_post ON post_comments(post_id);

-- Table: post_likes
CREATE TABLE IF NOT EXISTS post_likes (
    post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (post_id, user_id)
);

-- Table: folders
CREATE TABLE IF NOT EXISTS folders (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    color TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_folders_user ON folders(user_id);

-- Table: notes
CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    author_id TEXT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    folder_id TEXT REFERENCES folders(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    course TEXT,
    content TEXT,
    file_url TEXT,
    is_ai_summarized BOOLEAN DEFAULT 0,
    is_starred BOOLEAN DEFAULT 0,
    visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'class', 'public')),
    shared_link_token TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notes_author ON notes(author_id);
CREATE INDEX IF NOT EXISTS idx_notes_folder ON notes(folder_id);

-- Table: tasks
CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATETIME,
    status TEXT DEFAULT 'pending' NOT NULL, -- 'pending', 'in_progress', 'completed'
    priority TEXT DEFAULT 'medium' NOT NULL, -- 'low', 'medium', 'high'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tasks_user ON tasks(user_id);

