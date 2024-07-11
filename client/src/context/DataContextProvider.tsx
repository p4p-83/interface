'use client'

import { createContext, useEffect, useState, useCallback, type ReactNode, type Dispatch, type SetStateAction, useMemo } from 'react'

type SettingsData = {
  urls: {
    whepVideoUrl: string;
    webSocketUrl: string;
  };
}

type DataSetter<T> = (value: T) => void;

type IDataContext = {
  clearAllData: () => void;
  settingsData: SettingsData;
  setSettingsData: DataSetter<SettingsData>;
}

const NULL_FUNCTION = () => null

const defaultValues: IDataContext = {
  clearAllData: NULL_FUNCTION,
  settingsData: {
    urls: {
      whepVideoUrl: 'http://0.0.0.0:8889/cm3/whep',
      webSocketUrl: 'ws://0.0.0.0:8080',
    },
  },
  setSettingsData: NULL_FUNCTION,
}

export const DataContext = createContext<IDataContext>(defaultValues)

type DataContextProviderProps = {
  children: ReactNode;
}

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [settingsData, setSettingsData] = useLocalStorage('settingsData', defaultValues.settingsData)

  const clearAllData = useCallback(() => {
    localStorage.clear()
    setSettingsData(defaultValues.settingsData)
  }, [setSettingsData])

  const context: IDataContext = useMemo(() => ({
    clearAllData,
    settingsData,
    setSettingsData,
  }), [
    clearAllData,
    settingsData,
    setSettingsData,
  ])

  return (
    <DataContext.Provider value={context}>
      {children}
    </DataContext.Provider>
  )
}

function useLocalStorage<K extends keyof IDataContext>(key: K, defaultValue: IDataContext[K]): [
  IDataContext[K],
  Dispatch<SetStateAction<IDataContext[K]>>
] {
  const [value, setValue] = useState(() => {
    try {
      const data = window.localStorage.getItem(key)
      return (data)
        ? JSON.parse(data) as IDataContext[K]
        : defaultValue
    }
    catch {
      return defaultValue
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, setValue, value])

  return [value, setValue]
}
