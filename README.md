## ONLYPASS PAYMENT SDK
### Screenshots
![alt text](images/Screenshot1.png)
![alt text](images/Screenshot2.png)
### INSTALLATION
```
npm i https://github.com/marshalsoft/onlypass-sdk-test.git;
```
### USAGE
```
import OnlyPass from 'onlypass-sdk';
```
- **onlypas api key** - This can be gotten from Onlypass dashboard setting section
- **Platform ID** - This can be gotten from Onlypass dashboard setting section
- **isDemo** - default is true
```
const OnlyPassInstance = OnlyPass("onlypas api key","Platform ID",isDemo);

// get the list of payment channels

OnlyPassInstance.Channels().then(({data,status})=>{
    
    if(status)
    {
    var channel = data[0];
    
    // call payment function here
    OnlyPassInstance.PayNow(
        2000,
        "Payment for shoes",
        channel.gatewayId,
        "me@onlypass.com",
        "08000000000",
        "firstname",
        "lastname",
        channel.gateway.name,
        "NGN",
        channel.testPublicKey || channel.livePublicKey)
    }
})
```
