export const tags = ["Sale", "Coupon", "Free Gift", "Quick Pickup"];

export const getTagsByIndices = (indices) => indices.map(index => tags[index]);

export const getTagsByRange = (range) => {
  const [start, end] = range.split(':').map(Number);
  return tags.slice(start, end);
};
