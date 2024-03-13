import { atom } from "jotai"
import type { Item } from "../app/page"

export const listAtom = atom<Item[]>([])

export const listDisplaySetting = atom({
  showDoneTasks: true,
})
