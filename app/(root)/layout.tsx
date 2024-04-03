import { Footer, Navbar } from "@/components";

const LayoutRoot = ({
  children,
}: {
  children: React.ReactNode;
})  => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export default LayoutRoot