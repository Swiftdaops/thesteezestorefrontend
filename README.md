# 🌟 The Steeze Store — Fashion E-Commerce Frontend

> A modern, conversion-focused clothing store frontend built with **Next.js**, **Tailwind CSS**, and a signature **3-Click WhatsApp Checkout** flow.

![Project Banner](https://placehold.co/1200x400/101010/FFFFFF?text=The+Steeze+Store) 
*(Replace this link with a screenshot of your actual homepage)*

---

## 🎯 Overview

**The Steeze Store** is a design-forward, high-performance e-commerce frontend created specifically for modern clothing and fashion brands. It delivers a fast, stylish, and **frictionless online shopping experience** focused on maximizing conversions.

This repository contains the complete frontend implementation, built using modern React tooling and a scalable design system, ready to be connected to any custom backend API.

---

## ✨ Core Features

| Feature | Description | Key Tech |
| :--- | :--- | :--- |
| **🛍️ Beautiful Shopping Experience** | High-quality product displays, SwiperJS carousels, Dark/Light mode, and smooth Framer Motion transitions. | `SwiperJS` `Framer Motion` |
| **📲 3-Click WhatsApp Checkout** | Our signature flow. Customers click "Order", and WhatsApp opens with a pre-filled message. No long forms. | `WhatsApp API` |
| **⚡ Admin-Friendly Architecture** | Clean inventory management UI designed for seamless integration with backend order logging. | `Next.js` `ShadCN UI` |

### 🚀 **The "3-Click" Flow**

This approach removes friction, increases trust, and mirrors how buyers already shop with fashion vendors.

1.  Customer **selects a product** (Size, Color).
2.  Customer clicks **"Order on WhatsApp."**
3.  WhatsApp launches with a **pre-filled message**:
    > *"Hello! I want to order: Vintage Tee (Size M) - $45. Order ID: #12345"*

---

## 💻 Technology Stack

Built with a focus on speed, maintainability, and Developer Experience (DX).

### Frontend
- **Next.js (App Router):** Server-side rendering and routing.
- **React (JSX Only):** Component-based UI.
- **Tailwind CSS:** Utility-first styling.
- **ShadCN UI:** Accessible, re-usable components.
- **Zustand:** Lightweight state management.
- **Zod:** Schema validation.

### Integrations
- **Cloudinary:** Optimized image delivery.
- **WhatsApp API:** Instant checkout mechanism.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YourUsername/steeze-store-frontend.git](https://github.com/YourUsername/steeze-store-frontend.git)
    cd steeze-store-frontend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_SITE_NAME="The Steeze Store"
    NEXT_PUBLIC_WHATSAPP_NUMBER="1234567890" # Your business number (No + symbol)
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit [http://localhost:3000](http://localhost:3000).

---

## 🤝 Contribution

Contributions are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
