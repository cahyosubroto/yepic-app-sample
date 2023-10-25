import { NextResponse } from "next/server";

export async function GET(req) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-Api-Key': process.env.API_KEY_YEPIC
    },
  };

  try {
    const response = await fetch(`https://api.yepic.ai/v1/avatars?PageSize=25&Page=1`, options);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}