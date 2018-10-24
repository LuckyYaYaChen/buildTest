import React from 'react'
import { editCell } from '../../utils'

require('./EditTable.css')

function EditableCell (editProps) {
  const { value, editable, index, keyName, dispatch, nameSpace } = editProps
  // 点击编辑按钮修改当前行数据
  const handleChangeValue = () => {
    dispatch({
      type: `${nameSpace}/changeValue`,
      payload: {
        index,
        value,
        keyName,
      },
    })
  }


  const handleChange = (e) => {
    handleChangeValue(keyName, index, e.target.value)
  }
  const handleChangeSelect = (e) => {
    handleChangeValue(keyName, index, e)
  }
  const onChange = (date, dateString) => {
    handleChangeValue(keyName, index, dateString)
  }
  let childInput = ''
  const editFun = {
    handleChange,
    handleChangeSelect,
    onChange,
  }
  if (editable) {
    childInput = editCell(editProps, editFun)
  }
  return (
    <div className="editable-cell">
      {
        editable ?
          <div>
            {childInput}
          </div> :
          <div className="editable-row-text">
            {value || ' '}
          </div>
      }
    </div>
  )
}
EditableCell.propTypes = {
  // editProps: PropTypes.object,
}
export default EditableCell
