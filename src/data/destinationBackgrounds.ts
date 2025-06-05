export const destinationBackgrounds = {
  'benidorm': "https://images.unsplash.com/photo-1591960115793-b6eb1f3a7c7f?q=80&w=2070&auto=format&fit=crop",
  'alicante old town': "https://images.unsplash.com/photo-1558642084-fd07fae5282e?q=80&w=2070&auto=format&fit=crop",
  'valencia': "https://images.unsplash.com/photo-1599302592205-d7d683c83eea?q=80&w=2070&auto=format&fit=crop",
  'torrevieja': "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
} as const;

export type DestinationKey = keyof typeof destinationBackgrounds; 