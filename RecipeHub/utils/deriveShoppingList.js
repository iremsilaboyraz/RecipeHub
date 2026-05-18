export function deriveShoppingList(weeklyPlan, recipes) {
  if (!weeklyPlan || !recipes || recipes.length === 0) return [];
  const plannedIds = [];
  Object.values(weeklyPlan).forEach(dayList => {
    if (Array.isArray(dayList)) {
      plannedIds.push(...dayList);
    }
  });

  if (plannedIds.length === 0) return [];
  const ingredientsMap = {};

  plannedIds.forEach(id => {
    const recipe = recipes.find(r => r.id === id);
    if (recipe && recipe.ingredients) {
      recipe.ingredients.forEach(ingredient => {
        const cleanName = ingredient.trim().toLowerCase();
        if (ingredientsMap[cleanName]) {
          ingredientsMap[cleanName].count += 1;
        } else {
          ingredientsMap[cleanName] = {
            name: ingredient,
            count: 1,
            checked: false,
            category: "General"
          };
        }
      });
    }
  });

  const categories = {};
  Object.values(ingredientsMap).forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });

  return Object.keys(categories).map(catName => ({
    title: catName,
    data: categories[catName]
  }));
}
