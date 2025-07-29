# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## HEVA Management Platform Flow

- The Home page explains what HEVA Management does and why entrepreneurs should join.
- Entrepreneurs can apply to join via the "Apply as an Entrepreneur" link on the Home page.
- Only admin users can view, approve, or reject entrepreneur applications. This is enforced on the backend.
- Once an application is approved by an admin, the entrepreneur's details are displayed publicly on the "Approved Entrepreneurs" page.
- Entrepreneurs who are not approved are not visible to the public.

Admins should log in with an admin account to access the application management features.
