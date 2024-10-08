import { useState } from 'react';
import './LoveCalculator.css';

const LoveCalculator = () => {
  const [user,setUser]=useState({
    boy:"",
    girl:""
  });
  const [clicked,setClicked]=useState(false);
  const [percentage, setPercentage] = useState(null);
  const [message, setMessage] = useState('');

  const handleInput=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setUser({
      ...user,
      [name]:value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!user.boy|| !user.girl) {
      alert("Please enter both names!");
      return;
    }
    try {
      const response=await fetch("https://love-calculator-app.onrender.com/api/auth/user",{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(user)
      })
      if(response.ok){
        const data=await response.json();
        console.log(data); 

        
    
        // Generate a random love percentage between 0 and 100
        const randomPercentage = Math.floor(Math.random() * 101);
        setPercentage(randomPercentage);
    
        // Display a message based on the percentage
        let loveMessage = '';
        if (randomPercentage >= 80) {
          loveMessage = 'A perfect match made in heaven! 💕';
        } else if (randomPercentage >= 50) {
          loveMessage = 'There’s great potential in your relationship! 🌟';
        } else if (randomPercentage >= 20) {
          loveMessage = 'It might take some work, but love can grow! 💌';
        } else {
          loveMessage = 'Maybe friendship is the best path for now. 🤝';
        }
        setMessage(loveMessage);
        setClicked(true);
      }
      else{
        console.log("not getting data");
      }

    } catch (error) {
      console.error(error);
    }
  };
  const resetButton=()=>{
    setUser({
      boy:"",
      girl:""
    })
    setClicked(false);
    setPercentage(null);
    setMessage('');
  }

  return (
    <div className="calculator-container">
      <h1>Love Calculator 💖</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Boy name"
          id='boy'
          name='boy'
          value={user.boy}
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Enter Girl name"
          value={user.girl}
          id='girl'
          name='girl'
          onChange={handleInput}
        />
      </div>
      {!clicked?
        <button onClick={handleSubmit}>Calculate Love 💘</button> :<button onClick={resetButton}>Reset</button>}
      {percentage !== null && (
        <div className="result-container">
          <h2>Love Percentage: {percentage}%</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default LoveCalculator;
