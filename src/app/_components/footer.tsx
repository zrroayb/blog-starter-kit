import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800 dark:border-slate-700">
      <Container>
        <div className="py-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Your Blog Name. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
