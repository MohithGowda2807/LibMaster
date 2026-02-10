# Fixing CORS Error

Your application is almost working! The error means the **Backend** (on Render) is blocking the request because it doesn't recognize your **Frontend URL** (`https://lib-master.vercel.app`).

## The Solution

You need to tell Render to allow your specific frontend URL.

1. Go to your **Render Dashboard**.
2. Click on your **Backend Web Service**.
3. Go to the **Environment** tab.
4. Finds the `CORS_ORIGINS` variable (or add it if missing).
5. Set the Value to exactly:
   ```
   https://lib-master.vercel.app
   ```
   *(Note: No trailing slash `/` at the end)*

6. Click **Save Changes**.
   - Render will automatically restart your server.

## Verification
- Wait for the redeploy to finish (check logs).
- Refresh your frontend page.
- The errors should disappear and books should load!
