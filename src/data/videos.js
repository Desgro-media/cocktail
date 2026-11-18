// Compressed reels live in /public/videos (reel-N.mp4 + reel-N.jpg poster).
// Original camera files are kept in /source-media (not served by the website).
export const VIDEOS = [
  { id: 1, src: '/videos/reel-1.mp4', poster: '/videos/reel-1.jpg', title: 'Temple themed print shirt' },
  { id: 2, src: '/videos/reel-2.mp4', poster: '/videos/reel-2.jpg', title: 'Ayyappa themed shirt' },
  { id: 3, src: '/videos/reel-3.mp4', poster: '/videos/reel-3.jpg', title: 'Ayyappa Darshanam shirt' },
  { id: 4, src: '/videos/reel-4.mp4', poster: '/videos/reel-4.jpg', title: 'Print detail, up close' },
  { id: 5, src: '/videos/reel-5.mp4', poster: '/videos/reel-5.jpg', title: 'Dad and son combo' },
];

// Video used in the landing page hero
export const HERO_VIDEO = VIDEOS[3];
