# 🚚 TraceAid - Blockchain Supply Chain Tracking

**Transparent, Immutable Supply Chain Management for Humanitarian Aid**

TraceAid is a blockchain-based shipment tracking system that provides end-to-end transparency for supply chains. Built on Ethereum, it enables organizations, field workers, and the public to track shipments with complete accountability and real-time verification.

## ✨ Features

- 🏢 **Organization Dashboard** - Create and manage shipments
- 📍 **Field Worker Interface** - Add checkpoints and mark deliveries
- 🔍 **Public Tracking** - Transparent shipment verification (no wallet required)
- 🔐 **Role-Based Access Control** - Secure, permission-based operations
- ⚡ **Real-Time Updates** - Live blockchain data synchronization
- 🎨 **Modern UI** - Glass morphism design with smooth animations

## 🏗 Project Structure

```
TraceAid/
├── packages/
│   ├── hardhat/              # Smart contract development
│   │   ├── contracts/        # Solidity contracts
│   │   │   └── ShipmentTracker.sol
│   │   ├── deploy/          # Contract deployment scripts
│   │   └── test/            # Contract tests
│   └── nextjs/              # Frontend application
│       ├── app/
│       │   ├── (roles)/     # Role-based pages
│       │   │   ├── org/     # Organization interface
│       │   │   ├── field/   # Field worker interface
│       │   │   └── public/  # Public tracking
│       │   └── debug/       # Contract debugging
│       ├── contexts/        # React contexts
│       └── hooks/          # Custom Web3 hooks
├── docs/
│   ├── DEMO.md             # Complete demo instructions
│   └── CLAUDE.md           # Development guidelines
└── README.md               # This file
```

## 🚀 Quick Test (2 Minutes)

**Prerequisites**: Node.js (≥20.18.3), Yarn, Git, MetaMask

```bash
# 1. Install dependencies
yarn install

# 2. Start local blockchain (Terminal 1)
yarn chain

# 3. Deploy contracts (Terminal 2)
yarn deploy

# 4. Start frontend (Terminal 3)
yarn start
```

### Demo Flow

1. **Visit**: `http://localhost:3000`

2. **Organization Role** (Create Shipment):

   - Connect MetaMask with: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
   - Go to `/org/create`
   - Create shipment: "Emergency Supplies" from "KL" to "Sabah"

3. **Field Worker Role** (Update Status):

   - Switch MetaMask to: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
   - Go to `/field/checkpoint` → Add checkpoint "Warehouse A"
   - Go to `/field/delivery` → Mark delivered at "Village Center"

4. **Public Tracking** (Verify):
   - Visit `/public/track/1` (no wallet needed)
   - See complete transparent shipment history

> **Note**: Use Hardhat accounts #1 (ORG) and #2 (FIELD) for role-based testing. Complete demo instructions in [`docs/DEMO.md`](docs/DEMO.md).

## 🛠 Tech Stack

- **Blockchain**: Ethereum, Hardhat, Solidity
- **Frontend**: Next.js 15, React 19, TypeScript
- **Web3**: Wagmi, Viem, RainbowKit
- **UI**: Tailwind CSS, DaisyUI, Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📖 Development

```bash
# Testing
yarn test                    # Run smart contract tests
yarn lint                   # Lint all packages
yarn format                 # Format code

# Type Checking
yarn next:check-types       # Frontend TypeScript
yarn hardhat:check-types    # Contracts TypeScript

# Deployment
yarn vercel                 # Deploy to Vercel
yarn ipfs                   # Deploy to IPFS
```

**Key URLs**:

- Frontend: `http://localhost:3000`
- Debug Contracts: `http://localhost:3000/debug`
- Block Explorer: `http://localhost:3000/blockexplorer`

## 🎯 Core Concept

**Supply Chain Transparency through Blockchain**

1. **Immutable Records** - All shipment data stored permanently on-chain
2. **Role-Based Security** - Only authorized parties can update shipment status
3. **Public Verification** - Anyone can verify the complete audit trail
4. **Real-Time Tracking** - Status updates immediately visible to all stakeholders

## 📋 Smart Contract Functions

- `createShipment()` - Organization creates new shipment
- `addCheckpoint()` - Field worker adds location update
- `markDelivered()` - Field worker finalizes delivery
- `getShipment()` - Public reads shipment details
- `getCheckpoints()` - Public reads full tracking history

## 🤝 Contributing

Built on [Scaffold-ETH 2](https://scaffoldeth.io) framework. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for development guidelines.

---

**TraceAid** - Bringing transparency and accountability to humanitarian supply chains through blockchain technology.
