import React from "react"; 

const Login = (props) => {
    console.log(props)
    return (

            
            // {if (!this.props.users) {
            // 	setTimeout( () => {
            // 		return <h2>Loading...</h2>;
            // 	}, 1000)
                
            // }}
            
                <div className="LoginContainer">
                    
                    {props.users.map(user => {
                        return (
                            <div className="user-card">
                                <h4>{user.username}</h4>
                            </div>
                        );
                    })}
                </div>
            
        
    )
}

export default Login;

