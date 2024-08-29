/**
 * This code was generated by v0 by Vercel.
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Libre_Franklin } from 'next/font/google'
import { Chivo } from 'next/font/google'

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

chivo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginRedux } from "@/store/authSlice";

export function CardLogin() {
  const router = useRouter();
  const dispatch = useDispatch()
  const [isLoding, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target;
    const formData = new FormData(form);
    console.log("FormData:", formData.get("username"), formData.get("password"));
    const formJson = Object.fromEntries(formData.entries());

    const { username, password } = formJson;

    const userLogin = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        // expiresInMins: 30, // optional, defaults to 60
      }),
    });
    const user = await userLogin.json();

    dispatch(userLoginRedux(user))
    localStorage.setItem('token',user.token)

    console.log("user", user);
    setIsLoading(false);
    router.push('/products')
  };

  const datafromRedux = useSelector((state) => state.auth.value);
  console.log("dari redux",datafromRedux)


  // username: 'emilys',
  // password: 'emilyspass',

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <Image
            src="/icons8-linkedin.svg"
            alt="LinkedIn"
            width={100}
            height={30}
            className="h-auto"
            style={{ aspectRatio: "100/30", objectFit: "cover" }}
          />
        </div>
        <Card>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Email or Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  placeholder="Enter your email or username"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoding}>
                {isLoding ? "Logging...." : "Sign In"}
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-[1px] flex-1 bg-border" />
                <span className="text-muted-foreground">or</span>
                <div className="h-[1px] flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full">
                  <ChromeIcon className="mr-2 h-5 w-5" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <AppleIcon className="mr-2 h-5 w-5" />
                  Apple
                </Button>
              </div>
            </CardContent>
          </form>

          <CardFooter className="text-center text-sm text-muted-foreground">
            New to LinkedIn?{" "}
            <Link
              href="#"
              className="text-primary hover:underline"
              prefetch={false}
            >
              Create account
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function AppleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
