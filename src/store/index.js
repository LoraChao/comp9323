import React from "react";
import IndividualFollowCompany from "./individualFollowCompany.Store";

class RootStore {
    constructor(){
        this.IndividualFollowCompany = new IndividualFollowCompany();
    }
}

const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }