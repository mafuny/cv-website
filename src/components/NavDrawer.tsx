import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

export function NavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Получаем текущий путь, чтобы подсвечивать активную ссылку
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Автоматически открываем вкладку "Dokumente", если мы находимся на одной из ее страниц
  useEffect(() => {
    if (currentPath.includes("/zeugnisse") || currentPath.includes("/schnupperberichte")) {
      setIsDocsOpen(true);
    }
  }, [currentPath]);

  // Блокируем скролл при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Функция для закрытия меню при клике на ссылку
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Кнопка-гамбургер в правом верхнем углу */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-40 p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white hover:text-accent hover:border-accent/50 transition-all duration-300 shadow-lg"
        aria-label="Menu öffnen"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Затемнение фона */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Выезжающая панель навигации */}
      <nav
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-card border-l border-border/50 z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Шапка меню */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <span className="text-[#ff8c00] text-xs font-medium tracking-[0.3em] uppercase">
            Navigation
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-muted-foreground hover:text-white transition-colors rounded-full hover:bg-white/5"
            aria-label="Menu schliessen"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Ссылки навигации */}
        <div className="flex-1 overflow-y-auto py-4 px-6 flex flex-col gap-2">
          
          {/* 1. Lebenslauf (Главная) */}
          <Link
            to="/"
            onClick={handleLinkClick}
            className={`py-4 text-lg font-medium border-b border-border/50 transition-colors ${
              currentPath === "/" ? "text-[#ff8c00]" : "text-white hover:text-[#ff8c00]"
            }`}
          >
            Lebenslauf
          </Link>

          {/* 2. Раскрывающийся пункт "Dokumente" */}
          <div className="flex flex-col border-b border-border/50">
            <button
              onClick={() => setIsDocsOpen(!isDocsOpen)}
              className="py-4 text-lg font-medium flex justify-between items-center transition-colors text-white hover:text-[#ff8c00]"
            >
              Dokumente
              <svg 
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`transition-transform duration-300 ${isDocsOpen ? "rotate-180 text-[#ff8c00]" : "text-muted-foreground"}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            {/* Анимированный контент аккордеона */}
            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                isDocsOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden flex flex-col gap-3 pl-4 border-l-2 border-border/50 ml-2">
              <Link
                  to="/alle-dokumente"
                  onClick={handleLinkClick}
                  className={`text-base transition-colors py-1 ${
                    currentPath.includes("/alle-dokumente") ? "text-[#ff8c00]" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  Alle Dokumente
                </Link> 
                <Link
                  to="/zeugnisse"
                  onClick={handleLinkClick}
                  className={`text-base transition-colors py-1 ${
                    currentPath.includes("/zeugnisse") ? "text-[#ff8c00]" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  Zeugnisse
                </Link>
                <Link
                  to="/schnupperberichte"
                  onClick={handleLinkClick}
                  className={`text-base transition-colors py-1 ${
                    currentPath.includes("/schnupperberichte") ? "text-[#ff8c00]" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  Schnupperberichte
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Как создан сайт */}
          <Link
            to="/ueber-diese-webseite"
            onClick={handleLinkClick}
            className={`py-4 text-lg font-medium border-b border-border/50 transition-colors ${
              currentPath.includes("/ueber-diese-webseite") ? "text-[#ff8c00]" : "text-white hover:text-[#ff8c00]"
            }`}
          >
            Wie wurde diese Webseite erstellt?
          </Link>

        </div>
      </nav>
    </>
  );
}
