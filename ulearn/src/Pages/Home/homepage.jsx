import { UserButton, useUser } from '@clerk/clerk-react';
function homePage(){
    return(
        <div>
            <h1>Home Page</h1>
            <p>Welcome to uLearn</p>
            <UserButton />
        </div>

    )

}
export default homePage;