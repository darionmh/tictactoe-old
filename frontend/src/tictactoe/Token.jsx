import React from "react"

export const circle = {
    id: 1,
    label: "Circle",
    img: ""
}

export const cross = {
    id: 2,
    label: "Cross",
    img: ""
}

export const tokens = [circle, cross]

export const getTokenById = (id) => tokens.find(it => it.id === id)