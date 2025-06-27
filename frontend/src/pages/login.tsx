

import { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../utils/api';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-xl p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            className="w-full p-3 bg-white/20 placeholder-white/70 text-white border border-white/30 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 bg-white/20 placeholder-white/70 text-white border border-white/30 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-2 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-white/80 text-center mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="underline text-white">
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
