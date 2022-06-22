# Slevte`s chat
### Tiny chat builded with svelte for MTA-project (CEF)  

___
![image](https://user-images.githubusercontent.com/44904705/174923129-6570bea2-dd14-421e-b67a-799e50640f76.png)
___

Build with Svelte as learn-project and destined for MTA (GTA multiplayer) server.
Connection with server are supported with client-side and server-side events:

- Client sends events with MTA SDK (eg: `mta.triggerEvent()`)
- Server catch events and process data
- Server triggers events with `window.dispatchEvent(new CustomEvent(<Event>))`
- Client catch events with `window.addEventListener(<Event>)`
