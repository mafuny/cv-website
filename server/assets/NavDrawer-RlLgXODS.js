import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/NavDrawer.tsx
function NavDrawer() {
	const [isOpen, setIsOpen] = useState(false);
	const [isDocsOpen, setIsDocsOpen] = useState(false);
	const currentPath = useRouterState().location.pathname;
	useEffect(() => {
		if (currentPath.includes("/zeugnisse") || currentPath.includes("/schnupperberichte")) setIsDocsOpen(true);
	}, [currentPath]);
	useEffect(() => {
		if (isOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);
	const handleLinkClick = () => {
		setIsOpen(false);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("button", {
			onClick: () => setIsOpen(true),
			className: "fixed top-6 right-6 z-40 p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white hover:text-accent hover:border-accent/50 transition-all duration-300 shadow-lg",
			"aria-label": "Menu öffnen",
			children: /* @__PURE__ */ jsxs("svg", {
				width: "24",
				height: "24",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					/* @__PURE__ */ jsx("line", {
						x1: "3",
						y1: "12",
						x2: "21",
						y2: "12"
					}),
					/* @__PURE__ */ jsx("line", {
						x1: "3",
						y1: "6",
						x2: "21",
						y2: "6"
					}),
					/* @__PURE__ */ jsx("line", {
						x1: "3",
						y1: "18",
						x2: "21",
						y2: "18"
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: `fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
			onClick: () => setIsOpen(false)
		}),
		/* @__PURE__ */ jsxs("nav", {
			className: `fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-card border-l border-border/50 z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between p-6 border-b border-border/50",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-[#ff8c00] text-xs font-medium tracking-[0.3em] uppercase",
					children: "Navigation"
				}), /* @__PURE__ */ jsx("button", {
					onClick: () => setIsOpen(false),
					className: "p-2 text-muted-foreground hover:text-white transition-colors rounded-full hover:bg-white/5",
					"aria-label": "Menu schliessen",
					children: /* @__PURE__ */ jsxs("svg", {
						width: "24",
						height: "24",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [/* @__PURE__ */ jsx("line", {
							x1: "18",
							y1: "6",
							x2: "6",
							y2: "18"
						}), /* @__PURE__ */ jsx("line", {
							x1: "6",
							y1: "6",
							x2: "18",
							y2: "18"
						})]
					})
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex-1 overflow-y-auto py-4 px-6 flex flex-col gap-2",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/",
						onClick: handleLinkClick,
						className: `py-4 text-lg font-medium border-b border-border/50 transition-colors ${currentPath === "/" ? "text-[#ff8c00]" : "text-white hover:text-[#ff8c00]"}`,
						children: "Lebenslauf"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col border-b border-border/50",
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: () => setIsDocsOpen(!isDocsOpen),
							className: "py-4 text-lg font-medium flex justify-between items-center transition-colors text-white hover:text-[#ff8c00]",
							children: ["Dokumente", /* @__PURE__ */ jsx("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								className: `transition-transform duration-300 ${isDocsOpen ? "rotate-180 text-[#ff8c00]" : "text-muted-foreground"}`,
								children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" })
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: `grid transition-all duration-300 ease-in-out ${isDocsOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"}`,
							children: /* @__PURE__ */ jsxs("div", {
								className: "overflow-hidden flex flex-col gap-3 pl-4 border-l-2 border-border/50 ml-2",
								children: [
									/* @__PURE__ */ jsx(Link, {
										to: "/alle-dokumente",
										onClick: handleLinkClick,
										className: `text-base transition-colors py-1 ${currentPath.includes("/alle-dokumente") ? "text-[#ff8c00]" : "text-muted-foreground hover:text-white"}`,
										children: "Alle Dokumente"
									}),
									/* @__PURE__ */ jsx(Link, {
										to: "/zeugnisse",
										onClick: handleLinkClick,
										className: `text-base transition-colors py-1 ${currentPath.includes("/zeugnisse") ? "text-[#ff8c00]" : "text-muted-foreground hover:text-white"}`,
										children: "Zeugnisse"
									}),
									/* @__PURE__ */ jsx(Link, {
										to: "/schnupperberichte",
										onClick: handleLinkClick,
										className: `text-base transition-colors py-1 ${currentPath.includes("/schnupperberichte") ? "text-[#ff8c00]" : "text-muted-foreground hover:text-white"}`,
										children: "Schnupperberichte"
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/ueber-diese-webseite",
						onClick: handleLinkClick,
						className: `py-4 text-lg font-medium border-b border-border/50 transition-colors ${currentPath.includes("/ueber-diese-webseite") ? "text-[#ff8c00]" : "text-white hover:text-[#ff8c00]"}`,
						children: "Wie wurde diese Webseite erstellt?"
					})
				]
			})]
		})
	] });
}
//#endregion
export { NavDrawer as t };
