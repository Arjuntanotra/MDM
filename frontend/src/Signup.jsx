// import { useState } from "react";

// export default function Signup({ onSignup }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSignup(email, password);
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-200 to-purple-200">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-xl w-96"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
//           Sign Up
//         </h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }
