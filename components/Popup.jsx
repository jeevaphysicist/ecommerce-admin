import React, { Fragment } from "react";

const Popup = ({ isDelete, isEdit, isCreate, handleModel }) => {
  return (
    <Fragment>
      <div className="fixed top-0 bottom-0 left-0 right-0 nunitoSans z-50 bg-black opacity-60"></div>
      <div className="nunitoSans fixed  top-[0px] bottom-0 left-0 right-0 z-50 rounded-b-[20px] px-10 py-8 ">
        <div className="flex items-center justify-center">
          <div className="mt-[40%] lg:mt-[15%] p-4 bg-white w-[300px] rounded-[7px]">
            <div
              className="text-center px-4 pt-4 text-[18px] font-semibold"
              style={{ color: "#2D333C" }}
            >
              Are you sure you want to
              {isCreate ? " Create?" : null}
              {isEdit ? " edit?" : null}
              {isDelete ? " delete?" : null}
            </div>

            <div className="grid grid-cols-4 gap-10 pt-10">
              <div className="col-span-2 m-auto w-[100%] ">
                <button
                  className="px-4 py-2 font-bold  rounded-[7px] w-[100%] bg-white text-black border-2 border-black"
                  onClick={() => handleModel(false)}
                >
                  NO
                </button>
              </div>
              <div className="col-span-2 m-auto w-[100%]  ">
                <button
                  className="px-4 py-2 font-bold text-white rounded-[7px] w-[100%]  bg-black border-2 border-black"
                  onClick={() => handleModel(true)}
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Popup;
