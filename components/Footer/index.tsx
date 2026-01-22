export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-2xl font-bold text-white">Exchange Demo</h3>
            <p className="mb-4 max-w-md text-gray-400">
              A modern cryptocurrency exchange platform built with Next.js, providing secure and efficient trading
              experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-based-orange text-gray-400 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="hover:text-based-orange text-gray-400 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.85.38-1.75.64-2.7.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.58-2.11-9.96-5.02-.41.71-.65 1.53-.65 2.4 0 1.67.85 3.14 2.14 4.01-.79-.02-1.53-.24-2.18-.6v.06c0 2.33 1.66 4.28 3.86 4.72-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.63 1.96 2.45 3.39 4.61 3.43-1.69 1.32-3.82 2.1-6.14 2.1-.4 0-.8-.02-1.19-.07 2.19 1.4 4.78 2.22 7.57 2.22 9.07 0 14.02-7.51 14.02-14.02 0-.21 0-.41-.01-.61.96-.69 1.79-1.56 2.45-2.55z" />
                </svg>
              </a>
              <a href="#" className="hover:text-based-orange text-gray-400 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-based-orange text-gray-400 transition-colors">
                  Trading
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-based-orange text-gray-400 transition-colors">
                  Markets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-based-orange text-gray-400 transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-based-orange text-gray-400 transition-colors">
                  Fees
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-based-orange text-gray-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-based-orange text-gray-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-based-orange text-gray-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-based-orange text-gray-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
          <p className="mb-4 text-sm text-gray-400 md:mb-0">© 2026 Exchange Demo. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-based-orange text-sm text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-based-orange text-sm text-gray-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-based-orange text-sm text-gray-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
