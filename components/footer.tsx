import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      // GitHub: black in light, white in dark for visibility
      icon: (
        <span className="relative z-20 text-[#181717] dark:text-white">
          <GitHubIcon />
        </span>
      ),
      bg: 'bg-slate-100 dark:bg-slate-800/30',
      href: "https://github.com/redasalem",
      label: "GitHub",
    },
    {
      // LinkedIn: brand blue
      icon: (
        <span className="relative z-20 text-[#0A66C2] dark:text-[#0A66C2]">
          <LinkedInIcon />
        </span>
      ),
      bg: 'bg-blue-100 dark:bg-blue-900/20',
      href: "https://www.linkedin.com/in/reda-salem-dev/",
      label: "LinkedIn",
    },
    {
      // Email: red envelope color
      icon: (
        <span className="relative z-20 text-red-600 dark:text-red-300">
          <EmailIcon />
        </span>
      ),
      bg: 'bg-red-100 dark:bg-red-900/20',
      href: "mailto:redasalem287@gmail.com",
      label: "Email",
    },
  ]

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mb-3">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 animate-fade-in">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">Reda Salem</h3>
            <p className="text-sm text-muted-foreground">Front-End Developer crafting beautiful digital experiences</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
               <li>
                <a href="#About Me" className="hover:text-accent transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-accent transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-accent transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-accent transition-colors">
                  Certificates
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full ${social.bg} transition-all duration-300 hover:scale-110 hover:rotate-3 text-lg flex items-center justify-center`} 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground animate-fade-in">
            <p>
            © {currentYear} Reda Salem. All rights reserved.
            </p>
          <div className="flex gap-4">
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
  )
}
