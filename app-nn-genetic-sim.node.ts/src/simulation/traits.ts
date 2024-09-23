export interface Traits {
  speed: number;
  strength: number;
  loveStruckness: number;
  tribeLoyalty: number;
  oneTrueLove: number;
  grouping: number; // "GroupHug" - tendency to group with faction members
  leadership: number; // "LeaderAura" - ability to influence others
  resourcefulness: number; // "FrugalNature" - how effectively they use resources
}

export function combineTraits(traits1: Traits, traits2: Traits): Traits {
  return {
    speed: (traits1.speed + traits2.speed) / 2,
    strength: (traits1.strength + traits2.strength) / 2,
    loveStruckness: (traits1.loveStruckness + traits2.loveStruckness) / 2,
    tribeLoyalty: (traits1.tribeLoyalty + traits2.tribeLoyalty) / 2,
    oneTrueLove: (traits1.oneTrueLove + traits2.oneTrueLove) / 2,
    grouping: (traits1.grouping + traits2.grouping) / 2,
    leadership: (traits1.leadership + traits2.leadership) / 2,
    resourcefulness: (traits1.resourcefulness + traits2.resourcefulness) / 2,
  };
}

export function mutateTraits(traits: Traits): Traits {
  return {
    speed: traits.speed + (Math.random() - 0.5) * 0.1,
    strength: traits.strength + (Math.random() - 0.5) * 0.1,
    loveStruckness: traits.loveStruckness + (Math.random() - 0.5) * 0.1,
    tribeLoyalty: traits.tribeLoyalty + (Math.random() - 0.5) * 0.1,
    oneTrueLove: traits.oneTrueLove + (Math.random() - 0.5) * 0.1,
    grouping: traits.grouping + (Math.random() - 0.5) * 0.1,
    leadership: traits.leadership + (Math.random() - 0.5) * 0.1,
    resourcefulness: traits.resourcefulness + (Math.random() - 0.5) * 0.1,
  };
}
