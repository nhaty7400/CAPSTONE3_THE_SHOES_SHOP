import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import ScrollToTop from "src/components/scroll-to-top";

function BaseTemplate() {
  return (
    <ScrollToTop>
      <Header />
      {/* Susoense + Lazy load: trong quá trình đợi download file js về thì render ra component fallback. Khi nào xong thì render ra vào chỗ Outlet */}
      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>
      <Footer />
    </ScrollToTop>
  );
}

export default BaseTemplate;
