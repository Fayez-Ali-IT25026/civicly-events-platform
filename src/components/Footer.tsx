import Link from "next/link";
import { Leaf, MapPin } from "lucide-react";
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";

type FooterLink = {
  label: string;
  href: string;
};

const quickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const communityLinks: FooterLink[] = [
  { label: "Create Event", href: "/create-event" },
  { label: "Manage Events", href: "/manage-events" },
  { label: "Joined Events", href: "/joined-events" },
];

const socials = [
  { icon: FaXTwitter, label: "X", href: "#" },
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-[#04241b] px-6 pt-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8be37a]/15">
              <Leaf size={18} className="text-[#8be37a]" />
            </span>
            Civicly
          </Link>
          <p className="mt-2 text-sm text-gray-400">Small Acts. Big Impact.</p>

          <div className="mt-5 flex gap-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:border-[#8be37a] hover:bg-[#8be37a]/10 hover:text-[#8be37a]"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-[#8be37a]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">For Community</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            {communityLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-[#8be37a]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Together, we can build stronger, healthier and more compassionate
            communities.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-gray-300">
            <MapPin size={14} className="text-[#8be37a]" /> Dhaka, Bangladesh
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 py-5 text-xs text-gray-500 sm:flex-row">
        <p>© 2026 Civicly. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;