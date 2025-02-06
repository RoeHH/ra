import { FreshContext } from "$fresh/server.ts";
import {
  getCookies,
} from "https://deno.land/std@0.146.0/http/cookie.ts";
import { gitHubApi, User } from "../utils/oauth2.ts";
const kv = await Deno.openKv();

export interface MiddlewareState {
  user: User | undefined;
}

export async function handler(
  req: Request,
  ctx: FreshContext<MiddlewareState>,
) {

  const maybeAccessToken = getCookies(req.headers)["gh_token"];
  if (maybeAccessToken) {

    const user = await gitHubApi.getAdminOrFuckOf(maybeAccessToken);    
    if (user) {
      ctx.state.user = user;
      return await ctx.next();
    }
  }
  
  return await ctx.next();
}
