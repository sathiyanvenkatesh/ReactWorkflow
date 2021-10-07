import React,{useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes, recipesSelector } from '../../redux-sclice/RecipesSclice'
//import { selectUser } from '../../redux-sclice/UserSclice';
import  '../ApiCallExample/recipes.css';


 function ApiCallExample() {
    const dispatch = useDispatch()
    const { recipes, loading, hasErrors } = useSelector(recipesSelector)
   // const user = useSelector(selectUser)

    useEffect(() => {
        dispatch(fetchRecipes())
      }, [dispatch])


    const renderRecipes = () => {
        if (loading) return <p>Loading recipes...</p>
        if (hasErrors) return <p>Cannot display recipes...</p>
    
        return recipes.map(recipe =>
          <div key={recipe.idMeal} className='rectile'>
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt=''/>
          </div>
        )
      }



    return (
        <div>
            
            <section>
               <h1>Recipes</h1>
                <div className='reccontent'>
                    {renderRecipes()}
                </div>
           </section>
            

        </div>
    )
}
export default ApiCallExample;
