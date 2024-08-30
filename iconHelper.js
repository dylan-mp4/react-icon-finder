const iconPackages = {
  fa: () => import('react-icons/fa'),
  md: () => import('react-icons/md'),
  io: () => import('react-icons/io'),
  ti: () => import('react-icons/ti'),
  go: () => import('react-icons/go'),
  fi: () => import('react-icons/fi'),
  gi: () => import('react-icons/gi'),
  wi: () => import('react-icons/wi'),
  ai: () => import('react-icons/ai'),
  bs: () => import('react-icons/bs'),
  bi: () => import('react-icons/bi'),
  ci: () => import('react-icons/ci'),
  cg: () => import('react-icons/cg'),
  di: () => import('react-icons/di'),
  fa6: () => import('react-icons/fa6'),
  gr: () => import('react-icons/gr'),
  hi: () => import('react-icons/hi'),
  hi2: () => import('react-icons/hi2'),
  lia: () => import('react-icons/lia'),
  io5: () => import('react-icons/io5'),
  lu: () => import('react-icons/lu'),
  pi: () => import('react-icons/pi'),
  im: () => import('react-icons/im'),
  rx: () => import('react-icons/rx'),
  ri: () => import('react-icons/ri'),
  si: () => import('react-icons/si'),
  sl: () => import('react-icons/sl'),
  tb: () => import('react-icons/tb'),
  tfi: () => import('react-icons/tfi'),
  vsc: () => import('react-icons/vsc'),
};


async function getAllIcons() {
  const IconPackages = Object.entries(iconPackages);
  const allIconsPromises = IconPackages.map(async ([packageName, importFunc]) => {
    const iconsModule = await importFunc();
    const icons = Object.keys(iconsModule).map(iconName => ({
      name: iconName,
      packageName,
      component: iconsModule[iconName]
    }));
    return icons;
  });

  const allIcons = await Promise.all(allIconsPromises);
  return allIcons.flat();
}

module.exports = {
  getAllIcons,
};