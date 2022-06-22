import {writable} from "svelte/store";

export const currentPlayerName = writable("Apollo")
export const currentPlayerWriteStatus = writable(false)
export const currentPlayerSound = writable(true)
export const selectedChatWriteStatus = writable(false)
export const players = writable([{name: "overcreated"}, {name: "Alex Maronov"}, {name: "siailya"}])
export const unreadPlayers = writable(["overcreated"])
export const selectedChat = writable("public_channel")
export const selectedChatMessages = writable([
    {from: "public_channel", text: "Hello! It's example message from public channel in chat, written in Svelte!", datetime: new Date().getTime()},
    {from: "public_channel", text: "And one more tiny message", datetime: new Date().getTime()}
])
export const messageInput = writable("")

