"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
interface FooterProps {
  className?: string;
}
export function Footer({ className }: FooterProps) {
  const menu = [
    { title: "Home", url: "/" },
    { title: "Courses", url: "/courses" },
    { title: "Mentors", url: "/mentors" },
    { title: "Testimonials", url: "/testimonials" },
    { title: "Contact Us", url: "/contact" },
    { title: "Dashboard", url: "/dashboard" },
  ];
  return (
    <footer
      className={cn(
        "bg-background border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300",
        className,
      )}
    >
      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row justify-between gap-10">
        {/* Logo + About */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="SkillBridge Logo"
              width={36}
              height={36}
              className="dark:invert"
            />
            <span className="text-lg font-semibold tracking-tighter bg-linear-to-r from-[#7b2a85] via-[#611f69] to-[#4a174f] dark:from-[#d8b4fe] dark:via-[#c084fc] dark:to-[#a855f7] bg-size-[200%_200%] bg-left bg-clip-text text-transparent transition-all duration-500">
              SkillBridge
            </span>
          </Link>
          <p className="max-w-xs text-sm">
            Empowering learners and mentors to connect, grow, and achieve their
            goals.
          </p>
          <div className="flex gap-3 mt-2">
              <Link href="https://facebook.com" target="_blank">
                <i className="fab fa-facebook-f" />
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <i className="fab fa-twitter" />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <i className="fab fa-linkedin-in" />
              </Link>
          </div>
        </div>
        {/* Navigation Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-gray-800 dark:text-gray-100">
            Quick Links
          </h4>
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="hover:text-[#611f69] dark:hover:text-[#c084fc] transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
        {/* Contact / Newsletter */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-gray-800 dark:text-gray-100">
            Contact Us
          </h4>
          <p className="text-sm">123 SkillBridge Ave, Dhaka, Bangladesh</p>
          <p className="text-sm">support@skillbridge.com</p>
          <p className="text-sm">+880 1234 567890</p>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm w-full"
            />
            <Button
              size="sm"
              className="bg-[#611f69] text-white hover:bg-[#4a174f] dark:bg-[#c084fc] dark:text-black dark:hover:bg-[#d8b4fe]"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 mt-10 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
      </div>
    </footer>
  );
}
