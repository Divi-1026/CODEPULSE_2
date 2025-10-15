import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <style>
        {`
        @keyframes greenLeftGlow {
          0% {
            box-shadow: 0 0 0px 0px rgba(34,197,94,0);
            transform: translateX(0);
          }
          50% {
            box-shadow: -4px 0 12px 6px rgba(34,197,94,0.5);
            transform: translateX(-2px);
          }
          100% {
            box-shadow: 0 0 0px 0px rgba(34,197,94,0);
            transform: translateX(0);
          }
        }

        .button-glow {
          animation: greenLeftGlow 2s ease-in-out infinite;
        }
        `}
      </style>

      <div className=" rounded-lg px-4 bg-[#f8fafc]">
        <div className="flex flex-col gap-6 pt-4 pb-4">
          {/* Searching Section */}
          <div className="bg-gradient-to-r from-[#d7d3f1]  to-[#b8aef8] p-4 rounded-xl">
            <div className="flex flex-col text-center items-center">
              <h2 className="text-blue-800 font-bold text-xl">Searching</h2>
              <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                <Link to="/Linear_Search">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
  &lt;/&gt; Linear Search &lt;/&gt;
</div>

                </Link>
                <Link to="/Binary_Search">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Binary Search &lt;/&gt;
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Sorting Section */}
          <div className="bg-gradient-to-r from-[#d7d3f1]  to-[#b8aef8] p-4 rounded-xl">
            <div className="flex flex-col text-center items-center">
              <h2 className="text-blue-800 font-bold text-xl">Sorting</h2>
              <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                <Link to="/Selection-Sort">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Selection Sort &lt;/&gt;
                  </div>
                </Link>
                <Link to="/Bubble-Sort">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Bubble Sort &lt;/&gt;
                  </div>
                </Link>
                <Link to="/Insertion-Sort">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Insertion Sort &lt;/&gt;
                  </div>
                </Link>
                <Link to="/Merge-Sort">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Merge Sort &lt;/&gt;
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Tree Section */}
          <div className="bg-gradient-to-r from-[#d7d3f1]  to-[#b8aef8] p-4 rounded-xl">
            <div className="flex flex-col text-center items-center">
              <h2 className="text-blue-800 font-bold text-xl">Tree</h2>
              <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                <Link to="/Binary-Search-Tree">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Binary Search Tree &lt;/&gt;
                  </div>
                </Link>
                <Link to="/Tree-Traversal">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Traversal &lt;/&gt;
                  </div>
                </Link>
                <Link to="/AVL-Tree">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; AVL Tree &lt;/&gt;
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#d7d3f1]  to-[#b8aef8] p-4 rounded-xl">
            <div className="flex flex-col text-center items-center">
              <h2 className="text-blue-800 font-bold text-xl">Graph</h2>
              <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                <Link to="/BFS-Traversal">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; BFS Traversal &lt;/&gt;
                  </div>
                </Link>
                <Link to="/DFS-Traversal">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; DFS Traversal &lt;/&gt;
                  </div>
                </Link>
                 <Link to="/dijkstara">
                <div className="bg-gradient-to-br from-[#130954] via-sky-600 to-[#130954] text-white py-2 rounded-md
                hover:text-white hover:font-semibold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Dijkstara &lt;/&gt;
                  </div>
                </Link>
                {/* <Link to="/AVL-Tree">
                  <div className="bg-[#3f6842] text-white py-2 rounded-md 
                    hover:bg-gradient-to-r from-[#65a069] to-[#4d8152] 
                    hover:text-white hover:font-semibold 
                    hover:shadow-md hover:shadow-[#3e5648] 
                    transition-all duration-300">
                    &lt;&gt; AVL Tree &lt;/&gt;
                  </div>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
