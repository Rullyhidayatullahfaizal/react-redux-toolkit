import FooterPage from "./footer";
import { HeaderPage } from "./header";

export default function Layout({ children }) {
    return(
        <>
            <HeaderPage />
         
            <main className="max-w-screen-xl mx-auto mt-20 p-4">
                {children}
            </main>
            <FooterPage />
        </>
    )
}