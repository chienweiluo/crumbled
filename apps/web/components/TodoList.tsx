import * as React from "react"
import { Flex, Card, Text, CrossCircledIcon } from "@repo/ui"
import { priorityMap } from "./PriorityDialog"
import type { PriorityValue } from "./PriorityDialog"
import type { Item } from "./page"

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
          <Card key={item.id}>
            <Flex justify={"between"} align={"center"}>
              {item.title}
              <CrossCircledIcon onClick={() => onCloseIconClick(item)} />
            </Flex>
            {item.priority && (
              <Text size='1' color='gray'>
                {priorityMap[item.priority as PriorityValue]?.cnName}
              </Text>
            )}
          </Card>
        )
      })}
    </>
  )
}
