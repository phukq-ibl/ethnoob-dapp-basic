var CertContractAddr = '0xC6ED4F929764532E0a18D2bA297293b37Fe74EA3';

function isInstalled() {
   if (typeof web3 !== 'undefined') {
      console.log('MetaMask is installed')
   }
   else {
      console.log('MetaMask is not installed')
   }
}

$(document).ready(function () {
   toggleResult(false, '');
   isInstalled();

   toggleResult(false, '');

   // ethereum.enable()

   //    //   // Remember to handle the case they reject the request:
   //    //   .catch(function (reason) {
   //    //     if (reason === 'User rejected provider access') {
   //    //       // The user didn't want to sign in!
   //    //     } else {
   //    //       // This shouldn't happen, so you might want to log this...
   //    //       alert('There was an issue signing you in.')
   //    //     }
   //    //   })

   //    .then(function (accounts) {
   //       // var Token = web3.eth.contract(ABI).at(contractAddr);
   //       //    Token.balanceOf.call('0x9317411384A505F01229859cD7e9EA76365ec7d0',(err, rs)=>{
   //       //       console.log(rs.toString(10));
   //       //    })
   //       //   })
   //    });

   $('#submit').on('click', () => {
      if (typeof web3 == 'undefined') {
         alert('MetaMask is not installed')
         return;
      }
      ethereum.enable().then((rs) => {
         submitCert();
      })
      // if (!ethereum.isConnected()) {
      //    ethereum.enable().then((rs) => {
      //       submitCert();
      //    })
      // } else {
      //    submitCert();
      // }
   });

   function submitCert() {
      toggleResult(false, '');
      
      var Cert = web3.eth.contract(ABI).at(CertContractAddr);
      var certId = $('#hash').val();
      var rate = $('#rate').val();

      // Call issue function of smart contract.
      Cert.issue(certId, rate, (err, rs) => {
         if (!err) {
            toggleResult(true, rs)
            web3.eth.getTransactionReceipt(rs, (err, rs) => {
               console.log(err, rs);
            })
         }
      })
   }
   function toggleResult(show, text) {
      $('#txid').text(text);
      if (show) {
         $('#result').show();
      } else {
         $('#result').hide()
      }
   }
});