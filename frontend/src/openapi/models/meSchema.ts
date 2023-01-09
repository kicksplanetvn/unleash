/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Unleash API
 * OpenAPI spec version: 4.20.0-beta.1
 */
import type { UserSchema } from './userSchema';
import type { PermissionSchema } from './permissionSchema';
import type { FeedbackSchema } from './feedbackSchema';
import type { MeSchemaSplash } from './meSchemaSplash';

export interface MeSchema {
    user: UserSchema;
    permissions: PermissionSchema[];
    feedback: FeedbackSchema[];
    splash: MeSchemaSplash;
}