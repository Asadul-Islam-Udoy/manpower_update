const SSLCommerzPayment = require('sslcommerz-lts')
const { v4: uuid } = require("uuid");
const store_id = process.env.SSLC_STORE_ID;
const store_passwd = process.env.SSLC_PASSWORD;
const is_live = false
// Create a new payment
exports.createPaymentControler = async (req, res) => {
  try {
    const { amount, cus_name, phone, area, city, state } = req.body;
      const data = {
        total_amount: amount,
        currency: "EUR",
        tran_id: uuid(),
        success_url: "http://yoursite.com/success",
        fail_url: "http://yoursite.com/fail",
        cancel_url: "http://yoursite.com/cancel",
        ipn_url: "http://yoursite.com/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name,
        cus_email: "cust@yahoo.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: phone,
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: area,
        ship_add2:state,
        ship_city:city,
        ship_state: state,
        ship_postcode: 1000,
        ship_country: "Bangladesh",
        multi_card_name: "mastercard",
        value_a: "ref001_A",
        value_b: "ref002_B",
        value_c: "ref003_C",
        value_d: "ref004_D",
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then(apiResponse => {
          // Redirect the user to payment gateway
          let GatewayPageURL = apiResponse.GatewayPageURL
           res.status(201).json({
            flag:true,
            url:GatewayPageURL
          });
          
      });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error + "se" + error,
    });
  }
};

///payment success
exports.successPaymentControler = async (req, res) => {
  // Callback data
  // console.log(req.body);
  const {
    pay_status,
    cus_name,
    cus_phone,
    cus_email,
    currency,
    pay_time,
    amount,
  } = req.body;
  // res.render("callback", {
  //   title: "Payment Status",
  //   pay_status,
  //   cus_name,
  //   cus_phone,
  //   cus_email,
  //   currency,
  //   pay_time,
  //   amount,
  // });
};

///payment fail
exports.failPaymentControler = async (req, res) => {
  res.status(400).json({
    flag: false,
    message: "payment fails",
  });
};

///payment cancel
exports.cancelPaymentControler = async (req, res) => {
  res.status(400).json({
    flag: false,
    message: "payment cancel",
  });
};

// List all payments
exports.listPaymentsController = async (req, res) => {
  try {
    const payments = await PaymentModel.find().populate("booking user");
    res.status(200).json({
      flag: true,
      message: "get all payment successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

///get payment status base

exports.statusPaymentsController = async (req, res) => {
  try {
    const { paymentStatus } = req.body; //["Pending", "Completed", "Failed"]
    const payments = await PaymentModel.find({
      status: paymentStatus,
    }).populate("booking user");
    res.status(200).json({
      flag: true,
      message: "get all status base payment successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

///get payment method base

exports.methodPaymentsController = async (req, res) => {
  try {
    const { paymentMethod } = req.body; //["Credit Card", "Debit Card", "PayPal", "Cash"]
    const payments = await PaymentModel.find({
      method: paymentMethod,
    }).populate("booking user");
    res.status(200).json({
      flag: true,
      message: "get all status base payment successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

// Get a payment by ID
exports.getPaymentByIdController = async (req, res) => {
  try {
    const payment = await PaymentModel.findById(req.params.id).populate(
      "booking user"
    );
    if (!payment) {
      return res.status(400).json({
        flag: false,
        message: "paymen is not found",
      });
    }
    res.status(200).json({
      flag: true,
      message: "get single payment successfully!",
      payment,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

// Get a payment by user
exports.getPaymentByUserController = async (req, res) => {
  try {
    const payments = await PaymentModel.find({ user: req.params.id }).populate(
      "booking user"
    );
    if (!payments) {
      return res.status(400).json({
        flag: false,
        message: "payments is not found",
      });
    }
    res.status(200).json({
      flag: true,
      message: "get user payment successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

// Update a payment
exports.updatePaymentStatusController = async (req, res) => {
  try {
    const { payemntStatus } = req.body;
    const payment = await PaymentModel.findByIdAndUpdate(
      req.params.id,
      { status: payemntStatus },
      { new: true, runValidators: true }
    );
    if (!payment) {
      return res.status(400).json({
        flag: false,
        message: "payment is not found!",
      });
    }
    const payments = await PaymentModel.find({}).populate("booking user");
    res.status(200).json({
      flag: true,
      message: "payment update successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

// Delete a payment
exports.deletePaymentController = async (req, res) => {
  try {
    const payment = await PaymentModel.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(400).json({
        flag: false,
        message: "payment is not found!",
      });
    }
    const payments = await PaymentModel.find({}).populate("booking user");
    res.status(200).json({
      flag: true,
      message: "payment delete successfully!",
      payments,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};
