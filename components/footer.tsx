import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      // GitHub: black in light, white in dark for visibility
      icon: (
        <span className="relative z-20 text-[#181717] dark:text-white group-hover:text-[#181717] dark:group-hover:text-white">
          <GitHubIcon />
        </span>
      ),
      bg: "bg-slate-100 dark:bg-slate-800",
      href: "https://github.com/redasalem",
      label: "GitHub",
    },
    {
      // LinkedIn: brand blue
      icon: (
        <span className="relative z-20 text-[#0A66C2]">
          <LinkedInIcon />
        </span>
      ),
      bg: "bg-blue-50 dark:bg-blue-900/20",
      href: "https://www.linkedin.com/in/reda-salem-dev/",
      label: "LinkedIn",
    },
    {
      // Email: red envelope color
      icon: (
        <span className="relative z-20 text-red-600">
          <EmailIcon />
        </span>
      ),
      bg: "bg-red-50 dark:bg-red-900/20",
      href: "mailto:redasalem287@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-md mb-24 sm:mb-0 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12 animate-fade-in text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Reda Salem
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0 leading-relaxed">
                Full-Stack Developer crafting modern, scalable web & mobile
                applications with clean code.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold text-foreground mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="#About Me"
                  className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#certificates"
                  className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  Certificates
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors flex items-center gap-2 justify-center md:justify-start"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold text-foreground mb-6 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-3 rounded-xl ${social.bg} transition-all duration-300 hover:scale-110 hover:shadow-lg text-xl flex items-center justify-center`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground animate-fade-in text-center md:text-left">
          <p>© {currentYear} Reda Salem. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
