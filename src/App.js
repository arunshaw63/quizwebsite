import React from 'react';
import './assets/style.css';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';
import quizServices from './quizService';

class App extends React.Component {
state={
questionBank:[],
score:0,
response:0
};

getQuestion=()=>{
  quizServices().then(question=>{
    this.setState({
      questionBank:question
    })
  })
};
componentDidMount(){
  this.getQuestion();
}
computeAnswer=(answer,correctAnswer)=>{
  if(answer===correctAnswer){
      this.setState({
        score:this.state.score +1
      });
    }
    this.setState({
      response:this.state.response < 5 ? this.state.response +1 :5
    });
}
playAgain=()=>{
  this.getQuestion();
  this.setState({
    score:0,
    response:0
  })
}

  render(){
  return (
    <div className="container">
     <div className="title">Quiz App </div>
      {
        this.state.questionBank.length > 0 && 
        this.state.response < 5 &&
        this.state.questionBank.map(
         ({question,answers,correct,questionId})=>
        ( <QuestionBox 
         question={question}
         options={answers}
         key={questionId}
         selected={(answer)=>this.computeAnswer(answer,correct)}
         />)
        )
      }
      {this.state.response === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />): null}
    </div>
  );}
}

export default App;


