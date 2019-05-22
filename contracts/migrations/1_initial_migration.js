const Migrations = artifacts.require("Migrations");
const Cert = artifacts.require("CertificateStore")
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Cert);
};
