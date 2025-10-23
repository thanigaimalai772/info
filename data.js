// data.js


export const portfolioData = {
  /**
   * User's personal and contact information.
   */
  userData: {
    name: "Thanigaimalai K",
    shortName: "Thanigai",
    title: "Full-Stack Developer",
    email: "thanigaimalai772@gmail.com",
  },

  /**
   * Social media and professional links.
   */
  links: {
    instagram: "https://instagram.com/eye_killer_and_love_hacker",
    facebook: "https://www.facebook.com/share/17WqMKursi/", // Use "#" if you don't have a link
    github: "https://github.com/thanigaimalai772",
    linkedin: "https://www.linkedin.com/in/thanigaimalai-sk-725376359",
  },

  /**
   * Asset paths.
   */
  assets: {
    hero: "./assets/hero.png",
    about: "./assets/about.png",
    resumeImg: "./assets/resume.jpg",
    resumePdf: "./assets/Resume/_CV.pdf",
    resumeDownloadName: "Thanigaimalai_CV.pdf",
  },

  /**
   * List of user's skills.
   */
  skillsDetails: [
    { id: 1, name: "HTML 5", image: "./assets/html.png" },
    { id: 2, name: "CSS 3", image: "./assets/css.png" },
    { id: 3, name: "Javascript", image: "./assets/js.png" },
    { id: 4, name: "React Js", image: "./assets/react.png" },
    { id: 5, name: "Node JS", image: "./assets/node.png" },
    { id: 6, name: "Express Js", image: "./assets/express.png" },
    { id: 8, name: "Tailwind", image: "./assets/tailwind.png" },
    { id: 9, name: "MongoDB", image: "./assets/mongodb.png" },
  ],

  /**
   * List of user's projects.
   */
  projectDetails: [
    {
      id: 1,
      name: "Library Management",
      description:
        "Library Management System Using React JS , Express Js , SQL , Bootstrap ",
      img: "./assets/library.png",
      gitLink: "https://github.com/Karthikeyan-BE/LMS_SQL.git",
    },
    {
      id: 2,
      name: "GYM Management",
      description:
        "Gym Management System Using React JS , Express Js , SQL , Bootstrap ",
      img: "./assets/gym.png",
      gitLink: "",
    },
    {
      id: 3,
      name: "Portfolio",
      description:
        "Responsive personal portfolio website using React and Tailwind CSS",
      img: "./assets/portfolio.png",
      gitLink: "https://github.com/Karthikeyan-BE/portfolio.git",
    },
    {
      id: 4,
      name: "weather App",
      description: "Real time weather data using rapid weather api",
      img: "./assets/weather.jpeg",
      gitLink: "https://github.com/Karthikeyan-BE/Weather_MERN.git",
    },
    {
      id: 5,
      name: "Todo",
      description:
        "Responsive Todo app with Login Build with Tailwind , React , Zustand , Express , MongoDB",
      img: "./assets/todo.jpeg",
      gitLink: "https://github.com/Karthikeyan-BE/Todo_Mern.git",
    },
  ],
};
