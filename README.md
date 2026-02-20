<div align="center">
# 🌐 GDGoC Frontend Project

Frontend web app yang dibangun sebagai bagian dari Study Case Open Recruitment GDGoC. 
Aplikasi ini berfokus pada pengalaman pengguna yang modern, cepat, dan responsif menggunakan Next.js dan Tailwind CSS.


![Status](https://img.shields.io/badge/status-active-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Vercel](https://img.shields.io/badge/deploy-Vercel-black)
</div>

---

## 📌 Table of Contents
- [🚀 Features](#-features)
- [🧰 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🖥 Demo](#-demo)
- [⚙️ Installation](#-installation)

---


## 🚀 Features

### 🔐 Authentication
- Google OAuth Login  
- Protected Routes  
- Auto redirect based on session

### 🎨 UI & UX
- Mobile-first design  
- Smooth animation  
- Skeleton loading  
- Toast feedback system  
- Reusable UI components

### 🧭 Main Pages
- Home  
- Shop / Listing  
- User Dashboard  
- Detail Page  
- About Page  
- Auth Menu + User Menu

### ⚙️ Extra Features
- Error handling (network error, empty data)  
- Global loading indicator  
- Clean API fetch handler  
- Optimized images via Next/Image  

---
## 🧰 Tech Stack

| Category | Tech |
|---------|------|
| Framework | **Next.js 14+** |
| Styling | **Tailwind CSS** |
| Icons | Lucide / React Icons |
| Auth | Firebase / Google OAuth |
| Deployment | Vercel |
| Package Manager | npm |

---

## 📁 Project Structure

```txt
frontend-gdgoc/
├─ app/
│  ├─ about/
│  │  └─ page.js
│  ├─ blog/
│  │  └─ page.js
│  ├─ contact/
│  │  └─ page.js
│  ├─ hooks/
│  │  └─ useBooks.js
│  ├─ info/
│  │  └─ page.js
│  ├─ login/
│  │  └─ page.js
│  ├─ product/
│  │  └─ page.js
│  └─ shop/
│     ├─ all-product/
│     │  └─ page.js
│     ├─ best-seller/
│     │  └─ page.js
│     └─ categories/
│        └─ page.js
│
├─ globals.css
├─ layout.js
├─ page.js
│
├─ components/
│  ├─ auth/
│  │  └─ AuthButton.js
│  ├─ cards/
│  │  └─ bookCard.js
│  ├─ home/
│  │  └─ bookSection.js
│  ├─ layout/
│  │  ├─ breadcrumb.js
│  │  └─ navbar.js
│  ├─ product/
│  │  ├─ ProductAction.js
│  │  ├─ ProductGallery.js
│  │  ├─ ProductInfo.js
│  │  ├─ ProductPage.js
│  │  ├─ ProductSpecs.js
│  │  ├─ ProductSummary.js
│  │  └─ ProductTag.js
│  └─ search/
│     └─ SearchBooks.js
│
├─ public/
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
│
├─ firebase.js
├─ jsconfig.json
├─ next.config.mjs
├─ package.json
├─ package-lock.json
├─ eslint.config.mjs
├─ postcss.config.mjs
└─ README.md
```


## 🖥 Demo

> frontend-gdgoc.vercel.app

🔗 **Live Demo:** https://frontend-gdgoc.vercel.app  
📦 **Repository:** https://github.com/raharinda/gdgoc-frontend

---


## ⚙️ Installation

### 1️⃣ Clone Project
```bash
git clone https://github.com/yourusername/gdgoc-frontend.git
cd gdgoc-frontend
```
### 2️⃣ Install Dependencies
npm install
# atau
yarn install
# atau
pnpm install

### 3️⃣ Run Development Server
npm run dev
npm start
# akses
(https://frontend-gdgoc.vercel.app/)


