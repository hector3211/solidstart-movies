import { APIEvent, json } from "solid-start";
import { getUser } from "~/utils/dbActions";

export async function GET({ request }: APIEvent) {
  const user = await getUser(request);
  if (!user) {
    console.log(`Failed to get user From you api route session!`);
    throw new Response("Failed to get user From you api route session!");
  }

  return json({ user });
}
