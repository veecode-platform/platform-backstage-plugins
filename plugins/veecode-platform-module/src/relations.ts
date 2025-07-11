/*
Naming rules for relations in priority order:

1. Use at most two words. One main verb and a specifier, e.g. "ownerOf"
2. Reading out "<source-kind> <type> <target-kind>" should make sense in English.
3. Maintain symmetry between pairs, e.g. "ownedBy" and "ownerOf" rather than "owns".
*/

/**
 * Reversed direction of {@link RELATION_ENVIRONMENT_OF}.
 *
 *
 * @public
 */
export const RELATION_FROM_ENVIRONMENT = 'fromEnvironment';

/**
 * A relationship from an environment to it's clusters. Reversed direction of
 * {@link RELATION_FROM_ENVIRONMENT}.
 *
 * @public
 */
export const RELATION_ENVIRONMENT_OF = 'environmentOf';

/**
 * Reversed direction of {@link RELATION_PROVIDED_BY}.
 *
 * This is the 1-to-N case, where a cluster control plane can provide several tenants.
 *
 * @public
 */
export const RELATION_PROVIDED_BY = 'providedBy';

/**
 *
 * TODO It is worth considering that a tenant can consume cataloged resources such as a database, a vault, a Kong service, etc. In the future, it would be interesting to add these relations to the Tenant kind.
 *
 */
