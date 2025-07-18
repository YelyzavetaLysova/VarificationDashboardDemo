import axios from "axios";

export async function sendVerification(data) {
  const res = await axios.post("http://127.0.0.1:8000/verify/", data);
  return res.data;
}

