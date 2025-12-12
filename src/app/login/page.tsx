'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "./auth";

//interface tipe 
interface LoginData {
  username: string;
  password: string;
}

export default function LoginPage() {

//menyimpan data form login
  const [LoginData, setLoginData] = useState<LoginData>({
    username: "",
    password: ""
  });

//menyimpan error
  const [error, setError] = useState('');
//menyimpan loading
  const [isLoading, setIsLoading] = useState(false);
//router
  const router = useRouter();
//auth
  const { isAuthenticated, login } = useAuth();

//jika sudah login
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://api.rgd.gg/api/v1/auth', LoginData, 
        {
          headers: {
            'Content-Type' : 'application/json'
          }
        }
      );
      const jwtToken = response.data.token;
      
      login(jwtToken);
      
    } catch (error: any) {
      setError(error.response?.data?.message || '! Username / Password Salah !');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-lg w-80 border border-purple-600">
        <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>}
        <input 
          type="text" 
          placeholder="Masukkan Username" 
          value={LoginData.username} 
          onChange={(e) => setLoginData({...LoginData, username: e.target.value})}
          className="w-full p-2 mb-4 border border-purple-600 rounded" 
          required 
          disabled={isLoading}
        />
        <input 
          type="password" 
          placeholder="Masukkan Password" 
          value={LoginData.password} 
          onChange={(e) => setLoginData({...LoginData, password: e.target.value})}
          className="w-full p-2 mb-4 border border-purple-600 rounded" 
          required 
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="font-semibold cursor-pointer w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-900 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Memproses...' : 'Login'}
        </button>
      </form>
    </div>
  )
}