import chefClaude from "../assets/chefClaude.svg"


function Header(){
    return(
        <>
            <header>
                <img src={chefClaude} alt="Chef Claude icon" />
                <h1>Chef Claude</h1>
            </header>
        </>
    )
}

export default Header