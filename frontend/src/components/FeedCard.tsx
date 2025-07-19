import { useState} from "react";
import { Secret } from "@/types/feed";
import CommentSection from "./CommentSection";
import "../FeedCard.css"

export default function FeedCard({ data }: { data: Secret }) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLong = data.secret.split(" ").length > 10;
  const isVeryLong = data.secret.split(" ").length > 200;
  const displayText = expanded || !isVeryLong
    ? data.secret
    : `${data.secret.slice(0, 250)}...`;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <li className={`secret ${isLong ? "full-width" : "half-width"}`} id={`secret${data.id}`}>
      <div className="card">

        {/* === Header === */}
        <div className="card-header">
          <div className={`user-details header${data.user_id}`}>
            <a href={`/profile/amebo/${data.user_id}`} className="avatar-profile">
              <img src={data.profile_picture} alt="Profile" className="profile-pic" />
            </a>
            <div className="user-info">
              <a href={`/profile/amebo/${data.user_id}`}>
                <p className="username">
                  <span className="user">@amebo{data.user_id}</span>
                  {data.verified && (
                    <img src="/img/gossipa3.png" alt="Verified" className="verified-badge" />
                  )}
                </p>
              </a>
              <span className="timestamp">{new Date(data.timestamp).toLocaleString()}</span>
            </div>
            <span className="you-live-badge hidden">🎙️Live</span>
            <span className="badge ended hidden">Stream Ended ✓</span>
          </div>
          <button className="listen">
            <i className="fas fa-ear-listen" /> Eavedrop
          </button>
        </div>

        {/* === Content === */}
        <div className="card-content">
          <p>
            <span className="content">{displayText}</span>
            {isVeryLong && (
              <button className="read" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
        </div>

        {/* === Reactions & Comments === */}
        <CommentSection data={{ ...data, reactions: Array.isArray(data.reactions) ? data.reactions : [] }} />


        {/* === Card Menu === */}
        <ul className="card-menu">
          <li>
            <button className="menu-toggle-btn" onClick={toggleMenu}>
              <i className="fas fa-ellipsis-vertical" />
            </button>
            {menuOpen && (
              <ul className="card-menu-content">
                <li>
                  <button className="report-btn">
                    <i className="fa-regular fa-flag" /> Report
                  </button>
                </li>
                <li>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(data.secret)}>
                    <i className="fas fa-copy" /> Copy
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </li>
  );
}
