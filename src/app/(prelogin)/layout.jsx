import Header from "@/layout/header"
import Footer from "@/layout/footer"

export default function PreloginLayout({ children }) {
    return (
        <>
            <Header />

            {children}

            <Footer />
        </>
    )
}