import { useParams } from "react-router-dom";

const Details = () => {
  const now = new Date()
  const {id} = useParams();
  return <h2>Hello!  The time is:  {now.toLocaleString()}.  Your ID is {id}.</h2>;
};

export default Details;
