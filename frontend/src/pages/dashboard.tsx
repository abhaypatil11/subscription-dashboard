
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../utils/api";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import toast from "react-hot-toast";
import withAuth from "../utils/withAuth";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function getUpcomingRenewals(subscriptions: any[], limit: number = 3) {
  const today = new Date();
  return subscriptions
    .filter((sub) => new Date(sub.nextBillingDate) >= today)
    .sort(
      (a, b) =>
        new Date(a.nextBillingDate).getTime() -
        new Date(b.nextBillingDate).getTime()
    )
    .slice(0, limit);
}

function getRedundancyAlerts(subscriptions: any[]) {
  const categoryCount = subscriptions.reduce(
    (acc: Record<string, number>, sub: any) => {
      acc[sub.category] = (acc[sub.category] || 0) + 1;
      return acc;
    },
    {}
  );
  return Object.entries(categoryCount).filter(([_, count]) => count >= 2);
}

function DashboardPage() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState([]);
  const [total, setTotal] = useState(0);
  const [upcomingRenewals, setUpcomingRenewals] = useState([]);

  const categoryData = subscriptions.reduce((acc, sub) => {
    acc[sub.category] = (acc[sub.category] || 0) + sub.cost;
    return acc;
  }, {});

  const spendingByCategory = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "#6366F1",
          "#EC4899",
          "#F59E0B",
          "#10B981",
          "#3B82F6",
        ],
      },
    ],
  };

  const monthlySpending = subscriptions.reduce((acc, sub) => {
    const month = new Date(sub.nextBillingDate).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + sub.cost;
    return acc;
  }, {});

  const spendingOverTime = {
    labels: Object.keys(monthlySpending),
    datasets: [
      {
        label: "Monthly Spend",
        data: Object.values(monthlySpending),
        backgroundColor: "#6366F1",
      },
    ],
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscription?")) return;
    try {
      await API.delete(`/subscriptions/${id}`);
      setSubscriptions((subs) => subs.filter((s) => s._id !== id));
      toast.success("Subscription deleted successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to delete subscription"
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/subscriptions");
        setSubscriptions(res.data);
        setUpcomingRenewals(getUpcomingRenewals(res.data));
        const totalAmount = res.data.reduce((acc, sub) => acc + sub.cost, 0);
        setTotal(totalAmount);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 shadow px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-3xl font-bold">📊 Subscription Dashboard</h1>
        <div className="space-x-3">
          <a
            href="/add-subscription"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Subscription
          </a>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 space-y-6">
          <div className="bg-gray-800 rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Total Monthly Spend</h2>
            <p className="text-3xl font-bold text-indigo-400">₹{total}</p>
          </div>

          <div className="bg-gray-800 rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Spending by Category</h2>
            <div className="h-64">
              <Pie data={spendingByCategory} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Spending Over Time</h2>
            <div className="h-64">
              <Bar data={spendingOverTime} />
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-gray-800 rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Upcoming Renewals</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {upcomingRenewals.length === 0 ? (
                <li>No upcoming renewals</li>
              ) : (
                upcomingRenewals.map((sub) => {
                  const daysLeft = Math.ceil(
                    (new Date(sub.nextBillingDate).getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return (
                    <li key={sub._id}>
                      {sub.serviceName} – {daysLeft} {daysLeft === 1 ? "day" : "days"} left
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          <div className="bg-gray-800 rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Redundancy Alerts</h2>
            <ul className="text-sm list-disc pl-5 space-y-1">
              {getRedundancyAlerts(subscriptions).map(([category, count]) => (
                <li key={category}>
                  You have {count} subscriptions in <strong>{category}</strong>.
                </li>
              ))}
              {getRedundancyAlerts(subscriptions).length === 0 && (
                <li className="text-green-400">
                  No redundancy detected. You're all good!
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>

      <section className="p-6">
        <div className="bg-gray-800 rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4">All Subscriptions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Cost</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Next Billing</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub._id} className="border-b border-gray-700 hover:bg-gray-700/30">
                    <td className="py-2">{sub.serviceName}</td>
                    <td>₹{sub.cost}</td>
                    <td>{sub.category}</td>
                    <td>{new Date(sub.nextBillingDate).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => router.push(`/edit-subscription/${sub._id}`)}
                        className="text-indigo-400 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

export default withAuth(DashboardPage);
