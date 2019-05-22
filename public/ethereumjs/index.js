var CertContractAddr = '0xC6ED4F929764532E0a18D2bA297293b37Fe74EA3';
var HOST = 'http://localhost:8545'

$(document).ready(function () {
   toggleResult(false, '');

   //0xa92abe376e0fed8246d2570b476160e0eeb34b537de38437ff88bf869877ca9fa149734d0000000000000000000000000000000000000000000000000000000000000001
   //0xa92abe376e0fed8246d2570b476160e0eeb34b537de38437ff88bf869877ca9fa149734d0000000000000000000000000000000000000000000000000000000000000001

   $('#result').hide();

   $('#submit').on('click', () => {
      submitCert();
   });

   function submitCert() {
      toggleResult(false, '');
      var certId = $('#hash').val();
      var rate = $('#rate').val();
      var from = '0x9317411384A505F01229859cD7e9EA76365ec7d0';
      var prvKey = ethereumjs.Buffer.Buffer.from('3A8E07D28F087E638574441B7464D31273C0423E38CA78776E7FBFCC5CFAD159', 'hex');


      var web3 = new Web3(new Web3.providers.HttpProvider(HOST));
      web3.eth.getTransactionCount(from, (err, rs) => {
         var rawTx = createTx(rs, prvKey, certId, rate);
         console.log(rawTx);
         web3.eth.sendRawTransaction(rawTx, (err, rs) => {
            toggleResult(true, rs)

            console.log(err, rs);

         })
      })



      // Call issue function of smart contract.
      // Cert.issue(certId, rate, (err, rs) => {
      //    if (!err) {
      //       toggleResult(true, rs)
      //       web3.eth.getTransactionReceipt(rs, (err, rs) => {
      //          console.log(err, rs);
      //       })
      //    }
      // })
   }
   function toggleResult(show, text) {
      $('#txid').text(text);
      if (show) {
         $('#result').show();
      } else {
         $('#result').hide()
      }
   }

   function createTx(nonce, prvKey, certId, rate) {
      var data = ethereumjsAbi.ABI.simpleEncode("issue(bytes32,uint256)", certId, rate)
      var txData = ethereumjs.Util.bufferToHex(data);
      // console.log(ethereumjs.Util.bufferToHex(data));

      var txParams = {
         nonce: nonce,
         gasPrice: '0x09184e72a000',
         gasLimit: '0x37100',
         to: CertContractAddr,
         value: '0x00',
         data: txData
      }

      var tx = new ethereumjs.Tx(txParams);

      tx.sign(prvKey);

      var rawTx = tx.serialize();
      rawTx = (ethereumjs.Util.bufferToHex(rawTx));
      return rawTx;
   }
});