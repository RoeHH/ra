import { Handlers } from "$fresh/server.ts";

const kv = await Deno.openKv();

export const handler: Handlers = {
  async POST(req: Request, ctx) {  
    const json = await req.json();
    console.log(json);
    
    const count = json.count;

    await kv.set(["count"], count);
    console.log("count is "+ count);
    
    return new Response("res: count is "+ count);
  },
  async GET(req: Request, ctx) {
    return new Response("count is "+ (await kv.get("count")).value);
  }
};