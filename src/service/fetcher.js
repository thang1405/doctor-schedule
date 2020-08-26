import axios from "axios";

export default axios.create({
  baseURL: "https://mock-db.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});