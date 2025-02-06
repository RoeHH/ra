import { Handlers } from "$fresh/server.ts";
import { deleteCookie, setCookie } from "https://deno.land/std@0.195.0/http/cookie.ts";

export const handler: Handlers<> = {
  GET(req, ctx) {
    const response = new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    }); 
    console.log("logout");
    
    deleteCookie(response.headers, "gh_token");
    return response
  }
};