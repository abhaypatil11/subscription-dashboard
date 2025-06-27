
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import API from '../../utils/api';
import toast from 'react-hot-toast';
import withAuth from '../../utils/withAuth';

function EditSubscriptionPage() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    serviceName: '',
    cost: '',
    billingCycle: 'monthly',
    nextBillingDate: '',
    category: '',
  });

  useEffect(() => {
    if (!id) return;
    const fetchSub = async () => {
      try {
        const res = await API.get('/subscriptions');
        const sub = res.data.find((s) => s._id === id);
        if (sub) {
          setForm({
            serviceName: sub.serviceName,
            cost: sub.cost,
            billingCycle: sub.billingCycle,
            nextBillingDate: sub.nextBillingDate.split('T')[0],
            category: sub.category,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSub();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/subscriptions/${id}`, form);
      toast.success('Subscription updated successfully!');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update subscription');
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 w-full max-w-xl p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Edit Subscription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400"
            type="text" placeholder="Service Name"
            value={form.serviceName} onChange={(e) => setForm({ ...form, serviceName: e.target.value })} />
          <input className="w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400"
            type="number" placeholder="Cost"
            value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} />
          <select className="w-full p-3 bg-gray-700 rounded text-white"
            value={form.billingCycle} onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <input className="w-full p-3 bg-gray-700 rounded text-white"
            type="date" value={form.nextBillingDate}
            onChange={(e) => setForm({ ...form, nextBillingDate: e.target.value })} />
          <input className="w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400"
            type="text" placeholder="Category"
            value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <button className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold">
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}

export default withAuth(EditSubscriptionPage);
