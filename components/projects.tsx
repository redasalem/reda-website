
import React, { type ReactNode } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import MovieIcon from '@mui/icons-material/Movie'
import PublicIcon from '@mui/icons-material/Public'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import CircleIcon from '@mui/icons-material/Circle'
import CarRentalIcon from '@mui/icons-material/CarRental';
import { CoffeeIcon, HomeIcon } from 'lucide-react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

interface Project {
  title: string
  description: string
  tech: string[]
  image: string
  demo: string
  code: string
  icon: ReactNode
  color: string
  borderColor: string
}

export default function Projects() {
  const projects: Project[] = [
     {
  title: "C4R Car Rental Platform",
  description: "C4R is a sleek and modern car rental platform that offers flexible rental options for individuals and businesses, including daily and monthly rentals. Built with React.js and Tailwind CSS, the platform features a responsive design, multi-language support, dark/light mode toggle, smooth animations using Framer Motion, and elegant UI components with shadcn/ui.",
  tech: ["React.js", "Tailwind CSS", "Framer Motion","Web3Form", "Material Icons"],
  image: "/images/c4r-platform.png",
  demo: "https://c4rplatform.netlify.app/", // ضع رابط الديمو الفعلي هنا
  code: "https://github.com/redasalem/c4r_platform_landing_page.git", // ضع رابط الريبو هنا
  icon: <CarRentalIcon className="text-fuchsia-500" />, // يمكنك استخدام أي أيقونة مناسبة
  color: "bg-green-500/10",
  borderColor: "border-green-500/20",
},

    {
      title: "Admin Dashboard",
      description: "A professional Admin Dashboard Application built with React.js, styled with Material UI, featuring interactive charts using Nivo, and deployed on Firebase Hosting",
      tech: ["React.js", "Material UI", "Nivo", "Firebase"],
      image: "/images/dashboard.png",
      demo: "https://admin-dashboard-58fdc.web.app/",
      code: "https://github.com/redasalem/Admin_Dashbord_React.git",
      icon: <DashboardIcon className="text-blue-500" />,
      color: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "E-Commerce Shop",
      description: "A full-featured e-commerce shop built with Next.js 14, TypeScript, Redux, Tailwind CSS, Clerk for authentication, and PayPal for payments. This project uses a fake API store for product data and demonstrates a real-world online shopping experience",
      tech: ["Next.js 14", "TypeScript", "Redux", "Tailwind CSS", "Clerk", "PayPal"],
      image: "/images/ecommerce.png",
      demo: "https://commerce-shop-reda.vercel.app/",
      code: "https://github.com/redasalem/CommerceShop_Next.js.git",
      icon: <ShoppingCartIcon className="text-green-500" />,
      color: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "AI Company Landing Page",
      description: "A modern, responsive landing page for an AI company built with Next.js, Tailwind CSS, TypeScript, Next Themes, and React Icons. Optimized for SEO and fast performance",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Next Themes"],
      image: "/images/AI.png",
      demo: "https://aibrain-reda.vercel.app/",
      code: "https://github.com/redasalem/AI_Landing_Page.git",
      icon: <RocketLaunchIcon className="text-purple-500" />,
      color: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
  title: "Shopping Cart App",
  description:
    "A fully functional Shopping Cart application built with React, Redux Toolkit, Tailwind CSS, and shadcn/ui. It features global state management, quantity control, product removal, total calculations, and a responsive UI with smooth animations.",
  tech: ["React.js", "Redux Toolkit", "Tailwind CSS", "shadcn/ui"],
  image: "/images/shopping-cart.png",
  demo: "https://cartshoppingreda.netlify.app/", // ضع رابط الديمو الفعلي هنا
  code: "https://github.com/redasalem/Shopping_cart.git", // ضع رابط الريبو هنا
  icon: <ShoppingCartIcon className="text-yellow-500" />, // أيقونة مناسبة
  color: "bg-yellow-500/10",
  borderColor: "border-yellow-500/20",
},
    {
      title: "Movie Fan",
      description: "A Full-Stack Movie Discovery Application built with React, TailwindCSS, Firebase, and TMDb API. This app delivers a smooth user experience with real-time movie data, secure authentication, and modern UI design",
      tech: ["React.js", "Tailwind CSS", "Firebase", "TMDb API"],
      image: "/images/movie.png",
      demo: "https://moviereda.netlify.app/",
      code: "https://github.com/redasalem/Movies_Fan.git",
      icon: <MovieIcon className="text-red-500" />,
      color: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
    {
  title: "Real Estate Website",
  description: "A modern and fully responsive real estate website built with React, Tailwind CSS, and Vite. It features a clean and elegant user interface, optimized performance with fast load times, and is deployed seamlessly on Netlify.",
  tech: ["React.js", "Tailwind CSS", "Vite", "Netlify"],
  image: "/images/real-estate.png",
  demo: "https://stateredasalem.netlify.app/", // ضع هنا رابط الديمو الفعلي
  code: "https://github.com/redasalem/Real_Estate.git", // ضع هنا رابط الريبو الفعلي
  icon: <HomeIcon className="text-blue-500" />,
  color: "bg-purple-500/10",
  borderColor: "border-purple-500/20",
},
    {
      title: "Country Explorer",
      description: "A sleek and interactive web application that allows users to explore countries around the world, providing detailed information including demographics, geography, and real-time local times",
      tech: ["Html", "Tailwind CSS", "JavaScript", "Leaflet.js","REST Countries API "],
      image: "/images/explore.png",
      demo: "https://country-explorer-redasalem.netlify.app/",
      code: "https://github.com/redasalem/Country-Explorer.git",
      icon: <PublicIcon className="text-cyan-500" />,
      color: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
    {
      title: "Weather App",
      description: "Responsive weather app with optimized API fetching",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "OpenWeather API", "React Query"],
      image: "/images/weather.png",
      demo: "https://weather-app-reda-salem.vercel.app/",
      code: "https://github.com/redasalem/Weather_App.git",
      icon: <WbSunnyIcon className="text-yellow-500" />,
      color: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
  title: "E-commerce Website",
  description: "A full-featured e-commerce website with seven structured pages, built using HTML, CSS, Sass, Bootstrap, and JavaScript. The project is well-organized and optimized with Webpack, offering a fully responsive layout and a smooth user experience across all devices.",
  tech: ["HTML", "CSS", "Sass", "Bootstrap", "JavaScript", "Webpack"],
  image: "/images/ecommerce2.png",
  demo: "https://redasalem.github.io/", // ضع هنا رابط الديمو الفعلي
  code: "https://github.com/redasalem/Ecommerce.git", // ضع هنا رابط الريبو الفعلي
  icon: <ShoppingCartIcon className="text-orange-500" />,
  color: "bg-orange-500/10",
  borderColor: "border-orange-500/20",
 },
  {
    title: "Coffee-Verse",
    description:
      "A stylish coffee-themed website built with HTML, Sass, Bootstrap, and JavaScript. The project is bundled and optimized using Webpack, with a fully responsive layout for a smooth experience across all devices.",
    tech: ["HTML", "Sass", "Bootstrap", "JavaScript", "Webpack"],
    image: "/images/coffee-verse.png", // ضع رابط الصورة الفعلي هنا
    demo: "https://redasalem.github.io/Coffe-verse-preparing/", // ضع رابط الديمو الفعلي هنا
    code: "https://github.com/redasalem/Coffee-Verse.git", // ضع رابط الريبو هنا
    icon: <CoffeeIcon className="text-amber-800" />, // أيقونة مناسبة
    color: "bg-brown-500/10",
    borderColor: "border-brown-500/20",
  },
   {
    title: "Company Landing Page",
    description:
      "A clean and responsive landing page designed for a company offering innovative digital solutions. Built with HTML, CSS, Bootstrap, and JavaScript to ensure smooth performance and a great user experience on all devices.",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    image: "/images/company-landing.png", // ضع رابط الصورة الفعلي هنا
    demo: "https://your-demo-link.netlify.app/", // ضع رابط الديمو الفعلي هنا
    code: "https://github.com/redasalem/company-landing.git", // ضع رابط الريبو هنا
    icon: <AccountBalanceIcon className="text-blue-500" />, // أيقونة مناسبة للشركات
    color: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },

  ]

  return (
    <section id="projects" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-accent to-primary rounded-full mx-auto" />
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative bg-card border border-transparent hover:border-accent/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project header with icon */}
              <div className={`flex items-center gap-3 p-4 ${project.color} border-b ${project.borderColor}`}>
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                  {project.icon}
                </div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </div>

              {/* Project image */}
              <div className="relative h-48">
                <div className="absolute inset-0 bg-linear-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[90%]"
                />
              </div>

              {/* Project content */}
              <div className="p-6">
                <p className="text-foreground/70 mb-4">{project.description}</p>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium flex items-center gap-1"
                    >
                      <CircleIcon sx={{ fontSize: 8 }} />
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-300 hover:scale-105"
                  >
                    <LaunchIcon sx={{ fontSize: 18 }} />
                    Live Demo
                  </a>
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                  >
                    <GitHubIcon sx={{ fontSize: 18 }} />
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}