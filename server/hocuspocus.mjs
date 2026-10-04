import { Server } from "@hocuspocus/server"

const port = Number(process.env.COLLAB_PORT ?? 43124)

const server = new Server({
  port,
  address: "0.0.0.0",
  name: "jr-tab-builder",
})

await server.listen()
console.log(`Hocuspocus listening on ws://0.0.0.0:${port}`)
