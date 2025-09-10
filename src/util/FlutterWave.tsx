 


const FlutterWave = (email: string, phoneNumber: string, name: string, amount: Number) => {

  const config = {
     public_key: process.env.NEXT_FLUTTERWAVE_PUBLIC_KEY,
     tx_ref: Date.now(),
     amount: amount,
     currency: 'NGN',
     payment_options: 'card,mobilemoney,ussd',
     customer: {
       email: email,
       phone_number: phoneNumber,
       name: name,
     },
     customizations: {
       title: 'Rising Sun Inc',
       description: 'Credit Rising Sun Account',
       logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
     },
   };


   return config;
}

export default FlutterWave


