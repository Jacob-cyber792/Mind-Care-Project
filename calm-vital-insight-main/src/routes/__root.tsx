import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mind Care — A Calmer, Healthier You" },
      {
        name: "description",
        content:
          "Mind Care puts your mental wellbeing first — private on-device AI guidance, mood check-ins, breathing and mindfulness, alongside holistic body health insights.",
      },
      { name: "author", content: "Mind Care" },
      { name: "theme-color", content: "#5fb3b3" },
      { property: "og:title", content: "Mind Care — A Calmer, Healthier You" },
      {
        property: "og:description",
        content:
          "Private mental wellness AI plus holistic body health — calm, supportive and always with you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mind Care — A Calmer, Healthier You" },
      { name: "description", content: "Mind Care is a cross-platform health dashboard for tracking physical and mental well-being." },
      { property: "og:description", content: "Mind Care is a cross-platform health dashboard for tracking physical and mental well-being." },
      { name: "twitter:description", content: "Mind Care is a cross-platform health dashboard for tracking physical and mental well-being." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d17c7d22-0c08-4cc9-819e-4d99ce426efd/id-preview-e314d757--b9f72ce9-c74c-4325-9888-96f5c1640845.lovable.app-1777031554476.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d17c7d22-0c08-4cc9-819e-4d99ce426efd/id-preview-e314d757--b9f72ce9-c74c-4325-9888-96f5c1640845.lovable.app-1777031554476.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
