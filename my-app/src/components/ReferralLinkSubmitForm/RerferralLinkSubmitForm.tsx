"use client";

import { verifyCaptcha } from "@/server-actions/verifyCaptcha";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { ReferralLink } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useRef, useState } from "react";
import ReCaptcha from "react-google-recaptcha";
import CopyToClipboardButton from "../CopyToClipboardButton/CopytoClipboardButton";

export type ReferralLinkFormData = {
  referralLink: string;
  firstName: string;
  middleName: string;
  lastName: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

export function ReferralLinkSubmitForm() {
  const recaptchaRef = useRef<ReCaptcha>(null);
  const router = useRouter();

  const [referralLink, setReferralLink] = useState<ReferralLink | null>(null);
  const [verified, setVerified] = useState<boolean>(false);
  const [form, setForm] = useState<ReferralLinkFormData>({
    referralLink: "",
    firstName: "",
    middleName: "",
    lastName: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const formToPostBody = () => {
    const postBody: {
      referral_link: string;
      first_name?: string;
      middle_name?: string;
      last_name?: string;
      city?: string;
      state?: string;
      country?: string;
      zip_code?: string;
    } = {
      referral_link: form.referralLink,
    };

    if (form.firstName) {
      postBody.first_name = form.firstName;
    }

    if (form.lastName) {
      postBody.last_name = form.lastName;
    }

    if (form.middleName) {
      postBody.middle_name = form.middleName;
    }

    if (form.city) {
      postBody.city = form.city;
    }

    if (form.state) {
      postBody.state = form.state;
    }

    if (form.country) {
      postBody.country = form.country;
    }

    if (form.zipCode) {
      postBody.zip_code = form.zipCode;
    }

    return postBody;
  };

  const handleCaptchaSubmission = async (token: string | null) => {
    setVerified(await verifyCaptcha(token));
  };

  const onSubmitForm = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/referral-link", {
      method: "POST",
      body: JSON.stringify(formToPostBody()),
    });
    if (!res.ok) {
      throw new Error("Couldn't submit referral link");
    }

    const data = await res.json();
    setReferralLink(data);
  };

  if (referralLink) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          Referral Link Submitted!
          <br />
          Please keep this secret code so you can edit your referral link later
        </Typography>
        <br />
        <Card variant="outlined" sx={{ backgroundColor: "#eee" }}>
          <CardContent>{referralLink.secret}</CardContent>
          <CardActions>
            <CopyToClipboardButton text={referralLink.secret} />
          </CardActions>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={onSubmitForm}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <Box sx={{ margin: 1 }}>
        <TextField
          fullWidth
          placeholder="Example: https://ts.la/khai39484 or https://www.tesla.com/referral/khai39484"
          label="Referral Link"
          onChange={(e) =>
            setForm({ ...form, referralLink: e.target.value || "" })
          }
          required
        />
      </Box>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          margin: 1,
          gap: 1,
        }}
      >
        <TextField
          label="First Name"
          sx={{ flexGrow: 3 }}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value || "" })
          }
        />
        <TextField
          label="Middle Name"
          sx={{ flexGrow: 1 }}
          onChange={(e) =>
            setForm({ ...form, middleName: e.target.value || "" })
          }
        />
        <TextField
          label="Last Name"
          sx={{ flexGrow: 3 }}
          onChange={(e) => setForm({ ...form, lastName: e.target.value || "" })}
        />
      </Box>
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <Box sx={{ margin: 1, alignSelf: "center" }}>
          <ReCaptcha
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
          />
        </Box>
      )}
      <Button
        type="submit"
        variant="contained"
        disabled={!verified || !form.referralLink || !!referralLink}
      >
        Submit
      </Button>
    </Box>
  );
}
