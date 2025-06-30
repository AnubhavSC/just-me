import Navbar from "@/components/NavBar";
import Dashboard from "@/components/Dashboad";

export default function Home() {
  return (
    <div>
      <main className="">
        <section>
          <Navbar />
        </section>
        <section >
          <Dashboard />
        </section>
      </main>
    </div>
  );
}
