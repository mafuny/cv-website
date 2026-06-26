import { t as NavDrawer } from "./NavDrawer-RlLgXODS.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/ueber-diese-webseite.tsx?tsr-split=component
function AboutSitePage() {
	return /* @__PURE__ */ jsxs("main", {
		className: "min-h-screen bg-background text-foreground relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsx(NavDrawer, {}),
			/* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-[40vh] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--accent)_15%,transparent),transparent_70%)] pointer-events-none opacity-50" }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative max-w-4xl mx-auto px-6 py-24 sm:py-32",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-12 animate-[fadeUp_0.8s_ease-out]",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-accent uppercase tracking-[0.3em] text-xs mb-4 font-medium",
								children: "Making of"
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight",
								children: "Wie wurde diese Webseite erstellt?"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-lg text-muted-foreground leading-relaxed space-y-4",
								children: [/* @__PURE__ */ jsx("p", { children: "Um meine Fähigkeiten im Bereich der Informatik praktisch zu demonstrieren, habe ich beschlossen, meinen Lebenslauf nicht nur als einfaches PDF-Dokument abzugeben, sondern eine komplette, interaktive Webseite dafür zu programmieren." }), /* @__PURE__ */ jsx("p", { children: "Ich habe dabei bewusst auf fertige Baukasten-Systeme (wie WordPress oder Wix) verzichtet und stattdessen die Webseite von Grund auf selbst geschrieben. Dabei kamen moderne Technologien zum Einsatz, die heute in der professionellen Webentwicklung Standard sind:" })]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid sm:grid-cols-2 gap-6 mb-12 animate-[fadeUp_1s_ease-out_0.2s_both]",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "bg-card border border-border/50 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-[#61DAFB]/50 hover:shadow-[0_10px_40px_-15px_rgba(97,218,251,0.3)] transition-all duration-300",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "h-24 w-24 mb-4 flex items-center justify-center bg-[#61DAFB]/10 rounded-full p-4",
									children: /* @__PURE__ */ jsx("img", {
										src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
										alt: "React Logo",
										className: "w-full h-full object-contain animate-[spin_10s_linear_infinite]"
									})
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "text-xl font-semibold text-white mb-2",
									children: "React"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Eine sehr beliebte JavaScript-Bibliothek für den Aufbau von interaktiven Benutzeroberflächen. Damit wurden die Fenster, Animationen und die gesamte Struktur aufgebaut."
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "bg-card border border-border/50 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-[#339933]/50 hover:shadow-[0_10px_40px_-15px_rgba(51,153,51,0.3)] transition-all duration-300",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "h-24 w-24 mb-4 flex items-center justify-center bg-[White] rounded-full p-4",
									children: /* @__PURE__ */ jsx("img", {
										src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
										alt: "Node.js Logo",
										className: "w-full h-full object-contain"
									})
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "text-xl font-semibold text-white mb-2",
									children: "Node.js"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Eine Laufzeitumgebung, die es ermöglicht, JavaScript ausserhalb des Browsers auszuführen. Ich habe sie genutzt, um die Entwicklungsumgebung und die Infrastruktur im Hintergrund zu betreiben."
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "animate-[fadeUp_1s_ease-out_0.4s_both]",
						children: /* @__PURE__ */ jsxs("p", {
							className: "text-lg text-muted-foreground leading-relaxed",
							children: [
								"Zusätzlich habe ich für das visuelle Design ",
								/* @__PURE__ */ jsx("strong", { children: "Tailwind CSS" }),
								" verwendet. Dies ermöglichte mir, das dunkle, moderne Layout mit den feinen Animationen (wie den leuchtenden Partikeln im Hintergrund oder den interaktiven Modalfenstern) komplett selbst zu gestalten."
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("footer", {
				className: "border-t border-border py-6 text-center text-sm text-muted-foreground",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Yaroslav Serbinov · Schwyz, Schweiz"
				]
			})
		]
	});
}
//#endregion
export { AboutSitePage as component };
