"use client";

import QuickSeach from "./components/QuickSeach";
import TripSearch from "./components/TripSearch";

export default function Home() {
  return (
    <div>
      <TripSearch />
      <QuickSeach />
    </div>
  );
}
