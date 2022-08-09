import React, { useEffect, useState } from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import { v4 as uuidv4 } from "uuid";
import "./Checkout.css";
import { getStripe } from "../../Store/features/cart/cartSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckouthtmlForm({ cartItems, cartTotalAmount }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [adress, setAdress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const products = cartItems.map((item) => ({
      productId: item._id,
      productTitle: item.title,
      productImgs: item.imgs,
      productPrice: item.price,
      productCategories: item.categories,
      quantity: item.cartQuantity,
      color: item.color,
    }));

    const billingDetails = {
      name: fullName,
      email: email,
      address: {
        state: state,
        city: city,
        line1: adress,
        postal_code: zipcode,
      },
    };

    const isNullish = Object.values(billingDetails).map((value) => {
      if (value === null || value === "") {
        return true;
      }
      return false;
    });

    if (isNullish.includes(true)) {
      setMessage("Please fill all the required fields");
    } else {
      const orderItems = {
        orderId: uuidv4(),
        products: products,
        billingDetails: billingDetails,
        amount: cartTotalAmount,
      };

      const cardElement = elements.getElement("card");

      try {
        dispatch(getStripe(cartTotalAmount)).then(async (response) => {
          if (response.payload.clientSecret) {
            const paymentMethodReq = await stripe.createPaymentMethod({
              type: "card",
              card: cardElement,
              billing_details: billingDetails,
            });
            if (!paymentMethodReq || !paymentMethodReq.paymentMethod) {
              setMessage("Card information is invalid");
              setIsLoading(false);
            }

            if (window.sessionStorage.getItem("user")) {
              orderItems.userId = JSON.parse(
                window.sessionStorage.getItem("user")
              )._id;
            }

            await stripe
              .confirmCardPayment(response.payload.clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id,
              })
              .then((result) => {
                if (result.error) {
                  setMessage(result.error.message);
                  setIsLoading(false);
                }
              });

            window.sessionStorage.setItem("order", JSON.stringify(orderItems));

            navigate("/payment");
          } else {
            setMessage("Your cart is empty");
          }
        });
      } catch (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.", error);
        }

        setIsLoading(false);
      }
    }
  };

  const iframeStyles = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "white",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
    complete: {
      iconColor: "#cbf4c9",
    },
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  };

  return (
    <form className="checkout__form" onSubmit={handleSubmit}>
      <div className="container">
        <>
          <h1>
            <LocalShippingOutlinedIcon className="chekout__icon" />
            <span>Shipping Details</span>
          </h1>
          <div className="name">
            <div>
              <label htmlFor="f-name">NAME</label>
              <input
                type="text"
                name="f-name"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="f-name">EMAIL</label>
              <input
                type="text"
                name="f-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="street">
            <label htmlFor="name">STREET</label>
            <input
              type="text"
              name="address"
              onChange={(e) => {
                setAdress(e.target.value);
              }}
            />
          </div>
          <div className="address-info">
            <div>
              <label htmlFor="city">CITY</label>
              <input
                type="text"
                name="city"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="state">STATE</label>
              <input
                type="text"
                name="state"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="zip">ZIP CODE</label>
              <input
                type="text"
                name="zip"
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
              />
            </div>
          </div>

          <h1>
            <PaymentIcon className="chekout__icon" />
            <span>Payment Information</span>
          </h1>
          <div className="checkout__payment">
            <div className="checkout__row">
              <div className="checkout__cardelement__container">
                <CardElement
                  className="card-element"
                  options={cardElementOpts}
                />
              </div>
            </div>
            <div className="btns">
              <button disabled={isLoading}>Pay Now</button>
            </div>
            {message && <div className="payment-message">{message}</div>}
          </div>
        </>
      </div>
    </form>
  );
}
