import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [chosenLv, setChosenLv] = useState(null);
  const [words, setWords] = useState(null);
  const [correctAnswers, setCorrectAsnwers] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);

  function getRandomWords() {
    var options = {
      method: 'GET',
      url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
      params: { level: chosenLv, area: 'sat' },
      headers: {
        'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
      }
    };

    axios.request(options).then(response => {
      console.log(response.data);
      setWords(response.data);
    }).catch(err => {
      console.error(err);
    });
  }

  useEffect(() => {
    if (chosenLv) {
      getRandomWords();
    }
  }, [chosenLv]);

  function checkAnswer(option, optionIndex, correctAnswer) {
    // console.log(optionIndex, correctAnswer);
    if (optionIndex == correctAnswer) {
      setCorrectAsnwers([...correctAnswers, option]);
      setScore((score) => score + 1);
    } else {
      setScore((score) => score - 1);
    }
    setClicked([...clicked, option]);
  }

  console.log(correctAnswers);

  return (
    <div className="app">

      {!chosenLv && <div className="level-selector">
        <h1>Word Association App</h1>
        <p>Select Your level to start</p>
        <select name="levels" id="levels" value={chosenLv} onChange={(e) => setChosenLv(e.target.value)}>
          <option value={null}>Select a level...</option>
          <option value={'1'}>Level 1</option>
          <option value={'2'}>Level 2</option>
          <option value={'3'}>Level 3</option>
          <option value={'4'}>Level 4</option>
          <option value={'5'}>Level 5</option>
          <option value={'6'}>Level 6</option>
          <option value={'7'}>Level 7</option>
          <option value={'8'}>Level 8</option>
          <option value={'9'}>Level 9</option>
          <option value={'10'}>Level 10</option>
        </select>
      </div>}


      {chosenLv && words && <div className="table">
        <h2>Welcome to level: {chosenLv}</h2>
        <h3>Your score is: {score}</h3>
        <div className="game">
          {words.quizlist.map((question, _questionIndex) => (
            <div className="table-card" key={_questionIndex}>
              {question.quiz.map((tip, _index) => (
                <p key={_index}>{tip}</p>
              ))}
              <div className="table-card-answers">
                {question.option.map((option, optionIndex) => (
                  <div className="table-card-answers-button" key={optionIndex}>
                    <button
                      disabled={clicked.includes(option)}
                      onClick={() => checkAnswer(option, optionIndex + 1, question.correct)}
                    >{option}</button>
                    {correctAnswers.includes(option) && <p>Correct!</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
        <button onClick={() => setChosenLv(null)}>Go back</button>
      </div>}
    </div>


  );
}

export default App;