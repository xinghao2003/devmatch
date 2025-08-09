import { expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import type { ShipmentTracker } from "../typechain-types";

// Status enum mirrors Solidity enum { Created, InTransit, Delivered }
const Status = {
  Created: 0n,
  InTransit: 1n,
  Delivered: 2n,
} as const;

describe("ShipmentTracker (Phase 1)", function () {
  let tracker: ShipmentTracker;
  let accounts: Awaited<ReturnType<typeof ethers.getSigners>>;

  beforeEach(async () => {
    await deployments.fixture(["ShipmentTracker"]);
    const { deployer } = await getNamedAccounts();
    tracker = await ethers.getContract<ShipmentTracker>("ShipmentTracker", deployer);
    accounts = await ethers.getSigners();
  });

  it("allows only ORG to create shipment", async () => {
    const deployer = accounts[0];
    const org = accounts[1];
    const field = accounts[2];

    // Non-org attempts should revert
    await expect(tracker.connect(deployer).createShipment("Aid", "KL", "Sabah")).to.be.revertedWith(
      "Only org",
    );
    await expect(tracker.connect(field).createShipment("Aid", "KL", "Sabah")).to.be.revertedWith("Only org");

    // Org can create
    const tx = await tracker.connect(org).createShipment("Aid", "KL", "Sabah");
    const receipt = await tx.wait();
    const events = receipt?.logs ?? [];
    expect(events.length).to.be.greaterThan(0);

    // Read shipment back
    const shipment = await tracker.getShipment(1);
    expect(shipment.id).to.equal(1n);
    expect(shipment.description).to.equal("Aid");
    expect(shipment.origin).to.equal("KL");
    expect(shipment.destination).to.equal("Sabah");
    expect(shipment.status).to.equal(Status.Created);
  });

  it("field can add checkpoint and transition to InTransit", async () => {
    const org = accounts[1];
    const field = accounts[2];

    await tracker.connect(org).createShipment("Food", "OriginA", "DestB");

    // Non-field cannot add checkpoint
    await expect(tracker.connect(org).addCheckpoint(1, "Warehouse")).to.be.revertedWith("Only field");

    // Field adds checkpoint
    await expect(tracker.connect(field).addCheckpoint(1, "Warehouse")).to.emit(tracker, "CheckpointAdded");

    const shipment = await tracker.getShipment(1);
    expect(shipment.status).to.equal(Status.InTransit);

    const cps = await tracker.getCheckpoints(1);
    expect(cps.length).to.equal(1);
    expect(cps[0].location).to.equal("Warehouse");
  });

  it("field can mark delivered and record final checkpoint", async () => {
    const org = accounts[1];
    const field = accounts[2];

    await tracker.connect(org).createShipment("Kits", "O", "D");
    await tracker.connect(field).addCheckpoint(1, "Hub");

    await expect(tracker.connect(field).markDelivered(1, "Village")).to.emit(tracker, "ShipmentDelivered");

    const shipment = await tracker.getShipment(1);
    expect(shipment.status).to.equal(Status.Delivered);

    const cps = await tracker.getCheckpoints(1);
    expect(cps.length).to.equal(2);
    expect(cps[1].location).to.equal("Village");

    // Subsequent updates should fail
    await expect(tracker.connect(field).addCheckpoint(1, "After")).to.be.revertedWith("Already delivered");
  });
});


