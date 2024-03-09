"use client"

import React, { createContext, useContext, useState } from "react"
import type { PropsWithChildren } from "react"
import { Theme } from "@repo/ui"

const defaultValue = {
  appearance: "light",
  toggleAppearance: () => {},
}
// Create a new context
export const AppearanceContext = createContext(defaultValue)

// Create a provider component
export const AppearanceProvider = ({ children }: PropsWithChildren) => {
  const [appearance, setAppearance] = useState<any>("light")

  // Function to toggle the appearance state
  const toggleAppearance = () => {
    setAppearance((prevAppearance: any) =>
      prevAppearance === "light" ? "dark" : "light"
    )
  }

  // Value object to be provided by the context
  const contextValue = {
    appearance,
    toggleAppearance,
  }

  return (
    <AppearanceContext.Provider value={contextValue}>
      <Theme
        className='full-height'
        panelBackground='translucent'
        appearance={appearance}>
        {children}
      </Theme>
    </AppearanceContext.Provider>
  )
}

export const useAppearance = () => {
  const { appearance, toggleAppearance } = useContext(AppearanceContext)
  return { appearance, toggleAppearance }
}
