import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CardStack from "@/components/cardstack";
import Cardsecond from "@/components/CourseStats";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto flex-grow ">
        <section className="pt-12 px-4">
          <p className="text-gray-600 text-md font-medium mb-3">
            Your SkillShikshya Journey
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            <span className="text-teal-600">Step </span>
            <span className="text-gray-900"> In.</span>
            <span className="text-teal-600"> Skill</span>
            <span className="text-gray-900"> Up.</span>
            <span className="text-teal-600"> Stand</span>
            <span className="text-gray-900"> Out.</span>

          </h1>
        </section>
        <CardStack />
                <section className="pt-12 px-4">
          <p className="text-gray-600 text-md font-medium mb-3">
            Explore our classes and master trending skills!          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            <span className="text-teal-600">Dive Into </span>
            <span className="text-gray-900"> What’s Hot Right Now! </span>

          </h1>
        </section>
        <Cardsecond />
      </main>
      <Footer />
    </>
  );
}
