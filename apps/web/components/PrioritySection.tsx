import * as React from "react"
import { Heading, Grid, Flex, Card, Text } from "@repo/ui"
import { Priority, priorityMap } from "./PriorityDialog"
import type { Item } from "./page"

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
                    <Card key={item.id}>
                      <Text as='div'>{item.title}</Text>
                    </Card>
                  )
                })}
            </Flex>
          </Card>
        )
      })}
    </Grid>
  )
}
