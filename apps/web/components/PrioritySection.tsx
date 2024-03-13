import * as React from "react"
import { Heading, Grid, Flex, Card } from "@repo/ui"
import { Priority, priorityMap } from "./PriorityDialog"
import TodoItem from "./TodoItem"

import type { Item } from "../app/page"

export interface IPrioritySectionProps {
  list: Item[]
}

export default function PrioritySection(props: IPrioritySectionProps) {
  const { list } = props
  return (
    <Grid rows='2' columns='2' gap='3' align={"stretch"}>
      {[
        Priority.ImportantAndUrgent,
        Priority.ImportantNotUrgent,
        Priority.NotImportantButUrgent,
        Priority.NotImportantAndNotUrgent,
      ].map((priority) => {
        return (
          <Card key={priority}>
            <Heading size='3' mb='2'>
              {priorityMap[priority]?.cnName}
            </Heading>
            <Flex direction={"column"} gap='1'>
              {list
                .filter((item) => {
                  return item.priority === priority
                })
                .map((item) => {
                  return (
                    <TodoItem
                      id={item.id}
                      title={item.title}
                      showPriority={false}
                      status={item.status}
                    />
                  )
                })}
            </Flex>
          </Card>
        )
      })}
    </Grid>
  )
}
