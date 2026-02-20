// "use client";

// import { motion } from "framer-motion";

// function FloatingPaths({ position }) {
//   const paths = Array.from({ length: 36 }, (_, i) => ({
//     id: i,
//     d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
//       380 - i * 5 * position
//     } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
//       152 - i * 5 * position
//     } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
//       684 - i * 5 * position
//     } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
//     width: 0.5 + i * 0.03,
//   }));

//   return (
//     <div className="absolute inset-0 pointer-events-none">
//       <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
//         {paths.map((path) => (
//           <motion.path
//             key={path.id}
//             d={path.d}
//             stroke="rgba(139, 92, 246, 0.15)"
//             strokeWidth={path.width}
//             initial={{ pathLength: 0.2, opacity: 0.2 }}
//             animate={{
//               pathLength: 1,
//               opacity: [0.1, 0.4, 0.1],
//               pathOffset: [0, 1, 0],
//             }}
//             transition={{
//               duration: 25 + Math.random() * 10,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           />
//         ))}
//       </svg>
//     </div>
//   );
// }

// export default function DashboardBackground({ children }) {
//   return (
//     <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-[#0f172a] to-black">
      
//       <FloatingPaths position={1} />
//       <FloatingPaths position={-1} />

//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_70%)]" />

//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }