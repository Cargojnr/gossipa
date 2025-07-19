import { FaInstagram, FaLinkedin, FaGithub, FaTelegram, FaMask } from "react-icons/fa";

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--body-bg)] text-[var(--text-muted)] px-6 py-10 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 text-2xl font-semibold text-foreground">
            <FaMask className="text-primary" />
            <h4>Gossipa</h4>
          </div>

          {/* Social + Gist count */}
          <div className="text-center space-y-3">
            <p className="text-sm">
              Gists <span className="text-muted">created | viewed: 0</span>
            </p>

            <div className="flex justify-center gap-5 text-[1.5rem]">
              <a href="https://t.me/iamamebo" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <FaTelegram />
              </a>
              <a href="#" target="_blank" className="hover:text-primary">
                <FaInstagram />
              </a>
              <a href="#" target="_blank" className="hover:text-primary">
                <FaLinkedin />
              </a>
              <a href="#" target="_blank" className="hover:text-primary">
                <FaGithub />
              </a>
            </div>

            <p className="text-xs text-muted">English</p>
          </div>
        </div>

        <div className="border-t border-[var(--border-color)] pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FaMask />
            <span>&copy; {currentYear} Gossipa. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
