import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"
import deleteIcon from "../assets/deleteIcon.svg"
import Loader from "./Loader"

function Main() {


    const [ingredients, setIngredients] = React.useState(["chicken", "all the main spices", "corn", "heavy cream", "pasta"])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)
    const [showLoader, setShowLoader] = React.useState(false)

     const ingredientsListItems = ingredients.map((ingredient, index) => (
        <li key={ingredient} className="ingredients">
            {ingredient} 
            <span 
                onClick={() => deleteIngredient(index)}
                className="delete-container">
                <img src={deleteIcon} alt="delete icon" />
            </span>
        </li>
      ))

    function submitAction(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients((prevIngredients)=> [...prevIngredients, newIngredient])
    }
   
    async function getRecipe(){
        setShowLoader(true)
        let receivedRecipe = await getRecipeFromMistral(ingredients)
        setShowLoader(false)
        setRecipe(receivedRecipe)
    }
    function deleteIngredient(indexToDelete){
            setIngredients(prev => prev.filter((_, index)=> index !== indexToDelete ))
    }
    React.useEffect(() => {
        if(recipe !== "" && recipeSection.current !== null){
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    },[recipe])
    
    return (
        <main>
            <form action={submitAction} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    id="ingredient-input"
                    required
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && 
                <IngredientsList 
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    ingredientsListItems={ingredientsListItems}
                    deleteIngredient={deleteIngredient}
                    ref={recipeSection}
                    showLoader={showLoader}
                />}
            {recipe &&  <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}

export default Main