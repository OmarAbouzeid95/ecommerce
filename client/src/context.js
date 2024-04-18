import { createContext } from "react";

const countContext = createContext();
const currentLoc = createContext();
const previousLoc = createContext();
const loggedUser = createContext();
const stripeContext = createContext();

export { countContext, currentLoc, loggedUser, previousLoc, stripeContext };
