import React, { useEffect, useState } from "react";
import pythonText from "../python.txt";

function PythonForm({areTriggered}) {
  const [formValues, setFormValues] = useState({
    BASALY: "",
    BASALB: "",
    BASALGR: "",
    ENDMCS: "",
    MTFORCEMINOFF: "",
    THRESHOLDUPBR: ""
  });

  useEffect(() => {
    Object.keys(areTriggered).forEach(key => {
      // have a map of functions that correspond to behaviors for when homotypic relationships are a certain value
      if (key === 'Y') {
        setFormValues({...formValues, BASALY: 50});
      }
    });
  }, [areTriggered, formValues]);

  // print formValues whenever it updates
  // useEffect(() => {
  //   console.log("CHANGED FORM VALUE:", formValues);
  // }, [formValues]);
  
  const [fileString, setFileString] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(pythonText);
      const data = await response.text();
      setFileString(data);
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); 

    const regexList = Object.keys(formValues).map(varName => ({
      regex: new RegExp(`^(${varName}=.*?)(\\s+#.*)?$`),
      newValue: `${varName}=${formValues[varName]}`,
    }));
    
    const updatedString = fileString.split('\n').map(line => {
      regexList.forEach(regexObj => {
        const match = line.match(regexObj.regex);
        if (match) {
          line = line.replace(regexObj.regex, `${regexObj.newValue}${match[2] || ''}`);
        }
      });
      return line;
    }).join('\n');

    const element = document.createElement("a");
    const file = new Blob([updatedString], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "file.txt";
    element.click();
    
    return updatedString;
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="BASALY">BASALY</label>
        <input
          type="text"
          id="BASALY"
          name="BASALY"
          value={formValues.BASALY}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="BASALB">BASALB</label>
        <input
          type="text"
          id="BASALB"
          name="BASALB"
          value={formValues.BASALB}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="BASALGR">BASALGR</label>
        <input
          type="text"
          id="BASALGR"
          name="BASALGR"
          value={formValues.BASALGR}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="ENDMCS">ENDMCS</label>
        <input
          type="text"
          id="ENDMCS"
          name="ENDMCS"
          value={formValues.ENDMCS}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="MTFORCEMINOFF">MTFORCEMINOFF</label>
        <input
          type="text"
          id="MTFORCEMINOFF"
          name="MTFORCEMINOFF"
          value={formValues.MTFORCEMINOFF}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="THRESHOLDUPBR">THRESHOLDUPBR</label>
        <input
          type="text"
          id="THRESHOLDUPBR"
          name="THRESHOLDUPBR"
          value={formValues.THRESHOLDUPBR}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PythonForm;
