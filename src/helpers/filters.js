
export const filterByType = (items, type) => items.filter(item => !type || item.type === type)

export const filterByCity = (items, city) => items.filter(item => !city || item.city === city)