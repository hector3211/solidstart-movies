import { APIEvent, json } from "solid-start";
import { getUser, logInDrizzle } from "~/utils/dbActions";

export async function GET({ params, request }: APIEvent) {
  const userEmail = params.email as string;
  const resp = await logInDrizzle(userEmail);
  if (!resp) {
    return new Response(`User with email ${userEmail} Not Found`, {
      status: 404,
    });
  }

  return json({ resp });
}
