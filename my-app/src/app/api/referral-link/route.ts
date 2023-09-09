import prisma from "@/lib/prisma";
import { ObjectId } from "bson";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

const ReferralLinkDto = z.object({
  referral_link: z.string(),
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zip_code: z.string().optional(),
});

const DEFAULT_DATA = {
  first_name: "",
  middle_name: "",
  last_name: "",
  city: "",
  state: "",
  country: "",
  zip_code: "",
};

export async function GET() {
  const referralLinks = await prisma.referralLink.findMany();

  return NextResponse.json(referralLinks, { status: 200 });
}

export async function POST(req: Request) {
  const parsedBody = ReferralLinkDto.safeParse(await req.json());
  if (!parsedBody.success) {
    return NextResponse.json(parsedBody.error, {
      status: 400,
      statusText: "Invalid post body",
    });
  }

  const currentDate = new Date();
  const data = {
    ...DEFAULT_DATA,
    ...parsedBody.data,
    id: new ObjectId().toHexString(),
    created_date: currentDate,
    modified_date: currentDate,
    secret: randomBytes(32).toString("hex"),
    use_count: 0,
  };

  const res = await prisma.referralLink.create({
    data,
  });

  return NextResponse.json(res, { status: 201 });
}
