const validation = (recipe) => {
    let errors = {};
    const regexUrl = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  
    if (!recipe.title) {
      errors.title = "Type the name of the recipe";
    }
  
    if (!recipe.summary) {
      errors.summary = "Write a summary of your recipe";
    }
  
    if (!regexUrl.test(recipe.image)) {
      errors.image = "Type a valid url";
    }
  
    if (recipe.healthScore <= 0 || recipe.healthScore > 100) {
      errors.healthScore = "the health score has to be greater than 0 and less than 100";
    }
  
    if (recipe.steps.length === 0) {
      errors.steps = "Add at least one step";
    }
  
    if (recipe.diets.length === 0) {
      errors.diets = "add at least one type of diet";
    }
    // console.log("error", errors)
    return errors;
  }
  
  export default validation; 