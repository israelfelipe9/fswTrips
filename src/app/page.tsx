"use client";

import QuickSeach from "./components/QuickSeach";
import RecommendedTrips from "./components/RecommendedTrips";
import TripSearch from "./components/TripSearch";

export default function Home() {
  return (
    <div>
      <TripSearch />
      <QuickSeach />
      <RecommendedTrips />
    </div>
  );
}
