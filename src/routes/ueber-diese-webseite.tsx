import { createFileRoute } from "@tanstack/react-router";
import { NavDrawer } from "@/components/NavDrawer";

export const Route = createFileRoute("/ueber-diese-webseite")({
  head: () => ({
    meta: [
      { title: "Wie wurde diese Webseite erstellt? – Yaroslav Serbinov" },
      {
        name: "description",
        content: "Hintergrund zur Entstehung dieser Webseite.",
      },
    ],
  }),
  component: AboutSitePage,
});

function AboutSitePage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <NavDrawer />

      {/* Декоративный фон, как на странице с отчетами */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--accent)_15%,transparent),transparent_70%)] pointer-events-none opacity-50" />

      <div className="relative max-w-4xl mx-auto px-6 py-24 sm:py-32">
        <div className="mb-12 animate-[fadeUp_0.8s_ease-out]">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4 font-medium">Making of</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Wie wurde diese Webseite erstellt?
          </h1>
          
          <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
            <p>
              Um meine Fähigkeiten im Bereich der Informatik praktisch zu demonstrieren, habe ich beschlossen, meinen Lebenslauf nicht nur als einfaches PDF-Dokument abzugeben, sondern eine komplette, interaktive Webseite dafür zu programmieren.
            </p>
            <p>
              Ich habe dabei bewusst auf fertige Baukasten-Systeme (wie WordPress oder Wix) verzichtet und stattdessen die Webseite von Grund auf selbst geschrieben. Dabei kamen moderne Technologien zum Einsatz, die heute in der professionellen Webentwicklung Standard sind:
            </p>
          </div>
        </div>

        {/* Карточки с технологиями */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12 animate-[fadeUp_1s_ease-out_0.2s_both]">
          
          {/* React Card */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-[#61DAFB]/50 hover:shadow-[0_10px_40px_-15px_rgba(97,218,251,0.3)] transition-all duration-300">
            <div className="h-24 w-24 mb-4 flex items-center justify-center bg-[#61DAFB]/10 rounded-full p-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" 
                alt="React Logo" 
                className="w-full h-full object-contain animate-[spin_10s_linear_infinite]" 
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">React</h3>
            <p className="text-sm text-muted-foreground">
              Eine sehr beliebte JavaScript-Bibliothek für den Aufbau von interaktiven Benutzeroberflächen. Damit wurden die Fenster, Animationen und die gesamte Struktur aufgebaut.
            </p>
          </div>

          {/* Node.js Card */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-[#339933]/50 hover:shadow-[0_10px_40px_-15px_rgba(51,153,51,0.3)] transition-all duration-300">
            <div className="h-24 w-24 mb-4 flex items-center justify-center bg-[White] rounded-full p-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" 
                alt="Node.js Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Node.js</h3>
            <p className="text-sm text-muted-foreground">
              Eine Laufzeitumgebung, die es ermöglicht, JavaScript ausserhalb des Browsers auszuführen. Ich habe sie genutzt, um die Entwicklungsumgebung und die Infrastruktur im Hintergrund zu betreiben.
            </p>
          </div>

        </div>

        <div className="animate-[fadeUp_1s_ease-out_0.4s_both]">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Zusätzlich habe ich für das visuelle Design <strong>Tailwind CSS</strong> verwendet. Dies ermöglichte mir, das dunkle, moderne Layout mit den feinen Animationen (wie den leuchtenden Partikeln im Hintergrund oder den interaktiven Modalfenstern) komplett selbst zu gestalten.
          </p>
        </div>

      </div>
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Yaroslav Serbinov · Schwyz, Schweiz
      </footer>
    </main>
  );
}