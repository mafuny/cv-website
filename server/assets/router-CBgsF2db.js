import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//#region src/styles.css?url
var styles_default = "/cv-website/assets/styles-DCXv0lGQ.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$5 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "A web resume for Swiss apprenticeship applications."
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "A web resume for Swiss apprenticeship applications."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			},
			{
				name: "twitter:title",
				content: "Lovable App"
			},
			{
				name: "twitter:description",
				content: "A web resume for Swiss apprenticeship applications."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f5b5cef0-10e4-4153-8bbc-47714aaeb994/id-preview-8b2b9ad4--7a8fb78f-627a-402e-a6e7-513eb8807555.lovable.app-1782203062661.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f5b5cef0-10e4-4153-8bbc-47714aaeb994/id-preview-8b2b9ad4--7a8fb78f-627a-402e-a6e7-513eb8807555.lovable.app-1782203062661.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$5.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
}
//#endregion
//#region src/routes/zeugnisse.tsx
var $$splitComponentImporter$4 = () => import("./zeugnisse-uJhuwWCd.js");
var Route$4 = createFileRoute("/zeugnisse")({
	head: () => ({ meta: [{ title: "Zeugnisse – Yaroslav Serbinov" }, {
		name: "description",
		content: "Zeugnisse von Yaroslav Serbinov."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/ueber-diese-webseite.tsx
var $$splitComponentImporter$3 = () => import("./ueber-diese-webseite-BOMfmaeT.js");
var Route$3 = createFileRoute("/ueber-diese-webseite")({
	head: () => ({ meta: [{ title: "Wie wurde diese Webseite erstellt? – Yaroslav Serbinov" }, {
		name: "description",
		content: "Hintergrund zur Entstehung dieser Webseite."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/schnupperberichte.tsx
var $$splitComponentImporter$2 = () => import("./schnupperberichte-t-Ynmjig.js");
var Route$2 = createFileRoute("/schnupperberichte")({
	head: () => ({ meta: [{ title: "Schnupperberichte – Yaroslav Serbinov" }, {
		name: "description",
		content: "Schnupperberichte von Yaroslav Serbinov."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/alle-dokumente.tsx
var $$splitComponentImporter$1 = () => import("./alle-dokumente-CdEhakPP.js");
var Route$1 = createFileRoute("/alle-dokumente")({
	head: () => ({ meta: [{ title: "Alle Dokumente – Yaroslav Serbinov" }, {
		name: "description",
		content: "Alle Dokumente von Yaroslav Serbinov."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-C87K7_ZE.js");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Yaroslav Serbinov – Lebenslauf | Bewerbung Lehrstelle ICT" },
		{
			name: "description",
			content: "Online-Lebenslauf von Yaroslav Serbinov – Bewerbung für eine Lehrstelle als ICT-Fachmann in der Schweiz."
		},
		{
			property: "og:title",
			content: "Yaroslav Serbinov – Lebenslauf"
		},
		{
			property: "og:description",
			content: "Bewerbung für eine Lehrstelle als ICT-Fachmann in der Schweiz."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var ZeugnisseRoute = Route$4.update({
	id: "/zeugnisse",
	path: "/zeugnisse",
	getParentRoute: () => Route$5
});
var UeberDieseWebseiteRoute = Route$3.update({
	id: "/ueber-diese-webseite",
	path: "/ueber-diese-webseite",
	getParentRoute: () => Route$5
});
var SchnupperberichteRoute = Route$2.update({
	id: "/schnupperberichte",
	path: "/schnupperberichte",
	getParentRoute: () => Route$5
});
var AlleDokumenteRoute = Route$1.update({
	id: "/alle-dokumente",
	path: "/alle-dokumente",
	getParentRoute: () => Route$5
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	AlleDokumenteRoute,
	SchnupperberichteRoute,
	UeberDieseWebseiteRoute,
	ZeugnisseRoute
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
