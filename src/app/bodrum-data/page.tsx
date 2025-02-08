import Container from "@/app/_components/container";
import { BodrumDataTable } from "@/app/_components/bodrum-data-table";
import Header from "@/app/_components/header";

export default function BodrumData() {
  return (
    <main>
      <Container>
        <Header />
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">
            Bodrum Nüfus Verileri
          </h1>
          <div className="mb-8 md:mb-16">
            <BodrumDataTable />
          </div>
        </div>
      </Container>
    </main>
  );
} 