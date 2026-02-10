# CORS Fix - Use Wildcard

It seems the specific URL isn't being recognized properly. Let's fix this by allowing **All Origins** temporarily.

1. Go to **Render Dashboard** > **Backend Service** > **Environment**.
2. Find or Add `CORS_ORIGINS`.
3. Set the Value to just: `*`
   ```
   *
   ```
4. Click **Save Changes**.

Wait for the redeploy to complete, then try the frontend again.
This is the most reliable way to fix CORS errors instantly.
