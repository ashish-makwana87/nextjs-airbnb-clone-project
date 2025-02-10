'use server'



export const createProfileAction = async (prevState:any, formData:FormData):Promise<{message: string}> => {


return {message: 'profile created'}

}