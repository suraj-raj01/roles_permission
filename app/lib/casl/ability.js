// import { AbilityBuilder, createMongoAbility } from '@casl/ability';
// import { mapPermissionsToCasl } from './mapPermissions';

// export const AppAbility = createMongoAbility();

// export const AbilityClass = createMongoAbility;

// export const defineAbilitiesFor = (user) => {
//   const { can, rules } = new AbilityBuilder(AbilityClass);
//   console.log(user?.user?.user?.role?.permissions)
//   if (user?.user?.user?.role?.permissions) {
//     const permissions = mapPermissionsToCasl(user?.user?.user?.role?.permissions);

//     permissions.forEach(([action, subject]) => {
//       can(action, subject);
//     });
//   }

//   return new AbilityClass(rules);
// };


import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { mapPermissionsToCasl } from './mapPermissions';

export const AppAbility = createMongoAbility();
export const AbilityClass = createMongoAbility;
import { createContextualCan } from '@casl/react';
import { createContext } from 'react';
export const AbilityContext =createContext();

export const CanComponent = createContextualCan(AbilityContext.Consumer);
export const defineAbilitiesFor = (user) => {
  const { can, rules } = new AbilityBuilder(AbilityClass);

  if (user?.user?.role?.permissions) {
    const permissions = mapPermissionsToCasl(user?.user?.role?.permissions);

    permissions.forEach(([action, subject]) => {
      can(action, subject);
    });
  }

  return new AbilityClass(rules);
};