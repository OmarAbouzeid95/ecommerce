import {createContext} from 'react'

const countContext = createContext()
const currentLoc = createContext()
const previousLoc = createContext()
const loggedUser = createContext()

export {countContext, currentLoc, loggedUser, previousLoc}