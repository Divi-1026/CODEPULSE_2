// import React from 'react'
// import { motion } from "motion/react"
// import useGreedyStore from '../../store/greedyStore'

// const ActivitySelectionVisualizer = () => {
//   const { activities, selectedActivities } = useGreedyStore()

//   const maxTime = activities.length > 0 
//     ? Math.max(...activities.map(a => a.finish)) 
//     : 10;

//   const generateTimeMarkers = () => {
//     const step = maxTime > 20 ? 2 : 1;
//     const markers = [];
//     for (let i = 0; i <= maxTime; i += step) markers.push(i);
//     if (markers[markers.length - 1] !== maxTime) markers.push(maxTime);
//     return markers;
//   };
//   const timeMarkers = generateTimeMarkers();

//   return (
//     <div className="flex flex-col gap-6 p-6 bg-[#eeeef0] min-h-screen">
      
//       {/* Header */}
//       <h2 className="text-3xl font-bold text-[#819a91]">Activity Selection Visualizer</h2>

//       {/* Explanation Card */}
//       <div className="p-4 rounded-2xl bg-[#d1d8be] shadow-md">
//         <h3 className="text-xl font-semibold text-[#4b6f5e] mb-2">Algorithm Overview</h3>
//         <p className="text-[#4b6f5e] text-sm">
//           The activity selection problem selects non-overlapping activities to maximize usage.
//         </p>
//         <ul className="pl-5 mt-2 text-[#4b6f5e] list-disc text-sm">
//           <li>Sort activities by finish time</li>
//           <li>Pick earliest finishing activity</li>
//           <li>Skip overlapping activities</li>
//         </ul>
//       </div>

//       {/* Activities Blocks */}
//       <div className="flex flex-wrap gap-3">
//         {activities.map((activity, index) => (
//           <motion.div
//             key={activity.id}
//             className={`px-4 py-2 rounded-2xl text-white font-semibold ${
//               selectedActivities.includes(activity) ? 'bg-[#8fc28f]' : 'bg-[#819a91]'
//             }`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 }}
//           >
//             A{activity.id} ({activity.start}-{activity.finish})
//           </motion.div>
//         ))}
//       </div>

//       {/* Timeline */}
//       <div className="p-4 rounded-2xl bg-[#d1d8be] shadow-md overflow-x-auto">
//         <h3 className="text-lg font-semibold text-[#4b6f5e] mb-2">Timeline</h3>
//         <div className="relative h-48 min-w-[700px] bg-[#eeeef0] rounded-lg p-4">
          
//           {/* Time axis */}
//           <div className="absolute top-0 left-0 w-full h-px bg-[#819a91]"></div>
//           {timeMarkers.map(time => (
//             <div
//               key={time}
//               className="absolute top-0 flex flex-col items-center"
//               style={{ left: `${(time / maxTime) * 100}%` }}
//             >
//               <div className="h-3 border-l border-[#819a91]"></div>
//               <span className="text-xs text-[#4b6f5e]">{time}</span>
//             </div>
//           ))}

//           {/* Activities bars */}
//           <div className="absolute top-8 left-0 w-full flex flex-col gap-2">
//             {activities.map((activity, index) => (
//               <div key={activity.id} className="relative h-8">
//                 <motion.div
//                   className={`absolute h-8 rounded-2xl flex items-center justify-center text-xs text-white font-semibold ${
//                     selectedActivities.includes(activity) ? 'bg-[#8fc28f]' : 'bg-[#819a91]'
//                   }`}
//                   style={{
//                     left: `${(activity.start / maxTime) * 100}%`,
//                     width: `${((activity.finish - activity.start) / maxTime) * 100}%`
//                   }}
//                   initial={{ scaleX: 0, opacity: 0 }}
//                   animate={{ scaleX: 1, opacity: 1 }}
//                   transition={{ duration: 0.5, delay: index * 0.05 }}
//                 >
//                   {activity.start}-{activity.finish}
//                 </motion.div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Selected Activities */}
//       <div className="p-4 rounded-2xl bg-[#d1d8be] shadow-md">
//         <h3 className="text-lg font-semibold text-[#4b6f5e] mb-2">Selected Activities</h3>
//         <div className="flex flex-wrap gap-3">
//           {selectedActivities.length > 0 ? selectedActivities.map(activity => (
//             <motion.div
//               key={activity.id}
//               className="px-3 py-2 bg-[#8fc28f] rounded-2xl text-white text-sm font-semibold"
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ type: 'spring', stiffness: 400, damping: 20 }}
//             >
//               A{activity.id} ({activity.start}-{activity.finish})
//             </motion.div>
//           )) : <span className="text-[#819a91] text-sm">Press "Start" to select activities</span>}
//         </div>
//       </div>

//     </div>
//   )
// }

// export default ActivitySelectionVisualizer
