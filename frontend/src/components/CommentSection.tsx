import React, { useEffect, useRef, useState } from "react";
import ReactionHandler from "./ReactionHandler";


interface Comment {
  id: number;
  user_id: number;
  comment: string;
  translated?: string;
}

interface Reaction {
    id: number;
    user_id: number;
    secret_id: number;
    type: "like" | "love" | "laugh" | "wow" | "sad" | "angry" | string; // You can expand or customize
    created_at?: string; // Optional
  }
  

interface Props {
    data: {
      id: number;
      user_id: number;
      reactions: Reaction[];
    };
  }
  

const CommentSection: React.FC<Props> = ({ data }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const commentListRef = useRef<HTMLUListElement>(null);

  const aggregateReactions = (reactions: Reaction[] | undefined | null) => {
    const result: Record<string, { count: number }> = {};
    if (!Array.isArray(reactions)) {
        if (import.meta.env.MODE !== "production") {
          console.warn("Reactions is not an array:", reactions);
        }
        return result;
      }
      
  
    for (const r of reactions) {
      if (!result[r.type]) result[r.type] = { count: 0 };
      result[r.type].count++;
    }
  
    return result;
  };
  
  

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/more/${data.id}`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      
      const result = await res.json();
      setComments(result.comments || []);
    } catch (err) {
      console.error("Error fetching comments", err);
    }
  };
  

  const postComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          secretUserId: data.user_id,
          commentUserId: data.user_id,
          comment: input,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await fetchComments();
        setInput("");
      }
    } catch (err) {
      console.error("Failed to post comment", err);
    } finally {
      setLoading(false);
    }
  };

  const translateComment = async (id: number, text: string) => {
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang: "en" }),
      });
      const result = await res.json();
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, translated: result.translated } : c))
      );
    } catch (err) {
      console.error("Translation failed", err);
    }
  };

  useEffect(() => {
    fetchComments(); // Fetch on mount
  }, []);
  
  useEffect(() => {
    if (dropdownOpen) fetchComments(); // Re-fetch on toggle if needed
  }, [dropdownOpen]);
  

  return (
    <div className="comment-section w-full">
      <div className="reactions sleek flex items-center justify-between">
        {/* Reaction handler */}
        <div className="secret-card" data-id={data.id}>
        <ReactionHandler
    secretId={data.id}
    reactions={aggregateReactions(data.reactions)}
  />
        </div>

        <button
          className="comment-btn border-none text-white bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow transition-all hover:scale-105"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <i className={`fas ${dropdownOpen ? "fa-comment-slash" : "fa-comment"}`} />
          <span className="comment-count">
  {comments.length === 0 ? "💬" : comments.length}
</span>


        </button>
      </div>

      {dropdownOpen && (
        <div className="comment-dropdown mt-4 bg-[var(--container-bg)] p-4 rounded-xl shadow animate-dropdownFade">
          <form className="comment-display max-h-64 overflow-y-auto mb-4">
            {comments.length > 0 ? (
              <>
                <p className="total text-sm text-gray-500 mb-2">All comments: {comments.length}</p>
                <ul ref={commentListRef} className="comments-list space-y-4">
                  {comments.map((comment) => (
                    <li key={comment.id} className="comment-item bg-[var(--card-bg)] rounded-xl p-4 shadow">
                      <div>
                        <small className="user text-[var(--text-muted)] font-medium text-sm block mb-1">
                          <strong>@anonym{comment.user_id}</strong>
                        </small>
                        <p className="comment text-[var(--text-color)] text-sm">{comment.comment}</p>
                        <button
                          type="button"
                          className="translate-btn mt-2 text-[var(--secondary-color)] text-sm underline"
                          onClick={() => translateComment(comment.id, comment.comment)}
                        >
                          Translate to English
                        </button>
                        {comment.translated && (
                          <p className="translated-text mt-1 text-sm italic text-[var(--primary-color)]">
                            {comment.translated}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="total text-sm text-gray-500">No comments yet.</p>
            )}
          </form>

          <form onSubmit={postComment} className="flex items-start gap-2 w-full">
            <input type="hidden" name="id" value={data.id} />
            <input type="hidden" name="secretUserId" value={data.user_id} />
            <textarea
              name="comment"
              className="flex-1 rounded-xl p-3 text-sm bg-[var(--input-bg)] text-[var(--text-color)] border border-[var(--primary-color)] resize-none"
              placeholder="Write a comment..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl shadow"
            >
              <i className="fas fa-paper-plane" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
