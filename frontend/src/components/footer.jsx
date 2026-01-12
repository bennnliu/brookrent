import { Link } from "react-router-dom";
import Logo from "@/assets/output-onlinepngtools.png";

const links = [
  { title: "Customers", href: "#" },
  { title: "About us", href: "#" },
  { title: "FAQs", href: "#" },
];

export default function FooterSection() {
  return (
    <footer className="py-4 md:py-4 bg-background">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="flex items-center justify-center gap-2 text-[rgb(153,0,0)] mb-6">
          <img src={Logo} alt="BrookRent Logo" className="h-8 w-auto" />
          <h1 className="text-lg pt-2 font-bold">BrookRents</h1>
        </div>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="my-8 flex justify-center gap-6 text-sm">
          <a
            href="https://www.instagram.com/brookrent/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
              />
            </svg>
          </a>

          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
             <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z " fill="currentColor"/>
            </svg>
          </a>
        </div>

        <span className="text-muted-foreground block text-center text-sm">
          © {new Date().getFullYear()} BrookRents, All rights reserved
        </span>
      </div>
    </footer>
  );
}
