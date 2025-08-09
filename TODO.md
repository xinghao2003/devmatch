# Minimal MVP Development Plan for AidChain

## 🎯 MVP Scope

### Core Features Only

1. **Public**: View and track shipments
2. **Field Workers**: Update shipment checkpoints
3. **Organizations**: Create new shipments
4. **No Admin Features** in MVP

### Simplified Architecture

- Fixed wallet-to-role mapping (no on-chain role management)
- Local development with Hardhat first
- Deploy to Oasis Sapphire testnet after local testing
- Mock IPFS integration (store hashes only)

---

## 📋 Implementation Plan

### Phase 1: Smart Contract Development

#### 1.1 Core Contract: `ShipmentTracker.sol`

**Location**: `packages/hardhat/contracts/ShipmentTracker.sol`

**Minimal Features**:

- Shipment struct (id, description, origin, destination, status, currentCustodian)
- Checkpoint struct (timestamp, location, updatedBy)
- Fixed role mapping using modifier checks
- Core functions:
  - `createShipment()` - org only
  - `addCheckpoint()` - field only
  - `markDelivered()` - field only
  - `getShipment()` - public view
  - `getCheckpoints()` - public view

**Hardcoded Roles**:

```
ORG_WALLET = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8  // Hardhat account #1
FIELD_WALLET = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC // Hardhat account #2
```

#### 1.2 Deployment Strategy

- Use existing Hardhat deploy structure
- Create `01_deploy_shipment_tracker.ts`
- Configure for both localhost and Oasis testnet

---

### Phase 2: Frontend Adaptation

#### 2.1 Simplify Authentication (`contexts/AuthContext.tsx`)

- Remove complex role detection
- Simple wallet address check against hardcoded addresses
- Auto-assign role based on connected wallet

#### 2.2 Public Interface (`app/(roles)/public/`)

**Keep & Adapt**:

- `/public` - Homepage with search
- `/public/track/[id]` - View shipment details
- `/public/browse` - List all shipments

**Changes**:

- Connect to real smart contract data
- Remove mock data
- Implement actual blockchain queries using Scaffold hooks

#### 2.3 Organization Interface (`app/(roles)/org/`)

**Keep Core Only**:

- `/org` - Simple dashboard
- `/org/create` - Create shipment form

**Disable/Mock**:

- Analytics, Reports, Team management
- Just show "Coming Soon" placeholders

#### 2.4 Field Interface (`app/(roles)/field/`)

**Keep Core Only**:

- `/field` - Dashboard showing assigned shipments
- `/field/scan` - Mock QR scanner (manual ID input for MVP)
- `/field/checkpoint` - Add checkpoint form
- `/field/delivery` - Mark as delivered

**Disable**:

- Settings, complex features

#### 2.5 Remove/Disable Admin

- Comment out admin routes
- Remove from navigation

---

### Phase 3: Integration Points

#### 3.1 Smart Contract Hooks

**Create custom hooks in `hooks/scaffold-eth/`**:

- `useShipmentTracker.ts` - Main contract interaction
- `useShipmentData.ts` - Read shipment data
- `useCheckpoints.ts` - Read checkpoint history

#### 3.2 Mock External Services

- **IPFS**: Store hash strings locally, no actual upload
- **QR/NFC**: Manual ID input only
- **GPS**: Use browser geolocation or mock coordinates
- **Media**: Skip photo uploads in MVP

---

### Phase 4: Testing Flow

#### 4.1 Local Testing Sequence

1. Start Hardhat node: `yarn chain`
2. Deploy contracts: `yarn deploy`
3. Start frontend: `yarn start`
4. Test flow:
   - Connect with Org wallet → Create shipment
   - Connect with Field wallet → Add checkpoints
   - Connect with any wallet → Track shipment

#### 4.2 Testnet Deployment Prep

**Configure `hardhat.config.ts`**:

- Add Oasis Sapphire testnet configuration
- Set up test wallets with testnet ROSE
- Update `scaffold.config.ts` for testnet

---

## 🚀 Development Sequence

### Week 1: Smart Contracts

- [ ] Day 1-2: Write ShipmentTracker.sol
- [ ] Day 3: Write deployment script
- [ ] Day 4: Write basic tests
- [ ] Day 5: Local testing & debugging

### Week 2: Frontend Core

- [ ] Day 1: Simplify authentication
- [ ] Day 2-3: Wire up public tracking pages
- [ ] Day 4: Implement org create shipment
- [ ] Day 5: Implement field update features

### Week 3: Integration & Testing

- [ ] Day 1-2: Connect all components
- [ ] Day 3: End-to-end testing locally
- [ ] Day 4: Deploy to Oasis testnet
- [ ] Day 5: Testnet verification

---

## 📦 Deliverables

### MVP Features

✅ Public can search and track any shipment  
✅ Organizations can create new shipments  
✅ Field workers can update checkpoints  
✅ Field workers can mark shipments as delivered  
✅ All data stored on blockchain  
✅ Works on local Hardhat network  
✅ Deployable to Oasis Sapphire testnet

### NOT in MVP

❌ Dynamic role management  
❌ Admin functions  
❌ Real IPFS uploads  
❌ QR/NFC scanning  
❌ Complex analytics  
❌ Multi-organization support  
❌ Advanced reporting

---

## 🔧 Technical Simplifications

1. **Authentication**: Just check `msg.sender` against hardcoded addresses
2. **Storage**: All data on-chain (no IPFS in MVP)
3. **Media**: Skip photos/documents entirely
4. **IDs**: Simple incrementing counter for shipment IDs
5. **Events**: Emit events but don't build complex indexing
6. **Gas**: Org/Field wallets pay their own gas (no meta-transactions)

---

## 🎯 Success Criteria

The MVP is complete when:

1. A user can connect with the Org wallet and create a shipment
2. A user can connect with the Field wallet and add checkpoints
3. Any user can view shipment details and history
4. The system works on local Hardhat network
5. The system successfully deploys to Oasis Sapphire testnet

This approach provides a solid foundation that can be extended with additional features post-MVP while keeping the initial scope manageable and achievable.

Based on the AidChain MVP project structure, here are **three parallel development tracks** that can be worked on concurrently by different team members:

## 🔗 Track 1: Smart Contract & Blockchain Infrastructure

**Team Member: Blockchain Developer**

### Core Responsibilities

- Smart contract development and testing
- Blockchain deployment configuration
- Event architecture and data structures

### Tasks

```
📁 packages/hardhat/
├── contracts/ShipmentTracker.sol
├── deploy/01_deploy_shipment_tracker.ts
├── test/ShipmentTracker.ts
└── hardhat.config.ts (Oasis Sapphire config)
```

#### Week 1-2 Deliverables

- [ ] **ShipmentTracker.sol** - Core contract with:
  - Shipment struct & checkpoint tracking
  - Role-based access control (hardcoded wallets)
  - Events: `ShipmentCreated`, `CheckpointAdded`, `ShipmentDelivered`
- [ ] **Deployment Scripts** - Local & testnet deployment
- [ ] **Contract Tests** - Full test coverage
- [ ] **ABI Generation** - Auto-generate TypeScript types

#### Week 3 Deliverables

- [ ] **Testnet Deployment** - Deploy to Oasis Sapphire testnet
- [ ] **Contract Verification** - Verify contracts on block explorer
- [ ] **Documentation** - Contract interaction guide

---

## 🎨 Track 2: Frontend UI/UX Development

**Team Member: Frontend Developer**

### Core Responsibilities

- User interface components and pages
- Authentication flow and role-based routing
- Responsive design and user experience

### Tasks

```
📁 packages/nextjs/app/(roles)/
├── public/          # Public tracking interface
├── org/             # Organization dashboard
├── field/           # Field worker interface
└── components/      # Reusable UI components
```

#### Week 1-2 Deliverables

- [ ] **Authentication System** - Simplified wallet-based auth
  - Update `contexts/AuthContext.tsx`
  - Hardcoded role mapping
- [ ] **Public Interface** - Shipment tracking & browsing
  - `/public` - Homepage with search
  - `/public/track/[id]` - Shipment details page
  - `/public/browse` - Shipment list with filters
- [ ] **Organization Interface** - Create shipments
  - `/org` - Dashboard
  - `/org/create` - Shipment creation form
- [ ] **Field Interface** - Update checkpoints
  - `/field` - Dashboard
  - `/field/checkpoint` - Add checkpoint form
  - `/field/delivery` - Mark delivered form

#### Week 3 Deliverables

- [ ] **Mock Data Integration** - Use static data for testing
- [ ] **Responsive Design** - Mobile-first optimization
- [ ] **Loading States** - Skeleton screens and error handling

---

## 🔧 Track 3: Integration & DevOps

**Team Member: Full-Stack/DevOps Developer**

### Core Responsibilities

- Frontend-blockchain integration
- Development workflow and deployment
- Testing and quality assurance

### Tasks

```
📁 Integration Points
├── hooks/scaffold-eth/    # Custom blockchain hooks
├── utils/scaffold-eth/    # Helper functions
├── services/             # External service integrations
└── deployment/           # CI/CD and deployment configs
```

#### Week 1-2 Deliverables

- [ ] **Custom Hooks** - Blockchain interaction layer
  - `useShipmentTracker.ts` - Contract read/write operations
  - `useShipmentData.ts` - Shipment data fetching
  - `useCheckpoints.ts` - Checkpoint management
- [ ] **Configuration Setup**
  - Update `scaffold.config.ts` for Oasis Sapphire
  - Environment configuration management
  - Wallet setup for testing
- [ ] **Mock Services** - External service stubs
  - Mock IPFS integration
  - Mock GPS/location services
  - Mock QR code scanning (manual input)

#### Week 3 Deliverables

- [ ] **End-to-End Integration** - Connect frontend to contracts
- [ ] **Testing Suite** - Integration and E2E tests
- [ ] **Deployment Pipeline** - Testnet deployment automation
- [ ] **Documentation** - Setup and testing guides

---

## 🤝 Coordination Points

### Daily Standups Focus

- **Dependencies**: What each track needs from others
- **Blockers**: Technical issues requiring cross-track collaboration
- **Integration**: API contracts and data structures

### Shared Interfaces

```typescript
// Shared type definitions (Track 3 → Track 1 & 2)
interface Shipment {
  id: string;
  description: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  currentCustodian: string;
  createdAt: number;
}

interface Checkpoint {
  timestamp: number;
  location: string;
  updatedBy: string;
  notes?: string;
}
```

### Weekly Sync Points

- **Week 1 End**: Contract ABI + Frontend mock integration
- **Week 2 End**: Smart contracts deployed + Frontend ready for real data
- **Week 3 End**: Full integration testing + Testnet deployment

### Git Workflow

```
main
├── feature/smart-contracts    (Track 1)
├── feature/frontend-ui        (Track 2)
└── feature/integration        (Track 3)
```

Each track works in separate feature branches with regular merges to avoid conflicts.

---

## 🎯 Success Metrics

**Track 1 Success**: Smart contracts deployed and verified on testnet  
**Track 2 Success**: All UI components functional with mock data  
**Track 3 Success**: End-to-end flow works from wallet connection to shipment tracking

**Overall MVP Success**: All three tracks integrated for complete user journey testing.

Would you like me to elaborate on any specific track or create detailed task breakdowns for individual team members?
