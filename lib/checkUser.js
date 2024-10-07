import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }
  try {
    const loggedInUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;
    const userName = name.split(" ").join("-") + user.id.slice(-4);
    await clerkClient().users.updateUser(user.id, {
      username: userName,
    });

    const newUser = await db.User.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        username: userName,
      },
    });
    return newUser;
  } catch (error) {
    console.error(error);
  }
};
