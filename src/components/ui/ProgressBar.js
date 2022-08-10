import React, { Component } from "react";
import "../../App";
import "../../App.css";
export class ProgressBar extends Component {
  render() {
    const completedColor = "bg-progress-purple-color";
    const missingColor = "bg-progress-gray-color";
    const { step = 1 } = this.props;
    return (
      <div className="containerPasos container mx-auto w-4/5 h-1/4 pb-4 relative mt-2 flex flex-row flex-wrap justify-between">
        <div
          className={`numeroPaso px-2 py-3 m-2 rounded-full ${
            step >= 1
              ? completedColor + " text-white"
              : missingColor + " text-darkGray"
          } relative left text-white my-auto`}
        >
          <span className="m-3 text-xl text-center">1</span>
          <br />
          <div
            className={`labelPaso ${
              step >= 1 ? "text-normalPurple" : "text-darkGray"
            } text-base -mx-0`}
          >
            Cliente
          </div>
        </div>
        <div
          className={`numeroPaso px-2 py-3 m-2 rounded-full ${
            step >= 2
              ? completedColor + " text-white"
              : missingColor + " text-darkGray"
          } relative left  my-auto`}
        >
          <span className="m-3 text-xl text-center">2</span>
          <div
            className={`labelPaso ${
              step >= 2 ? "text-normalPurple" : "text-darkGray"
            } text-base -mx-2`}
          >
            Producto
          </div>
        </div>
        <div
          className={`numeroPaso px-2 py-3 m-2 rounded-full ${
            step >= 3
              ? completedColor + " text-white"
              : missingColor + " text-darkGray"
          } relative left  my-auto`}
        >
          <span className="m-3 text-xl text-center">3</span>
          <div
            className={`labelPaso ${
              step >= 3 ? "text-normalPurple" : "text-darkGray"
            } text-base -mx-5`}
          >
            Seguimiento
          </div>
        </div>
        <div
          className={`numeroPaso px-2 py-3 m-2 rounded-full ${
            step >= 4
              ? completedColor + " text-white"
              : missingColor + " text-darkGray"
          } relative left  my-auto`}
        >
          <span className="m-3 text-xl text-center">4</span>
          <div
            className={`labelPaso ${
              step >= 4 ? "text-normalPurple" : "text-darkGray"
            } text-base -mx-3`}
          >
            Confirmar
          </div>
        </div>
        <div className="absolute px-8 w-full">
          <div
            className={`${
              step - 1 >= 1 ? completedColor + "" : missingColor + ""
            } py-1 my-5 relative float-left w-1/3 -z-10`}
          ></div>
          <div
            className={`${
              step - 1 >= 2 ? completedColor + "" : missingColor + ""
            } py-1 my-5 relative float-left w-1/3 -z-10`}
          ></div>
          <div
            className={`${
              step - 1 >= 3 ? completedColor + "" : missingColor + ""
            } py-1 my-5 relative float-left w-1/3 -z-10`}
          ></div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
