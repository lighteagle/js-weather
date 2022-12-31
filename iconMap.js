export const ICON_MAP = new Map()

addMapping('sun', [0, 1])
addMapping('cloud-sun', [2])
addMapping('cloud', [3])
addMapping('smog', [45, 48])
addMapping('cloud-showers-heavy', [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82])
addMapping('snowflake', [71, 73, 75, 77, 85, 86])
addMapping('cloud-bolt', [95, 96, 99])

function addMapping(icon, values) {
    values.forEach(value => {
        ICON_MAP.set(value, icon)
    });
}