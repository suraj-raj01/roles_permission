export const mapPermissionsToCasl = (permissions) => {
  const mapped = [];

  const permissionMap = {
    ManageAdmin: ['manage', 'Admin'],
    ManageVendor: ['manage', 'Vendor'],
    ManageProduct: ['manage', 'Product'],
    ManageUsers: ['manage', 'User'],
    seeproducts: ['read', 'Product'],
  };

  permissions.forEach((perm) => {
    const mapping = permissionMap[perm];
    if (mapping) {
      mapped.push(mapping);
    }
  });

  return mapped;
};
