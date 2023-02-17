const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
};

const makePayment = async ({name, email, phone, video, newUser}) => {
    const res = await initializeRazorpay();

    if (!res) {
      window.alert("Razorpay SDK Failed to load");
      return;
    }

    const amount = video && newUser ? '39900' : '19900'

    // Make API call to the serverless API
    const data = await fetch(process.env.REACT_APP_API_URL + "/api/razorpay", { method: "POST" }).then((t) =>
      t.json()
    );

    console.log(data);
    var options = {
        key: process.env[process.env.NODE_ENV === 'development' ? 'REACT_APP_RAZORPAY_KEY_TEST' : 'REACT_APP_RAZORPAY_KEY_LIVE'],
        name: "Carenest",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thankyou for consulting with carenest, we wish you a healthy life!",
        image: "https://media-exp1.licdn.com/dms/image/C4D0BAQGeNPDTbHqUCA/company-logo_200_200/0/1662111313828?e=1674691200&v=beta&t=7qhyRH079b1jPwW4bm4NaY2ybvt-nefM04DnMzkuLy8",
        handler: function (response) {
            // Validate payment at server - using webhooks is a better idea.
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
        },
        prefill: {
            name: name,
            email: email,
            contact: phone,
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
};