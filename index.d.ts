declare module 'onlypass-sdk-test' {
    interface Gateway {
         merchantPaymentGatewayId: number;
         merchantId: number;
         gatewayId: number;
         livePublicKey: string;
         testPublicKey: string;
         status: string;
         createdAt: string;
         updatedAt: string;
         gateway: {
             gatewayId: number;
             name: string;
             className: string;
             logoUrl: string;
             status: string;
             createdAt: string;
             updatedAt: string;
         };
     }
     
     interface GateWayList extends Array<Gateway>{}
     interface APIResponse {
         data:GateWayList,
         status?:boolean,
         message?:string
     }
 const OnlyPass:(apiKey: string, merchantId: string,
    isDemo?: boolean ) => {
     PayNow:(
         amount?: number, 
         memo?: string, 
         gatewayId?: number, 
         email?: string, 
         phone_number?: string, 
         firstname?: string, 
         lastname?: string, 
         gatewayName?: string, 
         currency?: string, 
         gatewayKey?: string, 
         callback?: () => void) => Promise<any>;
         Channels: () => Promise<APIResponse>;
 }
 export default OnlyPass;
 }
