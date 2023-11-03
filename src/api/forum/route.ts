import { NextResponse, NextRequest } from "next/server";

type UserData = {
  username: string;
  email: string;
};

export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
 
  return Response.json({ data })
}

  // if (!request) return;
  // const body = await request.json();

  // console.log({ body });
  // const res = await fetch(
  //   `https://forum.sorobanlearn.com/register/setauthtoken?type=json&apikey=${process.env.FORUM_API_KEY}&user=${username}&email=${email}`
  // );
  // const data = await res.json();

  // return Response.json({ data });
// };
