import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ContactModal from "./Contact";
import Shadow from "./Shadow";
import DBadmin from "./DBadmin";

function App() {

  const [ showForm, SetShowForm ] = useState(false)
  const shadow = document.getElementById('shadow')

  const showContact = () => {
    if (showForm) {
      shadow.style.visibility = "visible";
      document.body.style.overflowY = "hidden"
      return (
          <ContactModal close={closeClick} setShow={SetShowForm}  />
      )    
    }
  }

  window.addEventListener("click", (e) => {
    if ((e.target === shadow) && showForm) {
      SetShowForm(false)
      document.body.style.overflowY = "auto"
      shadow.style.visibility = "hidden";
    }
  })

  const closeClick = (e) => {
    if (e.target === document.getElementById('closeForm')) {
      SetShowForm(false)
      document.body.style.overflowY = "auto"
      shadow.style.visibility = "hidden";
    }
}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="App" id="app">
            <Header />
            <Shadow />
            <Main />
            <Footer setShow={SetShowForm} showForm={showForm} close={closeClick}  />
            {showContact()}
          </div>
        }>
        </Route>
        <Route path="https://baseball-timeline-backend.onrender.com/dbadmin" element={<DBadmin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
