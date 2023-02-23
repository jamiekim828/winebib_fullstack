import axios from 'axios'

import { AppDispatch } from '../store'
import {wineActions} from '../slices/wine'

const url = 'http://localhost:8000'

export function getAllWines() {
    return async (dispatch:AppDispatch) => {
        const response = await axios.get(`${url}/product`)
        const wineData = await response.data
        console.log(wineData)
        dispatch(wineActions.getWienList(wineData))
    }
}

export function getOneWineThunk(id:string|undefined) {
    return async(dispatch:AppDispatch)=> {
        const response = await axios.get(`${url}/product/${id}`)
        const wineData = await response.data
        dispatch(wineActions.getOneWine(wineData))
    }
}