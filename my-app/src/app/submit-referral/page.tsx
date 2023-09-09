import Header from "@/components/Header/Header";
import { ReferralLinkSubmitForm } from "@/components/ReferralLinkSubmitForm/RerferralLinkSubmitForm";
import { Box } from "@mui/material";
import { NextPage } from "next";

const SubmitReferralPage: NextPage = () => {
  return (
    <Box>
      <ReferralLinkSubmitForm />
    </Box>
  );
};

export default SubmitReferralPage;
