import { Link } from "@/i18n/routing";
import { getLocaleTranslations } from "@/i18n/utils";
import { routes } from "@/routes";
import { cn } from "@/utils";
import { StarIcon } from "lucide-react";
import * as React from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Container } from "./container";
import { Logo } from "./logo";
import { Text } from "./text";

const Topbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(async ({ className, ...props }, ref) => {
  const t = await getLocaleTranslations();

  const items = [
    {
      href: routes.docs,
      label: t("words.docs"),
    },
    {
      href: routes.blog,
      label: t("words.blog"),
    },
    {
      href: routes.about,
      label: t("words.about"),
    },
    {
      href: routes.pricing,
      label: t("words.pricing"),
    },
    {
      href: routes.integrations,
      label: t("words.integrations"),
    },
  ];

  return (
    <div
      ref={ref}
      className={cn(
        "z-topbar fixed left-0 right-0 top-0 border-b border-muted text-center backdrop-blur",
        className,
      )}
      {...props}
    >
      <Container
        size="2xl"
        className="h-topbar flex flex-wrap items-center justify-between"
      >
        {/* Left side */}
        <div className="flex items-center gap-8">
          <Link href={routes.home} className="flex items-center gap-2">
            <Logo className="size-10" />
            <Text variant="h3" className="translate-y-px">
              {t("metadata.title")}
            </Text>
          </Link>
          <nav className="flex items-center gap-8">
            {items.map((item) => (
              <Text
                key={item.href}
                hover="primary"
                weight="light"
                asChild
                variant="large"
              >
                <Link href={item.href}>{item.label}</Link>
              </Text>
            ))}
          </nav>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button size="lg" variant="ghost">
            <StarIcon /> {t("phrases.starOnGitHub")}{" "}
            <Badge size="sm" variant="secondary">
              69k
            </Badge>
          </Button>
          <Button size="lg">{t("phrases.getStarted")}</Button>
        </div>
      </Container>
    </div>
  );
});
Topbar.displayName = "Topbar";

/** Render something below the topbar. */
const BelowTopbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("pt-topbar", className)} {...props} />;
});

BelowTopbar.displayName = "BelowTopbar";

export { BelowTopbar, Topbar };
