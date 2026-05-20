// const navigation = () => {
//   const userData =
//     typeof window !== 'undefined'
//       ? JSON.parse(localStorage.getItem('userData'))
//       : null

//   const role = userData?.role
//   const isAdmin = role === 'admin'

//   return [

//     // =====================================================
//     // DASHBOARD
//     // =====================================================

//     {
//       sectionTitle: 'Dashboard',
//       action: 'read',
//       subject: 'dashboard'
//     },

//     // ================= ADMIN =================

//     ...(isAdmin
//       ? [
//           {
//             title: 'My Account',
//             icon: 'tabler:smart-home',
//             path: '/dashboards/myaccount',
//             action: 'manage',
//             subject: 'all'
//           }
//         ]
//       : []),

//     // ================= FRT =================

//     ...(role === 'FRT'
//       ? [
//           {
//             title: 'FRT Dashboard',
//             icon: 'tabler:layout-dashboard',
//             path: '/dashboards/frt',
//             action: 'read',
//             subject: 'frt-dashboard'
//           }
//         ]
//       : []),

//     // ================= ISO =================

//     ...(role === 'ISO'
//       ? [
//           {
//             title: 'ISO Dashboard',
//             icon: 'tabler:layout-dashboard',
//             path: '/dashboards/iso',
//             action: 'read',
//             subject: 'iso-dashboard'
//           }
//         ]
//       : []),

//     // ================= UNDERWRITER =================

//     ...(role === 'UnderWriter'
//       ? [
//           {
//             title: 'UnderWriter Dashboard',
//             icon: 'tabler:layout-dashboard',
//             path: '/dashboards/underwriter',
//             action: 'read',
//             subject: 'underwriter-dashboard'
//           }
//         ]
//       : []),

//     // ================= MERCHANT =================

//     ...(role === 'Merchant'
//       ? [
//           {
//             title: 'Merchant Dashboard',
//             icon: 'tabler:layout-dashboard',
//             path: '/dashboards/merchant',
//             action: 'read',
//             subject: 'merchant-dashboard'
//           }
//         ]
//       : []),

//     // ================= BANK =================

//     ...(role === 'Bank'
//       ? [
//           {
//             title: 'Bank Dashboard',
//             icon: 'tabler:layout-dashboard',
//             path: '/dashboards/bank',
//             action: 'read',
//             subject: 'bank-dashboard'
//           },
//         ]
//       : []),

//     // ================= ACCOUNT =================

//     ...(role === 'Account'
//       ? [
//           {
//             title: 'Account Dashboard',
//             icon: 'tabler:layout-dashboard',
//             path: '/dashboards/account',
//             action: 'read',
//             subject: 'account-dashboard'
//           }
//         ]
//       : []),

//     // ================= SUBISO =================

//     ...(role === 'SubISO'
//       ? [
//           {
//             title: 'SubISO Dashboard',
//             icon: 'tabler:layout-dashboard',
//             path: '/dashboards/subiso',
//             action: 'read',
//             subject: 'subiso-dashboard'
//           }
//         ]
//       : []),

//     // =====================================================
//     // USER MANAGEMENT
//     // =====================================================

//     ...(isAdmin
//       ? [
//           {
//             sectionTitle: 'User Management',
//             action: 'manage',
//             subject: 'all'
//           },

//           {
//             title: 'Manage Users',
//             icon: 'tabler:users',
//             path: '/manage-users',
//             action: 'manage',
//             subject: 'all'
//           },

//           {
//             title: 'Manage SaaS',
//             icon: 'tabler:user-check',
//             path: '/crm-users',
//             action: 'manage',
//             subject: 'all'
//           }
//         ]
//       : []),

//     // =====================================================
//     // FINANCE
//     // =====================================================

//     ...(isAdmin || role === 'Account' || role === 'Merchant' || role === 'FRT'
//       ? [
//           {
//             sectionTitle: 'Finance',
//             action: 'read',
//             subject: 'finance-page'
//           }
//         ]
//       : []),

//     ...(isAdmin || role === 'Account'
//       ? [
//           {
//             title: 'Fees Management',
//             icon: 'tabler:receipt',
//             path: '/fees-management',
//             action: 'read',
//             subject: 'fees-page'
//           }
//         ]
//       : []),

//     ...(isAdmin || role === 'FRT' || role === 'Merchant'
//       ? [
//           {
//             title: 'All Transactions',
//             icon: 'tabler:list-details',
//             path: '/all-transactions',
//             action: 'read',
//             subject: 'transaction-page'
//           }
//         ]
//       : []),

//     // =====================================================
//     // CARDS
//     // =====================================================

//     ...(isAdmin || role === 'UnderWriter'
//       ? [
//           {
//             sectionTitle: 'Cards',
//             action: 'read',
//             subject: 'card-page'
//           },

//           {
//             title: 'Card Management',
//             icon: 'tabler:credit-card',
//             path: '/card-management',
//             action: 'read',
//             subject: 'card-page'
//           },

//           {
//             title: 'Prepaid Card Applications',
//             icon: 'tabler:file-plus',
//             path: '/prepaid-card-applications',
//             action: 'read',
//             subject: 'card-page'
//           }
//         ]
//       : []),

//     // =====================================================
//     // BANKING
//     // =====================================================

//     ...(isAdmin || role === 'Bank'
//       ? [
//           {
//             sectionTitle: 'Banking & Transfers',
//             action: 'read',
//             subject: 'wire-page'
//           },

//           {
//             title: 'Wire Management',
//             icon: 'tabler:arrows-exchange',
//             path: '/wire-management',
//             action: 'read',
//             subject: 'wire-page'
//           }
//         ]
//       : []),

//     ...(isAdmin
//       ? [
//           {
//             title: 'Remote Deposit Cheque',
//             icon: 'tabler:device-mobile',
//             path: '/remote-deposit-cheque',
//             action: 'manage',
//             subject: 'all'
//           }
//         ]
//       : []),

//     // =====================================================
//     // APPROVAL
//     // =====================================================

//     ...(isAdmin || role === 'ISO'
//       ? [
//           {
//             sectionTitle: 'Approvals',
//             action: 'read',
//             subject: 'approval-page'
//           },

//           {
//             title: 'Approval',
//             icon: 'tabler:check',
//             path: '/approval',
//             action: 'read',
//             subject: 'approval-page'
//           }
//         ]
//       : []),

//     // =====================================================
//     // MERCHANT
//     // =====================================================

//     ...(isAdmin || role === 'FRT'
//       ? [
//           {
//             sectionTitle: 'Merchant',
//             action: 'read',
//             subject: 'merchant-page'
//           },

//           {
//             title: 'All Merchant',
//             icon: 'tabler:store',
//             path: '/all-merchant',
//             action: 'read',
//             subject: 'merchant-page'
//           }
//         ]
//       : [])
//   ]
// }

// export default navigation



const navigation = () => {
  return [
   {
    sectionTitle: 'Account',
    action: 'read',
    subject: 'permission'
  },
  {
    title: 'My Account',
    icon: 'tabler:smart-home',
    path: '/dashboards/myaccount',
    action: 'read',
    subject: 'permission'
  },
  {
    title: 'FRT Dashboard',
    icon: 'tabler:layout-dashboard',
    path: '/dashboards/frt',
    action: 'read',
    subject: 'frt-dashboard'
  },

  {
    title: 'Merchant Dashboard',
    icon: 'tabler:layout-dashboard',
    path: '/dashboards/merchant',
    action: 'read',
    subject: 'merchant-dashboard'
  },
  {
    title: 'Bank Dashboard',
    icon: 'tabler:layout-dashboard',
    path: '/dashboards/bank',
    action: 'read',
    subject: 'bank-dashboard'
  },
  {
    sectionTitle: 'User Management',
    action: 'read',
    subject: 'permission'
  },
  {
    title: 'Manage Users',
    icon: 'tabler:users',
    path: '/manage-users',
    action: 'read',
    subject: 'users'
  },
  {
    title: 'Manage SaaS',
    icon: 'tabler:user-check',
    path: '/crm-users'
  },
  {
    sectionTitle: 'Finance',
    action: 'read',
    subject: 'permission'
  },
  // {
  //   title: 'Manage Purchase',
  //   icon: 'tabler:shopping-cart',
  //   path: '/manage-purchase'
  // },
  {
    title: 'Fees Management',
    icon: 'tabler:receipt',
    path: '/fees-management'
  },
  {
    title: 'All Transactions',
    icon: 'tabler:list-details',
    path: '/all-transactions',
    action: 'read',
    subject: 'transaction-page'
  },
  {
    sectionTitle: 'Cards',
    action: 'read',
    subject: 'permission'
  },
  {
    title: 'Card Management',
    icon: 'tabler:credit-card',
    path: '/card-management'
  },
  {
    title: 'Prepaid Card Applications',
    icon: 'tabler:file-plus',
    path: '/prepaid-card-applications'
  },
  {
    sectionTitle: 'Banking & Transfers',
    action: 'read',
    subject: 'permission'
  },
  {
    title: 'Wire Management',
    icon: 'tabler:arrows-exchange',
    path: '/wire-management'
  },
  {
    title: 'Remote Deposit Cheque',
    icon: 'tabler:device-mobile',
    path: '/remote-deposit-cheque'
  },
  {
    sectionTitle: 'Escrow',
    action: 'read',
    subject: 'permission'
  },
  {
    title: 'Escrow Management',
    icon: 'tabler:shield-lock',
    path: '/escrow-management'
  },
  {
    sectionTitle: 'Approvals',
    action: 'read',
    subject: 'permission'
  },
  {
    title: 'Approval',
    icon: 'tabler:check',
    path: '/approval',
    children: [
      {
        title: 'Add Money',
        path: '/apps/approval/add-money'
      },
      {
        title: 'Paid Invoice',
        path: '/apps/approval/paid-invoice'
      },
      {
        title: 'Voucher',
        path: '/apps/approval/voucher'
      },
      {
        title: 'Pending Payment',
        path: '/apps/approval/pending-payment'
      },
    ]
  },
  {
    sectionTitle: 'Merchant',
    action: 'read',
    subject: 'permission'
  },
  {
    title: 'All Merchant',
    icon: 'tabler:store',
    path: '/all-merchant',
    action: 'read',
    subject: 'merchant-page'
  },
  {
    sectionTitle: 'Calendar',
    action: 'read',
    subject: 'permission'
  },
  {
    title: 'Calendar',
    icon: 'tabler:calendar',
    path: '/apps/calendar'
  },
  {
    sectionTitle: 'Settings',
    action: 'read',
    subject: 'permission'
  },
  {
    title: 'Settings',
    icon: 'tabler:settings',
    path: '/pages/account-settings/account/'
  },
  {
    sectionTitle: 'Subscription',
    action: 'read',
    subject: 'permission'
  },
  {
    title: 'Subscription',
    icon: 'tabler:subscription',
    path: '/subscription',
    children: [
      {
        title: 'Discount Code',
        path: '/apps/subscription/discount-code'
      },
      {
        title: 'Subscription',
        path: '/apps/subscription/plans'
      },
      {
        title: 'Add App',
        path: '/apps/subscription/add-app'
      }
    ]
  },
  ]
}

export default navigation