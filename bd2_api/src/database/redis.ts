import redis from "redis"

async function start() {
    //@ts-ignore
    const client = redis.createClient(6379,"host")
    await client.connect()

    await client.set("mykey", "Hello from node redis")
    const myKeyValue = await client.get("mykey")
    console.log(myKeyValue)
}

start()