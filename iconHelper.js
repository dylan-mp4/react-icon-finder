const iconKeys = [
  'fa', 'md', 'io', 'ti', 'go', 'fi', 'gi', 'wi', 'ai', 'bs', 'bi', 'ci', 'cg', 
  'di', 'fa6', 'gr', 'hi', 'hi2', 'lia', 'io5', 'lu', 'pi', 'im', 'rx', 'ri', 
  'si', 'sl', 'tb', 'tfi', 'vsc', 'fc'
];

const iconPackages = iconKeys.reduce((acc, key) => {
  acc[key] = () => require(`react-icons/${key}`);
  return acc;
}, {});


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