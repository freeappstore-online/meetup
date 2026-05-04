import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Event } from "../types";
import { Link } from "react-router-dom";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function categoryColor(cat: string): string {
  const colors: Record<string, string> = {
    tech: "#6366f1",
    music: "#ec4899",
    sports: "#f59e0b",
    arts: "#8b5cf6",
    social: "#10b981",
    outdoor: "#22c55e",
    gaming: "#ef4444",
    food: "#f97316",
  };
  return colors[cat] || "#6b7280";
}

function createMarkerIcon(category: string) {
  const color = categoryColor(category);
  return L.divIcon({
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    html: `<div style="
      width:32px;height:32px;border-radius:50%;
      background:${color};
      border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
      display:flex;align-items:center;justify-content:center;
    "></div>`,
  });
}

function FitBounds({ events }: { events: Event[] }) {
  const map = useMap();

  if (events.length > 0) {
    const bounds = L.latLngBounds(events.map((e) => [e.lat, e.lng]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
  }

  return null;
}

interface EventMapProps {
  events: Event[];
  onSelect?: (id: string) => void;
  className?: string;
}

export function EventMap({ events, onSelect, className }: EventMapProps) {
  const first = events[0];
  const center: [number, number] = first
    ? [first.lat, first.lng]
    : [40.7128, -74.006];

  return (
    <MapContainer
      center={center}
      zoom={12}
      className={className}
      style={{ width: "100%", height: "100%", borderRadius: "var(--radius-card)" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <FitBounds events={events} />
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.lat, event.lng]}
          icon={createMarkerIcon(event.category)}
          eventHandlers={{
            click: () => onSelect?.(event.id),
          }}
        >
          <Popup>
            <div style={{ minWidth: 200, fontFamily: "var(--font-body)" }}>
              <Link
                to={`/event/${event.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <strong style={{ fontSize: 14 }}>{event.title}</strong>
              </Link>
              <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                {formatDate(event.date)}
              </div>
              <div style={{ fontSize: 12, color: "#666" }}>{event.location}</div>
              <div style={{ fontSize: 12, marginTop: 6 }}>
                <span
                  style={{
                    background: categoryColor(event.category),
                    color: "#fff",
                    padding: "2px 8px",
                    borderRadius: 12,
                    fontSize: 11,
                  }}
                >
                  {event.category}
                </span>
                <span style={{ marginLeft: 8, color: "#666" }}>
                  {event.attendeeCount} going
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
