# 🛍️ ShopVerse — Full-Stack E-Commerce Application

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> A production-ready full-stack e-commerce web application built with **MongoDB, Express.js, Node.js, and Vanilla JavaScript** — featuring JWT authentication, shopping cart, order management, and an admin dashboard.

---

## ✨ Features

- 🔐 **JWT Authentication** — Register, login, protected routes, role-based access
- 🛍️ **Product Catalog** — Search, filter by category & price, sort, pagination
- ⭐ **Product Reviews** — Star ratings + comments from verified users
- 🛒 **Shopping Cart** — Add, update, remove items (persisted in MongoDB)
- 📦 **Order System** — Checkout with shipping address, payment method, order history
- 👑 **Admin Dashboard** — Full product CRUD, view all orders, update order status
- 📱 **Responsive UI** — Dark-themed, mobile-friendly design

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js v18+ |
| **Framework** | Express.js |
| **Database** | MongoDB + Mongoose ODM |
| **Authentication** | JWT (jsonwebtoken) + bcryptjs |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Middleware** | cors, dotenv, express.json() |

---

## 📁 Project Structure

```
ecommerce/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema + bcrypt pre-save hook
│   │   ├── Product.js         # Product schema with reviews
│   │   ├── Order.js           # Order schema with status tracking
│   │   └── Cart.js            # Per-user cart schema
│   ├── routes/
│   │   ├── auth.js            # Register, login, profile
│   │   ├── products.js        # CRUD + search + filter + reviews
│   │   ├── cart.js            # Add, update, remove, clear
│   │   └── orders.js          # Place order, track, admin update
│   ├── middleware/
│   │   └── auth.js            # JWT protect + admin guard
│   ├── seeder.js              # Seed sample data
│   ├── server.js              # App entry point
│   └── .env                   # Environment variables (not committed)
└── frontend/
    ├── index.html             # Home / shop page
    ├── css/style.css          # Global styles (dark theme)
    ├── js/app.js              # Shared API helper + auth utilities
    └── pages/
        ├── login.html
        ├── register.html
        ├── cart.html
        ├── orders.html
        └── admin.html
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/shopverse.git
cd shopverse
```

**2. Install dependencies**
```bash
cd backend
npm install
```

**3. Create `.env` file** inside `backend/` folder
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=yourSuperSecretKeyHere
NODE_ENV=development
```

**4. Start MongoDB**
```bash
# Windows
net start MongoDB

# Mac / Linux
mongod
```

**5. Seed the database**
```bash
node seeder.js
```

**6. Start the server**
```bash
node server.js
```

**7. Open in browser**
```
http://localhost:5000
```

---

## 🔑 Demo Accounts

| Role | Email | Password | Access |
|------|-------|----------|--------|
| 👑 Admin | admin@shop.com | admin123 | Full access — manage products & all orders |
| 👤 User | john@example.com | john123 | Browse, cart, checkout, own orders |

---

## 📡 API Reference

### 🔐 Auth `/api/auth`

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| `POST` | `/register` | Public | Create new account |
| `POST` | `/login` | Public | Login — returns JWT token |
| `GET` | `/profile` | User | Get logged-in user |
| `PUT` | `/profile` | User | Update profile / password |

### 🛍️ Products `/api/products`

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| `GET` | `/` | Public | All products — supports `?keyword` `?category` `?minPrice` `?maxPrice` `?sort` `?page` `?limit` |
| `GET` | `/featured` | Public | Featured products |
| `GET` | `/categories` | Public | All category names |
| `GET` | `/:id` | Public | Single product |
| `POST` | `/` | Admin | Create product |
| `PUT` | `/:id` | Admin | Update product |
| `DELETE` | `/:id` | Admin | Delete product |
| `POST` | `/:id/reviews` | User | Add review |

### 🛒 Cart `/api/cart`

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| `GET` | `/` | User | Get cart |
| `POST` | `/add` | User | Add item |
| `PUT` | `/update` | User | Update quantity |
| `DELETE` | `/remove/:id` | User | Remove item |
| `DELETE` | `/clear` | User | Empty cart |

### 📦 Orders `/api/orders`

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| `POST` | `/` | User | Place order |
| `GET` | `/myorders` | User | My order history |
| `GET` | `/` | Admin | All orders |
| `GET` | `/:id` | User | Single order |
| `PUT` | `/:id/pay` | User | Mark as paid |
| `PUT` | `/:id/status` | Admin | Update status |

---

## 🗄️ Data Models

```
User     → name, email, password (bcrypt hashed), isAdmin, address
Product  → name, description, price, category, brand, image, stock, reviews[], rating
Order    → user, items[], shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, isPaid, isDelivered, status
Cart     → user (unique), items[{ product, quantity }]
```

---

## 🔐 Auth Flow

```
1. POST /api/auth/login        →  verify password with bcrypt.compare()
2. JWT created                 →  jwt.sign({ id }, SECRET, { expiresIn: '30d' })
3. Token sent to client        →  stored in localStorage
4. Protected request           →  Authorization: Bearer <token>
5. Middleware verifies         →  jwt.verify(token, SECRET)  →  req.user set
6. Admin routes                →  additional check: req.user.isAdmin === true
```

---

## 💰 Price Calculation

```
Items Price  =  sum of (price × quantity)
Tax          =  Items Price × 10%
Shipping     =  $10  (FREE if order > $100)
Total        =  Items + Tax + Shipping
```

---

## 🔮 Roadmap

- [ ] Stripe payment integration
- [ ] Email notifications with Nodemailer
- [ ] Redis caching for products
- [ ] Input validation with Joi
- [ ] Tests with Jest + Supertest
- [ ] Docker containerization
- [ ] Deploy to Railway / Render

---

## 🤝 Contributing

1. Fork the project
2. Create your branch `git checkout -b feature/NewFeature`
3. Commit changes `git commit -m 'Add NewFeature'`
4. Push `git push origin feature/NewFeature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Your Name**
- GitHub:(https://github.com/webbarsuryansh)
- LinkedIn: (https://www.linkedin.com/in/atulya-srivastava-1442b8305/)

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
⭐ Star this repo if you found it helpful!
</div>
