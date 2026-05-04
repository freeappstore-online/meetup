import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/explore", label: "Explore", icon: ExploreIcon },
  { to: "/profile", label: "Profile", icon: ProfileIcon },
];

function HomeIcon() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: "var(--color-paper)" }}>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r p-6 gap-2 fixed h-full" style={{ borderColor: "var(--color-line)", background: "var(--color-panel)" }}>
        <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-display)", color: "var(--color-accent)" }}>
          FreeMeetup
        </h1>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-[var(--radius-btn)] text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : ""
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? "var(--color-accent)" : "transparent",
                color: isActive ? "#fff" : "var(--color-ink)",
              })}
            >
              <item.icon />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t text-xs" style={{ borderColor: "var(--color-line)", color: "var(--color-muted)" }}>
          <a href="https://freeappstore.io" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Part of FreeAppStore — free forever
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile bottom dock */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t flex justify-around items-center h-16 z-50" style={{ background: "var(--color-panel)", borderColor: "var(--color-line)" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-0.5 text-xs"
            style={({ isActive }) => ({
              color: isActive ? "var(--color-accent)" : "var(--color-muted)",
            })}
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
