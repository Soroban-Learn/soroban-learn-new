import { NextResponse, NextRequest } from "next/server";

type UserData = {
  username: string;
  email: string;
};

export const POST = async (request: NextRequest) => {
  if (!request) return;
  const body = await request.json();

  console.log({ body });
  // const res = await fetch(
  //   `https://forum.sorobanlearn.com/register/setauthtoken?type=json&apikey=${process.env.FORUM_API_KEY}&user=${username}&email=${email}`
  // );
  // const data = await res.json();

  // return Response.json({ data });
};
