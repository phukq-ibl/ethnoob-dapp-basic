
var Cert = artifacts.require('./CertificateStore.sol');

contract('Token', function (accounts) {
    var cert;
    var totalSupply = 1000000;// 1mil
    it('Deploy token', () => {
        // Deploy new token contract
        return Cert.new().then((instance) => {
            cert = instance;
            console.log("=======Contract address is " + cert.address);
        })
    })

    it('Should issues 20 tokens', () => {
        var ac = accounts[1];
        var certId = web3.utils.sha3("aaaa");
        var  rate = 10;
        return cert.issue(certId, rate).then((rs)=>{
            console.log(rs);
        })
    });


});
