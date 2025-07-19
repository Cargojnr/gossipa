import React from "react";
import "@/ShimmerCard.css"; // adjust path if needed

export default function ShimmerCard() {
  return (
    <li className="secret shimmer-card">
      <div className="card">
        <div className="card-header">
          <div className="profile-pic shimmer-avatar shimmer"></div>
          <div className="user-info">
            <div className="shimmer-line short shimmer"></div>
            <div className="shimmer-line tiny shimmer"></div>
          </div>
        </div>
        <div className="card-content">
          <div className="shimmer-line shimmer"></div>
          <div className="shimmer-line shimmer"></div>
        </div>
        <div className="shimmer-footer">
          <div className="shimmer-btn shimmer"></div>
          <div className="shimmer-btn shimmer"></div>
        </div>
      </div>
    </li>
  );
}
