import { Router } from "express";
import { RouterOptions } from "./router";
import { TestGroups } from "../modules/keycloak/adminClient";
import { KeycloakUserService } from "../modules/keycloak/service/UserService";
import { UpdateUserDto, UserDto } from "../modules/keycloak/dtos/UserDto";
import { NotAllowedError } from '@backstage/errors';

export async function createKeycloackRouter(options: RouterOptions): Promise<Router> {

    const router = Router();
    const {identity} = options

    const adminClientKeycloak = new TestGroups();
    const userServiceKeycloak = new KeycloakUserService();

    router.get("/logout", async (request, response) =>{
        try{
            const user = await identity.getIdentity({ request: request });
            if(!user) throw new NotAllowedError('Unauthorized');
            const userName = user?.identity.userEntityRef.split("/")[1] as string
            const logout = await userServiceKeycloak.logOut(userName)
            response.status(200).json({ status: 'ok', sessions: logout });
        }
        catch(e){          
            throw new Error("User not found")
        }
    });

    router.get('/groups', async (_, response) => {
        const groups = await adminClientKeycloak.getGroup();
        response.status(200).json({ status: 'ok', groups: groups });
    });

    router.post('/users', async (request, response) => {
        const user: UserDto = request.body.user;
        const id = await userServiceKeycloak.createUser(user);
        response.status(201).json({ status: 'ok', id: id });
    });

    router.get('/users', async (_, response) => {
        const users = await userServiceKeycloak.listUsers();
        response.status(200).json({ status: 'ok', users: users });
    });

    router.get('/users/:id', async (request, response) => {
        const user_id = request.params.id;
        const user = await userServiceKeycloak.findUser(user_id);
        response.status(200).json({ status: 'ok', users: user });
    });

    router.put('/users/:id', async (request, response) => {
        const code = request.params.id;
        const user: UpdateUserDto = request.body.user;
        await userServiceKeycloak.updateUser(code, user as UserDto);
        response.status(200).json({ status: 'User Updated!' });
    });

    router.delete('/users/:id', async (request, response) => {
        const user_id = request.params.id;
        await userServiceKeycloak.deleteUser(user_id);
        response.status(204).json({ status: 'User Deleted!' });
    });

    router.put(
        '/users/:id/groups/:groupId',
        async (request, response) => {
            const user_id = request.params.id;
            const groupId = request.params.groupId;
            const add = await userServiceKeycloak.addUserToGroup(user_id, groupId);
            response.status(200).json({ status: 'User added to group!', add: add });
        },
    );

    router.delete(
        '/users/:id/groups/:groupId',
        async (request, response) => {
            const user_id = request.params.id;
            const groupId = request.params.groupId;
            const res = await userServiceKeycloak.removeUserFromGroup(
                user_id,
                groupId,
            );
            response
                .status(204)
                .json({ status: 'User Removed From Group!', res: res });
        },
    );

    router.get('/users/:id/groups', async (request, response) => {
        const user_id = request.params.id;
        const groups = await userServiceKeycloak.listUserGroups(user_id);
        response.status(200).json({ status: 'ok', groups: groups });
    });

    return router;

}