"use client"

import { useState } from "react"
import {
  Heading,
  Box,
  Flex,
  Card,
  Text,
  TextField,
  IconButton,
  Container,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  SunIcon,
  CrossCircledIcon,
  CrumpledPaperIcon,
  MoonIcon,
} from "@repo/ui"
import styles from "./page.module.css"
import PrioritySection from "./PrioritySection"
import PriorityDialog, { priorityMap } from "./PriorityDialog"
import type { PriorityValue } from "./PriorityDialog"
import { useAppearance } from "./AppearenceProvider"
export interface Item {
  title: string
  id: string
  priority?: PriorityValue
}

export default function Page(): JSX.Element {
  const { appearance, toggleAppearance } = useAppearance()
  const [inputValue, setInputValue] = useState("")
  const [list, setList] = useState<Item[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Item | null>(null)

  const submit = () => {
    if (!inputValue) return
    const uuid = Math.random().toString(36).substring(7)
    const newTask = { title: inputValue, id: uuid }
    setList([...list, newTask])
    setCurrentTask(newTask)
    setDialogOpen(true)
    setInputValue("")
  }

  return (
    <Box className='full-height'>
      <Flex className={styles.header} justify='between' align='center' p='3'>
        <Heading>
          <Flex align='center'>
            <CrumpledPaperIcon height='28' width='28' color='steelblue' />
            <Text as='span' ml='3'>
              Crumpled - Task Arrangement Tool
            </Text>
          </Flex>
        </Heading>
        <Box
          className={styles["theme-trigger"]}
          onClick={() => {
            toggleAppearance()
          }}>
          {appearance === "light" ? <SunIcon /> : <MoonIcon />}
        </Box>
      </Flex>
      <Flex className={styles.inner} ml='3' mr='3' gap='3'>
        <Box width='max-content'>
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
            <TextField.Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='type the todo…'
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submit()
                }
              }}
            />
            <TextField.Slot>
              <IconButton
                onClick={() => {
                  submit()
                }}
                size='1'
                variant='ghost'>
                <ArrowRightIcon height='14' width='14' />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
          <Flex mt='3' direction='column' gap='2'>
            {list.map((item: Item) => {
              return (
                <Card key={item.id}>
                  <Flex justify={"between"} align={"center"}>
                    {item.title}
                    <CrossCircledIcon
                      onClick={() => {
                        setList(list.filter((i) => i.id !== item.id))
                      }}
                    />
                  </Flex>
                  {item.priority && (
                    <Text size='1' color='gray'>
                      {priorityMap[item.priority as PriorityValue]?.cnName}
                    </Text>
                  )}
                </Card>
              )
            })}
          </Flex>
        </Box>
        <Container height='100%' grow='1'>
          <PrioritySection list={list} />
        </Container>
      </Flex>
      {currentTask && (
        <PriorityDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          currentTask={currentTask}
          onSaveClick={(priortizedTask) => {
            setList(
              list.map((item) =>
                item.id === currentTask?.id
                  ? { ...item, priority: priortizedTask.priority }
                  : item
              )
            )
            console.log(list, "list")
            setDialogOpen(false)
          }}></PriorityDialog>
      )}
    </Box>
  )
}
