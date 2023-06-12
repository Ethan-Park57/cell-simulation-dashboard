import { React, useMemo, useState, useEffect } from 'react';
import Table from './Table';
import CSV from './CSV';

const styles = {
  tablesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  table: {
    marginRight: '20px',
  },
};

function XMLForm({ onTrigger }) {
  const [cColumns, setCColumns] = useState(["Y", "G", "B", "R"]);
  const [mColumns, ] = useState(["Medium"]);
  const [cData, setCData] = useState([]);  
  const [mData, setMData] = useState([]);
  const [cellMap, setCellMap] = useState({
    1: 'Y',
    2: 'G',
    3: 'B',
    4: 'R',
  });
  const [lastSaved, setLastSaved] = useState([]);

  const mergeData = (cData, mData) => {
    const combinedData = mData.map((row, index) => {
      return { ...row, ...cData[index] };
    });
    return combinedData;
  };

  // cData and mData depend on cColumns, so update them when cColumns changes
  useEffect(() => {
    setCData(() => [
      ...cColumns.map(() => {
        return cColumns.reduce((acc, column, index) => {
          acc[column] = index + 1;
          return acc;
        }, {});
      }),
    ]);
    setMData(() => [
      ...cColumns.map(() => ({
        Medium: 0,
      })),
    ]);
  }, [cColumns]);

  // handler for when user clicks '+' button
  const handleAddColumn = (value) => {
    // check that value isn't already in cColumns
    if (cColumns.includes(value)) {
      return;
    }
    setCColumns(old => [...old, value]);
    setCellMap(old => ({ ...old, [Object.keys(old).length + 1]: value }));
  };
  
  // handler for when user clicks '-' button
  const handleSubtractColumn = (value) => {
    // check that value is in cColumns
    if (!cColumns.includes(value)) {
      return;
    }
    setCColumns(old => old.filter((column) => column !== value));
    setCellMap(old => {
      const newCellMap = Object.values(old);
      const index = newCellMap.findIndex((key) => key === value);
      newCellMap.splice(index, 1);
      return newCellMap.reduce((acc, column, index) => {
        acc[index + 1] = column;
        return acc;
      }, {});
    });
  };

  const handleSave = () => {
    setLastSaved(mergeData(cData, mData));
  };

  // log lastSaved
  // useEffect(() => {
  //   console.log('lastSaved', lastSaved);
  // }, [lastSaved]);
  
  // in order to get left-hand side labeling of rows, we cannot use cColumns or mColumns directly
  // instead, we need to mTableColumns and cTableColumns to include the labels
  const mTableColumns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'label',
        Cell: ({ row }) => {
          return <div>{cellMap[row.index + 1]}</div>
        }
      },
      // use mColumns to set the columns
      ...mColumns.map((column) => ({
        Header: column,
        accessor: column,
      })),
    ],
    [cellMap, mColumns]
  );

  const cTableColumns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'label',
        Cell: ({ row }) => {
          return <div>{cellMap[row.index + 1]}</div>
        }
      },
      // use cColumns to set the columns
      ...cColumns.map((column) => ({
        Header: column,
        accessor: column,
      })),
    ],
    [cellMap, cColumns]
  );

  // helper function for editing data
  const editData = (old, rowIndex, columnId, value) => {
    return old.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...old[rowIndex],
          [columnId]: value,
        };
      }
      return row;
    })
  };
  
  // handlers for when user edits a cell
  const handleEditData = (rowIndex, columnId, value, dataType) => {
    if (isNaN(value)) {
      return;
    }
    else {
      value = Number(value);
    }
    if (dataType === 'mData') {
      setMData(old => editData(old, rowIndex, columnId, value));
    }
    else if (dataType === 'cData') {
      setCData(old => editData(old, rowIndex, columnId, value));
    }
  };

  // when cData changes, 
  useEffect(() => {
    const n = cData.length;
    for (let i = 0; i < n; i++) {
      const keys = Object.keys(cData[i]);
      if (cData[i][keys[i]] === 30) {
        onTrigger(keys[i]);
      }
    }
  }, [cData, onTrigger]);

  // log data
  // useEffect(() => {
  //   console.log('cData', cData);
  //   console.log('mData', mData);
  // }, [cData, mData]);
  
  return (
    <div className='container'>
      <div style={styles.tablesContainer}>
        <div style={styles.table}>
          <Table columns={mTableColumns} data={mData} onEdit={(rowIndex, columnId, value) => handleEditData(rowIndex, columnId, value, 'mData')} onAddColumn={handleAddColumn} onSubtractColumn={handleSubtractColumn} />
        </div>
        <div style={styles.table}>
          <Table columns={cTableColumns} data={cData} onEdit={(rowIndex, columnId, value) => handleEditData(rowIndex, columnId, value, 'cData')} onAddColumn={handleAddColumn} onSubtractColumn={handleSubtractColumn}/>
        </div>
      </div>

      <br />

      <button onClick={handleSave}> Save Current State </button>

      <br />
      <br />

      <CSV headers={[...mColumns, ...cColumns]} mData={mData} cData={cData} mergeHelper={mergeData} lastSaved={lastSaved} onTrigger={onTrigger}/>
    </div>
  );
};

export default XMLForm;
