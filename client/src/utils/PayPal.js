import React from "react";
import PaypalExpressBbtn from "react-paypal-express-checkout";

const PayPal = props => {
  const onSuccess = payment => {
    console.log("The payment was successfull", payment);
    props.transactionSuccess(payment);
  };

  const onCancel = data => {
    console.log("The payment was cancelled", data);
  };

  const onError = err => {
    console.log("Error!", err);
  };

  let env = "sandbox";
  let currency = "USD";
  let total = props.toPay;

  const client = {
    sandbox:
      "AXCtNOUCYcTNlg4KNgDHis1Y34DoEScYYxm_agKe_t2-axJRFvsv_jSxnlyRZQQYXISAWdWcfJUkfcJH",
    production: "YOUR_PRODUCTION_APP_ID"
  };
  return (
    <div>
      <PaypalExpressBbtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onCancel={onCancel}
        onSuccess={onSuccess}
        style={{
          size: "large",
          color: "blue",
          shape: "rect",
          label: "checkout"
        }}
      />
    </div>
  );
};

export default PayPal;
