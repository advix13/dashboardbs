# BlueSpring Components

## Layout Components

### Sidebar
- **File**: `/components/layout/Sidebar.tsx`
- **Description**: Main navigation sidebar for the dashboard
- **Status**: Stable
- **Props**: None
- **Dependencies**: 
  - lucide-react (for icons)
  - next/navigation (for usePathname)
- **Navigation Items**:
  - Dashboard (home)
  - Products
  - Orders
  - Inventory
  - Customers
  - Reports
- **Management Cards**:
  - Users
  - Invoices
  - Expenses
  - Settings
  - Alerts
  - Delivery

### BlueSpringNavItem
- **File**: `/components/layout/Sidebar.tsx`
- **Description**: Navigation item used in the sidebar
- **Status**: Stable
- **Props**:
  - `icon`: React.ReactNode - Icon element to display
  - `label`: string - Text label for the navigation item
  - `href`: string - Link destination
  - `active`: boolean - Whether the item is currently active

### BlueSpringSettingCard
- **File**: `/components/layout/Sidebar.tsx`
- **Description**: Card component for settings/management items
- **Status**: Stable
- **Props**:
  - `icon`: React.ReactNode - Icon element to display
  - `label`: string - Title of the card
  - `lastUpdated`: string - Subtitle or status text

### Header
- **File**: `/components/layout/Header.tsx`
- **Description**: Top navigation header with search and notifications
- **Status**: Stable
- **Props**: None
- **Dependencies**:
  - React (useState)

## Dashboard Components

### MetricCard
- **File**: `/components/dashboard/MetricCard.tsx`
- **Description**: Reusable card component for displaying metrics
- **Status**: Stable
- **Props**:
  - `icon`: ReactNode - Icon element to display
  - `iconBgColor`: string - Background color for the icon
  - `iconColor`: string - Color for the icon
  - `title`: string - Title of the metric
  - `value`: string - Value of the metric
  - `change`: { value: string, positive: boolean } - Optional change indicator

### DashboardCards
- **File**: `/components/dashboard/DashboardCards.tsx`
- **Description**: Grid of metric cards for the dashboard
- **Status**: Stable
- **Features**:
  - Customer satisfaction rating
  - Water stock level
  - Active products count
  - Ice sales metrics
  - Pending orders count
  - Active customers count
  - Total revenue display with growth indicator
- **Dependencies**:
  - lucide-react (for icons)
  - MetricCard component

### RecentSales
- **File**: `/components/dashboard/RecentSales.tsx`
- **Description**: Table showing recent sales transactions
- **Status**: Stable
- **Features**:
  - Customer information
  - Product details
  - Transaction amount
  - Status indicators
  - Date information
  - Change percentage
- **Dependencies**:
  - lucide-react (for icons)

### StockLevels
- **File**: `/components/dashboard/StockLevels.tsx`
- **Description**: Visual representation of current stock levels
- **Status**: Stable
- **Features**:
  - Product stock information
  - Visual progress bars
  - Status indicators (normal, low, critical)
  - Category differentiation (Water vs Ice)
- **Dependencies**:
  - lucide-react (for icons)

### ProductCard
- **File**: `/components/dashboard/ProductCard.tsx`
- **Description**: Card component for displaying product information
- **Status**: Stable
- **Props**:
  - `id`: number - Product ID
  - `name`: string - Product name
  - `price`: string - Product price
  - `stock`: number - Current stock level
  - `maxStock`: number - Maximum stock level
  - `category`: 'Water' | 'Ice' | 'Accessory' - Product category
- **Features**:
  - Visual stock level indicator
  - Category-based styling
  - Stock status warnings
- **Dependencies**:
  - lucide-react (for icons)

### Products
- **File**: `/components/dashboard/Products.tsx`
- **Description**: Table-based view of all products with status indicators
- **Status**: Stable
- **Features**:
  - Tabular display of all BlueSpring products
  - Product icons with category-based styling
  - Status badges (ACTIVE, INACTIVE, OFFLINE)
  - Stock level information
  - Price buttons with green background
  - Pagination controls
- **Dependencies**:
  - lucide-react (for icons)

## Page Components

### ProductsPage
- **File**: `/app/(dashboard)/products/page.tsx`
- **Description**: Products management page with table and filters
- **Status**: Stable
- **Features**:
  - Product listing table
  - Search functionality
  - Category and status filters
  - Pagination
  - Add/Edit/Delete product actions
- **Dependencies**:
  - lucide-react (for icons)

### CustomersPage
- **File**: `/app/(dashboard)/customers/page.tsx`
- **Description**: Customers management page with table and filters
- **Status**: Stable
- **Features**:
  - Customer listing table with business and contact information
  - Search functionality
  - Status and time period filters
  - Pagination controls
  - Customer status indicators (Active/Inactive)
  - Quick access to view/edit actions
- **Dependencies**:
  - lucide-react (for icons)

### CustomerDetailPage
- **File**: `/app/(dashboard)/customers/[id]/page.tsx`
- **Description**: Detailed view of a specific customer
- **Status**: Stable
- **Features**:
  - Customer information display with contact details
  - Order history table
  - Customer stats (total orders, total spent)
  - Customer notes section
  - Activity timeline with color-coded events
  - Quick action buttons (Create order, Send message, Export data)
- **Dependencies**:
  - lucide-react (for icons)
  - next/link (for navigation)

### AddCustomerPage
- **File**: `/app/(dashboard)/customers/add/page.tsx`
- **Description**: Form for adding new customers
- **Status**: Stable
- **Features**:
  - Comprehensive customer information form
  - Form validation with error messages
  - Categorized input sections (Business, Contact, Address)
  - Required field indicators
  - Form submission handling
- **Dependencies**:
  - React useState (for form state)
  - lucide-react (for icons)
  - next/link (for navigation)

## Inventory Management Components

### InventoryPage
**File Path:** `/app/(dashboard)/inventory/page.tsx`  
**Description:** Main inventory overview page displaying inventory items, stock levels, and recent movements.  
**Status:** Implemented  
**Features:**
- Tab-based filtering for inventory items (All, Low Stock, By Category)
- Summary cards showing total products, low stock items, and recent activities
- Inventory table with stock level indicators and status badges
- Search functionality for inventory items
- Quick access to stock adjustment actions
- Visual stock level percentage bars
- Recent inventory movement log with filterable view

**Dependencies:**
- React useState hook
- lucide-react (for icons)
- next/link for navigation

### AdjustStockPage
**File Path:** `/app/(dashboard)/inventory/adjust/page.tsx`  
**Description:** Interface for adding, removing, or setting inventory stock levels with reason tracking.  
**Status:** Implemented  
**Features:**
- Three adjustment types: Add Stock, Remove Stock, Set Exact Value
- Context-aware reason codes that change based on adjustment type
- Product search functionality with real-time filtering
- Dynamic stock calculation showing projected stock levels
- Date, reference, and notes fields for complete record-keeping
- Table view of selected products with current and new stock levels
- Color-coded indicators for stock increases/decreases

**Dependencies:**
- React useState hook
- lucide-react (for icons)
- next/link for navigation

### InventoryHistoryPage
**File Path:** `/app/(dashboard)/inventory/history/page.tsx`  
**Description:** Detailed log of all inventory movements with powerful filtering and sorting capabilities.  
**Status:** Implemented  
**Features:**
- Comprehensive inventory movement records with before/after values
- Multi-faceted filtering (by type, category, date range, search term)
- Sortable columns for date, product, and quantity
- Color-coded movement types (green for additions, red for removals, blue for adjustments)
- Reference and reason tracking for audit purposes
- Visual indicators for movement types
- Export functionality for inventory reports
- Location and user tracking for all inventory changes

**Dependencies:**
- React useState hook
- lucide-react (for icons)
- next/link for navigation
- JavaScript Date formatting 

## Reporting Components

### ReportsPage
- **File Path:** `/app/(dashboard)/reports/page.tsx`
- **Description:** Main reporting overview page with metrics and navigation to detailed reports
- **Status:** Implemented
- **Features:**
  - Summary cards for key metrics (revenue, orders, average order value, active customers)
  - Time period selection and report type filtering
  - Interactive chart for revenue trends by product category
  - Top products table with sales and revenue data
  - Sales distribution by category visualization
  - Quick access cards to detailed report pages
- **Dependencies:** React `useState` hook, `lucide-react`, and `next/link`

### SalesReportPage
- **File Path:** `/app/(dashboard)/reports/sales/page.tsx`
- **Description:** Detailed sales performance analysis with comprehensive metrics and visualizations
- **Status:** Implemented
- **Features:**
  - Period-over-period comparison for key sales metrics
  - Interactive sorting for product tables
  - Monthly sales trend visualization with multiple data series
  - Distribution analysis by category, channel, and region
  - Product performance tables with growth indicators
  - Actionable insights and recommendations
- **Dependencies:** React `useState` hook, `lucide-react`, and `next/link`

### CustomerReportPage
- **File Path:** `/app/(dashboard)/reports/customers/page.tsx`
- **Description:** Customer analytics dashboard with segmentation and behavior analysis
- **Status:** Implemented
- **Features:**
  - Customer metrics overview (total, active, new customers, churn rate)
  - Monthly customer activity visualization
  - Customer segmentation analysis with retention metrics
  - Purchase frequency and spending range breakdowns
  - Top customers table with interactive sorting
  - Customer insights and recommended actions
- **Dependencies:** React `useState` hook, `lucide-react`, and `next/link`

### InventoryReportPage
- **File Path:** `/app/(dashboard)/reports/inventory/page.tsx`
- **Description:** Inventory performance analysis focusing on turnover and stock status
- **Status:** Implemented
- **Features:**
  - Key inventory metrics (products, value, turnover rate, out-of-stock items)
  - Stock status distribution visualization
  - Monthly turnover rate trend analysis
  - Top and low performing products comparison
  - Inventory insights and recommendations for stock optimization
- **Dependencies:** React `useState` hook, `lucide-react`, and `next/link` 