"use client"

import { useState } from "react"
import {
  Heading,
  Box,
  Flex,
  Text,
  Button,
  Dialog,
  TextField,
  IconButton,
  Container,
  ArrowRightIcon,
  SunIcon,
  CrumpledPaperIcon,
  MoonIcon,
  FileTextIcon,
  BookmarkIcon,
} from "@repo/ui"
import styles from "./page.module.css"
import PrioritySection from "../components/PrioritySection"
import TodoList from "../components/TodoList"
import PriorityDialog from "../components/PriorityDialog"
import type { PriorityValue } from "../components/PriorityDialog"
import { useAppearance } from "../components/AppearenceProvider"
import { useBreakpoints } from "../hooks/useBreakpoints"

export interface Item {
  title: string
  id: string
  priority?: PriorityValue
}

export default function Page(): JSX.Element {
  const { appearance, toggleAppearance } = useAppearance()
  const { isXs, isSm } = useBreakpoints()

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
        <Flex align='center'>
          <CrumpledPaperIcon height='28' width='28' color='steelblue' />
          <Box ml='3'>
            <Heading>Crumpled</Heading>
            <Text as='p' size='1' color='gray'>
              Task Arrangement Tool
            </Text>
          </Box>
        </Flex>
        <Box
          className={styles["theme-trigger"]}
          onClick={() => {
            toggleAppearance()
          }}>
          {appearance === "light" ? <SunIcon /> : <MoonIcon />}
        </Box>
      </Flex>
      <Flex
        direction={{
          initial: "column",
          xs: "column",
          sm: "row",
        }}
        className={styles.inner}
        ml='3'
        mr='3'
        gap='3'>
        <Box
          width='100%'
          style={{
            maxWidth: "375px",
          }}>
          <TextField.Root>
            <TextField.Slot>
              <FileTextIcon />
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
          {isSm || isXs ? (
            <Box mt='3'>
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button variant='soft'>
                    <BookmarkIcon width='16' height='16' />
                    Show All Items
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content style={{ maxWidth: 450 }}>
                  <Dialog.Title>All Items</Dialog.Title>
                  <Flex mt='3' direction='column' gap='2'>
                    <TodoList
                      list={list}
                      onCloseIconClick={(item) => {
                        setList(list.filter((i) => i.id !== item.id))
                      }}
                    />
                  </Flex>
                  <Flex gap='3' mt='4' justify='end'>
                    <Dialog.Close>
                      <Button variant='soft' color='gray'>
                        Cancel
                      </Button>
                    </Dialog.Close>
                  </Flex>
                </Dialog.Content>
              </Dialog.Root>
            </Box>
          ) : (
            <Flex mt='3' direction='column' gap='2'>
              <TodoList
                list={list}
                onCloseIconClick={(item) => {
                  setList(list.filter((i) => i.id !== item.id))
                }}
              />
            </Flex>
          )}
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
