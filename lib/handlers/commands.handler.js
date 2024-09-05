import { count } from "console";
import arduino from "../arduino/arduino.js";

const devices = arduino.devices;

// Her tænder vi vores lys.
export const turnOn = async () => {
  if (devices.testled) {
    devices.testled.stop();
    devices.testled.on();
  }

  return true;
};

let countt = 0;
let over700 = false;
let lastTriggerTime = 0; // Ny variabel til at holde styr på sidste udløsningstid

export const lights = async (socket) => {
  if (devices.lightSensor) {
    devices.lightSensor.on("data", function () {
      // console.log(`Lyssensor værdi: ${this.value}`);

      socket.emit("sensorValue", this.value);
      devices.testled.on();

      if (this.value > 970 && !over700 && Date.now() - lastTriggerTime > 1000) {
        if (this.value > 1000) {
          socket.emit("hand", "Fjern Hånd!!");
        } else {
          countt++;
          over700 = true;
          socket.emit("sensorCount", countt);
          lastTriggerTime = Date.now(); // Sæt sidste udløsningstid til nu
        }
      } else if (this.value > 970 && over700) {
        ("");
      } else if (this.value < 970 && over700) {
        over700 = false;
      }
    });
  }
};

// Her slukker vi vores lys.
export const turnOff = async () => {
  if (devices.testled) {
    devices.testled.stop();
    devices.testled.off();
  }

  return true;
};

// Her tænder vi vores blink.
export const blink = async (delay = 1000) => {
  if (devices.testled) {
    devices.testled.blink(delay);
  }

  return true;
};

// Her tænder vi vores blink.
export const blinkThenStop = async (delay = 1000, timeout = 5000) => {
  if (devices.testled) {
    devices.testled.blink(delay);
  }

  setTimeout(() => {
    devices.testled.stop();
  }, timeout);

  return true;
};
