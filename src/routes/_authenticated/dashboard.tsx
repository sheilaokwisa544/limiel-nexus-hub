import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  beforeLoad: ({ search }) => {
    const section = typeof search === "object" && search && "section" in search ? String(search.section) : "overview";
    throw redirect({ to: "/admin", search: { section } });
  },
});
