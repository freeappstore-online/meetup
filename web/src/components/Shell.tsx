import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Events", icon: EventsIcon },
  { to: "/explore", label: "Explore", icon: ExploreIcon },
  { to: "/profile", label: "Profile", icon: ProfileIcon },
];

function EventsIcon() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: "var(--color-paper)" }}>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col w-[17rem] border-r p-6 gap-2 fixed h-full"
        style={{ borderColor: "var(--color-line)", background: "var(--color-panel)" }}
      >
        <div className="mb-8">
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "var(--color-ink)" }}>Free</span>
            <span style={{ color: "var(--color-accent)" }}>Meetup</span>
          </h1>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--color-muted)" }}>
            Discover what's happening near you
          </p>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
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

        <div className="mt-auto pt-6 border-t text-[11px]" style={{ borderColor: "var(--color-line)", color: "var(--color-muted)" }}>
          <a
            href="https://freeappstore.online"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Part of FreeAppStore — free forever
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-[17rem] pb-20 md:pb-0">
        <div className="max-w-2xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile bottom dock */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 border-t flex justify-around items-center h-16 z-50 backdrop-blur-xl"
        style={{
          background: "rgba(245,243,240,0.92)",
          borderColor: "var(--color-line)",
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className="flex flex-col items-center gap-0.5 text-[10px] font-medium"
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
