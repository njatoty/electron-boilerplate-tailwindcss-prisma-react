import { PosPrintTableField } from '@plick/electron-pos-printer';
import OSApi from '../os-api'

/**
 * Method to fetch all users
 * @returns Array of Users
 */
export const getUsers = async () => {
    const users = await OSApi.prisma().user.findMany();
    return users;
}

/**
 * Method to fetch a default user
 * @returns Array of Users
 */
declare type getDefaultUser = () => Promise<UserType>;
export const getDefaultUser = async () => {
    const user = await OSApi.prisma().user.findFirst({
        where: { default: true },
        include: { location: true }
    });
    return user;
}

/**
 * Method to create a new User
 * @param {UserObject} newUser user infos
 * @returns the created user as Object or null
 */
export const createUser = async (newUser: any) => {
    try {
        const created = await OSApi.prisma().user.create({
            data: newUser,
            include: {
                location: true
            }
        });
    
        return created;
    } catch (error) {
        return null;
    }
}

/**
 * Method to get all colis
 * @param filter object to filter
 * @returns Array of colis or empty array
 */
export const getColis = async (filter = {}) => {
    try {
        const colis = await OSApi.prisma().colis.findMany({
            where: {...filter},
            include: {
                to: true,
                from: true
            },
            orderBy: { date: 'desc' }            
        });
        return colis;
    } catch (error) {
        return []
    }
}


/**
 * Method to create a new colis
 * @param {ColisObject} data 
 * @returns colis
 */
export const createColis = async (newColis: any) => {
    const created = await OSApi.prisma().colis.create({
        data: newColis,
        include: {
            from: true,
            to: true
        }
    });

    return created;
}

/**
 * Method to update colis
 * @param id id of Colis number
 * @param newColis new Colis object
 * @returns Colis
 */
export const updateColis = async (id: number, newColis: any) => {
    const updated = await OSApi.prisma().colis.update({
        where: { id: id },
        data: newColis,
        include: {
            from: true,
            to: true
        }
    });

    return updated;
}


/**
 * Method to get all locations
 * @returns Array of locations or empty array
 */
declare type getLocations = () => Promise<Location[]>;
export const getLocations  = async () => {
    try {
        const locations = await OSApi.prisma().location.findMany({
            include: {
                toColis: true,
                fromColis: true,
                _count: true,
                User: true
            }
        });
        return locations;
    } catch (error) {
        return [];
    }

}
