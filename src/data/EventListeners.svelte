<script>
//    There should be event-listeners to interact Lua with JS
//    Now developed event-listeners are removed for confidentially (data are mocked up)
//
//    -------------
//
//    FEW EXAMPLES:
//    window.addEventListener("setCurrentPlayerName", (e) => {
//        eventLogger(e, "setCurrentPlayerName")
//        $currentPlayerName = e.detail.data.trim()
//    })
//
//    window.addEventListener("setChatMessages", (e) => {
//        eventLogger(e, "setChatMessages")
//        const [to, ...data] = e.detail.data.split(";")
//
//        if (to === $selectedChat) {
//            selectedChatMessages.set(JSON.parse(data.join("").replaceAll("\n", '<br>'))[0])
//        } else {
//            console.error("Messages are received, but selected chat not matched with received chat!\n" + "Selected chat: " + $selectedChat + "\nReceived chat: " + to)
//        }
//    })
</script>
