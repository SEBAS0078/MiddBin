# Code Review: project-amber-aardvark
**Date**: November 16, 2025  
**Reviewer**: GitHub Copilot  
**Focus Areas**: React/Next.js idioms, leaky abstractions, technical debt

---

## 🎯 **Summary**
This is a marketplace application for Middlebury College students built with Next.js, React, and Supabase. While the project demonstrates functional implementation, there are several areas concerning idiomatic React/Next.js usage, leaky abstractions, and accumulating technical debt.

---

## 🚨 **Critical Issues**

### 1. **File Extension Inconsistency (Major Technical Debt)**
- **Problem**: Mixing `.jsx`, `.tsx`, and `.ts` files inconsistently
  - `_app.jsx` (JSX but could be TSX)
  - `Navbar.jsx` (JSX, no TypeScript)
  - `contact.tsx` (TSX but function name is lowercase)
  - `ListingDetail.jsx` (JSX, missing Image import)
  
- **Impact**: Type safety is compromised, harder to maintain
- **Recommendation**: Standardize on `.tsx` for all React components and `.ts` for utilities

### 2. **Duplicate Supabase Clients (Leaky Abstraction)**
```typescript
// login.supabase.ts
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_GOOGLE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_GOOGLE_ANON_KEY!
);

// supabase_client.ts
export const supabase = createClient(SupabaseUrl, SupabaseAnonKey);
```

- **Problem**: Two different Supabase clients with different env variables
- **Impact**: Confusing which client to use where; potential auth bugs
- **Recommendation**: Single source of truth for Supabase client

### 3. **Type Definitions Duplicated**
The `Listing` type is defined in **3 different places**:
- `src/types/Listing.tsx`
- `src/lib/db_functions.ts`
- `src/components/ListingCard.tsx`

- **Impact**: Risk of type drift, maintenance nightmare
- **Recommendation**: Single source in `src/types/Listing.tsx`, import everywhere

### 4. **Component Naming Convention Violations**
```tsx
// contact.tsx
export default function contact() { // ❌ Should be Contact
```
- **Problem**: React components must be PascalCase
- **Impact**: May cause issues with React DevTools and hot reload

---

## ⚠️ **React/Next.js Anti-Patterns**

### 5. **Missing `Image` Import in ListingDetail.jsx**
```jsx
// ListingDetail.jsx line 14
<Image src={listing.image || "/placeholder.png"} ... />
```
- **Problem**: `Image` component used but not imported
- **Impact**: Runtime error - this component won't work
- **Fix**: `import Image from "next/image"`

### 6. **Using `<img>` Instead of Next.js `Image`**
```tsx
// ListingCard.tsx
// biome-ignore-all lint/performance/noImgElement:temporary fix
<img src={item.img} alt={item.title} className={styles.image} />
```

- **Problem**: Bypassing Next.js optimization with biome-ignore
- **Impact**: Lost performance benefits (lazy loading, optimization, responsive images)
- **Recommendation**: Fix the underlying issue rather than ignoring the linter

### 7. **Client-Side Data Fetching in Home Page**
```tsx
// index.tsx
useEffect(() => {
  async function loadListings() {
    const { data, error } = await fetchListings();
    // ...
  }
  loadListings();
}, []);
```

- **Problem**: Not leveraging Next.js SSR/SSG capabilities
- **Impact**: Slower initial page load, SEO issues, loading states needed
- **Recommendation**: Use `getServerSideProps` or `getStaticProps`

### 8. **Static Data Import in Dynamic Route**
```jsx
// pages/listing/[id].jsx
import data from "../../../data/seed.json";
const listing = data.find((item) => item.id === Number(id));
```

- **Problem**: Using static JSON instead of fetching from Supabase
- **Impact**: Listings won't reflect database changes
- **Recommendation**: Fetch from database using `getServerSideProps`

### 9. **Alert() for Error Handling**
```tsx
if (error) {
  alert("Error fetching listings:"); // ❌ Poor UX
}
```

- **Problem**: Using browser alerts throughout the app
- **Impact**: Poor user experience, not accessible, blocks UI
- **Recommendation**: Implement proper toast notifications or error UI

### 10. **Inline Styles in ContactSection.tsx**
```tsx
<div style={{
  backgroundColor: "rgba(30,30,60,0.6)",
  border: "1px solid rgba(99,102,241,0.5)",
  // ...
}}>
```

- **Problem**: Mixing inline styles with CSS modules elsewhere
- **Impact**: Inconsistent styling approach, harder to maintain
- **Recommendation**: Use CSS modules or a consistent styling solution

---

## 🏗️ **Architecture & Abstraction Issues**

### 11. **Hardcoded OAuth Redirect URL**
```tsx
// index.tsx
async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback", // ❌ Hardcoded
    },
  });
}
```

- **Problem**: Won't work in production
- **Recommendation**: Use environment variables

### 12. **Missing Auth Callback Handler**
The redirect points to `/auth/callback` but this route doesn't exist in the codebase.

### 13. **Navbar Component Duplication**
The navigation markup is duplicated in:
- `Navbar.jsx` (component)
- `about.tsx` (inline)
- `contact.tsx` (inline)

- **Problem**: Violates DRY principle
- **Recommendation**: Use the `Navbar` component everywhere

### 14. **Business Logic in Components**
```tsx
// ListingGrid.tsx - Complex filtering logic
const priceInRange = (price: number): string => {
  if (price >= 100) return "100+";
  // ...
};

const filteredListings = collection.filter((item) => {
  // Complex filter logic...
});
```

- **Problem**: Filtering logic should be in a custom hook or utility
- **Recommendation**: Extract to `useListingFilter()` hook

### 15. **Empty Component File**
`src/components/NewListing.tsx` is completely empty - this is technical debt.

---

## 🧪 **Testing Issues**

### 16. **Test References Non-Existent Component**
```jsx
// Filter.test.jsx
import Filter from "../components/Filter";
```
- **Problem**: No `Filter` component exists
- **Impact**: Test fails, false confidence in test suite

### 17. **Incorrect Test Data Structure**
```jsx
// ListingCard.test.jsx
const item = {
  title: "Lamp",
  price: "$45", // ❌ Should be number
  condition: "Used",
  picture: "/lamp.jpg", // ❌ Should be 'img'
};
```

- **Problem**: Test uses wrong property names and types
- **Impact**: Test passes but doesn't match real component contract

---

## 📝 **TypeScript Issues**

### 18. **Inconsistent Null Checking**
```tsx
// ListingGrid.tsx
(item.title?.toLowerCase().includes(query.toLowerCase()) ?? false)
```
While this is correct, other places don't do null checking consistently.

### 19. **Type Assertion Overuse**
```tsx
// login.supabase.ts
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_GOOGLE_URL!;
```
- **Problem**: Non-null assertion (`!`) bypasses type safety
- **Recommendation**: Validate at runtime

### 20. **Missing Return Type Annotations**
Most functions lack explicit return types, reducing type safety benefits.

---

## 🎨 **Styling Concerns**

### 21. **Mixed Styling Approaches**
- CSS Modules (`ListingCard.module.css`)
- Inline styles (`ContactSection.tsx`)
- Tailwind classes (`ListingDetail.jsx` - but Tailwind not installed!)
- Global CSS (`globals.css`)

- **Problem**: No consistent styling strategy
- **Recommendation**: Pick one approach (CSS Modules recommended for this project)

### 22. **Tailwind Classes Without Tailwind**
```jsx
// ListingDetail.jsx
<div className="min-h-screen bg-gradient-to-b from-indigo-950 to-indigo-900">
```
- **Problem**: Using Tailwind classes but Tailwind isn't in package.json
- **Impact**: Styles won't work

---

## 🔒 **Security & Best Practices**

### 23. **No Input Validation**
Form inputs in `CreateListing.tsx` lack validation beyond basic required checks.

### 24. **Exposed Environment Variables**
All Supabase keys are client-side (`NEXT_PUBLIC_*`), which is correct for client access, but ensure Row Level Security is configured in Supabase.

### 25. **No Loading States**
Components don't show loading states during async operations.

---

## 📊 **Performance Issues**

### 26. **Unnecessary Re-renders**
```tsx
// ListingGrid.tsx
const catPrice = [...new Set(collection.map((i: Listing) => { ... }))];
```
This computation runs on every render. Should be memoized with `useMemo`.

### 27. **No Key Prop Uniqueness Guarantee**
```tsx
{catPrice.map((price) => (
  <option key={price} value={price}> // ❌ price might not be unique
```

---

## ✅ **Recommendations Summary**

### **Immediate Actions**
1. Fix critical bugs: Missing `Image` import in `ListingDetail.jsx`
2. Consolidate Supabase clients into one
3. Use single `Listing` type from `types/Listing.tsx`
4. Fix component naming (`contact` → `Contact`)
5. Remove or implement `NewListing.tsx`

### **Short-term Improvements**
1. Migrate all components to `.tsx`
2. Implement proper error handling (replace `alert()`)
3. Use `getServerSideProps` for data fetching
4. Extract `Navbar` duplication
5. Fix or remove broken tests
6. Add loading states

### **Medium-term Refactoring**
1. Implement custom hooks (`useListingFilter`, `useAuth`)
2. Add proper form validation
3. Implement toast notifications
4. Use `useMemo` for expensive computations
5. Standardize on CSS Modules
6. Add comprehensive TypeScript types
7. Create `/auth/callback` route

### **Long-term Architecture**
1. Consider migrating to App Router (Next.js 13+)
2. Implement proper state management (Context or Zustand)
3. Add E2E tests
4. Implement CI/CD with type checking and linting
5. Add error boundaries
6. Implement image upload instead of URL input

---

## 🎓 **Educational Notes**

This codebase shows signs of rapid development with mixed experience levels, which is normal for student projects. The core functionality works, but the accumulation of technical debt will make future features harder to add. Addressing these issues incrementally will significantly improve maintainability and code quality.

---

## 📋 **Files Reviewed**

### Configuration
- `package.json`
- `next.config.ts`
- `tsconfig.json`

### Pages
- `src/pages/_app.jsx`
- `src/pages/_document.tsx`
- `src/pages/index.tsx`
- `src/pages/about.tsx`
- `src/pages/contact.tsx`
- `src/pages/CreateListing.tsx`
- `src/pages/listing/[id].jsx`

### Components
- `src/components/Navbar.jsx`
- `src/components/ListingGrid.tsx`
- `src/components/ListingCard.tsx`
- `src/components/ListingDetail.jsx`
- `src/components/SearchBar.tsx`
- `src/components/ContactSection.tsx`
- `src/components/NewListing.tsx` (empty)

### Library/Utilities
- `src/lib/db_functions.ts`
- `src/lib/supabase_client.ts`
- `src/lib/login.supabase.ts`

### Types
- `src/types/Listing.tsx`

### Tests
- `src/tests/ListingCard.test.jsx`
- `src/tests/Filter.test.jsx`

### Styles
- `src/styles/globals.css`
