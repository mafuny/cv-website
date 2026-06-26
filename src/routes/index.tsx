import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import portrait from "@/assets/yaroslav-portrait.png";
import { NavDrawer } from "@/components/NavDrawer";

// --- ТИПЫ И ДАННЫЕ ДЛЯ SCHNUPPERLEHREN ---
type Schnupperlehre = {
  id: string;
  date: string;
  title: string;
  place: string;
  description: string;
  pdfUrl: string;
  addressForMap: string;
};

const schnupperlehrenData: Schnupperlehre[] = [
  {
    id: "druck",
    date: "01.–02.06.2026",
    title: "Druckausrüster EFZ",
    place: "Triner AG, 6430 Schwyz",
    description: "Ich habe sehr viele verschiedene Aufträge erledigt. Z. B. habe ich Falzmaschinen, Schneidemaschinen und Druckmaschinen bedient. Es war interessant, aber auch ein bisschen anstrengend. Man muss den ganzen Tag stehen und es gibt auch sehr viel Lärm. Das ist einfach nicht mein Job.",
    pdfUrl: new URL("../assets/pdf/schnupper/triner.pdf", import.meta.url).href,
    addressForMap: "Triner AG, Schwyz",
  },
  {
    id: "garten",
    date: "26.05.2026",
    title: "Landschaftsgärtner EFZ",
    place: "Bucher Gärten, 8832 Wilen bei Wollerau",
    description: "Einmal sich als Landschaftsgärtner probieren auch nicht so schlecht, aber auch nicht für mich. Ich habe mit Rasenmäher gearbeitet, auch mit einem Trimer.",
    pdfUrl: new URL("../assets/pdf/schnupper/bucher.pdf", import.meta.url).href,
    addressForMap: "Bucher Gärten, Wilen bei Wollerau",
  },
  {
    id: "ict",
    date: "05.–06.02.2026",
    title: "ICT-Fachmann EFZ",
    place: "Amt für Informatik, 6430 Schwyz",
    description: "Diese Schnupperlehre hat mir sehr gefallen, weil das eigentlich einer meiner Traumberufe ist. Die Aufträge waren sehr interessant und spannend. Aber die Leute haben mir gesagt, dass ich mich besser als Informatiker eigne, deshalb habe ich eine Absage bekommen. :(",
    pdfUrl: new URL("../assets/pdf/schnupper/afi.pdf", import.meta.url).href,
    addressForMap: "Amt für Informatik, Schwyz",
  },
  {
    id: "multi",
    date: "27.–28.10.2025",
    title: "Multimediaelektroniker EFZ",
    place: "enz audio video AG, 6010 Kriens",
    description: "In dieser Schnupperlehre war ich sehr viel bei Kunden unterwegs. Ich habe Audio-Systeme gesteuert und installiert. Es war auch sehr cool, aber leider habe ich eine Absage bekommen.",
    pdfUrl: new URL("../assets/pdf/schnupper/enz.pdf", import.meta.url).href,
    addressForMap: "enz audio video AG, Kriens",
  },
  {
    id: "gebaeude",
    date: "13.10.2025",
    title: "Gebäudeinformatiker EFZ",
    place: "ComDataNet AG, 6460 Altdorf",
    description: "War meine erste Schnupperlehre, habe ich ein wenig angst gehabt, aber troztdem nicht schlecht gemacht. Ich habe Telefonsysteme gesteuert, hat mir gut gefallen.",
    pdfUrl: new URL("../assets/pdf/schnupper/comdatanet.pdf", import.meta.url).href,
    addressForMap: "ComDataNet AG, Altdorf",
  },
];

// --- ТИПЫ И ДАННЫЕ ДЛЯ SCHULBILDUNG ---
type Schulbildung = {
  id: string;
  date: string;
  title: string;
  place: string;
  description: string;
  pdfUrl: string;
  photoUrl: string;
  addressForMap: string;
};

const schulbildungData: Schulbildung[] = [
  {
    id: "bbzp_iba",
    date: "2025 – heute",
    title: "Berufsbildungszentrum Pfäffikon, 2025 IBA, 2026 KBA",
    place: "Römerrain 9, 8808 Pfäffikon SZ",
    description: "Ich besuche das Berufsbildungszentrum Pfäffikon schon seit 2025. Ich habe das IBA (Integratives Brückenangebot) besucht und werde im Jahr 2026 das KBA (Kombiniertes Brückenangebot) besuchen, weil ich leider im Jahr 2026 keine Lehrstelle gefunden habe.",
    pdfUrl: new URL("../assets/pdf/diplomas/bbzp_iba.pdf", import.meta.url).href,
    photoUrl: new URL("../assets/bbzp.jpg", import.meta.url).href,
    addressForMap: "Berufsbildungszentrum Pfäffikon, Pfäffikon SZ",
  },
  {
    id: "college",
    date: "2022 - 2026",
    title: "Professionelle Hochschule für Kommunikation und Informierung, Junior Bachelor 'Software Engineering'",
    place: "Odessa, Ukraine",
    description: "Ich habe mein Studium erfolgreich abgeschlossen und das Junior Bachelor Diplom in Software Engineering erhalten. Ich habe viele verschiedene Programmiersprachen gelernt, wie z.B. Java, C++, Python, JavaScript, TypeScript, HTML, CSS und viele andere. Jetzt möchte ich meine Kenntnisse noch weiter vertiefen und eine Lehre machen, um einen schweizerischen Abschluss zu erhalten.",
    pdfUrl: new URL("../assets/pdf/diplomas/diploma_college.pdf", import.meta.url).href,
    photoUrl: new URL("../assets/odessa.jpg", import.meta.url).href,
    addressForMap: "College of Communication and Informatization of ONAT, Odessa, Ukraine",
  },
  {
    id: "aoz",
    date: "2024 – 2025",
    title: "AOZ Rickenbach, Deutschkurs",
    place: "Rickenbach SZ",
    description: "",
    pdfUrl: "",
    photoUrl: "",
    addressForMap: "",
  },
  {
    id: "lyzeum",
    date: "2013 – 2022",
    title: "Lyzeum Nr. 117, Primar- und Sekundarschule",
    place: "Odessa, Ukraine",
    description: "",
    pdfUrl: "",
    photoUrl: "",
    addressForMap: "",
  }
];

// --- КОМПОНЕНТЫ АНИМАЦИИ И СЕКЦИЙ ---
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yaroslav Serbinov – Lebenslauf | Bewerbung Lehrstelle ICT" },
      {
        name: "description",
        content:
          "Online-Lebenslauf von Yaroslav Serbinov – Bewerbung für eine Lehrstelle als ICT-Fachmann in der Schweiz.",
      },
      { property: "og:title", content: "Yaroslav Serbinov – Lebenslauf" },
      {
        property: "og:description",
        content: "Bewerbung für eine Lehrstelle als ICT-Fachmann in der Schweiz.",
      },
    ],
  }),
  component: Resume,
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
        <span className="h-px flex-1 max-w-8 bg-accent" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function TimelineItem({
  date,
  title,
  place,
  onClick,
}: {
  date: string;
  title: string;
  place?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative grid grid-cols-[7rem_1fr] gap-4 py-3 px-3 -mx-3 rounded-lg border-b border-border last:border-0 overflow-hidden transition-all duration-500 ease-out hover:border-transparent hover:shadow-[0_10px_40px_-10px_color-mix(in_oklab,var(--accent)_45%,transparent)] hover:-translate-y-0.5 ${
        onClick ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_50%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)]" />
      <div className="pointer-events-none absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-accent origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
      <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-[linear-gradient(110deg,transparent_40%,color-mix(in_oklab,var(--accent)_15%,transparent)_50%,transparent_60%)]" />

      <div className="relative text-sm text-muted-foreground font-medium transition-colors duration-300 group-hover:text-accent">
        {date}
      </div>
      <div className="relative">
        <div className="font-medium text-white transition-transform duration-500 ease-out group-hover:translate-x-1">
          {title}
        </div>
        {place && (
          <div className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
            {place}
          </div>
        )}
      </div>
    </div>
  );
}

function ReferenceCard({
  name,
  role,
  phone,
  phoneHref,
  email,
}: {
  name: string;
  role: string;
  phone: string;
  phoneHref: string;
  email: string;
}) {
  return (
    <div className="group relative bg-card rounded-lg p-5 shadow-sm overflow-hidden border border-border/60 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_20px_50px_-15px_color-mix(in_oklab,var(--accent)_55%,transparent)]">
      <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_40%,transparent),transparent_70%)]" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />

      <div className="relative">
        <div className="font-semibold text-white transition-colors duration-300 group-hover:text-accent">
          {name}
        </div>
        <div className="text-sm text-muted-foreground mb-3 transition-colors duration-300 group-hover:text-foreground/70">
          {role}
        </div>
        <a
          href={phoneHref}
          className="block text-sm text-foreground/90 hover:text-accent transition-all duration-300 hover:translate-x-1"
        >
          {phone}
        </a>
        <a
          href={`mailto:${email}`}
          className="block text-sm text-foreground/90 hover:text-accent break-all transition-all duration-300 hover:translate-x-1"
        >
          {email}
        </a>
      </div>
    </div>
  );
}

// --- ВНУТРЕННЕЕ МОДАЛЬНОЕ ОКНО ДЛЯ ПРОСМОТРА PDF ---
function PdfViewerModal({
  title,
  date,
  pdfUrl,
  onClose,
}: {
  title: string;
  date: string;
  pdfUrl: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.3s_ease-out]">
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-md cursor-zoom-out" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-5xl h-[90vh] bg-black/30 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-[fadeUp_0.3s_ease-out]">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm text-white/60">{date}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="flex-1 w-full p-2 sm:p-4 flex items-center justify-center">
          <iframe
            src={`${pdfUrl}#view=FitH`}
            className="w-full h-full rounded-xl shadow-inner bg-transparent"
            title={`PDF Viewer - ${title}`}
          />
        </div>
      </div>
      
    </div>
  );
}

// --- КОМПОНЕНТ МОДАЛЬНОГО ОКНА ДЛЯ SCHULBILDUNG ---
function SchulbildungModal({
  data,
  onClose,
}: {
  data: Schulbildung | null;
  onClose: () => void;
}) {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  useEffect(() => {
    if (data) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsPdfOpen(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [data]);

  if (!data) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.3s_ease-out]">
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative w-full max-w-5xl h-[85vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-[fadeUp_0.3s_ease-out]">
          
          <div className="flex items-start justify-between p-5 border-b border-border/50">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-1">{data.title}</h3>
              <div className="flex gap-3 text-sm text-muted-foreground">
                <span className="text-accent">{data.date}</span>
                <span>•</span>
                <span>{data.place}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-1/3 p-5 overflow-y-auto border-r border-border/50 flex flex-col justify-between gap-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-accent rounded-full" />
                  Informationen
                </h4>
                <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line mb-6">
                  {data.description}
                </p>
                {data.pdfUrl && (
                  <button
                    onClick={() => setIsPdfOpen(true)}
                    className="w-full py-3 px-4 bg-slate-700 text-white font-medium rounded-lg shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:bg-slate-600 hover:shadow-md flex items-center justify-between gap-3 text-left"
                  >
                    <span>Dokument ansehen</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                      <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="w-full md:w-2/3 h-full bg-black/40 flex items-center justify-center overflow-hidden">
              <img
                src={data.photoUrl}
                alt={`Bild von ${data.title}`}
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </div>

      {isPdfOpen && data.pdfUrl && (
        <PdfViewerModal
          title={data.title}
          date={data.date}
          pdfUrl={data.pdfUrl}
          onClose={() => setIsPdfOpen(false)}
        />
      )}
    </>
  );
}

// --- КОМПОНЕНТ МОДАЛЬНОГО ОКНА ДЛЯ SCHNUPPERLEHREN ---
function SchnupperlehreModal({
  data,
  onClose,
}: {
  data: Schnupperlehre | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (data) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [data]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.3s_ease-out]">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl h-[85vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-[fadeUp_0.3s_ease-out]">
        
        <div className="flex items-start justify-between p-5 border-b border-border/50">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-1">{data.title}</h3>
            <div className="flex gap-3 text-sm text-muted-foreground">
              <span className="text-accent">{data.date}</span>
              <span>•</span>
              <span>{data.place}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-1/3 p-5 overflow-y-auto border-r border-border/50 flex flex-col justify-between gap-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-accent rounded-full" />
                Tätigkeitsbericht
              </h4>
              <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                {data.description}
              </p>
            </div>
            <div className="mt-auto">
              <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Standort (Arbeitsort)
              </h4>
              <div className="w-full h-44 rounded-lg overflow-hidden border border-border/60 bg-muted/20">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(data.addressForMap)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  title={`Map of ${data.place}`}
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 h-full bg-black/20 p-4">
            <iframe
              src={`${data.pdfUrl}#view=FitH`}
              className="w-full h-full rounded-lg border border-border/50 bg-white"
              title={`Schnupperbericht ${data.title}`}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function Hero() {
  const [isCompact, setIsCompact] = useState(false);
  const [isPortraitOpen, setIsPortraitOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 28) {
        setIsCompact(true);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isPortraitOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPortraitOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 100);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle + Math.PI / 2) * 0.3;
        p.y += Math.sin(angle + Math.PI / 2) * 0.3;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ff8c00"; 
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let distDx = p.x - p2.x;
          let distDy = p.y - p2.y;
          let distance = Math.sqrt(distDx * distDx + distDy * distDy);

          if (distance < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 140, 0, ${1 - distance / 130})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const imgSize = isCompact ? 112 : 224;
  const titleScale = isCompact ? 0.72 : 1;
  const gap = isCompact ? 16 : 48;
  const indicatorOpacity = isCompact ? 0 : 1;

  return (
    <header
      className="relative w-full flex items-center bg-black text-primary-foreground overflow-hidden"
      style={{
        height: isCompact ? "260px" : "100svh",
        transition: "height 850ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
        <canvas ref={canvasRef} className="block absolute top-0 left-0" />
      </div>

      <div
        className="relative max-w-5xl mx-auto px-6 w-full grid md:grid-cols-[auto_1fr] items-center animate-[fadeUp_1s_ease-out_both]"
        style={{
          gap: `${gap}px`,
          transition: "gap 850ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <img
          src={portrait}
          alt="Yaroslav Serbinov"
          onClick={() => setIsPortraitOpen(true)}
          className="rounded-full object-cover border-4 border-[#ff8c00] shadow-[0_0_40px_-10px_rgba(255,140,0,0.6)] cursor-zoom-in hover:brightness-110"
          style={{
            width: `${imgSize}px`,
            height: `${imgSize}px`,
            transition: "width 850ms cubic-bezier(0.22, 1, 0.36, 1), height 850ms cubic-bezier(0.22, 1, 0.36, 1), filter 300ms",
          }}
        />
        <div
          style={{
            transform: `scale(${titleScale})`,
            transformOrigin: "left center",
            transition: "transform 850ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <p className="text-[#ff8c00] uppercase tracking-[0.3em] text-xs mb-3 font-medium tracking-widest drop-shadow-sm">Lebenslauf</p>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 leading-tight whitespace-nowrap drop-shadow-md">
            Yaroslav Serbinov
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-light drop-shadow-sm">
            Bewerbung für die Lehrstellen in ICT-Branche
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <a href="tel:+41767474388" className="hover:text-[#ff8c00] hover:translate-y-[-2px] transition-all duration-300">
              076 747 43 88
            </a>
            <a href="mailto:yaroslav.serbinov@bbzp.sz.ch" className="hover:text-[#ff8c00] hover:translate-y-[-2px] transition-all duration-300">
              yaroslav.serbinov@bbzp.sz.ch
            </a>
            <span className="hover:text-white transition-colors duration-300">Schützenstrasse 26, 6430 Schwyz</span>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#ff8c00]/80 animate-[bounce_2s_ease-in-out_infinite] transition-opacity pointer-events-none"
        style={{ opacity: indicatorOpacity }}
      >
        <span>Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-[#ff8c00] to-transparent" />
      </div>

      {isPortraitOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.3s_ease-out]">
          <div 
            className="absolute inset-0 bg-background/90 backdrop-blur-md cursor-zoom-out"
            onClick={() => setIsPortraitOpen(false)}
          />
          <div className="relative z-10 flex justify-center animate-[fadeUp_0.3s_ease-out]">
            <img 
              src={portrait} 
              alt="Yaroslav Serbinov Full" 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-border/50"
            />
            <button 
              onClick={() => setIsPortraitOpen(false)}
              className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 p-2 bg-card rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors border border-border shadow-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Resume() {
  const [selectedSchnupperlehre, setSelectedSchnupperlehre] = useState<Schnupperlehre | null>(null);
  const [selectedSchulbildung, setSelectedSchulbildung] = useState<Schulbildung | null>(null);

  return (
    <main className="min-h-screen bg-background relative">
      <NavDrawer />
      <Hero />

      <Reveal>
        <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-[1fr_2fr] gap-12">
          {/* Sidebar */}
          <aside>
            <Section title="Persönlich">
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Geburtsdatum</dt>
                  <dd className="font-medium">10.07.2007</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Nationalität</dt>
                  <dd className="font-medium">Ukraine</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="font-medium">S</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Eltern</dt>
                  <dd className="font-medium mt-1">
                    Kateryna Serbinova<br />
                    <span className="text-muted-foreground text-xs">Hotellerie</span>
                  </dd>
                </div>
              </dl>
            </Section>

            <Section title="Sprachen">
              <ul className="space-y-3 text-sm">
                {[
                  { l: "Russisch", v: "Muttersprache", p: 100 },
                  { l: "Ukrainisch", v: "Muttersprache", p: 100 },
                  { l: "Englisch", v: "B2–C1", p: 85 },
                  { l: "Deutsch", v: "B1", p: 60 },
                ].map((s) => (
                  <li key={s.l}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{s.l}</span>
                      <span className="text-muted-foreground text-xs">{s.v}</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${s.p}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="EDV-Kenntnisse">
              <ul className="flex flex-wrap gap-2">
                {["Coding", "Networking", "Hardware"].map((k) => (
                  <li
                    key={k}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full transition-all duration-300 hover:bg-accent hover:text-white hover:-translate-y-0.5 hover:shadow-[0_5px_15px_-3px_color-mix(in_oklab,var(--accent)_50%,transparent)] cursor-default"
                  >
                    {k}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Hobbys">
              <ul className="space-y-1.5 text-sm">
                {["Gym", "Velo fahren", "Schach spielen"].map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </Section>
          </aside>

          {/* Main column */}
          <div>
            <Section title="Schulbildung">
              <div className="bg-card rounded-lg p-5 shadow-sm">
                {schulbildungData.map((item) => (
                  <TimelineItem
                    key={item.id}
                    date={item.date}
                    title={item.title}
                    place={item.place}
                    onClick={item.description ? () => setSelectedSchulbildung(item) : undefined}
                  />
                ))}
              </div>
            </Section>

            <Section title="Schnupperlehren">
              <div className="bg-card rounded-lg p-5 shadow-sm">
                {schnupperlehrenData.map((item) => (
                  <TimelineItem
                    key={item.id}
                    date={item.date}
                    title={item.title}
                    place={item.place}
                    onClick={() => setSelectedSchnupperlehre(item)} 
                  />
                ))}
              </div>
            </Section>

            <Section title="Referenzen">
              <div className="grid sm:grid-cols-2 gap-4">
                <ReferenceCard
                  name="Markus Schöb"
                  role="Kursleiter AOZ"
                  phone="076 321 48 85"
                  phoneHref="tel:+41763214885"
                  email="schoeb-larsen@sunrise.ch"
                />
                <ReferenceCard
                  name="Karolin Schilling"
                  role="Sozialarbeiterin"
                  phone="041 819 41 43"
                  phoneHref="tel:+41418194143"
                  email="karolin.schilling@gemeindeschwyz.ch"
                />
              </div>
            </Section>
          </div>
        </div>
      </Reveal>

      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Yaroslav Serbinov · Schwyz, Schweiz
      </footer>

      <SchnupperlehreModal 
        data={selectedSchnupperlehre} 
        onClose={() => setSelectedSchnupperlehre(null)} 
      />
      <SchulbildungModal
        data={selectedSchulbildung}
        onClose={() => setSelectedSchulbildung(null)}
      />
    </main>
  );
}
