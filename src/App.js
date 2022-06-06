import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useState } from "react";



function App() {

  const initPayment = (data) => {
		const options = {
			key: "rzp_live_IFEuFS80kB58fS",
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://https://razorpay-mern-server.herokuapp.com/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "https://razorpay-mern-server.herokuapp.com/api/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: book.price });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};




  const [book, setBook] = useState({
		name: "The Fault In Our Stars",
		author: "John Green",
		img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
		price: 10,
	});
  return (
    <div className="App">
    <div className="book_container">
      <img src={book.img} alt="book_img" className="book_img" />
      <p className="book_name">{book.name}</p>
      <p className="book_author">By {book.author}</p>
      <p className="book_price">
        Price : <span>&#x20B9; {book.price}</span>
      </p>
      <button onClick={handlePayment} className="buy_btn">
        buy now
      </button>
    </div>
  </div>
  );
}

export default App;
