import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Form from './components/Form';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery'

function App() {
  const [formData, setFormData] = React.useState({
    textArea: '', sendConfirmation: '', vat: '', netto: '', brutto: ''})
    function handleChange(event){
      const {name,value,type} = event.target
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: type==="text"&&isNaN(value)? 
        value.replace(',','.')
        :value
      }))
      
    }

    function handleSubmit(event){
      event.preventDefault()
      var form = $(event.target)

      $.ajax({
        contentType: "application/json",
        accepts: "application/json",
        type: "POST",
        url: "https://reqbin.com/echo/post/json",
        data: form,
        dataType: 'json',
        success: function(data){
          console.log("Success:" + data.success)
          console.log(data)//see console to find more details
          $("#success").css('display','block')
          $("#form").css('display','none')
        },
        error: function(data) {console.log(data)}
      })
    }

    function handleFakeSubmit(event){
      event.preventDefault()
      let count = 0
      event.target.textArea.value === ''? document.getElementById('descriptionAlert').style={display:"inline"}:count++ 
      event.target.sendConfirmation.value === ''? document.getElementById('confirmationAlert').style={display:"inline"} : count++
      event.target.vat.value === ''? document.getElementById('vatAlert').style={display:"inline"}:count++
      event.target.netto.value === ''? document.getElementById('nettoAlert').style={display:"inline"}:count++
      alert("Data is incorrect")
    }
    function checkIfDataIsCorrect(data){
      if(data.textArea===''||data.sendConfirmation===''||data.vat===''||data.netto==='')
          return false
      else 
          return true
  }
  return (
    <div className="App">
      <Form 
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onFakeSubmit={handleFakeSubmit}
      check={checkIfDataIsCorrect}
      />
      </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
