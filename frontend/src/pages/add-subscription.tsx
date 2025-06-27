

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import API from '../utils/api';
// import toast from 'react-hot-toast';
// import withAuth from '../utils/withAuth'; 

// function AddSubscriptionPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     serviceName: '',
//     cost: '',
//     billingCycle: 'monthly',
//     nextBillingDate: '',
//     category: '',
//   });

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         alert("You must be logged in");
//         return;
//       }

//       await API.post(
//         '/subscriptions',
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       toast.success('Subscription added successfully!');
//       router.push('/dashboard');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to add subscription');
//       console.error(err.response?.data || err.message);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4 text-black">Add New Subscription</h2>
//         <form className="space-y-4 text-gray-700" onSubmit={handleAdd}>
//           <input className="w-full p-2 border rounded text-gray-700" type="text" placeholder="Service Name (e.g., Netflix)"
//             value={form.serviceName} onChange={(e) => setForm({ ...form, serviceName: e.target.value })} />

//           <input className="w-full p-2 border rounded text-gray-700" type="number" placeholder="Monthly Cost"
//             value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} />

//           <select className="w-full p-2 border rounded text-gray-400"
//             value={form.billingCycle} onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}>
//             <option value="monthly">Monthly</option>
//             <option value="yearly">Yearly</option>
//           </select>

//           <input className="w-full p-2 border rounded text-gray-400" type="date"
//             value={form.nextBillingDate} onChange={(e) => setForm({ ...form, nextBillingDate: e.target.value })} />

//           <input className="w-full p-2 border rounded text-gray-700" type="text" placeholder="Category (e.g., Entertainment)"
//             value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />

//           <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" type="submit">
//             Add Subscription
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }

// export default withAuth(AddSubscriptionPage);


// File: src/pages/add-subscription.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import API from '../utils/api';
import toast from 'react-hot-toast';
import withAuth from '../utils/withAuth';

function AddSubscriptionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    serviceName: '',
    cost: '',
    billingCycle: 'monthly',
    nextBillingDate: '',
    category: '',
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You must be logged in");
        return;
      }

      await API.post('/subscriptions', form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Subscription added successfully!');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add subscription');
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 w-full max-w-xl p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Add New Subscription</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <input className="w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400"
            type="text" placeholder="Service Name (e.g., Netflix)"
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
            type="text" placeholder="Category (e.g., Entertainment)"
            value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <button className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold">
            Add Subscription
          </button>
        </form>
      </div>
    </main>
  );
}

export default withAuth(AddSubscriptionPage);
