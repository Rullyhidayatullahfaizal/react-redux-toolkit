import { useRouter } from "next/router";
import FooterPage from "./footer";
import { HeaderPage } from "./header";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/auth/login";

  return (
    <>
      {!isLoginPage && <HeaderPage />}

      <main
        className={` mx-auto p-4 ${!isLoginPage ? "mt-20 max-w-screen-2xl" : "bg-black"} `}
      >
        {children}
      </main>
      {!isLoginPage && <FooterPage />}
    </>
  );
}
