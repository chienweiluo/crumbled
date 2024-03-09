import * as React from "react"
import { Flex, Dialog, Button, RadioGroup, Text } from "@repo/ui"
import type { Item } from "../app/page"

export interface IPrioirtyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentTask: Item
  onSaveClick: (payload: Item) => void
}

export enum Priority {
  ImportantAndUrgent = "1",
  ImportantNotUrgent = "2",
  NotImportantButUrgent = "3",
  NotImportantAndNotUrgent = "4",
}

export type PriorityValue = (typeof Priority)[keyof typeof Priority]

const priorityNameMap = {
  [Priority.ImportantAndUrgent]: "重要/緊急(馬上做)",
  [Priority.ImportantNotUrgent]: "重要/不緊急(授權做)",
  [Priority.NotImportantButUrgent]: "不重要/緊急(提前做)",
  [Priority.NotImportantAndNotUrgent]: "不重要/不緊急(拒絕做)",
}

export const priorityMap = Object.entries(Priority).reduce(
  (acc, [key, value]) => {
    acc[value] = { key, cnName: priorityNameMap[value] }
    return acc
  },
  {} as { [key: string]: { key: string; cnName: string } }
)

export default function PrioirtyDialog(props: IPrioirtyDialogProps) {
  const { open, onOpenChange, currentTask, onSaveClick } = props
  const [selectedPriority, setSelectedPriority] = React.useState<PriorityValue>(
    Priority.ImportantAndUrgent
  )

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Task {currentTask.title}</Dialog.Title>
        <Dialog.Description size='2' mb='4'>
          Set the Priority of the task
        </Dialog.Description>
        <RadioGroup.Root
          defaultValue='1'
          value={selectedPriority}
          onValueChange={(value: PriorityValue) => {
            setSelectedPriority(value)
          }}>
          <Flex gap='2' direction='column'>
            <Text as='label' size='2'>
              <Flex gap='2'>
                <RadioGroup.Item value={Priority.ImportantAndUrgent} />
                重要/緊急
              </Flex>
            </Text>
            <Text as='label' size='2'>
              <Flex gap='2'>
                <RadioGroup.Item value={Priority.ImportantNotUrgent} />
                重要/不緊急
              </Flex>
            </Text>
            <Text as='label' size='2'>
              <Flex gap='2'>
                <RadioGroup.Item value={Priority.NotImportantButUrgent} />
                不重要/緊急
              </Flex>
            </Text>
            <Text as='label' size='2'>
              <Flex gap='2'>
                <RadioGroup.Item value={Priority.NotImportantAndNotUrgent} />
                不重要/不緊急
              </Flex>
            </Text>
          </Flex>
        </RadioGroup.Root>
        <Flex gap='3' mt='4' justify='end'>
          <Dialog.Close>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              onClick={() =>
                onSaveClick({
                  ...currentTask,
                  priority: selectedPriority,
                })
              }>
              Save
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
