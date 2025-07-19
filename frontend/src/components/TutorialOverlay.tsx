export default function TutorialOverlay({ username }: { username: string }) {
    return (
      <div id="tutorial-overlay" className="hidden">
        <div className="tutorial-step">
          <div className="tutorial-text">
            <h2>
              <span style={{ textTransform: "capitalize" }}>{username}</span> Welcome to GistTown. Our World of Amebo!
            </h2>
            <p>
              This is a Safe Space, where you can find comfort and anonymous support. Feel free to share or read gists in a
              judgment-free zone.
            </p>
          </div>
          <div id="progress-bar-container">
            <div id="progress-bar"></div>
          </div>
          <button id="next-step">Next</button>
          <button className="skip-btn">Skip</button>
        </div>
      </div>
    );
  }
  