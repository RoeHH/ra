import { Handlers } from "$fresh/server.ts";
import { MiddlewareState } from "../_middleware.ts";

const kv = await Deno.openKv();

export const handler: Handlers<any, MiddlewareState> = {
  async POST(req: Request, ctx) {  

    if(ctx.state.user === undefined) {
      return new Response("User not authenticated (SET Count)", {status: 401});
    }



    const json = await req.json();
    console.log(json);
    
    const count = json.count;

    await kv.set(["count", ctx.state.user.userId], count);
    console.log("count is "+ count);
    
    return new Response("res: count is "+ count);
  },
  async GET(req: Request, ctx) {
    if(ctx.state.user === undefined) {
      return new Response("User not authenticated (GET Count)", {status: 401});
    }
    return new Response("count is "+ (await kv.get(["count", ctx.state.user.userId])).value);
  }
};