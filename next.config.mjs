/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/whatsapp',
        destination: 'https://chat.whatsapp.com/IB17XyKKIvx2uo0i5DYDTS',
        permanent: false,
      },
      {
        source: '/pitch',
        destination:
          'https://drive.google.com/file/d/1BFzPUQeP3Bg4bWRCpgaFdn0aDFhkdDEC/view?usp=drive_link',
        permanent: false,
      },
      {
        source: '/cfs',
        destination:
          'https://drive.google.com/file/d/1soWn87dbySO8v0jkYYRvnd-r4p8TLb41/view?usp=drive_link',
        permanent: false,
      },
      {
        source: '/promo',
        destination:
          'https://drive.google.com/file/d/1UFZy_bTjjfhSDbQqvmb320T1tQrQJrbS/view?usp=sharing',
        permanent: false,
      },
      {
        source: '/brochure',
        destination:
          'https://drive.google.com/file/d/1fa5Zmy4cOSogwEWpy-PuJLb28t_OUOpa/view?usp=sharing',
        permanent: false,
      },
      {
        source: '/brochure/2025',
        destination:
          'https://drive.google.com/file/d/1wmr05QY9ebaUiBqkTeSoYrb9qdzvIUGy/view?usp=sharing',
        permanent: false,
      },
      {
        source: '/hackathon',
        destination:
          'https://docs.google.com/document/d/10FFd2EFpc8zbkx7lNp_OVV-GbP4B6wEP2Jekwub_-Zk/edit?usp=sharing',
        permanent: false,
      },
    ];
  },
  experimental: {},
  async rewrites() {
    return [
      {
        source: '/api/ambassadors/stream',
        destination: '/api/ambassadors/leaderboard',
      },
    ];
  },
};

export default nextConfig;
