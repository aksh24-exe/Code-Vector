# CodeVector — Product Browsing API

A product listing app with offset pagination, category filter, name search, and a React UI. Built for ~200,000 products.

---

## Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + TypeScript + Express |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Validation | Zod |
| Frontend | React + TanStack Query + Tailwind |

---

## Quick Start

```bash
cd Codevector

# Backend
cp backend/.env.example backend/.env
# Set DATABASE_URL in backend/.env (local Postgres or Neon)

cd backend
npm install
npm run db:push
npm run db:seed
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173  
API: http://localhost:3000/api/products

---

## API

### GET /api/products

List products (newest first) with optional filters and pagination.

| Param | Type | Default | Description |
|---|---|---|---|
| `limit` | number | 20 | Items per page (1–100) |
| `offset` | number | 0 | Rows to skip |
| `category` | string | — | Filter by category |
| `search` | string | — | Partial name match (case-insensitive) |

**Examples:**

```
GET /api/products
GET /api/products?limit=20&offset=0
GET /api/products?limit=20&offset=20
GET /api/products?category=Electronics
GET /api/products?search=Controller
GET /api/products?search=Premium&category=Books&limit=10&offset=0
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Premium Controller 140721",
      "category": "Electronics",
      "price": "299.99",
      "createdAt": "2026-06-15T10:30:00.000Z",
      "updatedAt": "2026-06-15T10:30:00.000Z"
    }
  ],
  "offset": 0,
  "limit": 20,
  "hasMore": true
}
```

Use `offset + limit` for the next page when `hasMore` is `true`.

### POST /api/products

Create a product.

```json
{
  "name": "My Product",
  "category": "Electronics",
  "price": 49.99
}
```

### GET /health

Health check.

---

## Pagination

This project uses **offset pagination**:

```sql
SELECT * FROM products
ORDER BY created_at DESC, id DESC
LIMIT 20 OFFSET 0;
```

Next page: `OFFSET 20`, then `OFFSET 40`, etc.

The API fetches `limit + 1` rows to set `hasMore` without a separate count query.

---

## Search

Search by product name with the `search` query param:

```
GET /api/products?search=Controller
```

Uses SQL `ILIKE` for partial matching — no need to remember product UUIDs.

---

## Database setup

```bash
cd backend
npm run db:push    # create tables (drizzle-kit push:pg)
npm run db:seed    # insert 200,000 sample products
```

Seed uses batch inserts (1,000 rows per query) instead of inserting one row at a time.

---

## Project structure

```
Codevector/
├── backend/
│   ├── src/
│   │   ├── config/          # db + env
│   │   ├── drizzle/         # schema + seed
│   │   ├── middleware/      # validate, errors
│   │   └── modules/product/
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       ├── dto/
│   │       ├── validation/
│   │       ├── mapper/
│   │       └── routes/
│   ├── drizzle.config.ts
│   └── package.json
└── frontend/
    └── src/
        ├── components/      # UI + CreateProductForm + SearchInput
        ├── hooks/           # useProducts
        ├── lib/             # api client
        └── pages/           # ProductsPage
```

---

## What I chose and why

- **Offset pagination** — simple to build and easy to explain; good fit for a take-home task
- **PostgreSQL + Drizzle** — typed queries and easy schema management
- **Layered backend** — routes → controller → service → repository keeps code organized
- **Search on list endpoint** — users find products by name instead of UUID
- **Batch seed script** — fast way to load 200k rows for testing

