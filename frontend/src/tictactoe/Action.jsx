import React from "react"

export const MOVE = "MOVE"
export const move = (player, index) => ({
    type: move,
    player,
    index,
})

export const ADD_PLAYER = "ADD_PLAYER"
export const addPlayer = (name, token) => ({
    type: ADD_PLAYER,
    name,
    token
})