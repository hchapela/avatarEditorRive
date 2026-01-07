// src/avatarConfig.js
// SINGLE SOURCE OF TRUTH for all avatar categories
// To add a new category, just add one entry here!

export const AVATAR_CATEGORIES = {
  lips: {
    id: "lips",
    label: "Lips",                    // Fallback label for nav button
    enumProperty: "Lips Color",       // Enum property name in Rive ViewModel
    titleProperty: "Lips Title",      // String property name in Rive ViewModel (optional)
  },
  skin: {
    id: "skin",
    label: "skin",                    // Fallback label for nav button
    enumProperty: "Skin Color",       // Enum property name in Rive ViewModel
    titleProperty: "SkinTitle",      // String property name in Rive ViewModel (optional)
  },
  nose: {
    id: "nose",
    label: "nose",                    // Fallback label for nav button
    enumProperty: "Nose",       // Enum property name in Rive ViewModel
    titleProperty: "NoseTitle",      // String property name in Rive ViewModel (optional)
  },
  mouth: {
    id: "mouth",
    label: "mouth",                    // Fallback label for nav button
    enumProperty: "Mouth",       // Enum property name in Rive ViewModel
    titleProperty: "MouseTitle",      // String property name in Rive ViewModel (optional)
  },
  hairs: {
    id: "hairs",
    label: "hairs",                    // Fallback label for nav button
    enumProperty: "Hairs Style",       // Enum property name in Rive ViewModel
    titleProperty: "HairsTitle",      // String property name in Rive ViewModel (optional)
  },
  hairsColor: {
    id: "hairsColor",
    label: "hairsColor",                    // Fallback label for nav button
    enumProperty: "Hairs Color",       // Enum property name in Rive ViewModel
    titleProperty: "HairsColorTitle",      // String property name in Rive ViewModel (optional)
  },
  eyes: {
    id: "eyes",
    label: "eyes",                    // Fallback label for nav button
    enumProperty: "Eyes",       // Enum property name in Rive ViewModel
    titleProperty: "EyesTitle",      // String property name in Rive ViewModel (optional)
  },
  ears: {
    id: "ears",
    label: "ears",                    // Fallback label for nav button
    enumProperty: "Ears",       // Enum property name in Rive ViewModel
    titleProperty: "EarsTitle",      // String property name in Rive ViewModel (optional)
  },
  background: {
    id: "background",
    label: "background",                    // Fallback label for nav button
    enumProperty: "Background Color",       // Enum property name in Rive ViewModel
    titleProperty: "BackgroundTitle",      // String property name in Rive ViewModel (optional)
  },
  
  // TO ADD A NEW CATEGORY, COPY THIS TEMPLATE:
  // categoryId: {
  //   id: "categoryId",
  //   label: "Category Name",
  //   enumProperty: "Category Enum Name In Rive",
  //   titleProperty: "Category Title In Rive",  // Optional
  // },

  // Example for future categories:
  // hair: {
  //   id: "hair",
  //   label: "Hair",
  //   enumProperty: "Hair Style",
  //   titleProperty: "Hair Title",
  // },
  // skin: {
  //   id: "skin",
  //   label: "Skin",
  //   enumProperty: "Skin Tone",
  //   titleProperty: "Skin Title",
  // },
};

// Helper to get array of categories for navigation
export const getCategoryList = () => {
  return Object.values(AVATAR_CATEGORIES);
};

// Helper to get category by id
export const getCategory = (id) => {
  return AVATAR_CATEGORIES[id];
};