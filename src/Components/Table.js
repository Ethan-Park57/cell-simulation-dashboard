import {React, useState} from 'react';
import { useTable } from 'react-table';
import EditableCell from '../EditableCell';

function Table({columns, data, onEdit, onAddColumn, onSubtractColumn}) {
  // Set our editable cell renderer as the default Cell renderer
  const defaultColumn = {
    Cell: EditableCell,
  }

  const [addInput, setAddInput] = useState('');
  const [subtractInput, setSubtractInput] = useState('');

  const handleAddColumn = (value) => {
    onAddColumn(value);
  };

  const handleSubtractColumn = (value) => {
    onSubtractColumn(value);
  };

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
  } = useTable({columns, data, defaultColumn, onEdit})
  
  return (
    <div>
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* add cellTypes */}
      <input type="text" onChange={(e) => setAddInput(e.target.value)} />
      <button onClick={ () => {handleAddColumn(addInput)}}>+</button>
      
      {/* subtract cellTypes */}
      <input type="text" onChange={(e) => setSubtractInput(e.target.value)} />
      <button onClick={ () => {handleSubtractColumn(subtractInput)}}>-</button>
    </div>

  );
}

export default Table;