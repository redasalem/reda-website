"use client"

import type React from "react";
import { useState, memo } from "react";
import { Users, Mailbox, Phone, Send } from "lucide-react";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Contact = memo(function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isValidEmail, setIsValidEmail] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate email on change
    if (name === 'email') {
      setIsValidEmail(emailRegex.test(value));
    }
  }


  // web3form
  const [result, setResult] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(true);
    const formDataObj = new FormData(event.currentTarget);
    formDataObj.append("access_key", `${process.env.NEXT_PUBLIC_WEBFORMS}`);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formDataObj
    });

    const data = await response.json();
    if (data.success) {
      setResult(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } else {
      setResult(false);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const contactInfo = [
    {
      icon: (
        <span className="relative z-20 text-red-500">
          <Mailbox />
        </span>
      ),
      bgClass: 'bg-red-500/10 dark:bg-red-500/15',
      borderClass: 'border-red-500/20',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(234,67,53,0.2)]',
      label: "Email",
      value: "redasalem287@gmail.com",
      href: "mailto:redasalem287@gmail.com",
    },
    {
      icon: (
        <span className="relative z-20 text-[#25D366]">
          <Phone />
        </span>
      ),
      bgClass: 'bg-[#25D366]/10 dark:bg-[#25D366]/15',
      borderClass: 'border-[#25D366]/20',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(37,211,102,0.2)]',
      label: "Phone",
      value: "+20 112 169 6299",
      href: "tel:+201121696299",
    },
    {
      icon: (
        <span className="relative z-20 text-[#0A66C2]">
          <Users />
        </span>
      ),
      bgClass: 'bg-[#0A66C2]/10 dark:bg-[#0A66C2]/15',
      borderClass: 'border-[#0A66C2]/20',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(10,102,194,0.2)]',
      href: "https://www.linkedin.com/in/reda-salem-dev/",
      label: "LinkedIn",
      value: "LinkedIn Profile",
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 relative bg-background transition-colors duration-300">
      {/* Background glow — multi-color */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-mint-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-brand-mint-500/10 border border-brand-mint-500/20 mb-4 md:mb-6">
            <Send className="text-brand-mint-400 w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold text-brand-mint-400">
              Let&apos;s Talk
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-gradient-animated">Get in Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-4">
            Have a project in mind or want to work together? I&apos;d like to hear about it.
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-brand-mint-500 via-brand-violet-500 to-brand-cyan-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                {...(info.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group block p-4 rounded-xl glass-premium ${info.hoverGlow} hover:-translate-y-0.5 transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${info.bgClass} border ${info.borderClass} relative z-10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 text-lg`}>
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">{info.label}</p>
                    <p className="text-foreground group-hover:text-brand-mint-400 transition-colors">{info.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-2 p-6 rounded-2xl glass-premium animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-brand-mint-500 focus:ring-2 focus:ring-brand-mint-500/20 focus:shadow-[0_0_20px_rgba(0,200,130,0.1)] transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  className={`w-full px-4 py-3 rounded-xl bg-background/50 border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-all duration-300 ${formData.email ? (isValidEmail ? 'border-green-500 focus:ring-green-500/20 focus:shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-red-500 focus:ring-red-500/20') : 'border-border focus:border-brand-mint-500 focus:ring-brand-mint-500/20'
                    }`}
                  placeholder="your@email.com"
                />
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-2">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-brand-violet-500 focus:ring-2 focus:ring-brand-violet-500/20 focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-300"
                  placeholder="Project inquiry"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-brand-cyan-500 focus:ring-2 focus:ring-brand-cyan-500/20 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {/* Submit Button — Gradient */}
              <button
                type="submit"
                disabled={!formData.name || !isValidEmail || !formData.subject || !formData.message}
                className="cursor-pointer w-full btn-gradient !py-3.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {result ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <span><Send className="w-5 h-5" /></span>
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center animate-fade-in backdrop-blur-sm">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center animate-fade-in backdrop-blur-sm">
                  Error sending message. Please try again.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});

export default Contact;
