// import { AbilityBuilder, Ability } from '@casl/ability'

// export const AppAbility = Ability

// /**
//  * Please define your own Ability rules according to your app requirements.
//  * We have just shown Admin and Client rules for demo purpose where
//  * admin can manage everything and client can just visit ACL page
//  */
// const defineRulesFor = (role, subject) => {
//   const { can, rules } = new AbilityBuilder(AppAbility)
//   if (role === 'admin') {
//     can('manage', 'all')
//   } else if (role === 'client') {
//     can(['read'], 'acl-page')
//   } else {
//     can(['read', 'create', 'update', 'delete'], subject)
//   }

//   return rules
// }

// export const buildAbilityFor = (role, subject) => {
//   return new AppAbility(defineRulesFor(role, subject), {
//     // https://casl.js.org/v5/en/guide/subject-type-detection
//     // @ts-ignore
//     detectSubjectType: object => object.type
//   })
// }

// export const defaultACLObj = {
//   action: 'manage',
//   subject: 'all'
// }

// export default defineRulesFor



import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

const defineRulesFor = role => {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility)

  // ==================================================
  // ADMIN
  // ==================================================

  if (role === 'admin') {
    // Admin can access everything
    can('manage', 'all')
    
    // EXCEPT FRT and Bank dashboards
    cannot('read', 'frt-dashboard')
    cannot('read', 'bank-dashboard')
    cannot('read', 'merchant-dashboard')
  }

  // ==================================================
  // FRT
  // ==================================================

  if (role === 'FRT') {
    can('read', 'frt-dashboard')
    can('read', 'merchant-page')
    can('read', 'transaction-page')
  }

  // ==================================================
  // ISO
  // ==================================================

  if (role === 'ISO') {
    can('read', 'iso-dashboard')
    can('read', 'approval-page')
  }

  // ==================================================
  // UNDERWRITER
  // ==================================================

  if (role === 'UnderWriter') {
    can('read', 'underwriter-dashboard')
    can('read', 'card-page')
  }

  // ==================================================
  // MERCHANT
  // ==================================================

  if (role === 'Merchant') {
    can('read', 'merchant-dashboard')
    can('read', 'transaction-page')
  }

  // ==================================================
  // BANK
  // ==================================================

  if (role === 'Bank') {
    can('read', 'bank-dashboard')
    can('read', 'wire-page')
  }

  // ==================================================
  // ACCOUNT
  // ==================================================

  if (role === 'Account') {
    can('read', 'account-dashboard')
    can('read', 'fees-page')
  }

  // ==================================================
  // SUBISO
  // ==================================================

  if (role === 'SubISO') {
    can('read', 'subiso-dashboard')
  }

  return rules
}

export const buildAbilityFor = role => {
  return new AppAbility(defineRulesFor(role), {
    detectSubjectType: object => object.type
  })
}

// Helper function to check if a navigation item is accessible
export const canAccessNavigationItem = (ability, item) => {
  // If item has action and subject, check permission
  if (item.action && item.subject) {
    return ability.can(item.action, item.subject)
  }
  
  // If item has children, check if any child is accessible
  if (item.children && item.children.length > 0) {
    return item.children.some(child => canAccessNavigationItem(ability, child))
  }
  
  // For section titles or items without permissions, return true
  return true
}

// Function to filter navigation based on role
export const filterNavigationByRole = (navigationItems, role) => {
  const ability = buildAbilityFor(role)
  const filtered = []
  
  for (let i = 0; i < navigationItems.length; i++) {
    const item = navigationItems[i]
    
    // Check if this specific item is accessible
    const isAccessible = canAccessNavigationItem(ability, item)
    
    if (isAccessible) {
      // If item has children, filter them too
      if (item.children) {
        const filteredChildren = item.children.filter(child => canAccessNavigationItem(ability, child))
        if (filteredChildren.length > 0) {
          filtered.push({ ...item, children: filteredChildren })
        } else if (!item.action && !item.subject) {
          // If it's a parent item with no accessible children, don't add it
          continue
        } else {
          filtered.push(item)
        }
      } else {
        filtered.push(item)
      }
    }
  }
  
  return filtered
}

export const defaultACLObj = {
  action: 'read',
  subject: 'dashboard'
}

export default defineRulesFor