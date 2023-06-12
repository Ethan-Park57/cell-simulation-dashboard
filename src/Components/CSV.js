import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

function CSV({headers, mData, cData, mergeHelper, lastSaved, onTrigger}) {
  const [fileName, setFileName] = useState('');
  const [fileNameLastSaved, setFileNameLastSaved] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(mergeHelper(mData, cData));
  }, [mData, cData, mergeHelper]);

  const handleFileNameChange = (e) => {
    if (e.target.id === 'fileInput') {
      setFileName(e.target.value);
    }
    else if (e.target.id === 'lastSavedInput') {
      setFileNameLastSaved(e.target.value);
    }
  }

  const csvReport = {
    filename: `${fileName}.csv`,
    headers: headers,
    data: data
  };

  const csvReportLastSaved = {
    filename: `${fileName}.csv`,
    headers: headers,
    data: lastSaved
  };

  return (
    <div>
      <input type="text" id='lastSavedInput' value={fileNameLastSaved} onChange={handleFileNameChange} />
      <CSVLink {...csvReportLastSaved}>
        <button>Download Last Saved CSV</button>
      </CSVLink>

      <br />
      <br />

      <input type="text" id='fileInput' value={fileName} onChange={handleFileNameChange} />
      <CSVLink {...csvReport}>
        <button>Download CSV</button>
      </CSVLink>
    </div>
  );
}

export default CSV;
