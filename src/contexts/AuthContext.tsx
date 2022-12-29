import { createContext, ReactNode, useEffect, useState } from "react";

// import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from '@storage/storageAuthToken';
// import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';

import { api } from '@services/api';
import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  singIn: (email: string, password: string) => Promise<void>;
//   updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
//   signOut: () => Promise<void>;
//   isLoadingUserStorageData: boolean;
//   refreshedToken: string;
}

type AuthContextProviderProps = { 
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps)  {

  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  // const [user, setUser] = useState({
   
  //   id: '1',
  //   name: 'John',
  //   email: 'john@example.com',
  //   avatar: 'http://example.com',
    
  // });

//   const [refreshedToken, setRefreshedToken] = useState('');
//   const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

//   async function userAndTokenUpdate(userData: UserDTO, token: string) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//     setUser(userData);
//   }

    // async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    //     try {
    //     setIsLoadingUserStorageData(true)
    //     await storageUserSave(userData);
    //     await storageAuthTokenSave(token);
        
    //     } catch (error) {
    //     throw error
    //     } finally {
    //     setIsLoadingUserStorageData(false);
    //     }
    // }

    async function singIn(email: string, password: string) {     
      // setUser ({
      //   id: '',
      //   name: '',
      //   email,
      //   avatar: '',
      // })   
        try {
            const { data } = await api.post('/sessions', { email, password });

            if(data.user){
                setUser(data.user);
                // console.log(data.user);
                // console.log("Dados do usuario", data.user);
            }
            
            // if(data.user && data.token) {
            //     await storageUserAndTokenSave(data.user, data.token);
            //     userAndTokenUpdate(data.user, data.token)
            // }
        } catch (error) {
            throw error
        } 
    //     finally {
    //         setIsLoadingUserStorageData(false);
    //     }
    // }

    // async function signOut() {
    //     try {
    //     setIsLoadingUserStorageData(true);
    //     setUser({} as UserDTO);
    //     await storageUserRemove();
    //     await storageAuthTokenRemove();
    //     } catch (error) {
    //     throw error;
    //     } finally {
    //     setIsLoadingUserStorageData(false);
    //     }
    // }

    // async function updateUserProfile(userUpdated: UserDTO) {
    //     try {
    //     setUser(userUpdated);
    //     await storageUserSave(userUpdated);
    //     } catch (error) {
    //     throw error;
    //     }
    // }

    // async function loadUserData() {
    //     try {
    //     setIsLoadingUserStorageData(true);

    //     const userLogged = await storageUserGet();
    //     const token = await storageAuthTokenGet();
        
    //     if(token && userLogged) {
    //         userAndTokenUpdate(userLogged, token);
    //     } 
    //     } catch (error) {
    //     throw error
    //     } finally {
    //     setIsLoadingUserStorageData(false);
    //     }
    // }
}
//   function refreshTokenUpdated(newToken: string) {
//     setRefreshedToken(newToken);
//   }

//   useEffect(() => {
//     loadUserData()
//   },[])

//   useEffect(() => {
//     const subscribe = api.registerInterceptTokenManager({ signOut, refreshTokenUpdated });

//     return () => {
//       subscribe();
//     }
//   },[])

  return (
    <AuthContext.Provider 
        value={{ //Pega essa parte e leva la pra dentro do App.tsx
            // user: {
            //     id: 'Jr',
            //     name: 'John',
            //     email: 'john@example.com',
            //     avatar: 'http://example.com',
            // }

            user,             
            singIn,
            // updateUserProfile,
            // signOut,
            // isLoadingUserStorageData,
            // refreshedToken
        }}
    >
      {children}
    </AuthContext.Provider>
  )
}





// import { createContext, ReactNode, useEffect, useState } from "react";

// import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from '@storage/storageAuthToken';
// import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';

// import { api } from '@services/api';
// import { UserDTO } from "@dtos/UserDTO";

// export type AuthContextDataProps = {
//   user: UserDTO;
//   singIn: (email: string, password: string) => Promise<void>;
//   updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
//   signOut: () => Promise<void>;
//   isLoadingUserStorageData: boolean;
//   refreshedToken: string;
// }

// type AuthContextProviderProps = {
//   children: ReactNode;
// }

// export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

// export function AuthContextProvider({ children }: AuthContextProviderProps)  {

//   const [user, setUser] = useState<UserDTO>({} as UserDTO);
//   const [refreshedToken, setRefreshedToken] = useState('');
//   const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

//   async function userAndTokenUpdate(userData: UserDTO, token: string) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//     setUser(userData);
//   }

//   async function storageUserAndTokenSave(userData: UserDTO, token: string) {
//     try {
//       setIsLoadingUserStorageData(true)
//       await storageUserSave(userData);
//       await storageAuthTokenSave(token);
      
//     } catch (error) {
//       throw error
//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   async function singIn(email: string, password: string) {
//     try {
//       const { data } = await api.post('/sessions', { email, password });
     
//       if(data.user && data.token) {
//         await storageUserAndTokenSave(data.user, data.token);
//         userAndTokenUpdate(data.user, data.token)
//       }
//     } catch (error) {
//       throw error
//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   async function signOut() {
//     try {
//       setIsLoadingUserStorageData(true);
//       setUser({} as UserDTO);
//       await storageUserRemove();
//       await storageAuthTokenRemove();
//     } catch (error) {
//       throw error;
//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   async function updateUserProfile(userUpdated: UserDTO) {
//     try {
//       setUser(userUpdated);
//       await storageUserSave(userUpdated);
//     } catch (error) {
//       throw error;
//     }
//   }

//   async function loadUserData() {
//     try {
//       setIsLoadingUserStorageData(true);

//       const userLogged = await storageUserGet();
//       const token = await storageAuthTokenGet();
      
//       if(token && userLogged) {
//         userAndTokenUpdate(userLogged, token);
//       } 
//     } catch (error) {
//       throw error
//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   function refreshTokenUpdated(newToken: string) {
//     setRefreshedToken(newToken);
//   }

//   useEffect(() => {
//     loadUserData()
//   },[])

//   useEffect(() => {
//     const subscribe = api.registerInterceptTokenManager({ signOut, refreshTokenUpdated });

//     return () => {
//       subscribe();
//     }
//   },[])

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       singIn,
//       updateUserProfile,
//       signOut,
//       isLoadingUserStorageData,
//       refreshedToken
//     }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }