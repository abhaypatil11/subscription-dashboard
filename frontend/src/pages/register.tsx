

import { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../utils/api';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      toast.success('Registration successful! Please log in.');
      router.push('/login');
    } catch (err:any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-xl p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create Your Account 🎉</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            className="w-full p-3 bg-white/20 placeholder-white/70 text-white border border-white/30 rounded"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full p-3 bg-white/20 placeholder-white/70 text-white border border-white/30 rounded"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full p-3 bg-white/20 placeholder-white/70 text-white border border-white/30 rounded"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-2 rounded"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-white/80 text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="underline text-white">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
