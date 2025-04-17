// SPDX-License-Identifier: MIT


// this is for admin dashboard

pragma solidity ^0.8.0;

contract MediQR {
    struct Medicine {
        string medname;
        string batchNo;
        string expiryDate;
        string qrCID;
        address uploader;
    }

    mapping(string => Medicine) private medicines;

    event MedicineAdded(
        string batchNo,
        address indexed uploader,
        string qrCID,
        uint256 timestamp
    );

    /// @notice Add a new medicine record
    /// @param _medname Name of the medicine
    /// @param _batchNo Unique batch number
    /// @param _expiryDate Expiry date (e.g. DD-MM-YYYY)
    /// @param _qrCID IPFS CID pointing to QR image
    function addMedicine(
        string memory _medname,
        string memory _batchNo,
        string memory _expiryDate,
        string memory _qrCID
    ) public {
        require(bytes(_batchNo).length > 0, "Batch number required");
        require(bytes(medicines[_batchNo].batchNo).length == 0, "Batch already exists");

        medicines[_batchNo] = Medicine({
            medname: _medname,
            batchNo: _batchNo,
            expiryDate: _expiryDate,
            qrCID: _qrCID,
            uploader: msg.sender
        });

        emit MedicineAdded(_batchNo, msg.sender, _qrCID, block.timestamp);
    }



    
// this is for user dashboard

    /// @notice Get all data for a batch
    function getMedicine(string memory _batchNo) public view returns (
        string memory name,
        string memory expiryDate,
        string memory qrCID,
        address uploader
    ) {
        Medicine memory med = medicines[_batchNo];
        require(bytes(med.batchNo).length != 0, "Medicine not found");

        return (med.medname, med.expiryDate, med.qrCID, med.uploader);
    }

    /// @notice Return just the IPFS CID for frontend QR display
    function getQRLink(string memory _batchNo) public view returns (string memory) {
        Medicine memory med = medicines[_batchNo];
        require(bytes(med.batchNo).length != 0, "Batch not found");
        return med.qrCID;
    }
}



