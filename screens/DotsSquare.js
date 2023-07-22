import React, {useEffect, useState} from 'react';
import {View,TouchableOpacity, Pressable,ToastAndroid,Text} from 'react-native';
import { IosCIConstantColorGenerator } from 'react-native-image-filter-kit';
import Toast from 'react-native-simple-toast';

const DotsSquare = () => {
  
  const dotSize = 7;
  const squareSize = 300;
  const numDots = 900;
  // const redDots = [];
  // const blueDots = [];
  
  const [score,setScore] = useState(0);
  const [redDots, setRedDots] = useState([]);
  const [blueDots, setBlueDots] = useState([]);

  const innerDotSize = 7;
  const innerSquareSize = 100;
  const innerNumDots = 130;
  const [innerRedDots,setInnerRedDots] = useState([]);
  const [innerBlueDots,setInnerBlueDots] = useState([]);
  let [randomPosition,setRandomPosition] = useState({ side: "Right", top: (squareSize - 100) / 2, left: squareSize - 100 })

  let randomLeft;
  let randomTop;
  let randomSide;
  
  useEffect(()=>{
    // selectRandomPosition();
    generateDots();
  },[])
  // let [randomPosition,setRandomPosition] = useState();
  let [_isLoading,setIsLoading] = useState(false);
  
  function generateDots(){
    setIsLoading(true);
  console.log("GEN STARTED")
    selectRandomPosition();

    // selectRandomPosition();
    // setRandomPosition(selectRandomPosition());
    console.log("GENERATE DOTS");
    console.log(randomPosition.side);
    let redDotsLoop = [];
    let blueDotsLoop = [];
    let innerRedDotsLoop = [];
    let innerBlueDotsLoop = [];


    for (let i = 0; i < numDots; i++) {
      // console.log(i);
      let left, top;
  
      do {
        const leftRandom = Math.random();
        const topRandom = Math.random();
        left = Math.floor(leftRandom * (squareSize - dotSize));
        top = Math.floor(topRandom * (squareSize - dotSize));
      } while (
        (left >= randomLeft &&
          left <= randomLeft + 100 - dotSize &&
          top >= randomTop &&
          top <= randomTop + 100 - dotSize
      ))
  
      redDotsLoop.push(
        <View
          // key={i}
          style={{
            position: 'absolute',
            width: dotSize,
            height: dotSize,
            backgroundColor: 'red',
            // opacity: 0.5,
            left,
            top,
          }}
        />,
      );
      blueDotsLoop.push(
        <View
          // key={i}
          style={{
            position: 'absolute',
            width: dotSize,
            height: dotSize,
            backgroundColor: 'blue',
            left,
            top,
          }}
        />,
      );
    }

    //SMALL SQAURE
    for (let i = 0; i < innerNumDots; i++) {
      // console.log(i);
      let left, top;
  
      const leftRandom = Math.random();
      const topRandom = Math.random();
      left = Math.floor(leftRandom * (innerSquareSize - innerDotSize));
      top = Math.floor(topRandom * (innerSquareSize - innerDotSize));
      innerRedDotsLoop.push(
        <View
          style={{
            position: 'absolute',
            width: innerDotSize,
            height: innerDotSize,
            backgroundColor: '#ff0000',
            // opacity: 0.5,
            left,
            top,
          }}
        />,
      );
      innerBlueDotsLoop.push(
        <View
          style={{
            position: 'absolute',
            width: innerDotSize,
            height: innerDotSize,
            backgroundColor: '#0000ff',
            left,
            top,
          }}
        />,
      );
    }


    setBlueDots([]);
    setRedDots([]);
    setInnerBlueDots([]);
    setInnerRedDots([]);

    console.log("REMOVED");

    setRedDots(redDotsLoop);
    setBlueDots(blueDotsLoop);
    setInnerBlueDots(innerBlueDotsLoop);
    setInnerRedDots(innerRedDotsLoop);
    console.log("GENERATION SUCCESSFULL");
    
    setIsLoading(false)
  }

  let occupiedPositions = new Set();
  let innerOccupiedPositions = new Set();


  function selectRandomPosition() {
    const positions = [
      { side: "Right", top: (squareSize - 100) / 2, left: squareSize - 100 },
      { side: "Left", top: (squareSize - 100) / 2, left: 0 },
      { side: "Top", top: 0, left: (squareSize - 100) / 2 },
      { side: "Bottom", top: squareSize - 100, left: (squareSize - 100) / 2 },
    ];
    const randomIndex = Math.floor(Math.random() * positions.length);
    randomSide = positions[randomIndex].side;
    randomTop = positions[randomIndex].top;
    randomLeft = positions[randomIndex].left;
    setRandomPosition(positions[randomIndex])
    // return positions[randomIndex];
  }

  function checkIsOccupied(left, top) {
    const radius = dotSize;
    for (let x = left - radius; x <= left + radius; x++) {
      for (let y = top - radius; y <= top + radius; y++) {
        if (occupiedPositions.has(`${x},${y}`)) {
          return true;
        }
      }
    }
    return false;
  }

  function innerCheckIsOccupied(left, top) {
    const radius = innerDotSize;
    for (let x = left - radius; x <= left + radius; x++) {
      for (let y = top - radius; y <= top + radius; y++) {
        // console.log("IN LOOP");
        if (innerOccupiedPositions.has(`${x},${y}`)) {
          return true;
        }
      }
    }
    return false;
  }

  // const handleBigSquarePress = () => {
  //   const randomPosition = selectRandomPosition();
  //   const newRedDots = [];
  //   const newBlueDots = [];

  //   for (let i = 0; i < numDots; i++) {
  //     let left, top;
  //     do {
  //       const leftRandom = Math.random();
  //       const topRandom = Math.random();
  //       left = Math.floor(leftRandom * (squareSize - dotSize));
  //       top = Math.floor(topRandom * (squareSize - dotSize));
  //     } while (
  //       left >= randomPosition.left &&
  //       left <= randomPosition.left + 100 - dotSize &&
  //       top >= randomPosition.top &&
  //       top <= randomPosition.top + 100 - dotSize
  //     );

  //     newRedDots.push(
  //       <View
  //         key={i}
  //         style={{
  //           position: "absolute",
  //           width: dotSize,
  //           height: dotSize,
  //           backgroundColor: "red",
  //           left,
  //           top,
  //         }}
  //       />
  //     );
  //     newBlueDots.push(
  //       <View
  //         key={i}
  //         style={{
  //           position: "absolute",
  //           width: dotSize,
  //           height: dotSize,
  //           backgroundColor: "blue",
  //           left,
  //           top,
  //         }}
  //       />
  //     );
  //   }

  //   // setBlueSquareMargin(0);
  //   // setRedSquareMargin(0);
  //   setRedDots([])
  //   setBlueDots([]);
  //   setRedDots(newRedDots);
  //   setBlueDots(newBlueDots);
  // };

  const margin = 5;

  const [blueSquareMargin, setBlueSquareMargin] = useState(0);
  const [redSquareMargin, setRedSquareMargin] = useState(0);

  const handleMoveSquares = () => {
    console.log("handle");
    setBlueSquareMargin((prevMargin) => prevMargin - 5);
    setRedSquareMargin((prevMargin) => prevMargin + 5);
    generateDots();
  };


  console.log(randomPosition.side);
  return (
    <View>
    <View style={{ flexDirection: "row" }}>
      <View style={{ position: "relative" }}>
        <Pressable onPress={()=>{
          console.log("BIG SQUARE BLUE");
          Toast.show("Wrong Answer",1000)
          generateDots();
          
        }}
          style={{
            width: squareSize,
            height: squareSize,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            marginRight: margin - blueSquareMargin,
          }}
        >
          {blueDots}
          <Pressable onPress={()=>{
          console.log("INNER PRESSED blue")
          Toast.show("Well done! Correct answer!",1000)
          handleMoveSquares();
        }}
          style={{
            position: 'absolute',
            width: innerSquareSize,
            height: innerSquareSize,
            backgroundColor: 'black',
            borderColor: 'white',
            borderWidth: 2,
            top: randomPosition.top,
            left: (randomPosition.left),
            zIndex: 1,
            // opacity:0.5
          }}>
          {innerBlueDots}
        </Pressable>
        </Pressable>
        <Pressable onPress={()=>{
          console.log("BIG SQUARE BLUE");
          Toast.show("Wrong Answer",1000);
          // handleBigSquarePress();
          generateDots();
        }}
          style={{
            width: squareSize,
            height: squareSize,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: margin + redSquareMargin,
            position: "absolute",
            opacity:0.5,
            top: 0,
            left: 0,
          }}
        >
          {redDots}
          <Pressable onPress={()=>{
          console.log("INNER PRESSED")
          Toast.show("Well done! Correct answer!",1000)
          handleMoveSquares();
        }}
          style={{
            position: 'absolute',
            width: innerSquareSize,
            height: innerSquareSize,
            borderColor: "yellow",
            borderWidth: 2,

            top: randomPosition.top,
            left: randomPosition.left+10,
            zIndex: 1,
            // opacity:0.5
          }}>
          {innerRedDots}
        </Pressable>
        </Pressable>
      </View>
    </View>
    </View>
  );
};

export default DotsSquare;