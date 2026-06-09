import type { CuratedContributor } from "@/lib/types";
import curatedContributors from "@/data/curated-exhibition.json";

export const curatedExhibition =
  curatedContributors satisfies CuratedContributor[];
