export default function IndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-10 max-w-xl w-full text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Track Your Subscriptions <br />
          <span className="text-yellow-300">Smartly</span> & Effortlessly
        </h1>
        <p className="mb-6 text-lg text-white/90">
          Stay on top of your monthly expenses. Visualize your spending. Get smart renewal alerts.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/register"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-6 py-2 rounded-lg shadow"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="bg-white/20 border border-white text-white hover:bg-white/10 px-6 py-2 rounded-lg font-semibold"
          >
            Login
          </a>
        </div>
      </div>
    </main>
  );
}
