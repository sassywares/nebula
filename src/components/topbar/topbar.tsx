import { Link } from "@/i18n/routing";
import { getLocaleTranslations } from "@/i18n/utils";
import { routes } from "@/routes";
import { cn } from "@/utils";
import {
  BookIcon,
  DollarSignIcon,
  MenuIcon,
  MessageSquareIcon,
  RocketIcon,
  UsersIcon,
} from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { Container } from "../container";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import { Logo } from "../logo";
import { Text } from "../text";
import { TopbarCta } from "./topbar.cta";
import { TopbarStar } from "./topbar.star";

const Topbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(async ({ className, ...props }, ref) => {
  const t = await getLocaleTranslations();

  const items = [
    {
      href: routes.docs,
      icon: <BookIcon />,
      label: t("words.docs"),
    },
    {
      href: routes.blog,
      icon: <MessageSquareIcon />,
      label: t("words.blog"),
    },
    {
      href: routes.about,
      icon: <UsersIcon />,
      label: t("words.about"),
    },
    {
      href: routes.pricing,
      icon: <DollarSignIcon />,
      label: t("words.pricing"),
    },
    {
      href: routes.integrations,
      icon: <RocketIcon />,
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
        className="h-topbar flex items-center justify-between"
      >
        {/* Left side */}
        <div className="flex items-center gap-8">
          <Link href={routes.home} className="flex items-center gap-2">
            <Logo className="size-10" />
            <Text variant="h3" className="translate-y-px">
              {t("metadata.title")}
            </Text>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
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
          <TopbarStar className="hidden md:flex" />
          <TopbarCta
            className={{
              mobile: "sm:hidden",
              desktop: "hidden sm:flex",
            }}
          />
          {/* Hamburger menu */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon-lg" variant="ghost" className="lg:hidden">
                <MenuIcon />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="sr-only">{t("words.menu")}</DrawerTitle>
                <DrawerDescription className="sr-only">
                  {t("metadata.description")}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <nav className="flex flex-col gap-4">
                  {items.map((item) => (
                    <Button
                      key={item.href}
                      align="left"
                      asChild
                      variant="ghost"
                    >
                      <Link href={item.href}>
                        {item.icon}
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </DrawerBody>
              <DrawerFooter className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] items-center gap-2">
                <TopbarStar />
                <TopbarCta
                  className={{
                    mobile: "hidden",
                  }}
                />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
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
