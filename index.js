const env = "test";
var BaseUrl = "https://api.onlypassafrica.com/api/v1/external/payments";
if(env == "test")
{
  var BaseUrl = "https://devapi.onlypassafrica.com/api/v1/external/payments";
}
// (function(){
const OnlyPass = (apiKey,merchantId,isDemo = true)=>{
  const UniqueID = (d,prefix = "")=> {
    var text = "";
    if(d == undefined)
    {
      d = 16;
    }else{
      d = parseInt(d);
    }
    var tm = new Date().getMilliseconds();
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < d; i++)
    {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return prefix+text;
  }

const APICall = async (
    body = {},
    url = BaseUrl,method = "POST")=>{
    var myHeaders = new Headers();
    myHeaders.append("x-api-key",apiKey);
    myHeaders.append("x-platform-id",merchantId);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
      method:method,
      headers:myHeaders,
      redirect:'follow',
      body:JSON.stringify(body)
    };
    var response = await fetch(url, requestOptions)
    const data = await response.json()
    return data;
}
const ModalScreen = ()=>{
// var Modal = $("<div >",{id:"mID",width:"100%",height:"100%",display:"flex",backgroundColor:"red"});
// $("#mID").html(Modal).show();
}
const PayWithPaystack = (gateWayObj)=>{
  const d = {
    key:`${gateWayObj.publicKey}`,
    email:`${gateWayObj.email}`,
    amount:parseInt(gateWayObj.amountToPay)*100,
    currency:`${gateWayObj.currency}`,
    ref:`${gateWayObj.onlyPassReference}`,
    callback:function(response) {
      // callback(response)
    },
    onClose: function() {
      AbortCall(gateWayObj.onlyPassReference);
    }
  }
 var handler = window.PaystackPop.setup(d);
  handler.openIframe();
  // alert(JSON.stringify(d))
 }
const PayWithFlutterwave = (gateWayObj)=>
 {
   var d = {
    public_key:`${gateWayObj.publicKey}`,
    tx_ref:`${gateWayObj.onlyPassReference}`,
    amount:gateWayObj.amountToPay,
    currency:`${gateWayObj.currency}`,
    country: "NG",
    payment_options:"card,mobilemoney,ussd,banktransfer,paga,qr,mpesa,account",
    redirect_url:'',
      meta: {},
      customer: {
      email:`${gateWayObj.email}`
      },
      callback: function (data) {
        
      },
      onclose: function() {
        AbortCall(gateWayObj.onlyPassReference);
      }
    }
    // alert(JSON.stringify(d));
    FlutterwaveCheckout(d);
    // ModalScreen()
 }
 const PayWithSquad = (gateWayObj)=>{
  const squadInstance = new squad({
    onClose: () =>{
      AbortCall(gateWayObj.onlyPassReference);
     },
    onLoad: () => { },
    onSuccess: (response) =>{ },
    key: `${gateWayObj.publicKey}`,
    email:`${gateWayObj.email}`,
    amount:parseInt(gateWayObj.amountToPay)*100,
    currency_code:`${gateWayObj.currency}`,
    transaction_ref:`${gateWayObj.onlyPassReference}`,
    payment_channels:['card', 'bank' , 'ussd','bank_transfer'],
    Customer_name:"client"
});
squadInstance.setup();
squadInstance.open();
 }
 const PayWithBani = (gateWayObj)=>{
 const sendQuery = {
  amount:parseInt(gateWayObj.amountToPay), 
  phoneNumber:`+234${parseInt(gateWayObj.phone_number)}`,
  email:`${gateWayObj.email}`,
  firstName:`${gateWayObj.firstname}`,
  lastName:`${gateWayObj.lastname}`, 
  merchantKey:`${gateWayObj.publicKey}`, 
  merchantRef:`${gateWayObj.onlyPassReference}`,
  metadata: "", 
  onClose: (response) => {
      console.log("ONCLOSE DATA",response)
      AbortCall(gateWayObj.onlyPassReference);
  },
  callback: function (response) {
      let message = 'Payment complete! Reference: ' + response?.reference
      console.log(message, response)
  }
}
console.log(sendQuery);
  BaniPopUp(sendQuery);
 }
const AddHeader = ()=>{
  var gatewaylist = [];
  gatewaylist.push("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js");
  gatewaylist.push("https://js.paystack.co/v1/inline.js");
  gatewaylist.push("https://checkout.flutterwave.com/v3.js");
  gatewaylist.push("https://checkout.flutterwave.com/v3.js");
  gatewaylist.push("https://pay.voguepay.com/js/voguepay.js");
  gatewaylist.push("https://checkout.squadco.com/widget/squad.min.js");
  gatewaylist.push("https://bani-assets.s3.eu-west-2.amazonaws.com/static/widget/js/window.js");
    const modal = document.createElement("div");
    modal.setAttribute("id","mID")
    modal.style.display = "none";
    modal.style.width = "95%";
    modal.style.height = "95%";
    modal.style.position = "absolute";
    modal.style.margin = "2.5%";
    modal.setAttribute("class","card");
    window.onload = function() {
      gatewaylist.forEach((a,i)=>{
        const jq = document.createElement("script");
        jq.setAttribute("src",a);
        document.body.prepend(jq);
      })
    document.body.appendChild(modal);
    return null;
    }
}
  const InitPayment = async()=>{
    AddHeader();
    return await APICall({},`${BaseUrl}/channels`);
  }
  const AbortCall = async(ref)=>{
    await APICall({},`${BaseUrl}/${ref}`,"PATCH");
  }
  const PayNow = async(
    amount = 0,
    memo = "",
    gatewayId = "1",
    email = "",
    phone_number = "",
    firstname = "",
    lastname = "",
    gatewayName = "Paystack",
    currency = "NGN",
    publicKey = "",
    callback = ()=>{}
   )=>{
   let refNo = UniqueID(20,"OnlyPass-");
   let gateWayObj = {}
   const res = await APICall({
           gatewayId:gatewayId,
           externalReference:refNo,
           amount:amount,
           isDemo:isDemo
     })
    
     if(res.status)
       {
       gateWayObj = Object.assign(res.data,{
         gatewayId:"",
         externalReference:refNo,
         amount:amount,
         isDemo:isDemo,
         amount:amount,
         memo:memo,
         email:email,
         phone_number:phone_number,
         firstname:firstname,
         lastname:lastname,
         currency:currency,
         gatewayName:String(gatewayName).toLowerCase(),
         publicKey:publicKey
       })
       console.log("PayNow:",gateWayObj)
       if(gateWayObj.gatewayName == "paystack")
       {
         PayWithPaystack(gateWayObj);
       }else if(gateWayObj.gatewayName == "flutterwave")
       {
       PayWithFlutterwave(gateWayObj);
      }else if(gateWayObj.gatewayName == "squad")
      {
        PayWithSquad(gateWayObj);
      }else if(gateWayObj.gatewayName == "bani")
      {
        PayWithBani(gateWayObj);
      }
     }
     
    //  callback(gateWayObj);
   }
   InitPayment();
  return {
    PayNow:PayNow,
    Channels:()=>InitPayment()
  }
}
export default OnlyPass;
// window.OnlyPass = OnlyPass;
// })(window)
