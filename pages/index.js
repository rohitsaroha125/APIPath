import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

function HomePage() {
  const [feedbacks, setFeedbacks] = useState([]);

  const emailInput = useRef();
  const feedbackInput = useRef();

  async function submitForm(e) {
    e.preventDefault();
    try {
      const enteredEmail = emailInput.current.value;
      const enteredFeedback = feedbackInput.current.value;
      console.log("values are ", enteredEmail, enteredFeedback);

      const { data } = await axios.post(`http://localhost:3000/api/feedback`, {
        email: enteredEmail,
        feedback: enteredFeedback,
      });
      console.log("Data is ", data);
    } catch (err) {
      console.log("Error is ", err);
    }
  }

  async function fetchData() {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/feedback`);
      setFeedbacks(data.feedbacks);
    } catch (err) {
      console.log("Error is ", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter Email"
            ref={emailInput}
          />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <input
            type="text"
            id="feedback"
            name="feedback"
            placeholder="Enter feedback"
            ref={feedbackInput}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h4>Feedbacks</h4>
      {feedbacks.map((feedback, i) => {
        return (
          <Link href={`/feedback/${feedback.email}`}>
            <p key={i}>{feedback.feedback}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default HomePage;
