# Load Testing Guide for Project Submissions

This guide explains how to test the reliability and performance of the project submission system with concurrent submissions.

## 🎯 Testing Overview

The testing suite includes:

- **Quick Test**: Validates basic functionality with a single submission using real database users
- **Load Test**: Tests system reliability with 50 concurrent submissions using real database users
- **Cleanup Tool**: Removes test projects (preserves real users) after testing

## 📋 Prerequisites

1. **Development Server Running**:

   ```bash
   npm run dev
   ```

   Server should be running on `http://localhost:3001` (or `http://localhost:3000`)

2. **Database Connection**:

   - MongoDB should be running and accessible
   - `MONGODB_URI` environment variable should be set
   - **Database must contain real users** (registered participants with `@iiits.in` emails)

3. **Dependencies Installed**:
   ```bash
   npm install
   ```

## 🧪 Running Tests

### Step 1: Quick Test (Recommended First)

Run a quick test to ensure basic functionality:

```bash
npm run test:quick
```

This test will:

- ✅ Check system health
- ✅ Fetch a random user from the database
- ✅ Verify the user credentials
- ✅ Submit a single project
- ✅ Verify the submission was successful

### Step 2: Load Test (50 Concurrent Submissions)

Once the quick test passes, run the full load test:

```bash
npm run test:load
```

This test will:

- 📋 Fetch real users from the database (will reuse users if needed for 50 submissions)
- 🚀 Generate realistic project data for each submission
- ⚡ Submit all 50 projects simultaneously
- 📊 Provide detailed performance metrics

### Step 3: Cleanup Test Data

After testing, clean up the test projects (real users are preserved):

```bash
npm run test:cleanup
```

This will remove only the test projects created during testing, preserving all real user data.

## 📊 Understanding Test Results

### Load Test Metrics

The load test provides comprehensive metrics:

```
📊 LOAD TEST RESULTS
================================================================================
📈 Total Submissions: 50
✅ Successful: 48
❌ Failed: 2
📊 Success Rate: 96.00%
⏱️  Total Time: 5234ms (5.23s)
📊 Average Response Time: 1247.32ms
⚡ Fastest Response: 892ms
🐌 Slowest Response: 2341ms
💾 Throughput: 9.55 requests/second

📊 RESPONSE TIME DISTRIBUTION:
----------------------------------------
P50 (Median): 1198ms
P90: 1876ms
P95: 2103ms
P99: 2287ms
```

### Performance Benchmarks

**Good Performance**:

- ✅ Success Rate: > 95%
- ✅ Average Response Time: < 2000ms
- ✅ P95 Response Time: < 3000ms
- ✅ No database errors

**Acceptable Performance**:

- ⚠️ Success Rate: 90-95%
- ⚠️ Average Response Time: 2000-5000ms
- ⚠️ P95 Response Time: 3000-8000ms
- ⚠️ Few timeout errors

**Poor Performance**:

- ❌ Success Rate: < 90%
- ❌ Average Response Time: > 5000ms
- ❌ P95 Response Time: > 8000ms
- ❌ Multiple database/server errors

## 🛠️ Troubleshooting

### Common Issues

1. **Connection Refused**:

   ```
   Error: connect ECONNREFUSED 127.0.0.1:3001
   ```

   **Solution**: Make sure the development server is running (`npm run dev`)

2. **Database Connection Error**:

   ```
   Error: MongoNetworkError: failed to connect
   ```

   **Solution**:

   - Check if MongoDB is running
   - Verify `MONGODB_URI` in `.env.local`
   - Ensure database permissions are correct

3. **High Failure Rate**:

   - Check server logs for errors
   - Verify database capacity and connections
   - Monitor system resources (CPU, memory)

4. **Slow Response Times**:
   - Check database indexes
   - Monitor server performance
   - Consider database connection pooling

### Debug Mode

For detailed debugging, you can modify the test files:

1. **Enable Verbose Logging**:

   ```javascript
   // In load-test-submissions.js, add:
   console.log('Request data:', projectData);
   console.log('Response:', response.data);
   ```

2. **Reduce Concurrent Load**:

   ```javascript
   // Change this line in load-test-submissions.js:
   NUM_CONCURRENT_SUBMISSIONS: 10, // Reduced from 50
   ```

3. **Add Delays Between Requests**:
   ```javascript
   // Add delays to stagger requests:
   await new Promise((resolve) => setTimeout(resolve, index * 100));
   ```

## 🔧 Customizing Tests

### Changing Test Parameters

Edit `src/tests/load-test-submissions.js`:

```javascript
const TEST_CONFIG = {
  API_BASE_URL: 'http://localhost:3001',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/web3ssh',
  NUM_CONCURRENT_SUBMISSIONS: 50, // Change this number
  TIMEOUT_MS: 30000, // 30 seconds timeout per request
};
```

### Adding Custom Test Data

Modify the `PROJECT_TEMPLATES` object to include your own test data:

```javascript
const PROJECT_TEMPLATES = {
  projectNames: [
    'Your Custom Project Name',
    // ... more names
  ],
  // ... other templates
};
```

## 📈 Performance Optimization Tips

Based on test results, consider these optimizations:

1. **Database Optimization**:

   - Add indexes for frequently queried fields
   - Use connection pooling
   - Consider database sharding for high load

2. **Server Optimization**:

   - Implement request rate limiting
   - Add response caching where appropriate
   - Optimize API response payloads

3. **Error Handling**:
   - Implement proper retry mechanisms
   - Add circuit breakers for external services
   - Improve error messages and logging

## 🚀 Production Considerations

Before deploying to production:

1. **Test with Production-like Load**:

   - Test with expected peak concurrent users
   - Test with realistic network latency
   - Test with production database size

2. **Monitor Key Metrics**:

   - Response times
   - Error rates
   - Database performance
   - Server resource usage

3. **Set Up Alerts**:
   - High error rates
   - Slow response times
   - Database connection issues
   - Server resource exhaustion

## 📞 Support

If you encounter issues with the testing setup:

1. Check the server logs in the terminal running `npm run dev`
2. Verify your `.env.local` configuration
3. Ensure all dependencies are installed
4. Try running the quick test first before the load test

---

**Note**: These tests use the actual database and API endpoints. Run cleanup after testing to remove test data.
