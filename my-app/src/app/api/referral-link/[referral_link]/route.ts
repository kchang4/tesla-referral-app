import prisma from "@/lib/prisma";
import { ObjectId } from "bson";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { referral_link: string } },
) {
  const { referral_link } = params;
  if (!referral_link || !ObjectId.isValid(referral_link)) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const referralLink = await prisma.referralLink.findUnique({
    where: { id: referral_link },
  });
  if (!referralLink) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(referralLink);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { referral_link: string } },
) {
  const { referral_link } = params;
  if (!referral_link || !ObjectId.isValid(referral_link)) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  let data;
  let secret;

  try {
    data = await req.json();
    if (!data || !data.secret) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 400 });
    }
    secret = data.secret;
  } catch (err) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const referralLink = await prisma.referralLink.findUnique({
    where: { id: referral_link },
  });
  if (!referralLink) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  } else if (referralLink.secret !== secret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 400 });
  }

  // update

  return NextResponse.json({});
}
