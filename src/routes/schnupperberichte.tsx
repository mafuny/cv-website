import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NavDrawer } from "@/components/NavDrawer";

// --- ДАННЫЕ ДЛЯ ОТЧЕТОВ ---
type Bericht = {
  id: string;
  title: string;
  date: string;
  documentUrl: string; 
};

// Данные о ваших Schnupperlehren с путями к файлам
const berichteData: Bericht[] = [
  {
    id: "druck",
    title: "Druckausrüster EFZ (Triner AG)",
    date: "01.–02.06.2026",
    documentUrl: new URL("../assets/pdf/schnupper/triner.pdf", import.meta.url).href,
  },
  {
    id: "garten",
    title: "Landschaftsgärtner EFZ (Bucher Gärten)",
    date: "26.05.2026",
    documentUrl: new URL("../assets/pdf/schnupper/bucher.pdf", import.meta.url).href,
  },
  {
    id: "ict",
    title: "ICT-Fachmann EFZ (Amt für Informatik)",
    date: "05.–06.02.2026",
    documentUrl: new URL("../assets/pdf/schnupper/afi.pdf", import.meta.url).href,
  },
  {
    id: "multi",
    title: "Multimediaelektroniker EFZ (enz audio video AG)",
    date: "27.–28.10.2025",
    documentUrl: new URL("../assets/pdf/schnupper/enz.pdf", import.meta.url).href,
  },
  {
    id: "gebaeude",
    title: "Gebäudeinformatiker EFZ (ComDataNet AG)",
    date: "13.10.2025",
    documentUrl: new URL("../assets/pdf/schnupper/comdatanet.pdf", import.meta.url).href,
  },
];

// --- КОМПОНЕНТ ДЛЯ ГЕНЕРАЦИИ МИНИАТЮР (ТОЛЬКО НА КЛИЕНТЕ) ---
function PdfThumbnail({ fileUrl }: { fileUrl: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pdfLib, setPdfLib] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    // Динамически импортируем react-pdf только в браузере
    // Это предотвращает ошибку SSR (DOMMatrix is not defined)
    Promise.all([
      import("react-pdf"),
      import("react-pdf/dist/Page/AnnotationLayer.css"),
      import("react-pdf/dist/Page/TextLayer.css")
    ])
      .then(([pdf]) => {
        if (!isMounted) return;
        // Настраиваем воркер после успешной загрузки библиотеки
        pdf.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdf.pdfjs.version}/build/pdf.worker.min.mjs`;
        setPdfLib(pdf);
      })
      .catch((err) => console.error("Failed to load react-pdf:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  if (!pdfLib) {
    return (
      <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
        <span className="text-xs text-muted-foreground">Lade Vorschau...</span>
      </div>
    );
  }

  const { Document, Page } = pdfLib;

  return (
    <div className="absolute inset-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex justify-center bg-white overflow-hidden">
      <Document
        file={fileUrl}
        loading={
          <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Lade Vorschau...</span>
          </div>
        }
        error={
          <div className="w-full h-full flex items-center justify-center bg-muted/50">
            <span className="text-xs text-red-500">Fehler beim Laden</span>
          </div>
        }
      >
        <Page
          pageNumber={1}
          width={350} // Ширина рендера (достаточная для качественной миниатюры)
          renderTextLayer={false} // Отключаем слой текста для оптимизации превью
          renderAnnotationLayer={false} // Отключаем аннотации для оптимизации
          className="shadow-sm"
        />
      </Document>
    </div>
  );
}

// --- КОМПОНЕНТ МОДАЛЬНОГО ОКНА ДЛЯ ДОКУМЕНТОВ ---
function PdfModal({
  data,
  onClose,
}: {
  data: Bericht | null;
  onClose: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (data) {
      document.body.style.overflow = "hidden";
      setHasError(false); // Сбрасываем ошибку при открытии нового окна
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [data]);

  if (!data) return null;

  const isImage = data.documentUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Затемнение фона */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-md cursor-zoom-out"
        onClick={onClose}
      />
      
      {/* Окно с документом */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-black/30 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-[fadeUp_0.3s_ease-out]">
        
        {/* Шапка окна */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div>
            <h3 className="text-xl font-semibold text-white">{data.title}</h3>
            <p className="text-sm text-white/60">{data.date}</p>
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

        {/* Контейнер документа */}
        <div className="flex-1 w-full p-2 sm:p-4 flex items-center justify-center">
          {isImage ? (
            <div className="w-full h-full rounded-xl overflow-auto flex items-center justify-center bg-white/5 p-4 shadow-inner">
              {hasError ? (
                <div className="flex flex-col items-center text-muted-foreground/60">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <p>Bild konnte nicht geladen werden</p>
                </div>
              ) : (
                <img 
                  src={data.documentUrl} 
                  alt={data.title} 
                  className="max-w-full h-auto object-contain rounded-sm shadow-2xl"
                  onError={() => setHasError(true)}
                />
              )}
            </div>
          ) : (
            <iframe
              src={`${data.documentUrl}#view=FitH`}
              className="w-full h-full rounded-xl shadow-inner bg-transparent"
              title={`PDF Viewer - ${data.title}`}
            />
          )}
        </div>

      </div>
    </div>
  );
}

// --- НАСТРОЙКА РОУТА ---
export const Route = createFileRoute("/schnupperberichte")({
  head: () => ({
    meta: [
      { title: "Schnupperberichte – Yaroslav Serbinov" },
      { name: "description", content: "Schnupperberichte von Yaroslav Serbinov." },
    ],
  }),
  component: SchnupperPage,
});

// --- ГЛАВНАЯ СТРАНИЦА ---
function SchnupperPage() {
  const [selectedBericht, setSelectedBericht] = useState<Bericht | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <NavDrawer />
      
      <div className="absolute top-0 left-0 right-0 h-[40vh] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--accent)_15%,transparent),transparent_70%)] pointer-events-none opacity-50" />

      <div className="relative max-w-5xl mx-auto px-6 py-24 sm:py-32">
        <div className="mb-12 animate-[fadeUp_0.8s_ease-out]">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4 font-medium">Erfahrungen</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Schnupperberichte</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hier finden Sie meine Tätigkeitsberichte der absolvierten Schnupperlehren. Klicken Sie auf einen Bericht, um ihn im Vollbildmodus zu lesen.
          </p>
        </div>

        {/* Сетка документов с предпросмотром */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeUp_1s_ease-out_0.2s_both]">
          {berichteData.map((bericht) => {
            const isImage = bericht.documentUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;
            const hasImageError = imageErrors[bericht.id];

            return (
              <div 
                key={bericht.id}
                onClick={() => setSelectedBericht(bericht)}
                className="group relative bg-card rounded-xl border border-border/60 p-4 cursor-pointer hover:border-accent hover:shadow-[0_10px_40px_-15px_color-mix(in_oklab,var(--accent)_60%,transparent)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Блок предпросмотра (Thumbnail) */}
                <div className="relative w-full aspect-[1/1.4] mb-4 bg-white rounded-lg overflow-hidden border border-border/50 group-hover:border-accent/50 transition-colors duration-300 flex items-center justify-center">
                  
                  {isImage ? (
                    hasImageError ? (
                      /* Заглушка, если картинка не найдена */
                      <div className="absolute inset-0 w-full h-full bg-muted/10 flex flex-col items-center justify-center text-muted-foreground/40 border-2 border-dashed border-border/50 m-2 rounded-md">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span className="text-[10px] uppercase tracking-wider">Bild fehlt</span>
                      </div>
                    ) : (
                      <img 
                        src={bericht.documentUrl} 
                        alt={`Thumbnail ${bericht.title}`} 
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        onError={() => setImageErrors(prev => ({ ...prev, [bericht.id]: true }))}
                      />
                    )
                  ) : (
                    <PdfThumbnail fileUrl={bericht.documentUrl} />
                  )}

                  {/* Иконка лупы при наведении (поверх всего) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-[2px]">
                    <div className="bg-accent text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(255,140,0,0.4)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6"></path>
                        <path d="M10 14L21 3"></path>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Информация под миниатюрой */}
                <div className="mt-auto">
                  <h3 className="font-medium text-white group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {bericht.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {bericht.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Yaroslav Serbinov · Schwyz, Schweiz
      </footer>

      {/* Модальное окно */}
      <PdfModal 
        data={selectedBericht} 
        onClose={() => setSelectedBericht(null)} 
      />
    </main>
  );
}