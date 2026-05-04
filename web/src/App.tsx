import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Shell } from "./components/Shell";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { EventPage } from "./pages/Event";
import { GroupPage } from "./pages/Group";
import { Profile } from "./pages/Profile";

export function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/group/:id" element={<GroupPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}
