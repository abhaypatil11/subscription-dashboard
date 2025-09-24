export default function IndexPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Track Subscriptions <br />
          <span className="text-indigo-600">Effortlessly</span>
        </h1>
        <p className="mb-8 text-gray-600 text-base">
          Stay on top of expenses, visualize spending, and get smart renewal alerts.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition"
          >
            Login
          </a>
        </div>
      </div>
    </main>
  );
}
