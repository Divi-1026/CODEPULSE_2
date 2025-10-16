export default function Footer() {
  return (
    <><footer className="bg-white border-t border-gray-200    pb-6 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-bold text-blue-700 mb-3">
            CodePulse
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Master Data Structures & Algorithms with interactive visualizations and clear explanations.
          </p>
        </div>

        {/* Learning Resources */}
        <div>
          <h4 className="text-lg font-semibold text-blue-800 mb-4">Learn</h4>
          <ul className="space-y-2 text-gray-600">
            {[
              "Sorting Algorithms",
              "Searching Algorithms", 
              "Graph Algorithms",
              "Dynamic Programming",
              "Tree Structures",
              "Complexity Analysis"
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Practice */}
        <div>
          <h4 className="text-lg font-semibold text-blue-800 mb-4">Practice</h4>
          <ul className="space-y-2 text-gray-600">
            {[
              "Code Challenges",
              "Interactive Problems", 
              "Race Mode",
              "Mock Interviews",
              "Progress Tracking",
              "Solution Videos"
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-lg font-semibold text-blue-800 mb-4">Connect</h4>
          <div className="flex gap-3 mb-4">
            {[
              {
                href: "https://github.com/DEVENWAGH",
                icon: (
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.337-3.369-1.337-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                ),
                name: "GitHub"
              },
              {
                href: "https://www.linkedin.com/in/deven-wagh-5691b7271/",
                icon: (
                  <>
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" fill="blue" />
                    <path d="M2 9h4v12H2z" fill="blue" />
                    <circle cx="4" cy="4" r="2" fill="blue"/>
                  </>
                ),
                name: "LinkedIn"
              },
              {
                href: "https://x.com/ntMUA4ZjcI66141",
                icon: (
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" fill="blue" />
                ),
                name: "Twitter"
              },
              {
                href: "https://www.instagram.com/wagh_deven/",
                icon: (
                  <>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="red"  />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </>
                ),
                name: "Instagram"
              }
            ].map(({ href, icon, name }, i) => (
              <a 
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200 group"
                aria-label={name}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 group-hover:text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {icon}
                </svg>
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            Follow for updates and tips
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © 2025 <span className="font-semibold text-gray-700">CodePulse</span>. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer></>
  );
}