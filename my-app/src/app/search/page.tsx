import ReferralList from "@/components/ReferralList/ReferralList";
import { Box } from "@mui/material";
import { ReferralLink } from "@prisma/client";

async function getData(): Promise<ReferralLink[]> {
  const res = await fetch("http://localhost:3000/api/referral-link");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function SearchPage() {
  const items = await getData();

  return (
    <Box>
      <ReferralList items={items} />
    </Box>
  );
}
