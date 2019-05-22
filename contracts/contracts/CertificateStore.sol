pragma solidity >=0.4.21 <0.6.0;

contract CertificateStore {
  address public owner;
  mapping(bytes32=>uint) public certificates;
  constructor() public {
    owner = msg.sender;
  }

  modifier ownerOnly() {
      require(msg.sender == owner, "Only owner");
      _;
  }

  event Issue(bytes32 certId);

  function issue(bytes32 certId, uint256 rate) public ownerOnly{
      if (certificates[certId] == 0) {
          certificates[certId] = rate;
          emit Issue(certId);
      }
  }

}