"use strict";
// import * as cacheManager from 'cache-manager';
// import { Store } from 'cache-manager';
// import * as redisStore from 'cache-manager-redis-store';
// import { Request, Response, NextFunction } from 'express';
// // Create a new cache manager instance with the Redis store
// const cache = cacheManager.caching({
//   store: redisStore,
//   host: 'localhost',
//   port: 6379,
// });
// // Middleware function to cache data
// const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   const key = req.originalUrl; // Use the request URL as the cache key
//   try {
//     const result: string | undefined = await cache.get(key);
//     if (result !== undefined) {
//       // If data is found in cache, send it as response
//       res.json(JSON.parse(result));
//     } else {
//       // If data is not found in cache, proceed with the request
//       const sendResponse: Response['json'] = (body) => {
//         // Cache the response data
//         cache.set(key, JSON.stringify(body));
//         return res.json(body); // Send response to client and return Response
//       };
//       res.json = sendResponse; // Assign the sendResponse function to res.json
//       next();
//     }
//   } catch (error) {
//     console.error('Cache error:', error);
//     next(); // Proceed without caching if an error occurs
//   }
// };
// export default cacheMiddleware;
