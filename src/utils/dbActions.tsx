import { eq } from "drizzle-orm";
import { createCookieSessionStorage, redirect } from "solid-start";
import { db, NewUser, UsersTable } from "../utils/drizzle";

export async function signUpDrizzle(email: string) {
  console.log(`SingUp Drizzle function called with email - ${email}!`);
  const newUser: NewUser = {
    email: email,
  };

  const insert = await db.insert(UsersTable).values(newUser).returning();
  if (!insert) {
    return;
  }
  console.log(`SingUp Drizzle Inserted new User - ${email}`);
  return insert as User;
}

export async function logInDrizzle(email: string) {
  const user: User[] = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.email, email));
  if (!user) {
    console.log(`No User in System with - ${email}`);
    return;
  }
  const session = await storage.getSession();
  session.set("userInfo", user);

  return user;
}

export async function logoutUser(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  console.log(`LoutOut User function activated`);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "HO_session",
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: true,
    secrets: [import.meta.env.VITE_SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  console.log(`userID - ${userId} from getUser in dbActions.tsx`); // this is null
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await logInDrizzle(userId);
    console.log(`GetUser function made it to logInDrizzle function`);
    if (!user) {
      console.log(`No User in System with - ${userId}`);
      return;
    }
    return user[0];
  } catch (error) {
    throw logoutUser(request);
  }
}

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function createUserSession(userEmail: string) {
  const session = await storage.getSession();
  console.log(
    `When creating session here is the email passed to it -${userEmail}\n`
  );
  session.set("userId", userEmail);
  console.log(`session --- ${session.get("userId")}\n`);
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
