import { NextApiRequest, NextApiResponse } from "next";

// JWT (storage)
// next Auth (Social( facebook, gitHub, google)) 
// cognito, Auth0

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, nome: 'Diego' },
        { id: 2, nome: 'Marcela' },
        { id: 3, nome: 'Kamyla' },
    ]
    return response.json(users);
};