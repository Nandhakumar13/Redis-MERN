# 🚀 MERN + Redis — Scalable Application & Redis Implementation

A full-stack **MERN Stack application integrated with Redis** to demonstrate practical, production-oriented Redis use cases including **caching, cache invalidation, rate limiting, TTL-based temporary storage, session management, distributed locking, Redis data structures, background jobs, Pub/Sub, and performance optimization**.

This project is designed as a hands-on **Redis learning, implementation, and interview-preparation project**, while following patterns applicable to real-world MERN applications.

---

## 📌 Table of Contents

* [Project Overview](#-project-overview)
* [Objectives](#-objectives)
* [Architecture](#-architecture)
* [Technology Stack](#-technology-stack)
* [Project Structure](#-project-structure)
* [Redis Features](#-redis-features)
* [Implementation Roadmap](#-implementation-roadmap)
* [API Documentation](#-api-documentation)
* [Environment Variables](#-environment-variables)
* [Installation](#-installation)
* [Running the Application](#-running-the-application)
* [Testing](#-testing)
* [Performance Testing](#-performance-testing)
* [Monitoring](#-monitoring)
* [Redis Concepts Covered](#-redis-concepts-covered)
* [Implementation Checklist](#-implementation-checklist)
* [Interview Preparation](#-interview-preparation)
* [Future Enhancements](#-future-enhancements)
* [License](#-license)

---

# 📌 Project Overview

This project is a **MERN Stack application with Redis as an additional infrastructure layer**.

The application uses:

* **MongoDB** for persistent application data.
* **Redis** for high-speed temporary data, caching, counters, shared state, coordination, messaging, and background job infrastructure.
* **Node.js + Express.js** for the backend API.
* **React.js** for the frontend.

Redis is not intended to replace MongoDB. Each technology is used according to its strengths.

```text
                         ┌───────────────────┐
                         │      React        │
                         │     Frontend      │
                         └─────────┬─────────┘
                                   │
                              HTTP / REST
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Node.js + Express │
                         │      Backend      │
                         └─────────┬─────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
              ┌───────────┐  ┌────────────┐  ┌────────────┐
              │   Redis   │  │  MongoDB   │  │   Worker   │
              │           │  │            │  │            │
              │ Cache     │  │ Persistent │  │ BullMQ     │
              │ Rate Limit│  │ Data       │  │ Jobs       │
              │ Sessions  │  │            │  │ Processing │
              │ OTP       │  │            │  │            │
              │ Locks     │  │            │  │            │
              │ Pub/Sub   │  │            │  │            │
              └───────────┘  └────────────┘  └────────────┘
```

---

# 🎯 Objectives

The primary objective of this project is to gain **practical knowledge of Redis and its integration with a MERN application**.

### Core Objectives

* Understand Redis fundamentals.
* Understand Redis data structures.
* Integrate Redis with Node.js.
* Implement API response caching.
* Implement cache invalidation.
* Understand TTL and key expiration.
* Implement Redis-based rate limiting.
* Implement temporary data storage.
* Implement session management.
* Handle concurrent operations using distributed locks.
* Implement Redis Pub/Sub.
* Implement background jobs using BullMQ.
* Understand Redis performance and reliability.
* Understand horizontal application scaling.
* Measure the impact of Redis on application performance.

---

# 🏗️ Architecture

## High-Level Architecture

```text
                       ┌─────────────────┐
                       │   React Client  │
                       └────────┬────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  Express API    │
                       │  Node.js        │
                       └────────┬────────┘
                                │
                ┌───────────────┼────────────────┐
                │               │                │
                ▼               ▼                ▼
          ┌───────────┐   ┌───────────┐   ┌─────────────┐
          │   Redis   │   │  MongoDB  │   │   BullMQ    │
          │           │   │           │   │             │
          │ Cache     │   │ Users     │   │ Queue       │
          │ Rate Limit│   │ Products  │   │ Jobs        │
          │ Sessions  │   │ Orders    │   │ Retries     │
          │ OTP       │   │ Inventory │   │ Delayed Jobs│
          │ Locks     │   │           │   │             │
          │ Pub/Sub   │   │           │   │             │
          └───────────┘   └───────────┘   └──────┬──────┘
                                                 │
                                                 ▼
                                          ┌─────────────┐
                                          │   Worker    │
                                          └─────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React.js
* React Router
* Axios
* JavaScript / TypeScript
* Redux Toolkit / Context API

## Backend

* Node.js
* Express.js
* REST APIs
* Authentication & Authorization
* Middleware architecture

## Database

* MongoDB
* Mongoose

## Redis

* Redis
* Node.js Redis client
* Redis data structures
* Redis TTL
* Redis Pub/Sub

## Background Processing

* BullMQ
* Redis
* Node.js Workers

## Development & DevOps

* Docker
* Docker Compose
* Git
* GitHub
* Postman
* Jest / Vitest

---

# 📁 Project Structure

```text
mern-redis-project/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── redis.js
│   │   │
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── validators/
│   │   │
│   │   ├── cache/
│   │   │   ├── cacheKeys.js
│   │   │   ├── cacheService.js
│   │   │   └── cacheMiddleware.js
│   │   │
│   │   ├── rateLimiter/
│   │   ├── sessions/
│   │   ├── locks/
│   │   ├── queues/
│   │   ├── workers/
│   │   ├── pubsub/
│   │   └── utils/
│   │
│   └── package.json
│
├── docker/
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 🔴 Redis Features

The project will demonstrate Redis through multiple real-world use cases.

| Redis Feature      | Use Case                 |
| ------------------ | ------------------------ |
| Strings            | Cache, OTP, counters     |
| Hashes             | Session and metadata     |
| Lists              | Recently viewed products |
| Sets               | Unique values            |
| Sorted Sets        | Leaderboards             |
| TTL                | Temporary data           |
| Caching            | API response caching     |
| Cache Invalidation | Data consistency         |
| Rate Limiting      | API protection           |
| Sessions           | Shared session state     |
| Distributed Lock   | Inventory reservation    |
| Pub/Sub            | Real-time events         |
| Queues             | Background processing    |
| Workers            | Asynchronous tasks       |

---

# 🚀 Implementation Roadmap

## Phase 1 — MERN Application Setup

Build the basic application before introducing Redis.

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API architecture

### Frontend

* React.js
* Routing
* API integration
* Basic UI

### Initial Modules

* Authentication
* Users
* Products
* Orders
* Inventory

---

# Phase 2 — Redis Fundamentals

## Redis Setup

Run Redis locally using Docker:

```bash
docker run --name redis \
  -p 6379:6379 \
  -d redis
```

Verify the connection:

```bash
redis-cli ping
```

Expected response:

```text
PONG
```

---

## Node.js Redis Integration

Create a dedicated Redis configuration:

```text
server/src/config/redis.js
```

Responsibilities:

* Create Redis client.
* Establish connection.
* Handle connection errors.
* Reuse the Redis connection.
* Gracefully close the connection.

---

## Redis Data Types

Explore and implement:

### Strings

```text
SET key value
GET key
```

Use cases:

* API cache
* OTP
* Counters

### Hashes

```text
HSET user:1 name Nandy role developer
HGETALL user:1
```

Use cases:

* Sessions
* User metadata

### Lists

```text
LPUSH recent-products 101
LRANGE recent-products 0 -1
```

Use cases:

* Recently viewed products
* Recent activities

### Sets

```text
SADD categories electronics
SMEMBERS categories
```

Use cases:

* Unique values
* Tags
* Categories

### Sorted Sets

```text
ZADD leaderboard 100 user1
ZADD leaderboard 200 user2
```

Use cases:

* Leaderboards
* Rankings

---

# Phase 3 — API Response Caching

Implement caching for frequently accessed APIs.

Example:

```text
GET /api/products
        │
        ▼
   Check Redis
        │
   ┌────┴────┐
   │         │
  HIT       MISS
   │         │
   ▼         ▼
 Redis     MongoDB
   │         │
   │         ▼
   │      Store Redis
   │         │
   └────┬────┘
        ▼
     Response
```

### Concepts

* Cache hit
* Cache miss
* Cache-aside pattern
* Cache keys
* TTL
* Serialization

---

# Phase 4 — Cache Invalidation

Whenever MongoDB data changes, invalidate the related Redis cache.

```text
PUT /products/:id
        │
        ▼
   MongoDB Update
        │
        ▼
 Redis Cache Invalidation
        │
        ▼
     Response
```

Example:

```js
await Product.findByIdAndUpdate(id, update);

await redis.del("products");
```

### Concepts

* Stale data
* Cache consistency
* Explicit invalidation
* TTL-based expiration

---

# Phase 5 — Rate Limiting

Implement Redis-based API rate limiting.

Example:

```text
5 requests / minute / IP
```

Flow:

```text
Request
   │
   ▼
Redis Counter
   │
   ├── Within Limit ──► Allow
   │
   └── Exceeded ──────► HTTP 429
```

Redis operations:

```text
INCR
EXPIRE
```

### Concepts

* Request counters
* Fixed-window rate limiting
* IP-based limiting
* User-based limiting
* Distributed rate limiting
* HTTP 429

---

# Phase 6 — TTL & Temporary Data

## OTP Management

Store OTPs temporarily in Redis.

```text
otp:user:123
      │
      ▼
   482913
      │
      ▼
    TTL: 5m
```

Use cases:

* Email verification
* Password reset
* Login verification
* Temporary tokens

### Concepts

* TTL
* Expiration
* Temporary storage
* Automatic cleanup

---

# Phase 7 — Session Management

Implement centralized session storage using Redis.

```text
             Load Balancer
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
     Node #1   Node #2   Node #3
        │         │         │
        └─────────┼─────────┘
                  ▼
                Redis
                  │
                  ▼
               Sessions
```

The objective is to understand how shared Redis state supports multiple backend instances.

---

# Phase 8 — Distributed Locking

Implement a distributed locking mechanism for concurrent operations.

### Example: Inventory Reservation

```text
Available Stock = 1

User A ───────┐
              ├──► Redis Lock
User B ───────┘
```

Expected behavior:

```text
User A → Acquires lock → Updates inventory
User B → Lock unavailable → Retry / reject
```

### Use Cases

* Inventory updates
* Ticket booking
* Seat reservation
* Order processing

### Concepts

* Race conditions
* Distributed locking
* Mutual exclusion
* Lock expiration
* Concurrent requests

---

# Phase 9 — Redis Data Structure Use Cases

## Recently Viewed Products

Use Redis Lists:

```text
user:123:recent-products
```

Example:

```text
[101, 205, 304, 402, 501]
```

Maintain only the most recent N products.

---

## Leaderboard

Use Redis Sorted Sets:

```text
User       Score
----------------
user1      1500
user2      1200
user3       900
```

Explore:

```text
ZADD
ZINCRBY
ZRANGE
ZREVRANGE
ZSCORE
```

---

# Phase 10 — Background Jobs

## BullMQ

Use BullMQ with Redis for asynchronous background processing.

```text
API Request
    │
    ▼
Create Order
    │
    ▼
Add Job
    │
    ▼
Redis / BullMQ
    │
    ▼
Worker
    │
    ▼
Send Email
```

Potential jobs:

* Welcome email
* Order confirmation
* Password reset
* Notifications
* Report generation

### Concepts

* Producer
* Queue
* Worker
* Job
* Retry
* Failed jobs
* Delayed jobs

---

# Phase 11 — Redis Pub/Sub

Implement real-time communication between backend processes.

```text
Order Created
     │
     ▼
Redis Publish
     │
     ▼
Subscriber
     │
     ▼
Socket.IO
     │
     ▼
React Client
```

Possible events:

```text
order.created
order.updated
inventory.updated
notification.created
```

---

# Phase 12 — Performance & Reliability

## Cache Stampede

Study what happens when a popular cache entry expires and many requests simultaneously query MongoDB.

```text
Cache expires
     │
     ├── Request 1 ──► MongoDB
     ├── Request 2 ──► MongoDB
     ├── Request 3 ──► MongoDB
     └── Request N ──► MongoDB
```

Explore:

* Distributed locking
* Request coalescing
* TTL jitter
* Background refresh

---

## Cache Penetration

Handle repeated requests for resources that don't exist.

```text
GET /products/invalid-id
        │
        ▼
      Redis MISS
        │
        ▼
    MongoDB MISS
```

Explore:

* Input validation
* Negative caching
* Bloom filters

---

## Redis Eviction

Study:

* Maximum memory
* LRU
* LFU
* TTL-based eviction
* Eviction policies

---

# Phase 13 — Horizontal Scaling

Run multiple Node.js instances.

```text
                  Load Balancer
                       │
           ┌───────────┼───────────┐
           ▼           ▼           ▼
        Node #1     Node #2     Node #3
           │           │           │
           └───────────┼───────────┘
                       ▼
                     Redis
                       │
                       ▼
                    MongoDB
```

Test shared:

* Cache
* Rate limits
* Sessions
* Distributed locks

---

# Phase 14 — Dockerization

Containerize the development environment.

```yaml
services:
  frontend:
  backend:
  mongodb:
  redis:
  worker:
```

Start the stack:

```bash
docker compose up --build
```

Stop the stack:

```bash
docker compose down
```

---

# 📡 API Documentation

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/verify-otp
```

## Products

```http
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Orders

```http
POST /api/orders
GET  /api/orders
GET  /api/orders/:id
```

## Redis Features

```http
GET    /api/cache/products
DELETE /api/cache/products

GET    /api/users/:id/recent-products

GET    /api/leaderboard

POST   /api/otp/send
POST   /api/otp/verify
```

---

# 🔐 Environment Variables

Create a `.env` file based on `.env.example`.

```env
NODE_ENV=development

PORT=5000

MONGO_URI=mongodb://localhost:27017/mern-redis

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=
REDIS_PASSWORD=

JWT_SECRET=your-secret
```

> Never commit real credentials or secrets to the repository.

---

# ⚙️ Installation

## Prerequisites

Install:

* Node.js
* npm
* MongoDB
* Redis
* Docker
* Git

## Clone

```bash
git clone <repository-url>

cd mern-redis-project
```

## Install Backend Dependencies

```bash
cd server
npm install
```

## Install Frontend Dependencies

```bash
cd client
npm install
```

---

# ▶️ Running the Application

## Backend

```bash
cd server
npm run dev
```

## Frontend

```bash
cd client
npm run dev
```

## Worker

```bash
cd server
npm run worker
```

## Docker

```bash
docker compose up --build
```

---

# 🧪 Testing

Testing should cover both normal application functionality and Redis-specific behavior.

### Unit Tests

* Cache service
* Rate limiter
* Redis utilities
* Controllers
* Services
* Validation

### Integration Tests

* Node.js ↔ Redis
* Node.js ↔ MongoDB
* Cache behavior
* Rate limiting
* OTP expiration
* Queue processing

### Important Scenarios

```text
✓ Cache HIT
✓ Cache MISS
✓ Cache expiration
✓ Cache invalidation
✓ Rate limit exceeded
✓ OTP expiration
✓ Concurrent inventory requests
✓ Queue retry
✓ Failed jobs
✓ Redis unavailable
```

---

# 📊 Performance Testing

Compare application performance with and without Redis.

### Without Redis Cache

```text
React
  ↓
Node.js
  ↓
MongoDB
  ↓
Response
```

### With Redis Cache

```text
React
  ↓
Node.js
  ↓
Redis
  ↓
Cached Response
```

Measure:

* Average response time
* P95 latency
* P99 latency
* Requests per second
* MongoDB query frequency
* Cache hit ratio

The objective is to measure the actual impact of Redis rather than assuming caching improves every API.

---

# 📈 Monitoring

Monitor:

* Redis memory usage
* Number of keys
* Cache hits
* Cache misses
* Cache hit ratio
* Command latency
* Connected clients
* Expired keys
* Evicted keys
* Queue length
* Failed jobs

Potential monitoring tools:

* Prometheus
* Grafana
* Application Performance Monitoring

---

# 📋 Implementation Checklist

## MERN Foundation

* [ ] React application
* [ ] Node.js application
* [ ] Express API
* [ ] MongoDB connection
* [ ] Authentication
* [ ] Product APIs
* [ ] Order APIs

## Redis Fundamentals

* [ ] Redis installation
* [ ] Node.js Redis connection
* [ ] Strings
* [ ] Hashes
* [ ] Lists
* [ ] Sets
* [ ] Sorted Sets
* [ ] TTL

## Caching

* [ ] API caching
* [ ] Cache hit/miss
* [ ] Cache-aside pattern
* [ ] Cache invalidation
* [ ] Cache TTL

## Rate Limiting

* [ ] Redis counter
* [ ] IP-based rate limiting
* [ ] User-based rate limiting
* [ ] HTTP 429 handling

## Temporary Data

* [ ] OTP generation
* [ ] OTP verification
* [ ] OTP expiration
* [ ] Password reset token

## Sessions

* [ ] Redis session storage
* [ ] Session expiration
* [ ] Multiple Node instances

## Distributed Systems

* [ ] Distributed lock
* [ ] Inventory concurrency
* [ ] Race-condition handling

## Redis Data Structures

* [ ] Recently viewed products
* [ ] Redis Sets
* [ ] Leaderboard
* [ ] Sorted Sets

## Background Processing

* [ ] BullMQ
* [ ] Queue
* [ ] Worker
* [ ] Email job
* [ ] Retry mechanism
* [ ] Failed jobs
* [ ] Delayed jobs

## Real-Time

* [ ] Redis Pub/Sub
* [ ] Event publishing
* [ ] Event subscription
* [ ] Socket.IO integration

## Performance

* [ ] Cache stampede
* [ ] Cache penetration
* [ ] Eviction policies
* [ ] Performance benchmarks
* [ ] Cache hit ratio

## Infrastructure

* [ ] Docker
* [ ] Docker Compose
* [ ] Multiple Node instances
* [ ] Redis monitoring
* [ ] Application monitoring

---

# 🧠 Redis Concepts Covered

| Concept            | Project Implementation     |
| ------------------ | -------------------------- |
| Strings            | Cache, OTP, counters       |
| Hashes             | Sessions / metadata        |
| Lists              | Recently viewed products   |
| Sets               | Unique values              |
| Sorted Sets        | Leaderboards               |
| TTL                | Temporary data             |
| Caching            | API response caching       |
| Cache Invalidation | Product mutations          |
| Rate Limiting      | API protection             |
| Sessions           | Shared session state       |
| Distributed Lock   | Inventory reservation      |
| Pub/Sub            | Real-time events           |
| Queues             | Background processing      |
| Workers            | Asynchronous tasks         |
| Retry              | Failed jobs                |
| Delayed Jobs       | Scheduled processing       |
| Cache Stampede     | High-concurrency scenarios |
| Cache Penetration  | Missing data               |
| Eviction           | Memory management          |
| Horizontal Scaling | Multiple Node instances    |

---

# 🎓 Interview Preparation

This project provides practical examples for discussing Redis in MERN and backend interviews.

### Redis Fundamentals

* What is Redis?
* Why is Redis fast?
* What Redis data structures are available?
* When should Redis be used?
* When should Redis not be used?

### Caching

* What is cache-aside?
* What is a cache hit?
* What is a cache miss?
* How does TTL work?
* How do you invalidate a cache?
* How do you handle stale data?
* What is cache stampede?

### Rate Limiting

* Why use Redis for rate limiting?
* How does `INCR` work?
* Why is `EXPIRE` required?
* How does rate limiting work across multiple Node.js instances?

### Distributed Systems

* What is a distributed lock?
* What causes race conditions?
* How can Redis coordinate concurrent operations?
* Why is shared state important when scaling?

### Background Jobs

* Why use a background queue?
* What is a producer?
* What is a worker?
* How does retry work?
* What happens when a job fails?
* What are delayed jobs?

### Architecture

* Why MongoDB + Redis?
* What data belongs in MongoDB?
* What data belongs in Redis?
* What happens if Redis becomes unavailable?
* How would you scale the application?

---

# 🚀 Future Enhancements

Potential future improvements:

* Redis Cluster
* Redis Sentinel
* Advanced rate limiting
* Sliding-window rate limiting
* Distributed tracing
* Prometheus metrics
* Grafana dashboards
* Centralized logging
* API Gateway
* Load Balancer
* Kubernetes deployment
* CI/CD pipeline
* Cloud deployment

---

# 📚 Project Philosophy

> **Don't use Redis just because Redis is available. Use Redis when its characteristics solve a specific application problem.**

MongoDB remains responsible for persistent application data, while Redis is introduced for workloads involving:

* Fast temporary access
* Expiration
* Shared state
* Counters
* Coordination
* Messaging
* Background processing

Every Redis feature should answer two questions:

1. **What problem does Redis solve here?**
2. **What are the trade-offs of introducing Redis?**

---

# 👨‍💻 Author

**Nandy**

MERN Stack Developer

**Technologies:** React.js · Node.js · Express.js · MongoDB · Redis

---

# 📄 License

This project is created for learning, experimentation, technical practice, and interview preparation.

Add an appropriate open-source license if this repository is intended for public distribution.
