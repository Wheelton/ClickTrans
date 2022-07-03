import React from "react"

export default function Form({data, onChange, onSubmit, onFakeSubmit, check}){   
return(
    <div className="container">
        <form className="form" id="form" onSubmit={check(data)? onSubmit : onFakeSubmit}>
            <h1>Task</h1>
            <label htmlFor="textArea">Description</label>
            <br/>
            <span id="descriptionAlert" style={{display:"none"}}>Text is required</span>
            <br/>
            <textarea 
                name="textArea" 
                id="textArea" 
                value={data.textArea} 
                onChange={onChange}
                maxLength="255"
            />
            <br/>
            <label htmlFor="textArea"> 
            {
                (255 - data.textArea.length)===0 ?
                <span style={{color: "#F2E86D"}}>You can't enter more than 255 characters</span>
                :
                <span style={{color: "#F2E86D"}}>({255-data.textArea.length} characters left)</span>
                
            }
            </label>
            <fieldset>
                <legend>Send confirmation</legend>
                <span id="confirmationAlert" style={{display:"none"}}>Text is required</span>
                <br/>
                <input 
                    type="radio" 
                    name="sendConfirmation" 
                    id="radioYes" 
                    value="Yes" 
                    checked={data.sendConfirmation === "Yes"} 
                    onChange={onChange}
                />
                <label htmlFor="radioYes">Yes</label>
                <input 
                    type="radio" 
                    name="sendConfirmation" 
                    id="radioNo" 
                    value="No" 
                    checked={data.sendConfirmation === "No"} 
                    onChange={onChange}
                />
                <label htmlFor="radioNo">No</label>
            </fieldset>
            <label htmlFor="vat">VAT:</label>
            <br/>
            <select 
                id="vat" 
                name="vat" 
                onChange={onChange} 
                value={data.vat} 
            >
                <option disabled={true} value="">--Choose VAT--</option>
                <option value="19">19%</option>
                <option value="21">21%</option>
                <option value="23">23%</option>
                <option value="25">25%</option>
            </select>
            <br/>
            <span id="vatAlert" style={{display:"none"}}>Text is required</span>
            <br/>
            <label htmlFor="netto">Price netto EUR</label>
            <br/>
            <input 
                type="text" 
                id="netto" 
                name="netto" 
                onChange={onChange} 
                disabled={!data.vat} 
                value={data.netto}
                placeholder="Enter netto value here"
            />
            <br/>
            <span id="nettoAlert" style={{display:"none"}}>Please input number</span>
            {
                isNaN(data.netto)&&document.getElementById("nettoAlert").style.display==='none'?
                <span style={{color: "#F2E86D"}}>Please, input number</span>:''
            }
            <br/>
            <label htmlFor="brutto">Price brutto EUR</label>
            <br/>
            <input 
                type="text" 
                id="brutto" 
                name="brutto" 
                onChange={onChange}
                style={data.vat?{backgroundColor:"white", border:"1px,solid,black"}:{}} 
                disabled
                value={data.brutto=data.netto*((100-data.vat)/100)}
                
            />
            <br/>
            <br/>
            <button>Submit</button>
        </form>
        <div className="success" id="success">
            <div className="success_text">
                <h1>Congratulation!</h1>
                <h2>Server responded with status code 200</h2>
                <h3>See console log for more details</h3>
                <button onClick={() => window.location.reload()}>Refresh</button>
            </div>
        </div>
    </div>
  )
}