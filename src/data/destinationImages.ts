export const destinationImages = {
  benidorm: {
    card: 'https://images.unsplash.com/photo-1563464839523-e89ba020c9ae?q=80&w=1080&auto=format&fit=crop&h=600',
    background: 'https://images.unsplash.com/photo-1563464839523-e89ba020c9ae?q=80&w=2070&auto=format&fit=crop'
  },
  'alicante old town': {
    card: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?q=80&w=1080&auto=format&fit=crop&h=600',
    background: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?q=80&w=2070&auto=format&fit=crop'
  },
  valencia: {
    card: 'https://images.unsplash.com/photo-1599302592205-d7d683c83eea?q=80&w=1080&auto=format&fit=crop&h=600',
    background: 'https://images.unsplash.com/photo-1599302592205-d7d683c83eea?q=80&w=2070&auto=format&fit=crop'
  },
  torrevieja: {
    card: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1080&auto=format&fit=crop&h=600',
    background: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop'
  }
} as const;

export type DestinationKey = keyof typeof destinationImages; 