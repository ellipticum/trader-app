import { createContext, Dispatch, FC, SetStateAction, useState } from 'react'
import { LayoutProps } from '../../shared/interfaces/layoutProps'
import { createContextHook } from '../../shared/helpers/createContextHook'

interface IPopupsContext {
    isTaskPopupHidden: boolean
    setIsTaskPopupHidden: Dispatch<SetStateAction<boolean>>
    isProjectPopupHidden: boolean
    setIsProjectPopupHidden: Dispatch<SetStateAction<boolean>>
    isEditProjectPopupHidden: boolean
    setIsEditProjectPopupHidden: Dispatch<SetStateAction<boolean>>
    isEditTaskPopupHidden: boolean
    setIsEditTaskPopupHidden: Dispatch<SetStateAction<boolean>>
}

const PopupsContext = createContext<IPopupsContext | undefined>(undefined)

export const usePopups = createContextHook(PopupsContext)

const PopupsProvider: FC<LayoutProps> = ({ children }) => {
    const [isTaskPopupHidden, setIsTaskPopupHidden] = useState<boolean>(true)
    const [isProjectPopupHidden, setIsProjectPopupHidden] = useState<boolean>(true)
    const [isEditProjectPopupHidden, setIsEditProjectPopupHidden] = useState<boolean>(true)
    const [isEditTaskPopupHidden, setIsEditTaskPopupHidden] = useState<boolean>(true)

    return (
        <PopupsContext.Provider
            value={{
                isTaskPopupHidden,
                setIsTaskPopupHidden,
                isProjectPopupHidden,
                setIsProjectPopupHidden,
                isEditProjectPopupHidden,
                setIsEditProjectPopupHidden,
                isEditTaskPopupHidden,
                setIsEditTaskPopupHidden
            }}
        >
            {children}
        </PopupsContext.Provider>
    )
}

export default PopupsProvider
