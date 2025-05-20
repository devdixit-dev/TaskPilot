import { useState, useEffect } from "react"
import axios from 'axios';

const App = () => {

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get('http://localhost:4000/api/hello')
        const output = res.data;
        setMessage(output.message);
      }
      catch(e){
        console.log(`error fetching data: ${e}`);
      }
    }

    fetchData();
  }, [])

  return (
    <div>
      Hello it's working...
      <p>Message from backend:</p>
      <p>{message}</p>
    </div>
  )
}

export default App