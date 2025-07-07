
```
frontend
├─ README.md
├─ components.json
├─ draw.tldr
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ defaults
│  │  └─ avatar.jpg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ logo-dark-2.png
│  ├─ logo-dark.png
│  ├─ logo-light.png
│  ├─ logo.png
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ src
│  ├─ app
│  │  ├─ (auth)
│  │  │  ├─ login
│  │  │  │  ├─ layout.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ signup
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ student
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ teacher
│  │  │  │     └─ page.tsx
│  │  │  └─ verify-email
│  │  │     ├─ VerifyEmail.tsx
│  │  │     ├─ layout.tsx
│  │  │     └─ page.tsx
│  │  ├─ (demo)
│  │  │  └─ test
│  │  │     ├─ layout.tsx
│  │  │     └─ page.tsx
│  │  ├─ api
│  │  │  └─ (auth)
│  │  │     ├─ login
│  │  │     │  └─ route.ts
│  │  │     ├─ logout
│  │  │     │  └─ route.ts
│  │  │     ├─ refresh
│  │  │     │  └─ route.ts
│  │  │     ├─ signup
│  │  │     │  └─ route.ts
│  │  │     └─ verify-email
│  │  │        ├─ sent-code
│  │  │        │  └─ route.ts
│  │  │        └─ verify-code
│  │  │           └─ route.ts
│  │  ├─ dashboard
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  ├─ LandingPage.tsx
│  │  ├─ Wormhole.tsx
│  │  ├─ app-sidebar.tsx
│  │  ├─ auth
│  │  │  ├─ JoinAsRole.tsx
│  │  │  └─ JoinUSWindow.tsx
│  │  ├─ basic
│  │  │  ├─ AppSideBar2.tsx
│  │  │  ├─ AppSidebar.tsx
│  │  │  ├─ ChangeThemeBtn.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  ├─ NotFound.tsx
│  │  │  ├─ NotFound2.tsx
│  │  │  ├─ NotFound3.tsx
│  │  │  ├─ NotFound4.tsx
│  │  │  └─ NotFound5.tsx
│  │  ├─ dashboard
│  │  │  ├─ CourseCard.tsx
│  │  │  ├─ Dashboard.tsx
│  │  │  ├─ Logo.tsx
│  │  │  ├─ Watch.tsx
│  │  │  └─ Watch2.tsx
│  │  ├─ form
│  │  │  ├─ FooterTxt.tsx
│  │  │  ├─ FormHeader.tsx
│  │  │  ├─ InputField.tsx
│  │  │  ├─ ORLine.tsx
│  │  │  ├─ OtpFooter.tsx
│  │  │  ├─ OtpForm.tsx
│  │  │  ├─ OtpHeader.tsx
│  │  │  ├─ OtpInput.tsx
│  │  │  ├─ SubmitBtn.tsx
│  │  │  └─ WithGoogleBtn.tsx
│  │  ├─ icons.tsx
│  │  ├─ nav-main.tsx
│  │  ├─ nav-projects.tsx
│  │  ├─ nav-secondary.tsx
│  │  ├─ nav-user.tsx
│  │  ├─ search-form.tsx
│  │  ├─ signup-form-demo.tsx
│  │  ├─ site-header.tsx
│  │  └─ ui
│  │     ├─ GradientLine.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ progress.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ sonner.tsx
│  │     └─ tooltip.tsx
│  ├─ data
│  │  └─ AppSidebar.tsx
│  ├─ hooks
│  │  └─ use-mobile.ts
│  ├─ lib
│  │  ├─ auth
│  │  │  ├─ index.ts
│  │  │  ├─ login.ts
│  │  │  ├─ logout.ts
│  │  │  └─ signup.ts
│  │  ├─ delay.ts
│  │  ├─ deleteToken.ts
│  │  ├─ getTokens.ts
│  │  ├─ parseCookie.ts
│  │  ├─ sent-verification-code.ts
│  │  ├─ utils.ts
│  │  └─ validateFormData.ts
│  ├─ middleware.ts
│  ├─ queary
│  │  └─ QueryProvider.tsx
│  ├─ redux
│  │  ├─ features
│  │  │  └─ auth
│  │  │     ├─ authSlice.ts
│  │  │     └─ loginWithEmail.ts
│  │  ├─ hooks.ts
│  │  ├─ provider.tsx
│  │  └─ store.ts
│  ├─ styles
│  │  └─ globals.css
│  └─ types
│     ├─ AppSideBar.ts
│     ├─ auth.ts
│     ├─ index.ts
│     └─ watch.ts
└─ tsconfig.json

```