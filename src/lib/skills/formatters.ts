import type { Skill } from "@/lib/registry/schema";

export function formatReliability(level: Skill["reliabilityLevel"]) {
  if (level === "high") {
    return "High Reliability";
  }

  if (level === "medium") {
    return "Medium Reliability";
  }

  return "Guidance-Heavy";
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
