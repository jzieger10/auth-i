import React from "react"; 

const UserList = (props) => {
    console.log(props)
    return (

            
            // {if (!this.props.users) {
            // 	setTimeout( () => {
            // 		return <h2>Loading...</h2>;
            // 	}, 1000)
                
            // }}
            
                <div className="userListContainer">
                    
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

export default UserList;