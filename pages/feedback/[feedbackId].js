import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FeedbackDetail() {
  const router = useRouter();
  const [feedbackData, setFeedbackData] = useState(null);

  async function fetchData() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/${router.query.feedbackId}`
      );
      console.log("data is ", data);
      setFeedbackData(data.feedback);
    } catch (err) {
      console.log("Error is ", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <p>Hello World</p>;
}
