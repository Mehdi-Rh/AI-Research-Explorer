# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites

- Vercel account
- Cohere API key

### Step 1: Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables (see Step 3)
6. Deploy!

#### Option B: Using Vercel CLI

```bash
vercel
```

### Step 3: Configure Environment Variables

In your Vercel project dashboard, add the following environment variable:

**Key:** `COHERE_API_KEY`  
**Value:** Your Cohere API key (get it from [dashboard.cohere.com](https://dashboard.cohere.com))

> **Important:** Make sure to select all environments (Production, Preview, Development) when adding the variable.

### Step 4: Update Domain (Optional)

After deployment, Vercel will provide a URL like `https://your-app.vercel.app`

You can optionally:

- Add a custom domain
- Configure redirects
- Set up analytics

## 🔒 Security Features

✅ **API Key Protection**: Your Cohere API key is stored securely in Vercel environment variables  
✅ **CORS Handling**: Proper CORS headers for browser security  
✅ **Error Propagation**: Status codes are preserved for retry logic  
✅ **Rate Limiting**: Inherits Cohere's rate limiting with retry mechanisms

## 🛠️ Development vs Production

- **Development**: Uses direct API calls with `VITE_COHERE_API_KEY` (if available)
- **Production**: Uses serverless proxy at `/api/cohere` to protect API keys

## 📝 API Endpoint

Your deployed API will be available at:

```
https://your-app.vercel.app/api/cohere
```

**Request Format:**

```json
{
  "prompt": "Your question here",
  "model": "command-a-03-2025"
}
```

**Response Format:**

```json
{
  "success": true,
  "message": {
    "content": [{ "text": "AI response here" }]
  }
}
```

## 🧪 Testing After Deployment

1. Visit your deployed app
2. Use the retry test panel in the top-right corner
3. Send chat messages to test the full flow
4. Check Vercel function logs for any issues

## 🚨 Troubleshooting

### Common Issues:

1. **"Server configuration error"**

   - Make sure `COHERE_API_KEY` is set in Vercel environment variables
   - Redeploy after adding environment variables

2. **CORS errors**

   - The serverless function includes proper CORS headers
   - Make sure you're using the deployed version, not localhost

3. **Function timeout**

   - Vercel functions have a 30-second timeout (configured in vercel.json)
   - Cohere API calls should complete well within this limit

4. **Rate limiting**
   - Your retry mechanism will handle Cohere rate limits automatically
   - Monitor your Cohere usage in their dashboard

### Vercel Function Logs:

```bash
vercel logs
```

## 🎯 Next Steps

After successful deployment:

- Remove the `VITE_COHERE_API_KEY` from your local `.env` (if you have one)
- Test the retry mechanism with real API calls
- Monitor function performance in Vercel dashboard
- Consider adding analytics or monitoring
