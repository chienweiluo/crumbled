import * as React from "react"
import {
  Flex,
  Card,
  Text,
  CrossCircledIcon,
  CheckCircledIcon,
  SymbolIcon,
  Badge,
} from "@repo/ui"
import styles from "../app/todoItem.module.css"
import { listAtom } from "../app/page"
import { useAtom } from "jotai"

import type { Item } from "../app/page"

export interface ITodoItemProps {
  id: Item["id"]
  title: string
  onCloseClick?: () => void
  priorityText?: string
  showPriority?: boolean
  status: Item["status"]
}

export default function TodoItem(props: ITodoItemProps) {
  const { title, onCloseClick, priorityText, showPriority, id, status } = props

  const [, updateList] = useAtom(listAtom)

  return (
    <Card>
      <Flex justify={"between"} align={"center"}>
        <Flex align='center'>
          {title}
          {showPriority && priorityText && (
            <Text ml='1' size='1' color='gray'>
              {priorityText}
            </Text>
          )}
        </Flex>
        <Flex align='center' gap='1'>
          {onCloseClick && (
            <CrossCircledIcon
              color='orange'
              className={styles["action-icon"]}
              onClick={onCloseClick}
            />
          )}
          {status === "done" ? (
            <SymbolIcon
              color='green'
              className={styles["action-icon"]}
              onClick={() => {
                updateList((prev: Item[]) => {
                  return prev.map((item) => {
                    if (item.id === id) {
                      return { ...item, status: "undone" }
                    }
                    return item
                  })
                })
              }}
            />
          ) : (
            <CheckCircledIcon
              color='green'
              className={styles["action-icon"]}
              onClick={() => {
                updateList((prev: Item[]) => {
                  return prev.map((item) => {
                    if (item.id === id) {
                      return { ...item, status: "done" }
                    }
                    return item
                  })
                })
              }}
            />
          )}
        </Flex>
      </Flex>
      <Flex justify='between' mt='2'>
        <Badge color={status === "done" ? "green" : "blue"}>{status}</Badge>
      </Flex>
    </Card>
  )
}
