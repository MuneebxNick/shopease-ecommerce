<div align="center">
  <h1>🛍️ ShopEase</h1>
  <p><strong>A modern full-stack ecommerce platform built with Next.js, TypeScript, MongoDB, JWT authentication and modern UI technologies.</strong></p>
  
  <p>
    <a href="https://shopease-ecommerce-mocha.vercel.app/">
      <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-2563EB?style=for-the-badge" alt="Live Demo" />
    </a>
  </p>

  <p>
    <a href="#features"><strong>Explore Features</strong></a> · 
    <a href="#system-architecture"><strong>Architecture</strong></a> · 
    <a href="#installation-guide"><strong>Installation</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

<hr />

## 📖 Project Overview

ShopEase is a comprehensive, production-ready full-stack ecommerce application designed to provide a seamless shopping experience. The platform implements a complete real-world ecommerce workflow, from browsing products and managing a persistent shopping cart to secure authentication and order processing.

Built with performance, security, and user experience in mind, ShopEase leverages the latest capabilities of Next.js App Router, robust state management via Zustand, and a secure custom JWT authentication system.

**Deployment Status**: Production (Deployed on Vercel)

## 🌐 Live Demo

[![Live Demo](https://img.shields.io/badge/🚀_View_Live_Application-shopease--ecommerce--mocha.vercel.app-blue?style=for-the-badge)](https://shopease-ecommerce-mocha.vercel.app/)

## ✨ Features

| Feature Area | Implemented Capabilities |
| :--- | :--- |
| **Storefront** | 📱 Responsive ecommerce layout<br>🛍️ Dynamic product listing<br>📄 Detailed product pages |
| **Shopping Cart** | 🛒 Interactive shopping cart<br>💾 Persistent cart state (Zustand)<br>🔄 Guest and authenticated checkout |
| **Authentication** | 📝 User registration & login<br>🔐 Custom JWT authentication<br>🍪 Secure HTTP-only cookies<br>🛡️ Protected private routes |
| **Order Management** | 💳 Comprehensive checkout system<br>📦 Secure order creation<br>📋 User order history & details |
| **User Experience** | 👤 Personalized account dashboard<br>❤️ Wishlist system for saving products |

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** (App Router, Server Actions)
- **React 19**
- **TypeScript**
- **Tailwind CSS** (for styling)
- **Framer Motion** (for animations)

### Backend
- **Next.js API Routes**
- **MongoDB Atlas** (Database)
- **Mongoose** (ODM)

### Authentication & Security
- **JWT** (JSON Web Tokens)
- **bcrypt** (Password hashing)
- **HTTP-only Cookies** (Secure token storage)

### State Management
- **Zustand** (Global cart and UI state)

### Deployment
- **Vercel**

## 🏗️ System Architecture

**User Interface** ➡️ **Next.js App Router** ➡️ **API Routes** ➡️ **Authentication Layer** ➡️ **Mongoose Models** ➡️ **MongoDB Atlas**

## 📁 Project Structure

```text
shopease/
├── app/                  # Next.js App Router pages, layouts, and API routes
│   ├── api/              # Backend API endpoints
│   ├── account/          # Protected account dashboard routes
│   ├── products/         # Dynamic product listing and detail routes
│   ├── checkout/         # Secure checkout flow
│   └── ...
├── components/           # Reusable UI components
├── lib/                  # Utilities, database, and auth helpers
├── models/               # Mongoose database schemas
├── store/                # Zustand global state management
└── public/               # Static assets
```

## 🔐 Authentication Flow

**Register** ➡️ **Password Hashing** ➡️ **Login** ➡️ **JWT Generation** ➡️ **HTTP-only Cookie** ➡️ **Protected Routes**

## 🛍️ User Flow

**Browse Products** ➡️ **Product Details** ➡️ **Add To Cart** ➡️ **Checkout** ➡️ **Create Order** ➡️ **View Orders**

## 🚀 Installation Guide

### Requirements
- **Node.js** (v18 or higher)
- **MongoDB Atlas** (or a local MongoDB instance)

### Commands

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MuneebxNick/shopease-ecommerce.git
   cd shopease-ecommerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory and add your keys (see below).

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   *The application will be available at [http://localhost:3000](http://localhost:3000)*

## 🔑 Environment Variables

Create a `.env.local` file in the root of your project with the following structure. **Never expose your real values in version control.**

```env
# Database connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shopease

# Secret key for signing JWT tokens (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Base URL of the application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🗺️ Roadmap (Future Improvements)

- [ ] **Admin Dashboard**: Secure panel for managing the store.
- [ ] **Product Management**: CRUD operations for inventory.
- [ ] **Inventory Management**: Real-time stock tracking and alerts.
- [ ] **Payment Gateway**: Integration with Stripe or PayPal for real transactions.

## 👨‍💻 Developer

**Built by Muneeb**
*Full Stack Developer*

## 📜 License

MIT License - See the [LICENSE](LICENSE) file for details.
