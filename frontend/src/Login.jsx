import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("🔹 Login form submitted"); // DEBUG log

  const url = `http://localhost:5000/api/auth/${isSignup ? "signup" : "login"}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("🔹 Response status:", res.status); // DEBUG log
    const data = await res.json();
    console.log("🔹 Response data:", data);         // DEBUG log

   if (data.success) {
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  alert(data.message || "Success");
  onLogin();
} else {
  alert(data.error || "Failed");
}
  } catch (err) {
    console.error("❌ Fetch error:", err); // DEBUG log
    alert(err.message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-96">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Switch */}
        <p
          className="text-sm text-center mt-4 text-indigo-600 cursor-pointer hover:underline"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "New user? Sign up"}
        </p>
      </div>
    </div>
  );
}
