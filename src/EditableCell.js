import {React, useState, useEffect} from "react";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onEdit, // This is a custom function that we supplied to our table instance
}) => {
  const [value, setValue] = useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    onEdit(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

export default EditableCell;