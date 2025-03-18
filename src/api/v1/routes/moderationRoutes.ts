import { Router } from "express";
import {
	moderatePost,
	flagUser,
	getPostById,
	getUserProfile,
	getFlaggedContentStats,
} from "../controllers/moderationController";

const router: Router = Router();

/**
 * @openapi
 * /api/v1/moderation/post/{:id}:
 *   get:
 *     summary: Retrieves a post.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: Post to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Maximum number of posts to return
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       403:
 *         description: You need to be a moderator to view this post
 *       404:
 *         description: No post found with the specified id
 *       500:
 *         description: Server Error        
 */
router.get("/post/:id", getPostById);

/**
 * @openapi
 * /api/v1/moderation/post/{:id}/moderate:
 *   post:
 *     summary: Moderates a post.
 *     tags: [Internal Use Only]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: Post to moderate
 *       - in: query
 *         name: minimum
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: Minimum number of posts to moderate
 *     responses:
 *       200:
 *         description: Post moderated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       403:
 *         description: You have to be a moderator to moderate this post
 *       404:
 *         description: No post found with the specified id
 *       500:
 *         description: Server Error        
 */
router.post("/post/:id/moderate", moderatePost);

/**
 * @openapi
 * /api/v1/moderation/user/post/{:id}/profile:
 *   get:
 *     summary: Retrieves a user's profile.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: User profile to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: Maximum number of profile to retrieve
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       403:
 *         description: You have to be a moderator to view this user's profile
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error        
 */
router.get("/user/:id/profile", getUserProfile);

/**
 * @openapi
 * /api/v1/moderation/user/{:id}/flag:
 *   post:
 *     summary: Flags a user.
 *     tags: [Internal Use Only]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: User to flag
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: Maximum number of user to flag
 *     responses:
 *       200:
 *         description: User flagged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       403:
 *         description: You have to be a moderator to flag this user
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error        
 */
router.post("/user/:id/flag", flagUser);

/**
 * @openapi
 * /api/v1/moderation/content/flags/stats:
 *   get:
 *     summary: Retrieves the flagged content statistics.
 *     tags: [Internal Use Only]
 *     responses:
 *       200:
 *         description: Flagged content statistics 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       403:
 *         description: You have to be a moderator to view the statistics
 *       500:
 *         description: Server Error        
 */
router.get("/content/flags/stats", getFlaggedContentStats);

export default router;