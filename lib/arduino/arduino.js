import five from "johnny-five";

const arduino = {};

arduino.devices = {
  testled: null,
  lightSensor: null,
};

arduino.init = () => {
  let board = new five.Board({ port: "COM9" });

  const setup = () => {
    arduino.devices.testled = new five.Led(9);
    arduino.devices.lightSensor = new five.Sensor({
      pin: "A0",
    });
  };

  board.on("ready", () => {
    setup();
  });
};

// const arduino = (S) => {

//     let devices = {
//         testled: null
//     };

//     const run = () => {

//         devices.testled = new five.Led(9);
//         devices.testled.blink(2000);
//     }

//     board.on("ready", () => {
//         run();

//     });

//     return {
//         devices
//     };

// }

export default arduino;
