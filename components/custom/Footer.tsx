import { NavLinkPaths } from "@/app/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import NavLink from "./NavBar/NavLinks";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              CSIT Association
            </h2>
            <p className="mb-4">
              Empowering students through technology and innovation since 2016.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NavLinkPaths.map((item, index) => (
                <li key={index}>
                  <NavLink
                    href={item.path}
                    className="hover:text-white transition-colors"
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a
                  href="tel:+9779869144346"
                  className="hover:text-white transition-colors"
                >
                  +977-9869144346
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a
                  href="tel:+9779843409076"
                  className="hover:text-white transition-colors"
                >
                  +977-9843409076
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a
                  href="mailto:csitassociationbmc@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  csitassociationbmc@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1" />
                <span>
                  Golpark-3, Butwal
                  <br />
                  Butwal Multiple Campus
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="mb-4">
              Subscribe to our newsletter for the latest updates and events.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>© 2024 CSIT Association Of BMC. All Rights Reserved.</p>
          <p className="mt-2">Developed by {"< ME />"}</p>
        </div>
      </div>
    </footer>
  );
}
