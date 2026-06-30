import Nav from './Nav';
import Footer from './Footer';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="page-enter">{children}</main>
      <Footer />
    </>
  );
}
