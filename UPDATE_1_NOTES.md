# PlayRent — Professional Update 1

## What's improved
- Equipment catalog search by product name, sport, category, and description.
- Sport filters for All, Football, Cricket, and Badminton.
- Price/name sorting and an available-only toggle.
- Responsive catalog cards and empty-search state.
- Product details now read from the shared `src/data/products.js` data, so all eight catalog products can open their details page.

## Run the project
1. Open a terminal in `PlayRent/client`.
2. Run `npm install`.
3. Run `npm run dev`.

The server `.env` file and `node_modules` folders are intentionally not included in this update archive. Keep your own environment settings private; create a local `.env` if your backend requires one.

## Files updated
- `src/pages/Equipment.jsx`
- `src/pages/Equipment.css` (new)
- `src/pages/ProductDetails.jsx`
