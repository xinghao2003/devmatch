//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * ShipmentTracker (Phase 1 minimal version)
 * - Single contract storing shipments and their checkpoints
 * - Hardcoded roles for demo on Hardhat: ORG and FIELD
 * - Public read functions for dashboard
 */
contract ShipmentTracker {
    // ------------------------------------------------------------------------
    // Roles (Hardhat accounts)
    // ------------------------------------------------------------------------
    address public constant ORG_WALLET = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // Hardhat account #1
    address public constant FIELD_WALLET = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC; // Hardhat account #2

    modifier onlyOrg() {
        require(msg.sender == ORG_WALLET, "Only org");
        _;
    }

    modifier onlyField() {
        require(msg.sender == FIELD_WALLET, "Only field");
        _;
    }

    // ------------------------------------------------------------------------
    // Data structures
    // ------------------------------------------------------------------------
    enum Status {
        Created,
        InTransit,
        Delivered
    }

    struct Shipment {
        uint256 id;
        string description;
        string origin;
        string destination;
        Status status;
        address currentCustodian;
    }

    struct Checkpoint {
        uint256 timestamp;
        string location;
        address updatedBy;
    }

    // ------------------------------------------------------------------------
    // Storage
    // ------------------------------------------------------------------------
    uint256 private nextShipmentId;
    mapping(uint256 => Shipment) private shipments;
    mapping(uint256 => Checkpoint[]) private shipmentCheckpoints;
    mapping(uint256 => bool) private shipmentExists;

    // ------------------------------------------------------------------------
    // Events
    // ------------------------------------------------------------------------
    event ShipmentCreated(uint256 indexed id, string description, string origin, string destination);
    event CheckpointAdded(uint256 indexed id, string location, address indexed updatedBy);
    event ShipmentDelivered(uint256 indexed id, string location, address indexed updatedBy);

    // ------------------------------------------------------------------------
    // Core functions
    // ------------------------------------------------------------------------
    function createShipment(
        string calldata description,
        string calldata origin,
        string calldata destination
    ) external onlyOrg returns (uint256 id) {
        id = ++nextShipmentId;

        shipments[id] = Shipment({
            id: id,
            description: description,
            origin: origin,
            destination: destination,
            status: Status.Created,
            currentCustodian: ORG_WALLET
        });
        shipmentExists[id] = true;

        emit ShipmentCreated(id, description, origin, destination);
    }

    function addCheckpoint(uint256 id, string calldata location) external onlyField {
        require(shipmentExists[id], "Unknown shipment");
        Shipment storage s = shipments[id];
        require(s.status != Status.Delivered, "Already delivered");

        shipmentCheckpoints[id].push(Checkpoint({
            timestamp: block.timestamp,
            location: location,
            updatedBy: msg.sender
        }));

        // Mark shipment as in transit and update custodian to field worker
        if (s.status == Status.Created) {
            s.status = Status.InTransit;
        }
        s.currentCustodian = FIELD_WALLET;

        emit CheckpointAdded(id, location, msg.sender);
    }

    function markDelivered(uint256 id, string calldata location) external onlyField {
        require(shipmentExists[id], "Unknown shipment");
        Shipment storage s = shipments[id];
        require(s.status != Status.Delivered, "Already delivered");

        s.status = Status.Delivered;
        s.currentCustodian = FIELD_WALLET;

        shipmentCheckpoints[id].push(Checkpoint({
            timestamp: block.timestamp,
            location: location,
            updatedBy: msg.sender
        }));

        emit ShipmentDelivered(id, location, msg.sender);
    }

    // ------------------------------------------------------------------------
    // Views
    // ------------------------------------------------------------------------
    function getShipment(uint256 id) external view returns (Shipment memory) {
        require(shipmentExists[id], "Unknown shipment");
        return shipments[id];
    }

    function getCheckpoints(uint256 id) external view returns (Checkpoint[] memory) {
        require(shipmentExists[id], "Unknown shipment");
        return shipmentCheckpoints[id];
    }

    function totalShipments() external view returns (uint256) {
        return nextShipmentId;
    }
}
