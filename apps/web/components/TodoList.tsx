import * as React from "react"
import { priorityMap } from "./PriorityDialog"
import TodoItem from "./TodoItem"
import type { PriorityValue } from "./PriorityDialog"
import type { Item } from "../app/page"

export interface ITodoListProps {
  list: Item[]
  onCloseIconClick: (item: Item) => void
}

export default function TodoList(props: ITodoListProps) {
  const { list, onCloseIconClick } = props

  return (
    <>
      {list.map((item: Item) => {
        return (
          <TodoItem
            id={item.id}
            title={item.title}
            onCloseClick={() => onCloseIconClick(item)}
            priorityText={
              item.priority &&
              priorityMap[item.priority as PriorityValue]?.cnName
            }
            showPriority={true}
            status={item.status}
          />
        )
      })}
    </>
  )
}
