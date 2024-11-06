import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { SignUp } from "./pages/SignUp"
import { SignIn } from "./pages/SignIn"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import { useEffect } from "react"

function App() {
  return ( 
    <div className="h-screen w-full bg-zinc-800 text-white p-4 text-center">
      <div>
        <h1 className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl text-left"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Pay Better</span> & Safer.</h1>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("token");
      navigate("/signup");
    };
    logout();
  }, [navigate]);

  return <div></div>;
}

export default App