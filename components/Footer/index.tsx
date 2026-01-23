import Link from "next/link";
import { MessageCircle, Twitter, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-2xl font-bold text-white">Based</h3>
            <p className="mb-6 max-w-md text-gray-400">
              Trade everything, spend everywhere. The future is Based.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/BasedOneX"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-based-orange text-gray-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://discord.gg/basedapp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-based-orange text-gray-400 transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a
                href="https://t.me/BasedOneX"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-based-orange text-gray-400 transition-colors"
              >
                <Send className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Products</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://app.based.one/trade/BTC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-based-orange text-gray-400 transition-colors"
                >
                  Trade
                </a>
              </li>
              <li>
                <a
                  href="https://app.based.one/predict"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-based-orange text-gray-400 transition-colors"
                >
                  Predict
                </a>
              </li>
              <li>
                <Link href="/cards" className="hover:text-based-orange text-gray-400 transition-colors">
                  Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://based.one/faq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-based-orange text-gray-400 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/BasedOneX/articles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-based-orange text-gray-400 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://based.one/careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-based-orange text-gray-400 transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
          <p className="mb-4 text-sm text-gray-400 md:mb-0">© 2026 Based. All rights reserved.</p>
          <div className="flex space-x-6">
            <a
              href="https://based.one/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-based-orange text-sm text-gray-400 transition-colors"
            >
              Platform Terms
            </a>
            <a
              href="https://based.one/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-based-orange text-sm text-gray-400 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
