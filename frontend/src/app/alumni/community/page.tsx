"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_COMMUNITY_POSTS, CommunityPost } from "@/lib/alumniMockData";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #c7c4d8",
  borderRadius: "0.75rem",
  padding: "1.25rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

export default function AlumniCommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [newPostContent, setNewPostContent] = useState("");
  const [postCategory, setPostCategory] = useState<any>("Career Advice");

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: "Aarav Mehta",
      authorRole: "Senior Software Engineer",
      authorCompany: "TechNova Systems",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      category: postCategory,
      content: newPostContent,
      publishedDate: "Just now",
      likes: 1,
      commentsCount: 0,
      isLiked: true,
      tags: ["CampusConnect", "Career"],
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <header>
        <h1 className="text-headline-lg font-headline-lg" style={{ color: "#141b2b" }}>Professional Alumni Community</h1>
        <p className="text-body-md" style={{ color: "#464555" }}>
          A career-focused discussions feed for sharing advice, hiring posts, and interview tips.
        </p>
      </header>

      {/* Post Composer */}
      <form onSubmit={handleCreatePost} style={cardStyle}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", marginBottom: "0.5rem" }}>
          Share Career Insights or Opportunity
        </h3>
        <textarea
          rows={3}
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Share system design tips, hiring announcements, or interview advice..."
          style={{ width: "100%", padding: "0.625rem", borderRadius: "0.5rem", border: "1px solid #c7c4d8", fontSize: "0.88rem", outline: "none", marginBottom: "0.75rem" }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <select
            value={postCategory}
            onChange={(e) => setPostCategory(e.target.value as any)}
            style={{ padding: "0.35rem 0.625rem", borderRadius: "0.375rem", border: "1px solid #c7c4d8", fontSize: "0.8rem", background: "#fff" }}
          >
            <option>Career Advice</option>
            <option>Hiring</option>
            <option>Interview Tips</option>
            <option>Achievement</option>
            <option>Learning Resource</option>
          </select>

          <button
            type="submit"
            style={{ padding: "0.45rem 1.25rem", background: "#3525cd", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
          >
            Post to Feed
          </button>
        </div>
      </form>

      {/* Feed Posts */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {posts.map((post) => (
          <div key={post.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <img src={post.authorAvatar} alt={post.authorName} style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: "2px solid #3525cd" }} />
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#141b2b", margin: 0 }}>{post.authorName}</h3>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0 }}>{post.authorRole}</p>
                </div>
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", background: "#ebe9ff", color: "#3525cd" }}>
                {post.category}
              </span>
            </div>

            <p style={{ fontSize: "0.88rem", color: "#334155", lineHeight: 1.6, marginBottom: "0.85rem", margin: "0 0 0.85rem 0" }}>
              {post.content}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "0.85rem" }}>
              {post.tags.map((tg) => (
                <span key={tg} style={{ fontSize: "0.72rem", color: "#3525cd", fontWeight: 600 }}>#{tg}</span>
              ))}
            </div>

            {/* Action Footer */}
            <div style={{ borderTop: "1px solid #e9edff", paddingTop: "0.625rem", display: "flex", gap: "1.25rem", color: "#64748b", fontSize: "0.8rem" }}>
              <button
                onClick={() => toggleLike(post.id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: post.isLiked ? "#3525cd" : "#64748b", fontWeight: post.isLiked ? 700 : 500, display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  {post.isLiked ? "thumb_up" : "thumb_up_off"}
                </span>
                {post.likes} Appreciations
              </button>

              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>comment</span>
                {post.commentsCount} Comments
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
