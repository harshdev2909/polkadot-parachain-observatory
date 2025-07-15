# 🛰️ Polkadot Parachain Observatory (PPO)

A real-time cross-chain monitoring and debugging platform purpose-built for the Polkadot ecosystem.

PPO empowers parachain developers, infrastructure providers, and cross-chain dApp builders with deep observability into runtime states, XCM message flows, and ecosystem-wide health — all from a single interface.

---

## 🔍 Key Features

### 🧠 Runtime State Intelligence
- Live visualization of parachain runtime state
- Pallet-level metrics: block time, event logs, storage mutations
- Interactive dependency graphs (coming soon)

### 🔗 Cross-Chain XCM Tracing
- End-to-end message flow tracking across parachains
- Hop-by-hop execution details and error points
- Visual trace map with latency and status info

### 📈 Ecosystem Health Dashboard
- Live stats on parachain activity and performance
- Cross-chain heatmaps and network insights
- Alert feed for anomalies and bottlenecks

### 🧰 Developer SDK
- Lightweight Rust SDK for custom telemetry from pallets
- Easy integration into existing Substrate runtimes
- Emits state diffs, performance signals, and XCM metadata

---

## 🧱 Tech Stack

| Layer            | Technology                          |
|------------------|--------------------------------------|
| Frontend         | React (Next.js), TailwindCSS         |
| Backend          | Rust (Axum), WebSocket APIs          |
| Data Pipeline    | Kafka (simulated), TimescaleDB       |
| SDK              | Rust macros for Substrate pallets    |
| ML (Planned)     | Python anomaly detection modules     |
| Deployment       | Docker, Kubernetes-ready             |

---

---

## 🚀 Getting Started

1. **Install Dependencies:**

```bash
pnpm install       # inside /dashboard
cargo build        # inside /backend and /sdk
```

2. **Run Frontend:**
```bash
cd dashboard
pnpm dev
```

3. **Run Backend (Mock APIs):**
```bash
cd backend
cargo run
```

---

## 🌐 Live Demo

Demo: https://polkadot-parachain-observatory.vercel.app/
Repo: https://github.com/harshdev2909/polkadot-parachain-observatory
stepous-labs: https://stepous-labs.vercel.app

⸻

## 📜 License

MIT © Stepous Labs

⸻

## 🧠 Built With ❤️ by Stepous Labs

We build powerful developer tools for open, sovereign networks.

---

