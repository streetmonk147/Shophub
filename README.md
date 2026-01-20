# ShopHub - Modern E-Commerce Website

A cutting-edge, full-stack e-commerce application built with Next.js 16, showcasing modern web development practices and the latest features.

## 🚀 Features

### Frontend
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Product Catalog**: Browse products with advanced filtering and search
- **Product Details**: Rich product pages with image galleries
- **Shopping Cart**: Full cart functionality with quantity management
- **Checkout Flow**: Multi-step checkout with shipping and payment options
- **User Authentication**: Secure login and registration
- **Order Management**: View order history and track orders
- **Responsive Design**: Mobile-first approach, works on all devices

### Backend (100% Next.js)
- **API Routes**: RESTful API endpoints for all operations
- **Server Actions**: Modern server-side mutations
- **Authentication**: Session-based auth with secure cookies
- **Cart Management**: Cookie-based cart persistence
- **Order Processing**: Complete order creation and management
- **Data Layer**: In-memory data store (easily replaceable with a database)

### Modern Tech Stack
- **Next.js 16**: Latest App Router with React Server Components
- **TypeScript**: Full type safety throughout
- **Tailwind CSS 4**: Modern utility-first styling
- **Server Components**: Optimal performance with server-side rendering
- **Image Optimization**: Next.js Image component with Unsplash integration

## 📁 Project Structure

```
e-commerce/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── cart/          # Cart management
│   │   ├── orders/         # Order processing
│   │   └── products/      # Product data
│   ├── (shop)/            # Shop routes
│   │   ├── products/      # Product listing & details
│   │   ├── cart/          # Shopping cart
│   │   └── checkout/      # Checkout flow
│   ├── (account)/         # Account routes
│   │   ├── login/         # Login page
│   │   ├── register/      # Registration
│   │   ├── profile/       # User profile
│   │   └── orders/        # Order history
│   ├── (content)/         # Content pages
│   │   ├── about/         # About page
│   │   └── contact/       # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── product/          # Product-related components
│   └── auth/             # Authentication components
├── lib/                   # Utilities and data
│   ├── types.ts          # TypeScript types
│   ├── products.ts      # Product data & functions
│   ├── auth.ts           # Authentication utilities
│   ├── cart.ts           # Cart management
│   ├── orders.ts         # Order management
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/streetmonk147/Shophub.git
cd Shophub
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design Highlights

- **Modern Color System**: Custom theme with light/dark mode support
- **Smooth Animations**: Transitions and hover effects
- **Accessible**: Semantic HTML and ARIA attributes
- **Performance Optimized**: Image optimization, code splitting, SSR/SSG

## 📦 Product Catalog

The site includes 16 products across 4 categories:
- **Electronics**: Headphones, smartwatches, TVs, laptops
- **Fashion**: Jackets, shoes, handbags, clothing
- **Home & Living**: Furniture, dinnerware, lighting, decor
- **Sports & Outdoors**: Yoga mats, running shoes, camping gear, fitness equipment

All products use high-quality placeholder images from Unsplash.

## 🔐 Authentication

- **Registration**: Create account with name, email, and password
- **Login**: Secure authentication with session management
- **Session**: HTTP-only cookies for security
- **Protected Routes**: Automatic redirects for unauthenticated users

## 🛒 Shopping Features

- **Add to Cart**: Quick add from product cards or detail pages
- **Cart Management**: Update quantities, remove items
- **Checkout**: Multi-step process with shipping and payment
- **Order Creation**: Complete order processing with status tracking
- **Order History**: View all past orders with details

## 🔧 Customization

### Adding a Real Database

The current implementation uses in-memory storage. To add a database:

1. Install your preferred database client (e.g., Prisma, Mongoose)
2. Replace functions in `lib/products.ts`, `lib/auth.ts`, `lib/orders.ts`
3. Update API routes to use database queries

### Adding Payment Processing

1. Integrate a payment provider (Stripe, PayPal, etc.)
2. Update `app/checkout/page.tsx` to handle real payments
3. Add webhook handlers in `app/api/webhooks/`

### Environment Variables

Create a `.env.local` file:
```
SESSION_SECRET=your-secret-key-here
NODE_ENV=production
```

## 📝 Notes

- **Data Persistence**: Currently uses in-memory storage. Data resets on server restart.
- **Payment Processing**: Checkout is simulated. No real payments are processed.
- **Image Sources**: Uses Unsplash for placeholder images. Configure `next.config.ts` for additional domains.

## 🚀 Deployment

This app can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)

---

**Built with ❤️ to showcase modern Next.js e-commerce development**
