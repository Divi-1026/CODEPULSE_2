import { Link } from "react-router-dom";

export default function NavTheory() {
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
          <div className="bg-gradient-to-r from-[#e2e0ef] to-[#e2e0ef] p-4 rounded-xl">
            <div className="flex flex-col text-center items-center">
              <h2 className="text-blue-800 font-bold text-xl">Searching</h2>
              <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                <Link to="/Learn_Searching">
                <div className="bg-gradient-to-br from-[#afa7e6] via-[#c9c4ed] to-[#a9a0e4] text-black  font-semibold py-2 rounded-md
                hover:text-black hover:font-bold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
  &lt;/&gt; Linear Search &lt;/&gt;
</div>

                </Link>
                <Link to="/Learn_Binary">
                <div className="bg-gradient-to-br from-[#afa7e6] via-[#c9c4ed] to-[#a9a0e4] text-black font-semibold py-2 rounded-md
                hover:text-black hover:font-bold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Binary Search &lt;/&gt;
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Sorting Section */}
          <div className="bg-gradient-to-r from-[#e2e0ef] to-[#e2e0ef]  p-4 rounded-xl">
            <div className="flex flex-col text-center items-center">
              <h2 className="text-blue-800 font-bold text-xl">Sorting</h2>
              <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                <Link to="/Learn_Selection-Sort">
                <div className="bg-gradient-to-br from-[#afa7e6] via-[#c9c4ed] to-[#a9a0e4] text-black font-semibold  py-2 rounded-md
                hover:text-black hover:font-bold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Selection Sort &lt;/&gt;
                  </div>
                </Link>
                <Link to="/Learn_Bubble-Sort">
                <div className="bg-gradient-to-br from-[#afa7e6] via-[#c9c4ed] to-[#a9a0e4] text-black py-2 font-semibold rounded-md
                hover:text-black hover:font-bold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Bubble Sort &lt;/&gt;
                  </div>
                </Link>
                <Link to="/Learn_Insertion-Sort">
                <div className="bg-gradient-to-br from-[#afa7e6] via-[#c9c4ed] to-[#a9a0e4] text-black py-2 rounded-md font-semibold
                hover:text-black hover:font-bold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Insertion Sort &lt;/&gt;
                  </div>
                </Link>
                <Link to="/Learn_Merge-Sort">
                <div className="bg-gradient-to-br from-[#afa7e6] via-[#c9c4ed] to-[#a9a0e4] text-black py-2 rounded-md font-semibold
                hover:text-black hover:font-bold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Merge Sort &lt;/&gt;
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Tree Section */}
          <div className="bg-gradient-to-r from-[#e2e0ef] to-[#e2e0ef] p-4 rounded-xl">
            <div className="flex flex-col text-center items-center">
              <h2 className="text-blue-800 font-bold text-xl">Tree</h2>
              <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                <Link to="/Learn_Binary-Search-Tree">
                <div className="bg-gradient-to-br from-[#afa7e6] via-[#c9c4ed] to-[#a9a0e4] text-black font-semibold py-2 rounded-md
                hover:text-black hover:font-bold  
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Binary Search Tree &lt;/&gt;
                  </div>
                </Link>
                <Link to="/Learn_Tree-Traversal">
                <div className="bg-gradient-to-br from-[#afa7e6] via-[#c9c4ed] to-[#a9a0e4] text-black font-semibold py-2 rounded-md
                hover:text-black hover:font-bold  
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; Traversal &lt;/&gt;
                  </div>
                </Link>
                <Link to="/Learn_AVL-Tree">
                <div className="bg-gradient-to-br from-[#afa7e6] via-[#c9c4ed] to-[#a9a0e4] text-black font-semibold py-2 rounded-md
                hover:text-black hover:font-bold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; AVL Tree &lt;/&gt;
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#e2e0ef] to-[#e2e0ef] p-4 rounded-xl">
            <div className="flex flex-col text-center items-center">
              <h2 className="text-blue-800 font-bold text-xl">Graph</h2>
              <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                <Link to="/Learn_BFS-Traversal">
                <div className="bg-gradient-to-br from-[#afa7e6] via-[#c9c4ed] to-[#a9a0e4] text-black font-semibold py-2 rounded-md
                hover:text-black hover:font-bold 
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; BFS Traversal &lt;/&gt;
                  </div>
                </Link>
                <Link to="/Learn_DFS-Traversal">
                <div className="bg-gradient-to-br from-[#afa7e6] via-[#c9c4ed] to-[#a9a0e4] text-black font-semibold py-2 rounded-md
                hover:text-black hover:font-bold  
                hover:shadow-md hover:shadow-[#3e5648]  
                transition-all duration-300">
                    &lt;&gt; DFS Traversal &lt;/&gt;
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