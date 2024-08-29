const { ...faIcons } = require('react-icons/fa');
const { ...mdIcons } = require('react-icons/md');
const { ...ioIcons } = require('react-icons/io');
const { ...tiIcons } = require('react-icons/ti');
const { ...goIcons } = require('react-icons/go');
const { ...fiIcons } = require('react-icons/fi');
const { ...giIcons } = require('react-icons/gi');
const { ...wiIcons } = require('react-icons/wi');

function getAllIcons() {
  const allIcons = [
    { packageName: 'fa', icons: faIcons },
    { packageName: 'md', icons: mdIcons },
    { packageName: 'io', icons: ioIcons },
    { packageName: 'ti', icons: tiIcons },
    { packageName: 'go', icons: goIcons },
    { packageName: 'fi', icons: fiIcons },
    { packageName: 'gi', icons: giIcons },
    { packageName: 'wi', icons: wiIcons }
  ];

  return allIcons.flatMap(({ packageName, icons }) =>
    Object.keys(icons).map(iconName => ({
      name: iconName,
      packageName,
      component: icons[iconName]
    }))
  );
}

module.exports = {
  getAllIcons
};
