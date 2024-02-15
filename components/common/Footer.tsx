import React from "react";

export default function Footer() {
  return (
    <footer className={`w-full flex bg-white p-4 border-t`}>
      <div className={`w-1/4 h-20 flex justify-center items-center`}>
        Contact US
      </div>
      <div className={`w-1/4 h-20 flex justify-center items-center`}>
        WEB
      </div>
      <div className={`w-1/4 h-20 flex justify-center items-center`}>
        Columna 3
      </div>
      <div className={`w-1/4 h-20 flex justify-center items-center`}>
        Columna 4
      </div>
    </footer>
  );
}
