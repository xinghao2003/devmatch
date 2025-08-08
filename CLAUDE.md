# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Scaffold-ETH 2 project - a full-stack Ethereum development framework for building decentralized applications (dApps). The tech stack includes NextJS (with App Router), RainbowKit, Wagmi, Hardhat, TypeScript, and Tailwind CSS with DaisyUI.

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
yarn test                    # Run Hardhat contract tests
yarn hardhat:test           # Run Hardhat tests with gas reporting
yarn lint                   # Run ESLint on both packages
yarn format                 # Format code with Prettier
yarn next:check-types       # TypeScript type checking for frontend
yarn hardhat:check-types    # TypeScript type checking for contracts
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

**Reading Contract Data:**
```typescript
const { data } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "functionName",
  args: [arg1, arg2], // optional
});
```

**Writing to Contracts:**
```typescript
const { writeContractAsync } = useScaffoldWriteContract({
  contractName: "YourContract"
});

await writeContractAsync({
  functionName: "functionName",
  args: [arg1, arg2], // optional
  value: parseEther("0.1"), // optional for payable functions
});
```

**Reading Contract Events:**
```typescript
const { data: events } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "EventName",
  watch: true, // optional
});
```

## UI Components

Always use these Scaffold-ETH components for Web3 interactions:
- `<Address>` - Display Ethereum addresses
- `<AddressInput>` - Input field for Ethereum addresses  
- `<Balance>` - Display ETH/token balances
- `<EtherInput>` - Input with ETH/USD conversion

## Configuration Files

- `packages/nextjs/scaffold.config.ts` - Frontend configuration (network, theme, etc.)
- `packages/hardhat/hardhat.config.ts` - Hardhat network configuration
- `packages/nextjs/contracts/deployedContracts.ts` - Contract ABI data (auto-generated)

## Development Workflow

1. Start local blockchain: `yarn chain`
2. Deploy contracts: `yarn deploy`
3. Start frontend: `yarn start`
4. Visit Debug Contracts page: `http://localhost:3000/debug`
5. Iterate on contracts and redeploy as needed
6. Build custom UI using provided hooks and components
7. Run tests before deploying to live networks