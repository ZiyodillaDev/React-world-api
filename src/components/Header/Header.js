import { useRef } from "react";

export const Header = () => {
  const headerbg = document.querySelector(".hBg")
  const modeBtn = document.querySelector(".modeBtn")
  const handleDarkMode =()=>{
    document.body.classList.toggle("mode")
    headerbg.classList.toggle("h-mode")
    if(document.body.classList =="mode"){
      modeBtn.textContent = "🌙"
    }else{
          modeBtn.textContent = "🌞"
    }

  }
  return (
    <header className="py-4 shadow hBg">
      <div className="container">
        <div className="d-flex align-items-center">
          <h2 className="h2 fw-bold">Where in the world?</h2>
          <button className="btn p-0 ms-auto fs-3 modeBtn" onClick={handleDarkMode}>
            🌞
          </button>
        </div>
      </div>
    </header>
  );
};
