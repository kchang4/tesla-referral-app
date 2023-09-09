"use server";

export async function verifyCaptcha(token: string | null) {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`,
    { method: "POST" },
  );
  if (!res.ok) {
    throw new Error("Failed Captcha");
  }

  const data = await res.json();

  return !!data.success;
}
