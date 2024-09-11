import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [hello, setHello] = useState('');

  useEffect(()=>{
    async function axiosTest() {
      const { data } = await axios.get('http://localhost:9000/api/hello');
      setHello(data);
    }
    axiosTest();
  }, []);

  return (
    <div className="App">
        <p>
          axios result : {hello}
        </p>
    </div>
  );
}

export default App;
