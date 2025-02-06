import {
  setCookie,
} from "https://deno.land/std@0.146.0/http/cookie.ts";
import { oauth2Client } from "../utils/oauth2.ts";

export const handler = async (req: Request): Promise<Response> => {
  const { searchParams, origin } = new URL(req.url);

  const code = searchParams.get("code");
  if (!code) {
    return Response.redirect(oauth2Client.code.getAuthorizationUri(), 302);
  }

  const accessToken = (await oauth2Client.code.getToken(req.url)).accessToken;

  searchParams.delete("code");

  const response = new Response(undefined, {
    status: 302,
    headers: { "location": origin },
  });

  setCookie(response.headers, {
    name: "gh_token",
    value: accessToken,
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });

  return response;
};