import React, { useState, useEffect } from "react"
import { MdDeleteForever } from "react-icons/md"
import { useDrag, useDrop } from "react-dnd"

const ItemType = "TASK"

function Task({ id, index, text, type, onDelete, onChange, moveTask }) {
  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState(text)
  const [color, setColor] = useState("#fff")

  useEffect(() => {
    const colors = [
      "#D7CCC8", "#C5CAE9", "#B2DFDB", "#B0BEC5", "#A5D6A7",
      "#9FA8DA", "#90CAF9", "#81D4FA", "#80CBC4", "#AED581"
    ]
    setColor(colors[Math.floor(Math.random() * colors.length)])
  }, [])

  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()	
    })
  })

  const [, dropRef] = useDrop({
  accept: ItemType,
  hover: (item) => {
    if (item.index !== index) {
      moveTask(item.index, index)
      item.index = index
    }
  },
  drop: (item) => {
    moveTask(item.index, index) 
  }
})



  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className="task"
      style={{ background: color, opacity: isDragging ? 0.5 : 1 }}
      onClick={() => !isEdit && setIsEdit(true)}
    >
      {isEdit ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            setIsEdit(false)
            onChange(type, id, value)
          }}
        />
      ) : (
        value
      )}

      <MdDeleteForever
        className="delete-icon"
        onClick={() => onDelete(type, id)}
      />
    </div>
  )
}

export default Task
