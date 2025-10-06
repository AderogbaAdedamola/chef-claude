import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"
import deleteIcon from "../assets/deleteIcon.svg"
import Loader from "./Loader"

function Main() {


    const [ingredients, setIngredients] = React.useState([])
     const [recipe, setRecipe] = React.useState("")

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
        
        let receivedRecipe = await getRecipeFromMistral(ingredients)
        setRecipe(receivedRecipe)
    }
    function deleteIngredient(indexToDelete){
            setIngredients(prev => prev.filter((_, index)=> index !== indexToDelete ))
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
                    ingredientsListItems={ingredientsListItems}
                    deleteIngredient={deleteIngredient}
                />}
            {recipe &&  <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}

export default Main