import { useAuth } from "../hooks/useAuth";

export function Profile() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-32 rounded" style={{ background: "var(--color-panel)" }} />
        <div className="h-48 rounded" style={{ background: "var(--color-panel)", borderRadius: "var(--radius-card)" }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Profile
        </h1>
        <div
          className="p-8 text-center space-y-4"
          style={{
            borderRadius: "var(--radius-card)",
            background: "var(--color-panel)",
            border: "1px solid var(--color-line)",
          }}
        >
          <p style={{ color: "var(--color-muted)" }}>
            Sign in to RSVP to events and manage your profile.
          </p>
          <button
            onClick={() => signIn('github')}
            className="px-6 py-3 font-semibold text-white transition-colors"
            style={{
              borderRadius: "var(--radius-btn)",
              background: "var(--color-accent)",
            }}
          >
            Sign in with GitHub
          </button>
          <button
            onClick={() => signIn('google')}
            className="px-6 py-3 font-semibold text-white transition-colors"
            style={{
              borderRadius: "var(--radius-btn)",
              background: "var(--color-accent)",
            }}
          >
            Sign in with Google
          </button>
        </div>
        <div className="text-center text-xs pt-4" style={{ color: "var(--color-muted)" }}>
          <a href="https://freeappstore.online" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Part of FreeAppStore — free forever
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
        Profile
      </h1>

      <div
        className="p-6"
        style={{
          borderRadius: "var(--radius-card)",
          background: "var(--color-panel)",
          border: "1px solid var(--color-line)",
        }}
      >
        <div className="flex items-center gap-4 mb-6">
          {user.photo_url ? (
            <img
              src={user.photo_url}
              alt=""
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl"
              style={{ background: "var(--color-accent)" }}
            >
              {(user.name || user.email || "?").charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{user.name || "Anonymous"}</h2>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              {user.email}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2" style={{ color: "var(--color-muted)" }}>
              Interests
            </h3>
            <div className="flex gap-2 flex-wrap">
              {["tech", "music", "outdoor"].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{ background: "var(--color-line)", color: "var(--color-ink)" }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2" style={{ color: "var(--color-muted)" }}>
              My RSVPs
            </h3>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Your upcoming RSVPs will appear here.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={signOut}
        className="px-6 py-2 text-sm font-medium transition-colors"
        style={{
          borderRadius: "var(--radius-btn)",
          border: "1px solid var(--color-line)",
          color: "var(--color-muted)",
        }}
      >
        Sign out
      </button>

      <div className="text-xs pt-4" style={{ color: "var(--color-muted)" }}>
        <a href="https://freeappstore.online" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Part of FreeAppStore — free forever
        </a>
      </div>
    </div>
  );
}
