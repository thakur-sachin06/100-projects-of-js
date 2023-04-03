function main() {
  //const ingredients = ["SeasoningOregano", "FatOil", "FatEgg"];
  const ingredients = ["Fat1", "Fiber1", "Carb1", "Fat2", "Fiber2"];

  let result = "";

  const getValidDays = (category, index) => {
    if (category === "Fat") {
      return [index, index + 1];
    } else if (category === "Carb") {
      return [index, index + 1, index + 2];
    } else if (category === "Protien" || category === "Fiber") {
      return [index, index + 1, index + 2, index + 3];
    } else {
      return [index, index + 1, index + 2, index + 3, index + 5];
    }
  };

  const ingCategories = ["Fat", "Fiber", "Carb", "Protein", "Seasoning"];

  const list = ingredients.map((elt, index) => {
    let name, category;
    ingCategories.map((cat) => {
      if (elt.includes(cat)) {
        const len = cat.length;
        category = elt.substring(0, len);
        name = elt.substring(len, elt.length);
      }
    });
    return {
      category,
      name,
      validDays: getValidDays(category, index),
    };
  });

  const getValidIngredients = (list, day) => {
    return list.filter((elt) => {
      if (elt && elt.validDays) {
        if (elt.validDays.includes(day)) {
          return elt;
        }
      } else {
        return elt;
      }
    });
  };

  const canMakeRecepie = (ingredientsListByDays) => {
    const ingredients = new Set();
    let usedIndexs = [];

    let ingObj = {};

    ingredientsListByDays.forEach((elt) => {
      const keys = Object.keys(ingObj);
      if (keys.indexOf(elt.category) >= 0) {
        ingObj[elt.category] = ingObj[elt.category] + 1;
      } else {
        ingObj[elt.category] = 1;
      }
      ingredients.add(elt.category);
    });

    const repeateIng = Object.keys(ingObj).filter((elt) => {
      if (ingObj[elt] > 1) {
        return elt;
      }
    });

    let ingUsed = [];
    let isAtleastSameUsed = 0;

    let usedVar = "";

    if (ingredients.size < ingredientsListByDays.length) {
      let names = [];
      ingredientsListByDays.forEach((elt, index) => {
        if (ingUsed.length === 3) {
          return;
        }
        if (ingUsed.length === 0) {
          usedIndexs.push(index);
          ingUsed.push(elt.category);
          if (repeateIng.indexOf(elt.category) >= 0) {
            isAtleastSameUsed++;
            usedVar = elt.category;
          }
          if (result[result.length - 1] === "#") {
            result += `${elt.category}${elt.name}`;
          } else {
            result += `:${elt.category}${elt.name}`;
          }
          names.push(elt.name);
        } else {
          if (ingUsed.length === 1) {
            if (isAtleastSameUsed == 1) {
              // repeated category at index 0;
              if (repeateIng.indexOf(elt.category) >= 0) {
                isAtleastSameUsed++;
              }
              ingUsed.push(elt.category);
              usedIndexs.push(index);
              names.push(elt.name);
              if (result[result.length - 1] === "#") {
                result += `${elt.category}${elt.name}`;
              } else {
                result += `:${elt.category}${elt.name}`;
              }
            } else {
              if (elt.category === usedIndexs) {
                isAtleastSameUsed++;
                ingUsed.push(elt.category);
                usedIndexs.push(index);
                names.push(elt.name);
                if (result[result.length - 1] === "#") {
                  result += `${elt.category}${elt.name}`;
                } else {
                  result += `:${elt.category}${elt.name}`;
                }
              }
            }
          } else {
            if (isAtleastSameUsed > 1) {
              ingUsed.push(elt.category);
              usedIndexs.push(index);
              names.push(elt.name);
              if (result[result.length - 1] === "#") {
                result += `${elt.category}${elt.name}`;
              } else {
                result += `:${elt.category}${elt.name}`;
              }
            } else {
              if (usedVar === elt.category) {
                isAtleastSameUsed++;
                ingUsed.push(elt.category);
                usedIndexs.push(index);
                names.push(elt.name);
                if (result[result.length - 1] === "#") {
                  result += `${elt.category}${elt.name}`;
                } else {
                  result += `:${elt.category}${elt.name}`;
                }
              }
            }
          }
        }
      });
    } else {
      result += "#";
    }
    return ingredientsListByDays.filter((elt, index) => {
      if (usedIndexs.indexOf(index) < 0) {
        return elt;
      }
    });
  };

  let ingredientsListByDays = [];

  list.map((elt, index) => {
    if (index < 2) {
      ingredientsListByDays.push(elt);
      result += "#";
    } else {
      ingredientsListByDays.push(elt);
      ingredientsListByDays = [
        ...getValidIngredients(ingredientsListByDays, index),
      ];
      if (ingredientsListByDays.length >= 3) {
        ingredientsListByDays = [
          ...canMakeRecepie(ingredientsListByDays, index),
        ];
      } else {
        result += "#";
      }
    }
  });
  console.log(result);
}

main();
