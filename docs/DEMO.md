# TraceAid Demo Flow

This document outlines the complete demonstration flow for the TraceAid shipment tracking system, from organization shipment creation to public verification.

## <� Overview

The demo showcases a complete supply chain tracking workflow with three distinct roles:

- **Organization**: Creates and manages shipments
- **Field Worker**: Updates shipment location and status
- **Public**: Tracks and verifies shipment progress

## =� Demo Setup

### Prerequisites

```bash
yarn install          # Install dependencies
yarn chain            # Start local Hardhat blockchain
yarn deploy           # Deploy ShipmentTracker contract
yarn start            # Start Next.js frontend (http://localhost:3000)
```

### Hardcoded Wallet Addresses

- **ORG Wallet**: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8` (Hardhat Account #1)
- **FIELD Wallet**: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC` (Hardhat Account #2)
- **Public**: Any other address or anonymous browsing

## =� Step-by-Step Demo Flow

### Step 1: Organization Creates Shipment

**Role**: Organization  
**Wallet**: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`  
**URL**: `http://localhost:3000/org/create`

1. Connect MetaMask with the ORG wallet address
2. Navigate to the shipment creation page
3. Fill out the shipment form:
   - **Description**: `500 blankets, 100 food kits`
   - **Origin**: `Kuala Lumpur`
   - **Destination**: `Sabah`
4. Click "Create Shipment"
5. Confirm the transaction in MetaMask
6. **Result**: Shipment created with unique ID (e.g., ID: 1), status "Created"

**Smart Contract Call**: `createShipment(description, origin, destination)`

### Step 2: Field Worker Adds Checkpoint

**Role**: Field Worker  
**Wallet**: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`  
**URL**: `http://localhost:3000/field/checkpoint`

1. Switch MetaMask to the FIELD wallet address
2. Navigate to the checkpoint page
3. Enter shipment details:
   - **Shipment ID**: `1` (from Step 1)
   - **Location**: `Warehouse A`
4. Click "Submit Checkpoint"
5. Confirm the transaction in MetaMask
6. **Result**: Shipment status changes to "In Transit", checkpoint added

**Smart Contract Call**: `addCheckpoint(shipmentId, location)`

### Step 3: Field Worker Marks Delivery

**Role**: Field Worker  
**Wallet**: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`  
**URL**: `http://localhost:3000/field/delivery`

1. Stay connected with FIELD wallet
2. Navigate to the delivery page
3. Enter delivery details:
   - **Shipment ID**: `1`
   - **Final Location**: `Village X Distribution Center`
4. Click "Submit Delivery"
5. Confirm the transaction in MetaMask
6. **Result**: Shipment status changes to "Delivered", final checkpoint added

**Smart Contract Call**: `markDelivered(shipmentId, location)`

### Step 4: Public Tracking & Verification

**Role**: Public (Anyone)  
**URL**: `http://localhost:3000/public/track/1`

1. No wallet connection required (public access)
2. Navigate to the tracking page using Shipment ID
3. **View Complete Timeline**:
   - **Shipment Details**: Description, Origin � Destination
   - **Current Status**: Delivered
   - **Current Custodian**: Field worker address
   - **Complete Timeline**:
     - Checkpoint 1: "Warehouse A" (timestamp, verified by field worker)
     - Checkpoint 2: "Village X Distribution Center" (timestamp, verified by field worker)

**Smart Contract Calls**: `getShipment(shipmentId)`, `getCheckpoints(shipmentId)`

## = Technical Implementation

### Smart Contract (`ShipmentTracker.sol`)

- **Location**: `packages/hardhat/contracts/ShipmentTracker.sol`
- **Key Functions**:
  - `createShipment()` - Organization only
  - `addCheckpoint()` - Field worker only
  - `markDelivered()` - Field worker only
  - `getShipment()` - Public read access
  - `getCheckpoints()` - Public read access

### Frontend Pages

- **Org Create**: `packages/nextjs/app/(roles)/org/create/page.tsx`
- **Field Checkpoint**: `packages/nextjs/app/(roles)/field/checkpoint/page.tsx`
- **Field Delivery**: `packages/nextjs/app/(roles)/field/delivery/page.tsx`
- **Public Tracking**: `packages/nextjs/app/(roles)/public/track/[id]/page.tsx`

### Role-Based Access Control

- **AuthContext**: `packages/nextjs/contexts/AuthContext.tsx`
- Automatic role assignment based on connected wallet address
- Permission-based UI rendering and function access

## <� Demo Highlights

1. **Role-Based Security**: Each role can only perform authorized actions
2. **Real-Time Updates**: All data fetched live from blockchain
3. **Complete Transparency**: Public can verify entire shipment history
4. **Immutable Records**: All checkpoints permanently stored on-chain
5. **User-Friendly Interface**: Simple forms for complex blockchain operations

## =

Verification Points

During the demo, emphasize these key features:

- **Data Integrity**: All information stored immutably on blockchain
- **Access Control**: Only authorized roles can update shipment status
- **Public Transparency**: Anyone can verify the complete audit trail
- **Real-Time Tracking**: Status updates immediately visible to all parties
- **Custody Chain**: Clear record of who has custody at each point

## =� Additional Features

### Browse All Shipments

**URL**: `http://localhost:3000/public/browse`

- View all created shipments
- Filter by status (Created/In Transit/Delivered)
- Quick access to individual tracking pages

### Debug Interface

**URL**: `http://localhost:3000/debug`

- Direct smart contract interaction
- View all contract functions and variables
- Useful for technical demonstration and troubleshooting

## =� Demo Tips

1. **Preparation**: Deploy contracts and note the shipment ID for consistent demo flow
2. **Wallet Switching**: Keep both ORG and FIELD wallets ready in MetaMask
3. **Transaction Timing**: Allow time for transaction confirmations between steps
4. **Error Handling**: Demonstrate role-based access restrictions (try wrong wallet)
5. **Public Access**: Show how tracking works without any wallet connection

This demo flow provides a complete end-to-end demonstration of the TraceAid shipment tracking system, showcasing blockchain transparency, role-based access control, and real-world supply chain management capabilities.
