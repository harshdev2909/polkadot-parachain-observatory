# Polkadot Parachain Observatory (PPO)

## Overview
PPO is an open-source observability platform for Polkadot parachains. It consists of a Rust backend, a Substrate-compatible telemetry SDK, and a Next.js dashboard.

## Folder Structure
- dashboard/: Frontend dashboard (Next.js + Tailwind)
- backend/: Rust backend service (Axum)
- sdk/: Rust SDK for parachain telemetry
- docs/: Documentation and architecture

## Component Responsibilities
- **dashboard/**: Visualizes runtime state, XCM traces, and live telemetry.
- **backend/**: Receives telemetry, simulates XCM events, provides REST/WebSocket APIs.
- **sdk/**: Library for parachains to emit telemetry and XCM logs.

## Future Plan: ML-based Anomaly Detection
- Integrate anomaly detection models in backend for real-time alerts.
- SDK will support emitting features for ML.

## Contribution
Open to PRs and issues. See each folder for more details.

