import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight">
              Reach Us
            </h3>
            <p className="text-lg leading-relaxed mt-4 mb-10">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <Link
              href="mailto:contact@example.com"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Email Us
            </Link>
            <Link
              href="/contact"
              className="mx-3 font-bold hover:underline"
            >
              View Contact Details
            </Link>
          </div>
        </div>
        <div className="py-4 text-center text-sm border-t border-neutral-200">
          <p>© {new Date().getFullYear()} Your Blog Name. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
