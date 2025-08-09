# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is TraceAid - a blockchain-based shipment tracking system built on Scaffold-ETH 2. The application provides transparency and accountability for supply chain management with role-based access control.

**Tech Stack**: NextJS (App Router), RainbowKit, Wagmi, Hardhat, TypeScript, Tailwind CSS, DaisyUI, Framer Motion, Lucide React

## Architecture

**Monorepo Structure:**

- `packages/hardhat/` - Smart contract development environment using Hardhat
- `packages/nextjs/` - Frontend Next.js application with Web3 integration

**Key Directories:**

- Smart contracts: `packages/hardhat/contracts/`
- Contract deployment scripts: `packages/hardhat/deploy/`
- Contract tests: `packages/hardhat/test/`
- Frontend pages: `packages/nextjs/app/`
- Web3 components: `packages/nextjs/components/scaffold-eth/`
- Custom hooks: `packages/nextjs/hooks/scaffold-eth/`
- Contract ABIs: `packages/nextjs/contracts/`

## TraceAid-Specific Architecture

**Role-Based Access Control:**

- **Organization** (`0x70997970C51812dc3A010C7d01b50e0d17dc79C8`): Creates shipments
- **Field Worker** (`0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`): Updates shipment status/location
- **Public**: Views tracking information (no wallet required)

**Frontend Structure (App Router with Route Groups):**

- `app/(roles)/org/` - Organization dashboard and shipment creation
- `app/(roles)/field/` - Field worker checkpoint and delivery management
- `app/(roles)/public/` - Public tracking interface
- `app/(roles)/admin/` - Admin interface (placeholder)

**Smart Contract:**

- `ShipmentTracker.sol` - Main contract handling shipment lifecycle
- Hardcoded wallet addresses for demo purposes
- Events: `ShipmentCreated`, `CheckpointAdded`, `ShipmentDelivered`

**Authentication System:**

- `AuthContext` - Role detection based on connected wallet address
- Automatic role assignment for hardcoded addresses
- Permission-based UI rendering

## Development Commands

**Setup & Development:**

```bash
yarn install                 # Install dependencies
yarn chain                   # Start local Hardhat blockchain
yarn deploy                  # Deploy contracts to local network
yarn start                   # Start Next.js frontend (http://localhost:3000)
```

**Testing & Quality:**

```bash
yarn test                    # Run Hardhat contract tests with gas reporting
yarn hardhat:test           # Run Hardhat tests with gas reporting (same as above)
yarn lint                   # Run ESLint on both packages
yarn format                 # Format code with Prettier
yarn next:check-types       # TypeScript type checking for frontend
yarn hardhat:check-types    # TypeScript type checking for contracts
```

**Individual Package Commands:**

```bash
yarn hardhat:account        # List Hardhat accounts
yarn hardhat:fork          # Fork mainnet for testing
yarn hardhat:flatten       # Flatten contracts for verification
yarn next:build            # Build Next.js for production
yarn next:serve            # Serve production build
```

**Contract Development:**

```bash
yarn compile                # Compile smart contracts
yarn hardhat:clean         # Clean Hardhat artifacts
yarn verify                 # Verify contracts on Etherscan
```

**Deployment:**

```bash
yarn vercel                 # Deploy to Vercel
yarn ipfs                   # Deploy to IPFS
```

## Contract Interaction Patterns

**IMPORTANT**: Always use Scaffold-ETH hooks for contract interactions. Never use raw wagmi or ethers.

**Reading Contract Data:**

```typescript
const { data } = useScaffoldReadContract({
  contractName: "ShipmentTracker", // Main contract name
  functionName: "getShipment",
  args: [BigInt(shipmentId)], // Always use BigInt for uint256
  watch: true, // Auto-refresh on new blocks
});
```

**Writing to Contracts:**

```typescript
const { writeContractAsync, isPending, isMining } = useScaffoldWriteContract({
  contractName: "ShipmentTracker",
});

// Usage with error handling
try {
  await writeContractAsync(
    {
      functionName: "createShipment",
      args: [description, origin, destination],
    },
    {
      blockConfirmations: 1,
      onBlockConfirmation: () => {
        toast.success("Transaction confirmed");
      },
    }
  );
} catch (error) {
  // Error handling is automatically done by the hook
  console.error(error);
}
```

**Reading Contract Events:**

```typescript
const { data: events } = useScaffoldEventHistory({
  contractName: "ShipmentTracker",
  eventName: "ShipmentCreated",
  watch: true,
});
```

**TraceAid-Specific Contract Functions:**

- `createShipment(description, origin, destination)` - Org only
- `addCheckpoint(shipmentId, location)` - Field only
- `markDelivered(shipmentId, location)` - Field only
- `getShipment(shipmentId)` - Public read
- `getCheckpoints(shipmentId)` - Public read
- `totalShipments()` - Public read

## UI Components

**Scaffold-ETH Components** (use for Web3 interactions):

- `<Address>` - Display Ethereum addresses with truncation
- `<AddressInput>` - Input field for Ethereum addresses
- `<Balance>` - Display ETH/token balances
- `<EtherInput>` - Input with ETH/USD conversion

**TraceAid Custom Components**:

- Role-based layouts in each `(roles)` directory
- `AuthContext` for role management and wallet detection
- Toast notifications with `react-hot-toast`
- Motion components with `framer-motion`
- Icons from `lucide-react`

**Component Patterns**:

- Use `motion.div` for page transitions
- Glass morphism styling with `glass-card` and `glass-button` classes
- Form validation with toast error messages
- Loading states with `isPending` and `isMining` from write hooks

## Configuration Files

- `packages/nextjs/scaffold.config.ts` - Frontend configuration (network, theme, etc.)
- `packages/hardhat/hardhat.config.ts` - Hardhat network configuration
- `packages/nextjs/contracts/deployedContracts.ts` - Contract ABI data (auto-generated)

## Development Workflow

**Standard Development:**

1. Start local blockchain: `yarn chain`
2. Deploy contracts: `yarn deploy`
3. Start frontend: `yarn start`
4. Visit Debug Contracts: `http://localhost:3000/debug`
5. Iterate on contracts and redeploy as needed
6. Run tests: `yarn test`
7. Type checking: `yarn lint && yarn format`

**TraceAid Demo Flow:**

1. Connect ORG wallet (`0x70997970C51812dc3A010C7d01b50e0d17dc79C8`)
2. Create shipment at `/org/create`
3. Switch to FIELD wallet (`0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`)
4. Add checkpoint at `/field/checkpoint`
5. Mark delivery at `/field/delivery`
6. View public tracking at `/public/track/[id]`

**Key URLs:**

- Frontend: `http://localhost:3000`
- Debug Interface: `http://localhost:3000/debug`
- Public Browse: `http://localhost:3000/public/browse`
- Block Explorer: `http://localhost:3000/blockexplorer`

**Important Notes:**

- Contract addresses are hardcoded for demo purposes
- Role assignment is automatic based on wallet address
- All data is stored immutably on the blockchain
- Public tracking requires no wallet connection
- Complete demo instructions available in `docs/DEMO.md`
