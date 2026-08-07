import { useState } from "react"
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@workspace/ui/components/ui/resizable-navbar"
import { navItems } from "@/data/site"

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Navbar className="fixed top-4 sm:top-6">
      <NavBody>
        <a
          href="#"
          className="relative z-20 font-heading text-xl font-medium tracking-tight text-foreground"
        >
          RH.
        </a>
        <NavItems items={navItems.map((item) => ({ ...item }))} />
        <NavbarButton
          href="mailto:helbirog@gmail.com"
          variant="dark"
          className="relative z-20"
        >
          Say hi
        </NavbarButton>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <a href="#" className="font-heading text-xl font-medium tracking-tight text-foreground">
            RH.
          </a>
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="w-full text-base text-neutral-700 dark:text-neutral-200"
            >
              {item.name}
            </a>
          ))}
          <NavbarButton
            href="mailto:helbirog@gmail.com"
            variant="dark"
            className="w-full text-center"
          >
            Say hi
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
