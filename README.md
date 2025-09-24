# 📊 Subscription Dashboard

A full-stack web application to manage and visualize all your recurring subscriptions in one place. Track your monthly spending, get notified of upcoming renewals, and identify redundant services with insightful charts and analytics.

## 🔗 Live Demo

**Frontend (Vercel)**: [View Dashboard](https://subscription-dashboard-4rza-csriryd8p-abhays-projects-c16af239.vercel.app)



---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) via `react-chartjs-2`
- **Authentication**: JWT-based Auth
- **State Management**: React `useState` & `useEffect`
- **Notifications**: `react-hot-toast`
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) *(Private repo or local only)*
- **Database**: [MongoDB](https://www.mongodb.com/)

---

## ✨ Features

- 🔐 **User Authentication** — Secure login with token-based auth
- ➕ **Add/Edit/Delete Subscriptions** — Full CRUD operations
- 📅 **Upcoming Renewals** — See subscriptions due soon
- 📈 **Analytics Dashboard**:
  - Pie chart of category-wise spending
  - Bar chart of monthly spend over time
- ⚠️ **Redundancy Alerts** — Warns if you have multiple services in the same category
- 🎨 **Responsive UI** — Works across all devices

---

## 🚀 Getting Started (Local Development)

```bash
# 1. Clone the repo
git clone https://github.com/abhaypatil11/subscription-dashboard.git
cd subscription-dashboard

# 2. Install dependencies
npm install

# 3. Setup environment
# Create a .env.local file and set:
# NEXT_PUBLIC_API_URL=http://localhost:5000 (or your backend endpoint)

# 4. Run the app
npm run dev
