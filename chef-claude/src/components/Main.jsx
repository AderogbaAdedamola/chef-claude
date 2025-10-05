import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"
import Loader from "./Loader"

function Main() {


    const [ingredients, setIngredients] = React.useState([])

    function submitAction(formData) {
        const newIngredient = formData.get("ingredient")
        console.log(newIngredient);
        setIngredients((prevIngredients)=> [...prevIngredients, newIngredient])
    }
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe(){
        
        let receivedRecipe = await getRecipeFromMistral(ingredients)
        setRecipe(receivedRecipe)
    }
    
    
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
                />}
            {recipe &&  <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}

export default Main