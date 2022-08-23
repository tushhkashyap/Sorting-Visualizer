import React, {Component} from 'react';
import './App.css';

import Bar from './components/Bar'
import Form from './components/Form'

// Algorithms 
import BubbleSort from './Algorithm/bubble';
import InsertionSort from './Algorithm/insertion';
import SelectionSort from './Algorithm/selection';
import MergeSort from './Algorithm/merge';
import QuickSort from './Algorithm/quick';

import Play from '@material-ui/icons/PlayCircleOutlineRounded';
import Forword from '@material-ui/icons/SkipNextRounded';
import Backword from '@material-ui/icons/SkipPreviousRounded';
import RotateLeft from '@material-ui/icons/RotateLeft';
 


class App extends Component {
  state = {
      array: [],
      arraySteps: [],
      colorKey: [],
      colorSteps: [],
      currentStep: [],
      count: 20,
      delay: 150,
      algorithm: 'Selection Sort',
      timeouts: [],
  }; 

  //Object
  ALGORITHMS = {
    "Bubble Sort" : BubbleSort,
    "Insertion Sort" : InsertionSort,
    "Selection Sort" : SelectionSort,
    "Merge Sort" : MergeSort,
    "Quick Sort" : QuickSort,
  }

  componentDidMount() {
      this.generateRandomArray();
  }

  changeAlgorithm = (e) => {
    this.clearTimeouts();
    this.clearColorKey();
    this.setState({
      algorithm: e.target.value,
      currentStep:0,
      arraySteps: [
        this.state.arraySteps[this.state.currentStep === 0 ? 0 : this.state.currentStep-1],
      ],
    }, () => this.generateSteps());
  };

  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    // calling the algo
    this.ALGORITHMS[this.state.algorithm](array , 0,steps,colorSteps);

    this.setState({
      arraySteps: steps,
      colorSteps: colorSteps,
    })

  }

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: [],
    });
  };



  // This function is used to set the colors to blank in initially
  clearColorKey = () => {

    let blankKey = new Array(this.state.count).fill(0);

    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey],
    });
  };

  generateRandomNumber = (min,max) => {
      return Math.floor(Math.random() * (max-min) + min);
  }

  generateRandomArray = () => {
      this.clearTimeouts();
      this.clearColorKey();

      const count = this.state.count;
      const tmp = [];

      for(let i=0;i<count;i++)
      {
          tmp.push(this.generateRandomNumber(50,200))
      }
      // console.log(tmp);
      this.setState({
          array:tmp,
          arraySteps:[tmp], 
          currentStep: 0,
          count:count,
      },() => {
        // This is the callback function
        // we add it becoz setState is an asynchronous
        // so we don't want to create the steps for the wrong array
        // That's why we are adding call back func to handle this situation
        this.generateSteps();
      });
  };

  changeArray = (index , value) => {
    let arr = this.state.array;
    arr[index] = value;
    this.setState({
      array:arr,
      arraySteps:[arr],
      currentStep: 0,
    } , () => {
      this.generateSteps();
    });
};


  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) return; //We are already in the beginning so we can't go backwards
    this.clearTimeouts();
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };

  nextStep = () => {
		let currentStep = this.state.currentStep;
    // we are at the end of bars
		if (currentStep >= this.state.arraySteps.length - 1) return;
    this.clearTimeouts();
		currentStep += 1;
		this.setState({
			currentStep: currentStep,
			array: this.state.arraySteps[currentStep],
			colorKey: this.state.colorSteps[currentStep],
		});
	};

  start = () => {
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();

    let timeouts = [];
    let i=0;

    while(i<steps.length - this.state.currentStep)
    {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
    }

    this.setState({
      timeouts:timeouts,

    });
  };

  changeCount = (e) => {
    this.clearTimeouts();
    this.clearColorKey();
    this.setState({
      count: parseInt(e.target.value),
    }, () => this.generateRandomArray());
  };

  changeSpeed = (e) => {
    this.clearTimeouts();
    this.setState({
      delay: parseInt(e.target.value),
    });
  };

  render() {

      let bars = this.state.array.map((value,index) => {
          return (
              <Bar 
                  key = {index}
                  index={index}
                  length={value}
                  color={this.state.colorKey[index]}
                  changeArray={this.changeArray}
              />
          )
      });


      let playButton;

      if(this.state.arraySteps.length === this.state.currentStep)
      {
        playButton = (
          <button className='controller' onClick={this.generateRandomArray}>
              <RotateLeft />
          </button>
        );
      }
      else
      {
        playButton = (
          <button className='controller' onClick={this.start}>
              <Play />
          </button>
        );
      }

      return (
          <div className="app">
              <h1 className='page-head'>
                <span className='page-head-main'>
                    Sorting Visualizer
                </span>
              </h1>

              <div className="frame">
                  <div className="barsDiv container card"> {bars} </div>
              </div>

              <div className="control-pannel">
                <div className='control-buttons'>
                  <button className='controller' onClick={this.previousStep}>
                    <Backword />
                  </button>
                  {playButton}
                  <button className='controller' onClick={this.nextStep}>
                      <Forword />
                  </button>
                </div>
              </div>

              <div className="pannel">

                <Form
                    formLabel='Algorithms'
                    values={[
                      'Bubble Sort',
                      'Merge Sort',
                      'Quick Sort',
                      'Insertion Sort',
                      'Selection Sort',
                    ]}
                    lables={[
                      'Bubble Sort',
                      'Merge Sort',
                      'Quick Sort',
                      'Insertion Sort',
                      'Selection Sort',
                    ]}
                    currentValue={this.state.algorithm}
                    onChange={this.changeAlgorithm}
                  />

                  <Form
                    formLabel='Items'
                    values={[10, 15, 20, 25, 30]}
                    lables={[10, 15, 20, 25, 30]}
                    currentValue={this.state.count}
                    onChange={this.changeCount}
                  />

                  <Form 
                      formLabel='Speed'
                      values={[500 ,400,300,200,100]} 
                      currentValue={this.state.delay}
                      lables={['1x','2x','3x','4x','5x']}
                      onChange={this.changeSpeed}
                     />
              </div>
          </div>
      );
  }
}

export default App;
