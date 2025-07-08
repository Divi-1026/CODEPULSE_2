export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#d7d3f1]  to-[#d7d3f1] border-t border-[#c6d2bb] mt-20 pt-5 pb-6 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* Logo + Desc */}
        <div>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#544ab1] to-[#121051] mb-2">
            CodePulse
          </h3>
          <p className="text-cyan-700 font-medium">
            Learn DSA with clarity and beautiful animations.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-1">Resources</h3>
          <ul className="grid grid-cols-2 gap-2 text-blue-800 font-medium">
            {[
              "Sorting Algorithms",
              "Searching Algorithms",
              "Graph Algorithms",
              "Dynamic Algorithms",
              "Greedy Algorithms",
              "Tree Algorithms",
              "Mathematical Algorithms",
              "Race Mode",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Icons */}
        <div className="">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Connect</h3>
          <div className="flex flex-wrap gap-3">
            {[
              {
                href: "https://github.com/DEVENWAGH",
                icon: (
                  <>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77" />
                    <path d="M5 4.77A5.07 5.07 0 015.09 1 13.38 13.38 0 0012 1a13.38 13.38 0 007 0A5.07 5.07 0 0118.91 4.77" />
                    <path d="M9 18.13V22" />
                  </>
                ),
              },
              {
                href: "https://x.com/ntMUA4ZjcI66141",
                icon: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6" />,
              },
              {
                href: "https://www.linkedin.com/in/deven-wagh-5691b7271/",
                icon: (
                  <>
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2" />
                    <path d="M2 9h4v12H2z" />
                    <circle cx={4} cy={4} r={2} />
                  </>
                ),
              },
              {
                href: "https://www.instagram.com/wagh_deven/",
                icon: (
                  <>
                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1={17.5} y1={6.5} x2={17.51} y2={6.5} />
                  </>
                ),
              },
            ].map(({ href, icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gradient-to-r from-[#282a9b] to-[#3c3893] rounded-full hover:scale-110 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-3 border-t border-[#c6d2bb] pt-3 text-center text-[#46634b] text-xs sm:text-sm">
        © 2025 <span className="font-semibold text-[#516a61]">CodePulse</span>. All rights reserved.
      </div>
    </footer>
  );
}
